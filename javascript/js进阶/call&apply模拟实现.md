apply 和 call 的模拟实现
---

1. 改变函数内this的指向
```js
    obj = {
        value:1
    };
    function log() {
      console.log(this.value)
    }
    // 使用 call 
    log.call(obj);
    //--------------------------------
    // 相当于
    obj2  = {
        value:1,
        log:function() {
          console.log(this.value)
        }
    };
    obj2.log(); 
```

从以上结论来写模拟的第一版  
    1. 将函数设为对象的属性 
    2. 执行该函数 
    3. 删除该函数 

```js
    Object.prototype.call2 = function(obj) {
        // 得到调用call的函数
        obj.fn  = this;
        obj.fn();
        delete obj.fn;
    };
    // 测试 --------------
        obj = {
            value:1
        };
        function log(name) {
          console.log(this.value);
          console.log(name);
        }
        // 使用 call 
        log.call2(obj); // 输出1 成功
```

2. 处理传入参数
```js
    Object.prototype.call2 = function(obj) {
        // 从arguments对象中得到参数 [arguments[1],..[2]]
        var args = [];
        for(var i = 1; i < arguments.length; i++){
            args.push('arguments[' + i + ']');
        }
        
        // 测试
        obj.fn  = this;
        // 执行 obj.fn(arg1,..)
        eval('obj.fn('+args+')');    
        delete obj.fn;
    };
            obj = {
                value:1
            };
            function log(name) {
              console.log(this.value);
              console.log(name);
            }
            // 使用 call 
            log.call2(obj, 'king'); // 输出1 king 成功
```
3. 处理apply传入的数组 
```js
    Object.prototype.apply2 = function(context,arr) {
        // 如果没有传递上下文 那么 context 为 window
        if(!context){
            context = window;
        }
        context.fn  = this;
        var ret = null;
        if(!arr){
             ret = context.fn();
             return ret
        } else {
            var args = [];
                for(var i = 0; i < arr.length; i++){
                    args.push('arr[' + i + ']');
                }
             ret = eval('context.fn('+args+')'); 
             return ret;
        } 
       
        delete context.fn;
    };
        obj = {
            value:1
        };
        function log(name) {
          console.log(this.value);
          console.log(name);
        }
        // 使用 call 
        log.apply2(obj, ['king']); // 输出1 king 成功

```

## 总结：
1. 处理传入的上下文环境 如果不存在设为 window 
2. 处理传入的参数，拼接成['arr[1]','arr[2]',...] 这种格式的字符串 在eval()中调用
3. 将调用的函数绑定到上下文环境中，进行调用得到返回值，将返回值返回
4. 删除绑定的函数