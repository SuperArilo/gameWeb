import request from '@/util/axios.js'
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
//媒体管理器获取图片
export const userImageGet = (params) => {
    return request({
        url: '/media/manager/list',
        method: 'get',
        params: params,
        paramsSerializer: params => {
            return qs.stringify(params, {arrayFormat: 'repeat'})
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