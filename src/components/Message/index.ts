/*
 * @Description: ELMessage封装 每次只显示最新一条消息，避免出现太多消息提示导致不美观
 * @Autor: xiukun@herry
 * @Date: 2021-02-24 10:22:54
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-02-24 12:32:37
 */

import { ElMessage } from 'element-plus'
import { MessageParams, TypeVal } from './types'
let messagInstance: any | null = null

const resetMessage = (options: MessageParams) => {
    // message实例对象存在，则关闭
    if (messagInstance) {
        messagInstance.close()
    }
    messagInstance = ElMessage(options)
}

const typeData: Array<TypeVal> = ['error', 'success', 'info', 'warning']

typeData.forEach((type: TypeVal) => {
    resetMessage[type] = (options: MessageParams) => {
        if (typeof options === 'string') {
            options = {
                message: options
            }
        }
        options.type = type
        return resetMessage(options)
    }
})

export const Message = resetMessage as any
