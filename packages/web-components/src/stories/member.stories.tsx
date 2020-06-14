/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import faker from 'faker';
import { Member, MemberProps } from '../components/member/member';

faker.locale = 'de';
faker.seed(4);

const defaultProps: MemberProps = Object.freeze({
    networkStatus: null,
    loading: false,
    error: null,
    data: {
        allPersons: [
            {
                id: faker.random.uuid(),
                firstname: faker.name.firstName(),
                lastname: faker.name.lastName()
            },
            {
                id: faker.random.uuid(),
                firstname: faker.name.firstName(),
                lastname: faker.name.lastName()
            },
            {
                id: faker.random.uuid(),
                firstname: faker.name.firstName(),
                lastname: faker.name.lastName()
            },
            {
                id: faker.random.uuid(),
                firstname: faker.name.firstName(),
                lastname: faker.name.lastName()
            }
        ]
    }
} as unknown) as MemberProps;

storiesOf('Member', module)
    .add('Default', () => {
        const props: MemberProps = {
            ...defaultProps
        };
        props.loading = false;
        props.error = null;
        return <Member {...props} />;
    })
    .add('Loading', () => {
        const props: MemberProps = {
            ...defaultProps
        };
        props.loading = true;
        props.error = null;
        return <Member {...props} />;
    })
    .add('Error', () => {
        const props: MemberProps = {
            ...defaultProps
        };
        props.loading = false;
        props.error = { message: 'error' } as any;
        return <Member {...props} />;
    });
