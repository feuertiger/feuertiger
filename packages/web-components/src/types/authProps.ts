export interface AuthProps {
    auth: {
        signOut: () => void;
        signInWithEmailAndPassword: (email: string, password: string) => void;
    };
}
