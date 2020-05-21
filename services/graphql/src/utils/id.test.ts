import { test, describe, expect } from '@jest/globals';
import { parseGlobalId, buildGlobalId } from './id';

describe('Test id utils', () => {
    test('should parse global id', () => {
        const { id, type } = parseGlobalId('type:451443');
        expect(id).toBe('451443');
        expect(type).toBe('type');
    });

    test('should build global id', () => {
        const id = buildGlobalId('451443', 'type');
        expect(id).toBe('type:451443');
    });
});
