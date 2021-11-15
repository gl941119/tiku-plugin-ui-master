import { local } from '@/libs/storage'

export default {
  state: {
    token: local.get('token') /* 用户token */,
    user: local.get('user') /* 用户信息 */,
    showNovice: local.get('showNovice') 
  },
  getters: {
    getToken: state => state.token,
    getUser: state => state.user,
    getShowNovice: state => state.showNovice
  },
  mutations: {
    setToken (state, value) {
      state.token = value
      value ? local.set('token', value) : local.remove('token', value)
    },
    setUser (state, value) {
      state.user = value
      value ? local.set('user', value) : local.remove('user', value)
    },
    setShowNovice (state, value) {
      state.showNovice = value
      value ? local.set('showNovice', value) : local.remove('showNovice', value)
    }
  },
  actions: {
    login (state, { token, user }) {
      state.commit('setUser', user)
      state.commit('setToken', token)
    },
    logout (state) {
      state.commit('setUser')
      state.commit('setToken')
    }
  }
}
