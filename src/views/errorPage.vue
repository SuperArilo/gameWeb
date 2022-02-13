<template>
    <div class="error-box" :style="{backgroundImage:`url(${this.$store.getters.indexBgGet})`}">
        <div class="center-box">
            <img src="./icon/index/error.jpg"/>
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
}
</script>
<style lang="scss" scoped>
.error-box
{
    width: 100%;
    display: flex;
    justify-content: center;
    align-content: flex-start;
    flex-wrap: wrap;
    background-repeat: no-repeat;
    background-position: top;
    background-size: cover;
    .center-box
    {
        display: flex;
        justify-content: center;
        align-items: center;
        object-fit: cover;
        img
        {
            width: 100%;
        }
    }
}
@media screen and (min-width:1400px)
{
    .error-box .center-box
    {
        width: 50%;
        margin: 3rem 0;
    }
}
@media screen and (max-width:1400px) and (min-width:1200px)
{
    .error-box .center-box
    {
        width: 55%;
        margin: 2.5rem 0;
    }
}
@media screen and (max-width:1200px) and (min-width:936px)
{
    .error-box .center-box
    {
        width: 60%;
        margin: 2rem 0;
    }
}
@media screen and (max-width:936px) and (min-width:767px)
{
    .error-box .center-box
    {
        width: 80%;
    }
}
@media screen and (max-width:767px) and (min-width:676px)
{
    .error-box .center-box
    {
        width: 85%;
    }
}
@media screen and (max-width:676px)
{
    .error-box .center-box
    {
        width: 90%;
    }
}
</style>