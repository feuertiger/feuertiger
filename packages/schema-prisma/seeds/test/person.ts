import casual from 'casual';
import { PersonCreateInput } from '../../dist';
import exercises from './exercise';

const length = 100;

casual.seed(length);

const persons: Array<PersonCreateInput> = Array.from({ length }, () => ({
    id: `person:${casual.uuid}`,
    firstname: casual.first_name,
    lastname: casual.last_name,
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
