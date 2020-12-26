var merge = function (first, second) {
    // return Object.assign({}, first, second); // error
    return Object.assign({}, first, second);
};
var merged = merge({ foo: 'foo' }, { bar: 'bar' });
console.log(merged);
