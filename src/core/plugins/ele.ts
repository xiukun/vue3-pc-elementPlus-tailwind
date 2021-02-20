/*
 * @Description: 引用element plus
 * @Autor: xiukun@herry
 * @Date: 2021-02-05 10:28:04
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-02-20 16:56:50
 */
import { App } from 'vue';
import ElementPlus from 'element-plus';
// import 'element-plus/lib/theme-chalk/index.css';
import '@/assets/styles/element-theme.scss'; // UI自定义色调
export default function(app: App<Element>): void {
	// 完整引入
	app.use(ElementPlus, { size: 'small', zIndex: 3000 });
}
