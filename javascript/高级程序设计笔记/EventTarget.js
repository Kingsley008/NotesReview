(function () {
    function EventTarget() {
        this.handlers = {};
    }

    EventTarget.prototype = {
        constructor: EventTarget,
        // type: 事件类型  handler: 回调函数
        addHandler : function (type, handler) {
            if (typeof this.handlers[type] === 'undefined') {
                this.handlers[type] = []
            }
            this.handlers[type].push(handler);
        },
        // 发射事件 event: {type:"",message:"" }
        fire: function (event) {
            if (!event.target) {
                event.target = this;
            }
            if (this.handlers[event.type] instanceof  Array) {
                var handlerArr = this.handlers[event.type];
                for (var i = 0; i < handlerArr.length; i++ ) {
                    handlerArr[i](event)
                }
            }

        },
        // 删除类型的事件的一个具体的方法
        removeHandler: function (type, handler) {
            if (this.handlers[type] instanceof  Array) {
                var handlerArr = this.handlers[type];
                var index = handlerArr.indexOf(handler);
                handlerArr.splice(index, 1);
            }
        }
    };

    // 测试
    function Person(name, age) {
        EventTarget.call(this);
        this.name = name;
        this.age = age;
    }
    Person.prototype = new EventTarget();
    Person.prototype.say = function (message) {
        this.fire({type:'message', message: message });
    };

    var person = new Person('king','20');
    // 设置事件触发的回调函数
    function handler(event) {
        console.log(event.target.name + " says: " + event.message);
    }
    person.addHandler('message', handler);
    person.say('Hi');

    person.removeHandler('message', handler);
    person.say('Hello');
})();


