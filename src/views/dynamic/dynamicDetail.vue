<template>
    <div class="details-box">
        <div class="dy-back-div" @click="backRouter()">
            <i class="fas fa-chevron-left"/>
            <span>Back</span>
        </div>
        <div class="dy-top-content">
            <div class="title-span">这是标题</div>
            <div class="data-show">
                <div class="dy-sub-item">
                    <i class="far fa-calendar-alt"/>
                    <span>2021-12-22 19:13</span>
                </div>
                <div class="dy-sub-item">
                    <i class="fas fa-rocket"/>
                    <span>这次换你听歌</span>
                </div>
                <div class="dy-sub-item">
                    <i class="far fa-comment-dots"/>
                    <span>0 条评论</span>
                </div>
                <div class="dy-sub-item">
                    <i class="fas fa-tag"/>
                    <span>其他</span>
                </div>
                <div class="dy-sub-item">
                    <i class="fas fa-eye"/>
                    <span>0 浏览</span>
                </div>
            </div>
        </div>
        <div class="dy-edit-reshow-content render-by-edit" v-html="text">       
        </div>
        <div class="dy-write-comment">
            <span class="title-span">
                <i class="far fa-comment-alt"/>
                说点什么
            </span>
            <dynamic-detail-comment></dynamic-detail-comment>
        </div>
        <div class="dy-comment-content">
            <span class="title-span">
                <i class="far fa-comments"/>
                评论区
            </span>
            <div class="content">
                <div class="sub-comment-item" v-for="(item,index) in testComment" :key="index">
                    <div class="top-user-box">
                        <div class="left-user-head">
                            <img :src="item.userHead"/>
                        </div>
                        <div class="right-user-content">
                            <div class="user-name-div">
                                <span class="user-name">{{item.userName}}</span>
                                <span class="user-tag" :class="item.class === 1 ? 'server-own-b-color': item.class === 2 ? 'admin-b-color':item.class === 3 ? 'player-b-color':item.class === 4 ? 'builder-b-color':item.class === 5 ? 'vip-b-color':''">{{item.className}}</span>
                            </div>
                            <span class="user-say">{{item.inf}}</span>
                            <div class="user-when">
                                <div class="sub-item">
                                    <i class="far fa-clock"/>
                                    <span>发表于：{{item.time}}</span>
                                </div>
                                <div class="sub-item" @click="OpenBackComment(item.id)">
                                    <i class="fas fa-location-arrow"/>
                                    <span>回复</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <el-collapse-transition>
                        <div class="fix-edit-to-transition" v-if="isOpenBackComment === item.id">
                            <dynamic-detail-comment></dynamic-detail-comment>
                        </div>
                    </el-collapse-transition>
                    <div class="other-user-comment">
                        <div class="sub-other-user-item" v-for="(itemSub,indexSub) in item.commentBack" :key="indexSub">
                            <div class="left-user-head"></div>
                            <div class="right-other-user-comment">
                                <div class="other-user-head">
                                    <img :src="itemSub.userHead"/>
                                </div>
                                <div class="other-user-comment-content">
                                    <div class="other-user-name-div">
                                        <span class="user-name">{{itemSub.userName}}</span>
                                        <span class="user-tag" :class="itemSub.class === 1 ? 'server-own-b-color': itemSub.class === 2 ? 'admin-b-color':itemSub.class === 3 ? 'player-b-color':itemSub.class === 4 ? 'builder-b-color':itemSub.class === 5 ? 'vip-b-color':''">{{itemSub.className}}</span>
                                    </div>
                                    <span class="other-user-inf">{{itemSub.inf}}</span>
                                    <div class="other-user-when">
                                        <div class="sub-item">
                                            <i class="far fa-clock"/>
                                            <span>发表于：{{itemSub.time}}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <el-pagination background layout="prev, pager, next" :total="1000" :small="this.$store.getters.isPhoneGet"/>
            </div>
        </div>
    </div>
