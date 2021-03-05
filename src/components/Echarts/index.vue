<!--
 * @Description: echart组件
 * @Autor: xiukun@herry
 * @Date: 2021-03-05 10:05:56
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-03-05 14:41:39
-->
<template>
    <div ref="chartDom"></div>
    <!-- 调用组件方式 -->
    <!-- <Chart :option="{}"></Chart> -->

</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { ComposeOption, echarts } from './init';
import debounce from 'lodash-es/throttle';
import { off, on } from '@/utils/dom-utils';
// 定义图表实例
let chartInstance: any;

export default defineComponent({
    name: 'ComEcharts',
    props: {
        option: {
            default: () => {}
        }
    },
    setup(props) {
        const chartDom = ref(null);

        let resize = (v: any) => {
            v.resize();
        };

        resize = debounce(resize, 500); // 防抖
        // watch(
        //     () => props.option,
        //     (n) => {
        //         nextTick(() => {
        //             chartInstance.setOption(n);
        //         });
        //     }
        // );

        onMounted(() => {
            console.log(props.option, 'onMounted....');
            // 基于dom，初始化echarts实例
            console.log(chartDom.value);
            chartInstance = echarts.init((chartDom.value as unknown) as HTMLElement);
            chartInstance.setOption(props.option);

            on((chartDom.value as unknown) as HTMLElement, 'resize', resize as any, true);
        });

        onUnmounted(() => {
            // 销毁scorll resize监听
            off((chartDom.value as unknown) as HTMLElement, 'resize', resize as any, true);
            chartInstance.dispose();
            console.log(chartInstance);
            chartInstance = null;
        });

        return {
            chartDom
        };
    }
});
</script>
<style>
</style>