<template>
    <div class="dynamic-detail-comment-box">
        <div class="head-write-box">
            <div class="user-head">
                <img :src="head"/>
            </div>
            <textarea placeholder="发表你的看法吧"></textarea>
        </div>
        <div class="dy-buttom">
            <span class="button-clear">清空</span>
            <span class="button-confirm">提交</span>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            head: require('@/views/icon/head/stranger12.jpg')
        }
    }
}
</script>
<style lang="scss" scoped>
.dynamic-detail-comment-box
{
    width: 100%;
    display: flex;
    align-content: flex-start;
    flex-wrap: wrap;
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
            border-radius: 0.1rem;
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
@media screen and (min-width:1400px)
{
    .dynamic-detail-comment-box .head-write-box .user-head
    {
        width: 4rem;
        min-width: 4rem;
        height: 4rem;
    }
}
@media screen and (max-width:1400px) and (min-width:1200px)
{
    .dynamic-detail-comment-box .head-write-box .user-head
    {
        width: 4rem;
        min-width: 4rem;
        height: 4rem;
    }
}
@media screen and (max-width:1200px) and (min-width:936px)
{
    .dynamic-detail-comment-box .head-write-box .user-head
    {
        width: 3.5rem;
        min-width: 3.5rem;
        height: 3.5rem;
    }
}
@media screen and (max-width:936px) and (min-width:767px)
{
    .dynamic-detail-comment-box .head-write-box .user-head
    {
        width: 3rem;
        min-width: 3rem;
        height: 3rem;
    }
}
@media screen and (max-width:767px) and (min-width:676px)
{
    .dynamic-detail-comment-box .head-write-box .user-head
    {
        width: 3rem;
        min-width: 3rem;
        height: 3rem;
    }
}
@media screen and (max-width:676px)
{
    .dynamic-detail-comment-box .head-write-box .user-head
    {
        width: 3rem;
        min-width: 3rem;
        height: 3rem;
    }
}
</style>