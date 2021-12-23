import { createStore } from 'vuex'
import { ElMessage } from 'element-plus'
export default createStore({
    state:{
        isPhone: null,
        windowScrollValue: null,
        //动态标签传入
        dyTagList:[],
        //动态标签的id
        dyIdTagList:[],
        //动态标签冷却
        dyIsClick: false
    },
    getters:{
        isPhoneGet:state => state.isPhone,
        windowScrollValueGet:state => state.windowScrollValue,
        dyTagListGet:state => state.dyTagList,
        dyIsClickGet:state => state.dyIsClick
    },
    mutations:{
        isPhoneSet(state,value){
            state.isPhone = value
        },
        windowScrollValueSet(state,value){
            state.windowScrollValue = value
        },
        dyTagListSet(state,value){
            if(state.dyIdTagList.length !== 0){
                if(state.dyIdTagList.indexOf(value.id) === -1){
                    state.dyTagList.unshift(value)
                    state.dyIdTagList.unshift(value.id)
                } else if(state.dyIdTagList.length > 2) {
                    ElMessage({
                        message:'标签不能添加了！',
                    })
                } else if (state.dyIdTagList.indexOf(value.id) === 0) {
                    ElMessage({
                        message: value.title + '标签 已经添加了哦！',
                    })
                }
            } else {
                state.dyTagList.unshift(value)
                state.dyIdTagList.unshift(value.id)
            }
        },
        dyTagListDel(state,value){
            let index = state.dyIdTagList.indexOf(value)
            state.dyTagList.splice(index,1)
            state.dyIdTagList.splice(index,1)
        },
        dyIsClickSet(state,value){
            state.dyIsClick = value
        }
    },
    actions:{
    }
})
