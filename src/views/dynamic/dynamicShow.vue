<template>
    <div class="content-box">
        <div class="top-menu">
            <div class="user-func-div">
                <div class="left-menu">
                    <el-dropdown class="dropdown-menu">
                        <span>{{dropdownMenuTitle}}
                            <i class="fa fa-chevron-down"/>
                        </span>
                        <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item v-for="(item,index) in dropdownMenu" :key="index" @click="dropdownMenuFunc(item.id,item.title,item.order)">{{item.title}}</el-dropdown-item>
                        </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                    <div class="choice-tag" @click="openChoiceTags =! openChoiceTags">
                        <span>选择标签</span>
                        <i class="fas fa-caret-down"/>
                    </div>
                    <i class="fas fa-redo refresh" @click="refreshFunc()"/>
                </div>
                <div class="right-menu">
                    <i class="far fa-edit edit-icon" @click="editRouter()"/>
                </div>
            </div>
            <el-collapse-transition>
                <div v-if="openChoiceTags" class="tag-content">
                    <span class="tag-sub-item" v-for="(item,index) in tagList" :key="index" @click="tagFunc(item.id,item.title)">
                        {{item.title}}
                    </span>
                </div>
            </el-collapse-transition>
            <div class="tag-show">
                <span class="tag-sub-item" v-for="(item,index) in this.$store.getters.dyTagListGet" :key="index">
                    {{item.title}}
                    <i class="fas fa-trash-alt" @click="delTag(item.id)"/>
                </span>
            </div>
        </div>
        <div class="dy-content">
            <i class="fas fa-sync-alt refresh-div fa-spin" :class="this.$store.getters.dyAllLoadingGet ? 'refresh-div-is-loaded':''"/>
            <transition name="list">
                <div class="data-empty" v-if="this.$store.getters.dyContentGet.length === 0">
                    <span>没有动态数据哦！</span>
                    <i class="fas fa-inbox"/>
                </div>
            </transition>
            <transition-group name="list">
                <div class="sub-item" v-for="(item,index) in this.$store.getters.dyContentGet" :key="index" :class="item.clazz === 1 ? 'server-own-border': item.clazz === 2 ? 'admin-border':item.clazz === 3 ? 'player-border':item.clazz === 4 ? 'builder-border':item.clazz === 5 ? 'vip-border':''">
                    <div class="title-and-user-head">
                        <span class="title">{{item.dynamicTitle}}</span>
                        <div class="user-head">
                            <img :src="item.userHead"/>
                        </div>
                    </div>
                    <div class="dy-inf-show">
                        <div class="dy-sub-item">
                            <i class="far fa-calendar-alt"/>
                            <span>{{item.createTime}}</span>
                        </div>
                        <div class="dy-sub-item">
                            <i class="fas fa-rocket"/>
                            <span>{{item.username}}</span>
                        </div>
                        <div class="dy-sub-item">
                            <i class="far fa-comment-dots"/>
                            <span>{{item.commentNum}} 条评论</span>
                        </div>
                        <div class="dy-sub-item">
                            <i class="fas fa-tag"/>
                            <span v-for="(itemSub,indexSub) in item.tags" :key="indexSub">{{itemSub.tagContent}}</span>
                        </div>
                        <div class="dy-sub-item">
                            <i class="far fa-eye"/>
                            <span>{{item.dynamicPageView}} 浏览</span>
                        </div>
                    </div>
                    <span class="dy-introduction">
                        {{item.dynamicDescribe}}
                    </span>
                    <div class="bottom-buttom">
                        <el-dropdown>
                            <i class="fas fa-ellipsis-v"/>
                            <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item v-for="(itemDyFunc,indexDyFunc) in dyFuncList" :key="indexDyFunc">{{itemDyFunc.title}}</el-dropdown-item>
                            </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                        <span class="buttom" @click="detailsRouterfunc(item.id)">跃迁</span>
                    </div>
                </div>
            </transition-group>
        </div>
        <div class="dy-change-page">
            <el-pagination background layout="prev, pager, next" :total="80" :page-size="10" v-model:currentPage="currentPage" @current-change="pageChange" :small="this.$store.getters.isPhoneGet"/>
        </div>
    </div>
