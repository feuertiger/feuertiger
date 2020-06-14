/* eslint-disable import/prefer-default-export */
import { AuthProps } from './authProps';

export const authPropsMock: AuthProps = {
    auth: {
        signOut: () => {},
        signInWithEmailAndPassword: () => {}
    }
};
