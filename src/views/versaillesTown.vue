<template>
    <div class="index-div">
        <div class="index-center-show">
            <img class="back-iamge" :src="indexImage"/>
            <div class="center-text">
                <span class="welcome-tips">欢迎来到</span>
                <h2>凡尔赛小镇</h2>
                <div class="describe">
                    <span>生存、宠物、RPG、领地、养老</span>
                </div>
            </div>
        </div>
        <div class="index-describe">
            <span class="why-inf">为什么选择我们的服务器</span>
            <span class="line"></span>
            <span class="english-inf">Why choose our server?</span>
        </div>
        <div class="town-show-scroll">
            <el-carousel :height="20 + 'rem'">
                <el-carousel-item v-for="(item,index) in testPicture" :key="index">
                    <img :src="item.image"/>
                </el-carousel-item>
            </el-carousel>
        </div>
        <footer-bottom></footer-bottom>
    </div>
</template>
<script>
import FooterBottom from '../components/footerBottom.vue'
export default {
    components:{
        FooterBottom
    },
    data(){
        return{
            indexImage: require('@/icon/index/townIndex1.png'),
            testPicture:[
                {
                    id: 0,
                    image: require('@/icon/index/townIndex1.png')
                },
                {
                    id: 1,
                    image: require('@/icon/index/townIndex2.png')
                },
                {
                    id: 2,
                    image: require('@/icon/index/townIndex3.png')
                },
                {
                    id: 3,
                    image: require('@/icon/index/townIndex4.png')
                }
            ]
        }   
    },
    created(){

    },
    mounted(){
    },
    methods:{

    }
}
</script>
<style lang="scss" scoped>
.index-div
{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: wrap;
    position: relative;
    .index-center-show
    {
        width: 100%;
        height: 30rem;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        .back-iamge
        {
            width: 100%;
            height: 100%;
            position: absolute;
            z-index: 1;
            object-fit: cover;
            filter: brightness(80%)
        }
        .center-text
        {
            padding: 2rem 3rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
            z-index: 10;
            border-radius: 0.2rem;
            .welcome-tips
            {
                font-size: 1.2rem;
                color: #ffffff;
                letter-spacing: 0.3rem;
            }
            h2
            {
                margin: 0;
                padding: 1rem 0;
                font-size: 2.2rem;
                color: #ffffff;
                font-weight: 400;
                letter-spacing: 0.3rem;
            }
            .describe
            {
                display: flex;
                flex-direction: column;
                align-items: center;
                span
                {
                    font-size: 0.9rem;
                    color: #e7e7e7;
                }
            }
        }
    }
    .index-describe
    {
        width: 100%;
        padding: 2rem 0 2rem 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        .why-inf
        {
            font-size: 1rem;
            letter-spacing: 0.2rem;
        }
        .line
        {
            width: 16rem;
            height: 0.1rem;
            margin: 1rem 0 1rem 0;
            background-color: #707070;
        }
        .english-inf
        {
            font-size: 0.8rem;
            word-break: break-all;
            letter-spacing: 0.1rem;
        }
    }
    .town-show-scroll
    {
        width: 100%;
        position: relative;
        img
        {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
}
</style>