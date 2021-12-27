<template>
    <div class="edit-box">
        <div class="title-back" @click="routerBackFunc()">
            <i class="fas fa-chevron-left"/>
            <span>Back</span>
        </div>
        <div class="rule">
            <span class="inf-tips">发表动态规则以及原则</span>
            <div class="rule-content">
                <span class="rule-title">个人信息包括：头像、用户名、签名、自定义头衔等公开展示的信息</span>
                <span class="rule-title">违反以下规定，管理员将根据情节轻重进行清空个人资料、扣分、警告、封禁、删除账号等处理</span>
                <span class="rule-item" v-for="(item,indexO) in ruleListO" :key="indexO">{{item}}</span>
                <span class="rule-title">关于发帖违规</span>
                <span class="rule-item" v-for="(item,indexT) in ruleListT" :key="indexT">{{item}}</span>
            </div>
        </div>
        <div class="edit-dy-content">
            <span class="dy-edit-title">动态标题</span>
            <input/>
            <span class="dy-edit-title">动态简介</span>
            <textarea/>
            <span class="dy-edit-title">选择标签</span>
            <span class="dy-edit-title">动态内容编辑</span>
            <v-md-editor v-model="inputText" @change="mdEditor"></v-md-editor>
            <div class="md-editor-submit">
                <span class="buttom-file" @click="dialogVisible = true">媒体文件管理</span>
                <span class="button-confirm">发布</span>
            </div>
        </div>
        <el-dialog v-model="dialogVisible" :lock-scroll="false" :close-on-click-modal="false" :close-on-press-escape="false">
            <div class="media-title">
                <i class="fas fa-times-circle left-i" @click="dialogVisible = false"/>
                <span class="center-title">媒体管理器</span>
                <div class="right-upload">
                    <input type="file" ref="fileInput" @change="fileUpload" accept="image/*" multiple/>
                    <i class="fas fa-file-upload"/>
                    <span>上传</span>
                </div>
            </div>
            <span class="media-empty" v-if="imageList.length === 0">您还没有上传过文件哦！</span>
            <div class="media-div" v-if="imageList.length !== 0">
                <div class="media-sub-item" v-for="(item,index) in imageList" :key="index">
                    <div class="title-func">
                        <i class="fas fa-trash-alt" @click="delBeforeUploadImage(index)"/>
                    </div>
                    <img :src="item.url"/>
                    <span class="file-name">{{item.fileName}}</span>
                </div>
            </div>
            <div class="media-bottom">
                <span class="cancel" @click="dialogVisible = false">取消</span>
                <span class="upload">嵌入</span>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { ElMessage } from 'element-plus'
