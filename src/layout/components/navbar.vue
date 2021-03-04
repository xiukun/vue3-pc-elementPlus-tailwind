<!--
 * @Description: 
 * @Autor: xiukun@herry
 * @Date: 2021-02-08 09:35:16
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-03-04 12:33:17
-->
<template>
    <div class='flex items-center px-4'>
        <span class='text-2xl cursor-pointer' :class='{ "el-icon-s-fold": !menubar.status, "el-icon-s-unfold": menubar.status }' @click='changeCollapsed' />
        <!-- 面包屑导航 -->
        <div class='px-4 hidden-xs-only'>
            <el-breadcrumb separator='/'>
                <el-breadcrumb-item :to='{ path: "/" }'>
                    主页
                </el-breadcrumb-item>
                <el-breadcrumb-item v-for='v in data.breadcrumbList' :key='v.path' :to='v.path'>
                    {{ v.title }}
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
    </div>
    <div class='flex items-center flex-row-reverse px-4 min-width-32'>
        <!-- 用户下拉 -->
        <el-dropdown>
            <span class='el-dropdown-link flex flex-center mx-2'>
                <el-avatar :size='30' src='https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png' />
                <span class='ml-2'>{{ userInfo.name }}</span>
                <i class='el-icon-arrow-down el-icon--right' />
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item>
                        <el-link href='https://github.com/xiukun' target='_blank' :underline='false'>
                            {{t('app.userCenter')}}
                        </el-link>
                    </el-dropdown-item>
                    <el-dropdown-item @click="setting = true">
                        <span>{{t('app.setting')}}</span>
                    </el-dropdown-item>
                    <el-dropdown-item divided @click='logout'>
                        {{t('app.logout')}}
                    </el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
        <!-- 切换语言 -->
        <el-dropdown @command="langCommand" class='el-dropdown-link flex flex-center mx-2'>
            <span class="el-dropdown-link">
                <i class="my-ico-language"></i>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item command="zh-cn" :disabled="language==='zh-cn'">cn 简体中文</el-dropdown-item>
                    <el-dropdown-item command="en" :disabled="language==='en'">en English</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
        <!-- 通知 -->
        <Notice />
        <!-- 头部菜单模糊搜索 -->
        <el-tooltip content="菜单搜索" placement="bottom">
            <Search id="header-search" />
        </el-tooltip>

    </div>
</template>

<script lang='ts'>
import { computed, defineComponent, reactive, watch } from 'vue';

import { useStore } from '@/store/index';
import { useRoute, RouteLocationNormalizedLoaded, useRouter } from 'vue-router';
import { useI18n } from '@/hook/useI18n';
import { useInject } from '@/hook/useIoc';
import Notice from '@/layout/components/notice.vue';
import Search from '@/layout/components/headerSearch.vue';
import db from '@/utils/db';

interface IBreadcrumbList {
    path: string;
    title: string | symbol;
}
// 面包屑导航
const breadcrumb = (route: RouteLocationNormalizedLoaded) => {
    const fn = () => {
        const breadcrumbList: Array<IBreadcrumbList> = [];
        if (route.matched[0] && route.matched[0].name === 'Dashboard') return breadcrumbList;
        route.matched.forEach((v) => {
            const obj: IBreadcrumbList = {
                title: v.meta.title,
                path: v.path
            };
            breadcrumbList.push(obj);
        });
        return breadcrumbList;
    };
    let data = reactive({
        breadcrumbList: fn()
    });
    watch(
        () => route.path,
        () => (data.breadcrumbList = fn())
    );
    return { data };
};

export default defineComponent({
    name: 'LayoutNavbar',
    components: {
        Notice,
        Search
    },
    setup() {
        const store = useStore();
        const router = useRouter();
        const route = useRoute();
        const { locale, t } = useI18n();
        const { language, u } = useInject();
        console.log(language);
        const changeCollapsed = () => store.commit('layout/changeCollapsed');
        const logout = () => store.commit('layout/logout');
        //是否显示主题设置
        const setting = computed({
            get() {
                return store.state.layout.showSettings;
            },
            set(value) {
                store.dispatch('layout/changeSetting', value);
            }
        });
        const langCommand = function (command: string): void {
            locale.value = command;
            u('language', command);

            // router.replace(`/redirect${route.path}`);
            router.go(0);
        };

        return {
            menubar: store.state.layout.menubar,
            userInfo: store.state.layout.userInfo,
            changeCollapsed,
            logout,
            ...breadcrumb(route),
            setting,
            langCommand,
            language,
            t
        };
    }
});
</script>