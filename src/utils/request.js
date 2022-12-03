// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import store from '@/store'
import axios from 'axios'
import { Message } from 'element-ui'
// 创建一个axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
}) // 创建一个axios的实例
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
  }
  return config
}, error => {
  return Promise.reject(error)
}) // 请求拦截器
service.interceptors.response.use(response => {
  // axios默认加了一层data
  // console.log(response)
  const { success, message, data } = response.data
  if (success) {
    return data
  } else {
    Message.error(message)
    return Promise.reject(new Error(message))
  }
}, error => {
  Message.error(error.message)
  return Promise.reject(error)
}) // 响应拦截器
export default service // 导出axios实例
