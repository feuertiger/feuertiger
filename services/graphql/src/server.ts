import express, { Express } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { migrateAndSeed } from '@feuertiger/migrations';
import { PrismaClient } from '@feuertiger/schema-prisma';

import schema from './schema';
import context from './context';

export const gqlServer = (): Express => {
    const prisma = new PrismaClient();

    migrateAndSeed(prisma);

    const apolloServer = new ApolloServer({
        schema,
        context: context({ prisma }),
        playground: true
    });

    const app = express();
    apolloServer.applyMiddleware({ app, path: '/', cors: true });

    return app;
};
