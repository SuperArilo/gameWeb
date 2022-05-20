<template>
    <div class="index-box" :style="{backgroundImage:`url(${this.$store.getters.indexBgGet})`}">
        <div class="talk-div" :style="this.$store.getters.isPhoneGet ? '':'border-radius: 0.5rem;'">
            <div class="talk-title">
                <div class="left-tips">
                    <span class="title-span">在线聊天</span>
                    <span class="des-span" style="margin: 0.5rem 0;">与在服务器里游玩的小伙伴一起聊天吧！</span>
                    <span class="des-span">连接可能会有稍许延迟，这是正常现象，请注意语言规范</span>
                </div>
                <div class="right-image">
                    <img :src="this.onlineTalkImage"/>
                </div>
            </div>
            <div class="talk-content" ref="talkContent" @scroll="talkContentScroll">
                <i class="fas fa-circle-notch refresh" :class="refreshShow ? 'refresh-is-loaded fa-spin':''" />
                <transition-group name="list">
                    <div v-for="(item,index) in chatContent" :key="index" :class="this.$store.getters.userInfoGet === null ? 'user-message-item-left' : this.$store.getters.userInfoGet.uid === item.uid ? 'user-message-item-right' : 'user-message-item-left'">
                    <!-- <div v-for="(item,index) in chatContent" :key="index" :class="this.$store.getters.userInfoGet.uid === item.uid ? 'user-message-item-right' : 'user-message-item-left'"> -->
                        <div class="user-head">
                            <img :src="item.type === 'minecraft' ? item.userhead : this.$store.getters.userInfoGet !== null ? this.$store.getters.userInfoGet.userhead : ''"/>
                        </div>
                        <div class="user-name-and-message">
                            <div class="user-name-box" :style="this.$store.getters.userInfoGet === null ? 'flex-flow: row;':this.$store.getters.userInfoGet.uid === item.uid ? 'flex-flow: row-reverse;' : 'flex-flow: row;'">
                                <!-- <span :style="this.$store.getters.userInfoGet.uid === item.uid ? 'margin-left:0.5rem;' : 'margin-right:0.5rem;'">{{item.nickname}}</span> -->
                                <span :style="this.$store.getters.userInfoGet === null ? 'margin-right:0.5rem;':this.$store.getters.userInfoGet.uid === item.uid ? 'margin-left:0.5rem;' : 'margin-right:0.5rem;'">{{item.nickname}}</span>
                                <span>MC ID：{{item.mcJavaId}}</span>
                            </div>
                            <span class="user-message">{{item.message}}</span>
                        </div>
                    </div>
                </transition-group>
            </div>
            <div class="talk-edit-div">
                <div class="talk-edit-func">
                    <i class="fas fa-smile-wink"/>
                </div>
                <textarea v-model="userWriteContent" class="talk-text"/>
                <div class="talk-submit">
                    <span class="button-clear" @click="userWriteContent = ''">清空</span>
                    <div class="button-confirm" @click="sentToServer">
                        <span v-if="!sentToServerStatu">发送</span>
                        <i v-if="sentToServerStatu" class="fas fa-circle-notch fa-spin"/>
                    </div>
                </div>
            </div>
        </div>
        <footer-bottom/>
    </div>
