let {
  a,
  setCount
} = require('./a.js');

console.log('b1', a);
setCount();
console.log('b2', a);

setTimeout(() => {
  console.log('b3', a);
}, 2000);