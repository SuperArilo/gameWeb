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
                <div class="notice-list" :style="[this.$store.getters.isPhoneGet ? 'width: auto;':'width:100%;']">
                    <div class="sub-notice-list" v-for="item in noticeContent" :key="item.id">
                        <div class="top-notice-simple">
                            <div class="sub-check-box">
                                <i class="far" :class="[noticeChoiceList.indexOf(item.id) === -1 ? 'fa-square':'fa-check-square']" @click="choiceNoticeCheckBox(item.id)"/>
                            </div>
                            <span class="sub-notice-title sub-notice-title-no-read" :style="[this.$store.getters.isPhoneGet ? 'width: 14rem;min-width:14rem;':'width: 60%;']" style="cursor: pointer;" @click="openNoticeContent(item.id)">{{item.title}}</span>
                            <span class="sub-notice-title sub-notice-title-no-read" :style="[this.$store.getters.isPhoneGet ? 'width: 10rem;min-width: 10rem;':'width: 40%;']">{{item.createTime}}</span>
                            <span class="sub-notice-class sub-notice-title-no-read">{{item.class}}</span>
                        </div>
                        <el-collapse-transition>
                            <div v-if="isOpenChoiceNoticeContent && choiceNoticeIndex === item.id">
                                <div class="bottom-notice-main-content render-by-edit" v-html="item.content"/>
                            </div>
                        </el-collapse-transition>
                    </div>
                </div>
            </div>
            <el-pagination style="margin: 0.5rem 0;" background layout="prev, pager, next" :total="1000" :small="this.$store.getters.isPhoneGet"/>
        </div>
        <footer-bottom/>
    </div>
</template>
<script>
import footerBottom from '@/components/footerBottom.vue'
export default {
    components:{
        footerBottom
    },
    data(){
        return{
            noticeContent:[
                {
                    id: 0,
                    title: '测试标题',
                    content: '<p>测试内容</p>',
                    createTime: '2022-2-10',
                    class: '系统通知'
                },
                {
                    id: 1,
                    title: '测试标题',
                    content: '<p>测试内容</p>',
                    createTime: '2022-2-15',
                    class: '系统通知'
                },
                {
                    id: 2,
                    title: '测试标题',
                    content: '<p>测试内容</p>',
                    createTime: '2022-2-8',
                    class: '系统通知'
                }
            ],
            choiceNoticeIndex: null,
            isOpenChoiceNoticeContent: false,
            noticeChoiceList:[]
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
            height: 20rem;
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