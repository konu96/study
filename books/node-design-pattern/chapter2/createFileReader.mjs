import inconsistentRead from './inconsistentRead.mjs';

export default fileName => {
    const listeners = [];
    inconsistentRead(fileName, value => {
        listeners.forEach(listener => listener(value));
    });

    return {
        onDataReady: listener => listeners.push(listener),
    };
};
