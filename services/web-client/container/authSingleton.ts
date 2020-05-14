import getConfig from 'next/config';

import firebase from 'firebase/app';
import 'firebase/auth';

export default class AuthSingleton {
    public firebaseAuth: firebase.auth.Auth;

    static instance: AuthSingleton;

    constructor() {
        if (AuthSingleton.instance) {
            return AuthSingleton.instance;
        }

        const { publicRuntimeConfig } = getConfig();
        const { tokens } = publicRuntimeConfig;

        const firebaseApp = firebase.initializeApp(tokens);
        this.firebaseAuth = firebaseApp.auth();

        AuthSingleton.instance = this;
    }
}
