<!--
 * @Description: 
 * @Autor: xiukun@herry
 * @Date: 2021-03-04 14:49:31
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-03-09 11:55:51
-->
<template>
    <transition name='el-fade-in'>
        <div v-if='show' class='open-select-mask w-full h-full bg-black bg-opacity-30 z-50 fixed top-0 left-0 flex flex-center'>
            <div class='open-select w-11/12 max-w-screen-xl h-5/6 bg-white flex flex-col overflow-x-hidden overflow-y-auto rounded-sm'>
                <div class='h-10 flex justify-between items-center px-3 shadow-sm border-b border-gray-100'>
                    <span>{{ title }}</span>
                    <div>
                        <i class='el-icon-close cursor-pointer' @click='close' />
                    </div>
                </div>
                <div class='flex-1 overflow-hidden'>
                    <el-scrollbar>
                        <div class="px-2.5 py-1">
                            <slot name='default' />
                        </div>
                    </el-scrollbar>
                </div>
                <div v-if='slots.btn' class='open-select-btn h-12 flex border-t border-gray-100'>
                    <slot name='btn' />
                </div>
            </div>
        </div>
    </transition>
</template>

<script lang="ts">
import { defineComponent, onUnmounted, PropType, SetupContext } from 'vue';
export default defineComponent({
    name: 'ComOpenDialog',
    props: {
        show: {
            type: Boolean as PropType<boolean>,
            default: false
        },
        title: {
            type: String as PropType<String>,
            default: '标题'
        }
    },
    emits: ['update:show'],
    setup(props, context: SetupContext) {
        const close = () => context.emit('update:show', !props.show);
        return {
            close,
            slots: context.slots
        };
    }
});
</script>

<style lang="scss" scoped>
.open-select-btn {
    :deep .el-button {
        border-radius: 0;
        flex: 1;
        margin-left: -1px;
    }
}
</style>
    