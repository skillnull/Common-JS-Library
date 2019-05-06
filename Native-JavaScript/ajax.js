/**
 * @function ajax request
 * @fields ajaxName:请求名称，method：请求方法，headers:setRequestHeader自定义部分,url：接口地址，async：是否异步请求，withCredentials：是否支持跨域发送cookie，dataType:数据类型 ,data：post请求参数
 * @param data:{ajaxName:"ajaxNameString",headers:{},method:"GET/POST",url:"",async:true/false,withCredentials:true/false,dataType:"json",data:""}
 * @result ajaxName.responseText
 */
function ajaxRequest (data, callback) {
    data = data || {};
    data.dataType = data.dataType || 'json';
    var sendParams = null;
    var headers = data.headers || {};
    var ajax = data.ajaxName;
    // 新建请求
    if (window.XMLHttpRequest) {
        ajax = new XMLHttpRequest();
    } else {
        ajax = new ActiveXObject('Microsoft.XMLHTTP');
    }
    // 打开请求
    ajax.open(data.method.toUpperCase(), data.url, data.async);
    // 是否支持跨域发送cookie
    ajax.withCredentials = data.withCredentials;
    // POST请求设置
    if (data.method == 'POST') {
        ajax.setRequestHeader("Content-type", data.contentType || "application/x-www-form-urlencoded");
        for (var i in headers) {
            ajax.setRequestHeader(i, headers[i]);
        }
        if (data.contentType) {
            sendParams = data.data;
        }
    }
    // 发送请求
    ajax.send(sendParams ? sendParams : null);
    // 注册事件
    ajax.onreadystatechange = function () {
        callback(ajax);
    }
}

/**
 * 拼接GET请求url参数
 * @param url
 * @param params
 * @returns {string}
 */
function formateGetUrl (url, params) {
    var resultParams = ''
    for (var key in params) {
        resultParams = resultParams + '&' + key + '=' + params[key]
    }
    return url + '?' + resultParams.substr(1)
}

/**
 * GET
 * @param ajaxName
 * @param requestUrl
 * @param async
 * @param callBack
 */
function ajaxGetData (ajaxName, requestUrl, async, callBack) {
    ajaxRequest({
        ajaxName: ajaxName,
        contentType: "application/json;charset=utf-8",
        method: "GET",
        url: requestUrl,
        async: async,
        cache: false,
        withCredentials: true,
        dataType: "json"
    }, function callback (ajax) {
        if (ajax.status == 200 && ajax.readyState == 4) {
            callBack(ajax.responseText)
        }
    })
}

/**
 * POST
 * @param ajaxName
 * @param requestUrl
 * @param async
 * @param callBack
 */
function ajaxPostData (ajaxName, requestUrl, params, async, callBack) {
    var resultParams = ''
    for (var key in params) {
        resultParams = resultParams + '&' + key + '=' + encodeURIComponent(params[key])
    }
    ajaxRequest({
        ajaxName: ajaxName,
        headers: {},
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        method: "POST",
        dataType: "json",
        url: requestUrl,
        processData: true,
        async: async,
        data: resultParams
    }, function callback (ajax) {
        if (ajax.status == 200 && ajax.readyState == 4) {
            callBack(ajax.responseText)
        }
    })
}