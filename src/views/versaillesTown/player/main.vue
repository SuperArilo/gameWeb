<template>
    <div class="main-index-box">
        <div class="center-content">
            <div class="public-title">
                <span>基本信息</span>
                <i class="fas fa-child"/>
            </div>
            <div class="base-info">
                <div class="sub-item">
                    <span>用户组</span>
                    <span>总发表动态</span>
                    <span>MC Java ID</span>
                    <span>点赞</span>
                    <span>注册时间</span>
                </div>
                <div class="sub-item">
                    <span>腐竹</span>
                    <span>143</span>
                    <span>Arilo007</span>
                    <span>114514</span>
                    <span>2022-1-10</span>
                </div>
            </div>
            <span class="line"></span>
            <div class="public-title">
                <span>发表过的动态</span>
                <i class="fas fa-map"/>
            </div>
            <div class="sended-dynamic">
                <div class="choice-menu">
                    <div class="left-right-func">
                        <el-dropdown class="dropdown-menu" :hide-on-click="false" @command="dropdownMenuFunc">
                            <span>{{dropdownMenuTitle}}
                                <i class="fa fa-chevron-down"/>
                            </span>
                            <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item v-for="(item,index) in dropdownMenu" :key="index" :command="item.order">{{item.title}}</el-dropdown-item>
                            </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </div>
                </div>
                <div class="dynamic-content">
                    <div class="dynamic-sub-item" v-for="item in 4" :key="item">
                        <span class="dynamic-title">这是动态的标题这是动态的标题</span>
                        <div class="dynamic-data">
                            <div class="dy-sub-item">
                                <i class="far fa-calendar-alt"/>
                                <span>2021-1-10</span>
                            </div>
                            <div class="dy-sub-item">
                                <i class="far fa-comment-dots"/>
                                <span>10 条评论</span>
                            </div>
                            <div class="dy-sub-item">
                                <i class="fas fa-tag"/>
                                <span>被刺</span>
                            </div>
                            <div class="dy-sub-item">
                                <i class="far fa-eye"/>
                                <span>114514 浏览</span>
                            </div>
                        </div>
                    </div>
                    <el-pagination background layout="prev, pager, next" :total="100" :small="this.$store.getters.isPhoneGet"/>
                </div>
            </div>
            <span class="line"></span>
            <div class="public-title">
                <span>留言板</span>
                <i class="fas fa-sign"/>
            </div>
            <div class="user-message">
                <div class="render-edit" ref="dyEditTool"></div>
            </div>
            <span class="line"></span>
            <div class="message-content">
                <div class="no-message" v-if="false">
                    <span>暂无留言，说点什么吧~</span>
                    <i class="far fa-dizzy"/>
                </div>
                <div class="message-sub-item">
                    <div class="left-head">
                        <img :src="userHead"/>
                    </div>
                    <div class="right-content">
                        <div class="main-message-content render-by-edit" v-html="text"></div>
                        <div class="data-show">
                            <div class="sub-item">
                                <i class="fas fa-paper-plane"></i>
                                <span>腐竹 留言</span>
                            </div>
                            <div class="sub-item">
                                <i class="far fa-calendar-alt"></i>
                                <span>2021-12-21</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import E from 'wangeditor'
