import { Resolvers } from '@feuertiger/schema-graphql';
import Query from './resolver/query';
import Node from './resolver/node';
import Mutation from './resolver/mutation';

const resolvers: Resolvers = {
    Query,
    Node,
    Mutation
};

export default resolvers;
