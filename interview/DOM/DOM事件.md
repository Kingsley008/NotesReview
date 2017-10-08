DOM 事件类
--
* DOM事件的级别
```
     dom.onClick = function(){} // DOM0 
     dom.onClick = null;
     dom.addEventListener('click',func, false); // DOM2 DOM3
     dom.removeEventListener('click', func);
```
* DOM事件模型
    * 捕获 -- 冒泡
* DOM事件流
    * 捕获 -- 目标 -- 冒泡
* 描述DOM事件捕获的过程
    * window --> document --> html --> body ... --> target   
* Event对象的常见应用
```
    event.target // 当前触发事件的对象
    event.currentTarget // 当前监听事件的对象
    event.preventDefault() // 阻止事件默认行为
    event.stopPropagation() // 阻止事件冒泡 
    event.stopImmdiatePropagation() // 阻止该节点的其他事件触发 

```
* 自定义事件
```js
    // 创建自定义事件
    var eve = new Event('custome');
    // 监听自定义事件
    dom.addEventListener('custome', function() {
        console.log('custome'); 
    });
    // 手动触发自定义事件
    dom.dispatchEvent(eve);
```