
<!--
 * @Description: 
 * @Autor: xiukun@herry
 * @Date: 2021-03-05 13:48:31
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-03-05 14:54:04
-->
<template>
    <div>
        <Chart :option="{...pieOption}" class='w-64 h-64'></Chart>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { ComposeOption } from '@/components/Echarts/init';
import Chart from '@/components/Echarts/index.vue';
// 圆饼图
const pieOption: ComposeOption = {
    tooltip: {
        trigger: 'item',
        extraCssText: 'z-index:2000000000'
    },
    legend: {
        top: '5%',
        left: 'center'
    },
    series: [
        {
            name: '访问来源',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '40',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: [
                { value: 1048, name: '搜索引擎' },
                { value: 735, name: '直接访问' },
                { value: 580, name: '邮件营销' },
                { value: 484, name: '联盟广告' },
                { value: 300, name: '视频广告' }
            ]
        }
    ]
};
export default defineComponent({
    name: 'echarts-demo',
    components: { Chart },
    setup() {
        return {
            pieOption
        };
    }
});
</script>