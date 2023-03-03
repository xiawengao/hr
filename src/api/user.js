import request from '@/utils/request'

/**
 * 登录接口的封装
 * @param {} data
 * @returns
 */
export function login(data) {
  // 返回一个promise 对象
  return request.post('/sys/login', data)
}

export function getInfo(token) {

}

export function logout() {

}
