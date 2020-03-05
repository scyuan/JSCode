// 语法
// array.reduce(function(total, currentValue, currentIndex, arr), initialValue)

Array.prototype.reduce1 = function (callback, initialValue) {
  if (this && Object.prototype.toString.call(this).slice(8, -1) === 'Array') {
    initialValue = initialValue ? initialValue : 0;
    let arr = this;
    for (let i = 0; i < arr.length; i++) {
      initialValue = callback(initialValue, arr[i], i, arr);
    }
    return initialValue;
  } else {
    throw Error(`${this} is not a Array`);
  }
}
var a = [1, 2, 3];

console.log(a.reduce1(function (total, curr) {
  return total + curr;
}, "f"))