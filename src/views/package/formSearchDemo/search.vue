<!--
 * @Description: 
 * @Autor: xiukun@herry
 * @Date: 2021-03-15 11:14:24
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-03-15 18:24:56
-->
<template>
    <div>
        <form-search ref="formSearchRef" :rules="rules" :props="searchConfig.props" :form="filterForm" :label-width="searchConfig.labelWidth" :inline="true">
            <template #search>
                <el-button type="primary" icon="el-icon-search" @click.stop.prevent="searchBtn">查询</el-button>
                <!-- <el-button type="warning" icon="el-icon-refresh">重置</el-button> -->
                <!-- <el-button type="info" icon="el-icon-plus">添加</el-button>
                    <el-button>文本说明</el-button> -->
                <el-button icon="el-icon-sort" @click="gg(formSearchRef)" circle></el-button>
            </template>
        </form-search>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, unref, getCurrentInstance } from 'vue';
import FormSearch from '@/components/FormSearch/index.vue';

export default defineComponent({
    name: 'form-search-demo2',
    components: { FormSearch },
    setup() {
        // const { proxy } = getCurrentInstance() as any;
        // console.log(proxy.$dayjs());
        // console.log($dayjs());
        let formSearchRef = ref(null);
        let value1 = ['2020-01-01 00:00:00', '2020-06-01 23:59:59'];
        let searchConfig = {
            labelWidth: '120px',
            props: [
                {
                    tag: 'input',
                    prop: 'p1',
                    type: 'number',
                    placeholder: '订单编号',
                    label: '订单编号:'
                },
                {
                    tag: 'input',
                    prop: 'p2',
                    placeholder: '下单人手机号',
                    label: '下单人手机号:'
                },
                {
                    tag: 'input',
                    prop: 'p3',
                    placeholder: '收货人姓名',
                    label: '收货人姓名:'
                },
                {
                    tag: 'input',
                    prop: 'p4',
                    placeholder: '收货人手机号',
                    label: '收货人手机号:'
                },
                {
                    tag: 'input',
                    prop: 'p5',
                    placeholder: '收货地址',
                    label: '收货地址:'
                },
                {
                    tag: 'select',
                    prop: 'p6',
                    placeholder: '订单状态',
                    options: [
                        { value: -1, label: '全部' },
                        { value: 0, label: '待支付' },
                        { value: 8, label: '待配送' },
                        { value: 1, label: '配送中' },
                        { value: 2, label: '已完成' },
                        { value: 3, label: '已取消' },
                        { value: 4, label: '已退款' },
                        { value: 5, label: '停订' },
                        { value: 6, label: '售后中' },
                        { value: 7, label: '作废' }
                    ],
                    label: '订单状态:'
                },

                {
                    tag: 'select',
                    prop: 'p7',
                    placeholder: '奶站',
                    options: [
                        { value: 0, label: '鲜活go' },
                        { value: 2, label: '电商' },
                        { value: 3, label: '征订' }
                    ],
                    label: '奶站:',
                    filterable: true,
                    change: (val: any, item: any, form: any) => {
                        console.log(val, item, form);
                    }
                },

                {
                    tag: 'datePicker',
                    prop: 'p9',
                    type: 'datetimerange',
                    placeholder: '下单日期',
                    label: '下单日期:',
                    changeTime: (val: any, item: any, form: any) => {
                        console.log(val, item, form);
                    }
                }
            ],
            optBtns: []
        };

        let filterForm = ref({
            p1: '',
            p2: '',
            p3: '',
            p4: '',
            p5: '',
            p6: '',
            p7: '',
            p8: '',
            p9: value1
        });
        let rules = reactive({
            p1: [
                {
                    required: true,
                    message: '请输入..',
                    trigger: 'blur'
                }
            ]
        });
        let searchBtn = () => {
            console.log(filterForm);
        };
        let gg = (formSearchRef: any) => {
            unref(formSearchRef).toggleBtn();
        };
        return { filterForm, rules, searchConfig, formSearchRef, searchBtn, gg };
    }
});
</script>
