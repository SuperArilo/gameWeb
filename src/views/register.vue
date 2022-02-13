<template>
    <div class="register-box" :style="{backgroundImage:`url(${this.$store.getters.indexBgGet})`}">
        <div class="center-box">
            <div class="login-window">
                <div class="title">
                    <span class="func-box" @click="this.$router.push('/')">首 页</span>
                    <div class="user-head">
                        <img :src="this.$store.getters.frsIconGet"/>
                    </div>
                    <span class="func-box" @click="this.$router.push('/login')">登 录</span>
                </div>
                <div class="input-there-box">
                    <input-box class="input-sub-item" v-model="eMail" title="邮箱" :length="32" inputType="text"/>
                    <input-box class="input-sub-item" v-model="userPwd" title="密码" :length="16" inputType="password"/>
                    <input-box class="input-sub-item" v-model="userPwdAgain" title="再次输入密码" :length="16" inputType="password"/>
                    <div class="CAPTCHA">
                       <input-box v-model="eMailPwd" title="邮箱验证码" :length="6" inputType="text"/>
                        <div class="CAPTCHA-send" @click="sendToUserEmail">
                            <span v-if="!isClickSend && !isSendCounted" class="info-span">发送验证码</span>
                            <i v-if="isClickSend" class="fas fa-circle-notch fa-spin"/>
                            <span v-if="isSendCounted" class="info-span">{{timeCount}} 秒</span>
                        </div>
                    </div>
                    <div class="CAPTCHA">
                        <input-box v-model="CAPTCHACode" title="验证码" :length="6" inputType="text"/>
                        <div class="CAPTCHA-picture">
                            <div class="picture" @click="getVerification">
                                <img :src="'data:image/png;base64,' + CAPTCHACodeImage" alt="验证码" title="点击刷新"/>
                            </div>
                        </div>
                    </div>
                    <div class="confirm-div" @click="sendToServerRegister">
                        <span v-if="!isSendToServerRegisterWorkNow">确认</span>
                        <i v-if="isSendToServerRegisterWorkNow" class="fas fa-circle-notch fa-spin"/>
                    </div>
                </div>
            </div>
        </div>
        <footer-bottom/>
    </div>
</template>
<script>
import { ElNotification , ElMessage , ElMessageBox } from 'element-plus'
import inputBox from '@/components/inputBox.vue'
import footerBottom from '@/components/footerBottom.vue'
import { verificationGet , sendMailCode , userRegister } from '@/util/api.js'
export default {
    components: { footerBottom , inputBox },
    data(){
        return{
            spanStyleAdd: 0,
            eMail: '', //注册邮箱
            eMailPwd: '',  //邮箱验证码
            userPwd: '',  //注册密码
            userPwdAgain: '',  //注册确认密码
            remberMe:[],  //记住我选项
            CAPTCHACode:'',  //用户输入的验证码
            CAPTCHACodeImage: '', //从后台获取的验证码图片 base64
            timeCount: 60,  //邮箱获取计数
            isClickSend: false,
            isSendCounted: false,
            timeInterval: null,
            verificationRandomCode: '',  //获取验证码图片时候的随机数
            isSendToServerRegisterWorkNow: false,
        }
    },
    async created(){
        this.getVerification()
    },
    mounted(){
        
    },
    methods:{
        sendToUserEmail(){
            if(this.eMail !== ''){
                if(this.checkMail(this.eMail)){
                    if(!this.isClickSend && !this.isSendCounted){
                        this.isClickSend = true
                        let serverData = new FormData()
                        serverData.append('to' , this.eMail)
                        sendMailCode(serverData).then(resq => {
                            if(resq.flag){
                                this.isClickSend = false
                                ElNotification({ title: '成功', message: resq.message , type: 'success', })
                                this.isSendCounted = true
                                this.timeInterval = setInterval(() => {
                                    if(this.timeCount <= 60 && this.timeCount > 0){
                                        this.timeCount--
                                    } else {
                                        clearInterval(this.timeInterval)
                                        this.timeCount = 60
                                        this.isSendCounted = false
                                    }
                                },1000)
                            }
                        }).catch(err => {
                            ElMessage.error('发送邮箱验证码时候发生错误！ ' + err)
                        })
                    }
                } else {
                    ElMessage({message: '邮箱不合法！请重新确认',type: 'warning'})
                }
            } else {
                ElNotification({title: '提示',message: '邮箱不能为空！', type: 'warning'})
            }
        },
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
            verificationGet({random: randomNum} , 'register').then(resq => {
                if(resq.flag){
                    this.CAPTCHACodeImage = resq.data
                } else {
                    ElMessage.error(resq.message)
                }
            }).catch(err => {
                ElMessage.error('获取验证码发生错误！ ' + err)
            })
        },
        checkMail(mail){
            const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
            return regEmail.test(mail)
        },
        sendToServerRegister(){
            if(!this.isSendToServerRegisterWorkNow){
                this.isSendToServerRegisterWorkNow = true
                if(this.eMail !== '' && this.userPwd !== '' && this.userPwdAgain !== '' && this.eMailPwd !== '' && this.CAPTCHACode !== ''){
                    if(this.checkMail(this.eMail)){
                        if(this.userPwd === this.userPwdAgain){
                            this.isSendToServerRegisterWorkNow = true
                            userRegister({mail: this.eMail,password: this.userPwd,confirm: this.userPwdAgain,mailVerifyCode: this.eMailPwd,verifyCode: this.CAPTCHACode,random: this.verificationRandomCode}).then(resq => {
                                if(resq.flag){
                                    ElMessageBox.alert(resq.message, '提示', { confirmButtonText: 'OK', callback: () => {
                                        this.$router.push('/login')
                                    }})
                                    this.CAPTCHACode = ''
                                } else {
                                    ElMessage({message: resq.message,type: 'warning'})
                                    this.CAPTCHACode = ''
                                    this.isSendToServerRegisterWorkNow = false
                                }
                            }).catch(err => {
                                ElMessage.error('注册时发生错误！ ' + err)
                                this.CAPTCHACode = ''
                                this.isSendToServerRegisterWorkNow = false
                            })
                        } else {
                            ElMessage({message: '两次输入的密码不一致，请检查！',type: 'warning'})
                            this.isSendToServerRegisterWorkNow = false
                        }
                    } else {
                        ElMessage({message: '邮箱不合法！请重新确认',type: 'warning'})
                        this.isSendToServerRegisterWorkNow = false
                    }
                } else {
                    ElMessage({message: '填写的信息有空白，请检查！',type: 'warning'})
                    this.isSendToServerRegisterWorkNow = false
                }
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.register-box
{
    width: 100%;
    background-repeat: no-repeat;
    background-position: top;
    background-size: cover;
    .center-box
    {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 5rem 0;
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
                .CAPTCHA
                {
                    display: flex;
                    align-items: flex-end;
                    justify-content: space-between;
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
                    box-shadow: 0 0 0.1rem black;
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
            }
        }
    }
}
@media screen and (min-width:1400px)
{
    .register-box .center-box .login-window
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
    .register-box .center-box .login-window
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
    .register-box .center-box .login-window
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
    .register-box .center-box .login-window
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
    .register-box .center-box .login-window
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
    .register-box .center-box .login-window
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