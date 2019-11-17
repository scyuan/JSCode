// apply方法和call方法类似。区别就是apply接收的参数是数组。

Function.prototype.fake_apply = function (thisArg) {
  if (typeof this !== 'function') {
    throw this + 'is not a function';
  }
  // 1. 拿到参数
  const args = arguments[1];
  // 2. 拿到需要重新指向的this
  thisArg = thisArg || window || global;
  // 执行 thisArg.this （this is a function）

  // 防止fn被占用
  const fn = Symbol('fn');

  thisArg[fn] = this;

  const result = thisArg[fn](args);

  delete thisArg[fn];

  return result;
}