/*
 * @Description: 引用element plus
 * @Autor: xiukun@herry
 * @Date: 2021-02-05 10:28:04
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-02-08 17:10:23
 */
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
export default function(app: any) {
	// 完整引入
	app.use(ElementPlus, { size: 'small', zIndex: 3000 });
}
