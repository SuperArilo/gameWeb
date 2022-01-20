<template>
    <div class="personal-box">
        <div class="main-box">
            <div class="title-content">
                <span>个性设置</span>
                <i class="fas fa-feather-alt"/>
            </div>
            <div class="setting-content">
                <div class="sub-user-name-set-div">
                    <div class="user-name-describe">
                        <span>昵称：</span>
                        <input type="text" maxlength="8" v-model="userShowName"/>
                    </div>
                    <div class="describe">
                        <span>输入你的个性名称~</span>
                        <i class="fas fa-highlighter"/>
                    </div>
                </div>
                <div class="sub-user-name-set-div">
                    <div class="user-name-describe">
                        <span>签名：</span>
                        <input type="text" maxlength="8" v-model="userAutograph"/>
                    </div>
                    <div class="describe">
                        <span>输入你的个性签名~</span>
                        <i class="fas fa-info"/>
                    </div>
                </div>
            </div>
            <span class="line"></span>
            <div class="title-content">
                <span>头像设置</span>
                <i class="fas fa-laugh-wink"/>
            </div>
            <div class="setting-content">
                <div class="user-head-cropper">
                    <div class="user-head-show">
                        <img :src="userHead"/>
                        <span>x128</span>
                    </div>
                    <div class="user-head-show">
                        <img :src="userHead"/>
                        <span>x64</span>
                    </div>
                    <span class="upload-buttom" @click="showUploadWindow =! showUploadWindow">上传图片</span>
                </div>
                <my-upload v-model="showUploadWindow" field="img" @crop-success="cropSuccess" @crop-upload-success="cropUploadSuccess" @crop-upload-fail="cropUploadFail" :width="300" :height="300" url="/upload" :params="params" :headers="headers" img-format="png"/>
            </div>
            <span class="line"></span>
        </div>
    </div>
</template>
<script>
import { onMounted } from 'vue'
import myUpload from 'vue-image-crop-upload';
export default {
    components: {
		myUpload
	},
    data(){
        return{
            userShowName: '这次换你听歌',
            userAutograph: '单身狗，还我狗子！',
            userHead: require('@/views/icon/head/stranger18.jpg'),
            showUploadWindow: false,
			params: {
				token: '123456798',
				name: 'avatar'
			},
			headers: {
				smail: '*_~'
			},
			imgDataUrl: '' // the datebase64 url of created image
        }
    },
    created(){

    },
    mounted(){
        console.log(1)
    },
    methods:{
        cropSuccess(imgDataUrl, field){
            console.log('-------- crop success --------');
            this.imgDataUrl = imgDataUrl;
        },
        /**
         * upload success
         *
         * [param] jsonData   服务器返回数据，已进行json转码
         * [param] field
         */
        cropUploadSuccess(jsonData, field){
            console.log('-------- upload success --------');
            console.log(jsonData);
            console.log('field: ' + field);
        },
        /**
         * upload fail
         *
         * [param] status    server api return error status, like 500
         * [param] field
         */
        cropUploadFail(status, field){
            console.log('-------- upload fail --------');
            console.log(status);
            console.log('field: ' + field);
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
        .setting-content
        {
            width: 100%;
            display: flex;
            flex-direction: column;
            .sub-user-name-set-div
            {
                width: 100%;
                display: flex;
                flex-direction: column;
                margin: 0.3rem 0;
                .user-name-describe
                {
                    width: 100%;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    span
                    {
                        height: 100%;
                        display: flex;
                        align-items: center;
                        font-size: 0.6rem;
                    }
                    input
                    {
                        width: 10rem;
                        height: 1.3rem;
                        outline: none;
                        border: solid 0.05rem darkgray;
                        padding: 0 0.2rem;
                        border-radius: 0.2rem;
                        transition: all 0.3s;
                        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
                    }
                    input:focus
                    {
                        box-shadow: 0 0 0.3rem #3773f3;
                    }
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