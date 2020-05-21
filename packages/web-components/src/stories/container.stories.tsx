/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Container, ContainerProps } from '../components/container/container';
import auth from '../types/authProps.mock';

const defaultProps: ContainerProps = {
    ...auth
};

storiesOf('Container', module).add('Default', () => {
    const props: ContainerProps = {
        ...defaultProps
    };
    return <Container {...props} />;
});
