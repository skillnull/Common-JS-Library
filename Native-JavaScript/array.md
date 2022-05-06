###### 数组拉平

```javascript
export function flatten (list = [], result = []) {
  list.forEach(item => {
    if (Array.isArray(item)) {
      flatten(item, result)
    } else {
      if (list !== undefined) {
        result.push(item)
      }
    }
    if (item && item.children && item.children.length > 0) {
      flatten(item.children, result)
    }
  })
  return result
}

// 使用方法
let targetReult = []
flatten(arr, tatargetReult)
console.log(targetReult)
```

###### 从数组中随机选取指定数量的值

```javascript
export const getArrRadomItem = (arr: any, num: any) => {
  let _arr = arr.slice(0)
  let length = arr.length
  let min = length - num
  let item
  let index

  while (length-- > min) {
    index = Math.floor(Math.random() * (length + 1))
    item = _arr[index]
    _arr[index] = _arr[length]
    _arr[length] = item
  }
  return _arr.slice(min)
}
```

###### 洗牌算法打乱数组顺序

```javascript
export const shuffle = (arr: any) => {
  let length = arr.length
  let index
  let temp
  while (length > 0) {
    index = Math.floor(Math.random() * length)
    temp = arr[length - 1]
    arr[length - 1] = arr[index]
    arr[index] = temp
    length--
  }
  return arr
}
```