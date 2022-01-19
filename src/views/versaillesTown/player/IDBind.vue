<template>
    <div class="id-bind">
        <div class="center-content">
            <div class="public-title">
                <span>当前状态</span>
                <i class="fas fa-archive"/>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    created(){
        this.mojangApi(this.$store.getters.userInfoGet.javaMcId)
    },
    methods:{
        async mojangApi(userName,UUID){
            this.$axios.get('https://api.ashcon.app/mojang/v2/user/' + userName).then(resq => {
                console.log(resq)
            }).catch(err => {

            })
        }
    }
}
</script>
<style lang="scss" scoped>
.id-bind
{
    width: 100%;
    display: flex;
    justify-content: center;
    align-content: flex-start;
    flex-wrap: wrap;
    .center-content
    {
        display: flex;
        align-content: flex-start;
        justify-content: center;
        flex-wrap: wrap;
        margin: 1rem 0;
        .public-title
        {
            width: 100%;
            height: 1.5rem;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            span, i
            {
                height: 100%;
                display: flex;
                align-items: center;
            }
            span
            {
                font-size: 0.75rem;
                font-weight: bold;
                letter-spacing: 0.03rem;
            }
            i
            {
                font-size: 0.8rem;
                margin-left: 0.5rem;
            }
        }
        .now-state
        {
            width: 100%;
        }
        .line
        {
            width: 100%;
            height: 0.03rem;
            background-color: rgba(68, 68, 68, 0.473);
            margin: 1rem 0;
        }
    }
}
@media screen and (min-width:1400px)
{
    .id-bind
    {
        .center-content
        {
            width: 70%;
        }
    }
}
@media screen and (max-width:1400px) and (min-width:1200px)
{
    .id-bind
    {
        .center-content
        {
            width: 70%;
        }
    }
}
@media screen and (max-width:1200px) and (min-width:936px)
{
    .id-bind
    {
        .center-content
        {
            width: 65%;
        }
    }
}
@media screen and (max-width:936px) and (min-width:767px)
{
    .id-bind
    {
        .center-content
        {
            width: 90%;
        }
    }
}
@media screen and (max-width:767px) and (min-width:676px)
{
    .id-bind
    {
        .center-content
        {
            width: 90%;
        }
    }
}
@media screen and (max-width:676px)
{
    .notice-box
    {
        .center-content
        {
            width: 90%;
        }
    }
}
</style>