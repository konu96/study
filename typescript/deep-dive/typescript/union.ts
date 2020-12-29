const formatCommandLine = (command: string[] | string): string => {
    if (typeof command === 'string') {
        return command.trim();
    }

    return command.join(' ').trim();
};

console.log(formatCommandLine(['one', 'two', 'three']));
