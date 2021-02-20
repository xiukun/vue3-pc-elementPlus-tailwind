<!--
 * @Description: 
 * @Autor: xiukun@herry
 * @Date: 2021-02-03 10:32:41
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-02-20 16:52:28
-->
<template>
    <div class="login-register container" :class="{'sign-up-mode':signUpMode}">
        <!-- form表单容器 -->
        <div class="forms-container">
            <div class="signin-signup">
                <!-- 登录 -->
                <LoginForm v-show="!isShow" :loginUser="loginUser" :rules="rules" />
                <!-- <el-form :model="loginUser" :rules="rules" status-icon ref="ruleForm" label-width="100px" class="loginForm">
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="loginUser.email" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="loginUser.password" autocomplete="off" show-password clearable></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="handleLogin(ruleForm)">提交</el-button>
                        <el-button @click="resetFields(ruleForm)">重置</el-button>
                    </el-form-item>
                </el-form> -->
                <!-- 注册 -->
                <RegisterForm v-show="isShow" :registerUser="registerUser" :registerRules="registerRules" />
            </div>
        </div>
        <!-- 左右切换动画 -->
        <div class="panels-container">
            <div class="panel left-panel">
                <div class="content">
                    <h3>XX系统</h3>
                    <br>
                    <button @click="signUpMode = !signUpMode" class="btn transparent">
                        注册
                    </button>
                </div>
                <img src="@/assets/img/login.svg" class="image" alt="" />
            </div>

            <div class="panel right-panel">
                <div class="content">
                    <h3>XX系统</h3>
                    <br>
                    <button @click="signUpMode = !signUpMode" class="btn transparent">
                        登录
                    </button>
                </div>
                <img src="@/assets/img/register.svg" class="image" alt="" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    onMounted,
    ref,
    Ref,
    unref,
    watchEffect,
    getCurrentInstance,
    ComponentInternalInstance,
    watch,
    reactive,
} from 'vue';
import { ElNotification } from 'element-plus';
import { validate, resetFields } from '@/utils/formExtend';
import {
    registerUser,
    registerRules,
} from '@/components/login/registerValidators';
import { LoginForm, RegisterForm } from '@/components/login';

interface Rules {
    email: {
        type: string;
        message: string;
        required: boolean;
        trigger: string;
    }[];
    password: (
        | {
              required: boolean;
              message: string;
              trigger: string;
              min?: undefined;
              max?: undefined;
          }
        | {
              min: number;
              max: number;
              message: string;
              trigger: string;
              required?: undefined;
          }
    )[];
}
export default defineComponent({
    name: 'login-register',
    components: {
        LoginForm,
        RegisterForm,
    },
    setup() {
        const { proxy } = getCurrentInstance() as any;
        // const { proxy } = getCurrentInstance() as ComponentInternalInstance;  需要把main.ts中的ComponentCustomProperties注释解放才能使用
        const signUpMode = ref<boolean>(false);
        const isShow = ref<boolean>(false);
        const delayShow = () => {
            setTimeout(() => {
                isShow.value = !isShow.value;
            }, 700);
        };
        const loginUser = ref<object>({
            email: 'admin@163.com',
            password: '123456',
        });
        const rules = reactive<Rules>({
            email: [
                {
                    required: true,
                    type: 'email',
                    message: '请输入正确的邮箱地址',
                    trigger: 'blur',
                },
            ],
            password: [
                {
                    required: true,
                    message: '密码不能为空',
                    trigger: 'blur,change',
                },
                {
                    min: 6,
                    max: 30,
                    message: '密码长度6~30字符~~',
                    trigger: 'blur',
                },
            ],
        });

        // 触发登录方法
        const ruleForm = ref(null);
        // #region 未封装组件写法...
        const handleLogin = async (ruleForm: Ref | any) => {
            if (await validate(ruleForm)) {
                ElNotification({
                    title: '欢迎',
                    message: '登录成功',
                    type: 'success',
                });
                // await ajax api request
            } else {
                ElNotification({
                    title: '警告',
                    message: '账号或密码错误',
                    type: 'warning',
                });
                return;
            }
            // #region 上面未封装写法...
            // unref(ruleForm).validate((valid: boolean) => {
            //     if (valid) {
            //         // alert('submit!');
            //         ElNotification({
            //             title: '欢迎',
            //             message: '登录成功',
            //             type: 'success',
            //         });
            //     } else {
            //         ElNotification({
            //             title: '警告',
            //             message: '账号或密码错误',
            //             type: 'warning',
            //         });
            //         return false;
            //     }
            // });
            // #endregion
        };
        // #endregion

        // const resetFields = (ruleForm: Ref | any): void => {
        //     unref(ruleForm).resetFields();
        // };
        // watchEffect(() => {
        //     signUpMode.value;
        // });
        watch(signUpMode, () => {
            delayShow();
        });

        onMounted(() => {
            console.log(proxy.$http);
            console.log(proxy.$test);
        });
        return {
            signUpMode,
            isShow,
            loginUser,
            ruleForm,
            rules,
            handleLogin,
            resetFields,
            registerUser,
            registerRules,
        };
    },
    // mounted() {
    //     console.log(this.$test.test);
    // },
});
</script>
<style  scoped>
.container {
    /* position: relative; */
    width: 100%;
    background-color: #fff;
    min-height: 100vh;
    overflow: hidden;
}
.forms-container {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}
.signin-signup {
    position: absolute;
    top: 55%;
    transform: translate(-50%, -50%);
    left: 75%;
    width: 44%;
    transition: 1s 0.7s ease-in-out;
    display: grid;
    grid-template-columns: 1fr;
    z-index: 5;
}

