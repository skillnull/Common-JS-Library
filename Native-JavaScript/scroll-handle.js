// 滚动条位置处理
var scrollPosition = {
    // 位置
    result: 0,
    // 监听位置
    rememberPosition: function () {
        var type = 'scroll'
        var handle = function () {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            scrollPosition.result = scrollTop
        }
        if (window.addEventListener) {
            window.addEventListener(type, handle, false)
        }
        if (window.attachEvent) {
            window.attachEvent('on' + type, handle)
        }
    },
    // 设置位置
    setPostion: function () {
        window.scrollTo(document.body.scrollWidth, scrollPosition.result)
    }
}