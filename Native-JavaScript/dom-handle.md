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
    if (!dom_box) return
    function scroll () {
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
    }

    scroll()
}
````

###### 页面title滚动
```js
 setInterval(function () {
    // 取 title 中最后一个字符
    const first_char = document.title[0]
    // 取除了第一个剩下的
    const last_string = document.title.substr(1)
    // 给title重新赋值
    document.title = last_string + first_char
 }, 10)
```

###### 阻止滚动穿透
```js
	const maskPageStartY = ref(0);
 	// 阻止滚动穿透
	const preventThrough = (dom) => {
		const _dom: any = document.querySelector(dom);
		_dom?.addEventListener(
			"touchstart",
			(e: any) => {
				maskPageStartY.value = e?.changedTouches?.[0]?.pageY;
			},
			false
		);

		_dom?.addEventListener(
			"touchmove",
			(e: any) => {
				e?.stopPropagation();
				const moveY = e?.changedTouches?.[0]?.pageY - maskPageStartY.value;
				// 禁止向上滚动溢出
				if (e.cancelable && moveY > 0 && (_dom?.scrollTop || 0) <= 0) {
					e.preventDefault();
				}

				// 禁止向下滚动溢出
				if (e.cancelable && moveY < 0 && _dom?.scrollTop + _dom?.clientHeight >= _dom?.scrollHeight) {
					e.preventDefault();
				}
			},
			false
		);
	};
```

###### 水印
```html
<style>
#watermark_box {
  width: 100vw;
  height: 100vh;
  position: absolute;
  z-index: -1;
  overflow: hidden;
}
</style>
<div id="watermark_box"></div>
```

```js
class Watermark {
  constructor() {
    this.clientW = document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;
    this.clientH = document.documentElement.clientHeight || document.body.clientHeight || window.innerHeight;
    this.mark = null
    this.init = this.init.bind(this)
  }

  addWaterMark(params) {
    const _mark = document.querySelector('#skillnull_watermark_container')
    if (_mark) {
      _mark.parentElement.removeChild(_mark)
    }
    // 水印容器
    this.mark = document.createElement('canvas')
    this.mark.id = 'skillnull_watermark_container'
    this.mark.height = params.height || this.clientH
    this.mark.width = params.width || this.clientW
    // 水印内容
    const mark_text = this.mark.getContext('2d')
    mark_text.font = params.mark_text_font || '14px serif'
    mark_text.fillStyle = params.mark_text_font_color || '#434a56ab'
    mark_text.textBaseline = params.mark_text_baseline || 'hanging'
    const _gap = params.gaps || [100, 100]
    const _density = params.density || [150, 150]
    for (let i = 0; i < _density[0]; i++) {
      for (let j = 0; j < _density[1]; j++) {
        mark_text.save()
        mark_text.translate(i * _gap[0], j * _gap[1])
        mark_text.rotate((params.mark_text_rotate || 15) * Math.PI / 180)
        mark_text.fillText(params.mark_text || '水印', i * _gap[0], j * _gap[1])
        mark_text.restore()
      }
    }
    // 要添加水印元素
    const mark_target = document.querySelector(params.target)
    mark_target.appendChild(this.mark)
  }

  observer(params) {
    let observer = new MutationObserver((mutations) => {
      mutations.forEach((item) => {
        if (item.removedNodes.length > 0 && item.removedNodes[0].id === "skillnull_watermark_container") {
          this.addWaterMark(params)
        }
        if (item.type === 'attributes' && item.target.id === "skillnull_watermark_container") {
          const target = document.querySelector('#skillnull_watermark_container')
          target.style.display = 'block'
          target.style.opacity = 1
        }
        if (item.type === 'attributes' && item.target.id === params.target.replace('#', '').replace('.', '')) {
          const target = document.querySelector(params.target)
          target.style.display = 'block'
          target.style.opacity = 1
        }
      })
    })
    observer.observe(document.body, {
      childList: true,
      attributes: true,
      subtree: true,
      attributeOldValue: true,
      characterData: true,
      characterDataOldValue: true
    })
  }

  init(params) {
    this.addWaterMark(params)
    this.observer(params)
  }
}

new Watermark().init({
  target: '#watermark_box', // 必须，被添加水印元素
  height: '', // 水印容器高，默认页面高
  weight: '', // 水印容器宽，默认页面宽
  mark_text: 'SKILLNULL', // 水印内容，默认 '水印'
  mark_text_font: '300 12px Arial', // 水印字体样式，默认 '14px serif'
  mark_text_font_color: "#434a56ab", // 水印字体颜色，默认 '#434a56ab'
  mark_text_baseline: '', // 文字基线位置，默认 'hanging'
  mark_text_rotate: 20, // 文字旋转角度，默认 15
  gaps: [100, 100], // [x间隔, y间隔]， 默认 [100, 100]
  density: [150, 150] // [x数量, y数量]，默认 [150, 150]
})

```
