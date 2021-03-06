import {
    PersonCreateInput,
    AddressCreateInput,
    Sex
} from '@feuertiger/schema-prisma';

import faker from './faker';

export interface PersonConnectionNeeds {
    address: AddressCreateInput;
}

export const createPerson = ({
    address
}: PersonConnectionNeeds): PersonCreateInput => ({
    id: `person:${faker.random.uuid()}`,
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    avatar: faker.image.cats(),
    phone: faker.phone.phoneNumber(),
    sex: Sex.FEMALE,
    address: {
        connect: {
            id: address.id
        }
    },
    birthName: faker.name.lastName(),
    dateOfBirth: faker.date.past(),
    membershipNumber: faker.random.number().toString(),
    placeOfBirth: faker.address.city()
});
