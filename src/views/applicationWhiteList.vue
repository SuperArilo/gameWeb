<template>
    <div class="rule-box" :style="{backgroundImage:`url(${this.$store.getters.indexBgGet})`}">
        <div class="center-box">
            <div class="show-center-title">
                <span>白名单申请</span>
                <span>您可以在这里申请白名单，请详细阅读服务器公约</span>
            </div>
            <div class="show-rule-content render-by-edit" v-html="linshi"></div>
            <div class="check-box">
                <span>我已阅读并遵守规则和同意此公约</span>
                <el-checkbox v-model="agree" size="large"></el-checkbox>
            </div>
            <div class="user-input-box">
                <div class="title">
                    <span>MCID绑定输入</span>
                    <i class="fas fa-archive"/>
                </div>
                <input-box class="input-sub-item" v-model="McJavaId" title="MC Java Id" :length="16" inputType="text"/>
                <div class="button-box">
                    <div class="button-confirm" @click="sendToServerConfirm">
                        <span v-if="!sendToServerWorkNow">确认</span>
                        <i v-if="sendToServerWorkNow" class="fas fa-circle-notch fa-spin"/>
                    </div>
                </div>
            </div>
        </div>
        <footer-bottom/>
    </div>
</template>
<script>
import inputBox from '@/components/inputBox.vue'
import footerBottom from '@/components/footerBottom.vue'
import { ElMessage  } from 'element-plus'
export default {
    components: { footerBottom , inputBox },
    data(){
        return{
            McJavaId: '',
            spanStyleAdd: null,
            sendToServerWorkNow: false,
            agree: false,
            linshi: '<h1 style="text-align:center;"><font color="#f9963b">凡尔赛服务器公约</font></h1><blockquote><p><i><font color="#46acc8">Tips</font></i><i>：玩家进入游戏后，按下键盘上Tab键会显示mspt数值。通俗的讲就是服务器处理游戏一个循环任务的所需要的时间。这个数值越小越好，如果高于40，服务器在线玩家会有明显的卡顿感觉。如果数值居高不下，请联系管理员排查问题所在！</i></p></blockquote><p><font color="#4d80bf" style="background-color: rgb(255, 255, 255);">欢迎您来到游玩凡尔赛服务器！</font><blockquote><p><i>服务器地址：<span><font color="#c24f4a">mc.superarilo.icu:25565</font></span></i><br/></p><p>QQ群：784241849</p></blockquote><p><font color="#c24f4a">服务器为您服务，您应当阅读并遵守《 玩家协议》，本协议具有合法的合同效应。</font></p><p><font color="#c24f4a">请您务必仔细，谨慎阅读、并理解各个条款内容。</font></p><blockquote><p>一、<i>您进入服务器会视为你已阅读并同意本协议的所有条款。否则您将无权进入服务器！</i></p><p>二、<i>如果您未满18岁，请在法定监护人的陪同下阅读本协议！</i></p><p>三、<i>请您务必仔细且谨慎阅读、理解各条款内容，特别是免除，或者限制责任的条款！如出现争议和法律适用条款！</i></p><p>四、<i>您不应以未阅读本协议的内容或是未获得“ 服务器”对您询问和解答等理由，主张本协议无效，或者撤销本协议。</i></p></blockquote><p><br/></p><p>一、本源</p><blockquote><p><i>1.1&nbsp;本协议：指的是本协议正文，《玩家协议》、游戏规则以及修订版本。</i></p><p><i>1.2 游戏规则：指技术组提供的不定时发布且修订的关于服务器的用户守则、通知等内容。</i></p><p><i>1.3&nbsp;提供方：指向您提供 服务器以及服务的 服务器负责组，负责人，在本协议中简称为：“开发组”。</i></p><p><i>1.4&nbsp;服务器以及服务：指开发组向您提供游戏相关的各项内容以及服务器相关的各项在线服务。</i></p><p><i>1.5 游戏数据：指您在玩 服务器过程中被服务器记录的各项数据。</i></p><p><i>1.6 您：又称为“玩家”或者是“用户”指被授权进入 服务器享受服务器内容以及服务器服务的人。</i></p><p><i>1.7 单独协议：您在适用我们的某一特定服务时，该服务可能会有另外的单独协议，相关规则等，您应该同样遵守。</i></p></blockquote><p><font color="#c24f4a">您对本文任何条例，规则的接受，即视为您对全部的协议以及相关的规则接受！</font></p><p><font color="#c24f4a"><br/></font></p><p>二、协议的变更和生效</p><blockquote><p><i>2.1 有权利在必要时变更本协议条款，并在相关页面及平台公开通知通告。</i></p><p><i>2.2 您可以在 官网和论坛的相关页面查看最新版的协议条款。</i></p><p><i>2.3 本协议条款变更后，如果您继续游玩。则视为您已接受变更后的协议，如果您不接受变更后的协议，应当立即停止进入服务器。</i></p></blockquote><p><br/></p><p>三、账号保护协议</p><blockquote><p><i>3.1 如果您要游玩 服务器，您就需要使用服务器内注册的游戏账号进行游戏。</i></p><p><i>3.2 游玩时请遵守《网络游戏管理暂行规定》以及文化部《网络游戏服务格式化协议必备条款》</i></p><p><i>3.3 您应当妥善保管您的游戏账号，包括您游戏账号对应的密码。再被盗后应该第一时间通知在线管理。</i></p><p><i>3.4 您应充分理解并同意，为了提高您游戏账号的安全水平， 右权利将有关插件应用到服务器中。</i></p><p><i>3.5 不保证这些安全保障能完全杜绝您的游戏账号被他人窃取或者丢失。</i></p><p><i>3.6 您应该理解并同意，在服务器内开发组依照相关规则以及条例封禁您的账号，可能会导致您游戏账号下的游戏数据以及。</i></p></blockquote><p><font color="#c24f4a">相关信息被删除，以及相关权益上市的损失由您自行承担， 服务器以及 服务器开发组不承担任何责任。</font></p><p><br/></p><p>四、用户信息收集、适用及保护协议<br/></p><blockquote><p><i>4.1 保护用户个人信息是开发组的基本原则。我们将按照本协议以及《隐私政策》的规定收集、适用、保护您的个人信息。</i></p><p><i>4.2 在您注册账号或者使用本服务器的过程中，可能需要填写一些必要的信息。若国家法律法规有特殊规定的，您需要填写真实身份信息。若您填写的信息不完整，则无法使用或者使用过程中被限制。</i></p><p><i>4.3 一般情况下，您可以随时浏览，修改自己提交的信息。</i></p><p><i>4.4 我们将运用各种安全技术和程序建立完善的管理制度来保护您的个人信息安全，以免遭受未经允许的访问、适用或者暴露。</i></p><p><i>4.5&nbsp;保证不对外公开或者向任何第三方提供您的个人信息，但是存在以下情况除外：</i></p><p><i>（1）公开或者提供相关信息之前获得您的许可；（2）根据法律或者政策的规定而公开或者提供；</i></p><p><i>（3）根据国家权力机关要求公开或者提供； （4）根据本协议其他条款约定而公开或者提供；</i></p></blockquote><p><br/></p><p>五、服务器产权协议<br/></p><blockquote><p><i>5.1 您充分了解并同意，您必须为自己游戏账号下的一切行为负责，包括您所发表的任何内容以及由此产生的任何后果。</i><i>您应当对游戏中的内容自行加以判断，并承担使用 服务器而硬气的所有风险。包括因对 游戏内容</i><i>的正确性、完整性或者实用性的依赖而产生的风险。 服务器以及 服务器开发组不会对因前述风险而导致</i><i>的任何损失或者损害承担任何责任。</i></p><p><i>5.2 您可以按照本协议的约定实用我的世界，除此之外不得进行任何请饭我的世界游戏的知识产权的行为，或是进行其他有损于 或者其他第三方合作权益的行为。</i></p><p><i>5.3 除非法律允许或minecraft书面许可，您不得从事下列行为</i></p><p><i>（1）删除我的世界软件以及其副本上关于著作权的信息；</i></p><p><i>（2）对游戏我的世界进行反向工程、反向编译或者其他方式尝试发现我的世界的源代码；</i></p><p><i>（3）对游戏我的世界进行扫描、探查、测试以及检测、发现、查找其中可能存在的BUG或者弱点；</i></p><p><i>（4）对游戏我的世界或者我的世界运行过程中释放任何终端内存中的数据、软件运行过程中客户端与服务器端互交的数据</i><i>，以及软件运行所必须的系统数据，进行复制、修改、增加、删除、链接运行，或创作任何衍生作品；</i></p><p><i>5.4 您在适用 服务器服务过程中有如下行为的，开发组将视情节严重程度，依据本协议及相关游戏规则，对您做出</i><i>暂时或者永久性禁止登陆、删除游戏账号及数据等处理措施，情节严重的将移交有关行政管理机关给予行政处罚或追究您的</i><i>形式责任。</i></p><p><i>（1）已某种方式暗示或者伪称为开发组内部人员或某种特殊身份，企图得到不正当利益或影响其他用户权益的行为；</i></p><p><i>（2）您在 服务器游戏中适用非法或不正当词语、字符等，包括用户角色名；</i></p><p><i>（3）已任何方式破坏 服务器或影响 服务器服务的正常进行；</i></p><p><i>（4）传播各种非法外挂的行为，如：透视、飞行、加速、连点、使用违规脚本等第三方软件及辅助；</i></p><p><i>（5）传播非法言论或不正当信息；</i></p><p><i>（6）盗取他人游戏账号、游戏物品等；</i></p><p><i>（7）私自进行游戏账号交易；</i></p><p><i>（8）在其他行业内被广泛认可的不正当行为，无论是否被本协议或者游戏规则明确列明。</i></p></blockquote><p><br/></p><p>六、开发组产权协议<br/></p><blockquote><p><i>6.1 是开发组游戏的知识产权权利人以及负责人。 游戏的一切著作权、商标权、专利权、商业秘密等知识产权，以及 游戏相关的所有信息内容、图片、插件、MOD、音频、视频、图标、界面设置、网页模板等有关数据或电子文档等均受中华人民共和国法规和相关的国际条约保护、 享有上述知识产权。如 右请饭其他方版权的情况，请发送邮件到superarilo@189.cn要求删除我方相关侵权行为。</i></p><p><i>6.2 请您充分理解并认同，服务器在修复漏洞，增加服务器，日常维护等正常原因下开发组有权关闭服务器维护。</i></p></blockquote><p><br/></p><p>七、游戏规则协议</p><blockquote><p><i>7.1 禁止在游戏内无意义刷屏、骚扰刷屏。</i></p><p><i>7.2 禁止在游戏内破坏公共设施以及活动场地。</i></p><p><i>7.3 禁止在游戏内假扮管理。</i></p><p><i>7.4 禁止在游戏内传播不健康内容以及不正当言行。</i></p><p><i>7.5 请您充分理解与认同，为了迎合与营造游戏相关内容，在游戏内被人杀死、抢劫、骗钱（除官方商店外）、拆家，等一律不在开发组管理范围。</i></p><p><i>7.6 不得采用任何手段暴力破坏服器</i></p><p><i>7.7 建家尽量建在小镇里，不得在小镇下面挖掘矿洞，如果已经挖了，请补齐。</i></p><p><i>7.8 不得破坏小镇包括小镇16格之内的地形</i></p><p><i>7.9 禁止建造大型红石机器以及大型卡服机器，大型刷怪塔，以及影响服务器正常运行的任何机器</i></p><p><i>7.10 不得在服务器中偷盗其他玩家的个人财产，您也可以建造属于你的仓库，但是箱子数量最好不要超过16（包括任何可以存储物品的箱子）。解释：箱子过多，服务器处理的时间就越长，会导致其他玩家莫名其妙的卡顿。</i></p><p><i>7.11 禁止无意义的跑图，以及任何世界任何坐标超过15000的跑图</i></p><p><i>7.12 当服务器玩家数量超过4人时，如有人在挂塔以及影响服务器运行的设施时，请停止，并等到服务器玩家小于3人时候继续，而且不允许长时间挂塔</i></p><p><i>7.13 可以建造服务器的基础设施，尽量不要重复建造基础设施。如果你已经建造基础设施，可以才小镇中心留言板那粘贴你的基础设施，以供服务器玩家使用。如果你建造了重复设施，请在3日内进行拆除。</i></p><p><i>7.14 小镇上空禁止建造任何空置域以及任何住宅，如有建造，请在3天内拆除。建造空置域，需要提交前置申请</i></p><p><i>7.15 禁止使用第三方或者游戏漏洞来刷物品以及破坏环境，以及在游戏内有一切影响游戏正常运行的行为</i></p><p></p><p><i>7.16 上述条款对所有“用户”均有效，上述情况违反者视情节严重给予暂时或永久性地封禁或删除游戏相关内容</i></p></blockquote>'
        }
    },
    methods:{
        sendToServerConfirm(){
            if(!this.sendToServerWorkNow){
                this.sendToServerWorkNow = true
                if(this.agree){
                    if(this.McJavaId !== ''){
                        setTimeout(() => {
                            this.sendToServerWorkNow = false
                            ElMessage.info('嘿嘿，此功能还未开发完成，请到群里找腐竹手动添加白名单吧！')
                        },1000)
                    } else {
                        ElMessage.warning('填写的信息有空白，请检查！')
                        this.sendToServerWorkNow = false
                    }
                } else {
                    ElMessage.warning('您尚未同意服务器公约')
                    this.sendToServerWorkNow = false
                }
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.rule-box
{
    width: 100%;
    display: flex;
    justify-content: center;
    align-content: flex-start;
    flex-wrap: wrap;
    background-repeat: no-repeat;
    background-position: top;
    background-size: cover;
    background-attachment: fixed;
    .center-box
    {
        background-color: rgba(240,240,240,0.6);
        .show-center-title
        {
            width: 100%;
            height: 8rem;
            display: flex;
            justify-content: center;
            align-items: center;
            align-content: center;
            flex-wrap: wrap;
            span
            {
                width: 100%;
                text-align: center;
                display: flex;
                justify-content: center;
                color: white;
                letter-spacing: 0.1rem;
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
        .show-rule-content
        {
            width: 100%;
            margin-top: 1rem;
            padding: 0.5rem;
            background-color: rgba(255, 255, 255,1);
        }
        .check-box
        {
            width: 100%;
            height: 1.5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #ffffff;
            span
            {
                height: 100%;
                display: flex;
                align-items: center;
                font-size: 0.62rem;
                margin-right: 0.5rem;
                letter-spacing: 0.05rem;
            }
        }
        .user-input-box
        {
            width: 100%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            align-content: center;
            flex-wrap: wrap;
            background-color: #ffffff;
            padding: 1rem;
            .title
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
            .button-box
            {
                width: 100%;
                display: flex;
                justify-content: flex-start;
                flex-wrap: wrap;
                margin-top: 1rem;
                .button-confirm
                {
                    width: 4rem;
                    height: 1.5rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: #b3d8ff;
                    color: #3399ff;
                    border: solid 0.05rem #409eff;
                    border-radius: 0.2rem;
                    transition: all 0.3s;
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
                    }
                }
                .button-confirm:hover
                {
                    color: white;
                    background-color: #409eff;
                }
            }
        }
    }
}
@media screen and (min-width:1400px)
{
    .rule-box
    {
        .center-box
        {
            width: 60%;
            margin: 2rem 0;
        }
    }
}
@media screen and (max-width:1400px) and (min-width:1200px)
{
    .rule-box
    {
        .center-box
        {
            width: 60%;
            margin: 2rem 0;
        }
    }
}
@media screen and (max-width:1200px) and (min-width:936px)
{
    .rule-box
    {
        .center-box
        {
            width: 65%;
            margin: 2rem 0;
        }
    }
}
@media screen and (max-width:936px) and (min-width:767px)
{
    .rule-box
    {
        .center-box
        {
            width: 100%;
        }
    }
}
@media screen and (max-width:767px) and (min-width:676px)
{
    .rule-box
    {
        .center-box
        {
            width: 100%;
        }
    }
}
@media screen and (max-width:676px)
{
    .rule-box
    {
        .center-box
        {
            width: 100%;
        }
    }
}
</style>