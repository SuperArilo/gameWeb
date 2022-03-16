<template>
    <div class="media-manager">
        <div class="media-title">
            <i class="fas fa-times-circle left-i" @click="closeWindow"/>
            <span class="center-title">媒体管理器</span>
            <div class="right-upload">
                <i v-if="isUploadToServerWorkNow" class="fas fa-circle-notch fa-spin"/>
                <input v-if="!isUploadToServerWorkNow" type="file" ref="fileInput" @change="fileBeforeUpload" accept="image/*" multiple title=""/>
                <i v-if="!isUploadToServerWorkNow" class="fas fa-file-upload"/>
                <span v-if="!isUploadToServerWorkNow">上传</span>
            </div>
        </div>
       <div class="media-empty" v-if="imageList.length === 0">
            <span v-if="imageList.length === 0 && isGetMediaFileWorkNow === false">您还没有上传过文件哦！</span>
            <i v-if="isGetMediaFileWorkNow" class="fas fa-circle-notch fa-spin"/>
        </div>
        <div class="media-div" v-if="imageList.length !== 0">
            <transition-group name="list">
                <div class="media-sub-item" v-for="item in imageList" :key="item.id" :style="imageIsHaveIdList.indexOf(item.id) !== -1 ? 'box-shadow: 0 0 0.2rem rgb(61, 61, 61);':''"> 
                    <div class="title-func">
                        <div class="is-choice">
                            <transition name="fade">
                                <i v-if="imageIsHaveIdList.indexOf(item.id) !== -1" class="fas fa-check"/>
                            </transition>
                        </div>
                        <div class="delete-i">
                            <transition name="fade">
                                <i v-if="imageIsHaveIdList.indexOf(item.id) === -1" class="fas fa-trash-alt" @click="deleteByOneToOne(item.id)"/>
                            </transition>
                        </div>
                    </div>
                    <img :src="item.mediaHttpUrl" @click="userChoicePicture(item.id,item.mediaHttpUrl)"/>
                    <span class="file-name">{{item.mediaName}}</span>
                </div>
            </transition-group>
        </div>
        <div class="media-bottom">
            <div class="delete" @click="deleteByMultiple">
                <span v-if="!isDeleteByMultipleWorkNow">删除</span>
                <i v-if="isDeleteByMultipleWorkNow" class="fas fa-circle-notch fa-spin"/>
            </div>
            <div class="embed" @click="embedIntoEdit">
                <span>嵌入</span>
            </div>
        </div>
    </div>
