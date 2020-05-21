/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { AppBar, AppBarProps } from '../components/appBar/appBar';
import auth from '../types/authProps.mock';

const defaultProps: AppBarProps = {
    ...auth,
    handleDrawerOpen: () => {},
    open: true
};

storiesOf('AppBar', module)
    .add('Open', () => {
        const props: AppBarProps = {
            ...defaultProps,
            open: true
        };
        return <AppBar {...props} />;
    })
    .add('Closed', () => {
        const props: AppBarProps = {
            ...defaultProps,
            open: false
        };
        return <AppBar {...props} />;
    });
