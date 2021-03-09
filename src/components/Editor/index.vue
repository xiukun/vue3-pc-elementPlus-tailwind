<!--
 * @Description: wangEditor富文本编辑器组件
 * @Autor: xiukun@herry
 * @Date: 2021-03-09 14:22:59
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-03-09 15:41:30
-->
<template>
    <div class="wangeditor">
        <div ref="editor"></div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount, ref, SetupContext, PropType } from 'vue';
import WangEditor from 'wangeditor';
export default defineComponent({
    name: 'ComEditor',
    props: {
        content: {
            type: String as PropType<String>,
            default: ''
        }
    },
    emits: ['update:content'],
    setup(props, context: SetupContext) {
        const editor = ref();

        let instance: any;
        onMounted(() => {
            instance = new WangEditor(editor.value);
            Object.assign(instance.config, {
                onchange() {
                    context.emit('update:content', instance.txt.html());
                    // console.log(instance.txt.html(), 'change');
                },
                zIndex: 2
            });
            instance.create();
        });
        onBeforeUnmount(() => {
            instance.destroy();
            instance = null;
        });

        return {
            editor
        };
    }
});
</script>