</template>
<script>
import { uploadImage , userImageGet , deleteImage } from '@/util/api.js'
import { ElMessageBox, ElMessage } from 'element-plus'
export default {
    data(){
        return{
            imageList:[],
            imageIsHaveIdList:[],
            intoEditList: [],
            isUploadToServerWorkNow: false,
            isGetMediaFileWorkNow: false,
            isDeleteByMultipleWorkNow: false
        }
    },
    async created(){
        this.isGetMediaFileWorkNow = true
        userImageGet({uid: this.$store.getters.userInfoGet.uid}).then(resq => {
            if(resq.flag){
                this.imageList = resq.data
                this.isGetMediaFileWorkNow = false
            } else {
                ElMessage.error(resq.message)
                this.isGetMediaFileWorkNow = false
            }
        }).catch(err => {
            ElMessage.error(err.message)
        })
    },
    methods:{
        closeWindow(){
            this.$emit('closeWindow',false)
        },
        userChoicePicture(id,url){
            if(this.imageIsHaveIdList.indexOf(id) === -1){
                this.imageIsHaveIdList.push(id)
                this.intoEditList.push({id: id,url: url})
            } else {
                let index = this.imageIsHaveIdList.findIndex(item => item === id)
                this.imageIsHaveIdList.splice(index, 1)
                this.intoEditList.splice(index,1)
            }
        },
        fileBeforeUpload(e){
            if(!this.isUploadToServerWorkNow){
                this.isUploadToServerWorkNow = true
                let files = [...e.target.files]
                this.$refs.fileInput.value = ''
                if(files !== 0){
                    let data = new FormData()
                    for (let i = 0; i < files.length; i++) {
                        data.append('imageFiles',files[i])
                    }
                    data.append('uid',this.$store.getters.userInfoGet.uid)
                    uploadImage(data).then(resq => {
                        if(resq.flag){
                            ElMessage({type: 'success', message: resq.message})
                            this.imageList = this.imageList.concat(resq.data)
                            this.isUploadToServerWorkNow = false
                        } else {
                            ElMessage.error(resq.message)
                            this.isUploadToServerWorkNow = false
                        }
                    }).catch(err => {
                        ElMessage.error(err.message)
                        this.isUploadToServerWorkNow = false
                    })
                }
            }
        },
        deleteByOneToOne(id){
            ElMessageBox.confirm( '确定删除选中的文件吗？此操作不可逆', { confirmButtonText: '确认', cancelButtonText: '取消', type: 'warning'}).then(() => {
                let sendData = new FormData()
                let ArrayID = []
                ArrayID.unshift(id)
                sendData.append('uid', this.$store.getters.userInfoGet.uid)
                sendData.append('mediaIds', ArrayID)
                deleteImage(sendData).then(resq => {
                    if(resq.flag){
                        ElMessage({type: 'success', message: resq.message})
                        let index = this.imageList.findIndex(item => item.id === id)
                        this.imageList.splice(index, 1)
                    } else {
                        ElMessage.error(resq.message)
                    }
                }).catch(err => {
                    ElMessage.error(err.message)
                })
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
                    let data = new FormData()
                    data.append('uid',this.$store.getters.userInfoGet.uid)
                    data.append('mediaIds',this.imageIsHaveIdList)
                    deleteImage(data).then(resq => {
                        if(resq.flag){
                            ElMessage({  type: 'success', message: resq.message})
                            this.imageIsHaveIdList.findIndex(key => {
                                this.intoEditList.splice(this.intoEditList.findIndex(item => item.id === key), 1)
                                this.imageList.splice(this.imageList.findIndex(item => item.id === key), 1)
                            })
                            this.imageIsHaveIdList = []
                        } else {
                            ElMessage.error(resq.message)
                        }
                    }).catch(err => {
                        ElMessage.error(err.message)
                    })
                    this.isDeleteByMultipleWorkNow = false
                }).catch(err => {
                    this.isDeleteByMultipleWorkNow = false
                })
            }
        },
        embedIntoEdit(){
            if(this.intoEditList.length !== 0){
                this.$emit('imageIntoEdit',this.intoEditList)
            } else {
                ElMessage('您未选中任何选项')
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.media-manager
{
    width: 100%;
    display: flex;
    align-content: flex-start;
    flex-wrap: wrap;
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
    .media-empty , .media-div
    {
        width: 100%;
        height: 14rem;
        background-color: #e8ecf3;
    }
    .media-empty
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
    .media-div
    {
        display: grid;
        grid-template-columns: repeat(auto-fill, 7rem);
        grid-template-rows: repeat(auto-fill,6rem);
        grid-row-gap: 0.5rem;
        grid-column-gap: 0.5rem;
        justify-content: space-around;
        overflow-y: overlay;
        padding: 0.5rem;
        .media-sub-item
        {
            width: 7rem;
            height: 6rem;
            display: flex;
            align-content: flex-start;
            flex-wrap: wrap;
            border-radius: 0.2rem;
            overflow: hidden;
            background-color: #ffffff;
            transition: all 0.25s;
            .title-func
            {
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 1.2rem;
                .is-choice , .delete-i
                {
                    height: 100%;
                    display: flex;
                    align-items: center;
                    .fa-check
                    {
                        font-size: 0.8rem;
                        color: rgb(96, 163, 96);
                    }
                }
                .delete-i
                {
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
                i
                {
                    width: 1.5rem;
                    border-radius: 0.2rem 0 0 0.2rem;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .fade-enter-active , .fade-leave-active
                {
                    transition: opacity 0.3s;
                }
                .fade-enter-from , .fade-leave-to
                {
                    opacity: 0;
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
        .list-enter-from , .list-leave-to
        {
            opacity: 0;
            transform: translateX(1rem);
        }
        .list-leave-active
        {
            position: absolute;
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