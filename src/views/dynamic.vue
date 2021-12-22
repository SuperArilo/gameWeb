<template>
    <div class="index-box" :style="{backgroundImage:`url(${indexBg})`}">
        <div class="center-box">
            <div class="top-tips">
                <span>动态发表</span>
                <span>在这里可以发布您的个人动态以及你的日常，如有疑问也可以直接回复</span>
            </div>
            <div class="center-content-box">
                <div class="left-router">
                    <router-view v-slot="{ Component }">
                        <transition enter-active-class="animate__animated router_animate-enter-active" leave-active-class="animate__animated router_animate-leave-active">
                            <component :is="Component" />
                        </transition>
                    </router-view>
                </div>
                <div class="right-user">
                    <div class="user-inf-box">
                        <div class="user-bacground">
                            <img :src="indexBg"/>
                        </div>
                        <div class="user-head">
                            <img src="../icon/head/stranger10.jpg"/>
                        </div>
                        <span class="user-name">这次换你听歌</span>
                        <span class="user-introduction">这是你的简介语句这是你的简介语句这是你的简介语句这是你的简介语句这是你的简介语句这是你的简介语句</span>
                    </div>
                    <div class="tag-box">
                        <span class="title-span">分类标签</span>
                        <div class="tag-content">
                            <span class="tag-sub-item">杰哥</span>
                            <span class="tag-sub-item">Van♂</span>
                            <span class="tag-sub-item">Deep Dark Fansty</span>
                            <span class="tag-sub-item">That's Good ♂</span>
                            <span class="tag-sub-item">单身狗</span>
                            <span class="tag-sub-item">情头一盒</span>
                            <span class="tag-sub-item">不要做舔狗</span>
                            <span class="tag-sub-item">萝卜</span>
                            <span class="tag-sub-item">菜菜</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="release-img" @click="showWriteBox =! showWriteBox">
            <i class="fa fa-pencil"></i>
        </div>
        <transition name="el-zoom-in-bottom">
            <div class="write-box" v-if="showWriteBox">
                <div class="title">
                    <div class="left-title-inf">
                        <img :src="userDynamic"/>
                        <span>发表动态</span>
                    </div>
                    <div class="right-close">
                        <i class="fa fa-close" @click="showWriteBox = false"></i>
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
                                <i class="fa fa-close"></i>
                            </div>
                            <img :src="item"/>
                        </div>
                        <label for="file-input">
                            <i class="fa fa-cloud-upload"></i>
                            <input type="file" @change="selectFile" ref="fileInput">
                        </label>
                    </div>
                </div>
                <div class="buttom-box">
                    <span class="button">发布</span>
                </div>
            </div>
        </transition>
        <footer-bottom/>
    </div>
