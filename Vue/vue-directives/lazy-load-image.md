###### 使用交叉观察器(intersectionObserver)进行图片懒加载
````js
/**
 * @function 使用交叉观察器(intersectionObserver)进行图片懒加载
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver
 * @description 使用这个API需要注意一下兼容性问题，具体兼容性看上面的链接，或者看https://www.caniuse.com/#search=intersectionObserver
 * @example
 *  <template>
 *      <img v-layzLoadImg="require('../../assets/images/skillnull.png')">
 *  </template>
 *  import {layzLoadImg} from '@/Common-JS-Library/vue-directives/layzLoadImg.js'
 *  export default {
 *      directives: {clickOutsideToClose}
 *  }
 */
export const layzLoadImg = {
    // 只调用一次，指令第一次绑定到元素时调用
    bind (el, binding, vnode) {

    },
    // 被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
    inserted (el, binding, vnode) {
        let io = new IntersectionObserver((entries) => {
            entries.forEach((item) => {
                if (item.isIntersecting) {
                    item.target.src = binding.value // 替换src
                    io.unobserve(item.target) // 停止观察当前元素 避免不可见时候再次调用callback函数
                }
            })
        }, {
            root: null,
            threshold: [0, 0.5, 1]
        })
        io.observe(el)
    },
    // 所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。
    // 指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新
    update () {

    },
    // 指令所在组件的 VNode 及其子 VNode 全部更新后调用。
    componentUpdated () {

    },
    // 只调用一次，指令与元素解绑时调用。
    unbind (el, binding) {

    }
}
````