/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import { SchemaDirectiveVisitor } from 'apollo-server';
import { GraphQLField, GraphQLObjectType } from 'graphql';
import { Context } from '../createSchema';

interface Model {
    create: (object: { data: { data: any } }) => any;
}

export default class CreateDirective extends SchemaDirectiveVisitor {
    public visitFieldDefinition(field: GraphQLField<any, any>) {
        const fieldType = field.type as GraphQLObjectType;
        const fieldName = field.name;
        const fieldTypeName = fieldType.name;

        const { resolve } = field;

        const nextResolve = (
            _obj: any,
            args: { [s: string]: unknown } | ArrayLike<unknown>,
            context: Context
        ) => {
            // @ts-ignore
            const model = context.db[fieldTypeName] as Model;
            const data = Object.values(args)[0];
            model.create({ data: { data } });
        };

        field.resolve = resolve
            ? (obj: any, args: any, context: any, info: any) => {
                  const result = resolve(obj, args, context, info);
                  obj[fieldName] = {
                      ...obj[fieldName],
                      ...result
                  };
                  return nextResolve(obj, args, context);
              }
            : nextResolve;
    }
}