export default {
    data(){
        return{
            userHead: require('@/views/icon/head/stranger18.jpg'),
            dropdownMenuTitle: '最新',
            dropdownMenu:[
                {
                    id: 0,
                    title: '最新',
                    order: 'newest'
                },
                {
                    id: 0,
                    title: '热门',
                    order: 'hottest'
                },
                {
                    id: 0,
                    title: '发布时间倒序',
                    order: 'ASC'
                },
                {
                    id: 0,
                    title: '发布时间正序',
                    order: 'DESC'
                }
            ],
            editor: null,
            dyAllLoading: false,
            text: ''
        }
    },
    mounted(){
        const editor = new E(this.$refs.dyEditTool)
        editor.config.showLinkImg = false
        editor.config.height = 200
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
            this.text = newHtml
        }
        editor.create()
        this.editor = editor
    },
    methods:{
        dropdownMenuFunc(command, number, object){
            if(!this.dyAllLoading){
                this.dyAllLoading = true
                this.dropdownMenuTitle = object.target.textContent
                this.dyAllLoading = false
            }
        }
    },
    beforeDestroy() {
        this.editor.destroy()
        this.editor = null
    }
}
</script>
<style lang="scss" scoped>
.main-index-box
{
    width: 100%;
    display: flex;
    align-content: flex-start;
    justify-content: center;
    flex-wrap: wrap;
    .center-content
    {
        display: flex;
        align-content: flex-start;
        flex-wrap: wrap;
        margin: 0.5rem 0;
        .public-title
        {
            width: 100%;
            height: 1.5rem;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            span, i
            {
                height: 100%;
                display: flex;
                align-items: center;
            }
            span
            {
                font-size: 0.75rem;
                font-weight: bold;
                letter-spacing: 0.03rem;
            }
            i
            {
                font-size: 0.8rem;
                margin-left: 0.5rem;
            }
        }
        .line
        {
            width: 100%;
            height: 0.03rem;
            background-color: rgba(68, 68, 68, 0.473);
            margin: 1rem 0;
        }
        .base-info
        {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            align-content: flex-start;
            padding: 0.2rem 0;
            .sub-item
            {
                width: 100%;
                display: flex;
                justify-content: space-around;
                span
                {
                    width: calc(100% / 5);
                    display: flex;
                    justify-content: center;
                    text-align: center;
                }
            }
            .sub-item:nth-child(1)
            {
                span
                {
                    color: #676767;
                    letter-spacing: 0.03rem;
                    font-size: 0.6rem;
                }
            }
            .sub-item:nth-child(2)
            {
                margin-top: 0.5rem;
                span
                {
                    letter-spacing: 0.03rem;
                    font-size: 0.61rem;
                }
            }
        }
        .sended-dynamic
        {
            width: 100%;
            display: flex;
            align-content: flex-start;
            flex-wrap: wrap;
            .choice-menu
            {
                width: 100%;
                height: 1.5rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 1rem;
                .left-right-func
                {
                    height: 100%;
                    display: flex;
                    .dropdown-menu
                    {
                        min-width: 5rem;
                        height: 1.5rem;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        border-radius: 1rem;
                        transition: all 0.3s;
                        span
                        {
                            font-size: 0.6rem;
                            height: 100%;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            cursor: pointer;
                            i
                            {
                                color: #3773f3;
                                margin-left: 0.3rem;
                            }
                        }
                    }
                }
                .menu-sub-item
                {
                    height: 100%;
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                    span , i
                    {
                        height: 100%;
                        display: flex;
                        align-items: center;
                    }
                    span
                    {
                        font-size: 0.6rem;
                    }
                    i
                    {
                        font-size: 0.8rem;
                        margin-left: 0.2rem;
                        color: #3773f3;
                    }
                }
            }
            .dynamic-content
            {
                width: 100%;
                display: flex;
                align-content: flex-start;
                flex-wrap: wrap;
                justify-content: center;
                .dynamic-sub-item
                {
                    width: 100%;
                    display: flex;
                    align-content: flex-start;
                    flex-wrap: wrap;
                    background-color: rgb(248, 248, 248);
                    box-shadow: 0 0 0.1rem black;
                    padding: 0.3rem;
                    border-radius: 0.2rem;
                    margin-bottom: 0.5rem;
                    .dynamic-title
                    {
                        width: 100%;
                        max-width: 70%;
                        display: flex;
                        font-size: 0.62rem;
                        letter-spacing: 0.03rem;
                    }
                    .dynamic-data
                    {
                        width: 100%;
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        flex-wrap: wrap;
                        margin-top: 0.3rem;
                        .dy-sub-item
                        {
                            display: flex;
                            align-items: center;
                            height: 1.2rem;
                            margin: 0 0.3rem;
                            i
                            {
                                font-size: 0.7rem;
                            }
                            span
                            {
                                font-size: 0.6rem;
                                margin-left: 0.2rem;
                            }
                        }
                    }
                }
            }
        }
        .user-message
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
        .message-content
        {
            width: 100%;
            display: flex;
            align-content: flex-start;
            flex-wrap: wrap;
            .message-sub-item
            {
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin: 0.5rem 0;
                .left-head
                {
                    width: 2.5rem;
                    height: 2.5rem;
                    min-width: 2.5rem;
                    border-radius: 50%;
                    overflow: hidden;
                    img
                    {
                        width: 100%;
                    }
                }
                .right-content
                {
                    width: 100%;
                    display: flex;
                    align-content: flex-start;
                    flex-wrap: wrap;
                    position: relative;
                    padding: 0 0.5rem;
                    background-color: rgba(255, 255, 255, 0.7);
                    border-left: solid 0.2rem darkgreen;
                    border-right: solid 0.2rem darkgreen;
                    box-shadow: 0 0.1rem 0.8rem -0.6rem black;
                    .main-message-content
                    {
                        width: 100%;
                        min-height: 2rem;
                        word-break: break-all;
                        letter-spacing: 0.03rem;
                    }
                    .data-show
                    {
                        width: 100%;
                        height: 1.2rem;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        .sub-item
                        {
                            height: 100%;
                            display: flex;
                            align-items: center;
                            span , i
                            {
                                height: 100%;
                                display: flex;
                                align-items: center;
                            }
                            span
                            {
                                margin-left: 0.3rem;
                                font-size: 0.55rem;
                            }
                            i
                            {
                                font-size: 0.7rem;
                            }
                        }
                    }
                }
                .right-content::after
                {
                    content: "";
                    position: absolute;
                    border-top: solid 0.3rem transparent;
                    border-right: solid 0.4rem darkgreen;
                    border-bottom: solid 0.3rem transparent;
                    left: -0.6rem;
                    top: 1rem;
                }
            }
            .no-message
            {
                width: 100%;
                height: 8rem;
                display: flex;
                justify-content: center;
                align-items: center;
                span , i
                {
                    height: 100%;
                    display: flex;
                    align-items: center;
                }
                span
                {
                    font-size: 0.6rem;
                }
                i
                {
                    font-size: 0.8rem;
                    margin-left: 0.5rem;
                }
            }
        }
    }
}
@media screen and (min-width:1400px)
{
    .main-index-box
    {
        .center-content
        {
            width: 70%;
            .message-content
            {
                .message-sub-item
                {
                    .right-content
                    {
                        margin-left: 1.5rem;
                    }
                }
            }
        }
    }
}
@media screen and (max-width:1400px) and (min-width:1200px)
{
    .main-index-box
    {
        .center-content
        {
            width: 70%;
            .message-content
            {
                .message-sub-item
                {
                    .right-content
                    {
                        margin-left: 1.5rem;
                    }
                }
            }
        }
    }
}
@media screen and (max-width:1200px) and (min-width:936px)
{
    .main-index-box
    {
        .center-content
        {
            width: 65%;
            .message-content
            {
                .message-sub-item
                {
                    .right-content
                    {
                        margin-left: 1.5rem;
                    }
                }
            }
        }
    }
}
@media screen and (max-width:936px) and (min-width:767px)
{
    .main-index-box
    {
        .center-content
        {
            width: 90%;
            .message-content
            {
                .message-sub-item
                {
                    .right-content
                    {
                        margin-left: 1rem;
                    }
                }
            }
        }
    }
}
@media screen and (max-width:767px) and (min-width:676px)
{
    .main-index-box
    {
        .center-content
        {
            width: 90%;
            .message-content
            {
                .message-sub-item
                {
                    .right-content
                    {
                        margin-left: 0.8rem;
                    }
                }
            }
        }
    }
}
@media screen and (max-width:676px)
{
    .main-index-box
    {
        .center-content
        {
            width: 90%;
            .message-content
            {
                .message-sub-item
                {
                    .right-content
                    {
                        margin-left: 0.8rem;
                    }
                }
            }
        }
    }
}
</style>