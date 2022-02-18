<template>
    <div class="details-box">
        <div class="dy-title-func-div">
            <div class="dy-back" @click="backRouter()">
                <i class="fas fa-chevron-left"/>
                <span>返回</span>
            </div>
            <span class="dy-title">标题：{{dynamicMainContent.dynamicTitle}}</span>
        </div>
        <div class="dy-top-content" v-loading="dynamicMainContent === ''">
            <div class="user-data-show" v-if="!this.$store.getters.isPhoneGet">
                <div class="user-head">
                    <img :src="dynamicMainContent.userHead"/>
                </div>
                <span class="user-name">{{dynamicMainContent.nickname}}</span>
                <span class="user-class" :style="[{backgroundColor: dynamicMainContent.classColor}]">{{dynamicMainContent.className}}</span>
                <div class="user-have-props">
                    <div class="sub-item"></div>
                    <div class="sub-item"></div>
                    <div class="sub-item"></div>
                </div>
                <div class="user-base-info">
                    <div class="sub-item">
                        <span>积分</span>
                        <span>114514</span>
                    </div>
                    <div class="sub-item">
                        <span>小黑屋</span>
                        <span>0</span>
                    </div>
                </div>
            </div>
            <div class="right" :style="[this.$store.getters.isPhoneGet ? '':'margin-left: 0.5rem;', {borderLeft: `solid 0.2rem ${dynamicMainContent.classColor}`,borderRight: `solid 0.2rem ${dynamicMainContent.classColor}`}]">
                <div class="title-dy-data" v-if="!this.$store.getters.isPhoneGet">
                    <div class="dy-sub-item">
                        <i class="far fa-calendar-alt"/>
                        <span>{{dynamicMainContent.createTime}}</span>
                    </div>
                    <div class="dy-sub-item">
                        <i class="far fa-comment-dots"/>
                        <span>{{dynamicMainContent.commentNum}} 条评论</span>
                    </div>
                    <div class="dy-sub-item">
                        <i class="fas fa-tag"/>
                        <span v-for="item in dynamicMainContent.tags" :key="item.id">{{item.tagContent}}</span>
                    </div>
                    <div class="dy-sub-item">
                        <i class="fas fa-eye"/>
                        <span>{{dynamicMainContent.dynamicPageView}} 浏览</span>
                    </div>
                </div>
                <div class="mobile-show-user" v-else>
                    <div class="user-head-and-name">
                        <div class="user-head">
                            <img :src="dynamicMainContent.userHead"/>
                        </div>
                        <span class="user-name">{{dynamicMainContent.nickname}}</span>
                    </div>
                    <div class="dy-sub-item">
                        <i class="far fa-calendar-alt"/>
                        <span>{{dynamicMainContent.createTime}}</span>
                    </div>
                    <div class="dy-sub-item">
                        <i class="far fa-comment-dots"/>
                        <span>{{dynamicMainContent.commentNum}} 条评论</span>
                    </div>
                    <div class="dy-sub-item">
                        <i class="fas fa-tag"/>
                        <span v-for="item in dynamicMainContent.tags" :key="item.id">{{item.tagContent}}</span>
                    </div>
                    <div class="dy-sub-item">
                        <i class="fas fa-eye"/>
                        <span>{{dynamicMainContent.dynamicPageView}} 浏览</span>
                    </div>
                </div>
                <div class="dy-edit-reshow-content render-by-edit" v-html="dynamicMainContent.dynamicContent" @click="previewImg($event)">
            </div>
        </div>
        </div>
        <div class="dy-write-comment" v-if="this.$store.getters.userInfoGet !== null">
            <div class="title-span">
                <i class="far fa-comment-alt"/>
                <span>说点什么</span>
            </div>
            <dynamic-detail-comment key="111111" v-model="this.$route.query.thread" @commentStatus="commentStatus"/>
        </div>
        <div class="dy-comment-content">
            <span class="title-span">
                <i class="far fa-comments"/>
                评论区
            </span>
            <transition name="list">
                <div class="content" v-loading="isChangeParentCommentWorkNow">
                    <transition-group name="list">
                        <div class="sub-comment-item" v-for="item in commentContent" :key="item.id"> 
                            <div class="top-comment">
                                <div class="top">
                                    <div class="user-data-show" v-if="!this.$store.getters.isPhoneGet">
                                        <div class="user-head">
                                            <img :src="item.userHead"/>
                                        </div>
                                        <span class="user-name">{{item.nickname}}</span>
                                        <span class="user-class" :style="{backgroundColor: item.classColor}">{{item.className}}</span>
                                        <div class="user-have-props">
                                            <div class="sub-item"></div>
                                            <div class="sub-item"></div>
                                            <div class="sub-item"></div>
                                        </div>
                                        <div class="user-base-info">
                                            <div class="sub-item">
                                                <span>积分</span>
                                                <span>114514</span>
                                            </div>
                                            <div class="sub-item">
                                                <span>小黑屋</span>
                                                <span>0</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="right" :style="[this.$store.getters.isPhoneGet ? '':'margin-left: 0.5rem;', {borderLeft: `solid 0.2rem ${item.classColor}`,borderRight: `solid 0.2rem ${item.classColor}`}]">
                                        <div class="mobile-show-user" v-if="this.$store.getters.isPhoneGet">
                                            <div class="user-head-and-name">
                                                <div class="user-head">
                                                    <img :src="item.userHead"/>
                                                </div>
                                                <span class="user-name">{{item.nickname}}</span>
                                                <span class="user-class" :style="{backgroundColor: item.classColor}">{{item.className}}</span>
                                            </div>
                                        </div>
                                        <div class="comment-show render-by-edit" v-html="item.commentContent" @click="previewImg($event)"/>
                                        <div class="function-show">
                                            <div class="sub-item">
                                                <i class="far fa-clock"/>
                                                <span>发表于：{{item.createTime}}</span>
                                            </div>
                                            <div class="sub-item" @click="OpenBackComment(item.id)" v-if="this.$store.getters.userInfoGet !== null">
                                                <i class="fas fa-location-arrow"/>
                                                <span>回复</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <el-collapse-transition>
                                    <div class="fix-edit-to-transition" v-if="OpenBackCommentId === item.id && OpenBackCommentShow === true">
                                        <dynamic-detail-comment v-model="this.$route.query.thread" :father-id="item.id" @commentStatus="commentStatus"/>
                                    </div>
                                </el-collapse-transition>
                            </div>
                            <transition-group name="list">
                                <div class="bottom-comment" v-for="itemSub in item.children.list" :key="itemSub.id">
                                    <div class="top">
                                        <div class="user-data-show" v-if="!this.$store.getters.isPhoneGet">
                                            <div class="user-head">
                                                <img :src="itemSub.userHead"/>
                                            </div>
                                            <span class="user-name">{{itemSub.nickname}}</span>
                                            <span class="user-class" :style="{backgroundColor: itemSub.classColor}">{{itemSub.className}}</span>
                                            <div class="user-have-props">
                                                <div class="sub-item"></div>
                                                <div class="sub-item"></div>
                                                <div class="sub-item"></div>
                                            </div>
                                            <div class="user-base-info">
                                                <div class="sub-item">
                                                    <span>积分</span>
                                                    <span>114514</span>
                                                </div>
                                                <div class="sub-item">
                                                    <span>小黑屋</span>
                                                    <span>0</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="right" :style="[this.$store.getters.isPhoneGet ? '':'margin-left: 0.5rem;', {borderLeft: `solid 0.2rem ${itemSub.classColor}`,borderRight: `solid 0.2rem ${itemSub.classColor}`}]">
                                            <div class="mobile-show-user" v-if="this.$store.getters.isPhoneGet">
                                                <div class="user-head-and-name">
                                                    <div class="user-head">
                                                        <img :src="itemSub.userHead"/>
                                                    </div>
                                                    <span class="user-name">{{itemSub.nickname}}</span>
                                                    <span class="user-class" :style="{backgroundColor: itemSub.classColor}">{{itemSub.className}}</span>
                                                </div>
                                            </div>
                                            <div class="comment-show render-by-edit" v-html="itemSub.commentContent" @click="previewImg($event)"/>
                                            <div class="function-show">
                                                <div class="sub-item">
                                                    <i class="far fa-clock"/>
                                                    <span>发表于：{{itemSub.createTime}}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <el-collapse-transition>
                                        <div class="fix-edit-to-transition" v-if="OpenBackCommentId === itemSub.id && OpenBackCommentShow === true">
                                            <dynamic-detail-comment v-model="this.$route.query.thread" :father-id="item.id" @commentStatus="commentStatus"/>
                                        </div>
                                    </el-collapse-transition>
                                </div>
                            </transition-group>
                        </div>
                    </transition-group>
                </div>
            </transition>
            <transition name="list">
                <div class="empty-comment" v-if="this.commentContent.length === 0">
                    <span>还没有评论哦，赶快来评论吧！</span>
                    <i class="fas fa-inbox"/>
                </div>
            </transition>
            <el-pagination background layout="prev, pager, next" :total="commentTotal" @current-change="pageChange" v-model:currentPage="currentPage" :small="this.$store.getters.isPhoneGet" style="margin: 0.5rem 0;"/>
        </div>
        <footer-bottom/>
    </div>
