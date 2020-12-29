const modules = (() => {
    const privateFoo = () => console.log('privateFoo');
    const privateBar = [];

    const exported = {
        publicFoo: () => console.log('publicFoo'),
        publicBar: ['a', 'b'],
    };

    return exported;
})();

console.log(modules);
