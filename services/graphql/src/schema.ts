import {
    makeExecutableSchema,
    IExecutableSchemaDefinition,
    IResolvers
} from 'apollo-server';
import fs from 'fs';
import resolvers from './resolvers';
import { Context } from './context';

const typeDefs = fs.readFileSync(
    require.resolve('@feuertiger/schema-graphql/dist/schema.graphql'),
    'utf8'
);

const schema: IExecutableSchemaDefinition<Context> = {
    typeDefs,
    resolvers: resolvers as IResolvers<any, Context>
};

const apiSchema = makeExecutableSchema(schema);

export default apiSchema;
