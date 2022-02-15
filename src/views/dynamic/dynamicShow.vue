<template>
    <div class="content-box" :style="{backgroundImage:`url(${this.$store.getters.indexBgGet})`}">
        <div class="top-menu">
            <div class="user-func-div">
                <div class="left-menu">
                    <el-dropdown class="dropdown-menu" @command="dropdownMenuFunc">
                        <span>{{dropdownMenuTitle}}
                            <i class="fa fa-chevron-down"/>
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item v-for="item in dropdownMenu" :key="item.id" :command="item.order">{{item.title}}</el-dropdown-item>
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
                    <span class="tag-sub-item" v-for="item in tagList" :key="item.id" @click="tagFunc(item.id,item.tagContent)">
                        {{item.tagContent}}
                    </span>
                </div>
            </el-collapse-transition>
            <div class="tag-show">
                <div class="tag-sub-item" v-for="item in dyTagList" :key="item.id">
                    <span>{{item.title}}</span>
                    <i class="fas fa-trash-alt" @click="delTag(item.id)"/>
                </div>
            </div>
        </div>
        <div class="dy-content">
            <i class="fas fa-circle-notch refresh-div" :class="dyAllLoading || firstRequestIsWorkNow ? 'refresh-div-is-loaded fa-spin':''"/>
            <transition name="list">
                <div class="data-empty" v-if="dyContent.length === 0 && firstRequestIsWorkNow === false">
                    <span>没有动态数据哦！</span>
                    <i class="fas fa-inbox"/>
                </div>
            </transition>
            <transition-group name="list">
                <div class="sub-item" v-for="item in dyContent" :key="item.id" :style="[{border: `solid 0.15rem ${item.classColor}`}]">
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
                            <span>{{item.nickname}}</span>
                        </div>
                        <div class="dy-sub-item">
                            <i class="far fa-comment-dots"/>
                            <span>{{item.commentNum}} 条评论</span>
                        </div>
                        <div class="dy-sub-item">
                            <i class="fas fa-tag"/>
                            <span v-for="itemSub in item.tags" :key="itemSub.id">{{itemSub.tagContent}}</span>
                        </div>
                        <div class="dy-sub-item">
                            <i class="far fa-eye"/>
                            <span>{{item.dynamicPageView}} 浏览</span>
                        </div>
                    </div>
                    <span class="dy-introduction">{{item.dynamicDescribe}}</span>
                    <div class="bottom-buttom">
                        <div class="func-box">
                            <i class="far fa-star"/>
                            <i class="fas fa-exclamation-triangle"/>
                        </div>
                        <span class="buttom" @click="detailsRouterfunc(item.id)">跃迁</span>
                    </div>
                </div>
            </transition-group>
        </div>
        <div class="dy-change-page">
            <el-pagination background layout="prev, pager, next" :total="dyTotal" :page-size="10" v-model:currentPage="currentPage" @current-change="pageChange" :small="this.$store.getters.isPhoneGet"/>
        </div>
        <footer-bottom/>
    </div>
