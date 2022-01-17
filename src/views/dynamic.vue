<template>
    <div class="index-box" :style="{backgroundImage:`url(${this.$store.getters.indexBgGet})`}">
        <div class="center-box">
            <div class="top-tips">
                <span>动态发表</span>
                <span>在这里可以发布您的个人动态以及你的日常，如有疑问也可以直接回复</span>
            </div>
            <div class="center-content-box">
                <router-view v-slot="{ Component }">
                    <transition mode="out-in" name="router_animate">
                        <component :is="Component" />
                    </transition>
                </router-view>
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
    overflow: hidden;
    padding-top: 2rem;
    background-repeat: no-repeat;
    background-position: top;
    background-attachment: fixed;
    background-size: cover;
    .center-box
    {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-wrap: wrap;
        align-content: flex-start;
        transition: width 0.3s;
        margin-bottom: 2rem;
        .top-tips
        {
            width: 100%;
            height: 8rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            border-radius: 0.5rem;
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
            margin-top: 1rem;
            border-radius: 0.2rem;
            overflow: hidden;
            .router_animate-enter-active
            {
                animation: fadeInLeft 0.4s;
            }
            .router_animate-leave-active
            {
                animation: fadeOutRight 0.4s;
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
@media screen and (min-width:1400px)
{
    .index-box
    {
        .center-box
        {
            width: 60%;
        }
    }
}
@media screen and (max-width:1400px) and (min-width:1200px)
{
    .index-box
    {
        .center-box
        {
            width: 75%;
        }
    }
}
@media screen and (max-width:1200px) and (min-width:936px)
{
    .index-box
    {
        .center-box
        {
            width: 85%;
        }
    }
}
@media screen and (max-width:936px)
{
    .index-box
    {
        .center-box
        {
            width: 95%;
        }
    }
}
</style>