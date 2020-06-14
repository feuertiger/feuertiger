import { MutationResolvers } from '@feuertiger/schema-graphql';
import {
    PersonCreateInput,
    PersonUpdateInput
} from '@feuertiger/schema-prisma';
import { Context } from '../context';
import { parseGlobalId, mapInput } from '../utils/id';

export const deleteNode = ({
    id,
    context
}: {
    id: string;
    context: Context;
}): Promise<boolean> | boolean => {
    const { type } = parseGlobalId(id);
    // @ts-ignore
    const resolver = context.db[type];
    return resolver ? resolver({ id }) : false;
};

const Mutation: MutationResolvers = {
    delete: (_parent, { id }, context) => deleteNode({ id, context }),
    createPerson: async (_parent, args, context: Context) => {
        const data = mapInput<PersonCreateInput>(args.person, {
            connections: ['exercisesParticipated', 'exercisesLeaded']
        });
        const created = await context.db.person.create({ data });
        return created;
    },
    updatePerson: async (_parent, args, context: Context) => {
        const data = mapInput<PersonUpdateInput>(args.person, {
            connections: ['exercisesParticipated', 'exercisesLeaded']
        });
        const update = await context.db.person.update({
            where: {
                id: data.id
            },
            data
        });
        return update || null;
    },
    addExerciseToPerson: async (_parent, args, context: Context) => {
        const { personId, exerciseId } = args;
        const update = await context.db.person.update({
            where: {
                id: personId
            },
            data: {
                exercisesParticipated: {
                    connect: { id: exerciseId }
                }
            }
        });
        return !!update;
    },
    removeExerciseFromPerson: async (_parent, args, context: Context) => {
        const { personId, exerciseId } = args;
        const update = await context.db.person.update({
            where: {
                id: personId
            },
            data: {
                exercisesParticipated: {
                    disconnect: { id: exerciseId }
                }
            }
        });
        return !!update;
    }
};

export default Mutation;
