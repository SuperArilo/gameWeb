<template>
    <div class="footer-div">
        <div class="top-info-show">
            <div class="sub-item">
                <span class="title">关于我</span>
                <div class="my-info">
                    <i class="fab fa-qq"/>
                    <span>728152568</span>
                </div>
                <div class="my-info">
                    <i class="fab fa-weixin"/>
                    <span>AriloWh</span>
                </div>
                <div class="my-info">
                    <i class="fas fa-envelope"/>
                    <span>superarilo@189.cn</span>
                </div>
            </div>
            <div class="sub-item">
                <div class="links">
                    <span class="title">友情链接</span>
                </div>
            </div>
            <div class="sub-item">
                <div class="links">
                    <span class="title">技术驱动</span>
                    <div class="show-logo">
                        <img src="http://image.superarilo.icu/sloganBlue.png"/>
                    </div>
                    <div class="show-logo">
                        <img src="http://image.superarilo.icu/tyy.png"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom-link">
            <span>Copyriht © SuperArilo 2022. All rights reserved</span>
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
    flex-wrap: wrap;
    background-color: #545c64;
    padding: 1rem;
    .top-info-show
    {
        display: flex;
        .sub-item
        {
            display: flex;
            justify-content: center;
            align-content: flex-start;
            flex-wrap: wrap;
            .my-info
            {
                width: 100%;
                height: 1.8rem;
                display: flex;
                align-items: center;
                i , span
                {
                    height: 100%;
                    display: flex;
                    align-items: center;
                }
                i
                {
                    width: 1.8rem;
                    justify-content: center;
                    font-size: 1rem;
                }
                span
                {
                    font-size: 0.7rem;
                    color: hsla(0,0%,100%,0.5);
                    margin-left: 1rem;
                }
            }
            .my-info:nth-child(2) i
            {
                color: #4169e1;
            }
            .my-info:nth-child(3) i
            {
                color: #29c524;
            }
            .my-info:nth-child(4) i
            {
                color: #b3a529;
            }
            .links
            {
                width: 100%;
                display: flex;
                align-content: flex-start;
                flex-wrap: wrap;
                justify-content: center;
            }
            .title
            {
                width: 100%;
                height: 1.8rem;
                display: flex;
                justify-content: center;
                align-items: center;
                text-align: center;
                font-size: 0.7rem;
                color: #ffffff;
                letter-spacing: 0.15rem;
                font-weight: bold;
            }
            .show-logo
            {
                width: 100%;
                height: 1.8rem;
                display: flex;
                justify-content: center;
                align-items: center;
                img
                {
                    max-height: 60%;
                    height: 60%;
                }
            }
        }
    }
    .bottom-link
    {
        width: 100%;
        display: flex;
        align-content: flex-start;
        flex-wrap: wrap;
        justify-content: center;
        margin-top: 1rem;
        span , a
        {
            width: 100%;
            height: 1.4rem;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #f3f3f3;
            text-decoration: none;
            outline: none;
            font-size: 0.7rem;
        }
    }
}
@media screen and (min-width:1400px)
{
    .footer-div .top-info-show
    {
        width: 60%;
        justify-content: space-around;
        .sub-item
        {
            width: calc(100% / 3);
            .my-info
            {
                justify-content: flex-start;
            }
        }
    }
}
@media screen and (max-width:1400px) and (min-width:1200px)
{
    .footer-div .top-info-show
    {
        width: 60%;
        justify-content: space-around;
        .sub-item
        {
            width: calc(100% / 3);
            .my-info
            {
                justify-content: flex-start;
            }
        }
    }
}
@media screen and (max-width:1200px) and (min-width:936px)
{
    .footer-div .top-info-show
    {
        width: 80%;
        justify-content: center;
        flex-wrap: wrap;
        .sub-item
        {
            width: 100%;
            .my-info
            {
                justify-content: center;
            }
        }
    }
}
@media screen and (max-width:936px)
{
    .footer-div .top-info-show
    {
        width: 80%;
        justify-content: center;
        flex-wrap: wrap;
        .sub-item
        {
            width: 100%;
            .my-info
            {
                justify-content: center;
            }
        }
    }
}
</style>