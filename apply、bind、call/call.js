// 实现call方法
// call方法改变this指向。
/* 原理：
 * this总是指向调用它的对象(箭头函数除外)
 */
/* 浏览器全局对象：window
 * Node全局对象：global
 */


Function.prototype.FAKE_CALL = function (thisArg) {

  // 判断调用call的主体是否是对象
  if (typeof this !== 'function') {
    throw this + 'is not a function';
  }

  // 拿到参数
  const args = [...arguments].slice(1);
  // 拿到需要指向的this
  thisArg = thisArg || global;
  // 创建一个symbol变量，防止fn被占用
  const fn = Symbol('fn');
  // this即是调用的方法
  thisArg[fn] = this;

  // this is a function
  const result = thisArg[fn](...args);

  delete thisArg[fn];

  return result;
}

function test(sm) {
  console.log(this.domain + ' ' + sm);
}

let obj = {
  domain: 'time'
}

// 未改变this指向
test('is changing');
// 改变this指向
test.FAKE_CALL(obj, 'is changing');

// 实际用法,arr可能是类数组，没有slice方法。
// 如果直接执行 arr.slice(1) 是会报错的 slice is not a function
const arr = [1, 2, 3, 4];
const arr1 = [].slice.call(arr, 1);
console.log(arr1);

const arr2 = [].slice.FAKE_CALL(arr, 1);
// 1. 拿到参数  1
// 2. 拿到this arr
// 3. 

console.log(arr2);