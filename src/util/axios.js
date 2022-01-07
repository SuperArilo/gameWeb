// import axios from 'axios'
axios.defaults.withCredentials = true
const service = axios.create({
    baseURL: 'https://www.superarilo.icu:1234/api',
    timeout: 5000
})
service.interceptors.request.use(config => {
   //  if (localStorage.getItem('token')) {

   //     config.headers.ACCESS_TOKEN = localStorage.getItem('token');

  //  }
    return config
}, error => {
    return Promise.reject(error)
})
service.interceptors.response.use(
    response => {
        return Promise.resolve(response.data)
    },
    error => {
        return Promise.reject(error)
    }
)
export default service