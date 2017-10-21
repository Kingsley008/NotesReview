HTML 知识点整理
-- 
1. HTML5 有那些新的特性？   
    * 加入了音频，视频多媒体元素 `<audio> <video>`
    * 加入了绘画的元素 `<canvas>`
    * 加入了本地信息存储：localStorage, sessionStorage
    * 加入了语义化的标签：`<section> <article>...` 
    * 加入了表单的控件：date range ... 
    * 加入了离线存储功能 
2. 浏览器内核指的是什么？  
    * 浏览器的内核包括了渲染引擎和JS引擎，在JS引擎已经被独立了出来，所以一般说浏览器内核，我们说的就是它的渲染引擎。  
    * 其主要的功能：获取网站内容（解析HTML）整理讯息（解析CSS文件），以及计算网页的显示方式（渲染页面）
3. HTML5 语义化的作用 
    * 使得文档结构更加清晰，易于维护。
    * 语义可以被不同的阅览设备识别 比如：电子阅读器
    * 易于SEO：搜索引擎对不同的标签的权重是不同的
4. HTML 中常见的块级元素有哪些? 行内元素有哪些？ 这两者的特点是什么
    * 块级元素：`div h1~6 p br hr ul li dl dd dt ... ` 其特点是 宽为父元素的宽 高度为内容的高度 可以设置宽高 同行显示
    * 行内元素：`span input button i b em ...` 其特点是 宽度为内容宽度 且不可以设置宽高 换行显示
5. 严格模式 和 混杂模式的 区别？ 以及浏览器是 如何触发这两种模式的   
    * `DOCTYPE ` 指定了 浏览器以哪种方式来解析html文档，如果 `DOCTYPE` 不存在，或者不正确 就会触发 混杂模式，
    浏览器会以向后兼容显示页面。
    * 在严格模式中：CSS排版 以及 JS的运作模式 都是以浏览器 最高的标准是执行的。
    * 在混杂模式中：可以实现IE5.5以下版本浏览器的渲染模式。  
6. 请描述一下 cookies，sessionStorage 和 localStorage 的区别？
    * cookies 是用来保存当前用户身份的信息，通常会加密，会在同源的http请求中携带，自动传到服务器，
    而sessionStorage和localStorage的信息并不会自动在客户端与服务器直接传送。 
    * 从存储的大小来看 
        * cookies 的大小通常只有 4kb 
        * sessionStorage 和 localStorage 通常会有 5MB - 10MB 的大小 （根据浏览器而定）
    * 从存储的时间来看 
        * cookies 的过期时间可以自定义，在过期后失效。
        * sessionStorage 的有效时间为用户的会话时间，在浏览器关闭后消失。
        * localStorage 理论上可以永久保存数据（用户不主动删除的话）。
 7. H5如何实现APP应用的离线存储功能  
    * 定义  
       ```html <!DOCTYPE HTML>
            <html manifest = "cache.manifest">
            ...
            </html>
         ```  
    * 定义 cache.manifest
        ```
        CACHE MANIFEST
        #v0.11
        
        CACHE:
        
        js/app.js
        css/style.css
        
        NETWORK:
        resourse/logo.png
        
        FALLBACK:
        / /offline.html
        ```
    * 在线时，浏览器看到html标签中声明了manifest 它就会请求manifest文件，如果是第一次访问的话
    就会根据cache.manifest 来下来离线访问所需要的资源 
    在离线时，就会使用离线存储的资源 
    
8. iframe有什么优缺点？
    * 页面有重载需要的时候，可以重载其中的某个页面，不需要整个页面重载
    * 实现代码的重复利用，比如头部和尾部在许多页面内容都相同，可以通过iframe嵌套进来
    * 处理加载缓慢的第三方内容和广告
    缺点：
    * frame会阻塞主页面的Onload事件；
    * 不利于SEO
    * frame嵌入的页面无法回退