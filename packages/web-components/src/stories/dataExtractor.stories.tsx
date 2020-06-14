/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import {
    DataExtractor,
    DataExtractorProps
} from '../components/dataExtractor/dataExtractor';
import { Container, ContainerProps } from '../components/container/container';
import { authPropsMock } from '../types/authProps.mock';

const defaultProps: DataExtractorProps = {};
const defaultContainerProps: ContainerProps = {
    ...authPropsMock
};

storiesOf('DataExtractor', module)
    .add('Default', () => {
        const props: DataExtractorProps = {
            ...defaultProps
        };
        return <DataExtractor {...props} />;
    })
    .add('Contaienrd', () => {
        const props: DataExtractorProps = {
            ...defaultProps
        };
        return (
            <Container {...defaultContainerProps}>
                <DataExtractor {...props} />
            </Container>
        );
    });
