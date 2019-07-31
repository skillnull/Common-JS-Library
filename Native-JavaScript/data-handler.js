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