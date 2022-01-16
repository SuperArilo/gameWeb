// import axios from 'axios'
axios.defaults.withCredentials = true
const service = axios.create({
    baseURL: 'https://www.itrong.love:1234/api',
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': 'http://localhost:8080',
        'Access-Control-Allow-Headers': 'POST,GET',
    }
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