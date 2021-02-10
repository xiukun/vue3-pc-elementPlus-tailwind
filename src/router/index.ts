/*
 * @Description:
 * @Autor: xiukun@herry
 * @Date: 2021-02-02 18:20:45
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-02-10 12:38:57
 */
import { h } from 'vue';
import {
	createRouter,
	createWebHistory,
	createWebHashHistory,
	RouteRecordRaw,
} from 'vue-router';
const ParentView = { render: () => h('router-view') };
const components = {
	Layout: () => import('@/layout/index.vue'),
	Redirect: () => import('@/layout/redirect.vue'),
	Workplace: () => import('@/views/dashboard/workplace.vue'),
	404: () => import('@/views/404.vue'),
	Home: () => import('@/views/index.vue'),
	Login: () => import('@/views/login-register.vue'),
};

export const allowRouter: Array<RouteRecordRaw> = [
	{
		name: 'Dashboard',
		path: '/',
		component: components['Layout'],
		redirect: '/dashboard/workplace',
		meta: { title: '仪表盘', icon: 'el-icon-eleme' },
		children: [
			{
				name: 'Workplace',
				path: '/dashboard/workplace',
				component: components['Workplace'],
				meta: { title: '工作台', icon: 'el-icon-s-tools' },
			},
		],
	},
	{
		name: 'Redirect',
		path: '/redirect/:pathMatch(.*)*',
		meta: {
			title: '重定向页面',
			icon: '',
			permission: [],
			hidden: true,
		},

		component: components.Redirect,
	},
	{
		path: '/login',
		name: 'login',
		component: components.Login,
		meta: { title: '登录', hidden: true },
	},
	{
		path: '/404',
		name: '404',
		component: components['404'],
		meta: { title: '404' },
	},
	{
		path: '/:catchAll(.*)',
		redirect: '/404',
		component: ParentView,
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes: allowRouter,
});

export default router;
