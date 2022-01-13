import { createStore } from 'vuex'
export default createStore({
    state:{
        isPhone: null,
        windowScrollValue: null,
        userNoLogin: require('@/views/icon/head/onLogin.png'),
        indexBg: require('@/views/icon/index/index_center.jpg')
    },
    getters:{
        isPhoneGet:state => state.isPhone,
        windowScrollValueGet:state => state.windowScrollValue,
        userNoLoginGet:state => state.userNoLogin,
        indexBgGet:state => state.indexBg
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
