import { _Node } from '@feuertiger/schema-graphql';

export const parseGlobalId = (
    globalId: string
): { id: string; type: string } => {
    const [type, id] = globalId.split(':');
    return {
        id,
        type
    };
};

export const buildGlobalId = (id: string, type: string): string =>
    `${type}:${id}`;

export const connectInput = <T = _Node>(connections: _Node[]): Connection[] =>
    connections
        ?.map(
            (connection) =>
                connection && {
                    upsert: {
                        id: connection.id
                    }
                }
        )
        .filter((connection) => connection);

type Options = {
    connections: string[] | null;
};

type Connection = {
    upsert: {
        id: string;
    };
};

export const mapInput = <T>(
    { id, ...rest }: _Node,
    options: Options | null | undefined
): T => {
    const data = rest as T;

    options?.connections?.forEach((key) => {
        // @ts-ignore
        const connections = data[key];
        if (connections) {
            // @ts-ignore
            data[key] = connectInput(connections);
        }
    });

    return { id, ...data };
};
