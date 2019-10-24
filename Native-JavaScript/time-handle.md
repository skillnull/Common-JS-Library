###### 比较两个时间的时间差

````js
/**
 * 比较两个时间的时间差
 * @param startTime 开始时间
 * @param endTime 结束时间
 * @demo compareTime(new Date('2019-12-24 16:02').getTime(), new Date().getTime())
 */
function compareTime (startTime, endTime) {
    var retValue = {}

    var compareTime = endTime - startTime  // 时间差的毫秒数

    // 计算出相差天数
    var days = Math.floor(compareTime / (24 * 3600 * 1000))
    retValue.Days = days

    // 计算出相差年数
    var years = Math.floor(days / 365)
    retValue.Years = years

    // 计算出相差月数
    var months = Math.floor(days / 30)
    retValue.Months = months

    // 计算出小时数
    var leaveHours = compareTime % (24 * 3600 * 1000) // 计算天数后剩余的毫秒数
    var hours = Math.floor(leaveHours / (3600 * 1000))
    retValue.Hours = hours

    // 计算相差分钟数
    var leaveMinutes = leaveHours % (3600 * 1000) // 计算小时数后剩余的毫秒数
    var minutes = Math.floor(leaveMinutes / (60 * 1000))
    retValue.Minutes = minutes

    // 计算相差秒数
    var leaveSeconds = leaveMinutes % (60 * 1000) // 计算分钟数后剩余的毫秒数
    var seconds = Math.round(leaveSeconds / 1000)
    retValue.Seconds = seconds

    var resultSeconds = 0
    if (years >= 1) {
        resultSeconds = resultSeconds + years * 365 * 24 * 60 * 60
    }
    if (months >= 1) {
        resultSeconds = resultSeconds + months * 30 * 24 * 60 * 60
    }
    if (days >= 1) {
        resultSeconds = resultSeconds + days * 24 * 60 * 60
    }
    if (hours >= 1) {
        resultSeconds = resultSeconds + hours * 60 * 60
    }
    if (minutes >= 1) {
        resultSeconds = resultSeconds + minutes * 60
    }
    if (seconds >= 1) {
        resultSeconds = resultSeconds + seconds
    }
    retValue.resultSeconds = resultSeconds

    return retValue
}

````