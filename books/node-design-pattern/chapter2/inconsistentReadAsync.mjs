import fs from 'fs';

const cache = {};

export default (fileName, callback) => {
    if (cache[fileName]) {
        process.nextTick(() => callback(cache[fileName]));
    } else {
        fs.readFile(fileName, 'utf8', (error, data) => {
            cache[fileName] = data;
            callback(data);
        });
    }
};
