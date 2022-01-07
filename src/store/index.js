import { createStore } from 'vuex'
import { ElMessage } from 'element-plus'
import { dynamicGet } from '@/util/api.js'
import qs from 'qs'
export default createStore({
    state:{
        isPhone: null,
        windowScrollValue: null,
        //动态内容
        dyContent:[],
        //动态页面发送到服务器的参数
        dYsendToServerParams:{
            tagIds:[],
            order: 'newest',
            pageNumber: 1,
            pageSize: 10,
        },
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
        dyContentGet:state => state.dyContent,
        dyTagListGet:state => state.dyTagList,
        dyIdTagListGet:state => state.dyIdTagList,
        dyAllLoadingGet:state => state.dyAllLoading,
        dYsendToServerParamsGet:state => state.dYsendToServerParams
    },
    mutations:{
        isPhoneSet(state,value){
            state.isPhone = value
        },
        windowScrollValueSet(state,value){
            state.windowScrollValue = value
        },
        dyContentSet(state,value){
            state.dyContent  = value
        },
        dyTagListSet(state,value){
            let length = state.dyIdTagList.length
            if(length === 0){
                state.dyAllLoading = true
                state.dyIdTagList.unshift(value.id)
                state.dyTagList.unshift(value)
                state.dYsendToServerParams.tagIds = state.dyIdTagList
                this._mutations.sendToServer[0]()
            } else if (length > 2){
                ElMessage({
                    message: '最多支持筛选3个标签！',
                })
            } else {
                let isHave = state.dyIdTagList.indexOf(value.id)
                if(isHave === -1){
                    state.dyAllLoading = true
                    state.dyIdTagList.unshift(value.id)
                    state.dyTagList.unshift(value)
                    this._mutations.sendToServer[0]()
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
            state.dYsendToServerParams.tagIds = state.dyIdTagList
        },
        dyAllLoadingSet(state,value){
            state.dyAllLoading = value
        },
        //动态 order set
        dYsendToServerParamsOrderSet(state,value){
            state.dYsendToServerParams.order = value
        },
        //动态 pageNumber set
        dYsendToServerParamsPageNumberSet(state,value){
            state.dYsendToServerParams.pageNumber = value
        },
        //动态 pageSize set
        dYsendToServerParamsPageSizeSet(state,value){
            state.dYsendToServerParams.pageSize = value
        },
        sendToServer(){
            dynamicGet(this.state.dYsendToServerParams).then(resq => {
                if(resq.flag){
                    setTimeout(() => {
                        this.state.dyContent = resq.data
                        this.state.dyAllLoading = false
                    },2000)
                } else {
                    ElMessage({showClose: true, message: '请求数据失败，请刷新页面重试！若问题依旧，请联系管理员！',type: 'warning'})
                    this.state.dyAllLoading = false
                }
            }).catch(err => {
                ElMessage({showClose: true, message: '请求动态发生错误，请稍后重试！' + err,type: 'error',center: false})
                this.state.dyAllLoading = false
            })
        }
    },
    actions:{
    }
})
