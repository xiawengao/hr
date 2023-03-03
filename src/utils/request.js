import axios from 'axios'

const TimeOut = 3600 // 定义超时时间

const service = axios.create({
  baseURL: '/api',
  timeout: TimeOut
})

export default service
