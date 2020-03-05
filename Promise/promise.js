const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";

// 实现了then、简单的实现了链式调用、实现了状态管理
// 但是通过后面的例子可以看出，then函数每次都是返回resolve的值

function MyPromise(fn) {
  this.state = PENDING;
  this.value = undefined;
  this.successStacks = [];
  try {
    // 这里注意，一定要给resolve绑定this，不然在resolve函数内部的this将指向外层的this
    fn(this.resolve.bind(this), this.reject.bind(this));
  } catch (error) {
    this.reject(e);
  }
}

MyPromise.prototype.then = function (onFulfilled) {
  if (this.state === PENDING) {
    this.successStacks.push(onFulfilled);
  } else {
    onFulfilled(this.value);
  }
  // 返回this之后可以进行链式调用
  return this;
}

MyPromise.prototype.resolve = function (val) {
  if (this.state !== PENDING) return;
  this.state = FULFILLED;
  this.value = val;
  // 增加延迟执行，防止先执行了reslove，但是没有把注册的then放入队列
  // 当在then方法里面增加状态后，可把下面的状态去掉。虽然同步执行resolve时，successStacks为空，但是后面注册上来时，会直接执行then函数的回调
  setTimeout(() => {
    this.successStacks.forEach(fn => fn(val));
  });
}

MyPromise.all = function (promises) {
  // promises为成员为promise对象的数组
  let resolvedCount = 0;
  let results = [];
  return new MyPromise((resolve, reject) => {

    for (let i = 0; i < promises.length; i++) {
      MyPromise.resolve(promises[i]).then((val) => {
        // 处理resolve
        resolvedCount++;
        results[i] = val;
        if (promises.length === resolvedCount) {
          resolve(results);
        }
      }, (err) => {
        reject(err);
      })
    }
  })
}

MyPromise.prototype.reject = function (reason) {

}

const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 300);
}).then(val => {
  console.log(val);
}).then(val => {
  console.log(val);
})

// const promise1 = new Promise((resolve, reject) => {
//   resolve('xixi');
// }).then(val => {
//   console.log(val);
// })



// let mp = new MyPromise();

for (let i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log('=====', i);
  }, 100 * i);
}

for (var i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log('-----', i);
  }, 1000 * i);
}