</template>
<script>
import { ElMessage } from 'element-plus'
import { dynamicGet } from '@/util/api.js'
export default {
    data(){
        return{
            dropdownMenu:[
                {
                    id: 0,
                    title: '最新',
                    order: 'newest'
                },
                {
                    id: 0,
                    title: '热门',
                    order: 'hottest'
                },
                {
                    id: 0,
                    title: '发布时间倒序',
                    order: 'ASC'
                },
                {
                    id: 0,
                    title: '发布时间正序',
                    order: 'DESC'
                }
            ],
            dyFuncList:[
                {
                    id: 0,
                    title: '收藏'
                },
                {
                    id: 1,
                    title: '举报'
                }
            ],
            tagList:[
                {
                    id: 0,
                    title: '杰哥'
                },
                {
                    id: 1,
                    title: 'Van♂'
                },
                {
                    id: 2,
                    title: 'Deep Dark Fansty'
                },
                {
                    id: 3,
                    title: "That's Good ♂"
                },
                {
                    id: 4,
                    title: '单身狗'
                },
                {
                    id: 5,
                    title: '情投一盒'
                },
                {
                    id: 6,
                    title: '不要做舔狗'
                },
                {
                    id: 7,
                    title: '萝卜'
                },
                {
                    id: 8,
                    title: '菜菜'
                },
                {
                    id: 9,
                    title: '腐竹通知'
                },
                {
                    id: 10,
                    title: 'Epic被刺'
                },
                {
                    id: 11,
                    title: 'Steam宣布破产'
                },
                {
                    id: 12,
                    title: '服务器维护'
                },
                {
                    id:13,
                    title: '群主太帅了'
                }
            ],
            openChoiceTags: false,
            refreshLoading: false,
            dropdownMenuTitle: '最新',
            dyContent:[
            ],
            currentPage: 1
        }
    },
    created(){
        this.sendToServer()
    },
    mounted(){
        
    },
    methods:{
        dropdownMenuFunc(id,title,order){
            if(!this.$store.getters.dyAllLoadingGet){
                this.$store.commit('dyAllLoadingSet',true)
                this.dropdownMenuTitle = title
                this.$store.commit('dYsendToServerParamsOrderSet', order)
                setTimeout(() => {
                    this.sendToServer()
                },1500)
            }
        },
        refreshFunc(){
            this.$store.commit('dyAllLoadingSet',true)
            setTimeout(() => {
                this.sendToServer()
            },1500)
        },
        editRouter(){
            this.$router.push('/dynamic/edit')
        },
        tagFunc(id,title){
            if(!this.$store.getters.dyAllLoadingGet){
                if(this.$store.getters.isPhoneGet){
                    setTimeout(() => {
                        document.body.scrollTop = 0
                    },300)
                }
                this.$store.commit('dyTagListSet', {id: id,title: title})
            }
        },
        delTag(id){
            if(!this.$store.getters.dyAllLoadingGet){
                this.$store.commit('dyAllLoadingSet',true)
                this.$store.commit('dyTagListDel',id)
                setTimeout(() => {
                    this.sendToServer()
                },2000)
            }
        },
        detailsRouterfunc(id){
            this.$router.push({path: '/dynamic/details',query: { id: id }})
        },
        pageChange(e){
            this.currentPage = e
            this.$store.commit('dYsendToServerParamsPageNumberSet', e)
            this.sendToServer()
        },
        sendToServer(){
            dynamicGet(this.$store.getters.dYsendToServerParamsGet).then(resq => {
                if(resq.flag){
                    this.$store.commit('dyContentSet', resq.data)
                    this.$store.commit('dyAllLoadingSet',false)
                } else {
                    ElMessage({
                        showClose: true,
                        message: '请求数据失败，请刷新页面重试！若问题依旧，请联系管理员！',
                        type: 'warning',
                    })
                    this.$store.commit('dyAllLoadingSet',false)
                }
            }).catch(err => {
                ElMessage({
                    showClose: true,
                    message: '请求动态发生错误，请稍后重试！' + err,
                    type: 'error',
                    center: false
                })
                this.$store.commit('dyAllLoadingSet',false)
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.content-box
{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: wrap;
    align-content: flex-start;
    .top-menu
    {
        width: 100%;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        background-color: #ffffff;
        padding: 0.3rem 0.5rem;
        box-shadow: 0 0 0.1rem rgba(0, 0, 0, 0.288);
        .user-func-div
        {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .left-menu , .right-menu
            {
                height: 1.5rem;
                display: flex;
                justify-content: center;
                align-items: center;
                .dropdown-menu
                {
                    min-width: 5rem;
                    height: 1.5rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 1rem;
                    transition: all 0.3s;
                    span
                    {
                        font-size: 0.6rem;
                        height: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        cursor: pointer;
                        i
                        {
                            color: #3773f3;
                            margin-left: 0.3rem;
                        }
                    }
                }
                .choice-tag
                {
                    height: 100%;
                    display: flex;
                    align-items: center;
                    margin: 0 0.5rem;
                    cursor: pointer;
                    span
                    {
                        height: 100%;
                        display: flex;
                        align-items: center;
                        font-size: 0.6rem;
                    }
                    i
                    {
                        margin-left: 0.2rem;
                        color: #3773f3;
                        font-size: 0.8rem;
                    }
                }
                .refresh
                {
                    width: 1.5rem;
                    height: 1.5rem;
                    border-radius: 50%;
                    color: #a5a5a5;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    transition: all 0.3s;
                }
                .refresh:hover
                {
                    color: #3773f3;
                    transform: rotate(180deg);
                }
                .dropdown-menu:active , .refresh:active
                {
                    background-color: rgb(221, 221, 221);
                }
                .edit-icon
                {
                    width: 1.5rem;
                    height: 1.5rem;
                    border-radius: 50%;
                    color: #a5a5a5;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    transition: all 0.3s;
                    cursor: pointer;
                }
                .edit-icon:hover
                {
                    color: rgb(1, 134, 83);
                }
            }
        }
        .tag-content , .tag-show
        {
            width: 100%;
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            flex-wrap: wrap;
            .tag-sub-item
            {
                min-height: 1.8rem;
                padding: 0.3rem 0.5rem;
                font-size: 0.6rem;
                margin: 0.3rem;
                border-radius: 0.3rem;
                border: solid 0.05rem #dfdfdf;
                letter-spacing: 0.03rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                cursor: pointer;
                transition: all 0.3s;
            }
            .tag-sub-item:hover
            {
                box-shadow: 0 0 0.3rem rgba(66, 66, 66, 0.288);
            }
        }
        .tag-content
        {
            background-color: rgb(250, 250, 250);
            border-radius: 0.2rem;
            overflow: hidden;
        }
        .tag-show
        {
            .tag-sub-item
            {
                i
                {
                    height: 100%;
                    display: flex;
                    align-items: center;
                    margin-left: 0.5rem;
                    transition: all 0.3s;
                }
                i:hover
                {
                    color: red;
                }
            }
        }
    }
    .dy-content
    {
        width: 100%;
        padding-top: 1rem;
        padding: 0.5rem 0.3rem;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        background-color: rgb(240, 240, 240);
        border-radius:0 0 0.2rem 0.2rem;
        overflow: hidden;
        transition: all 0.3s;
        .data-empty
        {
            width: 100%;
            height: 10rem;
            display: flex;
            justify-content: center;
            align-items: center;
            span
            {
                height: 100%;
                display: flex;
                align-items: center;
                font-size: 0.65rem;
            }
            i
            {
                font-size: 1rem;
            }
        }
        .refresh-div
        {
            width: 100%;
            height: 3rem;
            margin-top: -3rem;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #3773f3;
            transition: all 0.3s;
        }
        .refresh-div-is-loaded
        {
            margin-top: -0.5rem;
        }
        .sub-item
        {
            width: 100%;
            background-color: #ffffff;
            display: flex;
            flex-direction: column;
            padding: 0.5rem 0.5rem;
            transition: all 0.3s;
            margin-bottom: 1rem;
            border-radius: 0.2rem;
            .title-and-user-head
            {
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                .title
                {
                    padding: 0.5rem 0 0 0.5rem;
                    text-align: left;
                    font-size: 0.75rem;
                    letter-spacing: 0.05rem;
                    transition: all 0.3s;
                    cursor: pointer;
                    word-break: break-all;
                }
                .title:hover
                {
                    color: darkslateblue;
                }
                .user-head
                {
                    width: 2.5rem;
                    min-width: 2.5rem;
                    height: 2.5rem;
                    min-height: 2.5rem;
                    border-radius: 50%;
                    overflow: hidden;
                }
            }
            .dy-inf-show
            {
                width: 100%;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                flex-wrap: wrap;
                .dy-sub-item
                {
                    height: 1rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin: 0 0.3rem 0 0.3rem;
                    i
                    {
                        font-size: 0.7rem;
                    }
                    span , i
                    {
                        height: 100%;
                        display: flex;
                        align-items: center;
                    }
                    span
                    {
                        font-size: 0.58rem;
                        margin-left: 0.3rem;
                    }
                }
                .dy-sub-item:nth-child(4) span
                {
                    text-decoration: underline;
                }
            }
            .dy-introduction
            {
                width: 100%;
                display: flex;
                justify-content: flex-start;
                align-items: flex-start;
                text-align: left;
                word-break: break-all;
                font-size: 0.62rem;
                padding: 0.5rem;
                letter-spacing: 0.01rem;
            }
            .bottom-buttom
            {
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 0.5rem;
                .buttom
                {
                    width: 4rem;
                    height: 2rem;
                    border-radius: 0.3rem;
                    border: solid 0.1rem darkcyan;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 0.65rem;
                    cursor: pointer;
                    transition: all 0.3s;
                    text-align: center;
                }
                .buttom:hover
                {
                    color: #ffffff;
                    background-color: darkcyan;
                }
            }
        }
        .list-enter-active , .list-leave-active
        {
            transition: all 0.5s;
        }
        .list-enter-from , .list-leave-to
        {
            opacity: 0;
            margin-top: -9.5rem;
        }
        .sub-item:hover
        {
            transform: translateY(-0.2rem);
            box-shadow: 0 0.3rem 0.3rem darkgray;
        }
    }
    .dy-change-page
    {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 1rem 0 0.5rem 0;
        padding: 0.5rem;
        background-color: rgb(240, 240, 240);
        border-radius: 0.2rem;
        :deep(.el-pager li)
        {
            background-color: #ffffff;
        }
        :deep(.active)
        {
            background-color: #3773f3 !important;
        }
    }
}
@media screen and (min-width:1400px)
{
    .content-box .dy-content .sub-item .title-and-user-head .title
    {
        max-width: 18rem;
    }
}
@media screen and (max-width:1400px) and (min-width:1200px)
{
    .content-box .dy-content .sub-item .title-and-user-head .title
    {
        max-width: 16rem;
    }
}
@media screen and (max-width:1200px) and (min-width:936px)
{
    .content-box .dy-content .sub-item .title-and-user-head .title
    {
        max-width: 16rem;
    }
}
@media screen and (max-width:936px) and (min-width:767px)
{
    .content-box .dy-content .sub-item .title-and-user-head .title
    {
        max-width: 16rem;
    }
}
@media screen and (max-width:767px) and (min-width:676px)
{
    .content-box .dy-content .sub-item .title-and-user-head .title
    {
        max-width: 14rem;
    }
}
@media screen and (max-width:676px)
{
    .content-box .dy-content .sub-item .title-and-user-head .title
    {
        max-width: 12rem;
    }
}
</style>