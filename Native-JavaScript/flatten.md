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
    if (item.children && item.children.length > 0) {
      flatten(item.children, result)
    }
  })
  return result
}

// 使用方法
let targetReult = []
flatten(arr,tatargetReult)
console.log(targetReult)
```