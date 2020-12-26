import fs from 'fs';
import events from 'events';

export default class FindPattern extends events.EventEmitter {
    constructor(regex) {
        super();
        this.regex = regex;
        this.files = [];
    }

    addFile(file) {
        this.files.push(file);
        return this;
    }

    find() {
        this.files.forEach(file => {
            fs.readFile(file, 'utf8', (error, content) => {
                if (error) {
                    return this.emit('error', error);
                }
                this.emit('fileRead', file);
                const match = content.match(this.regex) || [];
                match.forEach(element => this.emit('found', file, element));
            });
        });
        return this;
    }
}
