

import { ApolloServer, BaseContext } from '@apollo/server';
import typeDefs from './graphql/schema/';
import resolvers from './graphql/resolvers/';
import { startServerAndCreateLambdaHandler, handlers, middleware } from '@as-integrations/aws-lambda';
import dotenv from 'dotenv';
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { handleSignUrl } from './utils/s3Query';

dotenv.config({ quiet: true });


const server = new ApolloServer<BaseContext>({
	typeDefs,
	resolvers,
	introspection: true,
});

const requestHandler = handlers.createAPIGatewayProxyEventV2RequestHandler();

// Image proxy handler
const handleImageRequest = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
	console.log('Image request - pathParameters:', event.pathParameters);
	console.log('Image request - rawPath:', event.rawPath);
	const imageKey = event.pathParameters?.key;

	if (!imageKey) {
		return {
			statusCode: 400,
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ error: 'Image key required' })
		};
	}

	try {
		// Generate a fresh presigned URL on-demand
		const presignedUrl = await handleSignUrl(imageKey);

		// Redirect to the presigned URL
		return {
			statusCode: 302,
			headers: {
				'Location': presignedUrl,
				'Cache-Control': 'public, max-age=3600', // Cache the redirect for 1 hour
				'Access-Control-Allow-Origin': '*',
			},
			body: ''
		};
	} catch (error) {
		console.error('Error generating presigned URL:', error);
		return {
			statusCode: 404,
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
			body: JSON.stringify({ error: 'Image not found' })
		};
	}
};

const corsMiddleware: middleware.MiddlewareFn<typeof requestHandler> = async (event) => {
	// const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];
	const origin = event.headers.origin;
	// if (origin && allowedOrigins.includes(origin)) {
	if (origin) {
		return (result) => {
			result.headers = {
				...result.headers,
				'Access-Control-Allow-Origin': origin,
				Vary: 'Origin',
			};
			return Promise.resolve();
		};
	} else {
		return (result) => {
			result.statusCode = 403;
			result.body = 'Forbidden';
			return Promise.resolve();
		};
	}
};

const apolloHandler = startServerAndCreateLambdaHandler(
	server,
	handlers.createAPIGatewayProxyEventV2RequestHandler(), {
	middleware: [corsMiddleware],
});


export const handler = async (event: APIGatewayProxyEventV2, context: any = []): Promise<APIGatewayProxyResultV2 | void> => {
	console.log("event.requestContext.http.path:", event.requestContext.http.path);
	console.log("event.requestContext.http.method :", event.requestContext.http.method);

	if (event.requestContext.http.path.startsWith('/image/')) {
		return handleImageRequest(event);
	}

	// Handle OPTIONS for CORS preflight on image requests
	if (event.requestContext.http.method === 'OPTIONS' && event.requestContext.http.path.startsWith('/image/')) {
		return {
			statusCode: 204,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET, OPTIONS',
				'Access-Control-Allow-Headers': 'Content-Type',
				'Access-Control-Max-Age': '86400',
			},
			body: ''
		};
	}

	return await apolloHandler(event, context, () => { });
} 