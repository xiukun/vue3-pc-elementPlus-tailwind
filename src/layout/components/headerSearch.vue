<!--
 * @Description: 菜单模糊搜索
 * @Autor: xiukun@herry
 * @Date: 2021-02-22 09:35:16
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-02-23 18:34:06
-->
<template>
    <div :class="{'show':show}" class="header-search">
        <i class="el-icon-search search-icon" @click.stop="click"></i>
        <el-select ref="headerSearchSelect" v-model="search" :remote-method="querySearch" filterable default-first-option remote placeholder="搜索菜单" class="header-search-select" @change="change">
            <el-option v-for="option in options.data" :key="option.item.path" :value="option.item" :label="option.item.title.join(' > ')" />
        </el-select>
    </div>
</template>

<script lang="ts">
import {
    computed,
    defineComponent,
    ref,
    unref,
    reactive,
    watch,
    onMounted,
    nextTick,
    watchEffect
} from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '@/store/index';
// fuse.js是轻量级的模糊搜索插件
import Fuse from 'fuse.js';
import path from 'path';

const ishttp = (url: string) => {
    return url.indexOf('http://') !== -1 || url.indexOf('https://') !== -1;
};

// 初始化Fuse对象
let fuse: any = undefined;
const initFuse = (list: readonly unknown[]) => {
    fuse = new Fuse(list, {
        shouldSort: true,
        threshold: 0.4,
        location: 0,
        distance: 100,
        minMatchCharLength: 1,
        keys: [
            {
                name: 'title',
                weight: 0.7
            },
            {
                name: 'path',
                weight: 0.3
            }
        ]
    });
};

// 生成一维扁平化路由数组，方便使用fuse进行筛选
const generateRoutes = (routes: any, basePath: string = '/', prefixTitle: Array<string> = []) => {
    let res = [];
    /**
     * 遍历所有路由，并进行扁平化处理
     */
    for (const router of routes) {
        // 如果为隐藏的菜单项，跳过循环
        if (router.hidden) {
            continue;
        }
        // 为每个路由创建一个简单的对象
        const data = {
            path: !ishttp(router.path) ? path.resolve(basePath, router.path) : router.path,
            title: [...prefixTitle]
        };

        if (router.meta && router.meta.title) {
            // 如果存在菜单标题，则添加菜单标题
            data.title = [...data.title, router.meta.title];

            if (router.redirect !== 'noRedirect') {
                // 如果不为父级菜单（重定向菜单），则添加菜单项
                res.push(data);
            }
        }

        // 如果含有子菜单，则继续递归遍历
        if (router.children) {
            const tempRoutes: any[] = generateRoutes(router.children, data.path, data.title);
            if (tempRoutes.length >= 1) {
                // 如果子菜单数量不为0，则添加所有子菜单项
                // res = [...res, ...tempRoutes];
                res.push(...tempRoutes);
            }
        }
    }
    return res;
};

export default defineComponent({
    name: 'HeaderSearch',
    setup() {
        const router = useRouter();
        const store = useStore();
        const { menubar } = store.state.layout;
        const headerSearchSelect = ref<HTMLElement | null>(null);
        let options = reactive({
            data: []
        });
        let search = ref<string>('');
        let show = ref<boolean>(false);
        let searchPool: readonly unknown[] = [];
        let routes = computed(() => menubar.menuList.filter((v) => v.meta && !v.meta.hidden));

        watchEffect(() => {
            searchPool = generateRoutes(routes.value);
            initFuse(searchPool);
        });
        watch(
            () => show.value,
            (value) => {
                if (value) {
                    document.body.addEventListener('click', close);
                } else {
                    document.body.removeEventListener('click', close);
                }
            }
        );

        onMounted(() => (searchPool = generateRoutes(routes.value)));

        let change = (val: { path: any; title: any[] }) => {
            if (ishttp(val.path)) {
                // http(s):// 路径新窗口打开
                window.open(val.path, '_blank');
            } else {
                router.push(val.path);
            }
            search.value = '';
            options.data = [];
            nextTick(() => {
                show.value = false;
            });
        };

        let querySearch = (query: string) => {
            if (query !== '') {
                let fData = fuse.search(query);
                options.data = fData;
            } else {
                options.data = [];
            }
        };

        const click = () => {
            show.value = !show.value;
            if (show.value) {
                let refObj = unref(headerSearchSelect) as any;
                refObj && refObj.focus();
            }
        };
        const close = () => {
            let refObj = unref(headerSearchSelect) as any;
            refObj && refObj.blur();
            options.data = [];
            show.value = false;
        };
        return {
            headerSearchSelect,
            search,
            options,
            searchPool,
            show,
            change,
            querySearch,
            click,
            close
        };
    }
});
</script>

<style lang="scss" scoped>
.header-search {
    font-size: 0 !important;

    .search-icon {
        cursor: pointer;
        font-size: 18px;
        font-weight: bold;
        vertical-align: middle;
        color: #6f7374;
    }

    .header-search-select {
        font-size: 18px;
        transition: width 0.2s;
        width: 0;
        overflow: hidden;
        background: transparent;
        border-radius: 0;
        display: inline-block;
        vertical-align: middle;

        ::v-deep .el-input__inner {
            border-radius: 0;
            border: 0;
            padding-left: 0;
            padding-right: 0;
            box-shadow: none !important;
            border-bottom: 1px solid #d9d9d9;
            vertical-align: middle;
        }
    }

    &.show {
        .header-search-select {
            width: 210px;
            margin-left: 10px;
        }
    }
}
</style>
