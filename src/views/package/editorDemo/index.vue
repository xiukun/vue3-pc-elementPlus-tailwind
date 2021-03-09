<!--
 * @Description: 
 * @Autor: xiukun@herry
 * @Date: 2021-03-09 14:27:18
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-03-09 15:44:39
-->
<template lang="">
    <div class="my-10">
         <el-alert :closable="false" title="wangEditor显示table等自定义标签的样式需要引用本页面style中定义的样式" type="info" effect="dark" class="mb-10">
        </el-alert>
        <br/>
        <el-button @click="getContent">获取文本值</el-button>
        <editor ref="editorRefs" v-model:content="txt" />
        <br/>
        <div class="wangeditor" v-html="txt"></div>
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
<style>
/* table 样式 */
.wangeditor table {
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
}
.wangeditor table td,
.wangeditor table th {
    border-bottom: 1px solid #ccc;
    border-right: 1px solid #ccc;
    padding: 3px 5px;
}
.wangeditor table th {
    border-bottom: 2px solid #ccc;
    text-align: center;
}

/* blockquote 样式 */
.wangeditor blockquote {
    display: block;
    border-left: 8px solid #d0e5f2;
    padding: 5px 10px;
    margin: 10px 0;
    line-height: 1.4;
    font-size: 100%;
    background-color: #f1f1f1;
}

/* code 样式 */
.wangeditor code {
    display: inline-block;
    *display: inline;
    *zoom: 1;
    background-color: #f1f1f1;
    border-radius: 3px;
    padding: 3px 5px;
    margin: 0 3px;
}
.wangeditor pre code {
    display: block;
}

/* ul ol 样式 */
.wangeditor ul,
.wangeditor ol {
    margin: 10px 0 10px 20px;
}
</style>