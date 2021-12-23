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
        //动态页面检测活动冷却标识
        dyAllLoading: false,
    },
    getters:{
        isPhoneGet:state => state.isPhone,
        windowScrollValueGet:state => state.windowScrollValue,
        dyTagListGet:state => state.dyTagList,
        dyAllLoadingGet:state => state.dyAllLoading,
    },
    mutations:{
        isPhoneSet(state,value){
            state.isPhone = value
        },
        windowScrollValueSet(state,value){
            state.windowScrollValue = value
        },
        dyTagListSet(state,value){
            let length = state.dyIdTagList.length
            if(length === 0){
                state.dyIdTagList.unshift(value.id)
                state.dyTagList.unshift(value)
                state.dyAllLoading = true
                setTimeout(() => {
                    ElMessage({
                        message: '加载了4篇内容',
                        type: 'success'
                    })
                    state.dyAllLoading = false
                },2000)
            } else if (length > 2){
                ElMessage({
                    message: '最高支持筛选3个标签！',
                })
            } else {
                let isHave = state.dyIdTagList.indexOf(value.id)
                if(isHave === -1){
                    state.dyIdTagList.unshift(value.id)
                    state.dyTagList.unshift(value)
                    state.dyAllLoading = true
                    setTimeout(() => {
                        ElMessage({
                            message: '加载了4篇内容',
                            type: 'success'
                        })
                        state.dyAllLoading = false
                    },2000)
                } else if (isHave === 0){
                    ElMessage({
                        message: value.title + '标签 已经添加了哦！',
                    })
                }
            }
        },
        dyTagListDel(state,value){
            let index = state.dyIdTagList.indexOf(value)
            state.dyTagList.splice(index,1)
            state.dyIdTagList.splice(index,1)
        },
        dyAllLoadingSet(state,value){
            state.dyAllLoading = value
        },
    },
    actions:{
    }
})
