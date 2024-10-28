// fileSearch.js

const fs = require('fs');
const path = require('path');

/**
 * Recursively searches for a file in a directory and its subdirectories.
 * @param {string} dirPath - The directory path to search in.
 * @param {string} fileName - The name of the file to search for.
 * @param {boolean} caseSensitive - Whether the search should be case-sensitive.
 * @returns {string|null} - The full path of the found file or null if not found.
 */
function recursiveFileSearch(dirPath, fileName, caseSensitive = true) {
    if (!fs.existsSync(dirPath)) {
        throw new Error(`Directory does not exist: ${dirPath}`);
    }

    const files = fs.readdirSync(dirPath);

    for (const file of files) {
        const filePath = path.join(dirPath, file);
        const isDirectory = fs.statSync(filePath).isDirectory();

        if (isDirectory) {
            const found = recursiveFileSearch(filePath, fileName, caseSensitive);
            if (found) {
                return found;
            }
        } else {
            const compareFileName = caseSensitive ? file : file.toLowerCase();
            const compareSearchName = caseSensitive ? fileName : fileName.toLowerCase();

            if (compareFileName === compareSearchName) {
                return filePath;
            }
        }
    }

    return null; // File not found in this directory
}

// Export the function for testing
module.exports = {recursiveFileSearch};
