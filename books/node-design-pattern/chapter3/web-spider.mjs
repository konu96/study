import { urlToFilename } from './utilities';
import fs from 'fs';
import mkdirp from 'mkdirp';
import path from 'path';
import request from 'request';

const saveFile = (fileName, contents, callback) => {
    mkdirp(path.dirname(fileName), error => {
        if (error) {
            return callback(error);
        }
        fs.writeFile(fileName, contents, callback);
    });
};

const download = (url, fileName, callback) => {
    console.log(`Downloading ${url}`);
    request(url, (error, response, body) => {
        if (error) {
            return callback(error);
        }
        saveFile(fileName, body, error => {
            if (error) {
                return callback(error);
            }
            console.log(`Downloaded and saved: ${url}`);
            callback(null, body);
        });
    });
};

const spider = (url,  callback) => {
    const fileName = urlToFilename(url);
    fs.exists(fileName, exists => {
        if (!exists) {
            return callback(null, fileName, false);
        }
        download(url, fileName, error => {
            if (error) {
                return callback(error);
            }
            callback(null, fileName, true);
        });
    });
};

if (process.argv.length < 3) {
    console.log(`Missing arguments`);
    process.exit(1);
}

spider(process.argv[2], (error, fileName, downloaded) => {
    if (error) {
        console.log(error);
        return;
    }
    if(downloaded) {
        console.log(`Completed the download of ${fileName}`);
        return;
    }

    console.log(`${fileName} was already downloaded`);
});
