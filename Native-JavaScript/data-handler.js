/**
 * 保留小数并千分位格式化
 * @param number
 * @param digit 保留小数的位数
 * @param showZero 是否显示小数点后面的0，默认显示
 * @returns {string}
 */
function thousandsFormateTofixed (number, digit, showZero) {
    // 保留小数
    number = (number).toFixed(digit)
    number += ''
    if (!number.includes('.')) number += '.'
    var result = number.replace(/(\d)(?=(\d{3})+\.)/g, function ($0, $1) {
        return $1 + ','
    }).replace(/\.$/, '')
    // 是否显示小数点后面的0,默认显示
    if (showZero === false) {
        if (+result.split('.')[1] === 0) {
            result = result.split('.')[0]
        }
    }
    return result
}