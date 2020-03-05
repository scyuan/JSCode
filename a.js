let a = 1;

let setCount = () => {
  a++;
}

setTimeout(() => {
  console.log('a', a);
}, 1000);

module.exports = {
  a,
  setCount
}