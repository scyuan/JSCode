/**
 * 在组合继承中，需要调用两次父类构造函数
 * 第一次：给子类原型赋值的时候
 * 第二次：调用子类构造函数的时候
 * 这样就会生成两份父类构造函数的属性
 * 一份在子类原型中
 * 一份在子类实例中（由于是第二次赋值，当访问子类实例的属性时，会覆盖掉原型中的属性）
 */

// 通过寄生组合式继承方式

// 基本思路：不必为了指定子类型的原型而调用超类型的构造函数，我们所需的无非就是超类型原型的一个副本

// 继承（克隆）超类的原型

function inheritPrototype(subType, superType) {
  let prototype = Object.create(superType.prototype); // 创建对象
  prototype.constructor = subType; // 增强对象 
  subType.prototype = prototype; // 指定对象
}

function Animal(name) {
  this.name = name;
  this.colors = ['white'];
}

Animal.prototype.sayName = function () {
  console.log('my name is', this.name);
}

function Cat(name, age) {
  // 借用构造函数
  Animal.call(this, name);
  this.age = age;
}

inheritPrototype(Cat, Animal);


Cat.prototype.sayAge = function () {
  console.log('my age is', this.age);
}

let cat1 = new Cat('jack', 10);
let cat2 = new Cat('bob', 12);

cat1.colors.push('red');
cat2.colors.push('white');

cat1.sayName(); // my name is  jack
cat1.sayAge(); // my age is  10
console.log(cat1.colors); // [ 'black', 'red' ]

cat2.sayName(); // my name is  bob
cat2.sayAge(); // my age is  12
console.log(cat2.colors); // [ 'black', 'white' ]