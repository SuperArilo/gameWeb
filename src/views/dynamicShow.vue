<template>
    <div class="content-box">
        <div class="top-menu">
            <el-dropdown split-button type="primary" class="dropdown-menu">
                {{dropdownMenuTitle}}
                <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item v-for="(item,index) in dropdownMenu" :key="index" @click="dropdownMenuFunc(item.id,item.title)">{{item.title}}</el-dropdown-item>
                </el-dropdown-menu>
                </template>
            </el-dropdown>
            <div class="refresh"></div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            dropdownMenuTitle: '最新',
            dropdownMenu:[
                {
                    id: 0,
                    title: '最新'
                },
                {
                    id: 0,
                    title: '热门'
                },
                {
                    id: 0,
                    title: '发布时间倒序'
                },
                {
                    id: 0,
                    title: '发布时间正序'
                }
            ]
        }
    },
    methods:{
        dropdownMenuFunc(id,title){
            this.dropdownMenuTitle = title
        }
    }
}
</script>
<style lang="scss" scoped>
.content-box
{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: wrap;
    align-content: flex-start;
    .top-menu
    {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        background-color: #ffffff;
        padding: 0.3rem 0.5rem;
        :deep(.el-dropdown , .el-scrollbar span)
        {
            font-size: 0.6rem;
        }
        .dropdown-menu
        {
            height: 1.5rem;
        }
        .refresh
        {
            width: 1.5rem;
            height: 1.5rem;
            background-color: orangered;
        }
    }
}
</style>