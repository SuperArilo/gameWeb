<template>
    <div class="index-box" :style="{backgroundImage:`url(${indexBg})`}">
        <div class="show-center">
            <img :src="userHead" class="head"/>
            <span class="v-line"></span>
            <div class="content-show">
                <h2>这次换你听歌の博客</h2>
                <span class="intor">这是简介</span>
            </div>
            <span class="v-line"></span>
            <div class="center-menu">
                <span>简介</span>
                <span>工作</span>
                <span>关于我</span>
                <span>联系方式</span>
            </div>
        </div>
        <footer-bottom></footer-bottom>
    </div>
</template>
<script>
import footerBottom from '@/components/footerBottom.vue'
export default {
  components: { footerBottom },
    data(){
        return{
            indexBg: require('@/icon/index/index_center.jpg'),
            userHead: require('@/icon/head/UserHead.png'),
            value:''
        }
    },
    mounted(){
        // document.getElementById('index_box').setAttribute('style', 'background-repeat:no-repeat;background-size:100%; background-image:url("' + this.indexBg + '") ')
    },
    methods:{
    }
}
</script>
<style lang="scss" scoped>
*
{
    box-sizing: border-box;
}
.index-box
{
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    background-repeat: no-repeat;
    background-position: top;
    background-attachment: fixed;
    background-size: cover;
    .show-center
    {
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .head
        {
            width: 5rem;
            height: 5rem;
            border-radius: 50%;
            border: solid 0.05rem #ffffff;
        }
        .v-line
        {
            width: 0.05rem;
            height: 2.5rem;
            background-color: #ffffff;
        }
        .content-show
        {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            border-top: solid 0.05rem #ffffff;
            border-bottom: solid 0.05rem #ffffff;
            padding: 1rem 0 1rem 0;
            min-height: 8rem;
            h2
            {
                margin: 0;
                color: #000000c9;
                padding: 0.1rem 0.3rem;
            }
            .intor
            {
                width: 80%;
                display: flex;
                justify-content: center;
                align-items: flex-start;
                font-size: 0.65rem;
                letter-spacing: 0.08rem;
                color: #000000c5;
                margin-top: 0.5rem;
            }
        }
        .center-menu
        {
            display: flex;
            span
            {
                width: 6rem;
                height: 2rem;
                display: flex;
                justify-content: center;
                align-items: center;
                border: solid 0.05rem #ffffff;
                color: white;
                font-size: 0.7rem;
                cursor: pointer;
                transition: all 0.3s;
            }
            span:hover
            {
                background-color: rgba(0,0,0,0.2);
            }
        }
    }
}
@media screen and (min-width:1400px)
{
    .index-box
    {
        .show-center
        {
            width: 50%;
            .center-menu
            {
                justify-content: center;
                span:nth-child(n+2)
                {
                    margin-left: -0.05rem;
                }
                span:first-child
                {
                    border-radius: 0.2rem 0 0 0.2rem;
                }
                span:last-child
                {
                    border-radius: 0 0.2rem 0.2rem 0;
                }
            }
        }
    }
}
@media screen and (max-width:1400px) and (min-width:1200px)
{
    .index-box
    {
        .show-center
        {
            width: 50%;
            .center-menu
            {
                justify-content: center;
                span:nth-child(n+2)
                {
                    margin-left: -0.05rem;
                }
                span:first-child
                {
                    border-radius: 0.2rem 0 0 0.2rem;
                }
                span:last-child
                {
                    border-radius: 0 0.2rem 0.2rem 0;
                }
            }
        }
    }
}
@media screen and (max-width:1200px) and (min-width:936px)
{
    .index-box
    {
        .show-center
        {
            width: 50%;
            .center-menu
            {
                justify-content: center;
                span:nth-child(n+2)
                {
                    margin-left: -0.05rem;
                }
                span:first-child
                {
                    border-radius: 0.2rem 0 0 0.2rem;
                }
                span:last-child
                {
                    border-radius: 0 0.2rem 0.2rem 0;
                }
            }
        }
    }
}
@media screen and (max-width:936px) and (min-width:767px)
{
    .index-box
    {
        .show-center
        {
            width: 80%;
            .center-menu
            {
                flex-direction: column;
                align-items: center;
                span:nth-child(n+2)
                {
                    margin-top: -0.05rem;
                }
                span:first-child
                {
                    border-radius: 0.2rem 0 0 0.2rem;
                }
                span:last-child
                {
                    border-radius: 0 0.2rem 0.2rem 0;
                }
            }
        }
    }
}
@media screen and (max-width:767px) and (min-width:676px)
{
    .index-box
    {
        .show-center
        {
            width: 80%;
            .center-menu
            {
                flex-direction: column;
                align-items: center;
                span:nth-child(n+2)
                {
                    margin-top: -0.05rem;
                }
                span:first-child
                {
                    border-radius: 0.2rem 0.2rem 0 0;
                }
                span:last-child
                {
                    border-radius: 0 0 0.2rem 0.2rem;
                }
            }
        }
    }
}
@media screen and (max-width:676px)
{
    .index-box
    {
        .show-center
        {
            width: 80%;
            .center-menu
            {
                flex-direction: column;
                align-items: center;
                span:nth-child(n+2)
                {
                    margin-top: -0.05rem;
                }
                span:first-child
                {
                    border-radius: 0.2rem 0.2rem 0 0;
                }
                span:last-child
                {
                    border-radius: 0 0 0.2rem 0.2rem;
                }
            }
        }
    }
}
</style>