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
        </div>
    </div>
</template>
<script>
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
            ]
        }
    },
    methods:{
        routerBackFunc() {
            this.$router.push('/dynamic')
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
        textarea , input
        {
            width: 100%;
            min-width: 100%;
            font-size: 0.7rem;
            padding: 0.5rem 0.5rem;
            outline: none;
            border: none;
            margin: 0.5rem 0;
            font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
        }
    }
}
</style>