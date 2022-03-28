<template>
    <div class="main-container">
        <nav class="top-nav-on-mobile" v-if="this.$store.getters.isPhoneGet">
            <div class="left-func">
                <i class="fas fa-bars" @click="openMenu =! openMenu" :style="openMenu ? 'color: rgb(173, 173, 173);':''"/>
            </div>
            <div class="right-func">
                <div v-if="this.$store.getters.userInfoGet === null" class="login" @click="this.$router.push('/login')">
                    <span>登录</span>
                    <i class="fas fa-location-arrow"/>
                </div>
                <div v-else class="nav-player-show-box">
                    <div class="player-head" @click="this.$router.push('/player')">
                        <img :src="this.$store.getters.userInfoGet.userhead"/>
                    </div>
                    <div class="user-notice">
                        <span class="show-text">消息:</span>
                        <span class="notice-num">12</span>
                    </div>
                    <div class="logout" @click="playerLogout">
                        <span>注销</span>
                        <i class="fas fa-sign-out-alt"/>
                    </div>
                </div>
            </div>
        </nav>
        <nav class="top-nav-on-pc" v-else>
            <div class="nav-icon">
                <img :src="this.$store.getters.frsIconGet"/>
            </div>
            <div class="nav-menu-list">
                <span class="sub-nav-item" v-for="item in navMenuList" :key="item.id" @mouseenter="menuIndex = item.id" @click="menuFunc(item.id,item.path)">{{item.title}}</span>
            </div>
            <div class="nav-user-box" v-if="this.$store.getters.userInfoGet !== null">
                <img class="user-head" @click="this.$router.push('/player')" :src="this.$store.getters.userInfoGet.userhead"/>
                <div class="user-notice">
                    <span class="show-text">消息:</span>
                    <span class="notice-num">12</span>
                </div>
                <div class="nav-is-logined-func">
                    <i class="fas fa-sign-out-alt login-out" @click="playerLogout"/>
                </div>
            </div>
            <div class="nav-not-login" v-else>
                <span class="nav-buttom login-button" @click="this.$router.push('/login')">登录</span>
            </div>
        </nav>
        <div class="change-content" :style="[this.$store.getters.isPhoneGet ? 'margin-top: 2rem;':'']">
            <div v-if="this.$store.getters.isPhoneGet" class="change-left-menu" :style="[!openMenu ? 'width: 0;':'width: 14rem;']" @mouseleave="openMenu = false">
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
            menuIndex: 0,
            navMenuList:[
                {
                    id: 0,
                    title: '首页',
                    icon: 'http://image.superarilo.icu/menu//home.png',
                    path: ''
                },
                {
                    id: 1,
                    title: '社区',
                    icon: 'http://image.superarilo.icu/menu/dynamic.png',
                    path: 'dynamic'
                },
                {
                    id: 2,
                    title: '留言',
                    icon: 'http://image.superarilo.icu/menu/iMessage.png',
                    path: 'message'
                },
                {
                    id: 3,
                    title: '在线聊天',
                    icon: 'http://image.superarilo.icu/menu/onlineTalk.png',
                    path: 'onlinetalk'
                },
                {
                    id: 4,
                    title: '玩家信息',
                    icon: 'http://image.superarilo.icu/menu/player.png',
                    path: 'player'
                },
                {
                    id: 5,
                    title: '白名单',
                    icon: 'http://image.superarilo.icu/menu/rule.png',
                    path: 'applicationwhitelist'
                }
            ],
        }
    },
    mounted(){
        window.addEventListener('resize',this.windowWidth)
        this.windowWidth()
        window.addEventListener('scroll', this.scrollValue,true)
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
                ElNotification({title: '错误',message: err.message,type: 'error'})
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
        },
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
    width: 0.4rem;
}
::-webkit-scrollbar-thumb
{
    background-color: rgb(79, 130, 241);
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
        .top-nav-on-pc , .top-nav-on-mobile
        {
            width: 100%;
            height: 2rem;
            display: flex;
            position: fixed;
            z-index: 1000;
            .user-notice
            {
                height: inherit;
                display: flex;
                align-items: center;
                margin: 0 0.5rem;
                .show-text
                {
                    height: inherit;
                    display: flex;
                    align-items: center;
                    font-size: 0.56rem;
                    white-space: nowrap;
                    color: #ffffff;
                }
                .notice-num
                {
                    padding: 0.1rem 0.2rem;
                    background-color: #252933;
                    font-size: 0.52rem;
                    color: #ffffff;
                    font-weight: bold;
                    border-radius: 0.2rem;
                }
            }
        }
        .top-nav-on-pc
        {
            justify-content: center;
            align-items: center;
            background-color: rgba(0, 0, 0, 0.2);
            border-bottom: solid 0.05rem rgba(255, 255, 255, 0.1);
            transition: background 0.3s;
            .nav-icon
            {
                width: 1.6rem;
                min-width: 1.6rem;
                height: 1.6rem;
                margin-right: 1.5rem;
                img
                {
                    width: 100%;
                    height: 100%;
                }
            }
            .nav-menu-list
            {
                height: inherit;
                display: flex;
                align-items: center;
                margin: 0 1rem;
                .sub-nav-item
                {
                    padding: 0 1.2rem;
                    height: inherit;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 0.64rem;
                    color: #ffffff;
                    letter-spacing: 0.02rem;
                    cursor: pointer;
                }
                .sub-nav-item:hover
                {
                    color: #3399ff;
                }
            }
            .nav-user-box
            {
                height: inherit;
                display: flex;
                align-items: center;
                .user-head
                {
                    width: 1.6rem;
                    height: 1.6rem;
                    min-width: 1.6rem;
                    border-radius: 50%;
                    cursor: pointer;
                }
                .nav-is-logined-func
                {
                    height: inherit;
                    display: flex;
                    align-items: center;
                    .login-out
                    {
                        height: 1rem;
                        display: flex;
                        align-items: center;
                        font-size: 0.8rem;
                        cursor: pointer;
                        color: #ffffff;
                        transition: color 0.3s;
                        margin: 0 0.5rem;
                    }
                    .login-out:hover
                    {
                        color: #3d6cd1;
                    }
                }
            }
            .nav-not-login
            {
                height: inherit;
                display: flex;
                align-items: center;
                .nav-buttom
                {
                    border-radius: 0.2rem;
                    padding: 0.2rem 0.4rem;
                    cursor: pointer;
                    transition: all 0.3s;
                }
                .login-button
                {
                    font-size: 0.52rem;
                    color: #ffffff;
                    background-color: #3d6cd1;
                }
                .login-button:hover
                {
                    background-color: #252933;
                    color: #ffffff;
                }
            }
        }
        .top-nav-on-pc:hover
        {
            background-color: rgb(61, 61, 61);
        }
        .top-nav-on-mobile
        {
            padding-left: 0.5rem;
            background-color: #3d6cd1;
            justify-content: space-between;
            .left-func , .right-func
            {
                height: inherit;
                display: flex;
                align-items: center;
            }
            .left-func
            {
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
                .login
                {
                    width: 4rem;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: #409eff;
                    cursor: pointer;
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
                    .player-head
                    {
                        height: 1.6rem;
                        width: 1.6rem;
                        min-width: 1.6rem;
                        display: flex;
                        align-items: center;
                        border: solid 0.04rem #99a2aa;
                        border-radius: 50%;
                        box-shadow: 0 0 0.2rem black;
                        overflow: hidden;
                        cursor: pointer;
                        img
                        {
                            max-height: 100%;
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
                    }
                    span
                    {
                        font-size: 0.72rem;
                        margin-left: 0.5rem;
                        letter-spacing: 0.1rem;
                        font-weight: bold;
                        color: rgb(49, 49, 49);
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
        border-left: 0.3rem solid #d0e5f2;
        padding: 0.15rem 0.3rem;
        margin: 0.3rem 0;
        line-height: 2;
        font-size: 100%;
        background-color: #f1f1f1;
    }
    hr
    {
        cursor: pointer;
        display: block;
        height: 0;
        border: 0;
        border-top: 0.1rem solid #ccc;
        margin: 0.6rem 0;
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
</style>