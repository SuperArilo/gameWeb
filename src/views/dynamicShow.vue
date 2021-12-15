<template>
    <div class="index-box">
        <div class="waterfall-box">
            <div v-masonry transition-duration="0.3s" :fit-width="true" :horizontal-order="true" gutter="40" :origin-left="true" :destroy-delay="800" stagger="0.03s">
                <div class="sub-div" v-for="(item,index) in test" :key="index">
                    <div class="title-user">
                        <img class="user-head" src="../icon/head/stranger1.jpg"/>
                        <div class="user-name-and-time">
                            <span>{{item.name}}</span>
                            <span>{{item.time}}</span>
                        </div>
                    </div>
                    <span class="content">{{item.content}}</span>
                    <div class="user-image-box">
                        <div class="image" v-for="(itemSub,indexSub) in item.image" :key="indexSub">
                            <img :src="itemSub.url"/>
                        </div>
                        <div class="repace"></div>
                        <div class="repace"></div>
                    </div>
                    <div class="dynamic-data">
                        <div class="top-div">
                            <div>
                                <img src="../icon/index/unLike.png"/>
                                <span>11</span>
                            </div>
                            <div>
                                <img src="../icon/index/albumCommnet.png" @click="albumFuc(item.id)"/>
                                <span>22</span>
                            </div>
                            <div>
                                <img src="../icon/index/watch.png"/>
                                <span>33</span>
                            </div>
                        </div>
                        <div class="bottom-div">
                            <span>SuperArilo、弔人共2人觉得很赞</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <transition name="loading_animate">
            <loading v-show="showLoading"></loading>
        </transition>
        <div class="release-img" @click="showWriteBox =! showWriteBox">
            <img :src="releasePng"/>
        </div>
        <transition name="el-zoom-in-bottom">
            <div class="write-box" v-if="showWriteBox">
                <div class="title">
                    <div class="left-title-inf">
                        <img :src="userDynamic"/>
                        <span>发表动态</span>
                    </div>
                    <div class="right-close">
                        <i class="el-icon-close" @click="showWriteBox = false"></i>
                    </div>
                </div>
                <div class="content">
                    <div class="top-user-head-and-input">
                        <img class="left-user-head" src="../icon/head/stranger10.jpg"/>
                        <textarea placeholder="说点什么吧..."></textarea>
                    </div>
                    <div class="bottom-upload-image">
                        <div class="image" v-for="(item,index) in imageList" :key="(index)">
                            <div class="close-div" @click="removeUploadImage(index)">
                                <i class="el-icon-close"></i>
                            </div>
                                <img :src="item"/>
                            </div>
                            <label for="file-input">
                                <i class="el-icon-plus"></i>
                                <input type="file" @change="selectFile" title="">
                            </label>
                            <div class="repace"></div>
                            <div class="repace"></div>
                            <div class="repace" v-if="!this.$store.getters.isPhoneGet"></div>
                            <div class="repace" v-if="!this.$store.getters.isPhoneGet"></div>
                    </div>
                </div>
                <div class="buttom-box">
                    <span class="button">发布</span>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
