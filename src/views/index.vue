<template>
    <div class="index-div">
        <div class="index-center-show">
            <img class="back-iamge" :src="indexImage"/>
            <div class="center-text">
                <span class="welcome-tips">欢迎来到</span>
                <h2>凡尔赛小镇</h2>
                <div class="describe">
                    <span>生存、宠物、RPG、领地、养老</span>
                    <span>Minecraft Java Edition</span>
                    <span>服务器支持版本：1.17 ~ 最新版本</span>
                    <span>服务器地址：mc.superarilo.icu</span>
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
            <div class="play-content-box">
                <div class="sub-item" v-for="item in playContentList" :key="item.id" :style="this.$store.getters.isPhoneGet ? 'flex-direction: column-reverse;' : item.id % 2 == 0 ? 'flex-direction: row-reverse;' : ''">
                    <div class="picture" @click="previewImg($event)">
                        <img :src="item.image"/>
                    </div>
                    <div class="content-describe" :style="this.$store.getters.isPhoneGet ? 'margin-bottom: 1rem;' : item.id % 2 == 0 ? 'margin-right: 1rem;':'margin-left: 1rem;'">
                        <span class="title">{{item.title}}</span>
                        <span class="content" :style="[this.$store.getters.isPhoneGet ? 'text-align: center;':'text-align: left;']">{{item.describe}}</span>
                    </div>
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
                            <a href="https://play.mcmod.cn/sv20185883.html" target="_block">点击投票</a>
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
            <div class="col-server-team">
                <div class="sub-item" v-for="item in serverTeamHeadList" :key="item.id">
                    <div class="head">
                        <img :src="item.head"/>
                    </div>
                    <span class="name">{{item.name}}</span>
                    <span class="class">{{item.className}}</span>
                </div>
            </div>
            <div class="title-item">
                <span class="why-inf">截图欣赏</span>
                <span class="line"></span>
                <span class="english-inf">Screenshot appreciate</span>
            </div>
            <div class="town-show-scroll">
                <el-carousel :height="25 + 'rem'">
                    <el-carousel-item v-for="item in bottomPictureList" :key="item.id">
                        <img :src="item.image"/>
                    </el-carousel-item>
                </el-carousel>
            </div>
        </div>
        <footer-bottom/>
    </div>
