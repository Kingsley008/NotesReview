# javascript 进阶
##js对象原型的内存分布

* F构造函数有两个原型对象:  
F.prototype.\_\_proto__ 指向  Object.prototype；  
F.\_\_proto__ 指向 Function.prototype；  
* f.\_\_proto__  -->   F.prototype ; f.constructor --> F 
    ```javascript
       function F () {
    }
    Object.prototype.a = 'a';
    Function.prototype.b = 'b';
    var f = new F();
    // 沿着原型链 找到 Object.prototype    
    console.log(f.__proto__ === F.prototype );
    // 沿着原型链 找到 Function.prototype 
    console.log(f.constructor === F); // F.__proto__  = Function.prototype
    console.log( f.a); // 沿着原型链 找到 Object.prototype.a
    console.log( f.constructor.b ); // 沿着原型链 找到  Function.prototype.b
    
    ```

静态作用域
--- 
JavaScript 采用词法作用域(lexical scoping)，也就是静态作用域。
函数的作用域在函数定义的时候就决定。 
而动态作用域是在函数调用的时候才决定的。
```javascript
    var value = 1;
    function foo(){
        console.info(value);
    }
    function bar(){
        var value = 2;
        foo();
    } 
    bar();
    //在执行foo函数的时候，首先会在内部查找value,如果没有就根据它的 **书写位置**
    //查找外层有没有value,所以输出了1, 而不会去bar函数中查找。
    //静态的词法作用域上：输出1
```    
```javascript
    var scope = "global scope";
    function checkscope(){
        var scope = "local scope";
        function f(){
            return scope;
        }
        return f;
    }
    checkscope()();
    //javaScript 函数的执行用到了作用域链，这个作用域链是在函数定义的时候创建的。
    // 嵌套的函数 f() 定义在这个作用域链里，其中的变量 scope 一定是局部变量，
    // 不管何时何地执行函数 f()，这种绑定在执行 f() 时依然有效。
```
静态作用域与闭包
---
和大多数的现代化编程语言一样，JavaScript是采用词法作用域的，这就意味着函数的执行依赖于函数定义的时候所产生（而不是函数调用的时候产生的）的变量作用域。
为了去实现这种词法作用域，JavaScript函数对象的内部状态 **不仅包含函数逻辑的代码，除此之外还包含当前作用域链的引用。** 
函数对象可以通过这个作用域链相互关联起来，如此，函数体内部的变量都可以保存在函数的作用域内，这在计算机的文献中被称之为闭包。

函数运行时三大要素
---

* AO  
* ScopeChain
* this
---
```javascript
    var scope = "global scope"; 
    function checkscope(){

    var scope = "local scope";

    function f(){ 
        return scope; 
    } 
        return f(); 
    } 
    checkscope();
```
函数的运行过程
```
//创建全局的环境
    ECStack = {
        globalContext;
    }
    //初始化全局上下文
    globalContext = {
        vo = {
            window：...
            scope: undefind; //执行后 得到属性值 global
            checkscope:undefined 
        }
        Scope:[[globalContext.vo]]
        this:globalContext.vo
    }
    //创建函数时，已经定义了函数的Scope属性
    checkscope.scope = [[globalContext.vo]]
    //遇到函数执行，创建函数的上下文
    ECStack = {checkscopeContext, globalContext}
    //copy scope 到 checkscopeContext,使用arguments初始化AO 并且 将 AO 压倒 作用域顶部
    checkscopeContext = {
        AO = {
            arguemens:{
                length:0,
            }
            scope:undefined;
            f:function
        }
        Scope:[[checkscopeContext.AO][globalContext.VO]]
        this:undefined
    }
    //f函数定义时的Scope
    f.scope = [[checkscopeContext.AO][globalContext.VO]]
    //函数执行 又遇到了返回一个函数执行的结果 开始准备这个返回函数的上下文环境
    ECStack = {
        f,checkscope,globalcontext
    }
    fContext = {
        AO = {
            arguemens:{
                length:0,
            }
        Scope:[[f.AO][checkscopeContext.AO][globalContext.VO]]
    }
    //f 函数执行  在checkscopeContext.AO 找到了 socpe 返回 函数结束 出栈
    
    ECStack = {
        checkscope,globalcontext
    }
    //checkscope也结束了
    
    ECStack = {
        globalcontext
    }

```
   
闭包的作用与应用
---

apply 和 call 的模拟实现
---

new 的模拟实现
--- 