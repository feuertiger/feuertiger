export interface Config {
    [key: string]: string | undefined;
}

export const getFirebaseAdminSecrets: () => Config;

export const getFirebaseAppSecrets: () => any;
