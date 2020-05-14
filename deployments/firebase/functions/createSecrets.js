const fs = require('fs');
const path = require('path');

const trim = (str) => str && str.replace(/\\n/g, '\n').replace(/^"|"$/g, '');

const secrets = {
    type: trim(process.env.FIREBASE_SECRETS_TYPE),
    project_id: trim(process.env.FIREBASE_SECRETS_PROJECT_ID),
    private_key_id: trim(process.env.FIREBASE_SECRETS_PRIVATE_KEY_ID),
    private_key: trim(process.env.FIREBASE_SECRETS_PRIVATE_KEY),
    client_email: trim(process.env.FIREBASE_SECRETS_CLIENT_EMAIL),
    client_id: trim(process.env.FIREBASE_SECRETS_CLIENT_ID),
    auth_uri: trim(process.env.FIREBASE_SECRETS_AUTH_URI),
    token_uri: trim(process.env.FIREBASE_SECRETS_TOKEN_URI),
    auth_provider_x509_cert_url: trim(
        process.env.FIREBASE_SECRETS_AUTH_PROVIDER_X509_CERT_URL
    ),
    client_x509_cert_url: trim(
        process.env.FIREBASE_SECRETS_CLIENT_X509_CERT_URL
    )
};

const secretsPath = path.resolve(__dirname, 'src', 'secrets.json');
const secretsJson = JSON.stringify(secrets, null, 4);

fs.writeFileSync(secretsPath, secretsJson, 'utf8');
