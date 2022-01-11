import { createStore } from 'vuex'
export default createStore({
    state:{
        isPhone: null,
        windowScrollValue: null,
    },
    getters:{
        isPhoneGet:state => state.isPhone,
        windowScrollValueGet:state => state.windowScrollValue,
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
