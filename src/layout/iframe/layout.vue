<!--
 * @Description: iframe layout
 * @Autor: xiukun@herry
 * @Date: 2021-02-25 16:04:32
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-02-25 19:01:56
-->

<template>
    <div class="iframe-layout" ref="iframeContainerElRef">
        <iframe ref="iframeElRef" :src="iframeSrc" width="100%" scrolling="auto" frameborder="0"></iframe>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    ref,
    unref,
    reactive,
    onMounted,
    nextTick,
    getCurrentInstance
} from 'vue';
import { useRoute } from 'vue-router';
import { isHttp } from '@/utils/is';

export default defineComponent({
    name: 'iframe-layout',
    setup() {
        const iframeContainerElRef = ref(null);
        const iframeElRef = ref(null);
        const route = useRoute();

        let iframeSrc = ref(null);

        let outlink = route.meta.link || null;
        if (isHttp(outlink)) {
            iframeSrc.value = outlink;
        }
        onMounted(() => {
            nextTick(() => {
                let height = (iframeContainerElRef.value as any).offsetHeight - 5;
                unref(iframeElRef as any).height = height;
            });
        });
        return { iframeSrc, iframeContainerElRef, iframeElRef };
    }
});
</script>
<style lang="scss">
.iframe-layout {
    width: 100%;
    height: 100vh;
}
</style>
