// 函数防抖（debounce）
/**
 * 当持续触发事件时， 一定时间段内没有再触发事件， 事件处理函数才会执行一次， 如果设定的时间到来之前， 又一次触发了事件， 就重新开始延时。
 */

function debounce(fn, wait) {
  let timer = null;
  return function () {
    if (timer !== null) {
      // 已经有函数在周期范围内
      clearTimeout(timer);
    }
    // 重新设定timer
    timer = setTimeout(fn, wait);
  }
}

function handle() {
  console.log(new Date());
}

// 函数节流（throttle）
/**
 * 当持续触发事件时， 保证一定时间段内只调用一次事件处理函数。
 * 类似LOL的大招cd，释放一次技能后，只有过了cd才能再次释放
 */

// 基于时间戳
function throttle(fn, delay) {
  let prev = Date.now();
  return function () {
    let context = this;
    let args = arguments;
    let now = Date.now();
    if (now - prev > delay) {
      // 执行fn
      fn.apply(context, args);
      prev = Date.now();
    }
  }
}

// 基于定时器
function throttle1(fn, delay) {
  let timer = null
  return function () {
    let context = this;
    let args = arguments;
    // 如果定时器timer不存在
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(context, args);
        // 重置timer
        timer = null;
      }, delay);
    }
  }
}
/**
 * 当触发事件的时候， 我们设置一个定时器， 
 * 再次触发事件的时候， 如果定时器存在， 就不执行， 
 * 直到delay时间后， 定时器执行执行函数， 并且清空定时器， 这样就可以设置下个定时器。 
 * 当第一次触发事件时， 不会立即执行函数， 而是在delay秒后才执行。 
 * 而后再怎么频繁触发事件， 也都是每delay时间才执行一次。 当最后一次停止触发后， 由于定时器的delay延迟， 可能还会执行一次函数。
 */

/**
 * “节流” 与“ 防抖” 的本质： 这两个东西都以闭包的形式存在。
 *
 * 它们通过对事件对应的回调函数进行包裹、 以自由变量的形式缓存时间信息， 最后用 setTimeout 来控制事件的触发频率。
 */