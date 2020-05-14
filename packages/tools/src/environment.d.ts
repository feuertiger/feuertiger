export interface SecretsEnvironment {
    FIREBASE_SECRETS_TYPE?: string;
    FIREBASE_SECRETS_PROJECT_ID?: string;
    FIREBASE_SECRETS_PRIVATE_KEY_ID?: string;
    FIREBASE_SECRETS_PRIVATE_KEY?: string;
    FIREBASE_SECRETS_CLIENT_EMAIL?: string;
    FIREBASE_SECRETS_CLIENT_ID?: string;
    FIREBASE_SECRETS_AUTH_URI?: string;
    FIREBASE_SECRETS_TOKEN_URI?: string;
    FIREBASE_SECRETS_AUTH_PROVIDER_X509_CERT_URL?: string;
    FIREBASE_SECRETS_CLIENT_X509_CERT_URL?: string;
    FIREBASE_SECRETS_APP_APIKEY?: string;
    FIREBASE_SECRETS_APP_AUTHDOMAIN?: string;
    FIREBASE_SECRETS_APP_DATABASEURL?: string;
    FIREBASE_SECRETS_APP_STORAGEBUCKET?: string;
    FIREBASE_SECRETS_APP_MESSAGINGSENDERID?: string;
    FIREBASE_SECRETS_APP_APPID?: string;
}

export const trim: (str: string | undefined) => string | undefined;

export const getSecretsEnvironment: () => SecretsEnvironment;
