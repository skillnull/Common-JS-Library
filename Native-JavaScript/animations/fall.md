###### 落彩条动画效果
```js
/**
 * 落彩条动画效果
 */
export default class Animation {
  constructor () {
    this.animation = null
    this.colors = [
      '#26ccff',
      '#a25afd',
      '#ff5e7e',
      '#88ff5a',
      '#fcff42',
      '#ffa62d',
      '#ff36ff'
    ]
    this.arr = []
    this.initEle()
    this.canvas = this.initCanvas(999)
    document.body.appendChild(this.canvas)
    this.context = this.canvas.getContext('2d')
  }

  initElement () {
    let TIME = Math.floor(1000 / 60)
    let frame, cancel
    let frames = {}
    let lastFrameTime = 0
    let _this = this
    if (typeof requestAnimationFrame === 'function' && typeof cancelAnimationFrame === 'function') {
      frame = function (cb) {
        let id = Math.random()
        frames[id] = requestAnimationFrame(function onFrame (time) {
          if (lastFrameTime === time || lastFrameTime + TIME - 1 < time) {
            lastFrameTime = time
            delete frames[id]
            cb(_this)
          } else {
            frames[id] = requestAnimationFrame(onFrame)
          }
        })
        return id
      }
      cancel = function (id) {
        if (frames[id]) {
          cancelAnimationFrame(frames[id])
        }
      }
    } else {
      frame = function (cb) {
        return setTimeout(cb, TIME)
      }
      cancel = function (timer) {
        return clearTimeout(timer)
      }
    }

    return {frame: frame, cancel: cancel}
  }

  initCanvas (zIndex) {
    let canvas = document.createElement('canvas')
    canvas.width = document.documentElement.clientWidth
    canvas.height = document.documentElement.clientHeight
    canvas.style.cssText = `position: fixed; top: 0px; left: 0px; pointer-events: none; z-index: ${zIndex};`

    setTimeout(() => {
      document.body.removeChild(canvas)
    }, 1000)

    return canvas
  }

  hexToRgb (str) {
    var val = String(str).replace(/[^0-9a-f]/gi, '')

    if (val.length < 6) {
      val = val[0] + val[0] + val[1] + val[1] + val[2] + val[2]
    }

    return {
      r: parseInt(val.substring(0, 2), 16),
      g: parseInt(val.substring(2, 4), 16),
      b: parseInt(val.substring(4, 6), 16)
    }
  }

  updateElement (context, element) {
    let progress = (element.tick++) / element.totalTicks
    if (progress > 1) return
    element.x += Math.cos(element.angle2D) * element.velocity // 左下角
    element.y += Math.sin(element.angle2D) * element.velocity + element.gravity // 左下角

    element.velocity *= element.decay
    element.tiltAngle += 0.1
    element.tiltSin = Math.sin(element.tiltAngle)
    element.tiltCos = Math.cos(element.tiltAngle)
    element.random = Math.random() + 7

    let x1 = element.x
    let y1 = element.y

    let x2 = element.x + (element.random * element.tiltCos) // 左上角
    let y2 = element.y + (element.random * element.tiltSin) // 左上角

    let x3 = x2 + element.random
    let y3 = y2

    let x4 = element.x + element.random
    let y4 = element.y

    context.fillStyle = `rgba(${element.color.r},${element.color.g},${element.color.b},${(1 - progress)})`
    context.beginPath()
    context.moveTo(Math.floor(x1), Math.floor(y1))
    context.lineTo(Math.floor(x2), Math.floor(y2))
    context.lineTo(Math.floor(x3), Math.floor(y3))
    context.lineTo(Math.floor(x4), Math.floor(y4))
    context.closePath()
    context.fill()

    return element.tick < element.totalTicks
  }

  update (_this) {
    _this.context.clearRect(0, 0, _this.canvas.width, _this.canvas.height)
    _this.arr = _this.arr.filter(item => {
      return _this.updateElement(_this.context, item)
    })
    if (_this.arr.length) {
      _this.animation = _this.initElement().frame(_this.update)
    }
  }

  initEle () {
    for (let i = 0; i < 100; i++) {
      this.arr.push({
        "x": 0,
        "y": 600,
        "velocity": (45 * 0.5) + (Math.random() * 20),
        "angle2D": 3 / 2 * Math.PI + Math.random() * 1 / 4 * Math.PI,
        "tiltAngle": Math.random() * Math.PI,
        "color": this.hexToRgb(this.colors[Math.floor(Math.random() * 7)]),
        "tick": 0,
        "totalTicks": 350,
        "decay": 0.95,
        "random": 0,
        "tiltSin": 0,
        "tiltCos": 0,
        "gravity": 3,
        "scalar": 1
      })
    }
  }

  // 动画生成方法
  giftRun () {
    if (!this.animation) {
      this.animation = this.initElement().frame(this.update)
    } else {
      this.initEle()
    }
  }
}
```