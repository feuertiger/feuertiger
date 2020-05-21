import { test, describe, expect } from '@jest/globals';

describe('Test context', () => {
    test('should create context', () => {
        const context = require('./context');
        expect(context).toBeTruthy();
    });
});
