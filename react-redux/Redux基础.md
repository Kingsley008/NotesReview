Redux 基础
--
* 更加严格的数据流 
    * 在传统的MVC前端框架中，往往View层和Model可以互相通信，导致程序混乱不堪，
    redux采用了更加严格的单向数据流来约束View层， View层只能动过派发action来改变model的状态
        * Action --> Dispatcher --> Store --> View --> Action --> Dispatcher
* Redux 基本原则
    * 唯一数据源： 所有的状态数据应该存储在唯一的一个Store上 
    * 保持状态可读： 要修改Store的状态，必须要派发一个action对象完成
    * 数据改变只能通过纯函数完成： reducer(state, action) -- reducer 要做的事情就是
    根据state和action 来返回一个新的对象 从而刷新Store的状态
* Redux 运行流程
     * store.dispatch() 分发一个action
     * action 函数接收需求的参数 返回一个action对象 其中有默认的type属性
     * reducer 接收到 返回的action对象，从type属性判断是哪一个action.type 从而运行对应的逻辑代码返回一个新的 state     