<template>
    <div class="index-box" :style="{backgroundImage:`url(${this.$store.getters.indexBgGet})`}">
        <div class="center-top-inf">
            <div class="top-tips">
                <span class="title">闲言碎语</span>
                <div class="other-inf">
                    <span>2021-12-21</span>
                    <span>这次换你听歌</span>
                    <span>2篇灵感</span>
                </div>
            </div>
            <div class="lingan-div">
                <div class="sub-item render-by-edit">   
                </div>
            </div>
            <div class="edit-div">
                <span class="title-span">说点什么</span>
                <div class="render-edit" ref="dyEditTool"></div>
                <div class="buttom">
                    <div class="buttom-file" @click="dialogVisible = true">
                        <span>媒体文件管理</span>
                    </div>
                    <div class="button-confirm" @click="sendToServer">
                        <span v-if="!isSendToServerWorkNow">发布</span>
                        <i v-else class="fas fa-circle-notch fa-spin"/>
                    </div>
                </div>
            </div>
            <div class="show-message-div">
                <span class="title-span">留言合集</span>
                <div class="message-content">
                    <transition-group name="list">
                        <div class="sub-message-item" v-for="item in messageContent" :key="item.id">
                            <div class="left-head" v-if="!this.$store.getters.isPhoneGet">
                                <img :src="item.user.userhead"/>
                            </div>
                            <div class="right-content" :style="[this.$store.getters.isPhoneGet ? '':'margin-left: 1rem;', {borderLeft: `solid 0.2rem ${item.user.classColor}`,borderRight: `solid 0.2rem ${item.user.classColor}`}]">
                                <div v-if="this.$store.getters.isPhoneGet" class="mobile-box">
                                    <div class="user-head">
                                        <img :src="item.user.userhead"/>
                                    </div>
                                    <span class="user-name">{{item.user.nickname}}</span>
                                </div>
                                <div class="show-content render-by-edit" v-html="item.content"></div>
                                <div class="show-who">
                                    <div v-if="!this.$store.getters.isPhoneGet">
                                        <span>{{item.user.nickname}} 留言</span>
                                    </div>
                                    <div>
                                        <i class="far fa-calendar-alt"></i>
                                        <span style="margin-left: 0.3rem;">{{item.createTime}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </transition-group>
                </div>
            </div>
            <el-pagination background layout="prev, pager, next" :page-size="pageSize" :total="totalCount" @current-change="pageChange" v-model:currentPage="currentPage" :small="this.$store.getters.isPhoneGet" style="margin: 0.5rem 0;"/>
        </div>
        <el-dialog v-model="dialogVisible" :lock-scroll="false" :close-on-click-modal="false" :close-on-press-escape="false">
            <media-file v-if="dialogVisible" @closeWindow="closeWindow" @imageIntoEdit="imageIntoEdit"/>
        </el-dialog>
        <footer-bottom></footer-bottom>
    </div>
</template>
<script>
import { uploadImage , userMessageGet , userSendMessage } from '@/util/api.js'
import footerBottom from '@/components/footerBottom.vue'
import mediaFile from '@/components/dynamic/mediaFile.vue'
import { ElMessage } from 'element-plus'
export default {
  components: { footerBottom , mediaFile },
    data(){
        return{
            userContent: '',
            editor: null,
            dialogVisible: false,
            pageSize: 8,
            currentPage: 1,
            totalCount: null,
            isSendToServerWorkNow: false,
            messageContent: [],
            
        }
    },
    created(){
        this.getUserMessage()
    },
    mounted(){
        const editor = new wangEditor(this.$refs.dyEditTool)
        editor.config.showLinkImg = false
        editor.config.focus = false
        editor.config.uploadImgMaxLength = 4
        editor.config.menus = [
            'head',
            'bold',
            'fontSize',
            'italic',
            'underline',
            'strikeThrough',
            'indent',
            'lineHeight',
            'foreColor',
            'backColor',
            'link',
            'list',
            'justify',
            'quote',
            'emoticon',
            'table',
            'splitLine',
            'image',
            'video',
        ]
        editor.config.onchange = (newHtml) => {
            this.userContent = newHtml
        }
        editor.config.customUploadImg = (resultFiles) => {
            let data = new FormData()
            resultFiles.forEach(item => {
                data.append('imageFiles',item)
            })
            data.append('uid', this.$store.getters.userInfoGet.uid)
            uploadImage(data).then(resq => {
                if(resq.flag){
                    resq.data.forEach(item => {
                        editor.cmd.do('insertHTML', '<img src="' + item.mediaHttpUrl + '" width="100" "/>')
                    })
                    ElMessage({type: 'success', message: resq.message})
                } else {
                    ElMessage.error(resq.message)
                }
            }).catch(err => {
                ElMessage.error('上传图片过程中发生错误！ ' + err)
            })
        }
        editor.create()
        this.editor = editor
    },
    methods:{
        closeWindow(value){
            this.dialogVisible = value
        },
        imageIntoEdit(value){
            this.dialogVisible = false
            value.forEach(key =>{
                this.editor.cmd.do('insertHTML', '<img src="' + key.url + '" width="100"/>')
            })
        },
        pageChange(e){
            this.currentPage = e
        },
        getUserMessage(){
            userMessageGet({pageNumber: this.currentPage,pageSize: this.pageSize}).then(resq => {
                if(resq.code === 200){
                    this.totalCount = resq.data.totalCount
                    this.messageContent = resq.data.list
                } else {
                    ElMessage.error('获取评论发生错误！ ' + resq.message)
                }
            }).catch(err => {
                ElMessage.error('获取评论发生错误！ ' + err)
            })
        },
        sendToServer(){
            if(!this.isSendToServerWorkNow){
                this.isSendToServerWorkNow = true
                if(this.userContent !== ''){
                    userSendMessage({content: this.userContent}).then(resq => {
                        if(resq.code === 200){
                            ElMessage.success(resq.message)
                            this.userContent = ''
                            this.getUserMessage()
                        }
                        this.isSendToServerWorkNow = false
                    })
                } else {
                    ElMessage.info('留言信息为空白哦！')
                    this.isSendToServerWorkNow = false
                }
            }
        }
    },
    unmounted() {
        this.editor.destroy()
        this.editor = null
    }
}
</script>
<style lang="scss" scoped>
.index-box
{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: wrap;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: top;
    background-size: cover;
    .center-top-inf
    {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-wrap: wrap;
        background-color: #ffffffd3;
        .top-tips
        {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            .title
            {
                font-size: 1rem;
                text-align: center;
            }
            .other-inf
            {
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 0.5rem;
                span
                {
                    font-size: 0.6rem;
                    color: #7c8188;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin: 0 0.25rem;
                }
            }
        }
        .lingan-div
        {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            flex-wrap:wrap;
            .sub-item
            {
                width: 100%;
                border-left: solid 0.15rem #b1bbd4;
                margin: 0.2rem 0 0.2rem 0;
                padding: 0 0.5rem;
            }
        }
        .edit-div , .show-message-div 
        {
            .title-span
            {
                width: 100%;
                display: flex;
                flex-direction: column;
                font-size: 0.9rem;
                border-bottom: dashed 0.06rem darkgray;
                position: relative;
                padding: 0.3rem 0 0.3rem 0;
            }
            .title-span::after
            {
                content: "";
                position: absolute;
                display: block;
                width: 2rem;
                height: 0.15rem;
                left: 0;
                bottom: -0.06rem;
                border-radius: 0.1rem;
                background-color: #807fe2;
            }
        }
        .edit-div
        {
            width: 100%;
            display: flex;
            align-content: flex-start;
            flex-wrap: wrap;
            .render-edit
            {
                width: 100%;
            }
            ::v-deep(.w-e-toolbar)
            {
                z-index: 400 !important;
            }
            ::v-deep(.w-e-text-container)
            {
                z-index: 399 !important;
            }
            ::v-deep(i)
            {
                font-size: 0.6rem !important;
            }
            ::v-deep(.w-e-menu-tooltip)
            {
                font-size: 0.6rem;
            }
            ::v-deep(.w-e-up-btn)
            {
                width: 100%;
            }
            .buttom
            {
                width: 100%;
                display: flex;
                justify-content: space-between;
                margin: 1rem 0;
                span , i
                {
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s;
                }
                span
                {
                    font-size: 0.6rem;
                }
                i
                {
                    font-size: 0.8rem;
                }
                .button-confirm
                {
                    background-color: #b3d8ff;
                    border: solid 0.05rem #409eff;
                    color: #3399ff;
                }
                .buttom-file
                {
                    background-color: #8db0b9;
                    color: #ffffff;
                    border: solid 0.05rem #6c888f;
                }
                .buttom-file:hover
                {
                    background-color: #407e8d;
                }
                .button-confirm , .buttom-file
                {
                    width: 4rem;
                    height: 1.5rem;
                    transition: all 0.3s;
                    border-radius: 0.2rem;
                    transition: all 0.3s;
                    cursor: pointer;
                }
                .button-confirm:hover
                {
                    background-color: #409eff;
                    span , i
                    {
                        color: white;
                    }
                }
            }
        }
        .show-message-div
        {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            flex-wrap: wrap;
            .message-content
            {
                width: 100%;
                display: flex;
                align-content: flex-start;
                flex-wrap: wrap;
                .list-enter-from , .list-leave-to
                {
                    opacity: 0;
                    transform: translateY(1rem);
                }
                .list-leave-active
                {
                    position: absolute;
                }
                .sub-message-item
                {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin: 0.5rem 0;
                    transition: all 0.3s;
                    .left-head
                    {
                        width: 2.5rem;
                        min-width: 2.5rem;
                        height: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: flex-start;
                        img
                        {
                            border-radius: 50%;
                            box-shadow: -0.01rem 0.01rem 0.2rem black;
                        }
                    }
                    .right-content
                    {
                        width: 100%;
                        height: 100%;
                        border-left: solid 0.2rem #807fe2;
                        border-right: solid 0.2rem #807fe2;
                        background-color: rgba(255,255,255,0.7);
                        box-shadow: 0 0.1rem 0.8rem -0.6rem black;
                        padding: 0 0.3rem;
                        .mobile-box
                        {
                            width: 100%;
                            display: flex;
                            justify-content: flex-start;
                            align-items: center;
                            margin: 0.3rem 0;
                            .user-head
                            {
                                height: 2rem;
                                width: 2rem;
                                border-radius: 50%;
                                overflow: hidden;
                                img
                                {
                                    max-height: 100%;
                                }
                            }
                            .user-name
                            {
                                font-size: 0.6rem;
                                margin-left: 0.5rem;
                            }
                        }
                        .show-content
                        {
                            width: 100%;
                            min-height: 1rem;
                            word-break: break-all;
                            letter-spacing: 0.03rem;
                        }
                        .show-who
                        {
                            width: 100%;
                            height: 1.5rem;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            div
                            {
                                height: 100%;
                                display: flex;
                                align-items: center;
                                span , i
                                {
                                    display: flex;
                                    align-items: center;
                                    height: 100%;
                                }
                                i
                                {
                                    font-size: 0.7rem;
                                }
                                span
                                {
                                    font-size: 0.55rem;
                                    color: #757575;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    ::v-deep(.el-dialog__body)
    {
        padding: 0;
    }
    ::v-deep(.el-dialog__header)
    {
        display: none;
    }
}
@media screen and (min-width:1400px)
{
    .index-box
    {
        .center-top-inf
        {
            width: 60%;
            padding: 1.5rem 1rem 1rem 1rem;
            margin: 2rem 0 2rem 0;
        }
        ::v-deep(.el-dialog)
        {
            width: 35rem;
        }
    }
}
@media screen and (max-width:1400px) and (min-width:1200px)
{
    .index-box
    {
        .center-top-inf
        {
            width: 65%;
            padding: 1.5rem 1rem 1rem 1rem;
            margin: 2rem 0 2rem 0;
        }
        ::v-deep(.el-dialog)
        {
            width: 35rem;
        }
    }
}
@media screen and (max-width:1200px) and (min-width:936px)
{
    .index-box
    {
        .center-top-inf
        {
            width: 70%;
            padding: 1.5rem 0.8rem 0.8rem 0.8rem;
            margin: 2rem 0 2rem 0;
        }
        ::v-deep(.el-dialog)
        {
            width: 35rem;
        }
    }
}
@media screen and (max-width:936px) and (min-width:767px)
{
    .index-box
    {
        .center-top-inf
        {
            width: 100%;
            padding: 1.5rem 0.5rem 1rem 0.5rem;
        }
        ::v-deep(.el-dialog)
        {
            width: 90%;
        }
    }
}
@media screen and (max-width:767px) and (min-width:676px)
{
    .index-box
    {
        .center-top-inf
        {
            width: 100%;
            padding: 1.5rem 0.5rem 1rem 0.5rem;
        }
        ::v-deep(.el-dialog)
        {
            width: 90%;
        }
    }
}
@media screen and (max-width:676px)
{
    .index-box
    {
        .center-top-inf
        {
            width: 100%;
            padding: 1.5rem 0.5rem 1rem 0.5rem;
        }
        ::v-deep(.el-dialog)
        {
            width: 90%;
        }
    }
}
</style>