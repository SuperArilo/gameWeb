<template>
    <div class="index-box">
        <div class="top-player-div" v-if="this.$store.getters.userInfoGet !== null">
            <img class="player-head" :src="this.$store.getters.userInfoGet.userhead"/>
            <span class="player-name">{{this.$store.getters.userInfoGet.nickname}}</span>
            <span class="play-introduce">{{this.$store.getters.userInfoGet.personalizedSignature}}</span>
        </div>
        <div class="loading-box" v-else>
            <span>加载中...</span>
            <i class="fas fa-circle-notch fa-spin"/>
        </div>
        <div class="player-menu">
            <div class="sub-menu-item" v-for="(item,index) in playerMenu" :key="index" :class="playerMenuIndex === item.id ? 'sub-menu-item-active':''" @click="menuFunc(item.id,item.path)">
                <i class="fas" :class="item.icon"/>
                <span v-if="!this.$store.getters.isPhoneGet">{{item.title}}</span>
            </div>
        </div>
        <div class="player-router">
            <router-view v-slot="{ Component }" style="position: absolute;">
                <transition name="loading_animate">
                    <component :is="Component" />
                </transition>
            </router-view>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            playerMenu:[
                {
                    id: 0,
                    title: '主页',
                    icon: 'fa-home',
                    path: 'player'
                },
                {
                    id: 1,
                    title: '通知',
                    icon: 'fas fa-exclamation-circle',
                    path: 'player/notice'
                },
                {
                    id: 2,
                    title: '个人信息',
                    icon: 'fa-id-badge',
                    path: 'player/personalInformation'
                },
                {
                    id: 3,
                    title: 'ID绑定',
                    icon: 'fa-address-card',
                    path: 'player/idbind'
                }
            ],
            playerMenuIndex: 0
        }
    },
    beforeCreate(){
    },
    created(){
        this.playerMenu.findIndex(key => {
            if(this.$route.path === '/' + key.path){
                this.playerMenuIndex = key.id
            }
        })
    },
    methods:{
        menuFunc(id,path){
            this.playerMenuIndex = id
            this.$router.push('/' + path)
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
    .top-player-div , .loading-box
    {
        width: 100%;
        height: 10rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-image: url('../icon/index/versaillestown/player/playerBg.jpg');
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
    }
    .top-player-div
    {
        .player-head
        {
            width: 3.5rem;
            height: 3.5rem;
            border: solid 0.1rem #99a2aa;
            object-fit: cover;
            border-radius: 50%;
            box-shadow: 0 0 0.2rem black;
        }
        .player-name
        {
            font-size: 0.68rem;
            color: #272727;
            margin: 1rem 0;
            letter-spacing: 0.02rem;
            font-weight: bold;
        }
        .play-introduce
        {
            max-width: 60%;
            text-align: center;
            font-size: 0.6rem;
        }
    }
    .loading-box
    {
        background-color: rgab(255,255,255,0.5);
        span , i
        {
            height: 100%;
            display: flex;
            align-items: center;
            color: #4b4b4b;
        }
        span
        {
            font-size: 0.6rem;
        }
        i
        {
            font-size: 0.8rem;
        }
    }
    .player-menu
    {
        width: 100%;
        height: 1.8rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        background-color: #fcfcfc;
        border: solid 0.05rem #eaeaea;
        margin-top: 0.5rem;
        .sub-menu-item
        {
            width: calc(100% / 10);
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            border-bottom: solid 0.1rem transparent;
            cursor: pointer;
            span , i
            {
                height: 100%;
                display: flex;
                align-items: center;
                margin-top: 0.1rem;
            }
            span
            {
                font-size: 0.55rem;
                margin-left: 0.2rem;
            }
            i
            {
                font-size: 0.7rem;
            }
        }
        .sub-menu-item:hover
        {
            background-color: #e9e9e9;
            border-bottom: solid 0.1rem darkgreen;
            i
            {
                color:cadetblue
            }
        }
        .sub-menu-item-active
        {
            background-color: #e9e9e9;
            border-bottom: solid 0.1rem darkgreen;
            i
            {
                color:cadetblue
            }
        }
    }
    .player-router
    {
        width: 100%;
        position: relative;
        .loading_animate-enter-active
        {
            animation: fadeInLeft 0.8s;
        }
        .loading_animate-leave-active
        {
            animation: fadeOutRight 0.8s;
        }
    }
}
</style>