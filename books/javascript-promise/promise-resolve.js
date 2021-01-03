const promise = new Promise(resolve => {
  console.log('inner promise');
  resolve(42);
});

promise.then(value => {
  console.log(value);
})

console.log('outer promise');

