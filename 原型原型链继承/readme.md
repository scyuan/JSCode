`prototype`,原型，每个对象在被创建时，都会与之关联另一个对象，这个对象就是我们所说的原型，每一个对象都会从原型『继承』属性。

`__proto__`是每个对象及函数都隐含的一个属性。`__proto__`属性都指向创建该对象的构造函数的`prototype`，暂且称之为实例原型

`constructor`每个原型都一个属性指向关联的构造函数

JS种所有的东西都是对象，所有对象的原型链最终都指向`Object.prototype`。

JS对象都隐含了一个`__proto__`属性，它指向了创建该对象的构造函数的原型，但是有一个例外`Object.prototype.__proto__`指向的是`null`

> 原型和原型链的关系图

![image](https://tva1.sinaimg.cn/large/0082zybpgy1gby8tu8urhj312t0u00vx.jpg)
