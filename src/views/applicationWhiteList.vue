<template>
    <div class="rule-box" :style="{backgroundImage:`url(${this.$store.getters.indexBgGet})`}">
        <div class="center-box">
            <div class="show-center-title">
                <span>白名单申请</span>
                <span>您可以在这里申请白名单，请详细阅读服务器公约</span>
            </div>
            <div class="show-rule-content">
                
            </div>
            <div class="user-input-box">
                <div class="title">
                    <span>MCID绑定输入</span>
                    <i class="fas fa-archive"/>
                </div>
                <input-box class="input-sub-item" v-model="McJavaId" title="MC Java Id" :length="16" inputType="text"/>
                <div class="button-box">
                    <div class="button-confirm" @click="sendToServerConfirm">
                        <span v-if="!sendToServerWorkNow">确认</span>
                        <i v-if="sendToServerWorkNow" class="fas fa-circle-notch fa-spin"/>
                    </div>
                </div>
            </div>
        </div>
        <footer-bottom/>
    </div>
</template>
<script>
import inputBox from '@/components/inputBox.vue'
import footerBottom from '@/components/footerBottom.vue'
import { ElMessage , ElMessageBox } from 'element-plus'
export default {
    components: { footerBottom , inputBox },
    data(){
        return{
            McJavaId: '',
            spanStyleAdd: null,
            sendToServerWorkNow: false,
        }
    },
    methods:{
        sendToServerConfirm(){
            if(!this.sendToServerWorkNow){
                this.sendToServerWorkNow = true
                if(this.McJavaId !== ''){
                    setTimeout(() => {
                        this.sendToServerWorkNow = false
                    },3000)
                } else {
                    ElMessage({message: '填写的信息有空白，请检查！',type: 'warning'})
                    this.sendToServerWorkNow = false
                }
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.rule-box
{
    width: 100%;
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
        .show-center-title
        {
            width: 100%;
            height: 8rem;
            display: flex;
            justify-content: center;
            align-items: center;
            align-content: center;
            flex-wrap: wrap;
            span
            {
                width: 100%;
                text-align: center;
                display: flex;
                justify-content: center;
                color: white;
                letter-spacing: 0.1rem;
            }
            span:nth-child(1)
            {
                font-size: 1.4rem;
            }
            span:nth-child(2)
            {
                font-size: 0.65rem;
                margin-top: 0.5rem;
            }
        }
        .show-rule-content
        {
            width: 100%;
            height: 20rem;
            margin-top: 1rem;
            padding: 0.5rem;
            background-color: rgba(255, 255, 255, 0.3);
        }
        .user-input-box
        {
            width: 100%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            align-content: center;
            flex-wrap: wrap;
            background-color: #ffffff;
            padding: 1rem;
            .title
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
            .button-box
            {
                width: 100%;
                display: flex;
                justify-content: flex-start;
                flex-wrap: wrap;
                margin-top: 1rem;
                padding: 0 0.5rem;
                .button-confirm
                {
                    width: 4rem;
                    height: 1.5rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: #b3d8ff;
                    color: #3399ff;
                    border: solid 0.05rem #409eff;
                    border-radius: 0.2rem;
                    transition: all 0.3s;
                    cursor: pointer;
                    span , i
                    {
                        height: 100%;
                        display: flex;
                        align-items: center;
                    }
                    span
                    {
                        font-size: 0.6rem;
                    }
                    i
                    {
                        font-size: 0.8rem;
                    }
                }
                .button-confirm:hover
                {
                    color: white;
                    background-color: #409eff;
                }
            }
        }
    }
}
@media screen and (min-width:1400px)
{
    .rule-box
    {
        .center-box
        {
            width: 50%;
            margin: 2rem 0;
        }
    }
}
@media screen and (max-width:1400px) and (min-width:1200px)
{
    .rule-box
    {
        .center-box
        {
            width: 60%;
            margin: 2rem 0;
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
            margin: 2rem 0;
        }
    }
}
@media screen and (max-width:936px) and (min-width:767px)
{
    .rule-box
    {
        .center-box
        {
            width: 100%;
        }
    }
}
@media screen and (max-width:767px) and (min-width:676px)
{
    .rule-box
    {
        .center-box
        {
            width: 100%;
        }
    }
}
@media screen and (max-width:676px)
{
    .rule-box
    {
        .center-box
        {
            width: 100%;
        }
    }
}
</style>