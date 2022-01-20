import { createStore } from 'vuex'
export default createStore({
    state:{
        isPhone: null,
        windowScrollValue: null,
        userNoLogin: require('@/views/icon/head/onLogin.png'),
        indexBg: require('@/views/icon/index/index_center.jpg'),
        userInfo:{
            uid: 11,
            userName: '这次换你听歌',
            eMail: '',
            class: 1,
            className: '腐竹',
            userHead: require('@/views/icon/head/onLogin.png'),
            javaMcId: 'Arilo007',
            mcUUID: 'e71018558b58497581424ce802bf4252'
        },
        serverTeamList:[
            {
                uid: 11,
                javaMcId: 'Arilo007',
                className: '腐竹',
            },
            {
                uid: 102,
                javaMcId: 'BestStarfish280',
                className: '管理员',
            },
            {
                uid: 103,
                javaMcId: 'Single__290',
                className: '管理员',
            },
            {
                uid: 104,
                javaMcId: 'SGJC2374',
                className: '管理员',
            },
            {
                uid: 105,
                javaMcId: 'aom4399',
                className: '管理员',
            }
        ]
    },
    getters:{
        isPhoneGet:state => state.isPhone,
        windowScrollValueGet:state => state.windowScrollValue,
        userNoLoginGet:state => state.userNoLogin,
        indexBgGet:state => state.indexBg,
        userInfoGet:state => state.userInfo,
        serverTeamListGet:state => state.serverTeamList
    },
    mutations:{
        isPhoneSet(state,value){
            state.isPhone = value
        },
        windowScrollValueSet(state,value){
            state.windowScrollValue = value
        }
    },
    actions:{
    }
})
