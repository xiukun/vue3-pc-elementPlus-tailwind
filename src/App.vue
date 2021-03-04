<!--
 * @Description: 
 * @Autor: xiukun@herry
 * @Date: 2021-02-02 18:20:45
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-03-04 12:21:41
-->
<template>
    <router-view />
</template>

<script setup>
import { useProvide } from '@/hook/useIoc';
useProvide();
</script>

