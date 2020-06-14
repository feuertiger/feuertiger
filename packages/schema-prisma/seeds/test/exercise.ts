import faker from 'faker';
import { ExerciseCreateInput } from '../../dist';

const length = 200;

faker.locale = 'de';
faker.seed(length);

export default Array.from({ length }, () => ({
    id: `exercise:${faker.random.uuid()}`,
    topic: faker.random.words(2),
    timeslot: {
        create: {
            id: `timeslot:${faker.random.uuid()}`,
            start: new Date(),
            end: new Date()
        }
    }
})) as Array<ExerciseCreateInput>;
