var EventUtil = {
    // 添加事件绑定
    addHandler: function (element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false); // DOM2级添加事件
            //（布尔值表示是在捕获阶段还是冒泡阶段调用事件处理程序）
        } else if (element.attachEvent) {
            element.attachEvent('on' + type, handler); // IE添加事件
        } else {
            element['on' + type] = handler; // DOM0级
        }
    },
    // 解除事件绑定
    removeHandler: function (element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler);
        } else if (element.detachEvent) {
            element.detachEvent(type, handler);
        } else {
            element['on' + type] = null;
        }
    },
    // 得到事件的回调函数的参数
    getEvent: function (event) {
        // 兼容DOM0
        return event ? event : window.event;
    },
    // 得到触发事件的对象
    getTarget: function (event) {
        return event.target || event.srcElement;
    },
    // 停止事件的传播
    stopPropagation: function (event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    },
    // 阻止事件的默认行为
    preventDefault: function (event) {
        if (event.preventDefault) {
            event.preventDefault()
        } else {
            event.returnValue = false;
        }
    },
    // 获取mouseover和mouseout相关元素
    getRelatedTarget: function (event) {
        if (event.relatedTarget) {
            return event.relatedTarget;
        } else if (event.toElement) {
            return event.toElement;
        } else if (event.formElement) {
            return event.formElement;
        } else {
            return null;
        }
    },

    // 获取mousedown或者mouseup按下或者释放的按钮是鼠标的哪一个
    getButton: function (event) {
        if (document.implementation.hasFeature('MouseEvent', '2.0')) {
            return event.button;
        } else {
            switch (event.button) {
                case 0:
                case 1:
                case 3:
                case 5:
                case 7:
                    return 0; // 按下鼠标的主按钮 一般左键
                case 2:
                case 6:
                    return 2; // 按下的是中间的鼠标按钮
                case 4:
                    return 1; // 鼠标次按钮  一般 右键
            }
        }
    },
    getWheelDelta: function (event) {
        if (event.wheelDelta) {
            // 兼容 opera 9.5 之前的版本
            return (client.engine.opera && client.engine.opera < 9.5 ?
                -event.wheelDelta : event.wheelDelta);
        } else {
            // 兼容 Firefox 向前滚 -3倍数  向后 3 的背书
            return -event.detail * 40;
        }

    },
    // 得到ASCII码
    getCharCode: function (event) {
        if (typeof event.charCode === 'number') {
            return event.charCode;
        } else {
            return event.keyCode;
        }
    },
    // 得到剪切板的内容
    getClipboardText: function (event) {
        var clipboardData = (event.clipboardData || window.clipboardData);
        return clipboardData.getData('text');
    },
    // 设置剪切板的内容
    setClipboardText: function (event, value) {
        if (event.clipboardData) {
            // 对于Safari 和 Chrome
            return event.clipboardData.setData('text/plain', value);
        } else if (window.clipboardData) {
            // IE
            return window.clipboardData.setData('text', value);
        }
    }

};