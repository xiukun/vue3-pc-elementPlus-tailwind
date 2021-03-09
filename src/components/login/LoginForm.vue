<!--
 * @Description: 
 * @Autor: xiukun@herry
 * @Date: 2021-02-03 16:48:56
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-03-09 14:02:25
-->
<template>
    <el-form ref="loginForm" :model="loginUser" :rules="rules" label-width="100px" class="loginForm sign-in-form">
        <el-form-item label="邮箱" prop="email">
            <el-input v-model="loginUser.email" placeholder="邮箱..."></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input v-model="loginUser.password" type="password" placeholder="密码..."></el-input>
        </el-form-item>
        <el-form-item label="校验" prop="password">
            <el-row>
                <el-col :span="15">
                    <el-input v-model="loginUser.imgCode" prefix-icon="el-icon-unlock" placeholder="请输入验证码"></el-input>
                </el-col>
                <el-col :span="8" :offset="1">
                    <image-verify ref="verifyRef" />
                </el-col>
            </el-row>
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
import ImageVerify from '@/components/ImageVerify/index.vue';
import { ElNotification } from 'element-plus';
import { store } from '@/store/index';
export default defineComponent({
    name: 'LoginForm',
    components: { ImageVerify },
    props: {
        loginUser: {
            type: Object,
            required: true
        },
        rules: {
            type: Object,
            required: true
        }
    },
    setup(props) {
        // const { ctx } = getCurrentInstance() as any ;
        const loginForm = ref(null);
        const verifyRef: any = ref(null);
        // 触发登录方法
        const handleLogin = (lf1: Ref | any) => {
            // ctx.$refs[formName].validate((valid: boolean) => {
            unref(lf1).validate((valid: boolean) => {
                if (valid) {
                    // 校验验证码
                    const vCode = verifyRef.value.imgCode;
                    // if (vCode.toLowerCase() != props.loginUser.imgCode.toLowerCase()) {
                    //     console.log(vCode);
                    //     // return;
                    // }
                    // console.log(vCode);
                    toLogin();
                    ElNotification({
                        title: '欢迎',
                        message: '登录成功',
                        type: 'success'
                    });
                } else {
                    ElNotification({
                        title: '警告',
                        message: '账号或密码错误',
                        type: 'warning'
                    });
                    return false;
                }
            });
        };

        const toLogin = async () => {
            console.log(props.loginUser);
            await store.dispatch('layout/login', props.loginUser);
        };

        return { handleLogin, loginForm, verifyRef };
    }
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
    color: var(--main-color);
}
</style>