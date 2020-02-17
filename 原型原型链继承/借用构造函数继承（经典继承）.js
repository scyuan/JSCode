function Animal(name) {
  this.name = name || "animal";
  this.colors = ["white", "black", "red"];
}

function Cat(name) {
  Animal.call(this, name);
}

let cat1 = new Cat('cat1');
let cat2 = new Cat('cat2');

cat1.colors.push('cat1Color');
cat2.colors.push('cat2Color');

console.log(cat1.name, cat1.colors); // cat1 [ 'white', 'black', 'red', 'cat1Color' ]
console.log(cat2.name, cat2.colors); // cat2 [ 'white', 'black', 'red', 'cat2Color' ]

/**
 * 可以看出子类型不会相互影响，并且可以给构造函数传递参数
 * 但是借用构造函数也存在问题
 * 1、方法都在构造函数中定义，函数复用就无从谈起
 * 2、超类型的原型中的方法对子类型是不可见的
 */