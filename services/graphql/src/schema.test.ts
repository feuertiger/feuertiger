import { test, describe, expect } from '@jest/globals';

describe('Test schema', () => {
    test('should create schema', () => {
        const schema = require('./schema');
        expect(schema).toBeTruthy();
    });
});
