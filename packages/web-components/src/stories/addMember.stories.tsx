/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { AddMember, AddMemberProps } from '../components/addMember/addMember';

const defaultProps: AddMemberProps = {
    handleClose: () => {},
    startOcr: async (_videoElement, _handleData) => {
        _handleData('test');
        return () => {};
    },
    open: true
};

storiesOf('AddMember', module).add('Default', () => {
    const props: AddMemberProps = {
        ...defaultProps,
        open: true
    };
    return <AddMember {...props} />;
});
