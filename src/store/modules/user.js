import { login, getUserInfo, getUserDetailById } from '@/api/user'
import { getToken, removeToken, setTimeStamp, setToken } from '@/utils/auth'

export default {
  namespaced: true,
  state: {
    token: getToken(),
    userInfo: {} // 这里定义一个空对象 为什么要定义一个空对象
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      setToken(token)
    },
    removeToken(state) {
      state.token = null
      removeToken()
    },
    setUserInfo(state, result) {
      // 更新一个对象
      state.userInfo = result
      // state.userInfo = { ...result } // 浅拷贝
    },
    removeUserInfo(state) {
      state.userInfo = {}
    }
  },
  actions: {
    async login(context, data) {
      const result = await login(data)
      console.log('result', result)
      context.commit('setToken', result)
      setTimeStamp()
    },
    // 退出登录
    lgout(context, data) {
      context.commit('removeToken')
      context.commit('removeUserInfo')
    },
    async getUserInfo(context, data) {
      const result = await getUserInfo()
      // 获取用户详情 用户的详情数据
      const baseInfo = await getUserDetailById(result.userId)
      const obj = { ...result, ...baseInfo }
      context.commit('setUserInfo', obj)
      return result // 这里为什么要使用return呢 这里是给我们后期做权限的时候 留下的伏笔
    }
  }
}
