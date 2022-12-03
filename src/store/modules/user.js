import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getUserInfo } from '@/api/user'
const state = {
  token: getToken(), // 设置token的初始状态 token持久化， 放到缓存中
  userInfo: {}
}

const mutations = {
  // 设置token
  setToken(state, token) {
    state.token = token
    setToken(token)
  },
  // 删除缓存
  removeToken(state) {
    state.token = null
    removeToken()
  },
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo
  },
  removeUserInfo(state) {
    state.userInfo = {}
  }
}

const actions = {
  async login (context, data) {
    const result = await login(data)
    // console.log(result)
    context.commit('setToken', result)
  },
  // 获取用户资料
  async getUserInfo(context) {
    const result = await getUserInfo()
    context.commit('setUserInfo', result)
    return result
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
