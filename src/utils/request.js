import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'
import { getTimeStamp } from './auth'
const TimeOut = 3600 // 定义超时时间

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(config => {
  // config 是请求的配置信息
  // 注入我们的token
  const token = store.getters.token
  if (store.getters.token) {
    // 只有在有token的情况下 才有必要去检查时间戳是否超时
    const isTimeOut = isCheckTimeOut()
    if (isTimeOut) {
      store.dispatch('user/lgout')
      router.push('/login')
      return Promise.reject(new Error('Token认证超时'))
    }
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config // 必须要返回的
}, error => {
  return Promise.reject(error)
})
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
  // error 信息 里面的 response 的对象
  if (error.response && error.response.data && error.response.data.code === 10002) {
    // 当等于10002的时候 表示 后端告诉我token超时了
    store.dispatch('user/lgout') // 退出登录
    router.push('/login')
  } else {
    Message.error(error.message) // 提示错误信息
  }
  return Promise.reject(error)
})

// 是否超时
// 超时逻辑 （当前时间 - 缓存时间）> 超时时间   || 没有超时
function isCheckTimeOut() {
  const currenTime = Date.now()
  const storeTime = getTimeStamp()
  return (currenTime - storeTime) / 100 > TimeOut
}
export default service
