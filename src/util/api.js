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
export const uploadImage = (query) => {
    return request({
        url: '/file/upload/image',
        method: 'post',
        data: query
    })
}