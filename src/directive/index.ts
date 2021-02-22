/*
 * @Description:自定义指令
 * @Autor: xiukun@herry
 * @Date: 2021-02-07 17:48:22
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-02-07 17:52:23
 */
import { App, nextTick } from 'vue'
import router from '@/router/index'
import { format, unformat } from '@/utils/tools'
export default (app: App<Element>): void => {
    // 是否有权访问功能
    app.directive('action', {
        mounted(el, binding) {
            const value: Array<string> =
				typeof binding.value === 'string'
				    ? [binding.value]
				    : binding.value
            const arg: string =
				typeof binding.arg === 'string' ? binding.arg : 'or'
            const currentRoute = router.currentRoute.value
            const roles: Array<string> = currentRoute.meta.permission || []
            const isShow =
				arg === 'and'
				    ? value.every((v) => roles.includes(v))
				    : value.some((v) => roles.includes(v))
            if (!isShow) {
                el.parentNode && el.parentNode.removeChild(el)
            }
        }
    })
    // 金额格式化
    app.directive('format', {
        mounted(el, binding) {
            const { arg, value } = binding
            if (arg === 'money') {
                const elem = el.firstElementChild
                nextTick(() => (elem.value = format(elem.value)))
                elem.addEventListener(
                    'focus',
                    (event: MouseEvent) => {
                        if (!event.target) return
                        const target = event.target as HTMLInputElement
                        target.value = String(unformat(target.value))
                        value[0][value[1]] = target.value
                    },
                    true
                )
                elem.addEventListener(
                    'blur',
                    (event: MouseEvent) => {
                        if (!event.target) return
                        const target = event.target as HTMLInputElement
                        const val = unformat(format(target.value))
                        value[0][value[1]] = val === '' ? 0 : val
                        nextTick(() => (target.value = format(val)))
                    },
                    true
                )
            }
        }
    })
}
