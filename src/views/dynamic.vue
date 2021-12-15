<template>
    <div class="album-change-box">
        <router-view v-slot="{ Component }">
            <transition mode="out-in" name="album_animate">
                <component :is="Component" />
            </transition>
        </router-view>
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
    height: auto;
    display: flex;
    justify-content: center;
    align-items: flex-start;
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