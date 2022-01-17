<template>
    <div class="rule-box" :style="{backgroundImage:`url(${this.$store.getters.indexBgGet})`}">
        <div class="center-box render-by-edit" v-html="ruleText">

        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            ruleText: ''
        }
    }
}
</script>
<style lang="scss" scoped>
.rule-box
{
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-content: flex-start;
    flex-wrap: wrap;
    background-repeat: no-repeat;
    background-position: top;
    background-attachment: fixed;
    background-size: cover;
    .center-box
    {
        background-color: rgba(240,240,240,0.6);
        margin-top: 2rem;
        padding: 1rem;
        border-radius: 0.3rem;
    }
}
@media screen and (min-width:1400px)
{
    .rule-box
    {
        .center-box
        {
            width: 70%;
        }
    }
}
@media screen and (max-width:1400px) and (min-width:1200px)
{
    .rule-box
    {
        .center-box
        {
            width: 70%;
        }
    }
}
@media screen and (max-width:1200px) and (min-width:936px)
{
    .rule-box
    {
        .center-box
        {
            width: 65%;
        }
    }
}
@media screen and (max-width:936px) and (min-width:767px)
{
    .rule-box
    {
        .center-box
        {
            width: 90%;
        }
    }
}
@media screen and (max-width:767px) and (min-width:676px)
{
    .rule-box
    {
        .center-box
        {
            width: 90%;
        }
    }
}
@media screen and (max-width:676px)
{
    .rule-box
    {
        .center-box
        {
            width: 90%;
        }
    }
}
</style>