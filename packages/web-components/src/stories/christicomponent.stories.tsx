/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import {
    ChrisComponent,
    ChrisComponentProps
} from '../components/chrisicomponent/chrisicomponent';

const defaultProps: ChrisComponentProps = {
    name: 'michi'
};

storiesOf('ChrisComponent', module)
    .add('Michi', () => {
        const props: ChrisComponentProps = {
            ...defaultProps
        };
        return <ChrisComponent {...props} />;
    })
    .add('Mina', () => {
        const props: ChrisComponentProps = {
            ...defaultProps,
            name: 'mina'
        };
        return <ChrisComponent {...props} />;
    });
