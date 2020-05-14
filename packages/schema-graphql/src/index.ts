import CreateDirective from './directives/create';

export * from '../lib/types';
export { default as createSchema } from './createSchema';

export const schemaDirectives = {
    create: CreateDirective
};
