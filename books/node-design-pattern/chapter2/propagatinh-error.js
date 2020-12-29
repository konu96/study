import fs from 'fs';

const readJSON = (fileName, callback) => {
    fs.readFile(fileName, 'utf8', (error, data) => {
        if (error) {
            return callback(error);
        }

        try {
            const parsed = JSON.parse(data);
            return callback(null, parsed);
        } catch (error) {
            return callback(error);
        }
    });
};
