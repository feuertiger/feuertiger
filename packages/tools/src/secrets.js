const { getSecretsEnvironment } = require('./environment');

module.exports.getFirebaseAdminSecrets = () => {
    const {
        FIREBASE_SECRETS_PROJECT_ID,
        FIREBASE_SECRETS_PRIVATE_KEY,
        FIREBASE_SECRETS_CLIENT_EMAIL
    } = getSecretsEnvironment();
    return {
        projectId: FIREBASE_SECRETS_PROJECT_ID,
        privateKey: FIREBASE_SECRETS_PRIVATE_KEY,
        clientEmail: FIREBASE_SECRETS_CLIENT_EMAIL
    };
};

module.exports.getFirebaseAppSecrets = () => {
    const {
        FIREBASE_SECRETS_APP_AUTHDOMAIN,
        FIREBASE_SECRETS_APP_APIKEY
    } = getSecretsEnvironment();
    return {
        apiKey: FIREBASE_SECRETS_APP_APIKEY,
        authDomain: FIREBASE_SECRETS_APP_AUTHDOMAIN
    };
};