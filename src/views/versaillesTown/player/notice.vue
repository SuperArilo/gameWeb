<template>
    <div class="notice-box">
        <div class="center-content">
            <div class="public-title">
                <span>通知公告</span>
                <i class="fas fa-bell"/>
            </div>
            <div class="notice-content">
                <div class="title-func-menu">
                    <span class="sub-menu">已读</span>
                    <span class="sub-menu">删除</span>
                    <i v-if="this.noticeChoiceList.length !== this.noticeContent.length" class="far fa-square" @click="choiceAll"/>
                    <i v-else class="fas fa-check-square" @click="choiceAllCancel"/>
                </div>
                <div class="notice-sub-content">
                    <div class="notice-sub-item" v-for="item in noticeContent" :key="item.id">
                        <span>{{item.content}}</span>
                        <i v-if="this.noticeChoiceList.indexOf(item.id) === -1" class="far fa-square" @click="choiceNoticeAdd(item.id)"/>
                        <i v-else class="fas fa-check-square" @click="choiceNoticeRemove(item.id)"/>
                    </div>
                </div>
            </div>
            <el-pagination style="margin: 0.5rem 0;" background layout="prev, pager, next" :total="1000" :small="this.$store.getters.isPhoneGet"/>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            noticeContent:[
                {
                    id: 1,
                    content: '测试1'
                },
                {
                    id: 2,
                    content: '测试2'
                },
                {
                    id: 3,
                    content: '测试3'
                },
                {
                    id: 4,
                    content: '测试4'
                },
                {
                    id: 5,
                    content: '测试4'
                },
                {
                    id: 6,
                    content: '测试4'
                },
                {
                    id: 7,
                    content: '测试4'
                },
                {
                    id: 8,
                    content: '测试4'
                }
            ],
            noticeChoiceList:[]
        }
    },
    methods:{
        choiceNoticeAdd(id){
            this.noticeChoiceList.unshift(id)
        },
        choiceNoticeRemove(id){
            this.noticeChoiceList.splice(this.noticeChoiceList.findIndex(item => item === id),1)
        },
        choiceAll(){
            this.noticeContent.forEach(key => {
                if(this.noticeChoiceList.indexOf(key.id) === -1){
                    this.noticeChoiceList.unshift(key.id)
                }
            })
        },
        choiceAllCancel(){
            this.noticeChoiceList = []
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
            border-radius: 0.3rem;
            overflow: hidden;
            border: solid 0.04rem rgb(133, 133, 133);
            .title-func-menu
            {
                width: 100%;
                height: 1.5rem;
                display: flex;
                justify-content: flex-end;
                align-items: center;
                background-color: rgb(240, 240, 240);
                box-shadow: 0 0 0.2rem black;
                .sub-menu
                {
                    width: 3rem;
                    height: 1.2rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border: solid 0.05rem darkgray;
                    border-radius: 0.1rem;
                    font-size: 0.55rem;
                    cursor: pointer;
                    margin: 0 0.3rem;
                }
                .sub-menu:hover
                {
                    color: #3399ff;
                }
                i
                {
                    height: 100%;
                    font-size: 0.8rem;
                    display: flex;
                    align-items: center;
                    margin: 0 0.5rem;
                }
            }
            .notice-sub-content
            {
                width: 100%;
                display: flex;
                align-content: flex-start;
                flex-wrap: wrap;
                .notice-sub-item
                {
                    width: 100%;
                    height: 1.5rem;
                    padding: 0 0.5rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-radius: 0.3rem;
                    margin: 0.3rem 0;
                    cursor: pointer;
                    span
                    {
                        height: 100%;
                        line-height: 1.5rem;
                        font-size: 0.6rem;
                        min-width: 0;
                        max-width: 60%;
                        text-overflow: ellipsis;
                        white-space: nowrap; 
                        overflow: hidden;
                        transition: all 0.3s;
                    }
                    i
                    {
                        height: 100%;
                        display: flex;
                        align-items: center;
                        font-size: 0.8rem;
                    }
                    span:hover
                    {
                        text-decoration: underline;
                    }
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