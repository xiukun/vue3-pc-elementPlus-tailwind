/*
 * @Description:
 * @Autor: xiukun@herry
 * @Date: 2021-02-05 17:31:02
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-02-08 15:21:52
 */
const path = require('path');
const isProd = process.env.NODE_ENV === 'production';

function resolve(dir) {
	return path.join(__dirname, dir);
}

module.exports = {
	devServer: {
		port: 9010,
		// 如果您想启用代理，请删除 mockjs /src/main.jsL11
		// proxy: {
		//   '/api': {
		//     target: 'https://mock.ihx.me/mock/5baf3052f7da7e07e04a5116/antd-pro',
		//     ws: false,
		//     changeOrigin: true
		//   }
		// }
	},
	chainWebpack: (config) => {},
	// css: {
	// 	loaderOptions: {
	// 		postcss: {
	// 			plugins: [
	// 				require('autoprefixer'),
	// 				require('tailwindcss'),
	// 				// require('postcss-nested'),
	// 				// require('postcss-simple-vars'),
	// 				// require('postcss-import'),
	// 			],
	// 		},
	// 	},
	// },
};
