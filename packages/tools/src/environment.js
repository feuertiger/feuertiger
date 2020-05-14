const path = require('path');
const { config } = require('dotenv');

config({ path: path.join(__dirname, '..', '..', '..', '.env') });

exports.trim = (text) =>
    text && text.replace(/^"|"$/g, '').replace(/\\n/g, '\n');

exports.getSecretsEnvironment = () => {
    const {
        FIREBASE_SECRETS_TYPE,
        FIREBASE_SECRETS_PROJECT_ID,
        FIREBASE_SECRETS_PRIVATE_KEY_ID,
        FIREBASE_SECRETS_PRIVATE_KEY,
        FIREBASE_SECRETS_CLIENT_EMAIL,
        FIREBASE_SECRETS_CLIENT_ID,
        FIREBASE_SECRETS_AUTH_URI,
        FIREBASE_SECRETS_TOKEN_URI,
        FIREBASE_SECRETS_AUTH_PROVIDER_X509_CERT_URL,
        FIREBASE_SECRETS_CLIENT_X509_CERT_URL,
        FIREBASE_SECRETS_APP_APIKEY,
        FIREBASE_SECRETS_APP_AUTHDOMAIN,
        FIREBASE_SECRETS_APP_DATABASEURL,
        FIREBASE_SECRETS_APP_STORAGEBUCKET,
        FIREBASE_SECRETS_APP_MESSAGINGSENDERID,
        FIREBASE_SECRETS_APP_APPID
    } = process.env;
    const secrets = {
        FIREBASE_SECRETS_TYPE,
        FIREBASE_SECRETS_PROJECT_ID,
        FIREBASE_SECRETS_PRIVATE_KEY_ID,
        FIREBASE_SECRETS_PRIVATE_KEY,
        FIREBASE_SECRETS_CLIENT_EMAIL,
        FIREBASE_SECRETS_CLIENT_ID,
        FIREBASE_SECRETS_AUTH_URI,
        FIREBASE_SECRETS_TOKEN_URI,
        FIREBASE_SECRETS_AUTH_PROVIDER_X509_CERT_URL,
        FIREBASE_SECRETS_CLIENT_X509_CERT_URL,
        FIREBASE_SECRETS_APP_APIKEY,
        FIREBASE_SECRETS_APP_AUTHDOMAIN,
        FIREBASE_SECRETS_APP_DATABASEURL,
        FIREBASE_SECRETS_APP_STORAGEBUCKET,
        FIREBASE_SECRETS_APP_MESSAGINGSENDERID,
        FIREBASE_SECRETS_APP_APPID
    };

    return Object.keys(secrets).reduce(
        (acc, key) => {
            acc[key] = module.exports.trim(acc[key]);
            return acc;
        },
        { ...secrets }
    );
};