import loading from '@/components/loading.vue'
export default {
    components:{
        loading
    },
    data(){
        return{
            page: 0,
            data:[],
            showLoading: false,
            isCountToPage: true,
            test:[
                {
                    id: 0,
                    name: 'SuperArilo1111',
                    time: '2021-10-30  18:06',
                    content: '如果您需要手动触发砖石布局重绘（例如，如果您的磁贴元素量或内容已更改），您现在可以使用方法。截至0.11.8，您可以通过要触发重绘的方块的 ID。',
                    image:[
                        {
                            id: 0,
                            url: require('@/icon/index/index_center.jpg')
                        },
                        {
                            id: 0,
                            url: require('@/icon/index/index_center.jpg')
                        },
                        {
                            id: 0,
                            url: require('@/icon/index/index_center.jpg')
                        },
                        {
                            id: 0,
                            url: require('@/icon/index/index_center.jpg')
                        },
                        {
                            id: 0,
                            url: require('@/icon/index/index_center.jpg')
                        },
                        {
                            id: 0,
                            url: require('@/icon/index/index_center.jpg')
                        },
                        {
                            id: 0,
                            url: require('@/icon/index/index_center.jpg')
                        },
                        {
                            id: 0,
                            url: require('@/icon/index/index_center.jpg')
                        }
                    ]
                },
                {
                    id: 0,
                    name: '弔人',
                    time: '2021-10-30  18:06',
                    content: '如果您需要手动触发砖石布局重绘（例如，如果您的磁贴元素量或内容已更改），您现在可以使用方法。截至0.11.8，您可以通过要触发重绘的方块的 ID。',
                    image:[
                        {
                            id: 0,
                            url: require('@/icon/index/index_center.jpg')
                        },
                        {
                            id: 0,
                            url: require('@/icon/index/index_center.jpg')
                        },
                        {
                            id: 0,
                            url: require('@/icon/index/index_center.jpg')
                        },
                        {
                            id: 0,
                            url: require('@/icon/index/index_center.jpg')
                        },
                    ]
                },
                {
                    id: 0,
                    name: 'SuperArilo',
                    time: '2021-10-30  18:06',
                    content: '如果您需要手动触发砖石布局重绘（例如，如果您的磁贴元素量或内容已更改），您现在可以使用方法。截至0.11.8，您可以通过要触发重绘的方块的 ID。',
                    image:[
                        {
                            id: 0,
                            url: require('@/icon/index/index_center.jpg')
                        }
                    ]
                },
                {
                    id: 0,
                    name: 'SuperArilo',
                    time: '2021-10-30  18:06',
                    content: '如果您需要手动触发砖石布局重绘（例如，如果您的磁贴元素量或内容已更改），您现在可以使用方法。截至0.11.8，您可以通过要触发重绘的方块的 ID。',
                    image:[
                        {
                            id: 0,
                            url: require('@/icon/index/index_center.jpg')
                        },
                        {
                            id: 0,
                            url: require('@/icon/index/index_center.jpg')
                        },
                        {
                            id: 0,
                            url: require('@/icon/index/index_center.jpg')
                        },
                        {
                            id: 0,
                            url: require('@/icon/index/index_center.jpg')
                        }
                    ]
                },
                {
                    id: 0,
                    name: 'SuperArilo',
                    time: '2021-10-30  18:06',
                    content: '如果您需要手动触发砖石布局重绘（例如，如果您的磁贴元素量或内容已更改），您现在可以使用方法。截至0.11.8，您可以通过要触发重绘的方块的 ID。',
                    image:[
                        {
                            id: 0,
                            url: require('@/icon/index/index_center.jpg')
                        },
                        {
                            id: 0,
                            url: require('@/icon/index/index_center.jpg')
                        },
                        {
                            id: 0,
                            url: require('@/icon/index/index_center.jpg')
                        }
                    ]
                }
            ],
            releasePng: require('@/icon/index/release.png'),
            showWriteBox: false,
            imageList: [],
            userDynamic: require('@/icon/index/user_dynamic.png')
        }
    },
    created(){
    },
    mounted(){
    },
    methods:{
        albumFuc(id){
            this.$router.push({path: '/dynamic/comment', query:{id:id}})
        },
        selectFile(e){
            if(e.target.files[0] != undefined){
                this.getBase64(e.target.files[0]).then(resq => {
                    this.imageList.push(resq)
                })
            }
        },
        removeUploadImage(id){
            this.imageList.splice(id,1)
        },
        getBase64(file) {
            return new Promise((resolve, reject) => {
                let reader = new FileReader()
                let fileResult = ""
                reader.readAsDataURL(file)
                reader.onload = function() {
                    fileResult = reader.result;
                }
                reader.onerror = function(error) {
                    reject(error)
                }
                reader.onloadend = function() {
                    resolve(fileResult)
                }
            })
        }
    },
    computed:{
        scrollHeight(){
            return this.$store.getters.windowScrollValueGet
        }
    },
    watch:{
        scrollHeight(n,o){
            if(n + document.body.clientHeight >= document.body.scrollHeight && this.isCountToPage){
                this.showLoading = true
                // setTimeout(() =>{
                //     this.$axios.get('https://www.superarilo.online/api/album/get?page=0').then(resq => {
                //         console.log(resq.data)
                //     })
                //     this.showLoading = false
                // },2000)
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.index-box
{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: wrap;
    align-content: flex-start;
    position: relative;
    overflow: hidden;
    .waterfall-box
    {
        min-height: 90vh;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        .sub-div
        {
            height: auto;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            flex-wrap: wrap;
            align-content: flex-start;
            border-radius: 0.3rem;
            overflow: hidden;
            background-color: #fffcf4;
            margin-bottom: 2rem;
            padding: 0.5rem 1rem 0.5rem 1rem;
            .title-user
            {
                width: 100%;
                height: 3rem;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                .user-head
                {
                    height: 2.2rem;
                    border-radius: 50%;
                    border: solid 1px lightgray;
                }
                .user-name-and-time
                {
                    height: 2.2rem;
                    display: flex;
                    flex-direction: column;
                    margin-left: 0.5rem;
                    span:nth-child(1)
                    {
                        font-size: 0.7rem;
                        margin: 0.1rem 0 0.4rem 0;
                        letter-spacing: 0.03rem;
                    }
                    span:nth-child(2)
                    {
                        font-size: 0.6rem;
                        color: rgb(155, 155, 155);
                    }
                }
            }
            .content
            {
                width: 100%;
                display: flex;
                justify-content: flex-start;
                align-items: flex-start;
                white-space:normal;
                word-break:break-all;
                word-wrap:break-word;
                font-size: 0.65rem;
                color: rgb(119, 119, 119);
                letter-spacing: 0.06rem;
                line-height: 1.1rem;
            }
            .user-image-box
            {
                width: 100%;
                height: auto;
                display: flex;
                align-items: flex-start;
                flex-wrap: wrap;
                align-content: flex-start;
                margin-top: 0.5rem;
                .image
                {
                    width: 6.25rem;
                    height: 6.25rem;
                    overflow: hidden;
                    margin: 0 0.2rem 0.5rem 0.2rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    img
                    {
                        max-width: none !important;
                        display: inline-block;
                        vertical-align: middle;
                    }
                }
                .repace
                {
                    width: 6.25rem;
                    margin: 0 0.2rem 0.5rem 0.2rem;
                }
            }
            .dynamic-data
            {
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-wrap: wrap;
                align-content: center;
                border-top: dashed 0.1rem lightslategray;
                .top-div
                {
                    width: 100%;
                    height: 2rem;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    div
                    {
                        height: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        span
                        {
                            font-size: 0.62rem;
                            font-weight: 600;
                            margin: 0 0.5rem 0 0.5rem;
                            letter-spacing: 0.08rem;
                            color: rgb(77, 77, 77);
                        }
                        img
                        {
                            max-height: 60%;
                            cursor: pointer;
                        }
                    }
                }
                .bottom-div
                {
                    width: 100%;
                    height: auto;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    span
                    {
                        font-size: 0.6rem;
                        color: rgb(76, 112, 179);
                    }
                }
            }
        }
    }
    .loading_animate-enter-active
    {
        transition-delay: 0.4s !important;
        animation: flipInX 0.4s;
    }
    .loading_animate-leave-active
    {
        animation: flipOutY 0.4s;
    }
    .release-img
    {
        width: 2.5rem;
        height: 2.5rem;
        background-color: white;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        transition: all 0.3s;
        box-shadow: 0 0 0.3rem rgb(10, 10, 10);
        position: fixed;
        left: 0;
        bottom: 0;
        margin: 0 0 1rem 2rem;
        img
        {
            max-height: 40%;
        }
    }
    .release-img:hover
    {
        transform: scale(1.2);
    }
    .write-box
    {
        height: 15.5rem;
        background-color: white;
        border-radius: 0.3rem 0.3rem 0 0;
        position: fixed;
        bottom: 0;
        box-shadow: 0 0 0.3rem rgb(37, 37, 37);
        padding: 0 1rem 0 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        align-content: center;
        .title
        {
            width: 100%;
            height: 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .left-title-inf
            {
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                span
                {
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 0.75rem;
                    letter-spacing: 0.3rem;
                    font-weight: 600;
                    color: rgb(48, 90, 92);
                    margin-left: 0.5rem;
                }
                img
                {
                    height: 80%;
                    max-height: 80%;
                }
            }
            .right-close
            {
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                i
                {
                    cursor: pointer;
                    transition: all 0.3s;
                }
                i:hover
                {
                    color: #409EFF;
                }
            }
        }
        .content
        {
            width: 100%;
            height: 11rem;
            display: flex;
            justify-content: center;
            align-items: center;
            align-content: center;
            flex-wrap: wrap;
            .top-user-head-and-input
            {
                width: 100%;
                height: 5rem;
                display: flex;
                justify-content: space-around;
                align-items: flex-start;
                .left-user-head
                {
                    height: 3rem;
                    max-height: 3rem;
                    border-radius: 50%;
                    margin: 0 1rem 0 0;
                }
                textarea
                {
                    outline: none;
                    resize: none;
                    width: 100%;
                    height: 100%;
                    letter-spacing: 0.06rem;
                    font-size: 0.65rem;
                    font-family: Microsoft YaHei;
                    line-height: 1.1rem;
                    border: none;
                    white-space:normal;
                    word-break:break-all;
                    word-wrap:break-word;
                }
            }
            .bottom-upload-image
            {
                width: 100%;
                height: 6rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                align-content: space-between;
                flex-wrap: wrap;
                padding: 0.5rem;
                overflow-y: scroll;
                overflow-x: hidden;
                label
                {
                    width: 4rem;
                    height: 4rem;
                    border: dashed darkgray 0.1rem;
                    border-radius: 1rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    transition: all 0.3s;
                    position: relative;
                    margin: 0;
                    margin-bottom: 0.5rem;
                    i
                    {
                        transition: all 0.3s;
                    }
                    input
                    {
                        opacity: 0;
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        filter: alpha(opacity=0);
                    }
                }
                label:hover
                {
                    i
                    {
                        color: #409EFF;
                    }
                }
                .image
                {
                    width: 4rem;
                    height: 4rem;
                    overflow: hidden;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 1rem;
                    margin-bottom: 0.5rem;
                    position: relative;
                    z-index: 100;
                    border: none;
                    img
                    {
                        max-width: none !important;
                        display: inline-block;
                        vertical-align: middle;
                        border: 0;
                    }
                    .close-div
                    {
                        width: 1.5rem;
                        height: 1.5rem;
                        background-color: white;
                        position: absolute;
                        right: 0;
                        top: 0;
                        border-radius: 0 0 0 1rem;
                        z-index: 111;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        cursor: pointer;
                        i
                        {
                            transition: all 0.3s;
                            font-size: 0.7rem;
                        }
                    }
                    .close-div:hover
                    {
                        i
                        {
                            color: #409EFF;
                        }
                    }
                }
                .repace
                {
                    width: 4rem;
                    margin-bottom: 0.5rem;
                }
            }
        }
        .buttom-box
        {
            width: 100%;
            height: 2.5rem;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            .button
            {
                width: 4rem;
                height: 1.5rem;
                background-color: #b3d8ff;
                margin-right: 1rem;
                font-size: 0.65rem;
                letter-spacing: 0.08rem;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 0.5rem;
                cursor: pointer;
                color: #409eff;
                transition: all 0.3s;
                border: solid 0.05rem #409eff;
            }
            .button:hover
            {
                color: white;
                background-color: #409eff;
            }
        }
    }
}
@media screen and (min-width:1400px)
{
    .index-box
    {
        .write-box
        {
            width: 30rem;
        }
        .waterfall-box
        {
            width: 90%;
            .sub-div
            {
                width: 22rem;
                .user-image-box
                {
                    justify-content: space-between;
                }
            }
        }
    }
}
@media screen and (max-width:1400px) and (min-width:1200px)
{
    .index-box
    {
        .write-box
        {
            width: 30rem;
        }
        .waterfall-box
        {
            width: 90%;
            .sub-div
            {
                width: 22rem;
                .user-image-box
                {
                    justify-content: space-between;
                }
            }
        }
    }
}
@media screen and (max-width:1200px) and (min-width:936px)
{
    .index-box
    {
        .write-box
        {
            width: 30rem;
        }
        .waterfall-box
        {
            width: 90%;
            .sub-div
            {
                width: 22rem;
                .user-image-box
                {
                    justify-content: space-between;
                }
            }
        }
    }
}
@media screen and (max-width:936px) and (min-width:767px)
{
    .index-box
    {
        .write-box
        {
            width: 90%;
        }
        .waterfall-box
        {
            width: 100%;
            .sub-div
            {
                width: 18rem;
                .user-image-box
                {
                    justify-content: space-around;
                }
            }
        }
    }
}
@media screen and (max-width:767px) and (min-width:676px)
{
    .index-box
    {
        .write-box
        {
            width: 90%;
        }
        .waterfall-box
        {
            width: 90%;
            .sub-div
            {
                width: 100%;
                .user-image-box
                {
                    justify-content: space-around;
                }
            }
        }
    }
}
@media screen and (max-width:676px)
{
    .index-box
    {
        .write-box
        {
            width: 90%;
        }
        .waterfall-box
        {
            width: 100%;
            .sub-div
            {
                width: 100%;
                .user-image-box
                {
                    justify-content: space-around;
                }
            }
        }
    }
}
</style>