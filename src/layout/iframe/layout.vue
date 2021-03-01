<!--
 * @Description: iframe layout
 * @Autor: xiukun@herry
 * @Date: 2021-02-25 16:04:32
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-03-01 10:57:12
-->

<template>
    <div class="iframe-layout" ref="iframeContainerElRef">
        <!-- <iframe ref="iframeElRef" :src="iframeSrc" width="100%" frameborder="0"></iframe> -->
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, unref, onMounted, nextTick, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import { ElLoading } from 'element-plus';
import { isHttp } from '@/utils/is';

export default defineComponent({
    name: 'iframe-layout',
    setup() {
        const iframeContainerElRef = ref(null);
        const iframeElRef = ref(null);
        const route = useRoute();
        let loading: { close(): void };
        let iframeSrc = ref(null);
        let outlink = route.meta.link || null;
        if (isHttp(outlink)) {
            iframeSrc.value = outlink;
        }

        onMounted(() => {
            nextTick(() => {
                // iframe的高度
                let height = (iframeContainerElRef.value as any).offsetHeight - 5;
                // 创建iframe
                const elFrame = document.createElement('iframe');
                elFrame.src = iframeSrc.value || '';
                elFrame.width = '100%';
                elFrame.height = height + 'px';
                elFrame.frameBorder = '0';
                unref(iframeContainerElRef as any).appendChild(elFrame);
                const i = elFrame as any;
                // 局部区域loading加载
                loading = ElLoading.service({
                    lock: true,
                    target: document.querySelector('.iframe-layout') as HTMLElement,
                    text: '加载中...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.2)'
                });
                // iframe 加载完毕后 关闭loading
                if (i.attachEvent) {
                    i.attachEvent('onload', function () {
                        loading.close();
                    });
                } else {
                    i.onload = function () {
                        loading.close();
                    };
                    i.onerror = function () {
                        loading.close();
                    };
                }
            });
        });
        return { iframeSrc, iframeContainerElRef, iframeElRef };
    }
});
</script>
<style>
.iframe-layout {
    width: 100%;
    min-height: calc(100vh - 48px);
}
.tags-show-cls .iframe-layout {
    width: 100%;
    min-height: calc(100vh - 48px - 40px);
}
</style>
