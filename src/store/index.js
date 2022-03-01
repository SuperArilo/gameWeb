import { createStore } from 'vuex'
export default createStore({
    state:{
        isPhone: null,
        windowScrollValue: null,
        frsIcon: 'http://image.superarilo.icu/frs.png',
        indexBg: 'http://image.superarilo.icu/index.jpg',
        userInfo: null,
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
        frsIconGet:state => state.frsIcon,
        indexBgGet:state => state.indexBg,
        userInfoGet:state => state.userInfo,
        serverTeamListGet:state => state.serverTeamList,
    },
    mutations:{
        isPhoneSet(state,value){
            state.isPhone = value
        },
        windowScrollValueSet(state,value){
            state.windowScrollValue = value
        },
        userInfoSet(state,value){
            state.userInfo = value
        }
    },
    actions:{
    }
})
