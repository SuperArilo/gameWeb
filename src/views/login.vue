<template>
    <div class="login-box" :style="{backgroundImage:`url(${this.$store.getters.indexBgGet})`}">
        <div class="center-box">
            <div class="login-window">
                <div class="title">
                    <span class="func-box" @click="this.$router.push('/')">首 页</span>
                    <div class="user-head">
                        <img :src="this.$store.getters.userNoLoginGet"/>
                    </div>
                    <span class="func-box" @click="this.$router.push('/register')">注 册</span>
                </div>
                <div class="input-box">
                    <div class="input-sub-item">
                        <span :class="[{'span-style-actie' : spanStyleAdd === 1},{'span-move-active' : spanStyleAdd === 1 || eMail !== ''}]">邮箱</span>
                        <input type="text" maxlength="20" v-model="eMail" @focus="spanStyleAdd = 1" @blur="spanStyleAdd = 0" :style="eMail === '' ? 'background-color: transparent;':''"/>
                    </div>
                    <div class="input-sub-item">
                        <span :class="[{'span-style-actie' : spanStyleAdd === 2},{'span-move-active' : spanStyleAdd === 2 || userPwd !== ''}]">密码</span>
                        <input type="password" maxlength="16" v-model="userPwd" @focus="spanStyleAdd = 2" @blur="spanStyleAdd = 0" :style="userPwd === '' ? 'background-color: transparent;':''"/>
                    </div>
                    <div class="CAPTCHA">
                        <span :class="[{'span-style-actie' : spanStyleAdd === 3},{'span-move-active' : spanStyleAdd === 3 || CAPTCHACode !== ''}]">验证码</span>
                        <input type="text" maxlength="4" v-model="CAPTCHACode" @focus="spanStyleAdd = 3" @blur="spanStyleAdd = 0" :style="CAPTCHACode === '' ? 'background-color: transparent;':''"/>
                        <div class="CAPTCHA-picture">
                            <div class="picture" @click="getVerification">
                                <img :src="'data:image/png;base64,' + CAPTCHACodeImage" alt="验证码" title="点击刷新"/>
                            </div>
                        </div>
                    </div>
                    <div class="account-func">
                        <div class="rember-me">
                            <el-checkbox-group v-model="remberMe">
                                <el-checkbox label="记住我"/>
                            </el-checkbox-group>
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
import footerBottom from '@/components/footerBottom.vue'
import { ElMessage , ElMessageBox } from 'element-plus'
import { verificationGet , userLogin } from '@/util/api.js'
export default {
    components: { footerBottom },
    data(){
        return{
            spanStyleAdd: 0,
            eMail: '',
            userPwd: '',
            CAPTCHACode:'',
            remberMe:[],
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
                ElMessage.error('获取验证码发生错误！ ' + err)
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
                                ElMessageBox.alert(resq.message, '提示', { confirmButtonText: 'OK', callback: () => {} })
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
    background-attachment: fixed;
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
            background-color: #ffffff;
            border-radius: 1rem;
            overflow: hidden;
            .title
            {
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
                background-color: #bbdefb;
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
                .func-box:nth-child(1)
                {
                    border-radius: 0 0.6rem 0 0 ;
                }
                .func-box:nth-child(3)
                {
                    border-radius: 0.6rem 0 0 0 ;
                }
            }
            .input-box
            {
                width: 100%;
                display: flex;
                justify-content: center;
                align-content: flex-start;
                flex-wrap: wrap;
                .input-sub-item , .CAPTCHA
                {
                    height: 3rem;
                    display: flex;
                    position: relative;
                    align-items: flex-end;
                    flex-wrap: wrap;
                    span
                    {
                        height: 1.5rem;
                        margin-left: 0.5rem;
                        display: flex;
                        align-items: center;
                        justify-content: flex-start;
                        transition: all 0.4s;
                        color: darkgray;
                        position: absolute;
                        bottom: 0;
                        font-size: 0.55rem;
                    }
                    .span-style-actie
                    {
                        color: #3773f3;
                        font-size: 0.55rem;
                    }
                    .span-move-active
                    {
                        margin: 1.5rem 0;
                    }
                    input
                    {
                        height: 1.5rem;
                        outline: none;
                        border: solid 0.05rem darkgray;
                        padding: 0 0.5rem;
                        border-radius: 0.6rem;
                        transition: all 0.3s;
                        font-size: 0.6rem;
                        position: relative;
                        z-index: 10;
                    }
                    input:focus
                    {
                        border: solid 0.05rem #3773f3;
                        border-radius: 0.2rem;
                    }
                }
                .input-sub-item
                {
                    justify-content: flex-start;
                    span
                    {
                        width: 100%;
                    }
                    input
                    {
                        width: 100%;
                    }
                }
                .CAPTCHA
                {
                    justify-content: space-between;
                    input
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
        .input-box
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
        .input-box
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
        .input-box
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
        width: 90%;
        .input-box
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
        width: 90%;
        .input-box
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
        width: 90%;
        .input-box
        {
            .CAPTCHA , .input-sub-item , .confirm-div , .account-func
            {
                width: 80%;
            }
        }
    }
}
</style>