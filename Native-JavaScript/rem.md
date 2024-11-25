#### 动态计算rem

```javascript
!function (e, t) {
  var n = t.documentElement, d = e.devicePixelRatio || 1;

  function i() {
    var e = n.clientWidth / 3.75;
    n.style.fontSize = e + "px"
  }

  if (function e() {
    t.body ? t.body.style.fontSize = "16px" : t.addEventListener("DOMContentLoaded", e)
  }(), i(), e.addEventListener("resize", i), e.addEventListener("pageshow", function (e) {
    e.persisted && i()
  }), 2 <= d) {
    var o = t.createElement("body"), a = t.createElement("div");
    a.style.border = ".5px solid transparent", o.appendChild(a), n.appendChild(o), 1 === a.offsetHeight && n.classList.add("hairlines"), n.removeChild(o)
  }
}(window, document)
```

```javascript
// 根据设计稿尺寸计算大小，例如用在echarts里，自适应字体大小
export const rem = (fontSize: number, width: any = null) => {
	const _width = width || document.documentElement.clientWidth;
	return (_width / 375) * fontSize;
};
```
