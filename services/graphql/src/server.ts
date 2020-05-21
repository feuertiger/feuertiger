import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import schema from './schema';
import context, { prisma } from './context';

// eslint-disable-next-line import/prefer-default-export
export const gqlServer = () => {
    const apolloServer = new ApolloServer({
        schema,
        context,
        playground: true
    });

    const app = express();
    apolloServer.applyMiddleware({ app, path: '/', cors: true });

    return app;
};
