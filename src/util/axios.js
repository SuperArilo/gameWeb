axios.defaults.withCredentials = false
const service = axios.create({
    baseURL: 'https://www.itrong.love:1234/api',
    timeout: 20000
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
    return Promise.reject(error)
})
service.interceptors.response.use( response => {
        return Promise.resolve(response.data)
    }, error => {
        return Promise.reject(error)
    }
)
export default service