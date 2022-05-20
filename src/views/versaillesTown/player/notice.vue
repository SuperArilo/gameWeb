<template>
    <div class="notice-box">
        <div class="center-content">
            <div class="public-title">
                <span>通知公告</span>
                <i class="fas fa-bell"/>
            </div>
            <div class="notice-content">
                <div class="table-title" :style="[this.$store.getters.isPhoneGet ? 'width: auto;':'width:100%;']">
                    <div class="check-box">
                        <i :class="noticeChoiceList.length === 0 ? 'far fa-square':noticeContent.length > noticeChoiceList.length ? 'fas fa-minus-square':noticeChoiceList.length === noticeContent.length ? 'fas fa-check-square':'fas fa-minus-square'" @click="isCancelAndAll"/>
                    </div>
                    <span class="table-title-show-title" :style="[this.$store.getters.isPhoneGet ? 'width: 14rem;min-width:14rem;':'width: 60%;']">标题内容</span>
                    <span class="table-title-show-title" :style="[this.$store.getters.isPhoneGet ? 'width: 10rem;min-width: 10rem;':'width: 40%;']">发布时间</span>
                    <span class="table-title-class-title">类型</span>
                </div>
                <div class="notice-list" :style="[this.$store.getters.isPhoneGet ? 'width: auto;':'width:100%;']" v-loading="openNoticeContent === ''">
                    <div class="sub-notice-list" v-for="item in noticeContent" :key="item.id">
                        <div class="top-notice-simple">
                            <div class="sub-check-box">
                                <i class="far" :class="[noticeChoiceList.indexOf(item.id) === -1 ? 'fa-square':'fa-check-square']" @click="choiceNoticeCheckBox(item.id)"/>
                            </div>
                            <span class="sub-notice-title sub-notice-title-no-read" :style="[this.$store.getters.isPhoneGet ? 'width: 14rem;min-width:14rem;':'width: 60%;']" style="cursor: pointer;" @click="openNoticeContent(item.id)">{{item.title}}</span>
                            <span class="sub-notice-title sub-notice-title-no-read" :style="[this.$store.getters.isPhoneGet ? 'width: 10rem;min-width: 10rem;':'width: 40%;']">{{item.createTime}}</span>
                            <span class="sub-notice-class sub-notice-title-no-read">系统通知</span>
                        </div>
                        <el-collapse-transition>
                            <div v-if="isOpenChoiceNoticeContent && choiceNoticeIndex === item.id">
                                <div ref="playerNoticeByOne" class="bottom-notice-main-content render-by-edit" v-html="item.content" @click="previewImg($event)"/>
                            </div>
                        </el-collapse-transition>
                    </div>
                </div>
            </div>
            <div class="notice-function-box">
                <div class="button" :class="[noticeChoiceList.length === 0 ? 'no-choice':'default']" @click="delNotice">
                    <span>删除</span>
                </div>
                <div class="button" :class="[noticeChoiceList.length === 0 ? 'no-choice':'default']">
                    <span>标记已读</span>
                </div>
            </div>
            <el-pagination background layout="prev, pager, next" :total="1000" :small="this.$store.getters.isPhoneGet"/>
        </div>
        <footer-bottom/>
    </div>
