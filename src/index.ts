
import typeDefs from './graphql/schema';
import resolvers from './graphql/resolvers';
import { ApolloServer as ApolloDServerDev, BaseContext } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import cors from 'cors';
import http from 'http';
import dotenv from 'dotenv';
import { handleSignUrl } from './utils/s3Query';

dotenv.config({ quiet: true });


const app = express();
const httpServer = http.createServer(app);

const port = process.env.PORT ?? 4000;

const server = new ApolloDServerDev<BaseContext>({
	typeDefs,
	resolvers,
	introspection: true,
	plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

const allowedOrigins = process.env.ALLOWED_ORIGINS_DEV?.split(',') || [];

app.get('/image/:key', async (req, res) => {
	const imageKey = req.params.key;
	if (!imageKey) {
		res.status(400)
			.set('Access-Control-Allow-Origin', '*')
			.json({ error: 'Image key required' });
		return;
	}
	try {
		const presignedUrl = await handleSignUrl(imageKey);
		res.set('Access-Control-Allow-Origin', '*');
		res.set('Cache-Control', 'public, max-age=3600');
		res.redirect(302, presignedUrl);
	} catch (error) {
		console.error('Error generating presigned URL:', error);
		res.status(404)
			.set('Access-Control-Allow-Origin', '*')
			.json({ error: 'Image not found' });
	}
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
