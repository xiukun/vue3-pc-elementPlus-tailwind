<!--
 * @Description: 
 * @Autor: xiukun@herry
 * @Date: 2021-02-03 16:48:56
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-02-22 14:50:32
-->
<template>
    <el-form ref="registerForm" :model="registerUser" :rules="registerRules" label-width="100px" class="registerForm sign-up-form">
        <el-form-item label="用户名" prop="name">
            <el-input v-model="registerUser.name" placeholder="用户名..."></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
            <el-input v-model="registerUser.email" placeholder="邮箱..."></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input v-model="registerUser.password" type="password" placeholder="密码..."></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="passwordEnter">
            <el-input v-model="registerUser.passwordEnter" type="password" placeholder="确认密码..."></el-input>
        </el-form-item>

        <el-form-item label="选择身份">
            <el-select v-model="registerUser.role" placeholder="请选择身份">
                <el-option label="管理员" value="admin"></el-option>
                <el-option label="用户" value="user"></el-option>
                <el-option label="游客" value="visitor"></el-option>
            </el-select>
        </el-form-item>

        <el-form-item>
            <el-button @click="handleRegister(registerForm)" type="primary" class="submit-btn">注册</el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts">
import { ref, Ref } from 'vue';
import { validate } from '@/utils/formExtend';
// import axios from 'axios' // 仅限在当前组件使用
import { cloneDeep } from 'lodash-es';
export default {
    name: 'RegisterForm',
    props: {
        registerUser: {
            type: Object,
            required: true
        },
        registerRules: {
            type: Object,
            required: true
        }
    },
    setup() {
        console.log(cloneDeep({ a: '1' }));
        const registerForm = ref(null);
        const handleRegister = async (formName: Ref) => {
            if (await validate(formName)) {
                alert('submit!');
            } else {
                console.log('error submit!!');
                return false;
            }
        };

        return { handleRegister, registerForm };
    }
};
</script>
