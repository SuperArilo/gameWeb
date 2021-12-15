import request from '@/util/axios.js'

export const getImgCode = () => {
    return request({
        url: '/image/code',
        method: 'get',
    })
}
export const getPhoneCode = (query) => {
    return request({
        url: '/user/messageCode',
        method: 'post',
        data: query
    })
}

