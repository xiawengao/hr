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

/**
 *获取用户资料接口
 * @param {*} token
 * @returns
 */
export function getUserInfo() {
  return request.post('/sys/profile')
}

export function getUserDetailById(userId) {
  return request.get(`/sys/user/${userId}`)
}

export function logout() {

}