export default {
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
            inputText: '',
            dialogVisible: false,
            imageList:[],
            base64Temp:''
        }
    },
    methods:{
        routerBackFunc() {
            this.$router.push('/dynamic')
        },
        mdEditor(text,html){
        },
        fileUpload(e){
            let files = e.target.files
            if(files !== 0){
                let _this = this
                for(let i = 0,length = files.length;i < length;i++){
                    let reader = new FileReader()
                    reader.readAsDataURL(files[i])
                    reader.onload = function(e) {
                        _this.imageList = _this.imageList.concat({url: e.target.result,fileName: files[i].name})
                    }
                }
                // this.$refs.fileInput.value = ''
                // for(let i = 0, length = files.length;i < length;i++){
                //     this.getBase64(files[i]).then(resq => {
                //         this.imageList = this.imageList.concat({url: resq,fileName: files[i].name})
                //         if(i === length - 1){
                //             this.$refs.fileInput.value = ''
                //         }
                //     }).catch(err => {
                //         ElMessage({
                //             message: '在上传图片的过程中出错！' + err,
                //             type: 'error'
                //         })
                //     })
                // }
            }
        },
        getBase64(file) {
            return new Promise(function(resolve, reject) {
                let reader = new FileReader()
                let results = ''
                reader.readAsDataURL(file)
                reader.onload = function () {
                    results = reader.result
                }
                reader.onerror = function (error) {
                    reject(error)
                }
                reader.onloadend = function () {
                    resolve(results)
                }
            })
        },
        delBeforeUploadImage(index){
            this.imageList.splice(index,1)
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
    background-color: rgba(255, 255, 255, 0.8);
    padding: 1rem 0.3rem;
    .title-back
    {
        height: 1.5rem;
        display: flex;
        justify-content: flex-start;
        padding: 0 0.5rem;
        cursor: pointer;
        margin-bottom: 0.5rem;
        span , i
        {
            height: 100%;
            display: flex;
            align-items: center;
        }
        span
        {
            font-size: 0.65rem;
            margin-left: 0.5rem;
        }
        i
        {
            font-size: 1rem;
            color: #3773f3;
        }
    }
    .rule
    {
        width: 100%;
        display: flex;
        justify-content: center;
        align-content: flex-start;
        flex-wrap: wrap;
        padding: 0 0.5rem;
        .inf-tips
        {
            width: 100%;
            display: flex;
            justify-content: center;
            font-size: 1rem;
            text-align: center;
            font-weight: bold;
            margin-bottom: 1rem;
        }
        .rule-content
        {
            width: 100%;
            display: flex;
            align-content: flex-start;
            flex-wrap: wrap;
            .rule-title
            {
                width: 100%;
                display: flex;
                justify-content: flex-start;
                align-items: flex-start;
                text-align: left;
                font-size: 0.7rem;
                font-weight: bold;
            }
            .rule-item
            {
                width: 100%;
                font-size: 0.64rem;
                text-align: left;
                display: flex;
                justify-content: flex-start;
                align-items: flex-start;
                margin: 0.25rem 0 0.25rem 0;
            }
        }
    }
    .edit-dy-content
    {
        width: 100%;
        display: flex;
        align-content: flex-start;
        flex-wrap: wrap;
        padding: 0 1rem;
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
        .choice-tags
        {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-content: flex-start;
            padding: 0.5rem 0.3rem;
        }
        textarea , input
        {
            width: 100%;
            min-width: 100%;
            font-size: 0.7rem;
            padding: 0.5rem 0.5rem;
            outline: none;
            border: none;
            border-radius: 0.2rem;
            margin: 0.5rem 0;
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
            span
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
    .media-title
    {
        width: 100%;
        height: 2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.5rem;
        .left-i
        {
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.3s;
        }
        .left-i:hover
        {
            color: red;
        }
        .center-title
        {
            height: 100%;
            display: flex;
            align-items: center;
            font-size: 0.7rem;
        }
        .right-upload
        {
            width: 3rem;
            height: 1.4rem;
            border-radius: 0.2rem;
            background-color: #e8ecf3;
            transition: all 0.3s;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            z-index: 10;
            cursor: pointer;
            span
            {
                margin-left: 0.2rem;
            }
            input
            {
                width: 100%;
                height: 100%;
                background-color: transparent;
                position: absolute;
                z-index: 1;
                opacity: 0;
            }
        }
        .right-upload:hover
        {
            background-color: #3773f3;
            color: #ffffff;
        }
    }
    .media-empty
    {
        width: 100%;
        height: 14rem;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.7rem;
    }
    .media-div
    {
        width: 100%;
        height: 14rem;
        overflow-y: scroll;
        display: grid;
        grid-template-columns: repeat(auto-fill, 7rem);
        grid-template-rows: repeat(auto-fill,6rem);
        grid-row-gap: 0.5rem;
        justify-content: space-around;
        background-color: #e8ecf3;
        padding: 0.8rem 1rem;
        .media-sub-item
        {
            width: 7rem;
            height: 6rem;
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            border-radius: 0.2rem;
            overflow: hidden;
            background-color: #ffffff;
            .title-func
            {
                width: 100%;
                display: flex;
                justify-content: flex-end;
                align-items: center;
                height: 1.2rem;
                i
                {
                    width: 1.2rem;
                    border-radius: 0.2rem;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    transition: all 0.3s;
                }
                i:hover
                {
                    background-color: #dddddd;
                }
            }
            img
            {
                width: 100%;
                height: 3.8rem;
                object-fit: cover;
            }
            .file-name
            {
                width: 100%;
                padding: 0 0.5rem;
                height: 1rem;
                line-height: 1rem;
                text-align: center;
                font-size: 0.5rem;
                overflow: hidden; 
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
    }
    .media-bottom
    {
        width: 100%;
        height: 2rem;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: 0 0.5rem;
        span
        {
            width: 3rem;
            height: 1.6rem;
            border-radius: 0.2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            transition: all 0.3s;
        }
        .cancel
        {
            background-color: #e8ecf3;
        }
        .upload
        {
            background-color: #4d698e;
            color: #ffffff;
            margin-left: 1rem;
        }
        .cancel:hover
        {
            background-color: #cad8f1;
        }
        .upload:hover
        {
            background-color: #cecfd1;
            color: rgb(100, 100, 100);
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