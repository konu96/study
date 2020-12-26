interface Foo {
    readonly [x: number]: number;
}

const foo: Foo = { 0: 123, 1: 456 };

console.log(foo[0]);
