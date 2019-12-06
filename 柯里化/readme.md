函数柯里化主要有几下几个作用

- 1. 参数复用；

```JavaScript

let sayHi = function(target){
  return function(me){
    console.log(`Hi,${target},I'm ${me}`);
  }
}
sayHi('lucy')('jack') // Hi,lucy,I'm jack

let sayHiToLucy = sayHi('lucy');

sayHiToLucy('bob'); // Hi,lucy,I'm bob

```

- 2. 提前返回；

```JavaScript

// 兼容现代浏览器的事件监听写法

let addEvent = function(el, type, fn, capture) {
    if (window.addEventListener) {
        el.addEventListener(type, function(e) {
            fn.call(el, e);
        }, capture);
    } else if (window.attachEvent) {
        el.attachEvent("on" + type, function(e) {
            fn.call(el, e);
        });
    } 
};


// 上述方法在ie6/7中每次都会执行`if...else if...` 使用柯里化
let addEvent = (function(){
    if (window.addEventListener) {
        return function(el, sType, fn, capture) {
            el.addEventListener(sType, function(e) {
                fn.call(el, e);
            }, (capture));
        };
    } else if (window.attachEvent) {
        return function(el, sType, fn, capture) {
            el.attachEvent("on" + sType, function(e) {
                fn.call(el, e);
            });
        };
    }
})();

```
其实和==参数复用==的思路差不多，提前执行。

- 3. 延迟计算/运行

有同样作用的：bind方法，剪头函数