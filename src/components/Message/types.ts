/*
 * @Description:
 * @Autor: xiukun@herry
 * @Date: 2021-02-24 12:21:03
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-02-24 12:26:28
 */

import { VNode } from 'vue'

declare type IMessageOptions = {
    customClass?: string;
    center?: boolean;
    dangerouslyUseHTMLString?: boolean;
    duration?: number;
    iconClass?: string;
    id?: string;
    message?: string | VNode;
    offset?: number;
    onClose?: () => void;
    showClose?: boolean;
    type?: TypeVal;
    zIndex?: number;
};

export declare type TypeVal = '' | 'success' | 'warning' | 'info' | 'error';

export declare type MessageParams = IMessageOptions | string;
