<!--
 * @Description: 
 * @Autor: xiukun@herry
 * @Date: 2021-03-11 11:12:42
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-03-11 12:57:04
-->
<template>
    <div class='table-search flex flex-col'>
        <slot />
        <el-pagination :current-page='currentPage' :page-sizes='[10, 20, 50, 100]' :page-size='pageSize' layout='total, sizes, prev, pager, next, jumper' :total='total' @size-change='handleSizeChange' @current-change='handleCurrentChange' />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, SetupContext } from 'vue';
export default defineComponent({
    name: 'ComPage',
    props: {
        currentPage: {
            type: Number,
            default: 1
        },
        pageSize: {
            type: Number,
            default: 10
        },
        total: {
            type: Number,
            default: 0
        }
    },
    emits: ['size-change', 'current-change'],
    setup(props, context: SetupContext) {
        const handleSizeChange = (v: any) => context.emit('size-change', v);
        const handleCurrentChange = (v: any) => context.emit('current-change', v);
        return {
            handleSizeChange,
            handleCurrentChange
        };
    }
});
</script>

<style scoped>
</style>