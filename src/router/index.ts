/*
 * @Description:
 * @Autor: xiukun@herry
 * @Date: 2021-02-02 18:20:45
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-02-25 17:57:59
 */
import { h } from 'vue';
import {
    createRouter,
    // createWebHistory,
    createWebHashHistory,
    RouteRecordRaw
} from 'vue-router';
const ParentView = { render: () => h('router-view') };
const components = {
    Layout: () => import('@/layout/index.vue'),
    Redirect: () => import('@/layout/redirect.vue'),
    Workplace: () => import('@/views/dashboard/workplace.vue'),
    404: () => import('@/views/404.vue'),
    Home: () => import('@/views/index.vue'),
    Login: () => import('@/views/login-register.vue'),

    Message: () => import('@/views/package/message/index.vue'),
    Preview: () => import('@/views/package/preview/index.vue'),
    FormSearchPath: () => import('@/views/package/formSearchDemo/index.vue'),

    Iframe: () => import('@/layout/iframe/layout.vue')
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
                meta: { title: '工作台' }
            }
        ]
    },
    {
        name: 'Package',
        path: '/Package',
        component: components['Layout'],
        redirect: '/package/preview',
        meta: { title: '封装组件', icon: 'el-icon-menu' },
        children: [
            {
                name: 'Message',
                path: '/package/message',
                component: components['Message'],
                meta: { title: '消息' }
            },
            {
                name: 'Preview',
                path: '/package/preview',
                component: components['Preview'],
                meta: { title: '预览图片' }
            },
            {
                name: 'FormSearchPath',
                path: '/package/formSearchDemo',
                component: components['FormSearchPath'],
                meta: { title: 'Form查询' }
            }
        ]
    },
    {
        name: 'Iframe',
        path: '/iframe',
        component: components['Layout'],
        meta: { title: 'iframe案例', icon: 'international' },
        children: [
            {
                name: 'FrontStandard',
                path: '/iframe/front-standard',
                component: import('@/layout/iframe/layout.vue'),
                meta: { title: '前端规范', link: 'https://tgideas.qq.com/doc/index.html' }
            },
            {
                name: 'Es6',
                path: '/iframe/es6',
                component: import('@/layout/iframe/layout.vue'),
                meta: { title: 'es6编程风格', link: 'https://es6.ruanyifeng.com/#docs/module' }
            },
            {
                name: 'Prettier',
                path: '/iframe/prettier',
                component: import('@/layout/iframe/layout.vue'),
                meta: { title: 'Prettier代码美化工具', link: 'https://prettier.io/' }
            },
            {
                name: 'Tailwindcss',
                path: '/iframe/tailwindcss',
                component: import('@/layout/iframe/layout.vue'),
                meta: { title: 'tailwindcss框架', link: 'https://www.tailwindcss.cn/' }
            },
            {
                name: 'Juejin',
                path: '/iframe/juejin',
                component: import('@/layout/iframe/layout.vue'),
                meta: { title: '掘金', link: 'https://juejin.cn/' }
            }
        ]
    },
    {
        name: 'Redirect',
        path: '/redirect/:pathMatch(.*)*',
        meta: {
            title: '重定向页面',
            icon: '',
            permission: [],
            hidden: true
        },

        component: components.Redirect
    },
    {
        path: '/login',
        name: 'login',
        component: components.Login,
        meta: { title: '登录', hidden: true }
    },
    {
        path: '/404',
        name: '404',
        component: components['404'],
        meta: { title: '404' }
    },
    {
        path: '/:catchAll(.*)',
        redirect: '/404',
        component: ParentView
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes: allowRouter
});

export default router;