</template>
<script>
import { ElMessage } from 'element-plus'
import { dynamicGet , dynamicTagsGet } from '@/util/api.js'
import footerBottom from '@/components/footerBottom.vue'
export default {
  components: { footerBottom },
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
            tagList:[],
            openChoiceTags: false,
            dropdownMenuTitle: '最新',
            //显示的主要数据
            dyContent: [],
            currentPage: 1,
            // 发送到服务器的参数
            dYsendToServerParams:{
                tagIds:[],
                order: 'newest',
                pageNumber: 1,
                pageSize: 10,
            },
            //动态标签传入
            dyTagList:[],
            //动态页面检测活动冷却标识
            dyAllLoading: false,
            firstRequestIsWorkNow: false,
            dyTotal: null
        }
    },
    async created(){
        this.firstRequestIsWorkNow = true
        dynamicGet(this.dYsendToServerParams).then(resq => {
            if(resq.flag){
                this.firstRequestIsWorkNow = false
                this.dyContent = resq.data.data
                this.dyTotal = resq.data.total
            } else {
                this.firstRequestIsWorkNow = false
                ElMessage({ showClose: true, message: resq.message, type: 'warning',})
            }
        }).catch(err => {
            this.firstRequestIsWorkNow = false
            ElMessage({showClose: true, message: '请求动态发生错误，请稍后重试！' + err, type: 'error', center: false})
        })
        dynamicTagsGet().then(resq => {
            if(resq.flag){
                this.tagList = resq.data
            } else {
                ElMessage({ showClose: true, message: resq.message, type: 'warning',})
            }
        }).catch(err => {
            ElMessage({showClose: true, message: '请求标签发生错误，请稍后重试！' + err, type: 'error', center: false})
        })
    },
    methods:{
        dropdownMenuFunc(command, number, object){
            if(!this.dyAllLoading){
                this.dyAllLoading = true
                this.dropdownMenuTitle = object.target.textContent
                this.dYsendToServerParams.order = command
                this.sendToServer()
            }
        },
        refreshFunc(){
            if(!this.dyAllLoading){
                this.dyAllLoading = true
                this.sendToServer()
            }
        },
        editRouter(){
            this.$router.push('/dynamic/edit')
        },
        tagFunc(id,title){
            if(!this.dyAllLoading){
                if(this.$store.getters.isPhoneGet){
                    setTimeout(() => {
                        document.body.scrollTop = 0
                    },300)
                }
                let length = this.dYsendToServerParams.tagIds.length
                if(length === 0){
                    this.dyAllLoading = true
                    this.dYsendToServerParams.tagIds.unshift(id)
                    this.dyTagList.unshift({id: id, title: title})
                    this.sendToServer()
                } else if (length > 2){
                    ElMessage({message: '最多支持筛选3个标签！'})
                } else {
                    let isHave = this.dYsendToServerParams.tagIds.indexOf(id)
                    if(isHave === -1){
                        this.dyAllLoading = true
                        this.dYsendToServerParams.tagIds.unshift(id)
                        this.dyTagList.unshift({id: id, title: title})
                        this.sendToServer()
                    } else if (isHave === 0){
                        ElMessage({message: title + '标签 已经添加了哦！'})
                    }
                }
            }
        },
        delTag(id){
            if(!this.dyAllLoading){
                this.dyAllLoading = true
                let index = this.dYsendToServerParams.tagIds.indexOf(id)
                this.dyTagList.splice(index,1)
                this.dYsendToServerParams.tagIds.splice(index,1)
                this.sendToServer()
            }
        },
        detailsRouterfunc(id){
            this.$router.push({path: '/dynamic/details',query: { thread: id }})
        },
        pageChange(e){
            if(!this.dyAllLoading){
                this.dyAllLoading = true
                this.currentPage = e
                this.dYsendToServerParams.pageNumber = e
                $('html,body').stop().animate({'scrollTop': 0})
                this.sendToServer()
            }
        },
        sendToServer(){
            dynamicGet(this.dYsendToServerParams).then(resq => {
                if(resq.flag){
                    this.dyContent = resq.data.data
                    this.dyTotal = resq.data.total
                    this.dyAllLoading = false
                } else {
                    ElMessage({ showClose: true, message: '请求数据失败，请刷新页面重试！若问题依旧，请联系管理员！', type: 'warning',})
                    this.dyAllLoading = false
                }
            }).catch(err => {
                ElMessage({showClose: true, message: '请求动态发生错误，请稍后重试！' + err, type: 'error', center: false})
                this.dyAllLoading = false
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
    flex-wrap: wrap;
    align-content: flex-start;
    background-repeat: no-repeat;
    background-position: top;
    background-size: cover;
    .top-menu
    {
        width: 100%;
        display: flex;
        align-content: flex-start;
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
                min-height: 1.5rem;
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
            width: 100%;
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            flex-wrap: wrap;
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
        padding: 0 1rem;
        display: flex;
        align-content: flex-start;
        justify-content: center;
        flex-wrap: wrap;
        background-color: rgba(240, 240, 240, 0.65);
        overflow: hidden;
        transition: all 0.3s;
        position: relative;
        .data-empty
        {
            width: 100%;
            height: 14rem;
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
            height: 3rem;
            margin-top: -3rem;
            display: flex;
            align-items: center;
            color: #3773f3;
            transition: all 0.3s;
        }
        .refresh-div-is-loaded
        {
            margin-top: 0;
        }
        .sub-item
        {
            width: 100%;
            background-color: rgba(255, 255, 255, 0.7);
            display: flex;
            align-content: flex-start;
            flex-wrap: wrap;
            padding: 0.5rem 0.5rem;
            transition: all 0.5s;
            margin: 0.5rem 0;
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
                .func-box
                {
                    height: 2rem;
                    display: flex;
                    align-items: center;
                    i
                    {
                        height: 100%;
                        display: flex;
                        align-items: center;
                        font-size: 0.7rem;
                        margin: 0 0.3rem;
                    }
                }
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
        .list-enter-from , .list-leave-to
        {
            opacity: 0;
            transform: translateY(1rem);
        }
        .list-leave-active
        {
            position: absolute;
        }
    }
    .dy-change-page
    {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0.5rem;
        background-color: rgba(240, 240, 240, 0.7);
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