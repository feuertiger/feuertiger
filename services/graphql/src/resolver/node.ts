import { NodeResolvers } from '@feuertiger/schema-graphql';
import { parseGlobalId } from '../utils/id';

const Node: NodeResolvers = {
    __resolveType: (parent) => {
        const { id } = parent;
        const { type } = parseGlobalId(id);
        return type as any;
    }
};

export default Node;
