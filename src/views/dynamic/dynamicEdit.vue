<template>
    <div class="edit-box" :style="{backgroundImage:`url(${this.$store.getters.indexBgGet})`}">
        <div class="dy-title-func-div">
            <div class="dy-back" @click="routerBackFunc()">
                <i class="fas fa-chevron-left"/>
                <span>返回上一级</span>
            </div>
        </div>
        <div class="edit-dy-content">
            <span class="dy-edit-title">动态标题</span>
            <input class="title-input" v-model="dyTtitle" type="text" maxlength="16"/>
            <span class="dy-edit-title">动态简介</span>
            <textarea class="inf-textarea" v-model="dyDescribe"/>
            <span class="dy-edit-title">选择标签</span>
            <div class="choice-tags">
                <div class="content">
                    <div class="input-tags">
                        <div class="left-tags">
                            <span class="tags" v-for="(item,index) in tagTemp" :key="index">
                                {{item}}
                                <i class="fas fa-trash-alt" @click="tagDel(index)"/>
                            </span>
                            <div class="add-new-tag-input">
                                <input type="text" v-model="clearTagInput" @keyup.enter="tagInputEnter" placeholder="输入自定义标签"/>
                            </div>
                        </div>
                        <span class="right-add-haved" @click="showMoreTags =! showMoreTags">
                            选择更多
                            <i class="fas fa-align-left"/>
                        </span>
                    </div>
                    <el-collapse-transition>
                        <div v-if="showMoreTags" class="drop-menu">
                            <span class="span-tag" v-for="(item,index) in tagList" :key="index" @click="addHavedTag(item.id,item.title)">{{item.title}}</span>
                        </div>
                    </el-collapse-transition>
                </div>
            </div>
            <span class="dy-edit-title" style="margin: 0.5rem 0">动态内容编辑</span>
            <div class="dy-edit-tool">
                <div class="render-edit" ref="dyEditTool"></div>
            </div>
            <div class="md-editor-submit">
                <div class="buttom-file" @click="dialogVisible = true">
                    <span>媒体文件管理</span>
                </div>
                <div class="button-confirm" @click="dyPublish">
                    <span v-if="!isDyPublishWorkNow">发布</span>
                    <i v-if="isDyPublishWorkNow" class="fas fa-circle-notch fa-spin"/>
                </div>
            </div>
        </div>
        <el-dialog v-model="dialogVisible" :lock-scroll="false" :close-on-click-modal="false" :close-on-press-escape="false">
            <media-file v-if="dialogVisible" @closeWindow="closeWindow" @imageIntoEdit="imageIntoEdit"/>
        </el-dialog>
        <footer-bottom/>
    </div>
