import React from 'react';
import NextApp, { AppInitialProps } from 'next/app';
import { ApolloProvider } from '@apollo/react-hooks';
import Skeleton from '@material-ui/lab/Skeleton';

import { Container, ThemeProvider } from '@feuertiger/web-components';
import withAuth, { AuthProps, AuthStateProps } from '../container/withAuth';
import withApollo, { ApolloProps } from '../container/withApollo';

import Login from '../components/login';
import Head from '../components/head';

interface Props
    extends AppInitialProps,
        ApolloProps,
        AuthProps,
        AuthStateProps {}

class App extends NextApp<Props> {
    // remove it here
    componentDidMount() {
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles && jssStyles.parentNode) {
            jssStyles.parentNode.removeChild(jssStyles);
        }
    }

    render() {
        const {
            Component,
            pageProps,
            apollo,
            auth,
            isLoading,
            isSignedIn
        } = this.props;

        const showLogin = !isLoading && !isSignedIn;
        const showSkeleton = isLoading || !isSignedIn;

        return (
            <ApolloProvider client={apollo}>
                <ThemeProvider>
                    <Head />
                    {showLogin && <Login auth={auth} />}
                    <Container auth={auth}>
                        {showSkeleton ? (
                            <>
                                <Skeleton height={40} />
                                <Skeleton variant="rect" height={190} />
                                <Skeleton height={40} />
                                <Skeleton variant="rect" height={190} />
                                <Skeleton height={40} />
                                <Skeleton variant="rect" height={190} />
                            </>
                        ) : (
                            // eslint-disable-next-line
                            <Component {...pageProps} />
                        )}
                    </Container>
                </ThemeProvider>
            </ApolloProvider>
        );
    }
}

// const appWithApollo = withApollo(App);
// export default withAuth(appWithApollo);

const appWithAuth = (withAuth(App) as unknown) as typeof NextApp;
export default withApollo(appWithAuth);
