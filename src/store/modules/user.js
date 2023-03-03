import { login } from '@/api/user'

export default {
  state: {
    token: ''
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    removeToken(state) {
      state.token = null
    }
  },
  actions: {
    async login(context, data) {
      const result = await login(data)
      context.commit('setToken', result)
    }
  }
}
