/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Login, LoginProps } from '../components/login/login';
import { authPropsMock } from '../types/authProps.mock';

const defaultProps: LoginProps = {
    ...authPropsMock
};

storiesOf('Login', module).add('Default', () => {
    const props: LoginProps = {
        ...defaultProps
    };
    return <Login {...props} />;
});
