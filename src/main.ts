/*
 * @Description:
 * @Autor: xiukun@herry
 * @Date: 2021-02-02 18:20:45
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-02-20 17:09:54
 */
import { createApp } from 'vue'
import '@/permission'
import ele from './core/plugins/ele' // element plus
import { http } from './core/ajax' // axios interceptors
import db from './utils/db' // localStorage
import App from './App.vue'
import router from './router'
import { store } from './store'
import '@/mock/index'

import '@/assets/styles/index.scss'

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
//全局变量
app.use(function(vue) {
	vue.config.globalProperties.$test = { test: 'test' }; // 测试
	vue.config.globalProperties.$http = http; // axios操作
	vue.config.globalProperties.$db = db; // localStorage操作
});
ele(app); //引入element plus
app.use(store)
	.use(router)
	.mount('#app');
