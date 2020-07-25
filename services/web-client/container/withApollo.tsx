import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/link-context';
import withApollo, { WithApolloState } from 'next-with-apollo';
import fetch from 'isomorphic-unfetch';

import AuthSingleton from './authSingleton';

const { graphqlUri } = getConfig();

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
    uri: graphqlUri
});

export interface ApolloProps {
    apollo: ApolloClient<any>;
    apolloState: WithApolloState<any>;
}

const initClient = ({ initialState }) =>
    new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache().restore(initialState || {})
    });

export default (WrappedComponent: any): any =>
    withApollo(initClient)(WrappedComponent);
