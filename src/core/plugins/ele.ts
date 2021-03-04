/*
 * @Description: 引用element plus
 * @Autor: xiukun@herry
 * @Date: 2021-02-05 10:28:04
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-03-03 17:31:04
 */
import { App } from 'vue';
import ElementPlus, { locale } from 'element-plus';
import enLocale from 'element-plus/lib/locale/lang/en';
import zhLocale from 'element-plus/lib/locale/lang/zh-cn';
import db from '@/utils/db';
// import 'element-plus/lib/theme-chalk/index.css';
let langPackage = db.get('language') || 'zh-cn';
export default function(app: App<Element>): void {
    // 完整引入
    app.use(ElementPlus, { size: 'small', zIndex: 3000 });
    if (langPackage === 'en') {
        locale(enLocale);
    } else {
        locale(zhLocale);
    }
}
