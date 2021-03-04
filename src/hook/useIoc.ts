/*
 * @Description: 依赖注入 provide  inject
 * @Autor: xiukun@herry
 * @Date: 2021-03-04 09:47:46
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-03-04 12:27:18
 */
import { provide, reactive, readonly, inject, toRefs, ToRefs, Ref } from 'vue';
import { LanguageType, SizeType } from '@/type';
import db from '@/utils/db';

export interface Setting {
    size?: SizeType;
    language?: LanguageType;
}

export const sett: Setting = {
    language: 'zh-cn',
    size: 'small'
};

type ToRefSetting = ToRefs<Setting>;

type SettingProps = keyof Setting;

type Update = (property: SettingProps, value: any) => void;

const ConfigStateSymbol = Symbol('Config state provide unique');
const ConfigUpdateSymbol = Symbol('Config update provide unique');

export function useProvide() {
    const state: Setting = reactive({
        language: db.get('language') || sett.language,
        size: db.get('size') || sett.size
    });

    provide<ToRefSetting>(ConfigStateSymbol, toRefs(readonly(state)));

    const update: Update = (property: SettingProps, value: any) => {
        state[property] = value;
        db.set(property, value);
    };

    provide<Update>(ConfigUpdateSymbol, update);
}

export function useInject() {
    const { language, size } = inject<ToRefSetting>(ConfigStateSymbol) as ToRefSetting;
    const u = inject<Update>(ConfigUpdateSymbol) as Update;

    return {
        language: language as Ref<LanguageType>,
        size: size as Ref<SizeType>,
        u
    };
}
