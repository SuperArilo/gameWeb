<template>
    <div class="main-container">
        <nav class="top-nav">
            <div class="left-func">
                <i class="fas fa-bars" @click="openMenu =! openMenu" :style="openMenu ? 'color: rgb(173, 173, 173);':''"/>
            </div>
            <div class="right-func">
                <transition name="content-effects">
                    <div v-if="this.$store.getters.userInfoGet === null" class="login" @click="this.$router.push('/login')">
                        <span>登录</span>
                        <i class="fas fa-location-arrow"/>
                    </div>
                </transition>
                <transition name="content-effects">
                    <div v-if="this.$store.getters.userInfoGet !== null" class="nav-player-show-box">
                        <div class="player-head">
                            <img :src="this.$store.getters.userInfoGet.userhead"/>
                        </div>
                        <span class="player-name">{{this.$store.getters.userInfoGet.nickname}}</span>
                        <div class="player-notice-sum-box">
                            <i class="fas fa-bullhorn" @click="openNoticeWindow = true"/>
                            <span class="span-notice-sum">99+</span>
                            <transition name="el-zoom-in-top">
                                <div class="notice-drop-menu" v-if="openNoticeWindow" @mouseleave="openNoticeWindow = false">
                                    <div class="drop-menu-title">
                                        <span class="left-title-span">通知</span>
                                        <div class="right-box">
                                            <span class="sub-box">标记已读</span>
                                        </div>
                                    </div>
                                    <div class="drop-notice-content">
                                        
                                    </div>
                                </div>
                            </transition>
                        </div>
                        <div class="logout" @click="playerLogout">
                            <span>注销</span>
                            <i class="fas fa-sign-out-alt"/>
                        </div>
                    </div>
                </transition>
            </div>
        </nav>
        <div class="change-content">
            <div class="change-left-menu" :style="[!openMenu ? 'width: 0;':'width: 14rem;']" @mouseleave="openMenu = false">
                <div class="server-info">
                    <img :src="this.$store.getters.frsIconGet"/>
                    <span>凡尔赛小镇</span>
                </div>
                <div class="menu-list">
                    <div class="sub-item" v-for="item in navMenuList" :key="item.id">
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
        <transition name="scroll-up" mode="out-in">
            <div v-show="this.$store.getters.windowScrollValueGet >= 400" class="scroll-up" @click="scrollToTop">
                <i class="far fa-arrow-alt-circle-up"/>
                <span>UP</span>
            </div>
        </transition>
    </div>
