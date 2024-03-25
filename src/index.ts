import dotenv from 'dotenv';
import typeDefs from './schema';
import resolvers from './resolvers';
import { ApolloServer as ApolloDServerDev } from 'apollo-server';

dotenv.config();

const port = process.env.PORT || 4000;

const server = new ApolloDServerDev({
	typeDefs,
	resolvers,
	introspection: true,
});
console.log('Starting server', server);

server.listen({ port }).then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`);
});
