###### 点击当前区块元素外部关闭当前区块元素
````js
/**
 * @function 点击当前区块元素外部关闭当前区块元素
 * @example
 *  <template>
 *      <div class="box" v-if="flag">
 *          <div v-clickOutsideToClose="hideBox">点击我的外部可以关闭box</div>
 *      </div>
 *  </template>
 *  import {clickOutsideToClose} from '@/Common-JS-Library/vue-directives/click-outside-to-close.js'
 *  export default {
 *      data () {
 *          return {
 *              flag: false
 *          }
 *      },
 *      directives: {clickOutsideToClose},
 *      methods: {
 *          hideBox() {
 *              this.flag = false
 *          }
 *      }
 *  }
 */
export const clickOutsideToClose = {
    // 只调用一次，指令第一次绑定到元素时调用
    bind (el, binding, vnode) {
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
        el.__vueClickOutsideClose__ = documentHandler
        document.addEventListener('click', documentHandler)
    },
    // 被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
    inserted () {

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
        document.removeEventListener('click', el.__vueClickOutsideClose__)
        delete el.__vueClickOutsideClose__
    }
}
````
