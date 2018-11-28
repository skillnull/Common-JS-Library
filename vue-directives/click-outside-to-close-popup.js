export const clickOutsideToClosePopup = { // 点击弹窗外部关闭弹窗
    bind (el, binding, vnode) {  // 初始化指令
        function documentHandler (e) {
            // 这里判断点击的元素是否是本身，是本身，则返回
            if (el.contains(e.target)) {
                return false
            }
            // 判断指令中是否绑定了函数
            if (binding.expression) {
                // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
                binding.value(e)
            }
        }

        // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
        el.__vueClickOutsideClosePopup__ = documentHandler
        document.addEventListener('click', documentHandler)
    },
    update () {
    },
    unbind (el, binding) { // 解除事件监听
        document.removeEventListener('click', el.__vueClickOutsideClosePopup__)
        delete el.__vueClickOutsideClosePopup__
    }
}

