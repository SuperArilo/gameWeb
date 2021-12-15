<template>
    <div class="main-container">
        <nav class="nav-top-pc" v-if="!this.$store.getters.isPhoneGet" ref="topPc">
            <el-row :gutter="10">
                <el-col class="el-row-style" :xs="3" :sm="3" :md="3" :lg="3" :xl="3">
                </el-col>
                <el-col class="el-row-style" :xs="13" :sm="13" :md="13" :lg="13" :xl="13">
                    <div class="menu-div">
                        <div v-for="(item,index) in navMenuList" :key="index" @click="menuFunc(item.id,item.path)" :class="item.id === navMenuIndex ? 'menu-active':''">
                            <img  :src="item.icon"/>
                            <span>{{item.title}}</span>
                        </div>
                    </div>
                </el-col>
                <el-col class="el-row-style" :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                    <div class="search-div">
                        <input type="text" maxlength="16"/>
                        <span>搜索</span>
                    </div>
                </el-col>
                <el-col class="el-row-style" :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                    <div class="button-box">
                        <span>
                            <img src="./icon/index/LoginIcon.png" @click="loginDrawer = true"/>
                        </span>
                    </div>
                </el-col>
            </el-row>
        </nav>
        <nav class="nav-top-phone" v-if="this.$store.getters.isPhoneGet" ref="topPhone">
            <div class="top-user-inf">
                <img class="left-menu" @click="navPhoneListShow =! navPhoneListShow" src="./icon/index/menu.png"/>
            </div>
            <el-collapse-transition>
                <div class="menu-list-line" v-show="navPhoneListShow">
                    <div class="sub-div" v-for="(item,index) in navMenuList" :key="index" @click="menuFunc(item.id,item.path)" :class="item.id === navMenuIndex ? 'sub-div-active':''">
                        <img :src="item.icon"/>
                        <span>{{item.title}}</span>
                    </div>
                </div>
            </el-collapse-transition>
        </nav>
        <div class="router-content">
            <router-view v-slot="{ Component }">
                <transition mode="out-in" name="router_animate">
                    <component :is="Component" />
                </transition>
            </router-view>
        </div>
        <div class="footer-div">
            <div class="top-div">
                <img src="./icon/index/mmqrcod.png"/>
                <div class="public-div">
                    <span class="title-span">关于我</span>
                    <div class="contant-div">
                        <div class="sub-div">
                            <img src="./icon/index/QQ.png"/>
                            <span>72815258</span>
                        </div>
                        <div class="sub-div">
                            <img src="./icon/index/wechat.png"/>
                            <span>AriloWh</span>
                        </div>
                        <div class="sub-div">
                            <img src="./icon/index/mail.png"/>
                            <span>superarilo@189.cn</span>
                        </div>
                    </div>
                    

                </div>
                <div class="public-div">
                    <span class="title-span">友情链接</span>
                </div>
                <div class="public-div">
                    <span class="title-span">博客简介</span>
                </div>
            </div>
            <div class="bottom-link">
                <span>Copyriht © SuperArilo 2021. All rights reserved</span>
                <a href="https://beian.miit.gov.cn/" target="_blank">备案号：蜀ICP备2021010843号</a>
            </div>
        </div>
        <el-drawer v-model="loginDrawer" :with-header="false">
            <span>我来啦!</span>
        </el-drawer>
    </div>
