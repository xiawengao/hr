import axios from 'axios'
import { Message } from 'element-ui'
const TimeOut = 3600 // 定义超时时间

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: TimeOut
})

service.interceptors.request.use()
// 响应拦截器
service.interceptors.response.use(response => {
  // axios 默认添加了 一层data
  const { success, message, data } = response.data
  console.log('response.data', response.data)
  if (success) {
    return data
  } else {
    // 业务已经错误了 不能进then  应该进catch
    Message.error(message)
    return Promise.reject(new Error(message))
  }
}, error => {
  Message.error(error.message) // 提示错误信息
  return Promise.reject(error)
})
export default service
