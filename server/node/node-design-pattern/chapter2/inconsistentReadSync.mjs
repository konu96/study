import fs from 'fs';

const cache = {};

export default fileName => {
    if (cache[fileName]) {
        return cache[fileName];
    } else {
        cache[fileName] = fs.readFileSync(fileName, 'utf8');
        return cache[fileName];
    }
};
