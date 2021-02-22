/*
 * @Description:
 * @Autor: xiukun@herry
 * @Date: 2021-02-07 18:15:06
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-02-08 15:36:21
 */

import { listToTree } from '@/utils/listToTree'
import { store } from '@/store/index'
import { RouteRecordRaw } from 'vue-router'
const components = {
    Layout: () => import('@/layout/index.vue'),
    NotFound: () => import('@/views/404.vue')
    // Workplace: () => import('@/views/Dashboard/Workplace.vue'),
    // ProjectList: () => import('@/views/Project/ProjectList.vue'),
    // ProjectDetail: () => import('@/views/Project/ProjectDetail.vue'),
    // ProjectImport: () => import('@/views/Project/ProjectImport.vue'),
    // SecondNav: () => import('@/views/Nav/SecondNav/Index.vue'),
    // ThirdNav: () => import('@/views/Nav/SecondNav/ThirdNav/Index.vue'),
    // SecondText: () => import('@/views/Nav/SecondText/Index.vue'),
    // ThirdText: () => import('@/views/Nav/SecondText/ThirdText/Index.vue'),
    // OpenWindowTest: () => import('@/views/Components/OpenWindowTest.vue'),
    // CardListTest: () => import('@/views/Components/CardListTest.vue'),
    // TableSearchTest: () => import('@/views/Components/TableSearchTest.vue'),
    // ListTest: () => import('@/views/Components/ListTest.vue'),
    // Directive: () => import('@/views/Permission/Directive.vue'),
}

const asyncRouter: Array<RouteRecordRaw> = [
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: components['NotFound'],
        meta: {
            title: 'NotFound',
            icon: '',
            hidden: true
        },
        redirect: {
            name: '404'
        }
    }
]

export const generatorDynamicRouter = (data: Array<RouteRecordRaw>): void => {
    const routerList: Array<RouteRecordRaw> = listToTree(data, 0)
    asyncRouter.forEach((v) => routerList.push(v))
    const f = (data: Array<RouteRecordRaw>, pData: RouteRecordRaw | null) => {
        for (let i = 0, len = data.length; i < len; i++) {
            const v: RouteRecordRaw = data[i]
            if (typeof v.component === 'string')
                v.component = components[v.component]
            // v.component = components[v.component] || (() => import(`../view${path}.vue`))
            // v.component = () => import(`../view${data[i].path}.vue`)
            if (
                (v.meta && !v.meta.permission) ||
				(pData && v.meta && v.meta.permission.length === 0)
            ) {
                v.meta.permission =
					pData && pData.meta && pData.meta.permission
					    ? pData.meta.permission
					    : []
            }
            if (v.children && v.children.length > 0) {
                f(v.children, v)
            }
        }
    }
    f(routerList, null)
    store.commit('layout/setRoutes', routerList)
}
