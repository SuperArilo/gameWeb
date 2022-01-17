<template>
    <div class="index-box">
        <div class="center-box">
            <div class="top-tips">
                <span>动态发表</span>
                <span>在这里可以发布您的个人动态以及你的日常，如有疑问也可以直接回复</span>
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
<script>
export default {
    data(){
        return{
        }
    },
    created(){
    },
    mounted(){
    }
}
</script>
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
        justify-content: center;
        align-items: flex-start;
        flex-wrap: wrap;
        align-content: flex-start;
        transition: width 0.3s;
        .top-tips
        {
            width: 100%;
            height: 8rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
            background-image: url('../views/icon/index/index_center.jpg');
            padding: 1rem;
            span
            {
                color: #ffffff;
                letter-spacing: 0.1rem;
                text-align: center;
            }
            span:nth-child(1)
            {
                font-size: 1.4rem; 
            }
            span:nth-child(2)
            {
                font-size: 0.65rem;
                margin-top: 0.5rem;
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