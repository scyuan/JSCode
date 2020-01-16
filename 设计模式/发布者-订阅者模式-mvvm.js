// Vue方法 入口函数。
function Vue(options) {

  if (!options.el || !options.data) {
    console.error('el or data is needed');
    return;
  }

  this.$el = options.el;
  this.$data = options.data;

  if (this.$el) {
    // 数据劫持
    new Observer(this.$data);
    // 编译模板，将实例数据写进html
    new Compile(this.$el, this);
  }
  return this;
}

Vue.prototype = {

}

// 1. 在内存中操作，提取元素节点和文本节点
// 2. 把编译好的fragment渲染到页面
function Compile(el, vm) {
  this.el = this.isElementNode(el) ? el : document.querySelector(el);
  this.vm = vm;
  if (this.el) {
    // 将真实的dom移入内存处理
    let fragment = this.node2fragment(this.el);
    // 编译，提取想要的元素
    this.compile(fragment);
    this.el.appendChild(fragment);
  }
}

Compile.prototype = {
  // 判断是否是element节点（div或者p之类的节点）
  isElementNode(node) {
    return node.nodeType === 1;
  },
  node2fragment(node) {
    let fragment = document.createDocumentFragment();
    // 任何空格或者回车、返回、指标都会创建一个#text节点
    while (node.firstChild) {
      // 如果被插入的节点已经存在于当前文档的文档树中,则那个节点会首先从原先的位置移除,然后再插入到新的位置.
      fragment.appendChild(node.firstChild);
    }
    return fragment;
  },
  isDirective(attrName) {
    return /^v-./g.test(attrName);
  },
  compile(fragment) {
    // 获取元素节点，获取指定或者模板{{}}
    let childNodes = fragment.childNodes;
    Array.from(childNodes).forEach(node => {
      if (this.isElementNode(node)) {
        // 元素节点 继续递归
        // 编译元素节点
        this.compileElement(node);
        this.compile(node);
      } else {
        // 文本节点
        // 编译文本节点
        this.compileText(node)
      }
    })
  },
  compileText(node) {
    // 获取 {{ }} 内的表达式;
    let expr = node.textContent;
    let reg = /\{\{([^}]+)\}\}/g;
    if (reg.test(expr)) {
      CompileUtil['text'](node, this.vm, expr);
    }
  },
  compileElement(node) {
    // 提取指令
    let attrs = node.attributes;
    Array.from(attrs).forEach(attr => {
      let attrName = attr.name;
      if (this.isDirective(attrName)) {
        // 指令
        let attrVal = attr.value;
        // 获取指令名称
        let [, type] = attrName.split('-');
        // 取到对应的值放到节点中
        CompileUtil[type](node, this.vm, attrVal);
      }
    })
  }
}


CompileUtil = {
  // 取到实例上的数据
  getVal(vm, key) {
    // 处理这种情况 v-model="obj.value.val";
    // console.log(vm);
    key = key.split('.');
    // 巧用数组的reduce的函数
    // prev 必需。初始值, 或者计算结束后的返回值
    // next 必需。当前元素
    // vm.$data 可选。传递给函数的初始值
    return key.reduce((prev, next) => {
      return prev[next];
    }, vm.$data);
  },
  // 更新实例上的数据
  setVal(vm, expr, newVal) {
    expr = expr.split('.');
    return expr.reduce((prev, next, currentIndex) => {
      if (currentIndex === expr.length - 1) {
        return prev[next] = newVal
      }
      return prev[next]
    }, vm.$data)

  },
  getTextVal(vm, expr) {
    // 获取{{}}内的表达式
    return expr.replace(/\{\{([^{}]+)\}\}/g, (...arguments) => {
      // 从实例data中取对应的值
      return this.getVal(vm, arguments[1].trim())
    })
  },
  text(node, vm, expr) {
    expr = expr.trim();
    let updateFn = this.updater['textUpdater'];
    updateFn && updateFn(node, this.getTextVal(vm, expr));
    expr.replace(/\{\{([^{}]+)\}\}/g, (...arguments) => {
      new Watcher(vm, arguments[1], (newVal) => {
        updateFn && updateFn(node, newVal);
      })
    })
  },
  model(node, vm, expr) {
    let updateFn = this.updater['modelUpdater'];
    updateFn && updateFn(node, this.getVal(vm, expr));

    new Watcher(vm, expr, (newVal) => {
      updateFn && updateFn(node, newVal);
    })

    node.addEventListener('input', e => {
      let newVal = e.target.value;
      this.setVal(vm, expr, newVal);
    })



  },
  updater: {
    // 输入框更新
    modelUpdater(node, value) {
      node.value = value;
    },
    // 文本更新
    textUpdater(node, value) {
      node.textContent = value;
    }
  }
}


function Observer(data) {
  this.observe(data);
}

Observer.prototype = {
  observe(data) {
    if (!data || typeof data !== 'object') {
      return;
    }
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key]);
      this.observe(data[key]);
    })
  },
  defineReactive(obj, name, val) {
    let that = this;
    let dep = new Dep();
    Object.defineProperty(obj, name, {
      configurable: false,
      enumerable: true,
      get() {
        Dep.target && dep.addSub(Dep.target);
        return val;
      },
      set(newVal) {
        if (newVal !== val) {
          that.observe(newVal);
          val = newVal;
          dep.notify();
        }
      }
    })
  }
}
// 观察者的目的就是给需要变化的那个元素增加一个观察者，当数据变化后执行对应的方法
function Watcher(vm, expr, cb) {
  this.vm = vm;
  this.expr = expr;
  this.cb = cb;

  // 获取老的值
  this.value = this.get();
}

Watcher.prototype = {
  getVal(expr) {
    // 获取实例中的数据
    expr = expr.trim().split('.');
    return expr.reduce((prev, next) => {
      return prev[next];
    }, this.vm.$data)
  },
  get() {
    Dep.target = this;
    let value = this.getVal(this.expr);
    Dep.target = null;
    return value;
  },
  // 对外暴露的方法
  update() {
    let newVal = this.getVal(this.expr);
    let oldVal = this.value;
    if (newVal !== oldVal) {
      this.cb(newVal);
    }
  }
}

function Dep() {
  this.subs = [];
}
Dep.prototype = {
  addSub(watcher) {
    this.subs.push(watcher);
  },
  notify() {
    this.subs.forEach(watcher => {
      watcher.update();
    })
  }
}