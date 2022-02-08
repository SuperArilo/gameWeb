<template>
    <div class="drop-menu">
        <span class="move-span" :class="[{'span-style-actie' : spanStyleAdd},{'span-move-active' : spanStyleAdd || showValue !== ''}]">{{this.title}}</span>
        <div class="show-menu-and-value" @click="spanStyleAdd = true" @mouseleave="spanStyleAdd = false" :style="showValue === '' ? 'background-color: transparent;':''">
            <span class="show-span">{{showValue}}</span>
            <el-collapse-transition>
                <div class="show-menu" v-if="spanStyleAdd">
                    <span class="sub-item" v-for="(item,index) in this.menuList" :key="index" @click="userStateSetFunc(item,index)" :class="[{'sub-item-active' : index === menuIndex}]">{{item}}</span>
                </div>
            </el-collapse-transition>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            spanStyleAdd: false,
            showValue: '',
            menuIndex: ''
        }
    },
    props:{
        title: [String],
        menuList:[Array],
        modelValue:[String,Number,Boolean]
    },
    methods:{
        userStateSetFunc(title,index){
            this.showValue = title
            this.menuIndex = index
        }
    }
}
</script>
<style lang="scss" scoped>
.drop-menu
{
    width: 7rem;
    height: 2.4rem;
    display: flex;
    position: relative;
    align-items: flex-end;
    flex-wrap: wrap;
    justify-content: flex-start;
    .move-span
    {
        width: 100%;
        height: 1.2rem;
        margin-left: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        transition: all 0.4s;
        color: darkgray;
        position: absolute;
        bottom: 0;
        font-size: 0.55rem;
    }
    .show-menu-and-value
    {
        width: 100%;
        height: 1.2rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 0 0.5rem;
        border: solid 0.05rem darkgray;
        cursor: pointer;
        border-radius: 0.1rem;
        position: relative;
        .show-span
        {
            height: 100%;
            font-size: 0.52rem;
            display: flex;
            align-items: center;
        }
        .show-menu
        {
            width: 100%;
            display: flex;
            align-content: flex-start;
            flex-wrap: wrap;
            position: absolute;
            left: 0;
            top: 1.2rem;
            background-color: #ffffff;
            box-shadow: 0 0 0.1rem rgb(99, 99, 99);
            border-radius: 0 0 0.1rem 0.1rem;
            overflow: hidden;
            .sub-item
            {
                width: 100%;
                height: 1.5rem;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                font-size: 0.52rem;
                margin: 0;
                transition: all 0.3s;
                padding: 0 0.5rem;
            }
            .sub-item:hover
            {
                background-color: rgb(245, 245, 245);
            }
            .sub-item-active
            {
                background-color: rgb(245, 245, 245);
                color: #2752b1;
                font-weight: bold;
            }
        }
    }
    .span-style-actie
    {
        color: #3773f3;
        font-size: 0.55rem;
    }
    .span-move-active
    {
        margin: 1.2rem 0;
    }
}
</style>