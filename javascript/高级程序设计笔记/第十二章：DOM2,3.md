CSS样式操作
--
* 直接通过element.style 访问内嵌CSS属性 **命名遵循驼峰 float - cssFloat**
* 通过element.style.cssText 访问所有的属性； **在写入模式下，原有的样式信息会丢失**
```javascript
    // 遍历所有的style上的css属性 
    function getAllCSSInfo(element) {
          var prop, value, i, len, arr = [];
          for( i = 0, len = element.style.length; i < len; i++ ) {
              var o = {};
              prop = element.style[i];
              value = element.style.getPropertyValue(prop);
              o.prop = prop;
              o.value = value;
              arr.push(o);
          }
    }

```
* 注意：style属性上得到的css样式并不会包括从其他样式表层叠而来并影响到当前样式的信息
可以通过 document.defaultView.getComputedStyle() 来获得元素计算后的样式

* 操作样式表
    * 获得样式表对象
    ```javascript
        function getStyleSheet(element) {
          return element.sheet || element.styleSheet;
        }
        var link = document.getElementsByTagName('link')[0];
        var sheet = getStyleSheet(link);
        // == document.styleSheets
    ```
    * CSS规则
    ```javascript
        // 取得样式对象
        var sheet = document.styleSheets[0];
        // 取得规则列表
        var rules = sheet.cssRules || sheet.rules;
        // 取得第一条规则
        var rule = rules[0];
        // 选择器名称
        console.log(rule.style.selectorText);
        // 完整的CSS代码
        console.log(rule.style.cssText);
        // 获取某一属性
        console.log(rule.style.height);
        // 添加一条规则
        sheet.insertRule('body { background-color : red }', 0);
        // IE8 -
        sheet.addRule('body','background-color : red', 0);
        // 删除一条规则
        sheet.deleteRule(0);
        // IE
        sheet.removeRule(0);
    ```

元素大小获取
--
* 偏移量  - 只读
    * element.offsetTop  元素上外边框 到 包含元素上内边框的距离
    * element.offsetLeft 元素左外边框 到 包含元素左内边框的距离
    * element.offsetWidth  = content + padding + border + slider 可见
    * element.offsetHeight = content + padding + border + slider 可见
    ```javascript
        // 得到某个元素在页面中的偏移量
        function getoffsetTopInPage(element) {
          var actualTop = element.offsetTop;
          var currentParent = element.offsetParent;
          while (currentParent != null) {
              actualTop +=  currentParent.offsetTop;
              currentParent = currentParent.offsetParent;
          }
          return actualTop;
        }    
    ```
* 客户区大小 - 只读
    * clientWidth 和 clientHeight : content + padding 可见
    ```javascript
        // 获得浏览器窗口大小
        function getViewPort() {
          if (document.compatMode === 'CSS1Compat') {
              return {
                  width: document.documentElement.clientWidth,
                  height: document.documentElement.clientHeight
              }
          } else if (document.compatMode === 'BackCompat') {
              return {
                   width: document.body.clientWidth,
                   height: document.body.clientHeight
              }
          }
        }
    ```  
* 滚动大小 - scroll dimension 
    * scrollWidth: 内容实际宽度 没有滚动条的情况下 content 宽度
    * scrollHeight: 内容实际高度 
    * scrollTop: 滚动隐藏在内容上方的像素
    * scrollLeft: 滚动隐藏在内容左侧的像素    
    
DOM遍历
--
* NodeIterator 
    * 范例
    ```javascript
        var div = document.getElementById('mydiv');
        var filter = function(node) {
          return node.tagName.toLowerCase() === 'li' ?
          NodeFilter.FILTER_ACCEPT :
          NodeFilter.FILTER_SKIP;
        };
        var iterator = document.createNodeIterator(div, NodeFilter.SHOW_ELEMENT,filter,false);
        var node = iterator.nextNode();
        while (node !== null) {
            console.log(node.tagName);
            node = iterator.nextNode();
        }
        
    ```
* TreeWalker
    * IE不支持