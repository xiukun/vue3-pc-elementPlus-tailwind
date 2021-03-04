/*
 * @Description: axios封装
 * @Autor: xiukun@herry
 * @Date: 2021-02-07 10:15:30
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-03-01 14:08:48
 */
import axios from 'axios';
import { ElLoading, ElNotification } from 'element-plus';
import { getToken } from '@/utils/auth';

let loading: { close(): void };
let logoutState = false; // 判断登录token失效时的参数

// 创建 axios 实例
const instance = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL, // API 请求的默认前缀
    timeout: 20000 // 超时时间
});

const errorHandler = (error: { message: string }) => {
    loading.close();
    console.log(`err${error}`);
    ElNotification({
        title: '请求失败',
        message: error.message,
        type: 'error'
    });
    return Promise.reject(error);
};

// 请求拦截
instance.interceptors.request.use((config) => {
    loading = ElLoading.service({
        lock: true,
        text: '加载中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.2)'
    });
    const token = getToken;
    if (token) {
        config.headers['Access-Token'] = token;
    }
    return config;
}, errorHandler);

instance.interceptors.response.use((response) => {
    const { data } = response;
    if (data && data.code !== 200) {
        let title = '请求失败';
        if (data.code === 401) {
            title = '身份认证失败';
            if (!logoutState) {
                logoutState = true;
                ElNotification({
                    title,
                    message: '您的身份认证信息已过期，请点击确定重新登录！',
                    type: 'error'
                });
                setTimeout(() => {
                    logoutState = false;
                }, 1000);
            }
        } else if (data.code > 0) {
            if (data.message) {
                ElNotification({
                    title,
                    message: data.message,
                    type: 'error'
                });
            } else {
                console.log(data);
            }
        }
        loading.close();
        return Promise.reject(new Error(data.message || 'Error'));
    }

    loading.close();
    return response;
}, errorHandler);

/**
 *
 * @param url api url
 * @param method get, post两种请求方式
 * @param params 传参
 */
const request = function(url: string, method: any, params = {}) {
    console.log(method, params);
    // 首先判断是get请求还是post请求
    const data = method.toLocaleLowerCase() === 'get' ? 'params' : 'data';
    return instance({
        method,
        url,
        [data]: params
    })
        .then((res) => {
            return Promise.resolve(res.data);
        })
        .catch((err) => {
            return Promise.reject(err);
        });
};
const http = instance;
export { request, http };
