<!--
 * @Description: form查询搜索组件
 * @Autor: xiukun@herry
 * @Date: 2021-02-24 14:18:18
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-02-25 15:45:49
-->
<template>
    <div class="content">
        <el-form ref="formRef" :model="form" :rules="rules" :status-icon="StatusIcon" :label-width="LabelWidth" :label-position="LabelPosition" :inline="inline" @submit.prevent>
            <slot name="header" />
            <template v-for="(key,index) in attrs.data">
                <el-form-item :key="key.prop" :label="key.label" :prop="key.prop" v-if="!key.hide" v-show="index<count">
                    <!-- input组件 -->
                    <el-input v-if="isShow(key,'input')" v-model="form[key.prop]" :type="key.type ? key.type : 'text'" autocomplete="off" :placeholder="key.placeholder?key.placeholder:'请输入'" :maxlength="key.maxLength" :minlength="key.minLength" :rows="key.rows" :step="key.step" :suffix-icon="key.suffixIcon" :prefix-icon="key.prefixIcon" :autofocus="key.autofocus?key.autofocus:false"
                        :class="{ 'show-word-limit-input': !!key.maxLength }" :disabled="key.disabled" show-word-limit clearable>
                        <template #append v-if="key.unit">{{key.unit}}</template>
                    </el-input>
                    <!-- select组件 -->
                    <el-select v-else-if="isShow(key, 'select')" v-model="form[key.prop]" @change="val => changeSelect(val, key, form)" :filterable="key.filterable" :remote="key.remoteMethod ? true:false" :remote-method="key.remoteMethod" :disabled="key.disabled" :default-first-option="typeof key.defaultFirstOption === 'boolean' ? key.clearable : true" :multiple="key.multiple"
                        :clearable="typeof key.clearable === 'boolean' ? key.clearable : true" :placeholder="key.placeholder?key.placeholder:'请选择'">
                        <el-option v-for="(option, i) in key.options" :key="i" :label="option[key.keyProp ? key.keyProp.label : 'label']" :value="option[key.keyProp ? key.keyProp.value : 'value']">
                            <template v-if="key.customOption">
                                <span style="float: left">{{ key.label }}</span>
                                <span style="float: right; color: #8492a6; font-size: 13px">{{ key.value }}</span>
                            </template>
                        </el-option>
                    </el-select>
                    <!-- cascader 级联选择器 -->
                    <el-cascader v-else-if="isShow(key, 'cascader')" v-model="form[key.prop]" :placeholder="key.placeholder ? key.placeholder : `请输入${key.label}`" :options="key.options" :props="key.optionProps" @change="val => changeCascader(val, key)" clearable></el-cascader>
                    <!-- DatePicker 日期选择器 -->
                    <el-date-picker v-else-if="isShow(key, 'datePicker')" :disabled="key.disabled??false" v-model="form[key.prop]" :type="key.type ?? 'datetimerange'" range-separator="至" :format="key.format || 'YYYY-MM-DD HH:mm:ss'" @change="val => changeTime(val, key)" :placeholder="key.placeholder ?? '请选择'" :start-placeholder="key.startPlaceholder  ?? '开始时间'"
                        :end-placeholder="key.endPlaceholder  ?? '结束时间'" :clearable="key.clearable ?? true" :default-time="key.defaultTime ? key.defaultTime : [new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 6, 1, 23, 59, 59)]"></el-date-picker>
                    <!-- checkbox -->
                    <el-checkbox-group v-else-if="isShow(key, 'checkbox')" :disabled="key.disabled" v-model="form[key.prop]" :min="key.min ? key.min : 0" :max="key.max ? key.max : 1000">
                        <el-checkbox v-for="opt in key.options" :label="opt.value" :disabled="opt.disabled" :key="opt.value" :value="opt.value">{{ opt.label }}</el-checkbox>
                    </el-checkbox-group>
                    <!-- radio -->
                    <el-radio-group v-else-if="isShow(key, 'radio')" v-model="form[key.prop]">
                        <el-radio :disabled="key.disabled" v-for="radio in key.options" :key="radio.label" :label="radio.value" :value="radio.value">{{ radio.label }}</el-radio>
                    </el-radio-group>
                    <el-radio-group v-else-if="isShow(key, 'radioButton')" v-model="form[key.prop]">
                        <el-radio-button :disabled="key.disabled" v-for="radio in key.options" :key="radio.label" :label="radio.value">{{ radio.label }}</el-radio-button>
                    </el-radio-group>
                    <!-- switch -->
                    <el-switch :active-value="key.activeValue" :inactive-value="key.inactiveValue" v-else-if="isShow(key, 'switch')" v-model="form[key.prop]">
                    </el-switch>
                </el-form-item>
            </template>
            <slot name="search" />
        </el-form>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue';
import formSearchProps from './props';

//#region 组件change事件集合..
let changeCascader = (val: any, item: { change: (arg0: any, arg1: any) => void }) => {
    console.log(val, item);
    if (item.change) {
        item.change(val, item);
    }
};

let changeTime = (val: any, item: { changeTime: (arg0: any, arg1: any) => void }) => {
    console.log(item);
    if (item && item.changeTime) {
        item.changeTime(val, item);
    }
};

let changeSelect = (
    val: any,
    item: { change: (arg0: any, arg1: any, arg2: any) => void },
    form: any
) => {
    if (item.change) {
        item.change(val, item, form);
    }
};
//#endregion
// 函数集合追加到setup中
let changeFn = {
    changeCascader,
    changeTime,
    changeSelect
};

export default defineComponent({
    name: 'ComFormSearch',
    props: formSearchProps,
    setup(props) {
        let expand = ref(true); //默认展开
        let attrs = reactive({ data: props.props });
        let count = computed(() => (expand.value ? attrs.data.length : props.showCol));
        //开合切换按钮
        let toggleBtn = () => {
            expand.value = !expand.value;
            console.log(expand.value);
        };
        let refresh = (data: { data: unknown[] }) => {
            attrs = data;
            console.log(attrs);
        };
        let isShow = (item: any, tag: any) => {
            return item.tag === tag;
        };

        return {
            expand,
            attrs,
            count,
            toggleBtn,
            refresh,
            isShow,
            ...changeFn
        };
    }
});
</script>