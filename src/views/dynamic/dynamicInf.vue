<template>
    <div class="details-box">
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
        <div class="dy-markdown-content">
            
        </div>
        <div class="dy-write-comment">
            <span class="title-span">
                <i class="far fa-comment-alt"/>
                说点什么
            </span>
            <div class="head-write-box">
                <div class="user-head">
                    <img src="../icon/head/stranger12.jpg"/>
                </div>
                <textarea placeholder="发表你的看法吧"></textarea>
            </div>
            <div class="dy-buttom">
                <span class="button-clear">清空</span>
                <span class="button-confirm">提交</span>
            </div>
        </div>
        <div class="dy-comment-content">
            <span class="title-span">
                <i class="far fa-comments"/>
                评论区
            </span>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
.details-box
{
    width: 100%;
    display: flex;
    justify-content: center;
    align-content: flex-start;
    flex-wrap: wrap;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 1rem 0.3rem;
    .dy-top-content
    {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        .title-span
        {
            width: 100%;
            display: flex;
            justify-content: center;
            text-align: center;
            font-size: 1rem;
            font-weight: 600;
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
    .dy-markdown-content
    {
        width: 100%;
        margin-top: 0.5rem;
        height: 20rem;
        background-color: rgb(95, 95, 95);
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
        margin-top: 1rem;
        padding: 0 1rem;
        .head-write-box
        {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 1rem;
            .user-head
            {
                overflow: hidden;
                box-shadow: 0 0 0.2rem rgb(105, 105, 105);
                img
                {
                    width: 100%;
                    object-fit: cover;
                }
            }
            textarea
            {
                width: 100%;
                border-radius: 0.3rem;
                min-height: 4rem;
                outline: none;
                margin-left: 0.5rem;
                resize: none;
                transition: all 0.3s;
                padding: 0.5rem;
                font-size: 0.7rem;
                font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
                letter-spacing: 0.06rem;
            }
            textarea:focus
            {
                box-shadow: 0 0 0.2rem rgb(68, 112, 148);
            }
        }
        .dy-buttom
        {
            width: 100%;
            margin-top: 0.5rem;
            display: flex;
            justify-content: flex-end;
            span
            {
                height: 1.5rem;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 0.6rem;
                width: 4rem;
                transition: all 0.3s;
                border-radius: 0.2rem;
                cursor: pointer;
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
    .dy-comment-content
    {
        width: 100%;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        align-content: flex-start;
        padding: 0 1rem;
    }
}
@media screen and (min-width:1400px)
{
    .details-box .dy-write-comment .head-write-box .user-head
    {
        width: 4rem;
        min-width: 4rem;
        height: 4rem;
    }
}
@media screen and (max-width:1400px) and (min-width:1200px)
{
    .details-box .dy-write-comment .head-write-box .user-head
    {
        width: 4rem;
        min-width: 4rem;
        height: 4rem;
    }
}
@media screen and (max-width:1200px) and (min-width:936px)
{
    .details-box .dy-write-comment .head-write-box .user-head
    {
        width: 3.5rem;
        min-width: 3.5rem;
        height: 3.5rem;
    }
}
@media screen and (max-width:936px) and (min-width:767px)
{
    .details-box .dy-write-comment .head-write-box .user-head
    {
        width: 3rem;
        min-width: 3rem;
        height: 3rem;
    }
}
@media screen and (max-width:767px) and (min-width:676px)
{
    .details-box .dy-write-comment .head-write-box .user-head
    {
        width: 3rem;
        min-width: 3rem;
        height: 3rem;
    }
}
@media screen and (max-width:676px)
{
    .details-box .dy-write-comment .head-write-box .user-head
    {
        width: 3rem;
        min-width: 3rem;
        height: 3rem;
    }
}
</style>