<template>
    <div class="index-box" :style="{backgroundImage:`url(${indexBg})`}">
        <div class="talk-div">
            <div class="talk-title">
                <span>在线聊天</span>
                <span>与在服务器里游玩的小伙伴一起聊天吧！</span>
                <span>连接可能会有稍许延迟，这是正常现象，请注意语言规范</span>
            </div>
            <div class="talk-content">
                <div class="user-message-item-left">
                    <div class="user-head">
                        <img src="../icon/head/stranger6.jpg"/>
                    </div>
                    <div class="user-name-and-message">
                        <span class="user-name">这次换你听歌</span>
                        <span class="user-message">测试内容测试内容测试内容测试内测试内容测试内容测试内容测试内</span>
                    </div>
                </div>
                <div class="user-message-item-right">
                    <div class="user-head">
                        <img src="../icon/head/stranger6.jpg"/>
                    </div>
                    <div class="user-name-and-message">
                        <span class="user-name">这次换你听歌</span>
                        <span class="user-message">测试内容测试内容测试内容测试内</span>
                    </div>
                </div>
            </div>
        </div>
        <footer-bottom/>
    </div>
</template>
<script>
import FooterBottom from '@/components/footerBottom.vue'
export default {
    components:{
        FooterBottom
    },
    data(){
        return{
            indexBg: require('@/views/icon/index/index_center.jpg'),
        }
    }
}
</script>
<style lang="scss" scoped>
.index-box
{
    width: 100%;
    display: flex;
    align-content: flex-start;
    justify-content: center;
    flex-wrap: wrap;
    background-repeat: no-repeat;
    background-position: top;
    background-attachment: fixed;
    background-size: cover;
    .talk-div
    {
        display: flex;
        align-content: flex-start;
        justify-content: center;
        flex-wrap: wrap;
        background-color: #ffffffb9;
        margin: 2rem 0;
        border-radius: 0.3rem;
        overflow: hidden;
        .talk-title
        {
            width: 100%;
            height: 8rem;
            display: flex;
            justify-content: center;
            align-items: center;
            align-content: center;
            flex-wrap: wrap;
            background-repeat: no-repeat;
            background-position: top;
            background-attachment: fixed;
            background-size: cover;
            background-image: url('../icon/index/versaillestown/townIndex2.jpg');
            box-shadow: 0 0 0.3rem black;
            padding: 0.5rem;
            span
            {
                width: 100%;
                display: flex;
                justify-content: center;
                letter-spacing: 0.05rem;
                color: #ffffff;
                text-align: center;
            }
            span:nth-child(1)
            {
                font-size: 1.2rem;
            }
            span:nth-child(2)
            {
                font-size: 0.7rem;
                margin: 0.5rem 0;
            }
            span:nth-child(3)
            {
                font-size: 0.6rem;
                color: #cacaca;
            }
        }
        .talk-content
        {
            width: 100%;
            height: 20rem;
            display: flex;
            align-content: flex-start;
            flex-wrap: wrap;
            overflow-y: scroll;
            overflow-x: hidden;
            .user-message-item-left , .user-message-item-right
            {
                width: 100%;
                display: flex;
                align-items: flex-start;
                align-content: flex-start;
                margin: 0.5rem 0;
                .user-head
                {
                    width: 2.5rem;
                    height: 2.5rem;
                    min-width: 2.5rem;
                    border-radius: 50%;
                    overflow: hidden;
                    box-shadow: 0 0 0.1rem black;
                    img
                    {
                        object-fit: cover;
                        width: 100%;
                    }
                }
                .user-name-and-message
                {
                    width: 100%;
                    display: flex;
                    align-content: flex-start;
                    flex-wrap: wrap;
                    position: relative;
                    .user-name
                    {
                        width: 100%;
                        display: flex;
                        font-size: 0.6rem;
                        color: rgb(68, 68, 68);
                        letter-spacing: 0.02rem;
                    }
                    .user-message
                    {
                        padding: 0.5rem;
                        background-color: #336ae0;
                        margin-top: 0.25rem;
                        border-radius: 0.3rem;
                        font-size: 0.55rem;
                        color: #ffffff;
                        letter-spacing: 0.02rem;
                    }
                }
                .user-name-and-message::before , .user-name-and-message::after
                {
                    content: "";
                    position: absolute;
                    border-top: solid 0rem transparent;
                    border-bottom: solid 0.5rem transparent;
                    top: 1.5rem;
                }
            }
            .user-message-item-left
            {
                justify-content: flex-start;
                .user-name-and-message
                {
                    margin-left: 1rem;
                    .user-name
                    {
                        justify-content: flex-start;
                    }
                }
                .user-name-and-message::before
                {
                    border-right: solid 0.5rem #336ae0;
                    left: -0.4rem;
                }
            }
            .user-message-item-right
            {
                justify-content: flex-end;
                flex-direction: row-reverse;
                .user-name-and-message
                {
                    margin-right: 1rem;
                    flex-direction: row-reverse;
                    .user-name
                    {
                        justify-content: flex-end;
                    }
                }
                .user-name-and-message::after
                {
                    border-left: solid 0.5rem #336ae0;
                    right: -0.4rem;
                }
            }
        }
    }
}
@media screen and (min-width:1400px)
{
    .index-box
    {
        .talk-div
        {
            width: 60%;
            .talk-content
            {
                padding: 0.8rem 0.5rem 0 0.5rem;
                .user-message-item-left , .user-message-item-right
                {
                    .user-name-and-message .user-message
                    {
                        max-width: 18rem;
                    }
                }
            }
        }
    }
}
@media screen and (max-width:1400px) and (min-width:1200px)
{
    .index-box
    {
        .talk-div
        {
            width: 60%;
            .talk-content
            {
                padding: 0.8rem 0.5rem 0 0.5rem;
                .user-message-item-left , .user-message-item-right
                {
                    .user-name-and-message .user-message
                    {
                        max-width: 18rem;
                    }
                }
            }
        }
    }
}
@media screen and (max-width:1200px) and (min-width:936px)
{
    .index-box
    {
        .talk-div
        {
            width: 60%;
            .talk-content
            {
                padding: 0.8rem 0.5rem 0 0.5rem;
                .user-message-item-left , .user-message-item-right
                {
                    .user-name-and-message .user-message
                    {
                        max-width: 14rem;
                    }
                }
            }
        }
    }
}
@media screen and (max-width:936px) and (min-width:767px)
{
    .index-box
    {
        .talk-div
        {
            width: 80%;
            .talk-content
            {
                padding: 0.8rem 0 0 0.5rem;
                .user-message-item-left , .user-message-item-right
                {
                    .user-name-and-message .user-message
                    {
                        max-width: 10rem;
                    }
                }
            }
        }
    }
}
@media screen and (max-width:767px) and (min-width:676px)
{
    .index-box
    {
        .talk-div
        {
            width: 80%;
            .talk-content
            {
                padding: 0.8rem 0 0 0.5rem;
                .user-message-item-left , .user-message-item-right
                {
                    .user-name-and-message .user-message
                    {
                        max-width: 10rem;
                    }
                }
            }
        }
    }
}
@media screen and (max-width:676px)
{
    .index-box
    {
        .talk-div
        {
            width: 80%;
            .talk-content
            {
                padding: 0.8rem 0 0 0.5rem;
                .user-message-item-left , .user-message-item-right
                {
                    .user-name-and-message .user-message
                    {
                        max-width: 10rem;
                    }
                }
            }
        }
    }
}
</style>