axios.defaults.withCredentials = false
const service = axios.create({
    baseURL: 'http://www.superarilo.icu:3090/api',
    // baseURL: 'https://www.itrong.love/api',
    // baseURL: 'http://localhost/api',
    timeout: 15000
})
service.interceptors.request.use(config => {
    if(localStorage.getItem('token') === null && sessionStorage.getItem('token') === null){
        return config
    }
    if (localStorage.getItem('token')) {
        config.headers.token = localStorage.getItem('token')
        return config
    }
    if(sessionStorage.getItem('token')){
        config.headers.token = sessionStorage.getItem('token')
        return config
    }
}, error => {
    return Promise.reject(error.response.data)
})
service.interceptors.response.use( response => {
        return Promise.resolve(response.data)
    }, error => {
        if(error.response){
            return Promise.reject(error.response.data)
        } else {
            error.message = '网络错误!'
            return Promise.reject(error)
        }
    }
)
export default service