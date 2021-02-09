<!--
 * @Description: 
 * @Autor: xiukun@herry
 * @Date: 2021-02-03 16:48:56
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-02-08 16:49:59
-->
<template>
    <el-form ref="loginForm" :model="loginUser" :rules="rules" label-width="100px" class="loginForm sign-in-form">
        <el-form-item label="邮箱" prop="email">
            <el-input v-model="loginUser.email" placeholder="邮箱..."></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input v-model="loginUser.password" type="password" placeholder="密码..."></el-input>
        </el-form-item>

        <el-form-item>
            <el-button @click="handleLogin(loginForm)" type="primary" class="submit-btn">提交</el-button>
        </el-form-item>

        <!-- 找回密码 -->
        <div class="tiparea">
            <p>忘记密码？ <a>立即找回</a></p>
        </div>
    </el-form>
</template>

<script lang="ts">
import { defineComponent, ref, unref, getCurrentInstance, Ref } from 'vue';
import { ElNotification } from 'element-plus';
import { store } from '@/store/index';
export default defineComponent({
    props: {
        loginUser: {
            type: Object,
            required: true,
        },
        rules: {
            type: Object,
            required: true,
        },
    },
    setup(props) {
        // const { ctx } = getCurrentInstance() as any ;
        const loginForm = ref(null);
        // 触发登录方法
        const handleLogin = (lf1: Ref | any) => {
            // ctx.$refs[formName].validate((valid: boolean) => {
            unref(lf1).validate((valid: boolean) => {
                if (valid) {
                    toLogin();
                    ElNotification({
                        title: '欢迎',
                        message: '登录成功',
                        type: 'success',
                    });
                } else {
                    ElNotification({
                        title: '警告',
                        message: '账号或密码错误',
                        type: 'warning',
                    });
                    return false;
                }
            });
        };

        const toLogin = async () => {
            console.log(props.loginUser);
            await store.dispatch('layout/login', props.loginUser);
        };

        return { handleLogin, loginForm };
    },
});
</script>
<style scoped>
/* form */
.loginForm {
    margin-top: 20px;
    background-color: #fff;
    padding: 20px 40px 20px 20px;
    border-radius: 5px;
    box-shadow: 0px 5px 10px #cccc;
}

.submit-btn {
    width: 100%;
}
.tiparea {
    text-align: right;
    font-size: 12px;
    color: #333;
}
.tiparea p a {
    color: #409eff;
}
</style>