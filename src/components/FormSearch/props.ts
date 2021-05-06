/*
 * @Description:
 * @Autor: xiukun@herry
 * @Date: 2021-02-24 14:26:43
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-02-24 15:49:33
 */
import { PropType } from 'vue'

export default {
    showCol: {
        // 默认展示3列数据
        type: Number as PropType<Number>,
        default: 3
    },
    form: {
        type: Object as PropType<object>,
        default: () => {}
    },
    rules: {
        type: Object as PropType<object>,
        default: () => {}
    },
    // 查询条件集合
    props: {
        type: Array as PropType<any[]>,
        default: () => {}
    },
    // 是否行内表单模式 默认true
    inline: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    // 表单域标签的宽度 支持auto
    LabelWidth: {
        type: String as PropType<string>,
        default: '100px'
    },
    // 表单域标签的位置 默认right对齐
    LabelPosition: {
        type: String as PropType<string>,
        default: 'right'
    },
    StatusIcon: {
        type: Boolean as PropType<boolean>,
        default: true
    }
}