</template>
<script>
import { ElNotification , ElMessageBox , ElMessage } from 'element-plus'
import { userLognState , userLogOut } from '@/util/api.js'
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
                },
                {
                    id: 5,
                    title: '自助申请白名单',
                    icon: require('@/views/icon/index/rule.png'),
                    path: 'applicationwhitelist'
                }
            ],
            openNoticeWindow: false,
        }
    },
    async beforeCreate(){
        if(localStorage.getItem('token')){
            userLognState().then(resq => {
                if(resq.flag){
                    this.$store.commit('userInfoSet', resq.data)
                } else {
                    ElNotification({title: '提示',message: resq.message ,type: 'warning'})
                    this.$store.commit('userInfoSet',null)
                    localStorage.removeItem('token')
                }
            }).catch(err => {
                ElNotification({title: '错误',message: '用户状态验证接口出错！' + err,type: 'error'})
                this.$store.commit('userInfoSet',null)
                localStorage.removeItem('token')
            })
        } else if(sessionStorage.getItem('token')){
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
            if(window.innerWidth <= 936){
                this.$store.commit('isPhoneSet',true)
            } else {
                this.$store.commit('isPhoneSet',false)
            }
        },
        menuFunc(id,path){
            this.$router.push('/' + path)
            this.openMenu = false
        },
        scrollValue(e){
            this.$store.commit('windowScrollValueSet',e.target.scrollTop)
        },
        scrollToTop(){
            $('html,body').stop().animate({'scrollTop': 0})
        },
        playerLogout(){
            ElMessageBox.confirm('确定要注销登录吗？','提示',{confirmButtonText: '确认',cancelButtonText: '取消',type: 'warning'}).then(() => {
                userLogOut().then(resq => {
                    if(resq.flag){
                        this.$router.push('/')
                        localStorage.removeItem('token')
                        sessionStorage.removeItem('token')
                        this.$store.commit('userInfoSet',null)
                        ElNotification({title: '提示',message: resq.message ,type: 'success'})
                    }
                }).catch(err => {
                    ElMessage.error('注销登陆过程发生错误！ ' + err)
                })
            }).catch(() => {
            })
        }
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
    .img-viewr__body-lock
    {
        overflow: auto !important;
    }
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
    .main-container
    {
        width: 100%;
        display: flex;
        align-content: flex-start;
        flex-wrap: wrap;
        position: relative;
        .top-nav
        {
            width: 100%;
            height: 2.2rem;
            background-color: #3d6cd1;
            display: flex;
            padding-left: 0.5rem;
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
            .right-func
            {
                height: 100%;
                display: flex;
                align-items: center;
                .login
                {
                    width: 4rem;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: #409eff;
                    cursor: pointer;
                    transition: all 0.4s;
                    span , i
                    {
                        height: 100%;
                        display: flex;
                        align-items: center;
                        color: white;
                    }
                    span
                    {
                        font-size: 0.58rem;
                        letter-spacing: 0.05rem;
                    }
                    i
                    {
                        font-size: 0.7rem;
                        margin-left: 0.3rem;
                    }
                }
                .login:hover
                {
                    background-color: #b3d8ff;
                    span , i
                    {
                        color: #3399ff;
                    }
                }
                .nav-player-show-box
                {
                    height: 100%;
                    display: flex;
                    align-items: center;
                    transition: all 0.4s;
                    .player-head
                    {
                        height: 80%;
                        display: flex;
                        align-items: center;
                        border: solid 0.04rem #99a2aa;
                        border-radius: 50%;
                        box-shadow: 0 0 0.2rem black;
                        overflow: hidden;
                        img
                        {
                            max-height: 100%;
                        }
                    }
                    .player-name
                    {
                        height: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: 0.56rem;
                        margin: 0 0.5rem;
                        min-width: 3rem;
                        color: #ffffff;
                    }
                    .player-notice-sum-box
                    {
                        height: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 3rem;
                        position: relative;
                        i
                        {
                            font-size: 0.8rem;
                            cursor: pointer;
                        }
                        .span-notice-sum , i
                        {
                            height: 100%;
                            display: flex;
                            align-items: center;
                            transition: all 0.3s;
                            color: #ffffff;
                        }
                        .span-notice-sum
                        {
                            height: auto;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            min-width: 0.8rem;
                            min-height: 0.8rem;
                            border-radius: 50%;
                            background-color: red;
                            font-size: 0.5rem;
                            padding: 0.1rem;
                            position: absolute;
                            top: 0;
                            right: 0;
                            margin: 0.1rem 0.5rem;
                        }
                        .notice-drop-menu
                        {
                            width: 10rem;
                            display: flex;
                            overflow: hidden;
                            align-content: flex-start;
                            flex-wrap: wrap;
                            position: absolute;
                            top: 2.2rem;
                            box-shadow: 0 0.05rem 0.3rem rgba(0, 0, 0, 0.5);
                            border-radius: 0.15rem;
                            .drop-menu-title
                            {
                                width: 100%;
                                height: 1.5rem;
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                padding: 0 0.5rem;
                                background-color: #ffffff;
                                border-bottom: solid 0.05rem darkgray;
                                .right-box , .left-title-span
                                {
                                    height: 100%;
                                    display: flex;
                                    align-items: center;
                                }
                                .left-title-span
                                {
                                    font-size: 0.6rem;
                                }
                                .right-box
                                {
                                    .sub-box
                                    {
                                        height: 1rem;
                                        display: flex;
                                        align-items: center;
                                        padding: 0 0.5rem;
                                        border-radius: 0.15rem;
                                        border: solid 0.05rem darkgray;
                                        font-size: 0.55rem;
                                        background-color: rgb(240,240,240);
                                        cursor: pointer;
                                        transition: all 0.3s;
                                    }
                                    .sub-box:hover
                                    {
                                        color: red;
                                    }
                                }
                            }
                            .drop-notice-content
                            {
                                width: 100%;
                                height: 14rem;
                                display: flex;
                                align-content: flex-start;
                                flex-wrap: wrap;
                                background-color: rgba(240,240,240,1);
                            }
                        }
                    }
                    .logout
                    {
                        width: 4rem;
                        height: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        background-color: #409eff;
                        cursor: pointer;
                        transition: all 0.3s;
                        span , i
                        {
                            height: 100%;
                            display: flex;
                            align-items: center;
                            color: #ffffff;
                        }
                        span
                        {
                            font-size: 0.56rem;
                        }
                        i
                        {
                            font-size: 0.8rem;
                            margin-left: 0.3rem;
                        }
                    }
                    .logout:hover
                    {
                        background-color: #b3d8ff;
                        span , i
                        {
                            color: #3399ff;
                        }
                    }
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
                overflow: hidden;
                height: 100%;
                transition: all 0.5s;
                z-index: 999;
                background-color: #ffffff;
                display: flex;
                align-content: flex-start;
                flex-wrap: wrap;
                position: fixed;
                box-shadow: 0 0.5rem 0.5rem black;
                span
                {
                    word-break: keep-all;
                }
                .server-info
                {
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 0.5rem 0;
                    background-color: rgb(248, 248, 248);
                    img , span
                    {
                        height: 2rem;
                        max-height: 100%;
                        display: flex;
                        align-items: center;
                        font-size: 0.7rem;
                    }
                    span
                    {
                        margin-left: 0.5rem;
                        letter-spacing: 0.05rem;
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
        .scroll-up
        {
            display: flex;
            justify-content: center;
            align-content: flex-start;
            flex-wrap: wrap;
            position: fixed;
            right: 0;
            bottom: 0;
            margin: 2rem 1rem;
            z-index: 600;
            color: #3773f3;
            background-color: #ffffff;
            padding: 0.4rem 0;
            border-radius: 0.5rem;
            box-shadow: 0 0 0.15rem rgba(0, 0, 0, 0.521);
            cursor: pointer;
            i , span
            {
                width: 100%;
                display: flex;
                justify-content: center;
            }
            i
            {
                font-size: 2rem;
            }
            span
            {
                margin-top: 0.2rem;
                font-size: 0.8rem;
            }
        }
        .scroll-up-enter-active , .scroll-up-leave-active
        {
            transition: all 0.3s;
        }
        .scroll-up-enter-from , .scroll-up-leave-to
        {
            opacity: 0;
            transform: translateY(1rem);
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
.render-by-edit
{
    font-size: 0.6rem !important;
    blockquote
    {
        display: block;
        border-left: 8px solid #d0e5f2;
        padding: 5px 10px;
        margin: 10px 0;
        line-height: 1.4;
        font-size: 100%;
        background-color: #f1f1f1;
    }
    hr
    {
        cursor: pointer;
        display: block;
        height: 0px;
        border: 0;
        border-top: 3px solid #ccc;
        margin: 20px 0;
    }
    img
    {
        height: auto !important;
        cursor: pointer;
    }
    h1 , h2 , h3 , h4 , h5 , p , table , pre
    {
        margin: 0.5rem 0;
        line-height: 1.5;
    }
    table
    {
        border-top: 0.08rem solid #ccc;
        border-left: 0.08rem solid #ccc;
        th , td
        {
            border-bottom: 0.08rem solid #ccc;
            border-right: 0.08rem solid #ccc;
            padding: 0.1rem 0.3rem;
            min-height: 1.2rem;
            height: 1.2rem;
        }
        th
        {
            border-bottom: 0.1rem solid #ccc;
            text-align: center;
            background-color: #f1f1f1;
        }
    }
}
.content-effects-enter-from , .content-effects-leave-to
{
    opacity: 0;
    transform: translateX(5rem);
}
.content-effects-leave-active
{
    position: absolute;
}
</style>