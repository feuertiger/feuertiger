import casual from 'casual';
import { ExerciseCreateInput } from '../../dist';

const length = 200;

casual.seed(length);

export default Array.from({ length }, () => ({
    id: `exercise:${casual.uuid}`,
    topic: casual.title,
    timeslot: {
        create: {
            id: `timeslot:${casual.uuid}`,
            start: new Date(),
            end: new Date()
        }
    }
})) as Array<ExerciseCreateInput>;
