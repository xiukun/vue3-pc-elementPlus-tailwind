<!--
 * @Description: 
 * @Autor: xiukun@herry
 * @Date: 2021-03-09 14:27:18
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-03-09 15:27:44
-->
<template lang="">
    <div class="my-10">
        <el-button @click="getContent">获取文本值</el-button>
        <editor ref="editorRefs"  v-model:content="txt" />
    </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import Editor from '@/components/Editor/index.vue';
export default defineComponent({
    name: 'editor-demo',
    components: {
        Editor
    },
    setup() {
        const editorRefs: any = ref(null);
        let txt = ref('');
        onMounted(() => {
            console.log(txt.value);
        });
        let getContent = () => {
            console.log(txt.value);
        };
        return { editorRefs, txt, getContent };
    }
});
</script>
<style lang="">
</style>