</template>
<script>
import { ElMessage } from 'element-plus'
import FooterBottom from '@/components/footerBottom.vue'
import { showImages } from 'vue-img-viewr'
import 'vue-img-viewr/styles/index.css'
export default {
    components:{
        FooterBottom
    },
    data(){
        return{
            indexImage: 'http://image.superarilo.icu/townBg.png',
            netWorkShow: 'http://image.superarilo.icu/icon/netWork.png',
            bbs: 'http://image.superarilo.icu/icon/bbs.png',
            safe: 'http://image.superarilo.icu/icon/safe.png',
            activity: 'http://image.superarilo.icu/icon/activity.png',
            publicWelfare: 'http://image.superarilo.icu/icon/publicWelfare.png',
            server: 'http://image.superarilo.icu/icon/server.png',
            mcbaike: 'http://image.superarilo.icu/icon/mcbaike.gif',
            playContentList:[
                {
                    id: 1,
                    image: 'http://image.superarilo.icu/playContent1.png',
                    title: '基于原版生存',
                    describe: '我们保留了Minecraft最原始的生存冒险，让玩家感受和体验最纯正的玩法。在保证原版玩法不变的基础上，扩展新玩法。增加用于探险和冒险的资源世界，并且世界版本为1.18，拥有洞穴和高山。'
                },
                {
                    id: 2,
                    image: 'http://image.superarilo.icu/playContent2.png',
                    title: 'RPG等级玩法',
                    describe: '服务器提供RPG升级和技能系统，并且有多种技能可供使用，右边计分板实时显示您当前的魔法量，在这里可以升级刷怪、快速开采、高效种植、和好朋友一起PVP！'
                },
                {
                    id: 3,
                    image: 'http://image.superarilo.icu/playContent3.png',
                    title: '宠物玩法',
                    describe: '服务器提供Minecraft原有生物的捕捉和抚养功能，您可以在系统商店里购买新宠物，也可以去野外捕捉宠物。您还可以召唤您的宠物来协助你战斗、帮助您拾取东西、给您提供信标的效果等等！'
                }
            ],
            bottomPictureList:[
                {
                    id: 1,
                    image: 'http://image.superarilo.icu/show1.png'
                },
                {
                    id: 2,
                    image: 'http://image.superarilo.icu/show2.png'
                },
                {
                    id: 3,
                    image: 'http://image.superarilo.icu/show3.png'
                },
                {
                    id: 4,
                    image: 'http://image.superarilo.icu/show4.png'
                },
                {
                    id: 5,
                    image: 'http://image.superarilo.icu/show5.png'
                },
                {
                    id: 6,
                    image: 'http://image.superarilo.icu/show6.png'
                },
                {
                    id: 7,
                    image: 'http://image.superarilo.icu/show7.png'
                },
                {
                    id: 8,
                    image: 'http://image.superarilo.icu/show8.png'
                },
                {
                    id: 9,
                    image: 'http://image.superarilo.icu/show9.png'
                },
                {
                    id: 10,
                    image: 'http://image.superarilo.icu/show10.png'
                }
            ],
            serverTeamHeadList:[],
            imageList:[]
        }   
    },
    created(){
        this.$store.getters.serverTeamListGet.findIndex(item => {
            this.mojangApi(item.javaMcId,item.uid,item.className)
        })
    },
    methods:{
        async mojangApi(javaId,userId,className){
            this.$axios.get('https://api.ashcon.app/mojang/v2/user/' + javaId).then(resq => {
                if(resq.status === 200){
                    this.getAvatars(resq.data.uuid,javaId,userId,className)
                } else {
                    ElMessage.error('获取玩家的信息出错,请稍后重试! ' + resq.statusText)
                }
            }).catch(err => {
                ElMessage.error('获取玩家的信息出错,请稍后重试! ' + err)
            })
        },
        arrayBufferToBase64(Buffer){
            let binary = ''
            let bytes = new Uint8Array(Buffer)
            let len = bytes.byteLength
            for (let i = 0; i < len; i++) {
                binary += String.fromCharCode(bytes[i]);
            }
            return 'data:image/png;base64,' + window.btoa(binary)
        },
        getAvatars(uuid,javaId,userId,className){
            this.$axios.get('https://crafatar.com/avatars/' + uuid , { responseType: 'arraybuffer' }).then(subResq => {
                if(subResq.status === 200){
                    this.serverTeamHeadList.unshift({id: userId,head: this.arrayBufferToBase64(subResq.data),name: javaId,className: className})
                } else {
                    ElMessage.error('获取玩家的皮肤出错,请稍后重试! ' + subResq.statusText)
                }
            }).catch(subErr => {
                ElMessage.error('获取玩家的皮肤出错,请稍后重试! ' + subErr)
            })
        },
        previewImg(e){
            this.imageList.push($(e.target).attr('src'))
            showImages({urls: this.imageList, index: 0, onClose: () => {
                this.imageList = []
            }})
        },
    }
}
</script>
<style lang="scss" scoped>
.index-div
{
    width: 100%;
    display: flex;
    justify-content: center;
    align-content: flex-start;
    flex-wrap: wrap;
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
        }
        .center-text
        {
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
                margin: 1rem 0;
                font-size: 2.2rem;
                text-align: center;
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
                    font-size: 0.85rem;
                    color: #c2c2c2;
                    text-align: center;
                    margin: 0.1rem 0;
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
        .play-content-box
        {
            width: 100%;
            display: flex;
            justify-content: center;
            align-content: flex-start;
            flex-wrap: wrap;
            .sub-item
            {
                display: flex;
                justify-content: center;
                margin: 1rem 0;
                .picture
                {
                    border-radius: 0.2rem;
                    overflow: hidden;
                    box-shadow: 0 0 0.1rem black;
                    cursor: pointer;
                    img
                    {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                }
                .content-describe
                {
                    width: 100%;
                    display: flex;
                    align-content: flex-start;
                    flex-wrap: wrap;
                    .title , .content
                    {
                        width: 100%;
                        letter-spacing: 0.05rem;
                    }
                    .title
                    {
                        font-size: 0.8rem;
                        font-weight: bold;
                        text-align: center;
                    }
                    .content
                    {
                        margin-top: 0.5rem;
                        font-size: 0.65rem;
                        letter-spacing: 0.05rem;
                        color: rgb(65, 65, 65);
                    }
                }
            }
        }
        .col-server-team
        {
            width: 100%;
            margin: 2rem 0;
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            .sub-item
            {
                width: 6rem;
                display: flex;
                justify-content: center;
                align-content: flex-start;
                flex-wrap: wrap;
                margin: 1rem;
                .head
                {
                    width: 3rem;
                    height: 3rem;
                    img
                    {
                        width: 100%;
                        height: 100%;
                    }
                }
                .name , .class
                {
                    width: 100%;
                    text-align: center;
                    margin-top: 0.5rem;
                    font-size: 0.7rem;
                    letter-spacing: 0.05rem;
                    word-break: break-all;
                }
            }
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
        .play-content-box
        {
            .sub-item
            {
                width: 70%;
                .picture
                {
                    width: 40rem;
                }
            }
        }
    }
}
@media screen and (max-width:1400px) and (min-width:1200px)
{
    .index-div .index-describe
    {
        .play-content-box
        {
            .sub-item
            {
                width: 75%;
                .picture
                {
                    width: 35rem;
                }
            }
        }
    }
}
@media screen and (max-width:1200px) and (min-width:936px)
{
    .index-div .index-describe
    {
        .play-content-box
        {
            .sub-item
            {
                width: 80%;
                .picture
                {
                    width: 30rem;
                }
            }
        }
    }
}
@media screen and (max-width:936px) and (min-width:767px)
{
    .index-div .index-describe
    {
        .play-content-box
        {
            .sub-item
            {
                width: 80%;
                flex-wrap: wrap;
                .picture
                {
                    width: 100%;
                }
            }
        }
    }
}
@media screen and (max-width:767px) and (min-width:676px)
{
    .index-div .index-describe
    {
        .play-content-box
        {
            .sub-item
            {
                width: 80%;
                flex-wrap: wrap;
                .picture
                {
                    width: 100%;
                }
            }
        }
    }
}
@media screen and (max-width:676px)
{
    .index-div .index-describe
    {
        .play-content-box
        {
            .sub-item
            {
                width: 80%;
                flex-wrap: wrap;
                .picture
                {
                    width: 100%;
                }
            }
        }
    }
}
</style>