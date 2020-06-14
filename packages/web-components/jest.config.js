const defaultConfig = require('../../jest.config.js');

module.exports = {
    ...defaultConfig,
    setupFilesAfterEnv: ['./setupTests.ts'],
    snapshotSerializers: ['enzyme-to-json/serializer'],
    testEnvironment: 'enzyme',
    testEnvironmentOptions: {
        enzymeAdapter: 'react16'
    }
};
