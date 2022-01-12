<template>
    <div class="main-container">
        <nav class="top-nav">
            <div class="left-func">
                <i class="fas fa-bars" @click="openMenu =! openMenu" :style="openMenu ? 'color: rgb(173, 173, 173);':''"/>
            </div>
        </nav>
        <div class="change-content">
            <div class="change-left-menu" :style="!openMenu ? 'width:0;':''" @mouseleave="openMenu = false">
                <div class="user-inf-show">
                    <div class="user-head-name">
                        <div class="user-content">
                            <img :src="userHead"/>
                            <span>这次换你听歌</span>
                        </div>
                    </div>
                    <p class="autograph">Single_Dog找不到女朋友，太惨了吧。萝卜CSGO天天白给</p>
                </div>
                <div class="menu-list">
                    <div class="sub-item" v-for="(item,index) in navMenuList" :key="index">
                        <div class="top-func">
                            <div class="img-and-span" @click="menuFunc(item.id,item.path)">
                                <img :src="item.icon"/>
                                <span>{{item.title}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="router-content">
                <router-view v-slot="{ Component }" style="position: absolute;">
                    <transition enter-active-class="animate__animated router_animate-enter-active" leave-active-class="animate__animated router_animate-leave-active">
                        <component :is="Component" />
                    </transition>
                </router-view>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            openMenu: false,
            navMenuList:[
                {
                    id: 0,
                    title: '首页',
                    icon: require('@/views/icon/index/home.png'),
                    path: ''
                },
                {
                    id: 1,
                    title: '动态',
                    icon: require('@/views/icon/index/dynamic.png'),
                    path: 'dynamic'
                },
                {
                    id: 2,
                    title: '留言',
                    icon: require('@/views/icon/index/iMessage.png'),
                    path: 'message'
                },
                {
                    id: 3,
                    title: '与服务器在线聊天',
                    icon: require('@/views/icon/index/onlineTalk.png'),
                    path: 'onlinetalk'
                },
                {
                    id: 4,
                    title: '玩家信息',
                    icon: require('@/views/icon/index/player.png'),
                    path: 'player'
                }
            ],
            userHead: require('@/views/icon/head/stranger18.jpg')
        }
    },
    created(){
        window.addEventListener('resize',this.windowWidth)
        this.windowWidth()
    },
    mounted(){
        window.addEventListener('scroll', this.scrollValue,true)
    },
    methods:{
        windowWidth(){
            let windowWidth = window.innerWidth
            if(windowWidth <= 936){
                this.$store.commit('isPhoneSet',true)
            } else {
                this.$store.commit('isPhoneSet',false)
            }
        },
        menuFunc(id,path){
            setTimeout(() => {
                this.$router.push('/' + path)
                this.openMenu = false
            },200)
        },
        subMenuFunc(id,path){
            setTimeout(() => {
                this.$router.push('/' + path)
                this.openMenu = false
            },200)
        },
        scrollValue(e){
            this.$store.commit('windowScrollValueSet',e.target.scrollTop)
        }
    },
    computed:{
    },
    watch:{
    },
    unmounted(){
        window.removeEventListener('scroll', this.scrollValue,true)
    }
}
</script>
<style lang="scss">
img
{
    -webkit-user-drag: none;
    max-width: 100%;
}
body, html
{
    margin: 0;
    padding: 0;
    height: 100%;
    min-height: 100%;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    overflow-x: hidden;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
}
*
{
    box-sizing: border-box;
}
a
{
    text-decoration: none;
}
::-webkit-scrollbar
{
    width: 0.5rem;
}
::-webkit-scrollbar-thumb
{
    background-color: rgb(172, 172, 172);
}
#app
{
    width: 100%;
}
.main-container
{
    width: 100%;
    display: flex;
    align-content: flex-start;
    flex-wrap: wrap;
    .top-nav
    {
        width: 100%;
        height: 2.2rem;
        background-color: #3d6cd1;
        display: flex;
        padding: 0 0.5rem;
        position: fixed;
        z-index: 1000;
        justify-content: space-between;
        box-shadow: 0 0 0.2rem black;
        .left-func
        {
            height: 100%;
            display: flex;
            align-items: center;
            i
            {
                height: 100%;
                display: flex;
                align-items: center;
                font-size: 1.2rem;
                color: #ffffff;
                cursor: pointer;
                transition: all 0.3s;
            }
        }
    }
    .change-content
    {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        margin-top: 2.2rem;
        .change-left-menu
        {
            width: 14rem;
            overflow: hidden;
            height: 100%;
            transition: all 0.5s;
            z-index: 100;
            background-color: #ffffff;
            display: flex;
            align-content: flex-start;
            flex-wrap: wrap;
            position: fixed;
            box-shadow: 0 0.5rem 0.5rem black;
            span
            {
                word-break:keep-all;
                white-space:nowrap;
            }
            .user-inf-show
            {
                width: 100%;
                align-content: flex-start;
                flex-wrap: wrap;
                margin-top: 1rem;
                background-color: rgb(245, 245, 245);
                padding: 1rem 0;
                .user-head-name
                {
                    width: 100%;
                    height: 2rem;
                    display: flex;
                    justify-content: flex-start;
                    padding: 0 1rem;
                    align-items: center;
                    .user-content
                    {
                        height: 2rem;
                        display: flex;
                        align-items: center;
                        img
                        {
                            width: 2rem;
                            height: 2rem;
                            min-width: 2rem;
                            border-radius: 50%;
                            max-height: 100%;
                        }
                        span
                        {
                            height: 100%;
                            display: flex;
                            align-items: center;
                            text-align: center;
                            font-size: 0.65rem;
                            margin-left: 1rem;
                        }
                    }
                }
                .autograph
                {
                    min-width: 14rem;
                    display: flex;
                    justify-content: flex-start;
                    flex-wrap: wrap;
                    font-size: 0.52rem;
                    padding: 0 1rem;
                    text-align: left;
                    word-break: break-all;
                    letter-spacing: 0.04rem;
                }
            }
            .menu-list
            {
                width: 100%;
                display: flex;
                align-content: flex-start;
                flex-wrap: wrap;
                margin-top: 0.5rem;
                .sub-item
                {
                    width: 100%;
                    display: flex;
                    align-content: flex-start;
                    flex-wrap: wrap;
                    .top-func
                    {
                        width: 100%;
                        height: 2.5rem;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        cursor: pointer;
                        transition: all 0.3s;
                        .img-and-span
                        {
                            width: 100%;
                            height: 100%;
                            display: flex;
                            align-items: center;
                            img
                            {
                                height: 60%;
                                max-height: 60%;
                                margin: 0 1rem;
                            }
                            span
                            {
                                font-size: 0.62rem;
                                width: 100%;
                                height: 100%;
                                display: flex;
                                align-items: center;
                                letter-spacing: 0.1rem;
                            }
                        }
                        i
                        {
                            width: 3rem;
                            min-width: 3rem;
                            height: 100%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }
                    }
                }
                .sub-item:hover
                {
                    background-color: rgb(226, 226, 226);
                }
            }
        }
        .router-content
        {
            width: 100%;
            position: relative;
            display: flex;
            justify-content: center;
            .router_animate-enter-active
            {
                animation: slideInLeft 0.6s;
            }
            .router_animate-leave-active
            {
                animation: slideOutRight 0.6s;
            }
        }
    }
}
@media screen and (min-width:1400px)
{
    html
    {
        font-size: 24px;
    }
}
@media screen and (max-width:1400px) and (min-width:1200px)
{
    html
    {
        font-size: 24px;
    }
}
@media screen and (max-width:1200px) and (min-width:936px)
{
    html
    {
        font-size: 24px;
    }
}
@media screen and (max-width:936px) and (min-width:767px)
{
    html
    {
        font-size: 24px;
    }
}
@media screen and (max-width:767px) and (min-width:676px)
{
    html
    {
        font-size: 22px;
    }
}
@media screen and (max-width:676px)
{
    html
    {
        font-size: 20px;
    }
}
.server-own-border
{
    border: solid 0.12rem #3773f3;
}
.server-own-b-color
{
    background-color: #3773f3;
}
.admin-border
{
    border: solid 0.12rem #4c8f20;
}
.admin-b-color
{
    background-color: #4c8f20;
}
.player-border
{
    border: solid 0.12rem #7d208f;
}
.player-b-color
{
    background-color: #7d208f;
}
.builder-border
{
    border: solid 0.1rem #8f8820;
}
.builder-b-color
{
    background-color: #8f8820;
}
.vip-border
{
    border: solid 0.1rem #a52525;
}
.vip-b-color
{
    background-color: #a52525;
}
</style>