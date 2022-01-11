<template>
    <div class="index-box" :style="{backgroundImage:`url(${indexBg})`}">
        <div class="center-top-inf">
            <div class="top-tips">
                <span class="title">闲言碎语</span>
                <div class="other-inf">
                    <span>2021-12-21</span>
                    <span>这次换你听歌</span>
                    <span>2篇灵感</span>
                </div>
            </div>
            <div class="lingan-div">
                <div class="sub-item" v-for="(item,index) in titleMdList" :key="index">
                    {{item.text}}
                </div>
            </div>
            <div class="edit-div">
                <span class="title-span">说点什么</span>
            </div>
            <div class="show-message-div">
                <span class="title-span">留言合集</span>
                <div class="message-content">
                    <div class="sub-message-item" v-for="(item,index) in 6" :key="index">
                        <div class="left-head">
                            <img src="../views/icon/head/stranger8.jpg"/>
                        </div>
                        <div class="right-content">
                            <span class="message-title">这是标题</span>
                            <span class="show-content">
                                这是要说的留言内容这是要说的留言内容这是要说的留言内容这是要说的留言内容这是要说的留言内容这是要说的留言内容这是要说的留言内容
                            </span>
                            <div class="show-who">
                                <div>
                                    <i class="fas fa-paper-plane"></i>
                                    <span>腐竹 留言</span>
                                </div>
                                <div>
                                    <i class="far fa-calendar-alt"></i>
                                    <span>2021-12-21</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <el-pagination background layout="prev, pager, next" :total="20" :page-size="8"></el-pagination>
        </div>
        <footer-bottom></footer-bottom>
    </div>
