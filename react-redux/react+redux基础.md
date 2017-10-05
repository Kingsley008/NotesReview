Redux + React
--
* 使用的基本原则
    * 定义状态树的结构 
    * 根据组件的功能来组织文件
    * 定义组件的actionTypes
    * 定义组件的actions
    * 定义组件的reducer 
    * 定义Store 
    * 创建provider组件挂载到组件顶层，通过context使得store全局共享
    * 拆分容器组件和无状态组件
* react-redux 库的使用
    * connect(mapState,mapDispatcher)(component)
        * mapState(store,ownProps):把store上的状态转换为内层傻瓜组件的props
        ```jsx harmony
            function mapState(state, ownProps) {
              return {
                  value: state[ownProps.caption].value
              }
            }
        
        ```
        * mapDispatcher(dispatcher,ownProps):把内层傻瓜组件的用户动作转换为派发给Store的动作
        ```jsx harmony
            function mapDispatcher(dispatcher, ownProps) {
                return{
                    onIncrement:() => {
                        dispatcher(Action.increment(ownProps.caption))
                    },
                    onDecrement:() => {
                        dispatcher(Action.decrement(ownProps.caption))
                    }
                }
            }
        ```