</template>
<script>
import dynamicDetailComment from '@/components/dynamic/dynamicDetailComment.vue'
import { dynamicDetailGet } from '@/util/api.js'
import { ElMessage } from 'element-plus'
export default {
    components:{
        dynamicDetailComment
    },
    data(){
        return{
            testComment:[
                {
                    id: 0,
                    userHead: require('@/views/icon/head/stranger14.jpg'),
                    userName: '这次换你听歌',
                    class: 1,
                    className: '腐竹',
                    inf: '服务器关机维护通知服务器关机维护通知服务器关机维护通知',
                    time: '2021-12-24 10:40',
                    commentBack:[
                        {
                            id: 0,
                            userHead: require('@/views/icon/head/stranger6.jpg'),
                            userName: '弔人',
                            class: 3,
                            className: '玩家',
                            inf: '单身狗不单身了。',
                            time: '2021-12-24 10:40',
                        },
                        {
                            id: 1,
                            userHead: require('@/views/icon/head/stranger9.jpg'),
                            userName: '有钱人',
                            class: 5,
                            className: 'vip',
                            inf: 'RTX 3090Ti 带不动Minecraft',
                            time: '2021-12-24 10:40',
                        }
                    ]
                },
                {
                    id: 1,
                    userHead: require('@/views/icon/head/stranger5.jpg'),
                    userName: '单身狗',
                    class: 2,
                    className: '管理员',
                    inf: '服务器关机维护通知服务器关机维护通知服务器关机维护通知',
                    time: '2021-12-24 10:40',
                    commentBack:[
                        {
                            id: 0,
                            userHead: require('@/views/icon/head/stranger18.jpg'),
                            userName: '弔人',
                            class: 4,
                            className: '建筑师',
                            inf: '单身狗不单身了。',
                            time: '2021-12-24 10:40',
                        }
                    ]
                },
                {
                    id: 2,
                    userHead: require('@/views/icon/head/stranger7.jpg'),
                    userName: '萝卜',
                    class: 3,
                    className: '玩家',
                    inf: '服务器关机维护通知服务器关机维护通知服务器关机维护通知',
                    time: '2021-12-24 10:40',
                    commentBack:[
                        {
                            id: 0,
                            userHead: require('@/views/icon/head/stranger6.jpg'),
                            userName: '弔人',
                            class: 3,
                            className: '玩家',
                            inf: '单身狗不单身了。',
                            time: '2021-12-24 10:40',
                        }
                    ]
                },
            ],
            isOpenBackComment: '',
            text: ''
        }
    },
    created(){
        dynamicDetailGet(this.$route.query.id).then(resq => {
            if(resq.flag){
                console.log(resq)
            } else {
                ElMessage.error('获取详情发生错误！ ' + resq.message)
            }
        }).catch(err => {
            ElMessage.error('获取详情发生错误！ ' + err)
        })
    },
    methods:{
        OpenBackComment(id){
            this.isOpenBackComment = id
        },
        backRouter(){
            this.$router.push('/dynamic')
        }
    }
}
</script>
<style lang="scss" scoped>
.details-box
{
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-content: flex-start;
    flex-wrap: wrap;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 1rem 0.3rem;
    .dy-back-div
    {
        height: 1.5rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 0 0.5rem;
        transition: all 0.3s;
        border-radius: 0.2rem;
        cursor: pointer;
        span
        {
            height: 100%;
            display: flex;
            align-items: center;
            font-size: 0.65rem;
            margin-left: 0.5rem;
        }
        i
        {
            height: 100%;
            display: flex;
            align-items: center;
            font-size: 1rem;
            color: #3773f3;
        }
    }
    .dy-back-div:hover
    {
        background-color: rgba(180, 180, 180, 0.555);
    }
    .dy-top-content
    {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        .title-span
        {
            width: 70%;
            display: flex;
            justify-content: center;
            text-align: center;
            font-size: 1rem;
            font-weight: 600;
            text-align: center;
        }
        .data-show
        {
            width: 100%;
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            margin-top: 0.5rem;
            .dy-sub-item
            {
                height: 1rem;
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 0 0.3rem 0 0.3rem;
                span , i
                {
                    font-size: 0.6rem;
                }
                span
                {
                    margin-left: 0.3rem;
                }
            }
        }
    }
    .dy-edit-reshow-content
    {
        width: 100%;
        margin-top: 0.5rem;
    }
    .dy-write-comment , .dy-comment-content
    {
        .title-span
        {
            width: 100%;
            height: 1.5rem;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            font-size: 0.9rem;
            color: rgb(61, 60, 60);
            border-bottom: solid 0.1rem rgb(206, 206, 206);
            margin: 0.5rem 0;
            i
            {
                margin-right: 0.5rem;
                color: rgb(25, 156, 238);
            }
        }
    }
    .dy-write-comment
    {
        width: 100%;
        display: flex;
        justify-content: center;
        align-content: flex-start;
        flex-wrap: wrap;
        padding: 0 0.5rem;
    }
    .dy-comment-content
    {
        width: 100%;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        align-content: flex-start;
        padding: 0 0.5rem;
        .content
        {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            align-content: flex-start;
            justify-content: center;
            .sub-comment-item
            {
                width: 100%;
                display: flex;
                align-content: flex-start;
                flex-wrap: wrap;
                margin: 0.5rem 0;
                .top-user-box
                {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    .left-user-head
                    {
                        box-shadow: 0 0 0.2rem rgb(105, 105, 105);
                        border-radius: 50%;
                        overflow: hidden;
                        img
                        {
                            width: 100%;
                            object-fit: cover;
                        }
                    }
                    .right-user-content
                    {
                        width: 100%;
                        display: flex;
                        flex-wrap: wrap;
                        align-content: flex-start;
                        border-left: solid 0.2rem #3773f3;
                        border-right: solid 0.2rem #3773f3;
                        padding: 0.3rem;
                        box-shadow: 0 0.1rem 0.8rem -0.6rem black;
                        background-color: rgba(255,255,255,0.4);
                        position: relative;
                        .user-name-div
                        {
                            width: 100%;
                            display: flex;
                            justify-content: flex-start;
                            align-items: center;
                            .user-name
                            {
                                font-size: 0.68rem;
                                letter-spacing: 0.02rem;
                                color: rgb(24, 24, 24);
                            }
                            .user-tag
                            {
                                padding: 0.15rem 0.35rem;
                                font-size: 0.45rem;
                                border-radius: 0.3rem;
                                color: #ffffff;
                                box-shadow: 0 0 0.05rem black;
                                margin-left: 0.5rem;
                            }
                        }
                        .user-say
                        {
                            width: 100%;
                            display: flex;
                            justify-content: flex-start;
                            align-items: flex-start;
                            text-align: left;
                            word-break: break-all;
                            word-spacing: normal;
                            font-size: 0.6rem;
                            color: rgb(68, 68, 68);
                            letter-spacing: 0.03rem;
                            margin: 0.5rem 0 0.5rem 0;
                        }
                        .user-when
                        {
                            width: 100%;
                            display: flex;
                            justify-content: space-between;
                            flex-wrap: wrap;
                            height: 1rem;
                            .sub-item
                            {
                                height: 100%;
                                display: flex;
                                align-items: center;
                                i
                                {
                                    height: 100%;
                                    display: flex;
                                    align-items: center;
                                    font-size: 0.55rem;
                                    transition: all 0.3s;
                                }
                                span
                                {
                                    height: 100%;
                                    display: flex;
                                    align-items: center;
                                    font-size: 0.55rem;
                                    margin-left: 0.2rem;
                                }
                            }
                            .sub-item:nth-child(2)
                            {
                                cursor: pointer;
                            }
                            .sub-item:nth-child(2):hover
                            {
                                i
                                {
                                    color: #3773f3;
                                }
                            }
                        }
                    }
                    .right-user-content::after
                    {
                        content: "";
                        position: absolute;
                        border-top: solid 0.3rem transparent;
                        border-right: solid 0.4rem #3773f3;
                        border-bottom: solid 0.3rem transparent;
                        left: -0.6rem;
                        top: 1rem;
                    }
                }
                .fix-edit-to-transition
                {
                    width: 100%;
                    margin-top: 0.5rem;
                }
                .other-user-comment
                {
                    width: 100%;
                    display: flex;
                    flex-wrap: wrap;
                    align-content: flex-start;
                    margin-top: 0.5rem;
                    .sub-other-user-item
                    {
                        width: 100%;
                        display: flex;
                        justify-content: space-between;
                        margin: 0.25rem 0;
                        .right-other-user-comment
                        {
                            width: 100%;
                            display: flex;
                            justify-content: space-between;
                            .other-user-head
                            {
                                width: 2.5rem;
                                min-width: 2.5rem;
                                height: 2.5rem;
                                overflow: hidden;
                                border-radius: 50%;
                                img
                                {
                                    object-fit: cover;
                                    width: 100%;
                                }
                            }
                            .other-user-comment-content
                            {
                                width: 100%;
                                display: flex;
                                align-content: flex-start;
                                flex-wrap: wrap;
                                border-left: solid 0.2rem #807fe2;
                                border-right: solid 0.2rem #807fe2;
                                padding: 0.3rem;
                                box-shadow: 0 0.1rem 0.8rem -0.6rem black;
                                background-color: rgba(255,255,255,0.1);
                                position: relative;
                                .other-user-name-div
                                {
                                    width: 100%;
                                    display: flex;
                                    justify-content: flex-start;
                                    align-items: center;
                                    .user-name
                                    {
                                        font-size: 0.6rem;
                                        color: rgb(24, 24, 24);
                                    }
                                    .user-tag
                                    {
                                        padding: 0.1rem 0.3rem;
                                        font-size: 0.45rem;
                                        border-radius: 0.3rem;
                                        color: #ffffff;
                                        box-shadow: 0 0 0.05rem black;
                                        margin-left: 0.5rem;
                                    }
                                }
                                .other-user-inf
                                {
                                    width: 100%;
                                    display: flex;
                                    justify-content: flex-start;
                                    align-items: flex-start;
                                    text-align: left;
                                    word-break: break-all;
                                    word-spacing: normal;
                                    font-size: 0.55rem;
                                    color: rgb(68, 68, 68);
                                    letter-spacing: 0.03rem;
                                    margin: 0.5rem 0 0.5rem 0;
                                }
                                .other-user-when
                                {
                                    width: 100%;
                                    display: flex;
                                    justify-content: space-between;
                                    flex-wrap: wrap;
                                    height: 1rem;
                                    .sub-item
                                    {
                                        height: 100%;
                                        display: flex;
                                        align-items: center;
                                        i
                                        {
                                            height: 100%;
                                            display: flex;
                                            align-items: center;
                                            font-size: 0.55rem;
                                            transition: all 0.3s;
                                        }
                                        span
                                        {
                                            height: 100%;
                                            display: flex;
                                            align-items: center;
                                            font-size: 0.55rem;
                                            margin-left: 0.2rem;
                                        }
                                    }
                                }
                            }
                            .other-user-comment-content::after
                            {
                                content: "";
                                position: absolute;
                                border-top: solid 0.3rem transparent;
                                border-right: solid 0.4rem #807fe2;
                                border-bottom: solid 0.3rem transparent;
                                left: -0.6rem;
                                top: 1rem;
                            }
                        }
                    }
                }
            }
        }
    }
}
@media screen and (min-width:1400px)
{
    .details-box
    {
        .dy-comment-content .content .sub-comment-item
        {
            .top-user-box , .other-user-comment
            {
                .left-user-head
                {
                    width: 3rem;
                    min-width: 3rem;
                    height: 3rem;
                }
                .right-user-content , .other-user-comment-content
                {
                    margin-left: 1rem;
                }
            }
        }
    }
}
@media screen and (max-width:1400px) and (min-width:1200px)
{
    .details-box
    {
        .dy-comment-content .content .sub-comment-item
        {
            .top-user-box , .other-user-comment
            {
                .left-user-head
                {
                    width: 3rem;
                    min-width: 3rem;
                    height: 3rem;
                }
                .right-user-content , .other-user-comment-content
                {
                    margin-left: 1rem;
                }
            }
        }
    }
}
@media screen and (max-width:1200px) and (min-width:936px)
{
    .details-box
    {
        .dy-comment-content .content .sub-comment-item
        {
            .top-user-box , .other-user-comment
            {
                .left-user-head
                {
                    width: 2.5rem;
                    min-width: 2.5rem;
                    height: 2.5rem;
                }
                .right-user-content , .other-user-comment-content
                {
                    margin-left: 1rem;
                }
            }
        }
    }
}
@media screen and (max-width:936px) and (min-width:767px)
{
    .details-box
    {
        .dy-comment-content .content .sub-comment-item
        {
            .top-user-box , .other-user-comment
            {
                .left-user-head
                {
                    width: 2.5rem;
                    min-width: 2.5rem;
                    height: 2.5rem;
                }
                .right-user-content , .other-user-comment-content
                {
                    margin-left: 0.5rem;
                }
            }
        }
    }
}
@media screen and (max-width:767px) and (min-width:676px)
{
    .details-box
    {
        .dy-comment-content .content .sub-comment-item
        {
            .top-user-box , .other-user-comment
            {
                .left-user-head
                {
                    width: 2.5rem;
                    min-width: 2.5rem;
                    height: 2.5rem;
                }
                .right-user-content , .other-user-comment-content
                {
                    margin-left: 0.5rem;
                }
            }
        }
    }
}
@media screen and (max-width:676px)
{
    .details-box
    {
        .dy-comment-content .content .sub-comment-item
        {
            .top-user-box , .other-user-comment
            {
                .left-user-head
                {
                    width: 2.5rem;
                    min-width: 2.5rem;
                    height: 2.5rem;
                }
                .right-user-content , .other-user-comment-content
                {
                    margin-left: 0.5rem;
                }
            }
        }
    }
}
</style>