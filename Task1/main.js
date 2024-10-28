const { searchFiles } = require('./searchFiles');

const dirPath = process.argv[2];
const fileNames = process.argv.slice(3);
const caseSensitive = true;

if (!dirPath || fileNames.length === 0) {
  console.log('Usage: node main.js <directory-path> <file-name-1> <file-name-2> ...');
} else {
  const results = searchFiles(dirPath, fileNames, caseSensitive);
  for (const [fileName, data] of Object.entries(results)) {
    console.log(`Found ${fileName} in ${data.count} locations:`);
    data.paths.forEach(filePath => console.log(filePath + '\n'));
  }
}
