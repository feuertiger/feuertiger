/* eslint-disable no-console */
import { PrismaClient } from '../../dist';
import exercises from './exercise';
import persons from './person';

const client = new PrismaClient();

const save = async (create: (arg0: any) => Promise<any>, data: any) => {
    try {
        await create({ data });
        console.log('Saved ', data.id);
    } catch (error) {
        console.log('Detected ', data.id);
    }
};

(async () => {
    await Promise.all(
        exercises.map((exercise) => save(client.exercise.create, exercise))
    );

    await Promise.all(
        persons.map((person) => save(client.person.create, person))
    );

    client.disconnect();
})();
