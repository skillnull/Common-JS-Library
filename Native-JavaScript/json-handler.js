// Json字符串格式化
function jsonFormat (string) {
    if (string === "") {
        return ""
    }
    var result = JSON.parse(string)
    return JSON.stringify(result, null, 4)
}