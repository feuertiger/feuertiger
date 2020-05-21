import { test, describe, expect } from '@jest/globals';
import { parseId, buildId } from './id';

describe('Test id utils', () => {
    test('should parse id', () => {
        const { id, type } = parseId('type:451443');
        expect(id).toBe(451443);
        expect(type).toBe('type');
    });

    test('should build id', () => {
        const id = buildId(451443, 'type');
        expect(id).toBe('type:451443');
    });
});
