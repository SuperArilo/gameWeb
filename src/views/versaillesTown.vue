<template>
    <div class="index-div">
        <div class="index-center-show">
            <img class="back-iamge" :src="indexImage"/>
            <div class="center-text">
                <span class="welcome-tips">欢迎来到</span>
                <h2>凡尔赛小镇</h2>
                <div class="describe">
                    <span>生存、宠物、RPG、领地、养老</span>
                    <span>当前服务器版本：1.18.1</span>
                </div>
            </div>
        </div>
        <div class="index-describe">
            <div class="title-item">
                <span class="why-inf">为什么选择我们的服务器</span>
                <span class="line"></span>
                <span class="english-inf">Why choose our server?</span>
            </div>
            <div class="col-des-div">
                <el-row>
                    <el-col :xs="0" :sm="0" :md="0" :lg="3" :xl="3"></el-col>
                    <el-col :xs="8" :sm="8" :md="8" :lg="6" :xl="6">
                        <div class="item-div">
                            <div class="show-div">
                                <span style="background-color: #87CEEB;" class="first">低延迟</span>
                                <img :src="netWorkShow"/>
                            </div>
                            <span class="introduce-span">服务器归属于天翼云，依靠天翼云强大的运算能力，为服务器保驾护航，提供极低的延迟</span>
                        </div>
                    </el-col>
                    <el-col :xs="8" :sm="8" :md="8" :lg="6" :xl="6">
                        <div class="item-div">
                            <div class="show-div">
                                <span class="first" style="background-color: #8470FF;">论坛</span>
                                <img :src="bbs"/>
                            </div>
                            <span class="introduce-span">我们有一群善良友好的老玩家指引你游玩！后面会开放论坛互动，敬请期待吧！</span>
                        </div>
                    </el-col>
                    <el-col :xs="8" :sm="8" :md="8" :lg="6" :xl="6">
                        <div class="item-div">
                            <div class="show-div">
                                <span class="first" style="background-color: #32CD32">加密</span>
                                <img :src="safe"/>
                            </div>
                            <span class="introduce-span">服务器和数据库为独立运行，全程HTTPS加密连接，保护所有玩家的隐私安全！</span>
                        </div>
                    </el-col>
                    <el-col :xs="0" :sm="0" :md="0" :lg="3" :xl="3"></el-col>
                </el-row>
            </div>
            <div class="col-des-div">
                <el-row>
                    <el-col :xs="0" :sm="0" :md="0" :lg="3" :xl="3"></el-col>
                    <el-col :xs="8" :sm="8" :md="8" :lg="6" :xl="6">
                        <div class="item-div">
                            <div class="show-div">
                                <span style="background-color: #FF4500;" class="first">活动</span>
                                <img :src="activity"/>
                            </div>
                            <span class="introduce-span">我们会在某些传统的日子发放福利，进行游戏活动！</span>
                        </div>
                    </el-col>
                    <el-col :xs="8" :sm="8" :md="8" :lg="6" :xl="6">
                        <div class="item-div">
                            <div class="show-div">
                                <span class="first" style="background-color: #CDB5CD;">公益</span>
                                <img :src="publicWelfare"/>
                            </div>
                            <span class="introduce-span">服务器是完全公益性质！所有玩家都是平等的！</span>
                        </div>
                    </el-col>
                    <el-col :xs="8" :sm="8" :md="8" :lg="6" :xl="6">
                        <div class="item-div">
                            <div class="show-div">
                                <span class="first" style="background-color: #3CB371">稳定线上</span>
                                <img :src="server"/>
                            </div>
                            <span class="introduce-span">服务器与数据库稳定运行24小时不间断！</span>
                        </div>
                    </el-col>
                    <el-col :xs="0" :sm="0" :md="0" :lg="3" :xl="3"></el-col>
                </el-row>
            </div>
            <div class="title-item">
                <span class="why-inf">服务器玩法内容</span>
                <span class="line"></span>
                <span class="english-inf">Play content</span>
            </div>
            <div class="play-content-div-left-right">
                <div class="left">
                    <span>基于原版生存</span>
                    <span>在保证原版玩法不变的的基础上，扩展新玩法。服务器所有使用的插件都来源于开源社区！</span>
                </div>
                <div class="right">
                    <img :src="indexImage"/>
                </div>
            </div>
            <div class="play-content-div-right-left">
                <div class="left">
                    <img :src="indexImage"/>
                </div>
                <div class="right">
                    <span>RPG等级玩法</span>
                    <span>服务器提供RPG升级和技能系统，在这里可以升级刷怪、快速开采、高效种植、和好朋友一起PVP！</span>
                </div>
            </div>
            <div class="play-content-div-left-right">
                <div class="left">
                    <span>宠物玩法</span>
                    <span>服务器提供宠物功能，此插件来源于开源社区的MyPet插件！在这里可以捕捉到宠物，进行升级、培养、选择技能树等等。甚至可以在商店购买！</span>
                </div>
                <div class="right">
                    <img :src="indexImage"/>
                </div>
            </div>
            <div class="title-item">
                <span class="why-inf">为服务器点赞吧！</span>
                <span class="line"></span>
                <span class="english-inf">Like server now!</span>
            </div>
            <div class="col-des-div">
                <el-row>
                    <el-col :xs="0" :sm="0" :md="0" :lg="3" :xl="3"></el-col>
                    <el-col :xs="8" :sm="8" :md="8" :lg="6" :xl="6">
                    </el-col>
                    <el-col :xs="8" :sm="8" :md="8" :lg="6" :xl="6">
                        <div class="like-link-div">
                            <img :src="mcbaike"/>
                            <a href="https://play.mcmod.cn/sv20185883.html">点击投票</a>
                        </div>
                    </el-col>
                    <el-col :xs="8" :sm="8" :md="8" :lg="6" :xl="6">
                    </el-col>
                    <el-col :xs="0" :sm="0" :md="0" :lg="3" :xl="3"></el-col>
                </el-row>
            </div>
            <div class="title-item">
                <span class="why-inf">服务器管理团队</span>
                <span class="line"></span>
                <span class="english-inf">Server management team</span>
            </div>
            <div class="col-server-team"></div>
            <div class="title-item">
                <span class="why-inf">截图欣赏</span>
                <span class="line"></span>
                <span class="english-inf">Screenshot appreciate</span>
            </div>
            <div class="town-show-scroll">
                <el-carousel :height="25 + 'rem'">
                    <el-carousel-item v-for="(item,index) in testPicture" :key="index">
                        <img :src="item.image"/>
                    </el-carousel-item>
                </el-carousel>
            </div>
        </div>
        <footer-bottom></footer-bottom>
    </div>
