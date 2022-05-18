import request from '@/util/axios.js'
import Qs from "query-string"
//查询动态
export const dynamicGet = (params) => {
    return request({
        url: '/dynamic/list',
        method: 'get',
        params: params,
        paramsSerializer: params => {
            return Qs.stringify(params, {arrayFormat: 'repeat'})
        }
    })
}
//查询动态标签
export const dynamicTagsGet = () => {
    return request({
        url: '/tags/list',
        method: 'get'
    })
}
//根据具体id查询动态
export const dynamicDetailGet = (params) => {
    return request({
        url: '/dynamic/details',
        method: 'get',
        params: params,
        paramsSerializer: params => {
            return Qs.stringify(params, {arrayFormat: 'repeat'})
        }
    })
}
//根据当前动态id去查询当前动态下的评论
export const dynamicCommentGet = (params) => {
    return request({
        url: '/dynamic/comments/list',
        method: 'get',
        params: params,
        paramsSerializer: params => {
            return Qs.stringify(params, {arrayFormat: 'repeat'})
        }
    })
}
//根据当前动态id评论
export const dynamicCommentSet = (query , dynamicId) => {
    return request({
        url: '/dynamic/comments/comment/' + dynamicId,
        method: 'post',
        data: query,
    })
}
//媒体管理器获取图片
export const userImageGet = (params) => {
    return request({
        url: '/media/manager/list',
        method: 'get',
        params: params,
        paramsSerializer: params => {
            return Qs.stringify(params, {arrayFormat: 'repeat'})
        }
    })
}
//媒体管理器上传图片
export const uploadImage = (query) => {
    return request({
        url: '/media/manager/upload/image',
        method: 'post',
        data: query
    })
}
//媒体管理器删除图片
export const deleteImage = (query) => {
    return request({
        url: '/media/manager/remove',
        method: 'post',
        data: query
    })
}
//用户动态发表
export const userPublishDynamic = (query) => {
    return request({
        url: '/dynamic/',
        method: 'post',
        data: query
    })
}
//后台验证码获取，需要发送 6位 随机数
export const verificationGet = (params , method) => {
    return request({
        url: '/verification/image/' + method,
        method: 'get',
        params: params,
        paramsSerializer: params => {
            return Qs.stringify(params, {arrayFormat: 'repeat'})
        }
    })
}
//邮箱验证码发送
export const sendMailCode = (query) => {
    return request({
        url: '/email/code',
        method: 'post',
        data: query
    })
}
//用户注册接口
export const userRegister = (query) => {
    return request({
        url: '/register/user',
        method: 'post',
        data: query
    })
}
//用户登录接口
export const userLogin = (query) => {
    return request({
        url: '/blog/login',
        method: 'post',
        data: query
    })
}
//用户登录状态获取
export const userLognState = () => {
    return request({
        url: '/user/information',
        method: 'get',
    })
}
//用户注销登陆
export const userLogOut = () => {
    return request({
        url: '/blog/logout',
        method: 'get',
    })
}
//用户修改信息接口
export const userModifyInfo = (query , uid) => {
    return request({
        url: '/user/' + uid,
        method: 'post',
        data: query
    })
}
//用户上传头像接口
export const userUploadUserHead = (query) => {
    return request({
        url: '/user/header/upload',
        method: 'post',
        data: query
    })
}
//查询留言内容
export const userMessageGet = (params) => {
    return request({
        url: '/leave-words/list',
        method: 'get',
        params: params,
        paramsSerializer: params => {
            return Qs.stringify(params, {arrayFormat: 'repeat'})
        }
    })
}
//用户留言
export const userSendMessage = (query) => {
    return request({
        url: '/leave-words/',
        method: 'post',
        data: query
    })
}
//用户获取通知
export const userNoticeGet = (params) => {
    return request({
        url: '/inform/list',
        method: 'get',
        params: params,
        paramsSerializer: params => {
            return Qs.stringify(params, {arrayFormat: 'repeat'})
        }
    })
}
//用户申请游戏白名单
export const mcWhitelistAdd = (query) => {
    return request({
        url: '/user/whitelist',
        method: 'post',
        data: query
    })
}
//用户白名单解绑
export const mcWhitelistRemove = () => {
    return request({
        url: '/user/updateWhitelist',
        method: 'post',
        // data: query
    })
}