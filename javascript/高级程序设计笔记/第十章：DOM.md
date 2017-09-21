Node 类型
--
* 通过nodeType判断node类型
    * 1 为元素节点； 3为文本节点
    ```javascript
        // 处理子节点 返回元素节点
        function getElementNodes(parentNode) {
          var nodes = parentNode.childNodes;
          var arr = [];
          for ( var i = 1; i < nodes.length; i++) {
              if(nodes[i] === 1) {
                  arr.push(i);
              }
          }
          return arr
        }
    ```
* 节点关系 API
```javascript
    var someNode = document.getElementById('eg');
    var parent = someNode.parentNode; // 得到父节点
    var children = someNode.childNodes;// 得到所有的子节点
    var firstChild = someNode.firstChild; // 第一个子节点
    var lastChild = someNode.lastChild; // 最后一个子节点
    var prevSibling = someNode.previousSibling; // 前一个兄弟节点
    var nextSibling = someNode.nextSibling; // 后一个兄弟节点
```
* 节点操作 API 
```javascript
    var somdeNode = null;
    var newNode = null;
    var oldNode = null;
    // 增
    somdeNode.appendChild(newNode);
    somdeNode.insertBefore(newNode, oldNode);
    // 删
    somdeNode.remove(oldNode);
    // 改
    somdeNode.replaceChild(newNode, oldNode);
    // 复制
    var copy = somdeNode.cloneNode(true);
    // 清楚空格
    somdeNode.normalize();
```

Document 类型
--
* nodeType = 9
* 文档的子节点 `document.documentElement == document.firstChild`
* 文档信息
```javascript
    var title = document.title; // 页面标题
    var url = document.URL; // url
    var domin = document.domain; // 域名
```
* 查找元素
```javascript
   var node =  document.getElementById('eg');
   var nodes = document.getElementsByName('img');
   //  通过name属性 访问特定的 nodes
   var src = nodes['myImage'].src;
   
```
Element 类型
--
* 包含了 xml 和 html
* nodeType = 1
```javascript
    // 直接访问公共属性
    var div = document.getElementById('div');
    var id = div.id;
    var className = div.className;
    var title = div.title;
    var lang = div.lang;
    // 取得属性
    var id = div.getAttribute('id');
    // 设置
    div.setAttribute('id','1'); // BUG IE 7 
    // 移除
    div.removeAttribute('id');
    
```
* 输出标签属性以键值对的方式返回
```javascript
    function outputAttributes(element) {
      var pairs = [],
      attrName = null,
      attrValue = null,
      len,
      i;
      for ( i = 0, len = element.attributes.length; i < len; i++){
          attrName = element.attributes[i].nodeName;
          attrValue = element.attributes[i].nodeValue;
          // 兼容IE7 
          if (element.attributes[i].specified) {
              pairs.push(attrName + '=\"' + attrValue+'\"');
          }
          return pairs.join(" ");
      }
          
    }
```
Text 类型
--
* nodeType =  3
* nodeValue = 节点所包含的文本
* 规范化文本节点
```javascript
    var element = document.createElement('div');
    var textNode1 = document.createTextNode('hello');
    element.appendChild(textNode1);
    var textNode2 = document.createTextNode('world');
    element.appendChild(textNode2);
    document.body.appendChild(element);
    alert(element.childNodes.length); //2 
    element.normalize();
    alert(element.childNodes.length); //1 
```

动态创建样式
--
```javascript
    function loadStyle(url) {
        var link = document.createElement('link');
        link.rel = "stylesheet";
        link.type = "text/css";
        link.href = url;
        var head = document.getElementsByName('head')[0];
        head.appendChild(link);
    }
    loadStyle('style.css');
```