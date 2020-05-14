import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import AuthSingleton from './authSingleton';

export interface AuthProps {
    auth?: firebase.auth.Auth;
}

export interface AuthStateProps {
    isSignedIn: boolean;
    isLoading: boolean;
    error: any;
}

interface State extends AuthProps, AuthStateProps {}

export default <TProps extends any>(
    WrappedComponent: React.ComponentType<TProps & AuthProps & AuthStateProps>
): React.ComponentType<TProps> =>
    class AuthWrapper extends React.Component<TProps, State> {
        constructor(props: TProps) {
            super(props);
            this.state = {
                isSignedIn: true,
                isLoading: true,
                error: null,
                auth: null
            };
        }

        componentDidMount() {
            const authSignleton = new AuthSingleton();
            const { firebaseAuth } = authSignleton;

            firebaseAuth.onAuthStateChanged(async (user) =>
                this.setState({ isSignedIn: !!user, isLoading: false })
            );
            const auth: firebase.auth.Auth = {
                ...firebaseAuth
            };

            auth.signInWithEmailAndPassword = async (email, password) => {
                try {
                    this.setState({ isLoading: true });
                    const credential = await firebaseAuth.signInWithEmailAndPassword(
                        email,
                        password
                    );
                    this.setState({
                        isLoading: false,
                        isSignedIn: true
                    });
                    window.location.reload(true);
                    return credential;
                } catch (error) {
                    this.setState({ error });
                    throw error;
                }
            };

            auth.signOut = async () => {
                await firebaseAuth.signOut();
                window.location.reload(true);
            };

            this.setState({
                auth
            });
        }

        render() {
            const { ...props } = this.props;
            const { auth, isSignedIn, isLoading, error } = this.state;

            return (
                <WrappedComponent
                    // eslint-disable-next-line
                    {...props}
                    auth={auth}
                    isSignedIn={isSignedIn}
                    isLoading={isLoading}
                    error={error}
                />
            );
        }
    };
