const merge = <T, U>(first: T, second: U): T & U => {
  // return Object.assign({}, first, second); // error
  return (<any>Object).assign({}, first, second);

};

const merged = merge({ foo: 'foo' }, { bar: 'bar' });

console.log(merged);
