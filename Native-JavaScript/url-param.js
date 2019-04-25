/**
 * 获取hash或者search参数值
 * @param paramName
 * @returns {any}
 */
function getParam (paramName) {
    var searchResult = window.location.search.substr(1)
    var hashResult =  window.location.hash.substr(2)
    var result = searchResult || hashResult
    var reg = new RegExp("(^|&)" + paramName + "=([^&]*)(&|$)", "i")
    return result.match(reg) !== null ? decodeURI(result.match(reg)[2]) : null
}
