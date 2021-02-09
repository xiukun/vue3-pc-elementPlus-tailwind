<!--
 * @Description: 
 * @Autor: xiukun@herry
 * @Date: 2021-02-02 18:10:38
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-02-09 10:04:00
-->
<template>
    <div class='content'>
        <el-tag>
            <el-link type='primary' href='https://github.com/xiukun' target='_blank' :underline='false'>
                我的github仓库地址
            </el-link>
        </el-tag>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'Workplace',
});
</script>