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
                        <transition mode="out-in" name="router_animate">
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
                        <span class="title-span">热门标签</span>
                        <div class="tag-content">
                            <span class="tag-sub-item" v-for="(item,index) in tagList" :key="index" @click="tagFunc(item.id,item.title)">{{item.title}}</span>
                        </div>
                    </div>
                    <div class="dy-lately-box">
                        <span class="title-span">最近发布</span>
                        <div class="lately-content">
                            <span class="lately-item" v-for="(item,index) in 4" :key="index">这是最新的动态</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
            imageList: [],
            userDynamic: require('@/icon/index/user_dynamic.png'),
            indexBg: require('@/icon/index/index_center.jpg'),
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
            ]
        }
    },
    created(){
    },
    mounted(){
    },
    methods:{
        selectFile(e){
            if(e.target.files[0] != undefined){
                this.getBase64(e.target.files[0]).then(resq => {
                    this.imageList.push(resq)
                    this.$refs.fileInput.value =''
                })
            }
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
        },
        tagFunc(id,title){
            if(!this.$store.getters.dyAllLoadingGet){
                if(this.$store.getters.isPhoneGet){
                    setTimeout(() => {
                        document.body.scrollTop = 0
                    },300)
                }
                let object = {id: id,title: title}
                this.$store.commit('dyTagListSet',object)
            }
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
                    animation: fadeInLeft 0.6s;
                }
                .router_animate-leave-active
                {
                    animation: fadeOutRight 0.6s;
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
                .tag-box , .dy-lately-box
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
                }
                .tag-box
                {
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
                .dy-lately-box
                {
                    .lately-content
                    {
                        width: 100%;
                        display: flex;
                        flex-direction: column;
                        flex-wrap: wrap;
                        padding: 0.25rem 0.8rem;
                        .lately-item
                        {
                            width: 100%;
                            display: flex;
                            justify-content: flex-start;
                            text-align: left;
                            font-size: 0.58rem;
                            letter-spacing: 0.03rem;
                            cursor: pointer;
                            transition: all 0.3s;
                            margin-bottom: 0.5rem;
                        }
                        .lately-item:hover
                        {
                            color: darkslateblue;
                            text-decoration:underline;
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
    }
}
</style>