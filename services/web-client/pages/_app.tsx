import React from 'react';
import NextApp, { AppInitialProps } from 'next/app';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from 'styled-components';
import { ApolloProvider } from '@apollo/react-hooks';
import red from '@material-ui/core/colors/red';
import Skeleton from '@material-ui/lab/Skeleton';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import withAuth, { AuthProps, AuthStateProps } from '../container/withAuth';
import withApollo, { ApolloProps } from '../container/withApollo';
import Content from '../container/content';

import Login from '../components/login';
import Head from '../components/head';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#c90024'
        },
        secondary: {
            main: '#19857b'
        },
        error: {
            main: red.A400
        },
        background: {
            default: '#fff'
        }
    }
});

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
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <ThemeProvider theme={theme}>
                        <Head />
                        {showLogin && <Login auth={auth} />}
                        <Content auth={auth}>
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
                        </Content>
                    </ThemeProvider>
                </MuiPickersUtilsProvider>
            </ApolloProvider>
        );
    }
}

// const appWithApollo = withApollo(App);
// export default withAuth(appWithApollo);

const appWithAuth = (withAuth(App) as unknown) as typeof NextApp;
export default withApollo(appWithAuth);
