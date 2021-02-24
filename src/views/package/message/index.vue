<!--
 * @Description: message demo
 * @Autor: xiukun@herry
 * @Date: 2021-02-24 12:28:10
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-02-24 14:11:37
-->
<template>
    <div>
        <el-alert :closable="false" title="二次封装 Element 的 Message 组件，连续点击只显示最新一条消息。" type="info" effect="dark" class="mb-10">
        </el-alert>
        <el-button @click="show">显示message提示</el-button>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Message } from '@/components/Message';
export default defineComponent({
    name: 'MessageDemo',
    setup() {
        const count = ref<number>(0);
        function show() {
            count.value += 1;
            Message.success('成功消息' + count.value);
        }
        return {
            count,
            show
        };
    }
});
</script>
<style scoped>
.mb-10 {
    margin-bottom: 10px;
}
</style>