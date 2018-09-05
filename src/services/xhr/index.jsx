import Config from '../../config/index';
const Tool = {};
import {browserHistory} from 'react-router';
const target = Config.target;
/**
 * 发送ajax请求和服务器交互
 * @param {object} mySetting 配置ajax的配置
 */

Tool.ajax = function (mySetting) {
    var setting = {
        url: window.location.pathname, //默认ajax请求地址
        async: true, //true。默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false
        type: 'GET', //请求的方式
        data: {}, //发给服务器的数据
        dataType: 'json',
        success: function (text) { }, //请求成功执行方法
        error: function (text) { } //请求失败执行方法
    
    };

    var aData = []; //存储数据
    var sData = ''; //拼接数据
    //属性覆盖
    for (var attr in mySetting) {
        setting[attr] = mySetting[attr];
    }
    for (var attr in setting.data) {
        aData.push(attr + '=' + filter(setting.data[attr]));
    }
    sData = aData.join('&');
    setting.type = setting.type.toUpperCase();
   

    var xhr = new XMLHttpRequest();
    try {
        if (setting.type == 'GET' || setting.type == 'DELETE') { //get、delete方式请求
            if(sData){
                sData = setting.url + '?' + sData;
            }else{
                
                sData=setting.url;
                console.log(sData);
            }
            xhr.open(setting.type, sData, setting.async);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded",);
            xhr.setRequestHeader("Authorization",Config.localItem(Config.localKey.userToken));
            xhr.send();
        } else if(setting.type == 'POST') { //post方式请求
            xhr.open(setting.type, setting.url, setting.async);
            xhr.setRequestHeader("Content-type", "application/json",);
            xhr.setRequestHeader("Authorization",Config.localItem(Config.localKey.userToken));
            xhr.send(JSON.stringify(setting.data));
        } else if(setting.type == 'PUT'){
            xhr.open(setting.type, setting.url, setting.async);
            xhr.setRequestHeader("Content-type", "application/json",);
            xhr.setRequestHeader("Authorization",Config.localItem(Config.localKey.userToken));
            xhr.send(JSON.stringify(setting.data));
        }
    } catch (e) {
        return httpEnd();
    }

    if (setting.async) {
        xhr.addEventListener('readystatechange', httpEnd, false);
    } else {
        httpEnd();
    }

    function httpEnd() {
        if (xhr.readyState == 4) {
            var head = xhr.getAllResponseHeaders();
            var response = xhr.responseText;
            //将服务器返回的数据，转换成json
            
            if (/application\/json/.test(head) || setting.dataType === 'json' && /^(\{|\[)([\s\S])*?(\]|\})$/.test(response)) {
                response = JSON.parse(response);
            }
            if (xhr.status >= 200&&xhr.status<400) { // 请求成功
                console.log('xhr===='+xhr.status);
                setting.success(response, setting, xhr);
            } else { // 请求失败 
                console.log('xhr===='+xhr.status);
                if(xhr.status==401){
                    browserHistory.push('/login');
                }
                setting.error(response,setting,xhr);
            }
        }
    }
    xhr.end = function () {
        xhr.removeEventListener('readystatechange', httpEnd, false);
    }
    function filter(str) { //特殊字符转义
        str += ''; //隐式转换
        str = str.replace(/%/g, '%25');
        str = str.replace(/\+/g, '%2B');
        str = str.replace(/ /g, '%20');
        str = str.replace(/\//g, '%2F');
        str = str.replace(/\?/g, '%3F');
        str = str.replace(/&/g, '%26');
        str = str.replace(/\=/g, '%3D');
        str = str.replace(/#/g, '%23');
        return str;
    }
    return xhr;
};

/**
 * 封装ajax put请求
 * @param {string} pathname 服务器请求地址
 * @param {object} data     发送给服务器的数据
 * @param {function} success  请求成功执行方法
 * @param {function} error    请求失败执行方法
 */
Tool.put = function (pathname, data, success, error) {
    var setting = {
        url: target + pathname, //默认ajax请求地址
        type: 'PUT', //请求的方式
        data: data, //发给服务器的数据
        success: success || function (text) { }, //请求成功执行方法
        error: error || function (text) { } //请求失败执行方法
    };
    return Tool.ajax(setting);
};

/**
 * 封装ajax delete请求
 * @param {string} pathname 服务器请求地址
 * @param {object} data     发送给服务器的数据
 * @param {function} success  请求成功执行方法
 * @param {function} error    请求失败执行方法
 */
Tool.delete = function (pathname, data, success, error) {
    var setting = {
        url: target + pathname, //默认ajax请求地址
        type: 'DELETE', //请求的方式
        data: data, //发给服务器的数据
        success: success || function(text){}, //请求成功执行方法
        error: error || function (text) { } //请求失败执行方法
    };
    return Tool.ajax(setting);
};

/**
 * 封装ajax post请求
 * @param {string} pathname 服务器请求地址
 * @param {object} data     发送给服务器的数据
 * @param {function} success  请求成功执行方法
 * @param {function} error    请求失败执行方法
 */
Tool.post = function (pathname, data, success, error) {
    var setting = {
        url: target + pathname, //默认ajax请求地址
        type: 'POST', //请求的方式
        data: data, //发给服务器的数据
        success: success|| function (text) { }, //请求成功执行方法
        error: error|| function (text) { }, //请求失败执行方法
    };
    return Tool.ajax(setting);
};

/**
 * 封装ajax put请求
 * @param {string} pathname 服务器请求地址
 * @param {object} data     发送给服务器的数据
 * @param {function} success  请求成功执行方法
 * @param {function} error    请求失败执行方法
 */
Tool.put = function (pathname, data, success, error) {
    var setting = {
        url: target + pathname, //默认ajax请求地址
        type: 'PUT', //请求的方式
        data: data, //发给服务器的数据
        success: success|| function (text) { }, //请求成功执行方法
        error: error|| function (text) { }, //请求失败执行方法
    };
    return Tool.ajax(setting);
};

/**
 * 封装ajax get请求
 * @param {string} pathname 服务器请求地址
 * @param {object} data     发送给服务器的数据
 * @param {function} success  请求成功执行方法
 * @param {function} error    请求失败执行方法
 */

Tool.get = function (pathname, data, success, error) {
    var setting = {
        url: target + pathname, //默认ajax请求地址
        type: 'GET', //请求的方式
        data: data, //发给服务器的数据
        success: success || function (text) { }, //请求成功执行方法
        error: error || function (text) { } //请求失败执行方法
    };
    return Tool.ajax(setting);
};

export default Tool;