</template>
<script>
import footerBottom from '../components/footerBottom.vue'
export default {
  components: { footerBottom },
    data(){
        return{
            indexBg: require('@/views/icon/index/index_center.jpg'),
            titleMdList:[
                {
                    id: 0,
                    text: '**Markdown**是一种简单的文本格式语言，以简单的键盘字符编写文档，转换成html后就能显示复杂的页面效果。'
                },
                {
                    id: 1,
                    text: '**Markdown**是一种简单的文本格式语言，以简单的键盘字符编写文档，转换成html后就能显示复杂的页面效果。'
                },
                {
                    id: 2,
                    text: '**Markdown**是一种简单的文本格式语言，以简单的键盘字符编写文档，转换成html后就能显示复杂的页面效果。'
                },
            ],
            text: '**Markdown**是一种简单的文本格式语言，以简单的键盘字符编写文档，转换成html后就能显示复杂的页面效果。',
        }
    }
}
</script>
<style lang="scss" scoped>
.index-box
{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: wrap;
    background-repeat: no-repeat;
    background-position: top;
    background-attachment: fixed;
    background-size: cover;
    .center-top-inf
    {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-wrap: wrap;
        background-color: #ffffffd3;
        margin: 2rem 0 2rem 0;
        .top-tips
        {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            .title
            {
                font-size: 1rem;
                text-align: center;
            }
            .other-inf
            {
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 0.5rem;
                span
                {
                    font-size: 0.6rem;
                    color: #7c8188;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                span:nth-child(2)
                {
                    margin: 0 0.5rem 0 0.5rem;
                }
            }
        }
        .lingan-div
        {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            flex-wrap:wrap;
            padding: 0 1rem 0 1rem;
            .sub-item
            {
                width: 100%;
                border-left: solid 0.15rem #b1bbd4;
                margin: 0.2rem 0 0.2rem 0;
            }
        }
        .edit-div , .show-message-div 
        {
            .title-span
            {
                width: 100%;
                display: flex;
                flex-direction: column;
                font-size: 0.9rem;
                border-bottom: dashed 0.06rem darkgray;
                position: relative;
                padding: 0.3rem 0 0.3rem 0;
            }
            .title-span::after
            {
                content: "";
                position: absolute;
                display: block;
                width: 2rem;
                height: 0.15rem;
                left: 0;
                bottom: -0.06rem;
                border-radius: 0.1rem;
                background-color: #807fe2;
            }
        }
        .edit-div
        {
            width: 100%;
            .buttom
            {
                width: 100%;
                height: 1.5rem;
                display: flex;
                justify-content: flex-end;
                align-items: center;
                margin: 0 1rem 0 1rem;
                border-radius: 0.5rem;
                cursor: pointer;
                transition: all 0.3s;
                span
                {
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 0.6rem;
                    width: 4rem;
                    transition: all 0.3s;
                    border-radius: 0.2rem;
                }
                .button-clear
                {
                    background-color: #fdf6ec;
                    color:  #e6a23c;
                    border: solid 0.05rem #f5dab1;
                }
                .button-clear:hover
                {
                    color: white;
                    background-color:  #e6a23c;
                }
                .button-confirm
                {
                    margin-left: 1rem;
                    background-color: #b3d8ff;
                    color: #3399ff;
                    border: solid 0.05rem #409eff;
                }
                .button-confirm:hover
                {
                    color: white;
                    background-color: #409eff;
                }
            }
        }
        .show-message-div
        {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            flex-wrap: wrap;
            .message-content
            {
                width: 100%;
                display: flex;
                align-content: flex-start;
                flex-wrap: wrap;
                padding: 1rem 0 1rem 0;
                .sub-message-item
                {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    min-height: 5rem;
                    padding: 0 0.5rem 0 0.5rem;
                    margin-bottom: 1rem;
                    .left-head
                    {
                        width: 3rem;
                        min-width: 3rem;
                        height: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: flex-start;
                        img
                        {
                            border-radius: 50%;
                            box-shadow: -0.01rem 0.01rem 0.2rem black;
                        }
                    }
                    .right-content
                    {
                        width: 100%;
                        height: 100%;
                        margin-left: 1.5rem;
                        border-left: solid 0.2rem #807fe2;
                        border-right: solid 0.2rem #807fe2;
                        background-color: rgba(255,255,255,0.7);
                        box-shadow: 0 0.1rem 0.8rem -0.6rem black;
                        padding: 0 0.5rem 0 0.5rem;
                        position: relative;
                        .message-title
                        {
                            width: 100%;
                            display: flex;
                            flex-direction: column;
                            font-size: 0.66rem;
                            color: #757575;
                            letter-spacing: 0.05rem;
                            word-break: break-all;
                            text-align: left;
                            position: relative;
                            padding: 0.5rem 0 0.5rem 0;
                        }
                        .message-title::after
                        {
                            content: "";
                            position: absolute;
                            display: block;
                            width: 2rem;
                            height: 0.15rem;
                            left: 0;
                            bottom: 0;
                            border-radius: 0.1rem;
                            background-color: #807fe2;
                        }
                        .show-content
                        {
                            width: 100%;
                            padding: 0.5rem 0 0.5rem 0;
                            min-height: 3rem;
                            display: flex;
                            justify-content: flex-start;
                            align-items: flex-start;
                            font-size: 0.55rem;
                            word-break: break-all;
                            letter-spacing: 0.04rem;
                        }
                        .show-who
                        {
                            width: 100%;
                            height: 1rem;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            margin-bottom: 0.5rem;
                            div
                            {
                                width: 50%;
                                height: 100%;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                i
                                {
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                    height: 100%;
                                    font-size: 0.7rem;
                                    margin: 0 0.3rem 0 0.3rem;
                                }
                                span
                                {
                                    height: 100%;
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                    font-size: 0.55rem;
                                    color: #757575;
                                }
                            }
                        }
                        .show-who div:nth-child(1)
                        {
                            justify-content: flex-start;
                        }
                        .show-who div:nth-child(2)
                        {
                            justify-content: flex-end;
                        }
                    }
                    .right-content::after
                    {
                        content: "";
                        position: absolute;
                        border-top: solid 0.3rem transparent;
                        border-right: solid 0.4rem #807fe2;
                        border-bottom: solid 0.3rem transparent;
                        left: -0.6rem;
                        top: 1.5rem;
                    }
                }
            }
        }
    }
}
@media screen and (min-width:1400px)
{
    .index-box
    {
        .center-top-inf
        {
            width: 40rem;
            padding: 1.5rem 1rem 1rem 1rem;
        }
    }
}
@media screen and (max-width:1400px) and (min-width:1200px)
{
    .index-box
    {
        .center-top-inf
        {
            width: 35rem;
            padding: 1.5rem 1rem 1rem 1rem;
        }
    }
}
@media screen and (max-width:1200px) and (min-width:936px)
{
    .index-box
    {
        .center-top-inf
        {
            width: 30rem;
            padding: 1.5rem 0.8rem 0.8rem 0.8rem;
        }
    }
}
@media screen and (max-width:936px) and (min-width:767px)
{
    .index-box
    {
        .center-top-inf
        {
            width: 95%;
            padding: 1.5rem 0.5rem 1rem 0.5rem;
        }
    }
}
@media screen and (max-width:767px) and (min-width:676px)
{
    .index-box
    {
        .center-top-inf
        {
            width: 95%;
            padding: 1.5rem 0.5rem 1rem 0.5rem;
        }
    }
}
@media screen and (max-width:676px)
{
    .index-box
    {
        .center-top-inf
        {
            width: 95%;
            padding: 1.5rem 0.5rem 1rem 0.5rem;
        }
    }
}
</style>