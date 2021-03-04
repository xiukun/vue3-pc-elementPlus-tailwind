/*
 * @Description:
 * @Autor: xiukun@herry
 * @Date: 2021-03-01 14:41:01
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-03-01 15:11:02
 */
import { config } from '@/config/lang';
import elementEnLocale from 'element-plus/lib/locale/lang/en';
import elementZhLocale from 'element-plus/lib/locale/lang/zh-cn';
import enLocale from './en';
import zhLocale from './zh';

// 定义您自己的字典，但是请不要和 `el` 重复，这样会导致 ElementPlus 内部组件的翻译失效.
export default {
    [config.enLocale]: {
        el: elementEnLocale.el,
        ...enLocale
    },
    [config.zhCnLocale]: {
        el: elementZhLocale.el,
        ...zhLocale
    }
};
