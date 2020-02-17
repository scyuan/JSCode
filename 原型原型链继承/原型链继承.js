function Animal() {
  this.type = "animal";
  this.animalList = ["Animal"];
}

Animal.prototype.printType = function () {
  console.log(this.type);
}


function Cat() {
  // this.type = "cat";
}

Cat.prototype = new Animal();


let cat = new Cat();
let cat1 = new Cat();
cat1.type = "cat1";
cat1.animalList.push("cat1");


console.log(cat.type, cat1.animalList); // 打印 animal [ 'Animal', 'cat1' ]

/**
 * 由此可看出原型存在的第一个问题
 * 引用类型值得原型属性会被共享，通过原型链继承时，子类的原型实际上变成了另外一个类型的实例。
 * 所以所有的子类实例都共享同一个原型对象，包括原型对象的属性
 * 所以当时属性是引用类型时，当其中一个子类实例修改该属性时，其他子类实例的该属性也同样被修改了
 */

/**
 * 原型存在的第二个问题
 * 不能向父类构造函数传参
 */