/**
 * @function ajax request
 * @fields ajaxName:请求名称，method：请求方法，headers:setRequestHeader自定义部分,url：接口地址，async：是否异步请求，withCredentials：是否支持跨域发送cookie，dataType:数据类型 ,data：post请求参数
 * @param data:{ajaxName:"ajaxNameString",headers:{},method:"GET/POST",url:"",async:true/false,withCredentials:true/false,dataType:"json",data:""}
 * @result ajaxName.responseText
 */
function ajaxRequest (data, callback) {
    data = data || {}
    data.dataType = data.dataType || 'json'
    var sendParams = null
    var headers = data.headers || {}
    var ajax = data.ajaxName
    // 新建请求
    if (window.XMLHttpRequest) {
        ajax = new XMLHttpRequest()
    } else {
        ajax = new ActiveXObject('Microsoft.XMLHTTP')
    }
    // 打开请求
    ajax.open(data.method.toUpperCase(), data.url, data.async)
    // 是否支持跨域发送cookie
    ajax.withCredentials = data.withCredentials
    ajax.setRequestHeader("Content-type", data.contentType || "application/x-www-form-urlencoded")
    // POST请求设置
    if (data.method == 'POST') {
        for (var i in headers) {
            ajax.setRequestHeader(i, headers[i])
        }
        if (data.data) {
            sendParams = data.data
        }
    }
    // 发送请求
    ajax.send(sendParams ? sendParams : null)
    // 注册事件
    ajax.onreadystatechange = function () {
        if (window.location.origin + '/login/index' === ajax.responseURL) {
            window.location.reload()
            window.location.href = window.location.origin + '/login/index'
            return
        }
        callback(ajax)
    }
}

/**
 * GET
 * @param ajaxName
 * @param requestUrl
 * @param async
 * @param callBack
 */
function ajaxGetData (ajaxName, requestUrl, async, callBack, contetntType) {
    ajaxRequest({
        ajaxName: ajaxName,
        contentType: contetntType || "application/json;charset=utf-8",
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
 * POST
 * @param ajaxName
 * @param requestUrl
 * @param async
 * @param callBack
 */
function ajaxPostData (ajaxName, requestUrl, params, async, callBack, contetntType) {
    var resultParams = ''
    if (!contetntType || contetntType === "application/x-www-form-urlencoded;charset=utf-8") {
        for (var key in params) {
            resultParams = resultParams + '&' + key + '=' + encodeURIComponent(params[key])
        }
    } else {
        resultParams = params && JSON.stringify(params)
    }
    ajaxRequest({
        ajaxName: ajaxName,
        headers: {},
        contentType: contetntType || "application/x-www-form-urlencoded;charset=utf-8",
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