</template>
<script>
import footerBottom from '@/components/footerBottom.vue'
import dynamicDetailComment from '@/components/dynamic/dynamicDetailComment.vue'
import { dynamicDetailGet , dynamicCommentGet } from '@/util/api.js'
import { ElMessage } from 'element-plus'
import ImgViewr, { showImages } from 'vue-img-viewr'
import 'vue-img-viewr/styles/index.css'
export default {
    components:{
        dynamicDetailComment,
        footerBottom,
        ImgViewr
    },
    data(){
        return{
            dynamicMainContent: '',
            OpenBackCommentId: '',
            OpenBackCommentShow: false,
            //动态评论
            commentContent: [],
            //动态图片
            commentImage: [],
            commentTotal: null,
            currentPage: 1,
            isChangeParentCommentWorkNow: false
        }
    },
    async created(){
        dynamicDetailGet({dynamicId: this.$route.query.thread}).then(resq => {
            if(resq.flag){
                this.dynamicMainContent = resq.data
                this.commentGet()
            } else {
                ElMessage.error('获取详情发生错误！ ' + resq.message)
            }
        }).catch(err => {
            ElMessage.error('获取详情发生错误！ ' + err)
        })
    },
    methods:{
        OpenBackComment(id){
            this.OpenBackCommentShow =! this.OpenBackCommentShow
            this.OpenBackCommentId = id
        },
        backRouter(){
            this.$router.push('/dynamic')
        },
        commentGet(){
            dynamicCommentGet({dynamicId: this.$route.query.thread,pageNumber: this.currentPage}).then(resq => {
                if(resq.flag){
                    this.commentContent = resq.data.list
                    this.commentTotal = resq.data.total
                } else {
                    ElMessage.error('获取评论发生错误！ ' + resq.message)
                }
                this.isChangeParentCommentWorkNow = false
            }).catch(err => {
                ElMessage.error('获取评论发生错误！ ' + err)
                this.isChangeParentCommentWorkNow = false
            })
        },
        commentStatus(value){
            if(value){
                this.commentGet()
                this.OpenBackCommentShow = false
            }
        },
        previewImg(e){
            let grandpa = $(e.target).parent().parent()
            if(!grandpa.hasClass('w-e-text') && $(e.target).attr('src') !== undefined){
                let imageIndex
                grandpa.find('img').each((index,item) => {
                    if($(item).attr('src') === $(e.target).attr('src')){
                        imageIndex = index
                    }
                    this.commentImage.push($(item).attr('src'))
                })
                showImages({urls: this.commentImage,index: imageIndex, onClose: () => {
                    this.commentImage = []
                }})
            }
        },
        pageChange(e){
            if(!this.isChangeParentCommentWorkNow){
                this.isChangeParentCommentWorkNow = true
                this.currentPage = e
                this.commentGet()
            }
        },
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
    background-color: rgb(235, 235, 235);
    .dy-title-func-div
    {
        width: 100%;
        height: 1.8rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        background-color: rgba(245, 245, 245, 1);
        box-shadow: 0 0 0.1rem rgba(0, 0, 0, 0.384);
        margin: 0 0.5rem;
        border-radius: 0.15rem;
        overflow: hidden;
        .dy-back
        {
            width: 5rem;
            min-width: 5rem;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: all 0.3s;
            border-radius: 0.15rem;
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
        .dy-back:hover
        {
            background-color: rgba(180, 180, 180, 0.555);
        }
        .dy-title
        {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            font-size: 0.7rem;
            text-align: left;
            padding-left: 1rem;
        }
    }
    .dy-top-content
    {
        width: 100%;
        margin-top: 0.3rem;
        min-height: 10rem;
        display: flex;
        justify-content: center;
        margin: 0.5rem;
        transition: all 0.3s;
        .user-data-show
        {
            display: flex;
            justify-content: center;
            align-content: flex-start;
            flex-wrap: wrap;
            padding: 0.5rem 0;
            .user-head
            {
                height: 3.5rem;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 50%;
                overflow: hidden;
                box-shadow: 0 0 0.1rem black;
                img
                {
                    height: 100%;
                    max-height: 100%;
                }
            }
            .user-class
            {
                padding: 0.15rem 0.4rem;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 0.52rem;
                border-radius: 0.2rem;
                color: #ffffff;
            }
            .user-name
            {
                width: 100%;
                text-align: center;
                word-break: break-all;
                font-size: 0.6rem;
                color: rgb(44, 44, 44);
                margin: 0.3rem 0;
            }
            .user-have-props
            {
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-wrap: wrap;
                background-color: rgba(136, 136, 136, 0.5);
                border-radius: 0.1rem;
                margin: 0.3rem 0;
                .sub-item
                {
                    width: calc(100% / 3);
                    height: 1.5rem;
                }
            }
            .user-base-info
            {
                width: 100%;
                display: flex;
                align-content: flex-start;
                flex-wrap: wrap;
                .sub-item
                {
                    width: 100%;
                    display: flex;
                    justify-content: flex-start;
                    span
                    {
                        height: 1rem;
                        font-size: 0.5rem;
                        width: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: flex-start;
                    }
                }
            }
        }
        .right
        {
            width: 100%;
            display: flex;
            align-content: flex-start;
            flex-wrap: wrap;
            border-radius: 0.3rem;
            background-color: rgb(255, 255, 255);
            .title-dy-data , .mobile-show-user
            {
                width: 100%;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                flex-wrap: wrap;
                border-bottom: solid 0.05rem rgb(172, 172, 172);
                padding: 0.3rem;
                .dy-sub-item
                {
                    height: 1rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin: 0 0.3rem 0 0.3rem;
                    span , i
                    {
                        height: 100%;
                        display: flex;
                        align-items: center;
                        font-size: 0.6rem;
                    }
                    span
                    {
                        margin-left: 0.3rem;
                    }
                }
            }
            .mobile-show-user
            {
                .user-head-and-name
                {
                    width: 100%;
                    height: 2rem;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    margin-bottom: 0.5rem;
                    .user-head
                    {
                        height: 100%;
                        border-radius: 50%;
                        overflow: hidden;
                        box-shadow: 0 0 0.1rem black;
                        img
                        {
                            max-height: 100%;
                        }
                    }
                    .user-name
                    {
                        height: 100%;
                        display: flex;
                        align-items: center;
                        font-size: 0.58rem;
                        text-align: center;
                        margin-left: 0.5rem;
                    }
                }
            }
            .dy-edit-reshow-content
            {
                width: 100%;
                padding: 0 0.5rem;
            }
        }
    }
    .dy-write-comment , .dy-comment-content
    {
        width: 100%;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        align-content: flex-start;
        padding: 0 0.5rem;
        .title-span
        {
            width: 100%;
            height: 2rem;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            border-bottom: solid 0.1rem rgb(206, 206, 206);
            margin: 0.5rem 0;
            span , i
            {
                height: 100%;
                display: flex;
                align-items: center;
            }
            span
            {
                font-size: 0.9rem;
                color: rgb(61, 60, 60);
            }
            i
            {
                margin-right: 0.5rem;
                color: rgb(25, 156, 238);
            }
        }
    }
    .dy-comment-content
    {
        .list-enter-from , .list-leave-to
        {
            opacity: 0;
            transform: translateY(1rem);
        }
        .list-leave-active
        {
            position: absolute;
        }
        .content
        {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            align-content: flex-start;
            justify-content: center;
            position: relative;
            transition: all 0.3s;
            .sub-comment-item
            {
                width: 100%;
                display: flex;
                align-content: flex-start;
                flex-wrap: wrap;
                transition: all 0.5s;
                .top-comment .right
                {
                    background-color: rgb(255, 255, 255);
                    margin: 0.5rem 0;
                }
                .bottom-comment 
                {
                    margin: 0.5rem 0;
                    .right
                    {
                        background-color: rgb(240, 240, 240 , 0.6);
                    }
                }
                .top-comment , .bottom-comment
                {
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    align-content: flex-start;
                    flex-wrap: wrap;
                    transition: all 0.5s;
                    .top
                    {
                        width: 100%;
                        min-height: 10rem;
                        display: flex;
                        justify-content: center;
                        .user-data-show
                        {
                            display: flex;
                            justify-content: center;
                            align-content: flex-start;
                            flex-wrap: wrap;
                            padding: 0.5rem 0;
                            .user-head
                            {
                                height: 3.5rem;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                border-radius: 50%;
                                overflow: hidden;
                                box-shadow: 0 0 0.1rem black;
                                img
                                {
                                    height: 100%;
                                    max-height: 100%;
                                }
                            }
                            .user-class
                            {
                                padding: 0.15rem 0.4rem;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                font-size: 0.52rem;
                                border-radius: 0.2rem;
                                color: #ffffff;
                            }
                            .user-name
                            {
                                width: 100%;
                                text-align: center;
                                word-break: break-all;
                                font-size: 0.6rem;
                                color: rgb(44, 44, 44);
                                margin: 0.3rem 0;
                            }
                            .user-have-props
                            {
                                width: 100%;
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                flex-wrap: wrap;
                                background-color: rgba(136, 136, 136, 0.5);
                                border-radius: 0.1rem;
                                margin: 0.3rem 0;
                                .sub-item
                                {
                                    width: calc(100% / 3);
                                    height: 1.5rem;
                                }
                            }
                            .user-base-info
                            {
                                width: 100%;
                                display: flex;
                                align-content: flex-start;
                                flex-wrap: wrap;
                                .sub-item
                                {
                                    width: 100%;
                                    display: flex;
                                    justify-content: flex-start;
                                    span
                                    {
                                        height: 1rem;
                                        font-size: 0.5rem;
                                        width: 50%;
                                        display: flex;
                                        align-items: center;
                                        justify-content: flex-start;
                                    }
                                }
                            }
                        }
                        .right
                        {
                            width: 100%;
                            display: flex;
                            align-content: space-between;
                            flex-wrap: wrap;
                            padding: 0 0.5rem;
                            border-radius: 0.3rem;
                            .mobile-show-user
                            {
                                width: 100%;
                                display: flex;
                                justify-content: flex-start;
                                align-items: center;
                                flex-wrap: wrap;
                                border-bottom: solid 0.05rem rgb(172, 172, 172);
                                .user-head-and-name
                                {
                                    width: 100%;
                                    height: 2rem;
                                    display: flex;
                                    justify-content: flex-start;
                                    align-items: center;
                                    margin: 0.3rem 0;
                                    .user-head
                                    {
                                        height: 100%;
                                        border-radius: 50%;
                                        overflow: hidden;
                                        box-shadow: 0 0 0.1rem black;
                                        img
                                        {
                                            max-height: 100%;
                                        }
                                    }
                                    .user-name
                                    {
                                        height: 100%;
                                        display: flex;
                                        align-items: center;
                                        font-size: 0.58rem;
                                        text-align: center;
                                        margin: 0 0.5rem;
                                    }
                                    .user-class
                                    {
                                        padding: 0.15rem 0.4rem;
                                        display: flex;
                                        justify-content: center;
                                        align-items: center;
                                        font-size: 0.52rem;
                                        border-radius: 0.2rem;
                                        color: #ffffff;
                                    }
                                }
                            }
                            .comment-show
                            {
                                width: 100%;
                            }
                            .function-show
                            {
                                width: 100%;
                                height: 1.5rem;
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                .sub-item
                                {
                                    height: 100%;
                                    display: flex;
                                    align-items: center;
                                    span , i
                                    {
                                        height: 100%;
                                        display: flex;
                                        align-items: center;
                                        font-size: 0.6rem;
                                    }
                                    span
                                    {
                                        margin-left: 0.3rem;
                                    }
                                }
                                .sub-item:nth-child(2)
                                {
                                    cursor: pointer;
                                }
                            }
                        }
                    }
                }
                .fix-edit-to-transition
                {
                    width: 100%;
                    margin-top: 0.5rem;
                }
            }
        }
        .empty-comment
        {
            width: 100%;
            height: 6rem;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #ffffff;
            transition: all 0.3s;
            span , i
            {
                height: 100%;
                display: flex;
                align-items: center;
            }
            span
            {
                font-size: 0.7rem;
            }
            i
            {
                font-size: 0.8rem;
            }
        }
    }
}
@media screen and (min-width:1400px)
{
    .details-box
    {
        .dy-title-func-div .dy-back
        {
            width: 7rem;
        }
        .dy-top-content
        {
            .user-data-show
            {
                width: 7rem;
            }
        }
        .dy-comment-content .content .sub-comment-item
        {
            .top-comment .user-data-show , .bottom-comment .user-data-show
            {
                width: 7rem;
            }
        }
    }
}
@media screen and (max-width:1400px) and (min-width:1200px)
{
    .details-box
    {
        .dy-title-func-div .dy-back
        {
            width: 6.5rem;
        }
        .dy-top-content
        {
            .user-data-show
            {
                width: 6.5rem;
            }
        }
        .dy-comment-content .content .sub-comment-item
        {
            .top-comment .user-data-show , .bottom-comment .user-data-show
            {
                width: 6.5rem;
            }
        }
    }
}
@media screen and (max-width:1200px) and (min-width:936px)
{
    .details-box
    {
        .dy-title-func-div .dy-back
        {
            width: 6rem;
        }
        .dy-top-content
        {
            .user-data-show
            {
                width: 6rem;
            }
        }
        .dy-comment-content .content .sub-comment-item
        {
            .top-comment .user-data-show , .bottom-comment .user-data-show
            {
                width: 6rem;
            }
        }
    }
}
</style>