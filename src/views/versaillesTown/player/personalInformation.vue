<template>
    <div class="personal-box">personal information</div>
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
    height: 10rem;
    background-color: cornflowerblue;
}
</style>