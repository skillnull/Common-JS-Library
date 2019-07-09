/**
 * 合并两个函数
 * @param functionA 先执行
 * @param functionB 执行完 functionA 后返回
 * @returns {*}
 */
function mergeFunction (functionA, functionB) {
    if (!functionA || !functionB) return
    var merge = functionB
    functionB = (function () {
        merge.call(this)
        functionA.call(this)
    })()
    return functionB = merge
}