<template>
    <div class="div-loading">
        <span>加载中...</span>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
.div-loading
{
    width: 9.6rem;
    height: 7.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url("../icon/index/loading.gif");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    border-radius: 1rem;
    span
    {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        margin-top: -1.3rem;
        font-size: 0.8rem;
        letter-spacing: 0.2rem;
        color: rgb(116, 116, 116);
    }
}
</style>