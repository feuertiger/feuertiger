import admin, { ServiceAccount } from 'firebase-admin';
import * as functions from 'firebase-functions';

import { gqlServer as createGqlServer } from '@feuertiger/graphql';
import { webServer as createWebServer } from '@feuertiger/web-client';
import serviceAccount from './secrets.json';

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount)
});

const graphqlServer = createGqlServer();
export const graphql = functions
    .region('europe-west1')
    .https.onRequest(graphqlServer);

const webServer = createWebServer();
export const web = functions.region('europe-west1').https.onRequest(webServer);
