import faker from 'faker';
import { PersonCreateInput } from '../../dist';
import exercises from './exercise';

const length = 100;

faker.locale = 'de';
faker.seed(length);

const persons: Array<PersonCreateInput> = Array.from({ length }, () => ({
    id: `person:${faker.random.uuid()}`,
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    exercisesParticipated: {
        connect: [
            {
                id: exercises[0].id
            },
            {
                id: exercises[1].id
            },
            {
                id: exercises[2].id
            },
            {
                id: exercises[4].id
            }
        ]
    }
}));

persons[0].exercisesLeaded = {
    connect: [
        {
            id: exercises[0].id
        },
        {
            id: exercises[1].id
        },
        {
            id: exercises[2].id
        },
        {
            id: exercises[4].id
        }
    ]
};

export default persons;
