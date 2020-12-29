import findPattern from './findPattern';
import FindPatternClass from './findPatternClass';

const files = ['file1.txt', 'file2.json'];
const regex = /hello \w+/g;

findPattern(files, regex)
.on('fileRead', file => console.log(`${file} was read`))
.on('found', (file,  match) => console.log(`Matched ${match} in file ${file}`))
.on('error', error => console.log(`Error emitted: ${error.message}`));

const findPatternObject = new FindPatternClass(regex);

files.forEach(file => findPatternObject.addFile(file));
findPatternObject.find()
    .on('found', (file,  match) => console.log(`Matched ${match} in file ${file}`))
    .on('error', error => console.log(`Error emitted: ${error.message}`));
