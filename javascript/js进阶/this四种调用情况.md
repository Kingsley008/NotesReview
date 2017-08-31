this四种调用情况
---
1. 指代全局对象window 
```javascript
    var a = 2;
    var obj = {
        a: 1,
        b: this.a + 1 // this 代指 window 不可能是 obj 拉
    }
    console.log(obj.b); // 输出3 
```
2. 作为对象方法调用，this 指代上级对象
```javascript
    function sayName() {
        console.log(this.name);  
    }
    var obj = {};
    obj.name = 'testName';
    obj.sayName = sayName;
    obj.sayName();  // 输出 testName 
```
3.作为构造函数调用，this 指代new 出的对象

```javascript
    function F() {
      this.name = 'testName'
    }
    var f = new F();
    console.log(f.name);
```
4.apply，call，bind调用，apply方法作用是改变函数的调用对象，此方法的第一个参数为改变后调用这个函数的对象，this指代第一个参数

```javascript
    function sayName() {
        console.log(this.name);
    }
    var myName = { name:'testName'}
    sayName.apply(myName); // testName
```

ps. 箭头函数的特性 
* 在箭头函数里写的 this 其实是包含该箭头函数最近的一个 function 上下文中的 this（如果没有最近的 function，就是全局）。 
```jsx harmony
  var obj1 = {
    say: function () {
      setTimeout(() => {
        console.log(this) // 输出 obj 
      },1000);
    }
  };
  obj1.say(); // obj
  
    var obj2 = {
      say: function () {
        setTimeout(() => {
          console.log(this) // 输出 obj 
        },1000);
      }
    };
    var say2 = obj2.say;
    say2(); // window
```