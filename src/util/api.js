import request from '@/util/axios.js'
import qs from 'qs'
//查询动态
export const dynamicGet = (params) => {
    return request({
        url: '/dynamic/list',
        method: 'get',
        params: params,
        paramsSerializer: params => {
            return qs.stringify(params, {arrayFormat: 'repeat'})
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