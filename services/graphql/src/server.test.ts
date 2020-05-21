import { test, describe, expect } from '@jest/globals';
import { gqlServer } from './server';

describe('Test server', () => {
    test('should create server', () => {
        const server = gqlServer();
        expect(server).toBeTruthy();
    });
});
