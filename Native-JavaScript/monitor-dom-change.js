/**
 * 监听dom变化
 * @param callback
 */
function monitorDomChange (callback) {
    var mutationObserver = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            callback(mutation)
        })
    })
    // 开始侦听页面的根 HTML 元素中的更改。
    mutationObserver.observe(document.documentElement, {
        attributes: true,
        characterData: true,
        childList: true,
        subtree: true,
        attributeOldValue: true,
        characterDataOldValue: true
    })
}
