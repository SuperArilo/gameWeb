<template>
    <div class="personal-box">
        <div class="main-box">
            <div class="title-content">
                <span>个性设置</span>
                <i class="fas fa-feather-alt"/>
            </div>
            <div class="setting-content" v-loading="this.$store.getters.userInfoGet === null">
                <div class="sub-user-name-set-div" v-if="this.$store.getters.userInfoGet !== null">
                    <input-box class="input-sub-item" v-model="nickName" title="昵称" :length="16" inputType="text" @blur="sendToServer"/>
                    <div class="describe">
                        <span>输入你的个性名称~</span>
                        <i class="fas fa-highlighter"/>
                    </div>
                </div>
                <div class="sub-user-name-set-div" v-if="this.$store.getters.userInfoGet !== null">
                    <input-box class="input-sub-item" v-model="personalizedSignature" title="签名" :length="32" inputType="text"/>
                    <div class="describe">
                        <span>输入你的个性签名~</span>
                        <i class="fas fa-info"/>
                    </div>
                </div>
            </div>
            <div class="buttom-box">
                <div class="comfirm-buttom" @click="sendToServer">
                    <i v-if="isSendToServerWorkNow" class="fas fa-circle-notch fa-spin"/>
                    <span v-else>提交</span>
                </div>
            </div>
            <span class="line"></span>
            <div class="title-content">
                <span>头像设置</span>
                <i class="fas fa-laugh-wink"/>
            </div>
            <div class="setting-content" v-loading="this.$store.getters.userInfoGet === null">
                <div class="user-head-cropper" v-if="this.$store.getters.userInfoGet !== null">
                    <div class="user-head-show">
                        <img :src="this.$store.getters.userInfoGet.userhead"/>
                        <span>x128</span>
                    </div>
                    <div class="user-head-show">
                        <img :src="this.$store.getters.userInfoGet.userhead"/>
                        <span>x64</span>
                    </div>
                    <span class="upload-buttom" @click="showUploadWindow =! showUploadWindow">上传图片</span>
                </div>
                <my-upload v-model="showUploadWindow" field="headerFile" @crop-success="cropSuccess" @crop-upload-success="cropUploadSuccess" @crop-upload-fail="cropUploadFail" url="https://www.itrong.love:1234/api/user/header/upload" :headers="headers" img-format="png"/>
            </div>
            <span class="line"></span>
        </div>
        <footer-bottom/>
    </div>
