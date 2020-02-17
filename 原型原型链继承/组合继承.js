/**
 * 顾名思义，组合继承时结合借用构造函数继承（继承属性）和原型继承（继承方法）的优势
 */

function Animal(name) {
  this.name = name || "animal";
  this.colors = ["black"];
}

Animal.prototype.sayName = function () {
  console.log('my name is', this.name);
}


function Cat(name, age) {
  // 借用构造函数
  Animal.call(this, name);
  this.age = age;
}

// 原型继承
Cat.prototype = new Animal();
// 不是很懂这一步
Cat.prototype.constructor = Cat;
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