<template>
    <div class="id-bind">
        <div class="center-content">
            <div class="public-title">
                <span>当前状态</span>
                <i class="fas fa-archive"/>
            </div>
            <div class="now-status">
                <div class="player-now-status">
                    <div class="name-show">
                        <span>MC Java ID</span>
                    </div>
                    <div class="name-show">
                        <span>预览头像</span>
                    </div>
                    <div class="name-show">
                        <span>预览皮肤</span>
                    </div>
                </div>
                <div class="player-now-status">
                    <div class="play-id-name">
                        <span>{{this.$store.getters.userInfoGet.javaMcId}}</span>
                    </div>
                    <div class="play-head">
                        <img :src="playerHead"/>
                    </div>
                    <div class="play-skin">
                        <img :src="playerSkin"/>
                    </div>
                </div>
                <span class="button" @click="unbind">解除绑定</span>
            </div>
            <div class="public-title">
                <span>自助修改</span>
                <i class="fas fa-diagnoses"/>
            </div>
        </div>
        <footer-bottom/>
    </div>
</template>
<script>
import footerBottom from '@/components/footerBottom.vue'
import { ElMessageBox, ElMessage } from 'element-plus'
export default {
    components:{
        footerBottom
    },
    data(){
        return{
            playerHead: '',
            playerSkin: ''
        }
    },
    created(){
        this.mojangApi(this.$store.getters.userInfoGet.javaMcId)
    },
    methods:{
        async mojangApi(userName,UUID){
            this.$axios.get('https://api.ashcon.app/mojang/v2/user/' + userName).then(resq => {
                if(resq.status === 200){
                    this.getAvatars(resq.data.uuid)
                    this.getBodyRenders(resq.data.uuid)
                } else {
                    ElMessage.error('获取玩家的信息出错,请稍后重试! ' + resq.statusText)
                }
            }).catch(err => {
                ElMessage.error('获取玩家的信息出错,请稍后重试! ' + err)
            })
        },
        arrayBufferToBase64(Buffer){
            let binary = ''
            let bytes = new Uint8Array(Buffer)
            let len = bytes.byteLength
            for (let i = 0; i < len; i++) {
                binary += String.fromCharCode(bytes[i]);
            }
            return 'data:image/png;base64,' + window.btoa(binary)
        },
        getAvatars(uuid){
            this.$axios.get('https://crafatar.com/avatars/' + uuid , { responseType: 'arraybuffer' }).then(subResq => {
                if(subResq.status === 200){
                    this.playerHead = this.arrayBufferToBase64(subResq.data)
                } else {
                    ElMessage.error('获取玩家的皮肤出错,请稍后重试! ' + subResq.statusText)
                }
            }).catch(subErr => {
                ElMessage.error('获取玩家的皮肤出错,请稍后重试! ' + subErr)
            })
        },
        getBodyRenders(uuid){
            this.$axios.get('https://crafatar.com/renders/body/' + uuid , { responseType: 'arraybuffer' }).then(subResq => {
                if(subResq.status === 200){
                    this.playerSkin = this.arrayBufferToBase64(subResq.data)
                } else {
                    ElMessage.error('获取玩家的皮肤出错,请稍后重试! ' + subResq.statusText)
                }
            }).catch(subErr => {
                ElMessage.error('获取玩家的皮肤出错,请稍后重试! ' + subErr)
            })
        },
        unbind(){
            ElMessageBox.confirm('这将会取消绑定状态，此操作不可撤销！', '提示', {confirmButtonText: '确认', cancelButtonText: '取消', type: 'warning', }).then(() => {
                ElMessage({
                    type: 'success',
                    message: '操作成功',
                })
            }).catch(() => {
                ElMessage({
                    type: 'info',
                    message: '操作取消',
                })
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
        .now-status
        {
            width: 100%;
            display: flex;
            align-content: flex-start;
            justify-content: center;
            flex-wrap: wrap;
            margin: 0.5rem 0;
            .player-now-status
            {
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .name-show
                {
                    width: calc(100% / 3);
                    height: 1.5rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    span
                    {
                        width: 100%;
                        height: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        text-align: center;
                        letter-spacing: 0.05rem;
                        font-size: 0.65rem;
                        color: #676767;
                    }
                }
                .play-id-name
                {
                    width: calc(100% / 3);
                    height: 3rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                    font-size: 0.58rem;
                    letter-spacing: 0.05rem;
                }
                .play-head
                {
                    width: calc(100% / 3);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    img
                    {
                        width: 3rem;
                        height: 3rem;
                        box-shadow: 0 0 0.3rem rgba(0, 0, 0, 0.6);
                    }
                }
                .play-skin
                {
                    width: calc(100% / 3);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    img
                    {
                        width: 3rem;
                        background-color: rgb(224, 224, 224,0.5);
                        border-radius: 0.3rem;
                    }
                }
            }
            .button
            {
                width: 4rem;
                height: 1.5rem;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 0.6rem;
                background-color: #f56c6c;
                color: #ffffff;
                transition: all 0.3s;
                border-radius: 0.3rem;
                cursor: pointer;
                margin-top: 0.5rem;
            }
            .button:hover
            {
                background-color: rgb(247, 137, 137);
            }
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
    .id-bind
    {
        .center-content
        {
            width: 90%;
        }
    }
}
</style>