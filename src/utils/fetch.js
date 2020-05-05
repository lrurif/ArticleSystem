import axios from 'axios'
// 创建axios实例
let baseUrl = "http://127.0.0.1:3000";
// let tokenString = window.localStorage.getItem('storagetoken');
const service = axios.create({
  baseURL: baseUrl, // api的base_url
  timeout: 15000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  config.headers = {'Content-Type': 'application/json'}
  // Do something before request is sent
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    if (response.data.code == 403) {
      window.location.href = "/"
    }

    return response;
  },
  error => {
    // vue.$Message.error({
    //   message: '1212',
    //   duration: 5 * 1000,
    //   closable: true
    // })
    return Promise.reject(error)
  }
)

export default service
