import fs from 'fs';
import events from 'events';

export default (files, regex) => {
    const emitter = new events.EventEmitter();
    files.forEach(file => {
        fs.readFile(file, 'utf8', (error, content) => {
            if (error) {
                return emitter.emit('error', error);
            }
            emitter.emit('fileRead', file);
            const match = content.match(regex) || [];
            match.forEach(element => emitter.emit('found', file, element));
        });
    });
    return emitter;
};
