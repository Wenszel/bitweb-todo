import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import typeDefs from './graphql/typeDefs.js';
import resolvers from './graphql/resolvers.js';

const PORT: number = 8080;

const server = new ApolloServer({ typeDefs, resolvers });
await startStandaloneServer(server, {
    listen: { port: PORT },
});
