<template>
    <div class="footer-div">
        <div class="top-div">
            <img src="../views/icon/index/mmqrcod.png"/>
            <div class="public-div">
                <span class="title-span">关于我</span>
                <div class="contant-div">
                    <div class="sub-div">
                        <i class="fab fa-qq"></i>
                        <span>72815258</span>
                    </div>
                    <div class="sub-div">
                        <i class="fab fa-weixin"></i>
                        <span>AriloWh</span>
                    </div>
                    <div class="sub-div">
                        <i class="fas fa-envelope"></i>
                        <span>superarilo@189.cn</span>
                    </div>
                </div>
            </div>
            <div class="public-div">
                <span class="title-span">友情链接</span>
            </div>
            <div class="public-div">
                <span class="title-span">博客简介</span>
            </div>
        </div>
        <div class="bottom-link">
            <span>Copyriht © SuperArilo 2021. All rights reserved</span>
            <a href="https://beian.miit.gov.cn/" target="_blank">备案号：蜀ICP备2021010843号</a>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
.footer-div
{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: space-between;
    flex-wrap: wrap;
    background-color: #545c64;
    padding: 1rem;
    .top-div
    {
        width: 100%;
        display: flex;
        img
        {
            height: 5rem;
            max-height: 100%;
        }
        .public-div
        {
            width: 20%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            .title-span
            {
                width: 100%;
                height: 2rem;
                display: flex;
                justify-content: center;
                align-items: center;
                color: white;
                font-weight: 600;
                font-size: 0.65rem;
                letter-spacing: 0.1rem;
            }
            .contant-div
            {
                width: 100%;
                display: flex;
                flex-direction: column;
                .sub-div
                {
                    width: 100%;
                    height: 1.5rem;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    i
                    {
                        font-size: 0.9rem;
                    }
                    span
                    {
                        height: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: 0.7rem;
                        color: hsla(0,0%,100% , 0.5);
                    }
                }
                .sub-div:nth-child(1) i
                {
                    color: royalblue;
                }
                .sub-div:nth-child(2) i
                {
                    color: rgb(41, 197, 36);
                }
                .sub-div:nth-child(3) i
                {
                    color: rgb(179, 165, 41);
                }
            }
        }
    }
    .bottom-link
    {
        width: 100%;
        height: auto;
        margin-top: 1.5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        a , span
        {
            text-decoration: none;
            color: rgb(243, 243, 243);
            font-size: 0.7rem;
        }
        a
        {
            margin-top: 0.3rem;
        }
    }
}
</style>