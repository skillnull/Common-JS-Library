export function checkEmail (val) { // 验证邮箱
    val = trimSpace(val)
    let reg = new RegExp('^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$')
    if (reg.test(val)) {
        return val
    } else {
        return false
    }
}

export function checkPhoneNumber (val) { // 验证手机号
    val = trimSpace(val)
    let reg = new RegExp('^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[4-9]{1})|(18[0-9]{1})|(199))+\\d{8})$')
    if (reg.test(val)) {
        return val
    } else {
        return false
    }
}

export function trimSpace (str) { // 去除字符串前后空格
    if (str) {
        return str.replace(/(^\s*)|(\s*$)/g, '')
    } else {
        return str
    }
}

export function preloadImg (srcArr) { // 图片的预加载
    if (srcArr instanceof Array) {
        for (var i = 0; i < srcArr.length; i++) {
            var oImg = new Image()
            oImg.src = srcArr[i]
        }
    }
}

export function verifyPassword (str) { // 验证密码，密码为6-12位字母数字或符号最少两种组合,特殊符号为 ~!@#$%^&*.,
    str = trimSpace(str)
    let RegExp = /((?=.*[a-z])(?=.*\d)|(?=.*[a-z])(?=.*[~!@#$%^&*.,])|(?=.*\d)(?=.*[~!@#$%^&*.,]))[a-z\d~!@#$%^&*.,]{6,12}/i
    return RegExp.test(str)
}