</template>
<script>
import FooterBottom from '@/components/footerBottom.vue'
import { ElNotification , ElMessage } from 'element-plus'
export default {
    components:{
        FooterBottom
    },
    data(){
        return{
            onlineTalkImage: 'http://image.superarilo.icu/onlineTalk.gif',
            refreshShow: false,
            userWriteContent: '',
            sentToServerStatu: false,
            onlineTalkUrl: 'ws://localhost:3090/api/onlinetalk/',
            websock: null,
            chatContent: []
        }
    },
    created(){
        // this.initWebSocket()
    },
    onMounted(){
        this.scrollToBottom()
    },
    methods:{
        talkContentScroll(e){
            if(e.target.scrollTop === 0){
                this.refreshShow = true
                setTimeout(() => {
                    this.refreshShow = false
                },2000)
            }
        },
        sentToServer(){
            if(!this.sentToServerStatu){
                this.sentToServerStatu = true
                if(this.$store.getters.userInfoGet !== null){
                    if(this.userWriteContent === ''){
                        ElNotification({title: '提示',message: '发送的信息不能为空！',type: 'info'})
                        this.sentToServerStatu = false
                        return
                    }
                    let messageContent = {uid: this.$store.getters.userInfoGet.uid, mcJavaId: this.$store.getters.userInfoGet.javaMcId, nickname: this.$store.getters.userInfoGet.nickname,  message: this.userWriteContent, type: 'web'}
                    this.websock.send(JSON.stringify(messageContent))
                    this.sentToServerStatu = false
                    this.scrollToBottom()
                    this.userWriteContent = ''
                } else {
                    ElMessage('您还未登陆！')
                }
            }
        },
        scrollToBottom(){
            this.$nextTick(()=>{
                this.$refs.talkContent.scrollTop = this.$refs.talkContent.scrollHeight
            })
        },
        async initWebSocket(){
            this.websock = new WebSocket(this.onlineTalkUrl + (sessionStorage.getItem('token') !== null ? sessionStorage.getItem('token') : localStorage.getItem('token') !== null ? localStorage.getItem('token') : 'null'))
            this.websock.onmessage = this.websocketOnMessage
            this.websock.onopen = this.websocketOnOpen
            this.websock.onerror = this.websocketOnError
            this.websock.onclose = this.websocketClose
        },
        websocketOnMessage(message){
            this.chatContent = this.chatContent.concat(JSON.parse(message.data))
            console.log(JSON.parse(message.data))
            this.scrollToBottom()
        },
        websocketOnOpen(){
            ElNotification({title: '在线聊天',message: '连接服务器成功！',type: 'success'})            
        },
        websocketOnError(){
            ElMessage({message: '连接到服务器出错！，此功能尚未开发完成！！！', type: 'error'})
        },
        websocketClose(){
        }
    },
    unmounted() {
        // this.websock.close()
    },
}
</script>
<style lang="scss" scoped>
.index-box
{
    width: 100%;
    display: flex;
    align-content: flex-start;
    justify-content: center;
    flex-wrap: wrap;
    background-repeat: no-repeat;
    background-position: top;
    background-size: cover;
    .talk-div
    {
        display: flex;
        align-content: flex-start;
        justify-content: center;
        flex-wrap: wrap;
        overflow: hidden;
        .talk-title
        {
            width: 100%;
            height: 8rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: rgba(126, 170, 204, 1);
            .left-tips
            {
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                padding: 0 1rem;
                .title-span
                {
                    font-size: 1.2rem;
                    color: #ffffff;
                    letter-spacing: 0.1rem;
                }
                .des-span
                {
                    font-size: 0.6rem;
                    color: #000000;
                    letter-spacing: 0.05rem;
                }
            }
            .right-image
            {
                min-width: 8rem;
                height: 8rem;
                img
                {
                    height: 100%;
                    width: 100%;
                    min-height: 100%;
                }
            }
        }
        .talk-content
        {
            width: 100%;
            height: 25rem;
            display: flex;
            align-content: flex-start;
            flex-wrap: wrap;
            overflow-y: scroll;
            overflow-x: hidden;
            background-color: rgba(250, 250, 250 , 0.9);
            .refresh
            {
                width: 100%;
                height: 2rem;
                margin-top: -2.8rem;
                display: flex;
                justify-content: center;
                align-items: center;
                color: #3773f3;
                transition: all 0.5s;
            }
            .refresh-is-loaded
            {
                margin-top: 0;
            }
            .user-message-item-left , .user-message-item-right
            {
                width: 100%;
                display: flex;
                align-items: flex-start;
                align-content: flex-start;
                margin: 0.5rem 0;
                .user-head
                {
                    width: 2.4rem;
                    height: 2.4rem;
                    min-width: 2.4rem;
                    border-radius: 50%;
                    overflow: hidden;
                    box-shadow: 0 0 0.1rem black;
                    cursor: pointer;
                    img
                    {
                        object-fit: cover;
                        width: 100%;
                    }
                }
                .user-name-and-message
                {
                    width: 100%;
                    display: flex;
                    align-content: flex-start;
                    flex-wrap: wrap;
                    position: relative;
                    .user-name-box
                    {
                        width: 100%;
                        display: flex;
                        span
                        {
                            font-size: 0.6rem;
                            color: rgb(68, 68, 68);
                            letter-spacing: 0.02rem;
                            word-break: keep-all;
                        }
                    }
                    .user-message
                    {
                        padding: 0.5rem;
                        background-color: #336ae0;
                        margin-top: 0.25rem;
                        border-radius: 0.3rem;
                        font-size: 0.55rem;
                        color: #ffffff;
                        letter-spacing: 0.02rem;
                        white-space: pre-wrap;
                        word-break: break-all;
                    }
                }
                .user-name-and-message::before , .user-name-and-message::after
                {
                    content: "";
                    position: absolute;
                    border-top: solid 0rem transparent;
                    border-bottom: solid 0.5rem transparent;
                    top: 1.5rem;
                }
            }
            .user-message-item-left
            {
                justify-content: flex-start;
                .user-name-and-message
                {
                    margin-left: 1rem;
                    .user-name
                    {
                        justify-content: flex-start;
                    }
                }
                .user-name-and-message::before
                {
                    border-right: solid 0.5rem #336ae0;
                    left: -0.4rem;
                }
            }
            .user-message-item-right
            {
                justify-content: flex-end;
                flex-direction: row-reverse;
                .user-name-and-message
                {
                    margin-right: 1rem;
                    flex-direction: row-reverse;
                    .user-name
                    {
                        justify-content: flex-end;
                    }
                }
                .user-name-and-message::after
                {
                    border-left: solid 0.5rem #336ae0;
                    right: -0.4rem;
                }
            }
            .list-enter-active , .list-leave-active
            {
                transition: all 0.5s;
            }
            .list-enter-from , .list-leave-to
            {
                opacity: 0;
                transform: translateY(30px);
            }
        }
        .talk-content::-webkit-scrollbar
        {
            width: 0.22rem;
        }
        .talk-content::-webkit-scrollbar-thumb
        {
            background-color: rgb(172, 172, 172);
            border-radius: 2rem;
        }
        .talk-edit-div
        {
            width: 100%;
            display: flex;
            align-content: flex-start;
            flex-wrap: wrap;
            .talk-edit-func
            {
                width: 100%;
                height: 1.5rem;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                background-color: rgb(250, 250, 250);
                padding: 0 0.5rem;
                i
                {
                    color: rgb(153, 153, 153);
                    cursor: pointer;
                    transition: all 0.3s;
                }
                i:hover
                {
                    color: #4b7add;
                }
            }
            .talk-text
            {
                padding: 0.5rem;
                font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
                font-size: 0.7rem;
                letter-spacing: 0.03rem;
                width: 100%;
                height: 6rem;
                resize: none;
                outline: none;
                border: none;
            }
            .talk-submit
            {
                width: 100%;
                display: flex;
                justify-content: flex-end;
                align-items: center;
                padding: 0.3rem;
                background-color: rgb(250, 250, 250);
                span , i
                {
                    height: 1.5rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 0.6rem;
                    width: 4rem;
                    transition: all 0.3s;
                    cursor: pointer;
                }
                .button-clear
                {
                    background-color: #fdf6ec;
                    color:  #e6a23c;
                    border: solid 0.05rem #f5dab1;
                    border-radius: 0.2rem;
                }
                .button-clear:hover
                {
                    color: white;
                    background-color:  #e6a23c;
                }
                .button-confirm
                {
                    margin-left: 1rem;
                    background-color: #b3d8ff;
                    color: #3399ff;
                    border: solid 0.05rem #409eff;
                    border-radius: 0.2rem;
                }
                .button-confirm:hover
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
    .index-box
    {
        .talk-div
        {
            margin: 2rem 0;
            width: 50%;
            .talk-content
            {
                padding: 0.8rem 1rem 0.8rem 1rem;
                .user-message-item-left , .user-message-item-right
                {
                    .user-name-and-message .user-message
                    {
                        max-width: 18rem;
                    }
                }
            }
        }
    }
}
@media screen and (max-width:1400px) and (min-width:1200px)
{
    .index-box
    {
        .talk-div
        {
            margin: 2rem 0;
            width: 65%;
            .talk-content
            {
                padding: 0.8rem 1rem 0.8rem 1rem;
                .user-message-item-left , .user-message-item-right
                {
                    .user-name-and-message .user-message
                    {
                        max-width: 18rem;
                    }
                }
            }
        }
    }
}
@media screen and (max-width:1200px) and (min-width:936px)
{
    .index-box
    {
        .talk-div
        {
            margin: 2rem 0;
            width: 80%;
            .talk-content
            {
                padding: 0.8rem 1rem 0.8rem 0.8rem;
                .user-message-item-left , .user-message-item-right
                {
                    .user-name-and-message .user-message
                    {
                        max-width: 14rem;
                    }
                }
            }
        }
    }
}
@media screen and (max-width:936px) and (min-width:767px)
{
    .index-box
    {
        .talk-div
        {
            width: 100%;
            .talk-content
            {
                padding: 0.8rem 0.5rem 0.8rem 0.5rem;
                .user-message-item-left , .user-message-item-right
                {
                    .user-name-and-message .user-message
                    {
                        max-width: 10rem;
                    }
                }
            }
        }
    }
}
@media screen and (max-width:767px) and (min-width:676px)
{
    .index-box
    {
        .talk-div
        {
            width: 100%;
            .talk-content
            {
                padding: 0.8rem 0.5rem 0.8rem 0.5rem;
                .user-message-item-left , .user-message-item-right
                {
                    .user-name-and-message .user-message
                    {
                        max-width: 10rem;
                    }
                }
            }
        }
    }
}
@media screen and (max-width:676px)
{
    .index-box
    {
        .talk-div
        {
            width: 100%;
            .talk-content
            {
                padding: 0.8rem 0.5rem 0.8rem 0.5rem;
                .user-message-item-left , .user-message-item-right
                {
                    .user-name-and-message .user-message
                    {
                        max-width: 10rem;
                    }
                }
            }
        }
    }
}
</style>