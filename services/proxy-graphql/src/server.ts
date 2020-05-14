import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { createSchema, schemaDirectives } from '@feuertiger/schema-graphql';

import createResolver from './createResolver';
import resolveContext from './resolveContext';

// eslint-disable-next-line import/prefer-default-export
export const gqlServer = () => {
    const schema = createSchema({
        resolvers: createResolver(),
        schemaDirectives
    });

    const apolloServer = new ApolloServer({
        schema,
        context: resolveContext,
        playground: true
    });

    const app = express();
    apolloServer.applyMiddleware({ app, path: '/', cors: true });

    return app;
};
