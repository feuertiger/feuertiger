import {
    IntrospectionType,
    IntrospectionObjectType,
    IntrospectionSchema,
    IntrospectionInterfaceType
} from 'graphql';
import uuidv4 from 'uuid/v4';

export const isNodeObjectType = (
    type: any
): type is IntrospectionObjectType | IntrospectionInterfaceType =>
    type.name === 'Node' ||
    (type.interfaces &&
        type.interfaces.find(
            (interfaceinfo: any) => interfaceinfo.name === 'Node'
        ));

export const isConnectionObjectType = (
    type: any
): type is IntrospectionObjectType | IntrospectionInterfaceType =>
    type.name === 'Connection' ||
    (type.interfaces &&
        type.interfaces.find(
            (interfaceinfo: any) => interfaceinfo.name === 'Connection'
        ));

// TypeFilter
export const isIntrospectionObjectType = (
    type: IntrospectionType
): type is IntrospectionObjectType | IntrospectionInterfaceType =>
    (type.kind === 'OBJECT' || type.kind === 'INTERFACE') &&
    (isNodeObjectType(type) || isConnectionObjectType(type));

export const isIntrospectionQueryObjectType = (
    type: IntrospectionType
): type is IntrospectionObjectType =>
    type.kind === 'OBJECT' && type.name === 'Query';

// GlobalId Utils
export const GenerateId = (type: string): string => `${type}:${uuidv4()}`;

export type IdInfo = {
    type: string;
    uuid: string;
};

export const ParseId = (id: string): IdInfo => {
    const [type, uuid] = id.split(':');
    return {
        type,
        uuid
    };
};

export const filterIntrospectionObjectTypes = (
    __schema: IntrospectionSchema
): Array<IntrospectionObjectType | IntrospectionInterfaceType> => [
    ...__schema.types.filter<
        IntrospectionObjectType | IntrospectionInterfaceType
    >(isIntrospectionObjectType),
    ...__schema.types.filter<IntrospectionObjectType>(
        isIntrospectionQueryObjectType
    )
];
