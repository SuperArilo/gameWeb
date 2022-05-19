<template>
    <div class="index-box" :style="{backgroundImage:`url(${this.$store.getters.indexBgGet})`}">
        <div class="center-top-inf">
            <div class="top-tips">
                <span class="title">闲言碎语</span>
            </div>
            <div class="lingan-div render-by-edit" v-html="linshi"/>
            <div class="edit-div" v-if="this.$store.getters.userInfoGet !== null">
                <span class="title-span">说点什么</span>
                <editor @sendData="sendDataTo" :status="isSendToServerWorkNow" :isClearContent="isClearContent"/>
            </div>
            <div class="show-message-div">
                <span class="title-span">留言合集</span>
                <transition name="list">
                    <div class="message-empty" v-if="this.messageContent.length === 0">
                        <span v-if="this.getMessageStatus === false">加载失败！</span>
                        <span v-else-if="this.messageContent.length === 0 && this.getMessageStatus === true">当前没有留言消息哦！</span>
                        <i class="fas" :style="[this.getMessageStatus === null ? 'color: #3773f3;':'']" :class="[{'fa-circle-notch fa-spin' : this.getMessageStatus === null}, {'fa-exclamation-triangle' : this.getMessageStatus === false}, {'fa-inbox' : this.messageContent.length === 0 && this.getMessageStatus === true}]"/>
                    </div>
                </transition>
                <transition name="list">
                    <div class="message-content" v-if="this.messageContent.length !== 0" v-loading="this.messageContent.length === 0">
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
                                    <div class="show-content render-by-edit" v-html="item.content" @click="previewImg($event)"></div>
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
                </transition>
            </div>
            <el-pagination background layout="prev, pager, next" :page-size="pageSize" :total="totalCount" @current-change="pageChange" v-model:currentPage="currentPage" :small="this.$store.getters.isPhoneGet" style="margin: 0.5rem 0;" v-if="this.messageContent.length !== 0"/>
        </div>
        <footer-bottom/>
    </div>
</template>
<script>
import { userMessageGet , userSendMessage } from '@/util/api.js'
import footerBottom from '@/components/footerBottom.vue'
import editor from '@/components/editor.vue'
import { ElMessage } from 'element-plus'
import ImgViewr, { showImages } from 'vue-img-viewr'
import 'vue-img-viewr/styles/index.css'
export default {
  components: { footerBottom , ImgViewr , editor },
    data(){
        return{
            userContent: '',
            pageSize: 8,
            currentPage: 1,
            totalCount: null,
            getMessageStatus: null,
            isSendToServerWorkNow: false,
            isClearContent: false,
            messageContent: [],
            messageImageList:[],
            linshi: '<blockquote><p><font size="2"><span id="o67hj" style=""></span><b><i>我们所度过的每个平凡的日常，也许就是连续发生的奇迹&nbsp; &nbsp; &nbsp;&nbsp;</i></b></font><img src="https://www.itrong.love:4433/images/2022/02/23/c08551ad11a149e5a6fc9dd4aa4394f3.jpg" width="100" style="font-size: 24px;"/></p><p><font color="#46acc8">欢迎大家在这留下你的脚印</font></p><p><font color="#8baa4a">也欢迎大家提出您的宝贵建议</font></p></blockquote>'
        }
    },
    created(){
        this.getUserMessage()
    },
    methods:{
        pageChange(e){
            this.currentPage = e
            this.getUserMessage()
        },
        getUserMessage(){
            userMessageGet({pageNumber: this.currentPage,pageSize: this.pageSize}).then(resq => {
                if(resq.code === 200){
                    this.getMessageStatus = true
                    this.totalCount = resq.data.totalCount
                    this.messageContent = resq.data.list
                } else {
                    ElMessage({message: '获取留言发生错误！ ' + resq.message, type: 'error'})
                    this.getMessageStatus = false
                }
            }).catch(err => {
                this.getMessageStatus = false
                ElMessage({message: err.message, type: 'error'})
            })
        },
        sendToServer(){
            if(!this.isSendToServerWorkNow){
                this.isSendToServerWorkNow = true
                if(this.userContent !== ''){
                    userSendMessage({content: this.userContent}).then(resq => {
                        if(resq.code === 200){
                            this.isClearContent = true
                            ElMessage({message: resq.message, type: 'success'})
                            this.getUserMessage()
                        }
                        this.isSendToServerWorkNow = false
                    })
                } else {
                    ElMessage('留言信息为空白哦！')
                    this.isSendToServerWorkNow = false
                }
            }
        },
        previewImg(e){
            let grandpa = $(e.target).parent().parent()
            if(!grandpa.hasClass('w-e-text') && $(e.target).attr('src') !== undefined){
                let imageIndex
                grandpa.find('img').each((index,item) => {
                    if($(item).attr('src') === $(e.target).attr('src')){
                        imageIndex = index
                    }
                    this.messageImageList.push($(item).attr('src'))
                })
                showImages({urls: this.messageImageList,index: imageIndex, onClose: () => {
                    this.messageImageList = []
                }})
            }
        },
        sendDataTo(value){
            this.userContent = value
            this.isClearContent = false
            this.sendToServer()
        }
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
        }
        .lingan-div
        {
            width: 100%;
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
                min-height: 10rem;
                display: flex;
                align-content: flex-start;
                flex-wrap: wrap;
                position: relative;
                transition: all 0.4s;
                .sub-message-item
                {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin: 0.5rem 0;
                    transition: all 0.4s;
                    .left-head
                    {
                        width: 2.5rem;
                        height: 2.5rem;
                        min-width: 2.5rem;
                        display: flex;
                        justify-content: center;
                        align-items: flex-start;
                        border-radius: 50%;
                        box-shadow: -0.01rem 0.01rem 0.2rem black;
                        overflow: hidden;
                        img
                        {
                            width: 100%;
                            height: 100%;
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
                                    font-size: 0.6rem;
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
            .message-empty
            {
                width: 100%;
                height: 12rem;
                display: flex;
                justify-content: center;
                align-items: center;
                transition: all 0.4s;
                span , i
                {
                    height: 100%;
                    display: flex;
                    align-items: center;
                }
                span
                {
                    font-size: 0.7rem;
                }
                i
                {
                    font-size: 0.8rem;
                }
            }
            .list-enter-from , .list-leave-to
            {
                opacity: 0;
                transform: translateY(1rem);
            }
            .list-leave-active
            {
                position: absolute;
            }
        }
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
    }
}
</style>