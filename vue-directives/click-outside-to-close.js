/**
 * @function 点击当前区块元素外部关闭当前区块元素
 * @type {{bind(*, *, *): void, update(), unbind(*, *): void}}
 * @example
 *  <template>
 *      <div class="box" v-if="flag">
 *          <div v-clickOutsideToClose="hideBox">点击我的外部可以关闭box</div>
 *      </div>
 *  </template>
 *  import {clickOutsideToClose} from '@/Common-JS-Library/encryption-and-decryption/click-outside-to-close.js'
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
        el.__vueClickOutsideClose__ = documentHandler
        document.addEventListener('click', documentHandler)
    },
    update () {
    },
    unbind (el, binding) { // 解除事件监听
        document.removeEventListener('click', el.__vueClickOutsideClose__)
        delete el.__vueClickOutsideClose__
    }
}

