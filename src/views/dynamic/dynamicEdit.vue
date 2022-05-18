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
                        <span class="right-add-haved" @click="openTagsBox">
                            选择更多
                            <i class="fas fa-align-left"/>
                        </span>
                    </div>
                    <el-collapse-transition>
                        <div v-if="showMoreTags" class="drop-menu">
                            <span class="span-tag" v-for="item in tagList" :key="item.id" @click="addHavedTag(item.id,item.tagContent)">{{item.tagContent}}</span>
                        </div>
                    </el-collapse-transition>
                </div>
            </div>
            <span class="dy-edit-title" style="margin: 0.5rem 0">动态内容编辑</span>
            <div class="dy-edit-tool">
                <editor @sendData="sendDataTo" :status="isDyPublishWorkNow" :isClearContent="isClearContent" />
            </div>
        </div>
        <footer-bottom/>
    </div>
</template>
<script>
import { ElMessage , ElMessageBox } from 'element-plus'
import {userPublishDynamic , dynamicTagsGet} from '@/util/api.js'
import footerBottom from '@/components/footerBottom.vue'
import editor from '@/components/editor.vue'
import mediaFile from '@/components/dynamic/mediaFile.vue'
export default {
    components:{
        mediaFile , footerBottom , editor
    },
    data(){
        return{
            tagList:[],
            showMoreTags: false,
            noHaveTag:[],
            havedTag:[],
            tagTemp:[],
            dyTtitle: '',
            dyDescribe: '',
            dyContent: '',
            clearTagInput: '',
            editor: null,
            isDyPublishWorkNow: false,
            isClearContent: false
        }
    },
    methods:{
        routerBackFunc() {
            this.$router.push('/dynamic')
        },
        tagInputEnter(e){
            if(e.target.value === '') return
            if(this.noHaveTag.length + this.havedTag.length > 2){
                ElMessage({message: '标签最多添加3个哦！',type: 'warning'})
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
                ElMessage({message: '添加的标签已经存在了哦！',type: 'warning'})
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
                ElMessage({message: '标签最多添加3个哦！',type: 'warning'})
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
                ElMessage({message: '添加的标签已经存在了哦！',type: 'warning'})
            } else {
                this.havedTag = this.havedTag.concat(id)
                this.tagTemp = this.tagTemp.concat(title)
            }
        },
        openTagsBox(){
            if(this.tagList.length === 0){
                dynamicTagsGet().then(resq => {
                    if(resq.flag){
                        this.tagList = resq.data
                        this.showMoreTags = true
                    } else {
                        ElMessage({message: '获取标签发生错误 ' + resq.message, type: 'error'})
                    }
                }).catch(err => {
                    ElMessage({message: err.message, type: 'error'})

                })
            } else {
                this.showMoreTags =! this.showMoreTags
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
                this.editor.cmd.do('insertHTML', '<img src="' + key.url + '" width="100" "/>')
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
                                        this.isClearContent = true
                                    }
                                })
                                this.isDyPublishWorkNow = false
                            } else {
                                ElMessage({message: '请求发生错误！ ' + resq.message, type: 'error'})
                                this.isDyPublishWorkNow = false
                            }
                        }).catch(err => {
                            ElMessage({message: err.message, type: 'error'})
                            this.isDyPublishWorkNow = false
                        })
                    }
                }
            }
        },
        sendDataTo(value){
            this.dyContent = value
            this.isClearContent = false
            this.dyPublish()
        }
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
    background-size: cover;
    background-attachment: fixed;
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
    }
}
</style>