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

###### 图表根据时间进行补点

```typescript

/**
 * 图表数据补点处理
 * @param {
 *   data 需要处理的数据
 *   step 数据步长
 *   field 用于比对的字段
 *   fill 用于填补数据的字段组合
 *   toNow 是否只显示到当前时间
 * }
 */
export const handleChartsData = ({ data = [], step = 60, field = '', fill = {}, toNow = true }: any) => {
  let _data
  const count = 1440 / step
  if (data.length < count) {
    // 根据步长生成完整的时间数组
    let time_arr: any = []
    for (let i = 0; i < 24; i++) {
      for (let j = 0; j < 60 / step; j++) {
        time_arr.push(`${i < 10 ? '0' + i : i}:${j * step < 10 ? '0' + j * step : j * step}`)
      }
    }

    // 根据 field 进行数据填补
    let result: any = []
    if (field) {
      const had_time: any = []
      data &&
      data.length > 0 &&
      data.map((item: any) => {
        had_time.push(item[field])
      })
      time_arr &&
      time_arr.length > 0 &&
      time_arr.map((item: any, index: any) => {
        if (had_time.includes(item)) {
          result[index] = data.filter((val: any) => {
            return val[field] === item
          })[0]
        } else {
          fill[field] = item
          result[index] = { ...fill }
        }
      })
    } else {
      result = data
    }
    _data = result
  } else {
    _data = data
  }
  let now = `${new Date().getHours()}:${new Date().getMinutes()}`
  let filter_data = _data.filter((item: any) => {
    return item[field] <= now
  })
  return toNow ? filter_data : _data
}

```

###### 随机生成时间段内的日期

```js
/**
 * 随机生成时间段内的日期
 * @startDate: 开始日期
 * @endDate: 结束日期
 */
export const rendomDate = (startDate: any, endDate: any = new Date()) => {
    let date = new Date(+startDate + Math.random() * (endDate - startDate))
    let hour = 0 + Math.random() * 23 | 0
    let minute = 0 + Math.random() * 59 | 0
    let second = 0 + Math.random() * 59 | 0
    date.setHours(hour)
    date.setMinutes(minute)
    date.setSeconds(second)
    return date
  }
```

```js
/**
 * 获取当天23:59:59
 */
new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1)
```

###### 多长时间以前

```js
function getTime(time) {
  const minute = 1000 * 60
  const hour = minute * 60
  const day = hour * 24
  const week = day * 7
  const month = day * 30

  // 当前时间的时间戳
  const now_time = new Date().getTime()
  // 指定时间的时间戳
  const taget_time = Date.parse(new Date(time))

  const duration = now_time - taget_time

  let result
  if (duration < 0) {
    result = '设置的时间，不能为当前时间以后的时间！'
  } else if (duration / month >= 1) {
    result = parseInt(duration / month) + '月前'
  } else if (duration / week >= 1) {
    result = parseInt(duration / week) + '周前'
  } else if (duration / day >= 1) {
    result = parseInt(duration / day) + '天前'
  } else if (duration / hour >= 1) {
    result = parseInt(duration / hour) + '小时前'
  } else if (duration / minute >= 1) {
    result = parseInt(duration / minute) + '分钟前'
  } else {
    result = '刚刚'
  }
  return result
}
```

###### 时间段内倒计时

```js
  // 倒计时时间格式转换
  const countDownFormat = (nowTime) => {
   const time = nowTime
    if (time <= 0) {
      return {
         day: 0,
         hour: 0,
         minutes: 0,
         seconds: 0,
         hours1: 0,
         hours2: 0,
         minutes1: 0,
         minutes2: 0,
         seconds1: 0,
         seconds2: 0
      }
    } else {
      const day = Math.floor(time / (60 * 60 * 24))
      const hour = Math.floor(time / (60 * 60)) - day * 24
      const minutes = Math.floor((time / 60) - day * 24 * 60 - hour * 60)
      const seconds = time - day * 24 * 60 * 60 - hour * 60 * 60 - minutes * 60

      return {
        day: day,
        hour: hour,
        minutes: minutes,
        seconds: seconds,
        hours1: hour > 9 ? String(hour).slice(0, 1) : 0,
        hours2: hour > 9 ? String(hour).slice(1) : hour,
        minutes1: minutes > 9 ? String(minutes).slice(0, 1) : 0,
        minutes2: minutes > 9 ? String(minutes).slice(1) : minutes,
        seconds1: seconds > 9 ? String(seconds).slice(1) : 0,
        seconds2: seconds > 9 ? String(seconds).slice(1) : seconds
      }
    }
  }
  // 倒计时
  const countDown = (startTime, endTime) => {
    if (endTime > startTime) {
      let surplus = Math.floor((endTime - startTime) / 1000)
      let Timer = setInterval(() => {
        --surplus
        if (surplus <= 0) {
          clearInterval(Timer)
          Timer = null
        }
        const res = countDownFormat(surplus)
        console.log(`${res.day}天${res.hours1}${res.hours2}时${res.minutes1}${res.minutes2}分${res.seconds1}${res.seconds2}秒`)
      }, 1000)
    }
  }
```
