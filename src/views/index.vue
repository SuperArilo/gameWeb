<template>
    <div class="index-box">
        <div class="top-center-box">
            <div class="center-head">
                <img :src="userHead"/>
            </div>
            <span class="center-title-span">这次换你听歌の博客</span>
        </div>
        <div class="center-content-box"></div>
    </div>
</template>
<script>
export default {
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
    align-items: flex-start;
    flex-wrap: wrap;
    align-content: flex-start;
    .top-center-box
    {
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        align-content: center;
        .center-head
        {
            width: 100%;
            height: auto;
            display: flex;
            justify-content: center;
            align-items: center;
            img
            {
                border-radius: 50%;
                max-height: 5rem;
            }
        }
        .center-title-span
        {
            width: auto;
            height: auto;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            padding: 0.5rem 0.8rem 0.5rem 0.8rem;
            border: solid 1px white;
            margin-top: 4rem;
            font-size: 1.5rem;
        }
    }
    .center-content-box
    {
        width: 100%;
        height: 10rem;
        background-color: rgba(255, 255, 255, 0.25);
    }
}
</style>