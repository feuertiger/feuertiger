import { QueryResolvers, Node } from '@feuertiger/schema-graphql';
import { Context } from '../context';
import { parseGlobalId } from '../utils/id';

export const getNode = async ({
    id,
    context
}: {
    id: string;
    context: Context;
}) => {
    const { type } = parseGlobalId(id);
    // @ts-ignore
    const resolver = context.db[type];
    const node = await resolver({ id });
    return node as Node;
};

const Query: QueryResolvers = {
    node: (_parent, { id }, context) => getNode({ id, context }),
    nodes: (_parent, args, context) =>
        Promise.all(args.ids.map((id) => getNode({ id, context }))),
    allPersons: async (parent: any, args, context: Context) => {
        const persons = await context.db.person.findMany();
        return persons;
    }
};

export default Query;
