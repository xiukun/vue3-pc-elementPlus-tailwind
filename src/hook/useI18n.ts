/*
 * @Description:
 * @Autor: xiukun@herry
 * @Date: 2021-03-02 11:15:15
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-03-02 11:15:40
 */
import { useI18n as baseUseI18n } from 'vue-i18n';

type Message = { [prop: string]: { [prop: string]: string | Record<string, any> } };

export const useI18n = (messages?: Message) => {
    const { t, mergeLocaleMessage, locale } = baseUseI18n();
    if (messages) {
        for (const key in messages) {
            mergeLocaleMessage(key, messages[key]);
        }
    }
    return { t, locale };
};
