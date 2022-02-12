<template>
    <div class="user-head-and-edit">
        <div class="user-data-show" v-if="!this.$store.getters.isPhoneGet">
            <div class="user-head">
                <img :src="this.$store.getters.userInfoGet.userhead"/>
            </div>
            <span class="user-name">{{this.$store.getters.userInfoGet.username}}</span>
            <span class="user-class" :style="{backgroundColor: this.$store.getters.userInfoGet.classColor}">{{this.$store.getters.userInfoGet.className}}</span>
        </div>
        <div class="dynamic-detail-comment-box" :style="!this.$store.getters.isPhoneGet ? 'margin-left: 0.5rem;':''">
            <div class="head-write-box">
                <div class="render-edit" ref="dyEditTool"></div>
            </div>
            <div class="dy-buttom">
                <div class="buttom-file" @click="openFile">
                    <span>媒体管理器</span>
                </div>
                <div class="button-confirm" @click="sentToServer">
                    <span v-if="!isSendToServerWorkNow">提交</span>
                    <i v-else class="fas fa-circle-notch fa-spin"/>
                </div>
            </div>
            <el-dialog v-model="dialogVisible" :lock-scroll="false" :close-on-click-modal="false" :close-on-press-escape="false">
                <media-file v-if="dialogVisible" @closeWindow="closeWindow" @imageIntoEdit="imageIntoEdit"/>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import { ElMessage  } from 'element-plus'
import { dynamicCommentSet } from '@/util/api.js'
import mediaFile from '@/components/dynamic/mediaFile.vue'
export default {
    components:{
        mediaFile
    },
    props:{
        modelValue: [String,Number,Boolean],
        fatherId:{
            type: Number,
            default: null,
            required: false
        }
    },
    data(){
        return{
            editor: null,
            dialogVisible: false,
            dyContent: '',
            isSendToServerWorkNow: false,
        }
    },
    mounted(){
        const editor = new wangEditor(this.$refs.dyEditTool)
        editor.config.showLinkImg = false
        editor.config.focus = false
        editor.config.menus = [
            'head',
            'bold',
            'fontSize',
            'italic',
            'underline',
            'strikeThrough',
            'indent',
            'lineHeight',
            'foreColor',
            'backColor',
            'link',
            'list',
            'justify',
            'quote',
            'emoticon',
            'table',
            'splitLine',
            'image',
        ]
        editor.config.onchange = (newHtml) => {
            this.dyContent = newHtml
        }
        editor.create()
        this.editor = editor
    },
    methods:{
        closeWindow(value){
            this.dialogVisible = value
        },
        imageIntoEdit(value){
            this.dialogVisible = false
            value.forEach(key => {
                this.editor.cmd.do('insertHTML', '<img src="' + key.url + '" width="100" "/>')
            })
        },
        openFile(){
            this.dialogVisible = true
        },
        sentToServer(){
            if(!this.isSendToServerWorkNow){
                this.isSendToServerWorkNow = true
                    dynamicCommentSet({commentContent: this.dyContent ,commentParentId: this.fatherId},this.modelValue).then(resq => {
                    if(resq.flag){
                        this.$emit('commentStatus', true)
                        this.editor.txt.clear()
                        this.isSendToServerWorkNow = false
                        ElMessage({message: resq.message,type: 'success'})
                    } else {
                        ElMessage.error('提交评论发生错误！' + resq.message)
                        this.isSendToServerWorkNow = false
                    }
                }).catch(err => {
                    ElMessage.error('提交评论发生错误！' + err)
                    this.isSendToServerWorkNow = false
                })
            }
        },
    },
    unmounted() {
        setTimeout(() => {
            this.editor.destroy()
            this.editor = null
        },2000)
    }
}
</script>
<style lang="scss" scoped>
.user-head-and-edit
{
    width: 100%;
    display: flex;
    justify-content: space-between;
    .user-data-show
    {
        display: flex;
        justify-content: center;
        align-content: flex-start;
        flex-wrap: wrap;
        .user-head
        {
            height: 3.5rem;
            min-height: 3.5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            border-radius: 50%;
            box-shadow: 0 0 0.1rem black;
            img
            {
                height: 100%;
                max-height: 100%;
            }
        }
        .user-name
        {
            width: 100%;
            display: flex;
            justify-content: center;
            text-align: center;
            word-break: break-all;
            font-size: 0.6rem;
            color: #2c2c2c;
            margin: 0.3rem 0;
        }
        .user-class
        {
            padding: 0.15rem 0.4rem;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 0.52rem;
            border-radius: 0.2rem;
            color: #ffffff;
        }
    }
    .dynamic-detail-comment-box
    {
        width: 100%;
        display: flex;
        align-content: flex-start;
        flex-wrap: wrap;
        .head-write-box
        {
            width: 100%;
            .render-edit
            {
                width: 100%;
            }
            ::v-deep(.w-e-toolbar)
            {
                border-radius: 0.2rem 0.2rem 0 0;
                z-index: 400 !important;
            }
            ::v-deep(.w-e-text-container)
            {
                border-radius: 0 0 0.2rem 0.2rem;
                z-index: 399 !important;
            }
            ::v-deep(i)
            {
                font-size: 0.6rem !important;
            }
            ::v-deep(.w-e-menu-tooltip)
            {
                font-size: 0.6rem;
            }
            ::v-deep(.w-e-up-btn)
            {
                width: 100%;
            }
        }
        .dy-buttom
        {
            width: 100%;
            margin-top: 0.5rem;
            display: flex;
            justify-content: space-between;
            span
            {
                font-size: 0.6rem;
            }
            .buttom-file , .button-confirm
            {
                width: 4rem;
                height: 1.5rem;
                display: flex;
                justify-content: center;
                align-items: center;
                transition: all 0.3s;
                transition: all 0.3s;
                border-radius: 0.2rem;
                cursor: pointer;
                i
                {
                    height: 100%;
                    display: flex;
                    align-items: center;
                    font-size: 0.8rem;
                }
            }
            .buttom-file
            {
                background-color: #8db0b9;
                color: #ffffff;
                border: solid 0.05rem #6c888f;
            }
            .buttom-file:hover
            {
                background-color: #407e8d;
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
        ::v-deep(.el-dialog__body)
        {
            padding: 0;
        }
        ::v-deep(.el-dialog__header)
        {
            display: none;
        }
    }
}
@media screen and (min-width:1400px)
{
    .user-head-and-edit
    {
        .user-data-show
        {
            width: 7rem;
        }
    }
    ::v-deep(.el-dialog)
    {
        width: 50%;
    }
}
@media screen and (max-width:1400px) and (min-width:1200px)
{
    .user-head-and-edit
    {
        .user-data-show
        {
            width: 6.5rem;
        }
    }
    ::v-deep(.el-dialog)
    {
        width: 50%;
    }
}
@media screen and (max-width:1200px) and (min-width:936px)
{
    .user-head-and-edit
    {
        .user-data-show
        {
            width: 6rem;
        }
    }
    ::v-deep(.el-dialog)
    {
        width: 50%;
    }
}
@media screen and (max-width:936px) and (min-width:767px)
{
    ::v-deep(.el-dialog)
    {
        width: 80%;
    }
}
@media screen and (max-width:767px) and (min-width:676px)
{
    ::v-deep(.el-dialog)
    {
        width: 85%;
    }
}
@media screen and (max-width:676px)
{
    ::v-deep(.el-dialog)
    {
        width: 90%;
    }
}
</style>