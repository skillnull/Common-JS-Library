###### 监听浏览器标签页的显示与隐藏

````js
/**
 * 监听浏览器标签页的显示与隐藏
 */
class ListenerPageVisibility {
    constructor () {
        // 设置隐藏属性和改变可见属性的事件的名称
        this.hidden = ''
        this.visibilityChange = ''
        if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support
            this.hidden = "hidden"
            this.visibilityChange = "visibilitychange"
        } else if (typeof document.msHidden !== "undefined") {
            this.hidden = "msHidden"
            this.visibilityChange = "msvisibilitychange"
        } else if (typeof document.webkitHidden !== "undefined") {
            this.hidden = "webkitHidden"
            this.visibilityChange = "webkitvisibilitychange"
        }

        this.handleChange = (callBackHidden, callBackVisibility) => {
            if (document[this.hidden]) {
                // 页面是隐藏状态
                callBackHidden && callBackHidden()
            } else {
                // 页面是展示状态
                callBackVisibility && callBackVisibility()
            }
        }

    }

    /**
     * 全局访问点
     * @param callBackHidden 页面隐藏执行的回调方法
     * @param callBackVisibility 页面显示执行的回调方法
     */
    linsternVisibility (callBackHidden, callBackVisibility) {
        // 如果浏览器不支持addEventListener 或 Page Visibility API 给出警告
        if (typeof document.addEventListener === "undefined" || typeof document[this.hidden] === "undefined") {
            console.log("This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.")
        } else {
            // 处理页面可见属性的改变
            document.addEventListener(this.visibilityChange, () => {
                this.handleChange(callBackHidden, callBackVisibility)
            }, false)
        }
    }
}

// 调用实例
let navChange = new ListenerPageVisibility()
navChange.linsternVisibility(
    // 页面是隐藏状态执行方法
    () => {
        // TODO 浏览器标签页处于隐藏状态时,执行的方法
    },
    // 页面是可见状态执行方法
    () => {
        // TODO 浏览器标签页处于显示状态时,执行的方法
    }
)

````

###### 监听dom变化
````js
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
````

###### 滚动到底部
````js
// 滚动到低部
export function scrollToBottom (dom) {
    const dom_box = document.querySelector(dom)
    (function scroll () {
        // 已经滚动的高度
        const currentScroll = dom_box.scrollTop
        // 容器高度
        const clientHeight = dom_box.offsetHeight
        // 内容高度
        const scrollHeight = dom_box.scrollHeight
        if (scrollHeight - 10 > currentScroll + clientHeight) {
            window.requestAnimationFrame(scroll)
            dom_box.scrollTo(0, currentScroll + (scrollHeight - currentScroll - clientHeight) / 2)
        }
    })()
}
````
