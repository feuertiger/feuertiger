import admin from 'firebase-admin';
import { AuthenticationError } from 'apollo-server';
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';

export default async ({ req }: ExpressContext) => {
    const token = req.headers.authorization || '';
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        return {
            user: {
                uid: decodedToken.uid
            }
        };
    } catch (error) {
        throw new AuthenticationError('you must be logged in');
    }
};
