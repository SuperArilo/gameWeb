<template>
    <div class="personal-box">
        <div class="main-box">
            <div class="title-content">
                <span>个性设置</span>
                <i class="fas fa-feather-alt"/>
            </div>
        </div>
    </div>
</template>
<script>
import { onMounted } from 'vue'
export default {
    mounted(){
        console.log(1)
    },
    setup(){
        onMounted(() => {
            console.log('Component is mounted!')
        })
    }
}
</script>
<style lang="scss" scoped>
.personal-box
{
    width: 100%;
    display: flex;
    align-content: flex-start;
    flex-wrap: wrap;
    .main-box
    {
        width: 100%;
        display: flex;
        align-content: flex-start;
        flex-wrap: wrap;
        .title-content
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
        .line
        {
            width: 100%;
            height: 0.03rem;
            background-color: rgba(68, 68, 68, 0.473);
            margin: 0.3rem 0;
        }
    }
}
</style>