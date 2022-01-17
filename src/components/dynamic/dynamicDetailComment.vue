<template>
    <div class="dynamic-detail-comment-box">
        <div class="head-write-box">
            <div class="render-edit" ref="dyEditTool"></div>
        </div>
        <div class="dy-buttom">
            <span class="buttom-file" @click="openFile">媒体管理器</span>
            <span class="button-confirm">提交</span>
        </div>
        <el-dialog v-model="dialogVisible" :lock-scroll="false" :close-on-click-modal="false" :close-on-press-escape="false">
            <media-file v-if="dialogVisible" @closeWindow="closeWindow" @imageIntoEdit="imageIntoEdit"/>
        </el-dialog>
    </div>
</template>
<script>
import E from 'wangeditor'
import mediaFile from '@/components/dynamic/mediaFile.vue'
export default {
    components:{
        mediaFile
    },
    data(){
        return{
            head: require('@/views/icon/head/stranger12.jpg'),
            editor: null,
            dialogVisible: false,
        }
    },
    mounted(){
        const editor = new E(this.$refs.dyEditTool)
        editor.config.showLinkImg = false
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
            'image',
            'table',
            'splitLine',
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
            value.forEach(key =>{
                this.editor.cmd.do('insertHTML', '<img src="' + key.url + '" style="max-width:100%;"/>')
            })
        },
        openFile(){
            this.dialogVisible = true
        }
    },
    beforeDestroy() {
        this.editor.destroy()
        this.editor = null
    }
}
</script>
<style lang="scss" scoped>
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
            z-index: 400 !important;
        }
        ::v-deep(.w-e-text-container)
        {
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
            height: 1.5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 0.6rem;
            width: 4rem;
            transition: all 0.3s;
            border-radius: 0.2rem;
            cursor: pointer;
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
            margin-left: 1rem;
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
@media screen and (min-width:1400px)
{
}
@media screen and (max-width:1400px) and (min-width:1200px)
{
}
@media screen and (max-width:1200px) and (min-width:936px)
{
}
@media screen and (max-width:936px) and (min-width:767px)
{
}
@media screen and (max-width:767px) and (min-width:676px)
{
}
@media screen and (max-width:676px)
{
}
</style>