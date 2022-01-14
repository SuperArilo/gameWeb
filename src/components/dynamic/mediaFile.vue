<template>
    <div class="media-manager">
        <div class="media-title">
            <i class="fas fa-times-circle left-i" @click="closeWindow"/>
            <span class="center-title">媒体管理器</span>
            <div class="right-upload">
                <input type="file" ref="fileInput" @change="fileBeforeUpload" accept="image/*" multiple title=""/>
                <i class="fas fa-file-upload"/>
                <span>上传</span>
            </div>
        </div>
        <div class="media-div" :class="imageList.length === 0 ? 'media-div-style-flex':'media-div-style-grid'">
            <span v-if="imageList.length === 0 && isGetMediaFileWorkNow === false">您还没有上传过文件哦！</span>
            <i v-if="isGetMediaFileWorkNow" class="fas fa-circle-notch fa-spin"/>
            <transition-group name="list">
                <div class="media-sub-item" v-for="(item,index) in imageList" :key="index" :class="imageIsHaveIdList.indexOf(item.id) !== -1 ? 'media-sub-item-active':''"> 
                    <div class="title-func">
                        <div class="is-choice">
                            <i v-show="imageIsHaveIdList.indexOf(item.id) !== -1" class="fas fa-check"/>
                        </div>
                        <i class="fas fa-trash-alt" @click="deleteByOneToOne(item.id)"/>
                    </div>
                    <img :src="item.mediaHttpUrl" @click="userChoicePicture(item.id)"/>
                    <span class="file-name">{{item.mediaName}}</span>
                </div>
            </transition-group>
        </div>
        <div class="media-bottom">
            <div class="delete" @click="deleteByMultiple">
                <span v-if="!isDeleteByMultipleWorkNow">删除</span>
                <i v-if="isDeleteByMultipleWorkNow" class="fas fa-circle-notch fa-spin"/>
            </div>
            <div class="embed">
                <span>嵌入</span>
            </div>
        </div>
    </div>
</template>
<script>
import { uploadImage , userImageGet } from '@/util/api.js'
import { ElMessageBox, ElMessage } from 'element-plus'
export default {
    data(){
        return{
            imageList:[],
            imageIsHaveIdList:[],
            isGetMediaFileWorkNow: false,
            isDeleteByMultipleWorkNow: false,
        }
    },
    async created(){
        this.isGetMediaFileWorkNow = true
        userImageGet({uid: 11}).then(resq => {
            if(resq.flag){
                this.imageList = resq.data
                this.isGetMediaFileWorkNow = false
            }
        }).catch(err => {
            ElMessage.error('获取媒体文件出错，请稍后重试！' + err)
        })
    },
    methods:{
        closeWindow(){
            this.$emit('closeWindow',false)
        },
        userChoicePicture(id){
            if(this.imageIsHaveIdList.indexOf(id) === -1){
                this.imageIsHaveIdList.unshift(id)
            } else {
                this.imageIsHaveIdList.splice(this.imageIsHaveIdList.findIndex(item => item === id), 1)
            }
        },
        fileBeforeUpload(e){
            let files = [...e.target.files]
            this.$refs.fileInput.value = ''
            if(files !== 0){
                let data = new FormData()
                data.append('imageFile',files)
                data.append('uid',10)
                uploadImage(data).then(resq => {
                    console.log(resq)
                })
                // this.editor.cmd.do('insertHTML', `<img src="${imgUrl}" style="max-width:100%;"/>`)
            }
        },
        deleteByOneToOne(id){
            ElMessageBox.confirm( '确定删除选中的文件吗？此操作不可逆', { confirmButtonText: '确认', cancelButtonText: '取消', type: 'warning'}).then(() => {
                ElMessage({  type: 'success', message: '删除成功'})
            }).catch(err => {
            })
        },
        deleteByMultiple(){
            if(this.imageIsHaveIdList.length === 0){
                ElMessage('您未选中任何选项')
                return
            }
            if(!this.isDeleteByMultipleWorkNow){
                this.isDeleteByMultipleWorkNow = true
                ElMessageBox.confirm( '确定删除选中的文件吗？此操作不可逆', { confirmButtonText: '确认', cancelButtonText: '取消', type: 'warning'}).then(() => {
                    ElMessage({  type: 'success', message: '删除成功'})
                    this.isDeleteByMultipleWorkNow = false
                }).catch(err => {
                    this.isDeleteByMultipleWorkNow = false
                })
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.media-manager
{
    width: 100%;
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
    .media-div
    {
        width: 100%;
        height: 14rem;
        overflow-y: scroll;
        background-color: #e8ecf3;
        padding: 0.8rem 0.8rem 0.8rem 1.4rem;
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
            transition: all 0.2s;
            .title-func
            {
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 1.2rem;
                .is-choice
                {
                    .fa-check
                    {
                        color: green;
                    }
                }
                i
                {
                    width: 1.2rem;
                    border-radius: 0.2rem 0 0 0.2rem;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .fa-trash-alt
                {
                    transition: all 0.3s;
                    cursor: pointer;
                }
                .fa-trash-alt:hover
                {
                    background-color: #dddddd;
                    color: red;
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
        .media-sub-item-active
        {
            box-shadow: 0 0 0.3rem rgba(0, 0, 0, 0.767);
        }
        .list-enter-active , .list-leave-active
        {
            transition: all 0.5s;
        }
        .list-enter-from , .list-leave-to
        {
            opacity: 0;
            margin-top: 6rem;
        }
    }
    .media-div-style-flex
    {
        display: flex;
        justify-content: center;
        align-items: center;
        span , i
        {
            height: 100%;
            display: flex;
            align-items: center;
            font-size: 0.7rem;
        }
    }
    .media-div-style-grid
    {
        display: grid;
        grid-template-columns: repeat(auto-fill, 7rem);
        grid-template-rows: repeat(auto-fill,6rem);
        grid-row-gap: 0.5rem;
        justify-content: space-around;
    }
    .media-bottom
    {
        width: 100%;
        height: 2rem;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: 0 0.5rem;
        .delete, .embed
        {
            width: 3rem;
            height: 1.6rem;
            border-radius: 0.2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            transition: all 0.3s;
            span , i
            {
                height: 100%;
                display: flex;
                align-items: center;
            }
        }
        .delete
        {
            background-color: #e8ecf3;
            color: rgb(216, 92, 92);
        }
        .embed
        {
            background-color: #4d698e;
            color: #ffffff;
            margin-left: 1rem;
        }
        .delete:hover
        {
            background-color: #cad8f1;
        }
        .embed:hover
        {
            background-color: #cecfd1;
            color: rgb(100, 100, 100);
        }
    }
}
</style>