</template>
<script>
export default {
    data(){
        return{
            navMenuIndex: 0,
            loginDrawer: false,
            isPhone: null,
            navMenuList:[
                {
                    id: 0,
                    title: '首页',
                    icon: require('@/icon/index/home.png'),
                    path: ''
                },
                {
                    id: 1,
                    title: '动态',
                    icon: require('@/icon/index/dynamic.png'),
                    path: 'dynamic'
                },
                {
                    id: 2,
                    title: '留言',
                    icon: require('@/icon/index/iMessage.png'),
                    path: 'message'
                },
                {
                    id: 3,
                    title: '随笔',
                    icon: require('@/icon/index/note.png'),
                    path: 'note'
                },
                {
                    id: 4,
                    title: '凡尔赛小镇',
                    icon: require('@/icon/index/frs.png'),
                    path: 'versaillestown'
                }
            ],
            navPhoneListShow: false,
        }
    },
    created(){
        this.navMenuIndex = parseInt(sessionStorage.getItem('menuIndex'))
        if(isNaN(this.navMenuIndex)){
            this.navMenuIndex = 0
        }
        window.addEventListener('resize',this.windowWidth)
        this.windowWidth()
    },
    mounted(){
        window.addEventListener('scroll', this.scrollValue,true)
    },
    methods:{
        windowWidth(){
            let windowWidth = window.innerWidth
            this.navPhoneListShow = false
            if(windowWidth <= 936){
                this.$store.commit('isPhoneSet',true)
            } else {
                this.$store.commit('isPhoneSet',false)
            }
        },
        menuFunc(id,path){
            this.navMenuIndex = id
            setTimeout(() => {
                this.$router.push('/' + path)
                this.navPhoneListShow = false
                sessionStorage.setItem('menuIndex',parseInt(id))
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
    height: auto;
    background-repeat: no-repeat;
    background-position: top;
    background-attachment: fixed;
    background-size: cover;
    background-image:url('./icon/index/index_center.jpg');
}
.main-container
{
    width: 100%;
    height: auto;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    align-content: flex-start;
    .nav-top-pc
    {
        width: 100%;
        height: 2.2rem;
        display: flex;
        justify-content: flex-end;
        position: fixed;
        align-items: center;
        padding-left: 0.5rem;
        background-color: #4d698e;
        z-index: 100;
        transition: all 0.3s;
        box-shadow: 0 0 0.5rem rgb(10, 10, 10);
        .el-row
        {
            width: 100% !important;
            height: 100% !important;
        }
        .el-row-style
        {
            height: 100%  !important;
        }
        .el-input
        {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            input
            {
                width: 100%;
                height: 55%;
                max-height: 55%;
            }
        }
        .menu-div
        {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: space-around;
            align-items: center;
            div
            {
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                transition: all 0.3s;
                position: relative;
                overflow: hidden;
                cursor: pointer;
                img
                {
                    height: 40%;
                    max-height: 40%;
                    position: relative;
                    transition: all 0.3s;
                }
                span
                {
                    width: 100%;
                    height: auto;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 0.5rem;
                    color: white;
                    letter-spacing: 0.05rem;
                    position: absolute;
                    top: 2.2rem;
                    font-weight: 600;
                    transition: all 0.3s;
                }
            }
            div:hover
            {
                background: rgba(0, 130, 216, 0.5);
                span
                {
                    margin-top: -0.9rem;
                }
                img
                {
                    margin-top: -0.9rem;
                }
            }
            .menu-active
            {
                background: rgba(0, 130, 216, 0.5);
                span
                {
                    margin-top: -0.9rem;
                }
                img
                {
                    margin-top: -0.9rem;
                }
            }
        }
        .search-div
        {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            input
            {
                background-color: transparent;
                outline: none;
                border-radius: 0.3rem 0 0 0.3rem;
                border: solid 1px rgb(0, 130, 216);
                width: 75%;
                height: 1.2rem;
                padding-left: 0.3rem;
                color: white;
                letter-spacing: 0.02rem;
                
            }
            span
            {
                width: 25%;
                height: 1.2rem;
                background: rgb(0, 130, 216);
                font-size: 0.3rem;
                border-radius: 0 0.3rem 0.3rem 0;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                color: white;
            }
        }
        .button-box
        {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            span
            {
                img
                {
                    max-height: 70%;
                }
                width: 4rem;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: rgb(0, 130, 216);
                cursor: pointer;
                transition: all 0.3s;

            }
            span:hover
            {
                color: rgb(231, 231, 231);
                background-color: rgb(0, 107, 179);
            }
        }
    }
    .nav-top-phone
    {
        width: 100%;
        height: auto;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-wrap: wrap;
        align-content: flex-start;
        background-color: #4d698e;
        box-shadow: 0 0 0.5rem rgb(10, 10, 10);
        position: fixed;
        transition: all 0.3s;
        z-index: 100;
        .top-user-inf
        {
            width: 100%;
            height: 2.2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 0.5rem 0 0.5rem;
            .left-menu
            {
                width: auto;
                height: 50%;
                max-height: 50%;
            }
        }
        .menu-list-line
        {
            width: 100%;
            height: auto;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            flex-wrap: wrap;
            align-content: flex-start;
            .sub-div
            {
                width: 100%;
                height: 2.5rem;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                padding-left: 0.5rem;
                cursor: pointer;
                transition: all 0.3s;
                img
                {
                    max-height: 55%;
                }
                span
                {
                    font-size: 0.7rem;
                    color: rgb(223, 223, 223);
                    margin-left: 1rem;
                }
            }
            .sub-div-active
            {
                background: rgba(0, 130, 216, 0.5);
            }
        }
    }
    .router-content
    {
        width: 100%;
        height: auto;
        display: block;
        margin-bottom: 0.5rem;
        .router_animate-enter-active
        {
            transition-delay: 0.8s !important;
            animation: slideInLeft 0.8s;
        }
        .router_animate-leave-active
        {
            animation: slideOutRight 0.8s;
        }
    }
    .footer-div
    {
        width: 100%;
        height: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        align-content: space-between;
        flex-wrap: wrap;
        background-color: #545c64;
        padding: 1rem;
        .top-div
        {
            width: 100%;
            height: auto;
            display: flex;
            img
            {
                width: auto;
                height: 5rem;
                max-height: 100%;
            }
            .public-div
            {
                width: 20%;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                .title-span
                {
                    width: 100%;
                    height: 2rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: white;
                    font-weight: 600;
                    font-size: 0.65rem;
                    letter-spacing: 0.1rem;
                }
                .contant-div
                {
                    width: 100%;
                    height: auto;
                    display: flex;
                    flex-direction: column;
                    .sub-div
                    {
                        width: 100%;
                        height: 1.5rem;
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        margin-bottom: 0.5rem;
                        img
                        {
                            width: auto;
                            height: 100%;
                            max-height: 100%;
                        }
                        span
                        {
                            width: auto;
                            height: 100%;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            font-size: 0.7rem;
                            color: hsla(0,0%,100% , 0.5);
                        }
                    }
                }
            }
        }
        .bottom-link
        {
            width: 100%;
            height: auto;
            margin-top: 1.5rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            a , span
            {
                text-decoration: none;
                color: rgb(243, 243, 243);
                font-size: 0.7rem;
            }
            a
            {
                margin-top: 0.3rem;
            }
        }
    }
}
@media screen and (min-width:1400px)
{
    html
    {
        font-size: 24px;
        .main-container 
        {
            .router-content
            {
                margin-top: 3.2rem;
            }
            .footer-div .top-div
            {
                justify-content: space-between;
                align-items: flex-start;
                flex-wrap: wrap;
                .public-div .contant-div .sub-div span
                {
                    margin-left: 0.6rem;
                }
            }
        }
    }
}
@media screen and (max-width:1400px) and (min-width:1200px)
{
    html
    {
        font-size: 24px;
        .main-container
        {
            .router-content
            {
                margin-top: 3.2rem;
            }
            .footer-div .top-div
            {
                justify-content: space-between;
                align-items: flex-start;
                flex-wrap: wrap;
                .public-div .contant-div .sub-div span
                {
                    margin-left: 0.6rem;
                }
            }
            
        }
    }
}
@media screen and (max-width:1200px) and (min-width:936px)
{
    html
    {
        font-size: 24px;
        .main-container 
        {
            .router-content
            {
                margin-top: 3.2rem;
            }
            .footer-div .top-div
            {
                justify-content: space-between;
                align-items: flex-start;
                flex-wrap: wrap;
                .public-div .contant-div .sub-div span
                {
                    margin-left: 0.6rem;
                }
            }
        }
    }
}
@media screen and (max-width:936px) and (min-width:767px)
{
    html
    {
        font-size: 22px;
        .main-container
        {
            .router-content
            {
                margin-top: 3.2rem;
            }
            .footer-div .top-div
            {
                flex-direction: column;
                align-items: center;
                justify-items: center;
                .public-div 
                {
                    width: auto !important;
                    .contant-div .sub-div
                    {
                        span
                        {
                            margin-left: 1rem;
                        }
                    }
                }
            }
        }
    }
}
@media screen and (max-width:767px) and (min-width:676px)
{
    html
    {
        font-size: 20px;
        .main-container
        {
            .router-content
            {
                margin-top: 3.2rem;
            }
            .footer-div .top-div
            {
                flex-direction: column;
                align-items: center;
                justify-items: center;
                .public-div 
                {
                    width: auto !important;
                    .contant-div .sub-div
                    {
                        span
                        {
                            margin-left: 1rem;
                        }
                    }
                }
            }
        }
    }
}
@media screen and (max-width:676px)
{
    html
    {
        font-size: 18px;
        .main-container
        {
            .router-content
            {
                margin-top: 3.2rem;
            }
            .footer-div .top-div
            {
                flex-direction: column;
                align-items: center;
                justify-items: center;
                .public-div 
                {
                    width: auto !important;
                    .contant-div .sub-div
                    {
                        span
                        {
                            margin-left: 1rem;
                        }
                    }
                }
            }
        }
    }
}
</style>