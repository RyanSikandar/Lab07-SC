// permutations.test.js

const generatePermutations = require('./generatePermutations');

describe('Recursive String Permutations', () => {
    test('should return all permutations of a string', () => {
        const result = generatePermutations('abc');
        const expected = ['abc', 'acb', 'bac', 'bca', 'cab', 'cba'];
        expect(result).toEqual(expect.arrayContaining(expected));
        expect(result.length).toBe(expected.length);
    });

    test('should return an empty array for an empty string', () => {
        const result = generatePermutations('');
        expect(result).toEqual([]);
    });

    test('should handle strings with duplicate characters', () => {
        const result = generatePermutations('aab');
        const expected = ['aab', 'aba', 'baa'];
        expect(result).toEqual(expect.arrayContaining(expected));
        expect(result.length).toBe(expected.length);
    });

    test('should handle single character string', () => {
        const result = generatePermutations('a');
        expect(result).toEqual(['a']);
    });
});
