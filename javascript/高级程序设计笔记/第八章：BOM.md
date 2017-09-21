window对象
--
* top对象始终指向最外层的框架，也就是浏览器窗口。使用这个属性可以准确的访问到顶层框架中的另一个框架

    `top.frames[0]; //下标索引 top.frames['topframes'] // iframe的name属性进行访问`
* 窗口位置
    * IE,Safari,Opera和Chrome都提供了screenLeft 和 screenRight 来获得当前窗口的位置
    * Firefox提供了screenX 和 screenY 来获得 
    * 注：在IE和Opera中返回 top = PC顶部距离 + 浏览器工具栏高度; IE-8以下不支持
```javascript
    // 获得浏览器位置综合的解决方法
    var windowX = typeof window.screenLeft === 'number' ? window.screenLeft : window.screenX ;
    var windowY = typeof window.screenTop === 'number' ? window.screenTop : window.scrennY;
    console.log(windowX, windowY);
```
* 窗口大小
    * innerWidth 与 innerHeight 返回浏览器窗口中视图区的大小；outerWidth 与 outerHeight 返回浏览器窗口的大小（包括工具栏 + 滚动条）
    * 注意： 在chrome中 inner 与 outer获得的值是相同的
    * 标准模式：可以通过document.documentElement.clientHeight和document.documentElement.clientWidth  来获得页面视口高宽
    * 混杂模式：可以通过document.body.clientHeight和document.body.clientWidth来获得
        ```javascript
            // 获得浏览器视窗的大小 兼容方法
            var pageWidth = window.innerWidth,
            pageHeight = window.innerHeight;
            if ( typeof pageWidth !== 'number') {
                // 检查页面模式
                if (document.compatMode === "CSS1Compat") {
                    // 标准模式
                    pageWidth = document.documentElement.clientWidth;
                    pageHeight = document.documentElement.clientHeight;
                } else {
                    // 混杂模式
                    pageWidth = document.body.clientWidth;
                    pageHeight = document.body.clientHeight;
                }
            }
            console.log(pageWidth, pageHeight);
        ```
* 导航和打开窗口
    * window.open() 会返回一个新的窗口的引用
    ```javascript
        var otherWindow = window.open('http://www.163.com','_blank');
        otherWindow.resizeTo(400, 400);
        otherWindow.moveTo(100, 100);
        setTimeout(otherWindow.close, 5000);
        if(otherWindow.closed) {
            console.log('弹窗已经关闭');
        }
    ```
    * 检查弹窗是否被拦截
```javascript
    // 浏览器内置的屏蔽程序拦截
    var otherWindow = window.open('http://www.163.com','_blank');
    if (otherWindow === null) {
        console.log("浏览器屏蔽了弹窗");
    }
    // 插件拦截了弹窗
    var blocked = false;
    try {
         var otherWindow = window.open('http://www.163.com','_blank');
         if (otherWindow === null ) {
             blocked = true;
         }
    } catch (ex) {
        blocked = true;
    }
    
    if (blocked) {
        console.log('弹窗被插件拦截');
    }
```
* 间接调用和超时调用
    * 特点：JS是一个单线程解析器，因此一定时间内只能执行一段代码。为了控制要执行的代码，就有一个JS任务队列。
    * 在开发环境下很少用到setInterval()；因为后一个间歇调用可能在前一个调用还没结束的情况下就启动。

location对象
--
* 特点: window.location 和 document.location 引用的是同一个对象
* 查询字符串参数
```javascript
    //得到查询参数的方法封装 
    function getQueryStringArgs() {
      var qs = (location.search.length > 0)? location.search.substring(1) : "";
      args = {};
      var items = qs.length ? qs.split('&') : [];
      var item = null;
      
      for (var i = 0; i < items.length; i++) {
          item = items[i].split('=');
          // 解码
         var name = decodeURIComponent(item[0]);
         var value = decodeURIComponent(item[1]);
         if (name.length) {
              args[name] = value;
         }
        
      }
      return args;
    }
``` 

* 位置操作
```javascript
    // 三个方法 作用相同
    location.assign('http://www.163.com');
    window.location = 'http://www.163.com';
    location.href = 'http://www.163.com';
    // 调用 replace 方法后 用户不能回到前一个页面
    location.replace('http://www.163.com');
    // 重新加载  true 表示 清楚缓存 加载
    location.reload(true);
```
navigator对象
--
* 使用navigator.plugins进行插件检查 
```javascript
// 插件检查
function hasPlugin(name) {
  name = name.toLowerCase();
  for (var i = 0; i < navigator.plugins.length; i++) {
      if (navigator.plugins[i].name.toLowerCase().indexOf(name) > -1 ) {
          
          return true;
      }
      console.log(navigator.plugins[i].name);
  }
  return false;
}
alert(hasPlugin('Flash'));

```

history对象
--
* history对象保存着用户的历史记录 
```javascript
    // 后退一页
    history.go(-1);
    history.forward();
    // 前进一页
    history.go(1);
    history.back();
    // 传递参数找最近匹配的历史
    history.go('163');
    // 判断当前的网页 是不是用户第一次打开的网页
    if (history.length === 1) {
        
    }
```


