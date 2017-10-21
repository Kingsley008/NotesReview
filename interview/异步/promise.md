Promise 
--
* Promise 有三个状态 
    1. pending
    2. resolve
    3. reject
* Promise API 
    * 1个构造函数： new Promise
    * 2个实例方法：.then 和 .catch
    * 4个静态方法：Promise.all、Promise.race、Promise.resolve和Promise.reject
    * resolve和reject： 这两个方法会改变当前promise实例的状态
    (fulfilled 或者 rejected)只有实例的状态改变了之后才会在then()或者catch()触发回调
    promise的内容分为构造函数、实例方法和静态方法
    
* .then用于为promise对象的状态注册回调函数。
它会返回一个promise对象，所以可以进行链式调用，
也就是.then后面可以继续.then。在注册的状态回调函数中，
可以通过return语句改变.then返回的promise对象的状态，
以及向后面.then注册的状态回调传递数据；
**也可以不使用return语句，那样默认就是将返回的promise对象resolve。**
    

    
    