/* 左右切换动画 */
.social-text {
    padding: 0.7rem 0;
    font-size: 1rem;
}

.social-media {
    display: flex;
    justify-content: center;
}

.social-icon {
    height: 46px;
    width: 46px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 0.45rem;
    color: #333;
    border-radius: 50%;
    border: 1px solid #333;
    text-decoration: none;
    font-size: 1.1rem;
    transition: 0.3s;
}

.social-icon:hover {
    color: #4481eb;
    border-color: #4481eb;
}

.btn {
    width: 150px;
    background-color: #5995fd;
    border: none;
    outline: none;
    height: 49px;
    border-radius: 49px;
    color: #fff;
    text-transform: uppercase;
    font-weight: 600;
    margin: 10px 0;
    cursor: pointer;
    transition: 0.5s;
}

.btn:hover {
    background-color: #4d84e2;
}
.panels-container {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
}

.container:before {
    content: '';
    position: absolute;
    height: 2000px;
    width: 2000px;
    top: -10%;
    right: 48%;
    transform: translateY(-50%);
    background-image: linear-gradient(-45deg, #4481eb 0%, #04befe 100%);
    transition: 1.8s ease-in-out;
    border-radius: 50%;
    z-index: 6;
}

.image {
    width: 100%;
    transition: transform 1.1s ease-in-out;
    transition-delay: 0.4s;
}

.panel {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-around;
    text-align: center;
    z-index: 6;
}

.left-panel {
    pointer-events: all;
    padding: 3rem 17% 2rem 12%;
}

.right-panel {
    pointer-events: none;
    padding: 3rem 12% 2rem 17%;
}

.panel .content {
    color: #fff;
    transition: transform 0.9s ease-in-out;
    transition-delay: 0.6s;
}

.panel h3 {
    font-weight: 600;
    line-height: 1;
    font-size: 1.5rem;
}

.panel p {
    font-size: 0.95rem;
    padding: 0.7rem 0;
}

.btn.transparent {
    margin: 0;
    background: none;
    border: 2px solid #fff;
    width: 130px;
    height: 41px;
    font-weight: 600;
    font-size: 0.8rem;
}

.right-panel .image,
.right-panel .content {
    transform: translateX(800px);
}

/* ANIMATION */

.container.sign-up-mode:before {
    transform: translate(100%, -50%);
    right: 52%;
}

.container.sign-up-mode .left-panel .image,
.container.sign-up-mode .left-panel .content {
    transform: translateX(-800px);
}

.container.sign-up-mode .signin-signup {
    left: 25%;
}

.container.sign-up-mode form.sign-up-form {
    opacity: 1;
    z-index: 2;
}

.container.sign-up-mode form.sign-in-form {
    opacity: 0;
    z-index: 1;
}

.container.sign-up-mode .right-panel .image,
.container.sign-up-mode .right-panel .content {
    transform: translateX(0%);
}

.container.sign-up-mode .left-panel {
    pointer-events: none;
}

.container.sign-up-mode .right-panel {
    pointer-events: all;
}

@media (max-width: 870px) {
    .container {
        min-height: 800px;
        height: 100vh;
    }
    .signin-signup {
        width: 100%;
        top: 95%;
        transform: translate(-50%, -100%);
        transition: 1s 0.8s ease-in-out;
    }

    .signin-signup,
    .container.sign-up-mode .signin-signup {
        left: 50%;
    }

    .panels-container {
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 2fr 1fr;
    }

    .panel {
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        padding: 2.5rem 8%;
        grid-column: 1 / 2;
    }

    .right-panel {
        grid-row: 3 / 4;
    }

    .left-panel {
        grid-row: 1 / 2;
    }

    .image {
        width: 200px;
        transition: transform 0.9s ease-in-out;
        transition-delay: 0.6s;
    }

    .panel .content {
        padding-right: 15%;
        transition: transform 0.9s ease-in-out;
        transition-delay: 0.8s;
    }

    .panel h3 {
        font-size: 1.2rem;
    }

    .panel p {
        font-size: 0.7rem;
        padding: 0.5rem 0;
    }

    .btn.transparent {
        width: 110px;
        height: 35px;
        font-size: 0.7rem;
    }

    .container:before {
        width: 1500px;
        height: 1500px;
        transform: translateX(-50%);
        left: 30%;
        bottom: 68%;
        right: initial;
        top: initial;
        transition: 2s ease-in-out;
    }

    .container.sign-up-mode:before {
        transform: translate(-50%, 100%);
        bottom: 32%;
        right: initial;
    }

    .container.sign-up-mode .left-panel .image,
    .container.sign-up-mode .left-panel .content {
        transform: translateY(-300px);
    }

    .container.sign-up-mode .right-panel .image,
    .container.sign-up-mode .right-panel .content {
        transform: translateY(0px);
    }

    .right-panel .image,
    .right-panel .content {
        transform: translateY(300px);
    }

    .container.sign-up-mode .signin-signup {
        top: 5%;
        transform: translate(-50%, 0);
    }
}

@media (max-width: 570px) {
    form {
        padding: 0 1.5rem;
    }

    .image {
        display: none;
    }
    .panel .content {
        padding: 0.5rem 1rem;
    }
    .container {
        padding: 1.5rem;
    }

    .container:before {
        bottom: 72%;
        left: 50%;
    }

    .container.sign-up-mode:before {
        bottom: 28%;
        left: 50%;
    }
}

/* 控制login & register显示 */
@keyframes go {
    0% {
        display: none;
    }
    60% {
        display: block;
    }
}
form {
    padding: 0rem 5rem;
    transition: all 0.2s 0.7s;
    /* animation: go 0.7s ease 0s 1; */
    overflow: hidden;
}

form.sign-in-form {
    z-index: 2;
}

form.sign-up-form {
    opacity: 0;
    z-index: 1;
}

/* register */
.registerForm {
    margin-top: 20px;
    background-color: #fff;
    padding: 20px 40px 20px 20px;
    border-radius: 5px;
    box-shadow: 0px 5px 10px #cccc;
}

.submit_btn {
    width: 100%;
}

/* form */
/* .loginForm {
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
} */
</style>
