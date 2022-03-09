<template>
    <div class="login-box" :style="{backgroundImage:`url(${this.$store.getters.indexBgGet})`}">
        <div class="center-box">
            <div class="login-window">
                <div class="title">
                    <span class="func-box" @click="this.$router.push('/')">首 页</span>
                    <div class="user-head">
                        <img :src="this.$store.getters.frsIconGet"/>
                    </div>
                    <span class="func-box" @click="this.$router.push('/register')">注 册</span>
                </div>
                <div class="input-there-box">
                    <input-box class="input-sub-item" v-model="eMail" title="邮箱" :length="32" inputType="text"/>
                    <input-box class="input-sub-item" v-model="userPwd" title="密码" :length="16" inputType="password"/>
                    <div class="CAPTCHA">
                        <input-box v-model="CAPTCHACode" title="验证码" :length="4" inputType="text"/>
                        <div class="CAPTCHA-picture">
                            <div class="picture" @click="getVerification">
                                <img :src="'data:image/png;base64,' + CAPTCHACodeImage" alt="验证码" title="点击刷新"/>
                            </div>
                        </div>
                    </div>
                    <div class="account-func">
                        <div class="rember-me">
                            <el-checkbox v-model="remberMe" label="记住我"/>
                        </div>
                        <span>忘记密码？</span>
                    </div>
                    <div class="confirm-div" @click="userLoginFunc">
                        <span v-if="!userLoginWorkNow">确认</span>
                        <i v-if="userLoginWorkNow" class="fas fa-circle-notch fa-spin"/>
                    </div>
                </div>
            </div>
        </div>
        <footer-bottom/>
    </div>
