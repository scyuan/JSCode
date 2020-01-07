// 发布-订阅模式又叫做观察者模式，他定义了一种一对多的依赖关系，即当一个对象的状态发生改变的时候，所有依赖他的对象都会得到通知。

// dom.addEventListner('click',function(){
//     console.log("点击事件") 
// })

// dom.click();

// 简版

let simpleDom = {};
simpleDom.observers = [];

simpleDom.addEventListener = function (fn) {
  simpleDom.observers.push(fn);
};

simpleDom.click = function () {
  // arguments是函数的一个类数组对象
  for (let i = 0; i < this.observers.length; i++) {
    this.observers[i].apply(null, arguments);
  }
}

simpleDom.addEventListener(function (domName) {
  console.log(`${domName} 点击`);
})

setTimeout(() => {
  simpleDom.click('dom name is div');
}, 300);


// 增加key。订阅指定事件
let keyDom = {};

keyDom.observers = {};

keyDom.addEventListener = function (key, fn) {
  if (!keyDom.observers[key]) {
    keyDom.observers[key] = [];
  }
  keyDom.observers[key].push(fn);
}

keyDom.click = function () {
  if (!this.observers['click'] || this.observers['click'].length <= 0) return false;
  for (let i = 0; i < this.observers['click'].length; i++) {
    this.observers['click'][i].apply(null, arguments);
  }
}

keyDom.hover = function () {
  if (!this.observers['hover'] || this.observers['hover'].length <= 0) return false;
  for (let i = 0; i < this.observers['hover'].length; i++) {
    this.observers['hover'][i].apply(null, arguments);
  }
}

keyDom.addEventListener('click', function (domName) {
  console.log(`${domName} 点击`);
})

keyDom.addEventListener('hover', function (domName) {
  console.log(`${domName} 遮罩`);
})

setTimeout(() => {
  keyDom.click('div');
  keyDom.hover('div');
  // keyDom.click('dom name is p');
}, 300);

// 封装成对象

// 发布者
class Dom {
  constructor(name) {
    this.name = name;
    this.observers = [];
  }

  // 把订阅者的信息缓存起来
  addEventListener(key, fn) {
    if (!this.observers[key]) {
      this.observers[key] = [];
    }
    this.observers[key].push(fn);
    this._initTrigger(key);
  }
  _initTrigger(key) {
    if (!this[key]) {
      this[key] = function () {
        if (!this.observers[key] || this.observers[key].length <= 0) return false;
        for (let i = 0; i < this.observers[key].length; i++) {
          this.observers[key][i].apply(null, arguments);
        }
      }
    }
  }
}

let div = new Dom();
let p = new Dom();

// click是一个订阅者
div.addEventListener('click', function () {
  console.log("div 点击事件");
})
// hover是另外一个订阅者
div.addEventListener('hover', function () {
  console.log("div 遮罩事件");
})

p.addEventListener('click', function () {
  console.log("p 点击事件");
})
p.addEventListener('hover', function () {
  console.log("p 遮罩事件");
})

// 触发click，发布者会给订阅了click的用户触发事件
div.click();
div.hover();

p.click();
p.hover();