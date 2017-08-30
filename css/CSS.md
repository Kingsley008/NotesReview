#CSS 基础总结

1. W3C定义的和模型与低版本IE的盒子模型有什么区别？
    * 在标准的W3C规范中，盒子模型的宽高是由：margin + border + padding + content 组成的；
    而在低版本的IE中，盒模型的 content 宽高 包括了 border 和 padding;
    * 兼容的解决方法：通过设置 box-sizing: border-box 来消除两者的差异;
    ps.默认  box-sizing: content-box
2. CSS选择器有哪些？权重如何配置？
    * 选择器
        * 标签选择器 `h1`
        * 属性选择器 `[href ^= 163 ]`、
        * 类选择器  `.class`
        * id选择器 `#id`
        * 相邻元素选择器 `h1+h1`
        * 兄弟选择器`h1~div`
        * 后代选择器 `h1 div`
        * 子类选择器 `h1>div`
        * 伪类选择器 `p:first-child`
        * 伪元素选择器 `::after`
    * 优先级
        * !important >  id > class > tag
        * !important >  内嵌 > 内联 > 外联
        
3. 在CSS中哪些样式能够被继承？那些不可以继承 
    * 可以被继承的样式：color, text-align, font...
    * 不能被继承的样式：border,background, with, height, border ...
4. CSS3中新增的伪类有哪些
    * `div:first-of-type`  -- 后代 第一个元素
    * `div:last-of-type`
    * `div:nth-child(even)` -- 子代 偶数倍的元素
    * `:disabled`  -- 禁用的表单元素
    * `:enabled`  -- 没有禁用的表单元素
    * `:checked` -- 单选框或复选框被选中
    * `::after`
    * `::before`
5. CSS3 增加了哪些新的特性
    * 3D动画： transform transition 
    * 圆角：border-radius 
    * 多列布局：  
    [ column-width ]:设置或检索对象每列的宽度  
    [ column-count ]:设置或检索对象的列数 
    * 文字特效：text-decoration text-shadow
    * 边框的阴影： box-shadow 
    * 渐变： gradient
6. display 有哪些属性值 特点是什么
    * none -- 缺省 像行内元素一样显示
    * block -- 块级元素  内容高度 父容器宽度 可设宽高 换行显示
    * inline -- 行内元素 内容高度 内容宽度 不可设宽高 同行显示
    * inline-block -- 行内-块级元素  内容高度 内容宽度 可设置宽高 同行显示
    * table -- 此元素会作为块级表格来显示。
    * flex -- 将当前容器作为弹性容器
7. position 有些属性值  特点是什么
    * static 元素按照文档流顺序排列(z-index 属性无效 top left .. 无效)
    * relative 元素不会脱离文档流，把自身作为参照物来进行定位，常用来为后代元素position:absolute提供定位参照物
    * absolute 元素会脱离文档流，把第一个非static的祖先定位元素当作参照物，如果没有，则为浏览器窗口。
    * fixed 元素脱离文档流，以浏览器窗口作为定位元素。
8. float 浮动元素有什么特点？ 如何清除浮动 ？
    * float 元素半脱离文档流， 内容在文档流中，元素脱离文档流。
    * container::after{ content:"."; display:inline-block; height:0px; clear:both; visibility:hidden }           
9. 在实现元素同行显示的时候，display:inline-block 和 float:left 有什么区别 
    * display:inline-block 会出现空白间隙 窗口缩小时元素会下沉
    * 使用float 需要额外清除浮动    
10. position跟display、margin collapse、overflow、float这些特性相互叠加后会怎么样？
    * 如果元素的display:none 那么这个元素不会被渲染 position float属性 都会失效
    * 如果元素已经定义了position 为 fixed 或者 absolute 那么 float 属性会失效    
    * **有浮动,绝对定位,inline-block属性的元素,margin不会和垂直方向上的其他元素margin折叠.**
    
11. css sprite 技术使用的方法
    
#css 布局
1. 实现水平居中布局
```scss
    // 给块级元素确定宽度 + margin: 0 auto; 即可实现
    .container{
      width: 1080px;
      margin: 0 auto;
    }
```
2. 实现水平垂直居中布局
    * 方案1：兼容 display:inline-block + 空div 缺点还是 inline-block 会下沉
    ```scss
        /*方案1：兼容 display:inline-block + 空div 缺点还是 inline-block 会下沉  */
        .container{
          width: 1080px;
          margin: 0 auto;
          display: inline-block;
        }
        // 在需要垂直居中的元素后 加入一个空白<div class='vCenter'>
        .vCenter{
          display:inline-block;
          height: 600px;
          vertical-align: middle;
        }
    ```
     * 方案2：CSS3 ：position  + transform 
    ```scss
        /*方案2 CSS3 ：position  + transform */
        .container{
          position: absolute;
          width: 1080px;
          margin: 0 auto;
          top:50%;
          left: 50%;
          transform: translate(-50%,-50%);
        }
       
    ```
    * 方案3：flex 弹性布局 使用时考虑性能：只适合小范围布局 不合适全局布局
    ```scss
       .container{
       display: flex;
       /* 水平居中 */
       align-items: center;
       /* 垂直居中 */
       justify-content: center;
    }
    ```
3. 两列等高布局 其中一列自适应
    * 原理：利用padding-bottom|margin-bottom正负值相抵；
           设置父容器设置超出隐藏（overflow:hidden），
           这样子父容器的高度就还是它里面的列没有设定padding-bottom时的高度，
           当它里面的任一列高度增加了，则父容器的高度被撑到里面最高那列的高度，
           其他比这列矮的列会用它们的padding-bottom补偿这部分高度差。
    ```html
       <div class="container">
           <div class="left"></div>
           <div class="right"></div>
       </div> 
    ```
    ```scss
        .container{
             width: 1080px;
             margin: 0 auto;
             overflow: hidden;
         }
        .left{
             float: left;
             width: 200px;
             margin-left: 50px;
         }
         .right{
          overflow: hidden;
         }
         // 实现伪等高 
         .left,.right{
         padding-bottom: 9999px;
         margin-bottom:-9999px;
      }

    ```
4. 多列等宽自适应布局
    * 方案1：float 布局
        ```html
           <div class="container">
               <div class="column">1</div>
               <div class="column">2</div>
               <div class="column">3</div>
               <div class="column">4</div>
           </div> 
        ```
        ```scss
        .container{
             width: 1080px;
             overflow: hidden;
             margin-left:-20px;
         }
        // 4列 每列占比 25% 间距 20px 
        .column{
             float: left;
             width: 25%;
             padding-left: 20px;
            // content+padding-left = 25%
             box-sizing: border-box;
          }
        ```
    * 方案2：flex 布局
        ```scss
        .container{
             width: 1080px;
             overflow: hidden;
             display: flex;
         }
        // 4列 每列占比 25% 间距 20px 
        .column{
            flex: 1 ;
          }
        .column+colunm{
          margin-right: 20px;
          }
        ```        
       