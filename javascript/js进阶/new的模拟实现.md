```js
    function Person() {
       this.name = 'Kingsley';
       return{
           age: 20
       }
    }
    var person1 = new Person();
    console.log(person1.name); // undefined
    console.log(person1.age); // 20
    function Factory() {
       // 得到构造函数 本身
       var Constructor = Array.prototype.shift.call(arguments); // this 指向 arguments
       // 新建一个空对象
       var obj = {};
       // 使得空对象原型链指向构造函数的原型
       obj.__proto__ = Constructor.prototype;
       // obj 指代 Person中的 this 完成赋值 
       var ret = Constructor.apply(obj,arguments);
       //typeof 返回字符串 小写object
       return typeof ret === 'object'? ret : obj;
    }
    var person2 = Factory(Person);
        console.log(person2.age); // 20
```