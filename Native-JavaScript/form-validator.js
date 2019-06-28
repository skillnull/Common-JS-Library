// 验证邮箱
export function checkEmail (val) {
    val = trimSpace(val)
    let reg = new RegExp('^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$')
    if (reg.test(val)) {
        return val
    } else {
        return false
    }
}

// 验证手机号
export function checkPhoneNumber (val) {
    val = trimSpace(val)
    let reg = new RegExp('^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[4-9]{1})|(18[0-9]{1})|(199))+\\d{8})$')
    if (reg.test(val)) {
        return val
    } else {
        return false
    }
}

// 去除字符串前后空格
export function trimSpace (str) {
    if (str) {
        return str.replace(/(^\s*)|(\s*$)/g, '')
    } else {
        return str
    }
}

// 去除字符串所有空格
export function trimAllSpace (str) {
    if (str) {
        return str.replace(/\s+/g, "")
    } else {
        return str
    }
}

// 图片的预加载
export function preloadImg (srcArr) {
    if (srcArr instanceof Array) {
        for (var i = 0; i < srcArr.length; i++) {
            var oImg = new Image()
            oImg.src = srcArr[i]
        }
    }
}

// 验证密码，密码为6-12位字母数字或符号最少两种组合,特殊符号为 ~!@#$%^&*.,
export function verifyPassword (str) {
    str = trimSpace(str)
    let RegExp = /((?=.*[a-z])(?=.*\d)|(?=.*[a-z])(?=.*[~!@#$%^&*.,])|(?=.*\d)(?=.*[~!@#$%^&*.,]))[a-z\d~!@#$%^&*.,]{6,12}/i
    return RegExp.test(str)
}

// 仅允许输入正整数
export function positiveInteger (_this) {
    if (_this.value.length === 1) {
        _this.value = _this.value.replace(/[^1-9]/g, '')
    } else {
        _this.value = _this.value.replace(/\D/g, '')
    }
}

// 仅允许输入负整数
export function negativeInteger (_this) {
    if (_this.value.length === 1) {
        _this.value = _this.value.replace(/[^\-]/g, '-')
    } else {
        _this.value = _this.value.replace(/[^\d-]/g, '')
    }
}