</template>
<script>
import inputBox from '@/components/inputBox.vue'
import footerBottom from '@/components/footerBottom.vue'
import { ElMessage , ElMessageBox , ElNotification } from 'element-plus'
import { verificationGet , userLogin , userLognState } from '@/util/api.js'
export default {
    components: { footerBottom , inputBox },
    data(){
        return{
            spanStyleAdd: 0,
            eMail: '',
            userPwd: '',
            CAPTCHACode:'',
            remberMe: false,
            verificationRandomCode: '',  //获取验证码图片时候的随机数
            CAPTCHACodeImage: '', //从后台获取的验证码图片 base64
            userLoginWorkNow: false
        }
    },
    async created(){
        this.getVerification()
    },
    methods:{
        randomGet(length , limit){
            let randomNumber = ''
            for(let i = 0;i < length;i++){
                randomNumber += Math.round(Math.random() * limit)
            }
            return randomNumber
        },
        getVerification(){
            let randomNum = this.randomGet(6,9)
            this.verificationRandomCode = randomNum
            verificationGet({random: randomNum} , 'login').then(resq => {
                if(resq.flag){
                    this.CAPTCHACodeImage = resq.data
                } else {
                    ElMessage.error(resq.message)
                }
            }).catch(err => {
                ElMessage.error('获取验证码出错！' + err)
            })
        },
        checkMail(mail){
            const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
            return regEmail.test(mail)
        },
        userLoginFunc(){
            if(!this.userLoginWorkNow){
                this.userLoginWorkNow = true
                if(this.eMail !== '' && this.userPwd !== '' && this.CAPTCHACode !== ''){
                    if(this.checkMail(this.eMail)){
                        userLogin({mail: this.eMail,password: this.userPwd,verifyCode: this.CAPTCHACode,random: this.verificationRandomCode}).then(resq => {
                            if(resq.flag){
                                if(this.remberMe){
                                    localStorage.setItem('token',resq.data.token)
                                } else {
                                    sessionStorage.setItem('token',resq.data.token)
                                }
                                ElMessageBox.alert(resq.message, '提示', { confirmButtonText: 'OK', callback: () => {
                                    this.$router.push('/')
                                    userLognState().then(resq => {
                                        if(resq.flag){
                                            this.$store.commit('userInfoSet', resq.data)
                                        } else {
                                            ElNotification({title: '提示',message: resq.message ,type: 'warning'})
                                            this.$store.commit('userInfoSet',null)
                                            sessionStorage.removeItem('token')
                                        }
                                    }).catch(err => {
                                        ElNotification({title: '错误',message: '用户状态验证接口出错！' + err,type: 'error'})
                                        this.$store.commit('userInfoSet',null)
                                        sessionStorage.removeItem('token')
                                    })
                                }})
                                this.userLoginWorkNow = false
                                this.CAPTCHACode = ''
                            } else {
                                ElMessage.error(resq.message)
                                this.CAPTCHACode = ''
                                this.getVerification()
                                this.userLoginWorkNow = false
                            }
                        }).catch(err => {
                            ElMessage.error('登录过程中发生错误！ ' + err)
                            this.CAPTCHACode = ''
                            this.getVerification()
                            this.userLoginWorkNow = false
                        })
                    } else {
                        ElMessage({message: '邮箱不合法！请重新确认',type: 'warning'})
                        this.userLoginWorkNow = false
                    }
                } else {
                    ElMessage({message: '填写的信息有空白，请检查！',type: 'warning'})
                    this.userLoginWorkNow = false
                }
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.login-box
{
    width: 100%;
    background-repeat: no-repeat;
    background-position: top;
    background-size: cover;
    .center-box
    {
        width: 100%;
        margin: 5rem 0;
        display: flex;
        justify-content: center;
        align-items: center;
        .login-window
        {
            display: flex;
            align-content: flex-start;
            flex-wrap: wrap;
            background-color: rgba(255,255,255,0.85);
            overflow: hidden;
            .title
            {
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
                .user-head
                {
                    padding: 1rem 0;
                    img
                    {
                        width: 3rem;
                        min-width: 3rem;
                        height: 3rem;
                    }
                }
                .func-box
                {
                    width: 3rem;
                    padding: 0.2rem 0;
                    background-color: #54aff9;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 0.6rem;
                    color: #ffffff;
                    text-align: center;
                    cursor: pointer;
                }
            }
            .input-there-box
            {
                width: 100%;
                display: flex;
                justify-content: center;
                align-content: flex-start;
                flex-wrap: wrap;
                position: relative;
                .CAPTCHA
                {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                    ::v-deep(.input-box)
                    {
                        width: 45%;
                    }
                    .CAPTCHA-picture
                    {
                        width: 50%;
                        height: 1.5rem;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        .picture
                        {
                            height: 100%;
                            width: 80%;
                            display: flex;
                            align-items: center;
                            cursor: pointer;
                            img
                            {
                                height: 100%;
                                max-height: 100%;
                            }
                        }
                    }
                    .CAPTCHA-send
                    {
                        width: 50%;
                        height: 1.5rem;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        border-radius: 0.8rem;
                        background-color: #b3d8ff;
                        transition: all 0.3s;
                        cursor: pointer;
                        .info-span
                        {
                            height: 1.5rem;
                            margin-left: 0;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            text-align: center;
                            font-size: 0.55rem;
                            color: #3399ff;
                        }
                        i
                        {
                            color: #3399ff;
                        }
                    }
                    .CAPTCHA-send:hover
                    {
                        .info-span , i
                        {
                            color: #ffffff;
                        }
                        background-color: #409eff;
                    }
                }
                .confirm-div
                {
                    height: 1.5rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin: 1rem 0;
                    background-color: #b3d8ff;
                    transition: all 0.3s;
                    border-radius: 0.8rem;
                    cursor: pointer;
                    border: solid 0.05rem rgba(0, 0, 0, 0.2);
                    span , i
                    {
                        height: 100%;
                        display: flex;
                        align-items: center;
                        color: #3399ff;
                        transition: all 0.3s;
                    }
                    span
                    {
                        font-size: 0.7rem;
                        letter-spacing: 0.05rem;
                    }
                    i
                    {
                        font-size: 0.8rem;
                    }
                }
                .confirm-div:hover
                {
                    background-color: #409eff;
                    span , i
                    {
                        color: white;
                    }
                }
                .account-func
                {
                    display: flex;
                    height: 1.5rem;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: 1rem;
                    span
                    {
                        height: 100%;
                        display: flex;
                        align-items: center;
                        font-size: 0.55rem;
                        text-decoration: underline;
                        cursor: pointer;
                        transition: all 0.3s;
                    }
                    span:hover
                    {
                        color: red;
                    }
                    .rember-me
                    {
                        height: 100%;
                        ::v-deep(.el-checkbox-group)
                        {
                            height: 100%;
                        }
                        ::v-deep(.el-checkbox)
                        {
                            height: 100%;
                            display: flex;
                            align-items: center;
                            span
                            {
                                font-size: 0.55rem;
                            }
                        }
                    }
                }
            }
        }
    }
}
@media screen and (min-width:1400px)
{
    .login-box .center-box .login-window
    {
        width: 20rem;
        .input-there-box
        {
            .CAPTCHA , .input-sub-item , .confirm-div , .account-func
            {
                width: 60%;
            }
        }
    }
}
@media screen and (max-width:1400px) and (min-width:1200px)
{
    .login-box .center-box .login-window
    {
        width: 20rem;
        .input-there-box
        {
            .CAPTCHA , .input-sub-item , .confirm-div , .account-func
            {
                width: 60%;
            }
        }
    }
}
@media screen and (max-width:1200px) and (min-width:936px)
{
    .login-box .center-box .login-window
    {
        width: 20rem;
        .input-there-box
        {
            .CAPTCHA , .input-sub-item , .confirm-div , .account-func
            {
                width: 60%;
            }
        }
    }
}
@media screen and (max-width:936px) and (min-width:767px)
{
    .login-box .center-box .login-window
    {
        width: 75%;
        .input-there-box
        {
            .CAPTCHA , .input-sub-item , .confirm-div , .account-func
            {
                width: 80%;
            }
        }
    }
}
@media screen and (max-width:767px) and (min-width:676px)
{
    .login-box .center-box .login-window
    {
        width: 80%;
        .input-there-box
        {
            .CAPTCHA , .input-sub-item , .confirm-div , .account-func
            {
                width: 80%;
            }
        }
    }
}
@media screen and (max-width:676px)
{
    .login-box .center-box .login-window
    {
        width: 85%;
        .input-there-box
        {
            .CAPTCHA , .input-sub-item , .confirm-div , .account-func
            {
                width: 80%;
            }
        }
    }
}
</style>