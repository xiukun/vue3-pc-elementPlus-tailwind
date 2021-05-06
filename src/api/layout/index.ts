/*
 * @Description:
 * @Autor: xiukun@herry
 * @Date: 2021-02-07 17:41:06
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-03-11 12:15:42
 */
import { http } from '@/core/ajax'
import { AxiosPromise } from 'axios'
import { store } from '@/store/index'
const api = {
    login: '/login',
    getUser: '/getUser',
    getRouterList: '/getRoute'
}

export interface loginParam {
    username: string;
    password: string;
}
export function login(param: loginParam): AxiosPromise {
    return http({
        url: api.login,
        method: 'post',
        data: param
    })
}
export function getUser(): AxiosPromise {
    return http({
        url: api.getUser,
        method: 'get',
        data: { token: store.state.layout.token }
    })
}
export function getRouterList(): AxiosPromise {
    return http({
        url: api.getRouterList,
        method: 'get',
        data: { token: store.state.layout.token }
    })
}
