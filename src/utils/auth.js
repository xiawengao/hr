import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'
const TimeKey = 'hrsaas-timestamp-key'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getTimeStamp() {
  return Cookies.get(TimeKey)
}

export function setTimeStamp() {
  return Cookies.set(TimeKey, Date.now())
}
