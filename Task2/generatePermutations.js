// permutations.js

/**
 * Generates all permutations of a given string using recursion.
 * @param {string} str - The input string.
 * @returns {string[]} - An array containing all permutations of the string.
 */

function generatePermutations(str) {
    if (str.length === 0) {
        return [];
    }

    const results = [];

    // Recursive function to generate permutations
    const permute = (current, remaining) => {
        if (remaining.length === 0) {
            results.push(current);
            return;
        }

        for (let i = 0; i < remaining.length; i++) {
            const nextCurrent = current + remaining[i];
            const nextRemaining = remaining.slice(0, i) + remaining.slice(i + 1);
            permute(nextCurrent, nextRemaining);
        }
    };

    permute('', str);
    return results;
}

// Export the function for testing
module.exports = generatePermutations;
