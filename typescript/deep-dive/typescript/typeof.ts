const doSometing = (x: number | string) => {
    if (typeof x === 'string') {
        console.log(x.subtr(1));
        console.log(x.substr(1));
    }
    x.substr(1);
};

console.log(doSometing(('aaaa')));
