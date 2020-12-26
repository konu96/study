const extend = <T, U>(first: T, second: U): T & U => {
    let result = <T & U> {};
    for (let id in first) {
        // @ts-ignore
        result[id] = first[id];
    }

    for (let id in second) {
        if (!result.hasOwnProperty(id)) {
            // @ts-ignore
            result[id] = second[id];
        }
    }

    return result;
};

const x = extend({ a: 'hello' }, { b: 42 });

console.log(x.a);
console.log(x.b);
