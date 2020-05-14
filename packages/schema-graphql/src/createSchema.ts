import { PrismaClient } from '@feuertiger/schema-prisma';
import { importSchema } from 'graphql-import';
import { makeExecutableSchema } from 'apollo-server-express';
import path from 'path';

export interface Context {
    db: PrismaClient;
    userUUID: string;
}

const schemaPath = path.resolve(__dirname, '..', 'lib', 'schema.graphql');

const extendContext = (context: any) => {
    const prisma = new PrismaClient();
    if (!context) {
        return ({ req }: any): Context => ({
            db: prisma,
            userUUID: req.uuid
        });
    }

    if (typeof context === 'function') {
        return ({ req }: any): Context => ({
            ...context(),
            db: prisma,
            userUUID: req.uuid
        });
    }

    return ({ req }: any): Context => ({
        ...context,
        db: prisma,
        userUUID: req.uuid
    });
};

export default (options: any = {}) => {
    const typeDefs = importSchema(schemaPath);
    return makeExecutableSchema({
        ...options,
        typeDefs,
        context: extendContext(options.context)
    });
};
