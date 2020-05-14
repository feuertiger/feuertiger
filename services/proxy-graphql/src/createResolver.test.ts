import { test, describe, expect } from '@jest/globals';

import createResolver from './createResolver';

describe('Create Resolver', () => {
    test('should invoke', () => {
        const resolver = createResolver();
        expect(resolver).toBeTruthy();
    });
});
