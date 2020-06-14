/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useQuery } from '@apollo/client';

import { Member, MemberProps } from '@feuertiger/web-components';
import { AllPersonsDocument } from '@feuertiger/schema-graphql';

export default () => {
    const props = useQuery(AllPersonsDocument);
    const memberProps: MemberProps = {
        ...props,
        data: {
            allPersons: props?.data?.allPersons?.map((person) => ({
                ...person
            }))
        }
    };
    return <Member {...memberProps} />;
};
