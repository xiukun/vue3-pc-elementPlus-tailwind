/*
 * @Description: 引用element plus
 * @Autor: xiukun@herry
 * @Date: 2021-02-05 10:28:04
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-02-24 18:09:12
 */
import { App } from 'vue'
import ElementPlus from 'element-plus'
import 'dayjs/locale/zh-cn'
import locale from 'element-plus/lib/locale/lang/zh-cn'
// import 'element-plus/lib/theme-chalk/index.css';
export default function(app: App<Element>): void {
    // 完整引入
    app.use(ElementPlus, { size: 'small', zIndex: 3000, locale })
}
