<template>
    <div class="init-box">
        <div class="comment">
            <div class="set-comment">
                <el-page-header title="返回" @back="backTo"></el-page-header>
                <textarea placeholder="写下你的评论吧！"></textarea>
                <div class="bottom-div">
                    <span class="button-clear">清空</span>
                    <span class="button-confirm">评论</span>
                </div>
            </div>
            <div class="comment-all-get">
                <el-timeline>
                    <transition-group name="list-complete">
                        <el-timeline-item timestamp="2018/4/12" placement="top" v-for="(item,index) in count" :key="index">
                            <div class="sub-div">
                                <img class="left-user-head" :src="userDynamic"/>
                                <div class="right-content">
                                    <div class="user-name-and-time">
                                        <span class="user-name">SuperArilo</span>
                                        <span class="before-time">3天前</span>
                                    </div>
                                    
                                    <span class="show-content">这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容</span>
                                    <div class="data-show">
                                        <div>
                                            <img :src="thumbs"/>
                                            <span>11</span>
                                        </div>
                                        <div>
                                            <img :src="step"/>
                                            <span>11</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-timeline-item>
                    </transition-group>
                </el-timeline>
                <transition name="loading_animate">
                    <loading v-show="showLoading"></loading>
                </transition>
            </div>
        </div>
    </div>
</template>
<script>
import loading from '@/components/loading.vue'
export default {
    components:{
        loading
    },
    data(){
        return{
            showLoading: false,
            isCountToPage: true,
            userDynamic: require('@/icon/head/stranger1.jpg'),
            thumbs: require('@/icon/index/thumbs.png'),
            thumbsActive: require('@/icon/index/thumbsActive.png'),
            step: require('@/icon/index/step.png'),
            stepActive: require('@/icon/index/stepActive.png'),
            count: 4,
        }
    },
    methods:{
        backTo(){
            this.$router.push('/dynamic')
        }
    },
    computed:{
        scrollHeight(){
            return this.$store.getters.windowScrollValueGet
        }
    },
    watch:{
        scrollHeight(n,o){
            if(n + document.body.clientHeight >= document.body.scrollHeight && this.isCountToPage){
                this.showLoading = true
                setTimeout(() =>{
                    this.showLoading = false
                    this.count = this.count + 3
                },2000)
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.init-box
{
    width: 100%;
    display: flex;
    justify-content: center;
    .comment
    {
        display: flex;
        border-radius: 0.3rem;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-wrap: wrap;
        align-content: flex-start;
        transition: all 0.3s;
        .set-comment
        {
            width: 100%;
            height: auto;
            background-color: white;
            border-radius: 0.2rem;
            padding: 0.5rem;
            textarea
            {
                outline: none;
                resize: none;
                width: 100%;
                height: 4rem;
                letter-spacing: 0.06rem;
                font-size: 0.65rem;
                font-family: Microsoft YaHei;
                line-height: 1.1rem;
                border: none;
                background-color: rgb(243, 243, 243);
                border-radius: 0.3rem;
                margin-top: 0.5rem;
            }
            .bottom-div
            {
                width: 100%;
                height: 2rem;
                display: flex;
                justify-content: flex-end;
                align-items: center;
                span
                {
                    width: 4rem;
                    height: 1.8rem;
                    margin-right: 1rem;
                    font-size: 0.65rem;
                    letter-spacing: 0.08rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 0.5rem;
                    cursor: pointer;
                    transition: all 0.3s;
                }
                .button-clear
                {
                    background-color: #fdf6ec;
                    color:  #e6a23c;
                    border: solid 0.05rem #f5dab1;
                }
                .button-clear:hover
                {
                    color: white;
                    background-color:  #e6a23c;
                }
                .button-confirm
                {
                    background-color: #b3d8ff;
                    color: #3399ff;
                    border: solid 0.05rem #409eff;
                }
                .button-confirm:hover
                {
                    color: white;
                    background-color: #409eff;
                }
            }
        }
        .comment-all-get
        {
            width: 100%;
            margin-top: 2rem;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            flex-wrap: wrap;
            align-content: flex-start;
            :deep(.el-timeline)
            {
                padding-left: 0;
            }
            .sub-div
            {
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: flex-start;
                align-content: flex-start;
                background-color: white;
                padding: 0.5rem 1rem 0.5rem 1rem;
                border-radius: 0.3rem;
                .left-user-head
                {
                    width: 2.5rem;
                    height: 2.5rem;
                    max-width: 2.5rem;
                    border-radius: 50%;
                    box-shadow: 0 0 0.1rem black;
                }
                .right-content
                {
                    width: 100%;
                    height: auto;
                    display: flex;
                    flex-direction: column;
                    padding-left: 1rem;
                    .user-name-and-time
                    {
                        height: 1.5rem;
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        span
                        {
                            height: 100%;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            letter-spacing: 0.02rem;
                        }
                        .user-name
                        {
                            font-size: 0.6rem;
                            font-weight: 600;
                        }
                        .before-time
                        {
                            color: #667c99;
                            margin-left: 1rem;
                            font-size: 0.5rem;
                        }
                    }
                    .show-content
                    {
                        font-size: 0.6rem;
                        white-space:normal;
                        word-break:break-all;
                        word-wrap:break-word;
                        letter-spacing: 0.02rem;
                        color: rgb(15, 15, 15);
                        line-height: 1.1rem;
                    }
                    .data-show
                    {
                        width: 100%;
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        margin-top: 0.5rem;
                        div
                        {
                            height: 1rem;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            margin-right: 0.5rem;
                            img
                            {
                                width: 1rem;
                                height: 1rem;
                                max-width: 1rem;
                                cursor: pointer;
                            }
                            span
                            {
                                height: 100%;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                margin: 0 0.3rem 0 0.3rem;
                            }
                        }
                    }
                }
            }
            .loading_animate-enter-active
            {
                transition-delay: 0.4s !important;
                animation: flipInX 0.4s;
            }
            .loading_animate-leave-active
            {
                animation: flipOutY 0.4s;
            }
            .list-complete-enter-active
            {
                transition-delay: 0.6s !important;
                animation: bounceIn 0.6s;
            }
            .list-complete-leave-active
            {
                animation: bounceOut 0.6s;
            }
        }
    }
}
@media screen and (min-width:1400px)
{
    .init-box .comment
    {
        width: 40rem;
    }
}
@media screen and (max-width:1400px) and (min-width:1200px)
{
    .init-box .comment
    {
        width: 35rem;
    }
}
@media screen and (max-width:1200px) and (min-width:936px)
{
    .init-box .comment
    {
        width: 30rem;
    }
}
@media screen and (max-width:936px) and (min-width:767px)
{
    .init-box .comment
    {
        width: 80%;
    }
}
@media screen and (max-width:767px) and (min-width:676px)
{
    .init-box .comment
    {
        width: 80%;
    }
}
@media screen and (max-width:676px)
{
    .init-box .comment
    {
        width: 80%;
    }
}
</style>