// fileSearch.test.js

const fs = require('fs');
const path = require('path');
const {recursiveFileSearch} = require('./searchFiles');

describe('Recursive File Search', () => {
    const testDir = path.join(__dirname, 'testDir');

    beforeAll(() => {
        // Create a test directory structure
        fs.mkdirSync(testDir, { recursive: true });
        fs.writeFileSync(path.join(testDir, 'file1.txt'), 'Hello World');
        fs.mkdirSync(path.join(testDir, 'subDir'));
        fs.writeFileSync(path.join(testDir, 'subDir', 'file2.txt'), 'Hello Again');
    });

    afterAll(() => {
        // Cleanup test directory
        fs.rmdirSync(path.join(testDir, 'subDir'), { recursive: true });
        fs.unlinkSync(path.join(testDir, 'file1.txt'));
        fs.rmdirSync(testDir);
    });

    test('should find the file in the directory', () => {
        const result = recursiveFileSearch(testDir, 'file1.txt');
        expect(result).toBe(path.join(testDir, 'file1.txt'));
    });

    test('should find the file in a subdirectory', () => {
        const result = recursiveFileSearch(testDir, 'file2.txt');
        expect(result).toBe(path.join(testDir, 'subDir', 'file2.txt'));
    });

    test('should return null if the file is not found', () => {
        const result = recursiveFileSearch(testDir, 'file3.txt');
        expect(result).toBeNull();
    });

    test('should throw an error if the directory does not exist', () => {
        expect(() => recursiveFileSearch('invalidDir', 'file1.txt')).toThrow('Directory does not exist: invalidDir');
    });

    test('should search case-sensitively', () => {
        const result = recursiveFileSearch(testDir, 'FILE1.TXT', false);
        expect(result).toBe(path.join(testDir, 'file1.txt'));
    });
});
