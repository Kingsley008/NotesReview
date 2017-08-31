# javascript 基础

1. js有几种基础数据类型？它们的内存是如何分配的？
    * 引用数据类型：数组、对象、函数 -- 储存在堆中
    * 原始数据类型：string, number, boolean, null, undefined -- 储存在栈中
    *  两种类型的区别是：存储位置不同；
       原始数据类型直接存储在栈(stack)中的简单数据段，占据空间小、大小固定，属于被频繁使用数据，所以放入栈中存储；
       引用数据类型存储在堆(heap)中的对象,占据空间大、大小不固定。如果存储在栈中，将会影响程序运行的性能；
       引用数据类型在栈中存储了指针，该指针指向堆中该实体的起始地址。
       当解释器寻找引用值时，会首先检索其在栈中的地址，取得地址后从堆中获得实体
2. js中的对象是如何分类的？其中内置对象有哪些？
    * 在js中，对象分为两类：
        * Native:包括js内置对象，和用户自定义的对象。
        其中内置对象还包括了js的数据包装对象(String, Number, Boolean, Object, Array)
        其他对象(Function, Error, Arguments, Math, Date, RegExp)
        * Host：在浏览器环境中 又有window对象和 DOM ，BOM 对象
3. 数组对象有哪些常用的方法？会改变原有数组的有？ 
 
    ```javascript
       var arr = [1,2,3,4,5];
       // 会改变原有数组arr的方法:
    
       arr.push(6); // 在数组末尾添加
       arr.pop();// 将最后一位出栈
       arr.splice(4,1,7); // 从第五位开始删除一位插入7
       arr.shift(); // 将第一位移除
       arr.unshift(2); // 插入到第一位
       arr.sort(); // 从小到大排序
       arr.reverse(); // 倒序
       console.log(arr); // 7 4 3 2 2 
  
       // 不会改变原有数组的方法
    
       var newArr = [];
       newArr = arr.slice(0,2); // 分割数组 0取得到 2 取不到 [7,4]
       newArr = arr.join('<-->'); // 返回字符串 
       newArr = arr.concat([1,2,3]); // 返回数组
         
    ```
4. 使用Math对象构建一个函数得到一个范围内的随机数
    ```javascript
       function getRandom (low, high) {
           return Math.floor(Math.random() * (high - low) + low)
       }
       console.log(getRandom(10,100))
    ```    
5. 在JS中对象的构建方法有几种？
    * 字面量构造
    * 工厂函数构造
    * 构造函数构造
    * 原型构造   
6. null 与 undefined 有什么区别？
    * 在js中 null 表示引用有值但是这个值为空；undefined 表示该引用声明了但是没有赋值；
    * type of null -- object; type of undefined -- undefined
    * 在json中 null 是一个有效的值 而 undefined 不是 
7. 使用原型实现继承 
    ```javascript
    function Animal() {
       this.species = '动物'     
    }
    function Dog (name) {
       this.name = name; 
    }
    Dog.prototype = new Animal();
    Dog.prototype.constructor = Dog;
    
    var dog = new Dog('a');
    console.log(dog.species);
   
     ```     
8. js中的变量作用域是什么样的？
    * js中的变量作用域是静态作用域
    * 在js中没有块级作用域的概念。 
    * 在函数被定义时候，就决定了函数的作用域链。
    * 在函数内，定义的变量会被提升，提前声明。
    * 函数可以访问外部的变量，不能访问内部的变量。 
    
9. js中类型的隐式转换有哪些？
    * 在使用+连接字符串和数字的时候，数字会自动转换成字符串类型
    * if while 条件语句中，会自动转换成boolean值：在js中0,null,undefined,"",NaN都是false
    
10. 在js中如何使用正则表达式
    ```javascript
       function escape(text) {
          var  reg  = /[<"&>]/g;
           var newText = text.replace(reg,function (rep) {
               switch (rep){
                   case '<':
                       return '&lt';
                   case '>':
                       return'&gt';
                   case '&':
                       return '&amp';
                   case '\"':
                       return '&quot';
               }
           });
           return newText;
       
       }
       var html = escape('<input type=\"text\" name=\"mobile\"> ');
       console.log(html);
      
    ```       