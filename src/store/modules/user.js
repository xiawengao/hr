import { login } from '@/api/user'

export default {
  namespaced: true,
  state: {
    token: localStorage.getItem('TOKEN') || ''
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      localStorage.setItem('TOKEN', token)
    },
    removeToken(state) {
      state.token = null
      localStorage.removeItem('TOKEN')
    }
  },
  actions: {
    async login(context, data) {
      const result = await login(data)
      console.log('result', result)
      context.commit('setToken', result)
    }
  }
}