</template>
<script>
import footerBottom from '@/components/footerBottom.vue'
import { userNoticeGet } from '@/util/api.js'
import { ElMessageBox, ElMessage } from 'element-plus'
import { showImages } from 'vue-img-viewr'
import 'vue-img-viewr/styles/index.css'
import $ from 'jquery'
export default {
    components:{
        footerBottom
    },
    data(){
        return{
            noticeContent: '',
            choiceNoticeIndex: null,
            isOpenChoiceNoticeContent: false,
            noticeChoiceList:[],
            showImageList: []
        }
    },
    created(){
        if(this.$store.getters.userInfoGet !== null){
            this.userGetNoticeFunc(this.$store.getters.userInfoGet.uid)
        }
    },
    methods:{
        openNoticeContent(id){
            if(this.choiceNoticeIndex === id){
                this.isOpenChoiceNoticeContent =! this.isOpenChoiceNoticeContent
            } else{
                this.choiceNoticeIndex = id
                this.isOpenChoiceNoticeContent = true
            }
        },
        choiceNoticeCheckBox(id){
            let index = this.noticeChoiceList.indexOf(id)
            if(index === -1){
                this.noticeChoiceList.push(id)
            } else {
                this.noticeChoiceList.splice(index,1)
            }
        },
        isCancelAndAll(){
            if(this.noticeChoiceList.length === 0){
                this.noticeContent.forEach(item => {
                    this.noticeChoiceList.push(item.id)
                })
            } else {
                this.noticeChoiceList = []
            }
        },
        delNotice(){
            if(this.noticeChoiceList.length !== 0){
                ElMessageBox.confirm('确认删除所选消息？','警告',{confirmButtonText: '确认',cancelButtonText: '取消',type: 'warning',}).then(() => {
                    ElMessage({message: '删除成功！', type: 'success'})
                }).catch(() => {
                })
            }
        },
        userGetNoticeFunc(uid){
            userNoticeGet({receiver: uid}).then(resq => {
                if(resq.code === 200){
                    this.noticeContent = resq.data.list
                } else {
                    ElMessage({message: resq.message, type: 'error'})
                }
            }).catch(err => {
                ElMessage({message: err.message, type: 'error'})
            })
        },
        previewImg(e){
            if($(e.target).attr('src') !== undefined){
                let imageIndex
                $(this.$refs.playerNoticeByOne).find('img').each((index,item) => {
                    if($(item).attr('src') === $(e.target).attr('src')){
                        imageIndex = index
                    }
                    this.showImageList.push($(item).attr('src'))
                })
                showImages({urls: this.showImageList,index: imageIndex, onClose: () => {
                    this.showImageList = []
                }})
            }
        }
    },
    computed:{
        checkUserInfo(){
            return this.$store.getters.userInfoGet
        }
    },
    watch:{
        checkUserInfo(nV, oV){
            this.userGetNoticeFunc(nV.uid)
        }
    }
}
</script>
<style lang="scss" scoped>
.notice-box
{
    width: 100%;
    display: flex;
    justify-content: center;
    align-content: flex-start;
    flex-wrap: wrap;
    .center-content
    {
        display: flex;
        align-content: flex-start;
        justify-content: center;
        flex-wrap: wrap;
        margin: 1rem 0;
        .public-title
        {
            width: 100%;
            height: 1.5rem;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            span, i
            {
                height: 100%;
                display: flex;
                align-items: center;
            }
            span
            {
                font-size: 0.75rem;
                font-weight: bold;
                letter-spacing: 0.03rem;
            }
            i
            {
                font-size: 0.8rem;
                margin-left: 0.5rem;
            }
        }
        .notice-content
        {
            width: 100%;
            display: flex;
            align-content: flex-start;
            flex-wrap: wrap;
            border: 0.08rem solid #E1E6EB;
            overflow-x: overlay;
            .table-title
            {
                height: 1.6rem;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                .check-box
                {
                    width: 2.5rem;
                    min-width: 2.5rem;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: #F5F6FA;
                    i
                    {
                        color: rgb(56, 56, 56);
                        cursor: pointer;
                        font-size: 0.7rem;
                    }
                }
                .table-title-show-title , .table-title-class-title
                {
                    height: 100%;
                    background-color: #F5F6FA;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    color: #999;
                    font-size: 0.62rem;
                    white-space: nowrap;

                }
                .table-title-class-title
                {
                    width: 6rem;
                    min-width: 6rem;
                }
            }
            .notice-list
            {
                width: 100%;
                min-height: 10rem;
                .sub-notice-list
                {
                    width: inherit;
                    .top-notice-simple
                    {
                        width: inherit;
                        height: 1.5rem;
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        .sub-check-box
                        {
                            width: 2.5rem;
                            min-width: 2.5rem;
                            height: 100%;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            i
                            {
                                color: rgb(56, 56, 56);
                                cursor: pointer;
                                font-size: 0.7rem;
                            }
                        }
                        .sub-notice-title , .sub-notice-class
                        {
                            height: 100%;
                            display: flex;
                            justify-content: flex-start;
                            align-items: center;
                            font-size: 0.58rem;
                            white-space: nowrap;
                            min-width: 0;
                            text-overflow: ellipsis;
                            overflow: hidden;
                        }
                        .sub-notice-class
                        {
                            width: 6rem;
                            min-width: 6rem;
                        }
                        .sub-notice-title-no-read
                        {
                            color: #394fca;
                        }
                    }
                    .bottom-notice-main-content
                    {
                        width: inherit;
                        padding: 0.5rem 1rem;
                        background-color: rgba(0, 0, 0, 0.03);
                    }
                }
            }
            .notice-list::-webkit-scrollbar
            {
                width: 0.3rem;
            }
        }
        .notice-content::-webkit-scrollbar
        {
            height: 0.4rem;
        }
        .notice-function-box
        {
            width: 100%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin: 0.5rem 0;
            .button
            {
                display: flex;
                justify-content: center;
                align-items: center;
                border: solid 0.05rem #ddd;
                border-radius: 0.15rem;
                padding: 0.2rem 0.65rem;
                margin-right: 0.5rem;
                span
                {
                    height: 100%;
                    display: flex;
                    align-items: center;
                    font-size: 0.5rem;
                }
            }
            .default
            {
                cursor: pointer;
                background-color: #F7F7F7;
                span
                {
                    color: #333;
                }
            }
            .no-choice
            {
                cursor: not-allowed;
                background-color: rgba(175, 175, 175, 0.24);
                span
                {
                    color: rgb(170, 170, 170);
                }
            }
        }
        .line
        {
            width: 100%;
            height: 0.03rem;
            background-color: rgba(68, 68, 68, 0.473);
            margin: 1rem 0;
        }
    }
}
@media screen and (min-width:1400px)
{
    .notice-box
    {
        .center-content
        {
            width: 70%;
        }
    }
}
@media screen and (max-width:1400px) and (min-width:1200px)
{
    .notice-box
    {
        .center-content
        {
            width: 70%;
        }
    }
}
@media screen and (max-width:1200px) and (min-width:936px)
{
    .notice-box
    {
        .center-content
        {
            width: 65%;
        }
    }
}
@media screen and (max-width:936px) and (min-width:767px)
{
    .notice-box
    {
        .center-content
        {
            width: 90%;
        }
    }
}
@media screen and (max-width:767px) and (min-width:676px)
{
    .notice-box
    {
        .center-content
        {
            width: 90%;
        }
    }
}
@media screen and (max-width:676px)
{
    .notice-box
    {
        .center-content
        {
            width: 90%;
        }
    }
}
</style>