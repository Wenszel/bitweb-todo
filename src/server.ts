import "reflect-metadata";

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import { AppDataSource } from './orm/datasource.js';

import typeDefs from './graphql/typeDefs.js';
import resolvers from './graphql/resolvers.js';

const PORT: number = 8080;

AppDataSource.initialize()
    .then(() => {
        console.log("[INFO] Database connected");
    })
    .catch((error) => console.log(error));

const server = new ApolloServer({ typeDefs, resolvers });
const { url } = await startStandaloneServer(server, {
    listen: { port: PORT },
});

console.log(`[INFO] Server ready at ${url}`);