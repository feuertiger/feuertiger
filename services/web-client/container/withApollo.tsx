import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/link-context';
import withApollo from 'next-with-apollo';
import fetch from 'isomorphic-unfetch';

import AuthSingleton from './authSingleton';

const GRAPHQL_URL = 'http://localhost:4000/';

const authLink = setContext(async (_, { headers }) => {
    try {
        const token = await new AuthSingleton().firebaseAuth.currentUser.getIdToken();
        return {
            headers: {
                ...headers,
                authorization: token
            }
        };
    } catch (error) {
        return {
            headers
        };
    }
});

const httpLink = createHttpLink({
    fetch,
    uri: GRAPHQL_URL
});

export interface ApolloProps {
    apollo: any;
}

const initClient = ({ initialState }) =>
    new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache().restore(initialState || {})
    });

export default withApollo(initClient);
