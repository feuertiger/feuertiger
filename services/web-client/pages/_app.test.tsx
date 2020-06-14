import { test, describe, expect } from '@jest/globals';
import { shallow } from 'enzyme';
import App, { AppProps } from './_app';

const appPropsMock: AppProps = {
    auth: {
        signInWithEmailAndPassword: () => {},
        signOut: () => {}
    },
    error: undefined,
    apollo: {},
    isLoading: false,
    isSignedIn: true,
    pageProps: {}
};

describe('Test nextjs app', () => {
    test('should create _app', () => {
        const component = shallow(
            <App {...appPropsMock}>
                <div>test</div>
            </App>
        );
        expect(component).toMatchSnapshot();
    });
});
