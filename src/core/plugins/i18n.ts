/*
 * @Description:
 * @Autor: xiukun@herry
 * @Date: 2021-03-01 15:04:49
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-03-02 11:11:49
 */
import { App } from 'vue';
import { createI18n } from 'vue-i18n';
import ElementLocale from 'element-plus/lib/locale';
import { config } from '@/config/lang';
import db from '@/utils/db';
import messages from '@/lang';

let langPackage = db.get('language') || 'zh-cn';
const i18n = createI18n({
    legacy: false,
    locale: langPackage,
    fallbackLocale: config.zhCnLocale,
    messages
});

export function setupI18n(app: App<Element>): void {
    ElementLocale.i18n(i18n.global.t);
    app.use(i18n);
}

export default i18n;
