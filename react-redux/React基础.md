React基本概念
--
* React 是基于组件来开发应用的，用分治的思想，将一个大应用分解成若干个组件，每个组件只关注完成某个小范围的特定功能。
符合软件开发中高内聚，低耦合的思想。
* React 采用了JSX语法，凡是在代码中使用了JSX语法就要引入React包。
* React 提供了create-react-app 来创建应用 也可以自己使用webpack来配置。
* 一个class 如果是React组件，必须要继承 React.Component


JSX
--
* 传统开发中，将html文件、css文件、还有js文件分别管理只是把不同的技术分开了而已，并没有做到逻辑上的分治。
* React使用JSX语法将一个组件所有的html代码，js代码和css代码都集中在了一起，符合高耦合的设计原则，
将做一件事情的代码封装到了一起。
* JSX中判断一个元素是React组件还是HTML元素的方法是看是否是大写
* JSX的DOM事件：所有注册的事件会通过事件委托的方式注册在最顶层的DOM节点上，避免了不必要的性能开销。


React生命周期
-- 
* React中定义了严格的声明周期，也同时提供了不同的钩子
    * 装载过程（Mount）
        * constructor: 定义组件的状态
        * componentWillMount： 组件装载前被调用，此时已经无法修改状态
        * render: 纯函数，必须要实现
        * componentDidMount：组件被装载到DOM树上时被调用(可以调用jQuer代码)
    * 更新过程（Update）
        * componentWillReceiveProps
        * shouldComponentUpdate: 自己定义此函数 可以提高组件性能 避免不必要的渲染
        * componentWillUpdate:
        * render：
        * componentDidUpdate：组件更新到DOM树上时被调用(可以调用jQuer代码)
    * 卸载过程（Unmount）
        * componentWillUnmount: 手动删除非React创建的事件，避免内存泄漏

React: props 和 state 
--
* React中使用props代表组件向外部提供的数据接口 使用state 表示自己本身的数据接口
* 使用props 和 state 存在的问题
    * 数据冗余 
    * 组件之间的数据可能会发生不一致
    * 跨组件传递数据，造成耦合较高
