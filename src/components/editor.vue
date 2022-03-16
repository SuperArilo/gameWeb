<template>
    <div class="editor-box">
        <div class="render-edit" ref="dyEditTool"></div>
        <div class="buttom">
            <div class="buttom-file" @click="dialogVisible = true">
                <span>媒体文件管理</span>
            </div>
            <div class="button-confirm" @click="sendData">
                <span v-if="!status">发布</span>
                <i v-else class="fas fa-circle-notch fa-spin"/>
            </div>
        </div>
        <el-dialog v-model="dialogVisible" :lock-scroll="false" :close-on-click-modal="false" :close-on-press-escape="false">
            <media-file v-if="dialogVisible" @closeWindow="closeWindow" @imageIntoEdit="imageIntoEdit"/>
        </el-dialog>
    </div>
</template>
<script>
import { uploadImage } from '@/util/api.js'
import mediaFile from '@/components/dynamic/mediaFile.vue'
export default {
    components:{
        mediaFile
    },
    props:{
        status: [Boolean],
        isClearContent: [Boolean]
    },
    data(){
        return{
            editor: null,
            dialogVisible: false,
            userContent: '',
        }
    },
    mounted(){
        const editor = new wangEditor(this.$refs.dyEditTool)
        editor.config.showLinkImg = false
        editor.config.focus = false
        editor.config.uploadImgMaxLength = 4
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
            'video',
        ]
        editor.config.onchange = (newHtml) => {
            this.userContent = newHtml
        }
        editor.config.customUploadImg = (resultFiles) => {
            let data = new FormData()
            resultFiles.forEach(item => {
                data.append('imageFiles',item)
            })
            data.append('uid', this.$store.getters.userInfoGet.uid)
            uploadImage(data).then(resq => {
                if(resq.flag){
                    resq.data.forEach(item => {
                        editor.cmd.do('insertHTML', '<img src="' + item.mediaHttpUrl + '" width="100" "/>')
                    })
                    ElMessage({type: 'success', message: resq.message})
                } else {
                    ElMessage.error(resq.message)
                }
            }).catch(err => {
                ElMessage.error(err.message)
            })
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
                this.editor.cmd.do('insertHTML', '<img src="' + key.url + '" width="100"/>')
            })
        },
        sendData(){
            if(!this.status){
                this.$emit('sendData', this.userContent)
            }
            
        }
    },
    computed:{
        isClear(){
            return this.isClearContent
        }  
    },
    watch:{
        isClear(value){
            if(value){
                this.editor.txt.clear()
            }
        }
    },
    unmounted() {
        this.editor.destroy()
        this.editor = null   
    }
}
</script>
<style lang="scss" scoped>
.editor-box
{
    width: 100%;
    display: flex;
    align-content: flex-start;
    flex-wrap: wrap;
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
        h1 , h2 , h3 , h4 , h5 , p , table , pre
        {
            margin: 0.5rem 0;
            line-height: 1.5;
        }
        ul , li , ol
        {
            font-size: 0.6rem;
        }
        blockquote
        {
            padding: 0.15rem 0.3rem;
            margin: 0.3rem 0;
            line-height: 2;
        }
        hr
        {
            height: 0;
            border: 0;
            border-top: 0.1rem solid #ccc;
            margin: 0.6rem 0;
        }
        table
        {
            border-top: 0.08rem solid #ccc;
            border-left: 0.08rem solid #ccc;
            th , td
            {
                border-bottom: 0.08rem solid #ccc;
                border-right: 0.08rem solid #ccc;
                padding: 0.1rem 0.3rem;
                min-height: 1.2rem;
                height: 1.2rem;
            }
            th
            {
                border-bottom: 0.1rem solid #ccc;
                text-align: center;
                background-color: #f1f1f1;
            }
        }
    }
    ::v-deep(i)
    {
        font-size: 0.6rem;
    }
    ::v-deep(.w-e-menu-tooltip)
    {
        font-size: 0.6rem;
    }
    ::v-deep(.w-e-up-btn)
    {
        width: 100%;
    }
    ::v-deep(.el-dialog__body)
    {
        padding: 0;
    }
    ::v-deep(.el-dialog__header)
    {
        display: none;
    }
    ::v-deep(.el-dialog__footer)
    {
        display: none;
    }
    .buttom
    {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin: 1rem 0;
        span , i
        {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s;
        }
        span
        {
            font-size: 0.6rem;
        }
        i
        {
            font-size: 0.8rem !important;
        }
        .button-confirm
        {
            background-color: #b3d8ff;
            border: solid 0.05rem #409eff;
            color: #3399ff;
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
        .button-confirm , .buttom-file
        {
            width: 4rem;
            height: 1.5rem;
            transition: all 0.3s;
            border-radius: 0.2rem;
            transition: all 0.3s;
            cursor: pointer;
        }
        .button-confirm:hover
        {
            background-color: #409eff;
            span , i
            {
                color: white;
            }
        }
    }
}
@media screen and (min-width:1400px)
{
    ::v-deep(.el-dialog)
    {
        width: 35rem;
    }
}
@media screen and (max-width:1400px) and (min-width:1200px)
{
    ::v-deep(.el-dialog)
    {
        width: 35rem;
    }
}
@media screen and (max-width:1200px) and (min-width:936px)
{
    ::v-deep(.el-dialog)
    {
        width: 35rem;
    }
}
@media screen and (max-width:936px) and (min-width:767px)
{
    ::v-deep(.el-dialog)
    {
        width: 90%;
    }
}
@media screen and (max-width:767px) and (min-width:676px)
{
    ::v-deep(.el-dialog)
    {
        width: 90%;
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