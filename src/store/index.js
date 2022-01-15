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
            userHead: require('@/views/icon/head/onLogin.png')
        }
    },
    getters:{
        isPhoneGet:state => state.isPhone,
        windowScrollValueGet:state => state.windowScrollValue,
        userNoLoginGet:state => state.userNoLogin,
        indexBgGet:state => state.indexBg,
        userInfoGet:state => state.userInfo
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