</template>
<script>
import loading from '@/components/loading.vue'
import FooterBottom from '../components/footerBottom.vue'
export default {
    components:{
        loading,
        FooterBottom
    },
    data(){
        return{
            page: 0,
            data:[],
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
            showWriteBox: false,
            imageList: [],
            userDynamic: require('@/icon/index/user_dynamic.png'),
            indexBg: require('@/icon/index/index_center.jpg'),
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
                    this.$refs.fileInput.value =''
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
    },
    watch:{
    }
}
</script>
<style lang="scss" scoped>
.index-box
{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    padding-top: 2rem;
    background-repeat: no-repeat;
    background-position: top;
    background-attachment: fixed;
    background-size: cover;
    .center-box
    {
        width: 60rem;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-wrap: wrap;
        align-content: flex-start;
        transition: width 0.3s;
        margin-bottom: 2rem;
        .top-tips
        {
            width: 100%;
            height: 8rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            border-radius: 0.5rem;
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
            background-image: url('../icon/index/index_center.jpg');
            padding: 1rem;
            span
            {
                color: #ffffff;
                letter-spacing: 0.1rem;
                text-align: center;
            }
            span:nth-child(1)
            {
                font-size: 1.4rem;
                
            }
            span:nth-child(2)
            {
                font-size: 0.65rem;
                margin-top: 0.5rem;
            }
        }
        .center-content-box
        {
            width: 100%;
            margin-top: 1rem;
            display: flex;
            .left-router , .right-user
            {
                border-radius: 0.2rem;
                overflow: hidden;
            }
            .left-router
            {
                .router_animate-enter-active
                {
                    animation: bounceInLeft 0.4s;
                }
                .router_animate-leave-active
                {
                    animation: bounceOutRight 0.4s;
                }
            }
            .right-user
            {
                display: flex;
                flex-direction: column;
                align-items: center;
                flex-wrap: wrap;
                padding-bottom: 0.3rem;
                .user-inf-box
                {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    flex-wrap: wrap;
                    align-items: center;
                    background-color: #ffffff;
                    padding-bottom: 1rem;
                    .user-bacground
                    {
                        width: 100%;
                        height: 6rem;
                        overflow: hidden;
                        position: relative;
                        z-index: 5;
                        img
                        {
                            width: 100%;
                            object-fit: cover;
                            filter: blur(0.05rem);
                        }
                    }
                    .user-head
                    {
                        width: 3rem;
                        height: 3rem;
                        margin-top: -1.5rem;
                        overflow: hidden;
                        border-radius: 50%;
                        position: relative;
                        z-index: 10;
                        img
                        {
                            width: 100%;
                            object-fit: cover;
                        }
                    }
                    .user-name
                    {
                        width: 100%;
                        display: flex;
                        justify-content: center;
                        font-size: 0.65rem;
                        margin: 0.5rem 0 0.5rem 0;
                    }
                    .user-introduction
                    {
                        width: 75%;
                        text-align: center;
                        font-size: 0.55rem;
                        color: rgb(100, 100, 100);
                    }
                }
                .tag-box
                {
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: flex-start;
                    flex-wrap: wrap;
                    align-content: flex-start;
                    background-color: #ffffff;
                    margin-top: 1rem;
                    .title-span
                    {
                        width: 100%;
                        display: flex;
                        flex-direction: column;
                        font-size: 0.75rem;
                        padding: 0.5rem;
                        font-weight: bold;
                    }
                    .title-span::after
                    {
                        content: "";
                        width: 2rem;
                        height: 0.2rem;
                        background-color: #3773f3;
                        border-radius: 0.3rem;
                    }
                    .tag-content
                    {
                        width: 100%;
                        display: flex;
                        justify-content: flex-start;
                        align-items: flex-start;
                        flex-wrap: wrap;
                        padding: 0.5rem;
                        .tag-sub-item
                        {
                            height: 1.5rem;
                            min-height: 1.5rem;
                            margin: 0.3rem;
                            padding: 0.3rem 0.5rem;
                            font-size: 0.6rem;
                            border-radius: 0.3rem;
                            border: solid 0.05rem #dfdfdf;
                            text-align: left;
                            letter-spacing: 0.04rem;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            cursor: pointer;
                            transition: all 0.3s;
                        }
                        .tag-sub-item:hover
                        {
                            color: #ffffff;
                            background-color: #3773f3;
                        }
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
        i
        {
            font-size: 1rem;
            color: rgb(24, 94, 224);
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
                display: grid;
                grid-row-gap: 1rem;
                grid-column-gap: 1rem;
                grid-template-columns: repeat(auto-fill, 4rem);
                overflow-y: scroll;
                overflow-x: hidden;
                padding: 0 1rem 0 1rem;
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
                    border: dashed darkgray 0.05rem;
                    img
                    {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
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
        .center-box
        {
            width: 55rem;
            .center-content-box
            {
                justify-content: space-between;
                align-items: flex-start;
                .left-router
                {
                    width: 36rem;
                }
                .right-user
                {
                    width: 18rem;
                }
            }
        }
        .write-box
        {
            width: 30rem;
        }
    }
}
@media screen and (max-width:1400px) and (min-width:1200px)
{
    .index-box
    {
        .center-box
        {
            width: 45rem;
            .center-content-box
            {
                justify-content: space-between;
                align-items: flex-start;
                .left-router
                {
                    width: 29rem;
                }
                .right-user
                {
                    width: 15rem;
                }
            }
        }
        .write-box
        {
            width: 30rem;
        }
    }
}
@media screen and (max-width:1200px) and (min-width:936px)
{
    .index-box
    {
        .center-box
        {
            width: 75%;
            .center-content-box
            {
                flex-direction: column;
                align-items: center;
                .left-router
                {
                    width: 100%;
                }
                .right-user
                {
                    width: 100%;
                    margin-top: 1rem;
                }
            }
        }
        .write-box
        {
            width: 30rem;
        }
    }
}
@media screen and (max-width:936px)
{
    .index-box
    {
        .center-box
        {
            width: 90%;
            .center-content-box
            {
                flex-direction: column;
                align-items: center;
                .left-router
                {
                    width: 100%;
                }
                .right-user
                {
                    width: 100%;
                    margin-top: 1rem;
                }
            }
        }
        .write-box
        {
            width: 90%;
        }
    }
}
</style>