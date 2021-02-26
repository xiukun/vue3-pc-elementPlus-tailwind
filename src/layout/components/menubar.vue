<!--
 * @Description: 
 * @Autor: xiukun@herry
 * @Date: 2021-02-08 09:35:16
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-02-26 15:03:29
-->
<template>
    <el-scrollbar wrap-class='scrollbar-wrapper'>
        <el-menu :default-active='activeMenu' :collapse='menubar.status === 1 || menubar.status === 3' class='el-menu-vertical-demo' :class='{ 
                "w-64": menubar.status === 0 || menubar.status === 2, 
                "w-0": menubar.status === 3, 
                "w-16": menubar.status === 1, 
            }' :collapse-transition='false' :unique-opened='true' @select='onOpenChange'>
            <menubar-item v-for='v in menuList' :key='v.path' :index='v.path' :menu-list='v' />
        </el-menu>
    </el-scrollbar>
</template>

<script lang='ts'>
import { defineComponent, computed } from 'vue';
import MenubarItem from '@/layout/components/menubarItem.vue';
import { useStore } from '@/store/index';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
    name: 'LayoutMenubar',
    components: {
        MenubarItem
    },
    setup() {
        const store = useStore();
        const route = useRoute();
        const router = useRouter();
        const { menubar } = store.state.layout;
        const menuList = menubar.menuList.filter((v) => v.meta && !v.meta.hidden);

        const activeMenu = computed(() => {
            if (route.meta.activeMenu) return route.meta.activeMenu;
            return route.path;
        });
        const onOpenChange = (d: any) => router.push({ path: d });
        return {
            menubar,
            menuList,
            activeMenu,
            onOpenChange
        };
    }
});
</script>

<style lang="scss" scoped>
::v-deep [class^='my-ico-'],
[class*=' my-ico-'] .iconfont {
    font-family: 'iconfont' !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    vertical-align: middle;
    margin-right: 5px;
    width: 24px;
    text-align: center;
}
</style>