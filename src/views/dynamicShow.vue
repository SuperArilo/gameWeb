<template>
    <div class="content-box">
        <div class="top-menu">
            <el-dropdown class="dropdown-menu">
                <span>{{dropdownMenuTitle}}
                    <i class="fa fa-chevron-down"/>
                </span>
                <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item v-for="(item,index) in dropdownMenu" :key="index" @click="dropdownMenuFunc(item.id,item.title)">{{item.title}}</el-dropdown-item>
                </el-dropdown-menu>
                </template>
            </el-dropdown>
            <i class="fa fa-refresh refresh"/>
        </div>
        <div class="dy-content">
            <div class="sub-item" v-for="(item,index) in 6" :key="index">
                <div class="title-and-user-head">
                    <span class="title">这是标题这是标题</span>
                    <div class="user-head">
                        <img src="../icon/head/stranger10.jpg"/>
                    </div>
                </div>
                <div class="dy-inf-show">
                    <div class="dy-sub-item">
                        <i class="fa fa-calendar"/>
                        <span>2021-12-22 19:13</span>
                    </div>
                    <div class="dy-sub-item">
                        <i class="fa fa-rocket"/>
                        <span>这次换你听歌</span>
                    </div>
                    <div class="dy-sub-item">
                        <i class="fa fa-commenting-o"/>
                        <span>0 条评论</span>
                    </div>
                    <div class="dy-sub-item">
                        <i class="fa fa-tags"/>
                        <span>其他</span>
                    </div>
                    <div class="dy-sub-item">
                        <i class="fa fa-eye"/>
                        <span>0 浏览</span>
                    </div>
                </div>
                <span class="dy-introduction">
                    这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介
                </span>
                <div class="bottom-buttom">
                    <span class="buttom">跃迁</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            dropdownMenuTitle: '最新',
            dropdownMenu:[
                {
                    id: 0,
                    title: '最新'
                },
                {
                    id: 0,
                    title: '热门'
                },
                {
                    id: 0,
                    title: '发布时间倒序'
                },
                {
                    id: 0,
                    title: '发布时间正序'
                }
            ]
        }
    },
    methods:{
        dropdownMenuFunc(id,title){
            this.dropdownMenuTitle = title
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
    background-color: rgb(240, 240, 240);
    .top-menu
    {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        background-color: #ffffff;
        padding: 0.3rem 0.5rem;
        box-shadow: 0 0 0.1rem rgba(0, 0, 0, 0.288);
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
                font-size: 0.64rem;
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
    }
    .dy-content
    {
        width: 100%;
        margin-top: 1rem;
        padding: 0.5rem 0.3rem;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        .sub-item
        {
            width: 100%;
            background-color: #ffffff;
            display: flex;
            flex-direction: column;
            padding: 0.5rem 0.5rem;
            transition: all 0.3s;
            margin-bottom: 1rem;
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
                    font-size: 0.7rem;
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
                    width: 3rem;
                    min-width: 3rem;
                    height: 3rem;
                    min-height: 3rem;
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
                    span , i
                    {
                        font-size: 0.45rem;
                    }
                    span
                    {
                        margin-left: 0.3rem;
                    }
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
                font-size: 0.6rem;
                padding: 0.5rem;
                letter-spacing: 0.03;
            }
            .bottom-buttom
            {
                width: 100%;
                display: flex;
                justify-content: flex-end;
                align-items: center;
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
                }
                .buttom:hover
                {
                    color: #ffffff;
                    background-color: darkcyan;
                }
            }
        }
        .sub-item:hover
        {
            transform: translateY(-0.2rem);
            box-shadow: 0 0.3rem 0.3rem darkgray;
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