<template>
    <div class="index-box">
        <div class="show-center"></div>
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
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    .show-center
    {
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
@media screen and (min-width:1400px)
{
    .index-box
    {
        .show-center
        {

        }
    }
}
@media screen and (max-width:1400px) and (min-width:1200px)
{
    .index-box
    {
        .show-center
        {
            
        }
    }
}
@media screen and (max-width:1200px) and (min-width:936px)
{
    .index-box
    {
        .show-center
        {
            
        }
    }
}
@media screen and (max-width:936px) and (min-width:767px)
{
}
@media screen and (max-width:767px) and (min-width:676px)
{
    .index-box
    {
        .show-center
        {
            
        }
    }
}
@media screen and (max-width:676px)
{
    .index-box
    {
        .show-center
        {
            
        }
    }
}
</style>