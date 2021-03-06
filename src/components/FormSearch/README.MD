搜索条件组件
===

使用说明
> 本组件扩展性低，适合后端项目使用， 参数代码量少。
> 扩展性高的form查询搜索组件，请使用FormSearchBase组件
> 
----

```html 
<div>
    <form-search ref="formSearchRef" :rules="rules" :props="searchConfig.props" :form="filterForm" :label-width="searchConfig.labelWidth" :inline="true">
        <template #search>
            <el-form-item style="float:right;right:20px;">
                <el-button type="primary" icon="el-icon-search" @click.stop.prevent="searchBtn">查询</el-button>
                <!-- <el-button type="warning" icon="el-icon-refresh">重置</el-button> -->
                <!-- <el-button type="info" icon="el-icon-plus">添加</el-button>
                <el-button>文本说明</el-button> -->
                <el-button icon="el-icon-sort" @click="toggle(formSearchRef)" circle></el-button>
            </el-form-item>
        </template>
    </form-search>
</div>
```

```ecmascript 6
import { defineComponent, ref, unref, reactive, onMounted } from 'vue';
import FormSearch from '@/components/FormSearch/index';

export default defineComponent({
    name: 'form-search-demo',
    components: { FormSearch },
    setup() {
        let formSearchRef = ref(null);
        let value1 = [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)];
        let selectData = undefined;
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
                    change: (val, item, form) => {
                        console.log(val, item, form);
                    }
                },
                {
                    tag: 'select',
                    prop: 'p8',
                    placeholder: '选择订单来源',
                    options: undefined,
                    label: '订单来源:'
                },
                {
                    tag: 'datePicker',
                    prop: 'p9',
                    type: 'datetimerange',
                    placeholder: '下单日期',
                    label: '下单日期:',
                    change: (val, item, form) => {
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
            p9: []
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
        onMounted(() => {
            selectData = [
                { value: 0, label: '鲜活go' },
                { value: 2, label: '电商' },
                { value: 3, label: '征订' },
                { value: 4, label: '奶站' },
                { value: 5, label: '牛奶钱包' },
                { value: 6, label: '送奶工App' },
                { value: 70, label: '电话' },
                { value: 80, label: '机构' },
                { value: 100, label: '鲜生活' },
                { value: 110, label: '鲜小厨' },
                { value: 120, label: '小程序' },
                { value: 130, label: '淘宝' },
                { value: 140, label: '拼多多' },
                { value: 150, label: '天猫' },
                { value: 160, label: '京东' },
                { value: 170, label: '总部店铺' },
                { value: 180, label: '牛奶钱包' },
                { value: 190, label: '千丁' },
                { value: 200, label: '鑫划算' },
                { value: 210, label: '琥珀亲子' },
                { value: 220, label: '星life' },
                { value: 230, label: '龙湖享家' },
                { value: 240, label: '业点点' },
                { value: 250, label: '苏宁易购' },
                { value: 260, label: '万科' },
                { value: 270, label: '生活记' }
            ];
            //p8  select延迟赋值
            setTimeout(() => {
                for (let i = searchConfig.props.length - 1; i >= 0; i--) {
                    if (searchConfig.props[i].prop === 'p8') {
                        searchConfig.props[i].options = selectData;
                        console.log(searchConfig.props);
                        return;
                    }
                }
            }, 2000);
        });

        let searchBtn = () => {
            console.log(filterForm.value);
        };
        let toggle = (formSearchRef) => {
            unref(formSearchRef).toggleBtn();
        };
        return { value1, filterForm, rules, searchConfig, formSearchRef, searchBtn, gg };
    }
});
```


`{ form }` 对象
| 参数     | 说明                                      | 类型    | 默认值 |
| -------- | ----------------------------------------- | ------- | ------ |
| props    | 表单组件集合                               | array | — |
| form     | 表单数据对象                               | object | — |
| rules    | 表单验证规则                               | object | — |
| inline   | 是否行内表单模式                            | boolean | true |
| label-width | 表单域标签的宽度                         | string | 100px |
| label-position | 表单域标签的位置 right/left/top       | string | right |
| status-icon    | 是否在输入框中显示校验结果反馈图标      | object | true |

`{ form slot }` 插槽
| 参数     | 说明 |
| ------- | ---  |
| header | form头部插槽  |

`{ props }` 数组集合
| input参数 | 说明                              | 类型    | 默认值 |
| ------- | --------------------------------- | ------- | ------ |
| tag |  元素标签名input                      | string | — |
| prop |  绑定值 对应form对象的值              | string / number | — |
| 其他 |  小驼峰命名xxYyyy,对应el-input属性及方法，只是常用的属性封装 | — | — |

| select参数 | 说明                              | 类型    | 默认值 |
| ------- | --------------------------------- | ------- | ------ |
| tag |  元素标签名select                     | string | — |
| prop |  绑定值 对应form对象的值              | string / number | — |
| 其他 |  小驼峰命名xxYyyy,对应el-input属性及方法，只是常用的属性封装 | — | — |

| cascader参数 | 说明                              | 类型    | 默认值 |
| ------- | --------------------------------- | ------- | ------ |
| tag |  元素标签名cascader                   | string | — |
| prop |  绑定值 对应form对象的值              | string / number | — |
| 其他 |  小驼峰命名xxYyyy,对应el-input属性及方法，只是常用的属性封装 | — | — |

| checkbox参数 | 说明                              | 类型    | 默认值 |
| ------- | --------------------------------- | ------- | ------ |
| tag |  元素标签名checkbox                   | string | — |
| prop |  绑定值 对应form对象的值              | string / number | — |
| 其他 |  小驼峰命名xxYyyy,对应el-input属性及方法，只是常用的属性封装 | — | — |

| radio参数 | 说明                              | 类型    | 默认值 |
| ------- | --------------------------------- | ------- | ------ |
| tag |  元素标签名radio                   | string | — |
| prop |  绑定值 对应form对象的值              | string / number | — |
| 其他 |  小驼峰命名xxYyyy,对应el-input属性及方法，只是常用的属性封装 | — | — |

| switch参数 | 说明                              | 类型    | 默认值 |
| ------- | --------------------------------- | ------- | ------ |
| tag |  元素标签名switch                   | string | — |
| prop |  绑定值 对应form对象的值              | string / number | — |
| 其他 |  小驼峰命名xxYyyy,对应el-input属性及方法，只是常用的属性封装 | — | — |
