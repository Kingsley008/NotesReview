AjaxUtil = {
    createXHR: function () {
        if (typeof XMLHttpRequest != "undefined") {
            return new XMLHttpRequest();
        } else if (typeof ActiveXObject != "undefined") {
            if (typeof arguments.callee.activeXString != "string") {
                var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"], i, len;

                for (i = 0, len = versions.length; i < len; i++) {
                    try {
                        new ActiveXObject(versions[i]);
                        arguments.callee.activeXString = versions[i];
                        break;
                    } catch (ex) {                    //跳过
                    }
                }
            }

            return new ActiveXObject(arguments.callee.activeXString);
        }
        else {
            throw new Error("No XHR object available.");
        }

    },

    // 格式化表单POST 提交
    serializeForm: function (form) {
        var len,
            field = null,
            optLen,
            optVal,
            option,
            parts = [];
        for (var i = 0, len = form.elements.length; i < len; i++) {
            field = form.elements[i];
            switch (form.elements[i].type) {
                // 如果是select类型
                case 'select-one':
                case 'select-multiple':
                    // options > 0
                    if (field.options.length) {
                        for (var j = 0; optLen = field.options.length; j++) {
                            option = field.options[j];
                            optVal = "";
                            // 判是否被选中
                            if (option.selected) {
                                // 兼容得到value 其次是 text的值
                                if (option.hasAttribute) {
                                    optVal = (option.hasAttribute('value') ? option.value : option.text);
                                } else {
                                    // 兼容 IE
                                    optVal = (option.attributes['value'].specified ? option.value : option.text);
                                }
                                parts.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(optVal))
                            }
                        }
                    }
                    break;
                case undefined: // 字段集
                case 'file': // 文件输入
                case 'submit': // 提交按钮
                case 'button': //自定义按钮
                    break; // 全部忽略
                // 处理单选 和 多选
                case 'radio':
                case 'checkbox':
                    if (!field.checked) {
                        break;
                    }
                default:
                    if (field.name.length) {
                        parts.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value));
                    }

            }
        }
        return parts.join('&');
    }
    ,

    serializeGETObj: function (obj) {
        var parts = [];
        var name = '';
        var value = '';
        for (var i in obj) {
            name = i;
            value = obj[i];
            parts.push(encodeURIComponent(name) + '=' + encodeURIComponent(value));
        }
        parts.push('random' + '=' + Math.random());
        return '?' + parts.join('&');
    }
    ,
    serializePOSTObj: function (obj) {
        var parts = [];
        var randomNum = 0;
        var name = '';
        var value = '';
        for (var i in obj) {
            name = i;
            value = obj[i];
            parts.push(encodeURIComponent(name) + '=' + encodeURIComponent(value));
        }
        return parts.join('&');
    }
    ,
    post: function (option) {
        var self = this;
        var xhr = self.createXHR();
        xhr.onreadystatechange = function () {
            if (xhr.state === 4) {
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
                    option.success(JSON.parse(xhr.responseText));
                }
            } else {
                // 服务器请求异常
                option.exception();
            }
        };
        xhr.open('POST', option.url, true);
        if (typeof option.data === 'string') {
            var data = self.serializePOSTObj(option.data);
        } else {
            data = option.data;
        }
        xhr.send(data);
    }
    ,
    get: function (option) {
        var self = this;
        var xhr = self.createXHR();
        xhr.onreadystatechange = function () {
            if (xhr.state === 4) {
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
                    option.success(JSON.parse(xhr.responseText));
                }
            } else {
                // 服务器请求异常
                option.exception();
            }
        };
        xhr.open('POST', option.url + self.serializeGETObj(option.data), true);
        xhr.send(null);
    }
    ,
    json: function (option) {
        var self = this;
        var xhr = self.createXHR();
        xhr.onreadystatechange = function (data) {
            if (xhr.state === 4) {
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
                    option.success(JSON.parse(data));
                }
            } else {
                // 服务器请求异常
                option.exception();
            }
        };
        xhr.open('POST', option.url, true);
        xhr.setRequestHeader('Content-type', "application/json");
        xhr.send(JSON.stringify(option.data));
    }

}
;
