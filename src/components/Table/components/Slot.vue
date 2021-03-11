<!--
 * @Description: 照搬大佬的table封装~~
 * @Autor: xiukun@herry
 * @Date: 2021-03-11 09:49:03
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-03-11 10:11:13
-->
<script lang="ts">
import { defineComponent, inject, h, PropType } from 'vue';
export default defineComponent({
    name: 'Slot',
    props: {
        row: {
            type: Object as PropType<object>,
            default: () => null
        },
        index: {
            type: Number as PropType<number>,
            default: null
        },
        column: {
            type: Object as PropType<object>,
            default: () => null
        },
        slotName: {
            type: String as PropType<string>,
            default: ''
        }
    },
    render(props: any) {
        const _this: any = inject('tableRoot');
        return h(
            'span',
            _this.slots[props.slotName]({
                row: props.row,
                column: props.column,
                $index: props.index
            })
        );
    }
});
</script>

<style>
</style>
