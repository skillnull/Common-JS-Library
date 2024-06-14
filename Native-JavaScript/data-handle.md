###### 保留小数并千分位格式化
````js
/**
 * 保留小数并千分位格式化
 * @param number
 * @param digit 保留小数的位数
 * @param showZero 是否显示小数点后面的0，默认显示
 * @returns {string}
 */
function thousandsFormateTofixed (number, digit, showZero) {
    // 保留小数
    number = (number).toFixed(digit)
    number += ''
    if (!number.includes('.')) number += '.'
    var result = number.replace(/(\d)(?=(\d{3})+\.)/g, function ($0, $1) {
        return $1 + ','
    }).replace(/\.$/, '')
    // 是否显示小数点后面的0,默认显示
    if (showZero === false) {
        if (+result.split('.')[1] === 0) {
            result = result.split('.')[0]
        }
    }
    return result
}
````

###### 递归遍历数组对象，将结果去重
````js
/**
 * 递归遍历数组对象，将结果去重
 * @returns {*}
 */
var getAllType = function () {
    var typeArr = []
    var getType = function (list) {
        list.forEach(function (item) {
            typeArr.push(item)
            if (item.child && item.child.length > 0) {
                getType(item.child)
            } else {
                typeArr.push(item)
            }
        })
    }
    getType([
        {
            name: '栏位类型',
            key: 'adslot_type',
            tendency: true,
            child: [
                {
                    name: '栏位',
                    key: 'adslot_id',
                    tendency: true,
                    child: [
                        {
                            name: '代理',
                            key: 'belong',
                            tendency: true,
                            child: [
                                {
                                    name: '广告主',
                                    key: 'user_id',
                                    tendency: true,
                                    child: [
                                        {
                                            name: '单元',
                                            key: 'unit_id',
                                            tendency: true
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    name: '行业',
                    key: 'category',
                    tendency: true,
                    child: [
                        {
                            name: '代理',
                            key: 'belong',
                            tendency: true,
                            child: [
                                {
                                    name: '广告主',
                                    key: 'user_id',
                                    tendency: true,
                                    child: [
                                        {
                                            name: '单元',
                                            key: 'unit_id',
                                            tendency: true
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    name: '代理',
                    key: 'belong',
                    tendency: true,
                    child: {
                        name: '广告主',
                        key: 'user_id',
                        tendency: true,
                        child: [
                            {
                                name: '单元',
                                key: 'unit_id',
                                tendency: true
                            }
                        ]
                    }
                }
            ]
        },
        {
            name: '代理商',
            key: 'belong',
            tendency: true,
            child: [
                {
                    name: '广告主',
                    key: 'user_id',
                    tendency: true,
                    child: [
                        {
                            name: '单元',
                            key: 'unit_id',
                            tendency: true
                        }
                    ]
                },
                {
                    name: '行业',
                    key: 'category',
                    tendency: true,
                    child: {
                        name: '代理',
                        key: 'belong',
                        tendency: true,
                        child: [
                            {
                                name: '广告主',
                                key: 'user_id',
                                tendency: true,
                                child: [
                                    {
                                        name: '单元',
                                        key: 'unit_id',
                                        tendency: true
                                    }
                                ]
                            }
                        ]
                    }
                },
                {
                    name: '栏位类型',
                    key: 'adslot_type',
                    tendency: true,
                    child: {
                        name: '代理',
                        key: 'belong',
                        tendency: true,
                        child: [
                            {
                                name: '广告主',
                                key: 'user_id',
                                tendency: true,
                                child: [
                                    {
                                        name: '单元',
                                        key: 'unit_id',
                                        tendency: true
                                    }
                                ]
                            }
                        ]
                    }
                }
            ]
        }
    ])
    var obj = {}
    var result = typeArr.reduce(function (item, next) {
        obj[next.key] ? '' : obj[next.key] = true && item.push(next)
        return item
    }, [])
    return result
}
````

###### 数字单位格式化
````js
/**
 * 数字单位格式化
 * @_number: 需要格式化的数字
 * @type?: 单位语言类型，支持中英文
 */
function formatterNumberUnit (_number, type = 'zh') {
    let number = Math.abs(_number)
    let result
    if (number >= 100000000) {
      const res = this.thousandsFormateTofixed(number / 100000000, 2, false)
      if (type === 'zh') {
        result = res + '亿'
      } else {
        result = res / 10 + 'B'
      }
    } else if (100000000 > number && number >= 10000) {
      result = this.thousandsFormateTofixed(number / 10000, 2, false) + `${type === 'zh' ? '万' : 'W'}`
    } else if (10000 > number && number >= 1000) {
      result = this.thousandsFormateTofixed(number, 0, false)
    } else {
      result = number
    }
    return _number > 0 ? result : '-' + result
}
````

###### 获取对象长度
````js
/**
 * 获取对象长度
 * @param obj
 * @returns {number}
 */
function getObjectLength (obj) {
    var count = 0
    for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
            count++
        }
    }
    return count
}
````

###### HTML实体编码转换
````js
/**
 * HTML实体编码转换
 * @param string
 * @returns {string}
 */
function escapeHtml(string) {
    var entityMap = {
        "&": "&amp;",
        "<": "&#60;",
        ">": "&#62;",
        '"': '&#34;',
        "'": '&#39;',
        "/": '&#x2F;',
        " ": '&#160;'
    };
    return String(string).replace(/[&<>"'\/ ]/g, function (s) {
        return entityMap[s]
    })
}
````
