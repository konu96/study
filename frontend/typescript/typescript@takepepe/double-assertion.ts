const func = (argument: string): number => {
    return argument as any as number;
}

console.log(func('aaa'));
console.log(func('123'));
