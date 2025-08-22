

import { ApolloServer, BaseContext } from '@apollo/server';
import typeDefs from './graphql/schema/';
import resolvers from './graphql/resolvers/';
import { startServerAndCreateLambdaHandler, handlers, middleware } from '@as-integrations/aws-lambda';

process.loadEnvFile();

const server = new ApolloServer<BaseContext>({
	typeDefs,
	resolvers,
	introspection: true,
});

const requestHandler = handlers.createAPIGatewayProxyEventV2RequestHandler();

const corsMiddleware: middleware.MiddlewareFn<typeof requestHandler> = async (event) => {
	const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];
	const origin = event.headers.origin;
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
			result.body = 'Forbidden';
			return Promise.resolve();
		};
	}
};

export const handler = startServerAndCreateLambdaHandler(server, handlers.createAPIGatewayProxyEventV2RequestHandler(), {
	middleware: [corsMiddleware],
});
