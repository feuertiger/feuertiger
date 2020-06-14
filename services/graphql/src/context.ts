import admin from 'firebase-admin';
// import { AuthenticationError } from 'apollo-server';
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';

import { PrismaClient } from '@feuertiger/schema-prisma';

export interface Context {
    db: PrismaClient;
    uid: string;
    userUUID: string;
}

export const prisma = new PrismaClient();

export default async ({ req }: ExpressContext) => {
    const token = req.headers.authorization || '';
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        return {
            db: prisma,
            user: {
                uid: decodedToken.uid
            }
        };
    } catch (error) {
        return {
            db: prisma
        };
        // throw new AuthenticationError('you must be logged in');
    }
};
