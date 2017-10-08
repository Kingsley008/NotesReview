BFC 块级格式化上下文
--
Question
* BFC基本概念
```
    BFC 块级格式化上下文 是CSS渲染盒模型的一种模式
```
* BFC的渲染规则
```
    1. BFC 容器内垂直方向的元素边距会重叠
    2. BFC 容器内的浮动元素会参与容器的高度计算
    3. BFC 是一个独立的容器 不会影响外部和内部元素
    4. BFC 不会与float元素重叠
    
```
* 如何创建BFC
```
    css样式中： 
    1. float 不为 none
    2. pistion 不为 static 和 relative
    3. overflow 不为 visiable
    4. display 为 table-cell, table-caption, inline-block, flex 
    以上都可以创建一个 BFC 
```
* BFC的使用场景
```
    1. 在BFC中建立新的BFC解决上下边距重叠的问题 
    2. 清除浮动
    3. 两列布局 使 div 元素和 float元素 不发生重叠
    4. 多列布局 最后一个BFC能占剩余空间 防止换行
```




