import { ApolloServer, BaseContext } from '@apollo/server';
import typeDefs from './graphql/schema/';
import resolvers from './graphql/resolvers/';
import { startServerAndCreateLambdaHandler, handlers, middleware } from '@as-integrations/aws-lambda';
import dotenv from 'dotenv';

dotenv.config();

const server = new ApolloServer<BaseContext>({
	typeDefs,
	resolvers,
	introspection: true,
});

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];
const requestHandler = handlers.createAPIGatewayProxyEventV2RequestHandler();

const corsMiddleware: middleware.MiddlewareFn<typeof requestHandler> = async (event) => {
	const origin = event.headers.origin;
	console.log('origin is', origin);
	if (origin && allowedOrigins.includes(origin)) {
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
			result.body = 'Origin not allowed' + origin;
			return Promise.resolve();
		};
	}
};

export const handler = startServerAndCreateLambdaHandler(server, handlers.createAPIGatewayProxyEventV2RequestHandler(), {
	middleware: [corsMiddleware],
});
