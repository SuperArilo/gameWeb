// import axios from 'axios'
axios.defaults.withCredentials = true;
const service= axios.create({
    baseURL: 'http://localhos/api/',
    timeout: 5000
});
axios().catch(error => {
  const { message } = error;
  if (error.code === 'ECONNABORTED' && message.indexOf('timeout')> -1){
    // 超时处理，可以直接弹出错误或者重新发起一次请求
    alert("请求超时！请检查网络问题")
        //  let newHttp= new Promise(function (resolve){
        //      resolve()
        //  })
            //  newHttp实例执行完成后会再次执行
            //  返回一个promise实例，同时重新发起请求，config请求配置，包扩请求头和请求参数
        //  return newHttp.then(function (){
        //      return  axios.create({baseURL: 'https://some-domain.com/api/',timeout: 5000});
        //  })

  }
    // 若不是超时,则返回未错误信息
    return Promise.reject(error);
})
service.interceptors.request.use(config => {

   //  if (localStorage.getItem('token')) {

   //     config.headers.ACCESS_TOKEN = localStorage.getItem('token');

  //  }
    return config;
}, error => {
    console.log(error);
    return Promise.reject();
});
service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return Promise.resolve(response.data);
        } else {
            return Promise.reject(response);
        }
    },
    error => {
        if (
           400 <= error.response.status <500
        ) {
            alert("用户信息过期，请重新登陆");
            // 清除token
            // localStorage.removeItem("token");
            // 跳转登录
            setTimeout(() => {
            //   window.location.href = "/login";
            }, 1000);
        } else {
            if (error.response.status >= 500) {
                alert("服务器开小差了，请稍后再试！");
            } else {
                alert("服务器开小差了，请稍后再试！");
                return Promise.reject(error)
            }
        }
    }
);

export default service;