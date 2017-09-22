理解Selectors API
--
* querySelector() 
    * 接收一个CSS选择器，返回第一个匹配的元素
* querySelectorAll()
    * 接收一个CSS选择器，返回所有的匹配元素 -- nodeList 
    
* 以上两个方法既可以通过document调用--全局查找；也可以通过element调用--后代查找 
    * IE 8+ 支持

* 元素遍历 
    * childElementCount: 返回子元素个数
    * firstElementChild: 指向第一个子元素
    * lastElementChild: 指向最后一个子元素
    * previousElementSibling: 指向前一个兄弟元素
    * nextElementSibling: 指向后一个兄弟元素

使用HTML5 DOM 扩展
--
* 与类扩充相关
    * getElementsByClassName(): IE 9+ 
    * classList属性：IE 不支持
* 焦点管理
    * document.activeElement属性：这个属性始终会引用DOM当前获得焦点的元素和代码中调用focus方法的元素；
    * document.hasFocus():确认当前文档是否获得了焦点
* HTMLDocument变化
    * readyState 属性：
        * loading : 正在加载文档
        * complete ： 已经加载完了文档    
    * 兼容模式
        * 在标准模式下 document.compatMode == "CSS1Compat"
        * 在混杂模式下 document,compatMode == "BackCompat"
* 自定义属性
    * data- 开头
    * 通过 element.dataSet.xx 来访问（eg.data-my-name = "king" - element.dataSet.myName）
    * 
* 插入标记
    * innerHTML
    * outerHTML
    * insertAdjacentHTML()
    ```javascript
        var ele = document.getElementById('eg');
        // 作为前一个同辈元素插入
        ele.insertAdjacentHTML('beforebegin', "<p>hello world</p>");
        // 作为第一个子元素插入
        ele.insertAdjacentHTML('afterbegin', "<p>hello world</p>");
        // 作为后一个同辈元素插入
        ele.insertAdjacentHTML('beforeend', "<p>hello world</p>");
        // 作为最后一个子元素插入
        ele.insertAdjacentHTML('afterend', "<p>hello world</p>");
        
    ```
* 注意： 这些插入的方法替换子节点会产生浏览器内存占用的问题。  因为将元素从文档树删除后，元素与事件处理程序执行的绑定关系还是在内存中并没有删除。因此在使用innerHTML,outerHTML,insertAdjacentHTML
先手动删除需要被替换的元素的所有事件处理程序和JS对象属性。

* scrollIntoView() 方法
    * true： 窗口滚动之后会让元素的顶部尽可能平齐
    * false: 调用的元素尽可能出现在视口中，不过顶部不一定平齐
    