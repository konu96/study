import { urlToFilename, getPageLinks } from './utilities';
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

const spiderLinks = (currentUrl, body, nesting, callback) => {
    if (nesting === 0) {
        return process.nextTick(callback);
    }

    const links = getPageLinks(currentUrl, body);

    const iterate = index => {
        if (index === linsk.length) {
            return callback();
        }
        spider(links[index], nesting - 1, error => {
            if (error) {
                return callback(error);
            }
            iterate(index + 1);
        });

        iterate(0);
    }
};

const spider = (url, nesting, callback) => {
    const fileName = urlToFilename(url);
    fs.readFile(fileName, 'utf8', (error, body) => {
        if (error) {
            if (error.code !== 'ENOENT') {
                return callback(error);
            }

            return download(url, fileName, (error, body) => {
                if (error) {
                    return callback(error);
                }
                spiderLinks(url, body, nesting, callback);
            });
        }
        spiderLinks(url, body, nesting, callback);
    })
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
