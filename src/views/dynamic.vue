<template>
    <div class="index-box">
        <div class="center-box">
            <div class="top-tips">
                <span class="title-span">🎈 欢迎加入 凡尔赛小镇 玩家社区 🎈</span>
                <div class="span-line">
                    首先，我们欢迎您的到来，但在此之前，您的发言需要遵守我们的
                    <span class="need-tips">《社区发言规范》</span>
                </div>
            </div>
            <div class="center-content-box">
                <router-view v-slot="{ Component }" style="position: absolute;">
                    <transition name="router_animate">
                        <component :is="Component" />
                    </transition>
                </router-view>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.index-box
{
    width: 100%;
    display: flex;
    justify-content: center;
    align-content: flex-start;
    flex-wrap:wrap;
    .center-box
    {
        width: 100%;
        display: flex;
        align-items: flex-start;
        flex-wrap: wrap;
        align-content: flex-start;
        .top-tips
        {
            width: 100%;
            height: 8rem;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            align-content: center;
            justify-content: flex-start;
            background-color: #ededed;
            padding: 0 2rem;
            .title-span
            {
                width: 100%;
                display: flex;
                justify-content: center;
                text-align: center;
                color: #808080;
                font-size: 1rem;
                letter-spacing: 0.05rem;
            }
            .span-line
            {
                width: 100%;
                display: flex;
                justify-content: center;
                text-align: center;
                font-size: 0.68rem;
                color: #808080;
                margin: 0.3rem 0;
                flex-wrap: wrap;
                .need-tips
                {
                    color: #de8e00;
                    cursor: pointer;
                }
            }
        }
        .center-content-box
        {
            width: 100%;
            position: relative;
            .router_animate-enter-active
            {
                animation: slideInLeft 0.4s;
            }
            .router_animate-leave-active
            {
                animation: slideOutRight 0.4s;
            }
        }
    }
    .loading_animate-enter-active
    {
        animation: flipInX 0.3s;
    }
    .loading_animate-leave-active
    {
        animation: flipOutY 0.3s;
    }
}
</style>