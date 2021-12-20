<template>
    <div class="album-change-box" :style="{backgroundImage:`url(${indexBg})`}">
        <router-view v-slot="{ Component }">
            <transition mode="out-in" name="album_animate">
                <component :is="Component" />
            </transition>
        </router-view>
        <footer-bottom></footer-bottom>
    </div>
</template>
<script>
import footerBottom from '@/components/footerBottom.vue'
export default {
    components:{
        footerBottom
    },
    data(){
        return{
            indexBg: require('@/icon/index/index_center.jpg'),
        }
    },
    created(){
    },
    mounted(){
    },
    methods:{
    },
    unmounted(){
    }
}
</script>
<style lang="scss" scoped>
.album-change-box
{
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: wrap;
    padding-top: 1rem;
    background-repeat: no-repeat;
    background-position: top;
    background-attachment: fixed;
    background-size: cover;
    .album_animate-enter-active
    {
        transition-delay: 0.5s !important;
        animation: slideInLeft 0.5s;
    }
    .album_animate-leave-active
    {
        animation: slideOutRight 0.5s;
    }
}
</style>