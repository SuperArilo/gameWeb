<template>
    <div class="index-box" :style="{backgroundImage:`url(${indexBg})`}">
        <div class="talk-div">
            <div class="talk-title">
                <span>在线聊天</span>
                <span>与在服务器里游玩的小伙伴一起聊天吧！</span>
                <span>连接可能会有稍许延迟，这是正常现象，请注意语言规范</span>
            </div>
            <div class="talk-content" ref="talkContent" @scroll="talkContentScroll">
                <i class="fas fa-circle-notch refresh" :class="refreshShow ? 'refresh-is-loaded fa-spin':''" />
                <transition-group name="list">
                    <div v-for="(item,index) in test" :key="index" :class="this.$store.getters.userInfoGet.uid === item.uid ? 'user-message-item-right' : 'user-message-item-left'">
                        <div class="user-head">
                            <img :src="this.$store.getters.userInfoGet.userHead"/>
                        </div>
                        <div class="user-name-and-message">
                            <div class="user-name-box" :style="this.$store.getters.userInfoGet.uid === item.uid ? 'flex-flow: row-reverse;' : 'flex-flow: row;'">
                                <span :style="this.$store.getters.userInfoGet.uid === item.uid ? 'margin-left:0.5rem;' : 'margin-right:0.5rem;'">{{item.userName}}</span>
                                <span>MC Java ID：{{item.MCJAVAId}}</span>
                            </div>
                            <span class="user-message">{{item.content}}</span>
                        </div>
                    </div>
                </transition-group>
            </div>
            <div class="talk-edit-div">
                <div class="talk-edit-func">
                    <i class="fas fa-smile-wink"/>
                </div>
                <textarea v-model="userWriteContent" class="talk-text" @keyup.enter.exact="sentToServer" @keyup.shift="addLang" onkeydown="if (event.keyCode === 13) event.preventDefault();"/>
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
            indexBg: require('@/views/icon/index/index_center.jpg'),
            test:[
            ],
            refreshShow: false,
            userWriteContent: '',
            sentToServerStatu: false,
            onlineTalkUrl: 'wss://www.itrong.love:1234/api/onlinetalk/',
            websock: null
        }
    },
    created(){
        // if(this.$store.getters.userInfoGet !== null){
        //     this.initWebSocket()
        // }
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
        addLang(){
            this.userWriteContent = this.userWriteContent + '\n'
        },
        sentToServer(){
            // if(!this.sentToServerStatu){
            //     this.sentToServerStatu = true
            //     if(this.userWriteContent === ''){
            //         ElNotification({title: '提示',message: '发送的信息不能为空！',type: 'info'})
            //         this.sentToServerStatu = false
            //         return
            //     }
            //     let sendToServer = {uid: this.$store.getters.userInfoGet.uid,MCJAVAId: this.$store.getters.userInfoGet.javaMcId,userName: this.$store.getters.userInfoGet.userName,uuid: this.$store.getters.userInfoGet.mcUUID,content: this.userWriteContent,fromGame: false}
            //     this.websock.send(JSON.stringify(sendToServer))
            //     this.sentToServerStatu = false
            //     this.scrollToBottom()
            //     this.userWriteContent = ''
            // }
        },
        scrollToBottom(){
            this.$nextTick(()=>{
                this.$refs.talkContent.scrollTop = this.$refs.talkContent.scrollHeight
            })
        },
        async initWebSocket(){
            this.websock = new WebSocket(this.onlineTalkUrl + this.$store.getters.userInfoGet.uid)
            this.websock.onmessage = this.websocketOnMessage
            this.websock.onopen = this.websocketOnOpen
            this.websock.onerror = this.websocketOnError
            this.websock.onclose = this.websocketClose
        },
        websocketOnMessage(message){
            this.test = this.test.concat(JSON.parse(message.data))
            console.log(JSON.parse(message.data))
            this.scrollToBottom()
        },
        websocketOnOpen(){
            ElNotification({title: '在线聊天',message: '连接服务器成功！',type: 'success'})            
        },
        websocketOnError(){
            ElMessage.error('连接到服务器出错！')
        },
        websocketClose(){
        }
    },
    unmounted() {
        // if(this.$store.getters.userInfoGet !== null){
        //     this.websock.close()
        // }
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
    background-attachment: fixed;
    background-size: cover;
    .talk-div
    {
        display: flex;
        align-content: flex-start;
        justify-content: center;
        flex-wrap: wrap;
        background-color: #ffffffb9;
        overflow: hidden;
        .talk-title
        {
            width: 100%;
            height: 8rem;
            display: flex;
            justify-content: center;
            align-items: center;
            align-content: center;
            flex-wrap: wrap;
            background-repeat: no-repeat;
            background-position: top;
            background-attachment: fixed;
            background-size: cover;
            background-image: url('../icon/index/versaillestown/townIndex2.jpg');
            box-shadow: 0 0 0.3rem black;
            padding: 0.5rem;
            span
            {
                width: 100%;
                display: flex;
                justify-content: center;
                letter-spacing: 0.05rem;
                color: #ffffff;
                text-align: center;
            }
            span:nth-child(1)
            {
                font-size: 1.2rem;
            }
            span:nth-child(2)
            {
                font-size: 0.7rem;
                margin: 0.5rem 0;
            }
            span:nth-child(3)
            {
                font-size: 0.6rem;
                color: #cacaca;
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
            background-color: #ffffff;
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