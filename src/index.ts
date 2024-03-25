import dotenv from 'dotenv';
import typeDefs from './schema';
import resolvers from './resolvers';
import { ApolloServer as ApolloDServerDev, BaseContext } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import cors from 'cors';
import http from 'http';

dotenv.config();

const app = express();
const httpServer = http.createServer(app);

const port = process.env.PORT || 4000;

const server = new ApolloDServerDev<BaseContext>({
	typeDefs,
	resolvers,
	introspection: true,
	plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

const startApolloServer = async () => {
	try {
		await server.start();
		app.use('/graphql', cors<cors.CorsRequest>({ origin: '*' }), express.json(), expressMiddleware(server));
		app.use((req, res, next) => {
			if (!allowedOrigins.includes(req.headers.origin ?? '')) {
				console.log('Origin not allowed:', req.headers.origin);
			}
			next();
		});
	} catch (err: any) {
		console.error('Error starting server', err);
	}
};

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];

// const corsMiddleware = async (event: any) => {
// 	const origin = event.headers.origin;
// 	console.log('origin', origin);
// 	if (origin && allowedOrigins.includes(origin)) {
// 		return (result: any) => {
// 			result.headers = {
// 				...result.headers,
// 				'Access-Control-Allow-Origin': origin,
// 				Vary: 'Origin',
// 			};
// 			return Promise.resolve();
// 		};
// 	} else {
// 		return (result: any) => {
// 			result.statusCode = 403;
// 			result.body = 'Origin not allowed';
// 			return Promise.resolve();
// 		};
// 	}
// };

const startHttpServer = async () => {
	try {
		await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
		console.log(`🚀 Server ready at http://localhost:4000/graphql`);
	} catch (err: any) {
		console.error('Error starting server', err);
	}
};

startApolloServer()
	.then(() => {
		startHttpServer();
	})
	.catch((err) => {
		console.error('Error starting server', err);
	});
