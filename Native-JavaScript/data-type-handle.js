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

/**
 * 深度比较两个对象是否相等
 * @type {{compare: compareObj.compare, isObject: (function(*=): boolean), isArray: (function(*=): boolean)}}
 */
var compareObj = {
    // 比较两个对象是否相等
    compare: function (oldData, newData) {
        // 类型为基本类型时,如果相同,则返回true
        if (oldData === newData) return true
        if (compareObj.isObject(oldData) && compareObj.isObject(newData) && Object.keys(oldData).length === Object.keys(newData).length) {
            // 类型为对象并且元素个数相同
            // 遍历所有对象中所有属性,判断元素是否相同
            for (const key in oldData) {
                if (oldData.hasOwnProperty(key)) {
                    if (!compareObj.compare(oldData[key], newData[key])) {
                        // 对象中具有不相同属性 返回false
                        return false
                    }
                }
            }
        } else if (compareObj.isArray(oldData) && compareObj.isArray(oldData) && oldData.length === newData.length) {
            // 类型为数组并且数组长度相同
            for (let i = 0, length = oldData.length; i < length; i++) {
                if (!compareObj.compare(oldData[i], newData[i])) {
                    // 如果数组元素中具有不相同元素,返回false
                    return false
                }
            }
        } else {
            // 其它类型,均返回false
            return false
        }
        // 走到这里,说明数组或者对象中所有元素都相同,返回true
        return true
    },
    // 判断此类型是否是Array类型
    isObject: function (obj) {
        return Object.prototype.toString.call(obj) === '[object Object]'
    },
    // 判断此对象是否是Object类型
    isArray: function (arr) {
        return Object.prototype.toString.call(arr) === '[object Array]'
    }
}