</template>
<script>
import { ElMessage , ElMessageBox } from 'element-plus'
import mediaFile from '@/components/dynamic/mediaFile.vue'
import {userPublishDynamic} from '@/util/api.js'
import footerBottom from '@/components/footerBottom.vue'
export default {
    components:{
        mediaFile , footerBottom
    },
    data(){
        return{
            ruleListO:[
                '1. 不得含有人身侮辱性质内容、宗教斗争色彩、政治色彩、精神污染内容',
                '2. 不得含有性相关或强烈性暗示色彩',
                '3. 不得含有未经许可的广告/商业盈利/服务器宣传内容、宣传或引导到其他与本站相同定位的社区',
                '4. 不得使用超长头像（源图片高度大于200像素的头像）、超大头像（头像尺寸已经接触信息框边缘的头像）、任何可以扫描的图形编码头像或签名（扫描打开网页链接、付款捐赠链接等）',
                '5. 不得使用超过3行的自定义头衔（超长头衔）',
                '6. 不得恶意模仿论坛现有用户及站内外团体',
                '7. 不得包含或暗示管制类精神药品或有类似功效的生物制品的内容。'
            ],
            ruleListT:[
                '1. 请认真选择发表主题的版块和主题分类',
                '2. 不得发布违规信息，政治内容，违反中华人民共和国《全国人大常委会关于维护互联网安全的决定》及其它相关法律法规，包括地方性及临时性法规。发现违反者将删除相关帖子并视情况严重与否进行其他惩罚',
                '3. 不得含有未经许可的广告/商业盈利/服务器宣传内容、宣传或引导到其他与本站相同定位的社区',
                '4. 不得使用超长头像（源图片高度大于200像素的头像）、超大头像（头像尺寸已经接触信息框边缘的头像）、任何可以扫描的图形编码头像或签名（扫描打开网页链接、付款捐赠链接等）',
                '5. 不得使用超过3行的自定义头衔（超长头衔）',
                '6. 不得恶意模仿论坛现有用户及站内外团体',
                '7. 不得包含或暗示管制类精神药品或有类似功效的生物制品的内容。'
            ],
            tagList:[
                {
                    id: 0,
                    title: '杰哥'
                },
                {
                    id: 1,
                    title: 'Van♂'
                },
                {
                    id: 2,
                    title: 'Deep Dark Fansty'
                },
                {
                    id: 3,
                    title: "That's Good ♂"
                },
                {
                    id: 4,
                    title: '单身狗'
                },
                {
                    id: 5,
                    title: '情投一盒'
                },
                {
                    id: 6,
                    title: '不要做舔狗'
                },
                {
                    id: 7,
                    title: '萝卜'
                },
                {
                    id: 8,
                    title: '菜菜'
                },
                {
                    id: 9,
                    title: '腐竹通知'
                },
                {
                    id: 10,
                    title: 'Epic被刺'
                },
                {
                    id: 11,
                    title: 'Steam宣布破产'
                },
                {
                    id: 12,
                    title: '服务器维护'
                },
                {
                    id:13,
                    title: '群主太帅了'
                }
            ],
            showMoreTags: false,
            dialogVisible: false,
            noHaveTag:[],
            havedTag:[],
            tagTemp:[],
            dyTtitle: '',
            dyDescribe: '',
            dyContent: '',
            clearTagInput: '',
            editor: null,
            isDyPublishWorkNow: false
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
        routerBackFunc() {
            this.$router.push('/dynamic')
        },
        tagInputEnter(e){
            if(e.target.value === '') return
            if(this.noHaveTag.length + this.havedTag.length > 2){
                ElMessage({message: '标签最多添加3个哦！',type: 'warning',})
                return
            }
            let isHave
            this.noHaveTag.forEach(key => {
                if(key.tagContent === e.target.value) isHave = true
            })
            this.tagTemp.forEach(key => {
                if(key === e.target.value) isHave = true
            })
            if(isHave){
                ElMessage({message: '添加的标签已经存在了哦！',type: 'warning',})
            } else {
                this.noHaveTag = this.noHaveTag.concat({tagContent: e.target.value,tagType: ''})
                this.tagTemp = this.tagTemp.concat(e.target.value)
                this.clearTagInput = ''
            }
        },
        addHavedTag(id,title){
            if(title === '') return
            if(this.noHaveTag.length + this.havedTag.length > 2){
                console.log(this.havedTag)
                ElMessage({message: '标签最多添加3个哦！',type: 'warning',})
                return
            }
            let isHave
            this.noHaveTag.forEach(key => {
                if(key.tagContent === title) isHave = true
            })
            this.havedTag.forEach(key => {
                if(key === id) isHave = true
            })
            if(isHave){
                ElMessage({message: '添加的标签已经存在了哦！',type: 'warning',})
            } else {
                this.havedTag = this.havedTag.concat(id)
                this.tagTemp = this.tagTemp.concat(title)
            }
        },
        tagDel(index){
            this.noHaveTag.splice(index,1)
            this.havedTag.splice(index,1)
            this.tagTemp.splice(index,1)
        },
        closeWindow(value){
            this.dialogVisible = value
        },
        imageIntoEdit(value){
            this.dialogVisible = false
            value.forEach(key =>{
                this.editor.cmd.do('insertHTML', '<img src="' + key.url + '" style="max-width:50%;"/>')
            })
        },
        dyPublish(){
            if(!this.isDyPublishWorkNow){
                this.isDyPublishWorkNow = true
                if(this.dyTtitle === '' || this.dyDescribe === '' || this.dyContent === ''){
                    ElMessage('所提交的信息有空白！')
                    this.isDyPublishWorkNow = false
                } else{
                    if(this.noHaveTag.length + this.havedTag.length === 0){
                        ElMessage('你还没有选择标签哦！')
                        this.isDyPublishWorkNow = false
                    } else {
                        userPublishDynamic({
                                uid: this.$store.getters.userInfoGet.uid,
                                dynamicTitle: this.dyTtitle,
                                dynamicDescribe: this.dyDescribe,
                                dynamicContent: this.dyContent,
                                tags: this.noHaveTag,
                                alreadyExistedTagIds: this.havedTag
                            }).then(resq => {
                            if(resq.flag){
                                ElMessageBox.alert(resq.message, '提示', {confirmButtonText: 'OK',callback: () => {
                                        this.$router.push('/dynamic')
                                    }
                                })
                                this.isDyPublishWorkNow = false
                            } else {
                                ElMessage.error('请求发生错误！ ' + resq.message)
                                this.isDyPublishWorkNow = false
                            }
                        }).catch(err => {
                            ElMessage.error('请求发生错误！ ' + err)
                            this.isDyPublishWorkNow = false
                        })
                    }
                }
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
.edit-box
{
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-content: flex-start;
    flex-wrap: wrap;
    background-repeat: no-repeat;
    background-position: top;
    background-attachment: fixed;
    background-size: cover;
    .dy-title-func-div
    {
        width: 100%;
        height: 1.8rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        background-color: rgba(255,255,255,0.8);
        padding: 0 0.5rem;
        .dy-back
        {
            height: 1.5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: all 0.3s;
            border-radius: 0.2rem;
            padding: 0 0.5rem;
            cursor: pointer;
            span
            {
                height: 100%;
                display: flex;
                align-items: center;
                font-size: 0.65rem;
                margin-left: 0.5rem;
            }
            i
            {
                height: 100%;
                display: flex;
                align-items: center;
                font-size: 1rem;
                color: #3773f3;
            }
        }
        .dy-back:hover
        {
            background-color: rgba(180, 180, 180, 0.555);
        }
    }
    .edit-dy-content
    {
        width: 100%;
        display: flex;
        align-content: flex-start;
        flex-wrap: wrap;
        padding: 1rem;
        background-color: rgba(255,255,255,0.8);
        .dy-edit-title
        {
            width: 100%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            font-size: 0.8rem;
            color: rgb(39, 122, 160);
            font-weight: bold;
        }
        .dy-edit-title::before
        {
            content: "";
            width: 0.3rem;
            height: 1.5rem;
            background-color: #3773f3;
            border-radius: 0.3rem;
            margin-right: 0.5rem;
        }
        .dy-edit-tool
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
        .choice-tags
        {
            width: 100%;
            display: flex;
            justify-content: center;
            margin: 0.5rem 0;
            border-radius: 0.2rem;
            overflow: hidden;
            .content
            {
                width: 100%;
                background-color: #f5f5f5;
                border-radius: 0.2rem;
                display: flex;
                align-content: flex-start;
                flex-wrap: wrap;
                .input-tags .left-tags  .tags , .drop-menu .span-tag
                {
                    min-height: 1.5rem;
                    padding: 0.3rem 0.5rem;
                    font-size: 0.6rem;
                    margin: 0.3rem;
                    border-radius: 0.3rem;
                    border: solid 0.05rem #dfdfdf;
                    letter-spacing: 0.03rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    cursor: pointer;
                    transition: all 0.3s;
                }
                .input-tags
                {
                    width: 100%;
                    padding: 0.3vw 0;
                    background-color: #ffffff;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    .left-tags
                    {
                        width: 100%;
                        height: 100%;
                        display: flex;
                        justify-content: flex-start;
                        flex-wrap: wrap;
                        align-items: center;
                        padding: 0 0.5rem;
                        .tags
                        {
                            
                            i
                            {
                                height: 100%;
                                display: flex;
                                align-items: center;
                                transition: all 0.3s;
                                margin-left: 0.3rem;
                            }
                            i:hover
                            {
                                color: red;
                            }
                        }
                        .add-new-tag-input
                        {
                            height: 1.5rem;
                            width: 5rem;
                            border: solid 0.05rem #dfdfdf;
                            background-color: #ffffff;
                            border-radius: 0.3rem;
                            overflow: hidden;
                            margin: 0.3rem;
                            input
                            {
                                width: 100%;
                                height: 100%;
                                outline: none;
                                border: none;
                                padding:0 0.25rem;
                            }
                        }
                    }
                    .right-add-haved
                    {
                        width: 6rem;
                        height: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: 0.65rem;
                        cursor: pointer;
                        letter-spacing: 0.05rem;
                        i
                        {
                            height: 100%;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            font-size: 0.75rem;
                            margin-left: 0.2rem;
                        }
                    }
                }
                .drop-menu
                {
                    width: 100%;
                    display: flex;
                    justify-content: flex-start;
                    align-items: flex-start;
                    flex-wrap: wrap;
                    .span-tag:hover , .span-tag-active
                    {
                        color: #ffffff;
                        background-color: #3773f3;
                    }
                }
            }
        }
        .inf-textarea, .title-input
        {
            width: 100%;
            min-width: 100%;
            font-size: 0.7rem;
            padding: 0.5rem 0.5rem;
            outline: none;
            border: none;
            border-radius: 0.2rem;
            margin: 0.5rem 0;
            resize: none;
            font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
        }
        ::v-deep(.v-md-editor)
        {
            margin: 0.5rem 0;
            border-radius: 0.2rem;
            box-shadow: none;
            height: 15rem;
        }
        .md-editor-submit
        {
            width: 100%;
            display: flex;
            justify-content: space-between;
            height: 1.5rem;
            margin-top: 0.5rem;
            div
            {
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 0.6rem;
                min-width: 4rem;
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
    .edit-box
    {
        ::v-deep(.el-dialog)
        {
            width: 35rem;
        }
    }
}
@media screen and (max-width:1400px) and (min-width:1200px)
{
    .edit-box
    {
        ::v-deep(.el-dialog)
        {
            width: 35rem;
        }
    }
}
@media screen and (max-width:1200px) and (min-width:936px)
{
    .edit-box
    {
        ::v-deep(.el-dialog)
        {
            width: 30rem;
        }
    }
}
@media screen and (max-width:936px) and (min-width:767px)
{
    .edit-box
    {
        ::v-deep(.el-dialog)
        {
            width: 90%;
        }
    }
}
@media screen and (max-width:767px) and (min-width:676px)
{
    .edit-box
    {
        ::v-deep(.el-dialog)
        {
            width: 90%;
        }
    }
}
@media screen and (max-width:676px)
{
    .edit-box
    {
        ::v-deep(.el-dialog)
        {
            width: 90%;
        }
    }
}
</style>