<!--
 * @Description: 
 * @Autor: xiukun@herry
 * @Date: 2021-02-08 09:35:16
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-03-11 13:56:43
-->
<template>
    <el-scrollbar>
        <router-view v-slot='{ Component }'>
            <transition name='fade-transform' mode='out-in'>
                <keep-alive :include='layout.setting.showTags ? data.cachedViews : []'>
                    <component :is='Component' :key='key' class='page' :class="{ 'm-3': !isLink }" />
                </keep-alive>
            </transition>
        </router-view>
    </el-scrollbar>
</template>

<script lang='ts'>
import { computed, defineComponent, reactive, ref, watch } from 'vue';
import { useRoute, onBeforeRouteUpdate } from 'vue-router';
import { useStore } from '@/store/index';
import { isHttp } from '@/utils/is';

export default defineComponent({
    name: 'LayoutContent',
    setup() {
        const route = useRoute();
        const store = useStore();
        let isLink = ref(false);
        const key = computed(() => route.path);

        let isOutLine = (obj?: any) => {
            let outlink = route.meta.link || null;
            if (obj) {
                outlink = obj.meta.link || null;
            }
            isLink.value = isHttp(outlink);
        };
        isOutLine();

        //监听路由变化 路由钩子异步访问 所以数据要同步使用 async await
        onBeforeRouteUpdate(async (to) => {
            console.log(to, 'onBeforeRouteUpdate');
            await isOutLine(to);
        });
        //vue3不支持监听route监听路由变化
        // watch(
        //     () => route,
        //     () => isOutLine()
        // );

        let data = reactive({
            cachedViews: [...store.state.layout.tags.cachedViews]
        });
        // keep-alive的include重新赋值，解决bug https://github.com/vuejs/vue-next/issues/2550
        watch(
            () => store.state.layout.tags.cachedViews.length,
            () => (data.cachedViews = [...store.state.layout.tags.cachedViews])
        );

        return {
            key,
            data,
            isLink,
            layout: store.state.layout
        };
    }
});
</script>