</template>
<script>
import FooterBottom from '../components/footerBottom.vue'
export default {
    components:{
        FooterBottom
    },
    data(){
        return{
            indexImage: require('@/icon/index/versaillestown/townIndex1.jpg'),
            netWorkShow: require('@/icon/index/versaillestown/netWork.png'),
            bbs: require('@/icon/index/versaillestown/bbs.png'),
            safe: require('@/icon/index/versaillestown/safe.png'),
            activity: require('@/icon/index/versaillestown/activity.png'),
            publicWelfare: require('@/icon/index/versaillestown/publicWelfare.png'),
            server: require('@/icon/index/versaillestown/server.png'),
            mcbaike: require('@/icon/index/versaillestown/mcbaike.gif'),
            testPicture:[
                {
                    id: 0,
                    image: require('@/icon/index/versaillestown/townIndex1.jpg')
                },
                {
                    id: 1,
                    image: require('@/icon/index/versaillestown/townIndex2.jpg')
                },
                {
                    id: 2,
                    image: require('@/icon/index/versaillestown/townIndex3.jpg')
                },
                {
                    id: 3,
                    image: require('@/icon/index/versaillestown/townIndex4.jpg')
                }
            ]
        }   
    },
    created(){

    },
    mounted(){
    },
    methods:{

    }
}
</script>
<style lang="scss" scoped>
.index-div
{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: wrap;
    position: relative;
    .index-center-show
    {
        width: 100%;
        height: 30rem;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        .back-iamge
        {
            width: 100%;
            height: 100%;
            position: absolute;
            z-index: 1;
            object-fit: cover;
            filter: brightness(80%)
        }
        .center-text
        {
            padding: 2rem 3rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
            z-index: 10;
            border-radius: 0.2rem;
            .welcome-tips
            {
                font-size: 1.2rem;
                color: #ffffff;
                letter-spacing: 0.3rem;
            }
            h2
            {
                margin: 0;
                padding: 1rem 0;
                font-size: 2.2rem;
                color: #ffffff;
                font-weight: 400;
                letter-spacing: 0.3rem;
            }
            .describe
            {
                display: flex;
                flex-direction: column;
                align-items: center;
                span
                {
                    font-size: 0.9rem;
                    color: #e7e7e7;
                }
            }
        }
    }
    .index-describe
    {
        width: 100%;
        margin-top: 2rem;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-wrap: wrap;
        .title-item
        {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            .why-inf
            {
                font-size: 1rem;
                letter-spacing: 0.2rem;
            }
            .line
            {
                width: 16rem;
                height: 0.1rem;
                margin: 1rem 0 1rem 0;
                background-color: #707070;
            }
            .english-inf
            {
                font-size: 0.8rem;
                word-break: break-all;
                letter-spacing: 0.1rem;
            }
        }
        .col-des-div
        {
            width: 100%;
            margin: 2rem 0 2rem 0;
            .item-div , .like-link-div
            {
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            .item-div
            {
                
                .show-div
                {
                    width: 5rem;
                    height: 5rem;
                    display: flex;
                    justify-content: center;
                    align-items: flex-start;
                    flex-wrap: wrap;
                    overflow: hidden;
                    .first
                    {
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                        font-size: 1rem;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        color: #ffffff;
                        text-align: center;
                        transition: all 0.3s;
                    }
                    img
                    {
                        width: 100%;
                        height: 100%;
                        transition: all 0.3s;
                    }
                }
                .show-div:hover
                {
                    .first
                    {
                        margin-top: -5rem;
                    }
                }
                .introduce-span
                {
                    margin-top: 1rem;
                    max-width: 80%;
                    font-size: 0.65rem;
                    text-align: center;
                    word-break: break-all;
                    letter-spacing: 0.1rem;
                }
            }
            .like-link-div
            {
                img
                {
                    height: 5rem;
                    max-height: 100%;
                }
                a
                {
                    margin-top: 1rem;
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 0.65rem;
                    text-align: center;
                    word-break: break-all;
                    letter-spacing: 0.1rem;
                }
            }
        }
        .play-content-div-left-right , .play-content-div-right-left
        {
            display: flex;
            align-items: center;
            margin: 2rem 0 2rem 0;
            .left , .right
            {
                display: flex;
                justify-content: center;
                align-items: center;
                align-content: flex-start;
                flex-wrap: wrap;
                img
                {
                    height: 100%;
                    border-radius: 0.3rem;
                    object-fit: cover;
                }
                span
                {
                    display: flex;
                    align-items: flex-start;
                }
                span:nth-child(1)
                {
                    justify-content: center;
                    font-size: 1rem;
                }
                span:nth-child(2)
                {
                    justify-content: flex-start;
                    font-size: 0.65rem;
                    text-align: left;
                    color: #4b4b4b;
                    letter-spacing: 0.08rem;
                    margin-top: 0.5rem;
                    word-break: break-all;
                    word-wrap: break-word;
                }
            }
        }
        .play-content-div-left-right
        {
            .left
            {
                display: flex;
                justify-content: center;
                align-items: flex-start;
            }
        }
        .play-content-div-right-left
        {
            .right
            {
                display: flex;
                justify-content: center;
                align-items: flex-start;
            }
        }
        .col-server-team
        {
            width: 100%;
            margin: 2rem 0 2rem 0;
        }
        .town-show-scroll
        {
            width: 100%;
            position: relative;
            margin-top: 2rem;
            img
            {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
    }
}
@media screen and (min-width:1400px)
{
    .index-div .index-describe
    {
        .play-content-div-left-right , .play-content-div-right-left
        {
            width: 80%;
            justify-content: space-around;
            .left , .right
            {
                width: 45%;
                height: 14rem;
                span
                {
                    width: 80%;
                }
            }
        }
    }
}
@media screen and (max-width:1400px) and (min-width:1200px)
{
    .index-div .index-describe
    {
        .play-content-div-left-right , .play-content-div-right-left
        {
            width: 80%;
            justify-content: space-around;
            .left , .right
            {
                width: 45%;
                height: 14rem;
                span
                {
                    width: 80%;
                }
            }
        }
    }
}
@media screen and (max-width:1200px)
{
    .index-div .index-describe
    {
        .play-content-div-left-right , .play-content-div-right-left
        {
            width: 100%;
            flex-direction: column;
            flex-wrap: wrap;
            .left , .right
            {
                span
                {
                    width: 100%;
                }
            }
        }
        .play-content-div-left-right
        {
            .left
            {
                width: 70%;
            }
            .right
            {
                width: 90%;
                margin-top: 2rem;
            }
        }
        .play-content-div-right-left
        {
            .left
            {
                width: 90%;
                margin-bottom: 2rem;
            }
            .right
            {
                width: 70%;
            }
        }
    }
}
</style>