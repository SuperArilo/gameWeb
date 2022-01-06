import request from '@/util/axios.js'

//查询动态
export const dynamicGet = (params) => {
    return request({
        url: '/dynamic/list',
        method: 'get',
        data: params
    })
}
export const getPhoneCode = (query) => {
    return request({
        url: '/user/messageCode',
        method: 'post',
        data: query
    })
}