</template>
<script>
import inputBox from '@/components/inputBox.vue'
import footerBottom from '@/components/footerBottom.vue'
import myUpload from 'vue-image-crop-upload'
import { ElMessage } from 'element-plus'
import { userModifyInfo } from '@/util/api.js'
export default {
    components: {
		myUpload,footerBottom , inputBox
	},
    data(){
        return{
            showUploadWindow: false,
			headers: {
				token: ''
			},
            isSendToServerWorkNow: false,
            nickName: this.$store.getters.userInfoGet === null ? '' : this.$store.getters.userInfoGet.nickname,
            personalizedSignature: this.$store.getters.userInfoGet === null ? '' : this.$store.getters.userInfoGet.personalizedSignature
        }
    },
    created(){
    },
    mounted(){
    },
    methods:{
        cropSuccess(imgDataUrl, field){
            this.headers.token = sessionStorage.getItem('token') === null ? (localStorage.getItem('token') !== null ? localStorage.getItem('token') : null) : sessionStorage.getItem('token')
        },
        cropUploadSuccess(jsonData, field){
            if(jsonData.flag){
                this.$store.getters.userInfoGet.userhead = jsonData.data.absolutePath
            } else {
                ElMessage.error('上传过程中发生错误！ ' + jsonData.messsage)
            }
        },
        cropUploadFail(status, field){
            ElMessage.error('上传过程中发生错误！ ' + field)
        },
        sendToServer(){
            if(!this.isSendToServerWorkNow){
                this.isSendToServerWorkNow = true
                if(this.nickName !== '' && this.personalizedSignature !== ''){
                    userModifyInfo({'nickname': this.nickName,'personalizedSignature': this.personalizedSignature}, this.$store.getters.userInfoGet.uid).then(resq => {
                        if(resq.flag){
                            ElMessage.success(resq.message)
                            this.$store.getters.userInfoGet.nickname = this.nickName
                            this.$store.getters.userInfoGet.personalizedSignature = this.personalizedSignature
                        } else {
                            ElMessage.error('请求过程中发生错误！' + resq.message)
                        }
                        this.isSendToServerWorkNow = false
                    }).catch(err => {
                        ElMessage.error('请求过程中发生错误！' + err)
                        this.isSendToServerWorkNow = false
                    })
                } else {
                    ElMessage.warning('输入的内容有空白！')
                    this.isSendToServerWorkNow = false
                }
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.personal-box
{
    width: 100%;
    display: flex;
    justify-content: center;
    align-content: flex-start;
    flex-wrap: wrap;
    .main-box
    {
        display: flex;
        align-content: flex-start;
        flex-wrap: wrap;
        margin: 0.5rem 0;
        .title-content
        {
            width: 100%;
            height: 1.5rem;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            span, i
            {
                height: 100%;
                display: flex;
                align-items: center;
            }
            span
            {
                font-size: 0.75rem;
                font-weight: bold;
                letter-spacing: 0.03rem;
            }
            i
            {
                font-size: 0.8rem;
                margin-left: 0.5rem;
            }
        }
        .line
        {
            width: 100%;
            height: 0.03rem;
            background-color: rgba(68, 68, 68, 0.473);
            margin: 0.3rem 0;
        }
        .buttom-box
        {
            width: 100%;
            display: flex;
            justify-content: flex-start;
            margin: 0.5rem 0;
            .comfirm-buttom
            {
                width: 4rem;
                height: 1.5rem;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                background-color: #b3d8ff;
                border: solid 0.05rem #409eff;
                border-radius: 0.2rem;
                transition: all 0.2s;
                span , i
                {
                    height: 100%;
                    display: flex;
                    align-items: center;
                    transition: all 0.2s;
                }
                span
                {
                    font-size: 0.6rem;
                    color: #3399ff;
                }
                i
                {
                    font-size: 0.8rem;
                }
            }
            .comfirm-buttom:hover
            {
                span , i
                {
                    color: white;
                }
                background-color: #409eff;
            }
        }
        .setting-content
        {
            width: 100%;
            display: flex;
            flex-direction: column;
            min-height: 2rem;
            .sub-user-name-set-div
            {
                width: 100%;
                display: flex;
                flex-direction: column;
                margin: 0.3rem 0;
                ::v-deep(.input-box)
                {
                    width: 10rem;
                }
                .describe
                {
                    height: 1.2rem;
                    display: flex;
                    align-items: center;
                    span
                    {
                        font-size: 0.55rem;
                    }
                    i
                    {
                        height: 100%;
                        display: flex;
                        align-items: center;
                        font-size: 0.6rem;
                        margin-left: 0.3rem;
                    }
                }
            }
            .user-head-cropper
            {
                width: 100%;
                display: flex;
                justify-content: flex-start;
                align-items: flex-end;
                margin: 0.5rem 0;
                .user-head-show
                {
                    display: flex;
                    justify-content: center;
                    flex-wrap: wrap;
                    margin-right: 1.5rem;
                    img
                    {
                        width: 100%;
                        border-radius: 50%;
                    }
                    span
                    {
                        width: 100%;
                        font-size: 0.55rem;
                        display: flex;
                        justify-content: center;
                        margin-top: 0.3rem;
                    }
                }
                .user-head-show:nth-child(1)
                {
                    width: 5rem;
                }
                .user-head-show:nth-child(2)
                {
                    width: 3rem;
                }
                .upload-buttom
                {
                    width: 4rem;
                    height: 1.5rem;
                    font-size: 0.6rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    background-color: #b3d8ff;
                    color: #3399ff;
                    border: solid 0.05rem #409eff;
                    border-radius: 0.2rem;
                    transition: all 0.2s;
                }
                .upload-buttom:hover
                {
                    color: white;
                    background-color: #409eff;
                }
            }
        }
    }
}
@media screen and (min-width:1400px)
{
    .personal-box .main-box
    {
        width: 70%;
    }
}
@media screen and (max-width:1400px) and (min-width:1200px)
{
    .personal-box .main-box
    {
        width: 70%;
    }
}
@media screen and (max-width:1200px) and (min-width:936px)
{
    .personal-box .main-box
    {
        width: 65%;
    }
}
@media screen and (max-width:936px) and (min-width:767px)
{
    .personal-box .main-box
    {
        width: 90%;
    }
}
@media screen and (max-width:767px) and (min-width:676px)
{
    .personal-box .main-box
    {
        width: 90%;
    }
}
@media screen and (max-width:676px)
{
    .personal-box .main-box
    {
        width: 90%;
    }
}
</style>