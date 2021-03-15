/*
 * @Description:
 * @Autor: xiukun@herry
 * @Date: 2021-02-02 18:20:45
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-03-15 17:58:28
 */
import { createApp } from 'vue';
import '@/permission';
import dayjs from 'dayjs';
import ele from './core/plugins/ele'; // element plus
import { http } from './core/ajax'; // axios interceptors
import db from './utils/db'; // localStorage
import App from './App.vue';
import direct from '@/directive';
import router from './router';
import { store } from './store';
import '@/mock/index';

// 区局注册组件
import OpenDialog from './components/OpenDialog/index.vue';
import ComTable from './components/Table/index.vue';

import '@/assets/styles/index.scss';

// 对vue进行类型补充说明
/* eslint-disable */
// declare module '@vue/runtime-core' {
// 	interface ComponentCustomProperties {
// 		$test: unknown; // 这里可以用$test具体的类型代替any
// 		$http: unknown; // axios操作
// 		$db: unknown; // localStorage操作
// 	}
// }

const app = createApp(App);
direct(app);
app.component('ComDialog', OpenDialog); // 全局注册
app.component('ComTable', ComTable); // 全局注册
//全局变量
app.use(function(vue) {
    vue.config.globalProperties.$test = { test: 'test' }; // 测试
    vue.config.globalProperties.$http = http; // axios操作
    vue.config.globalProperties.$db = db; // localStorage操作
    vue.config.globalProperties.$dayjs = dayjs;
});
ele(app); //引入element plus
app.use(store)
    .use(router)
    .mount('#app');
