import { loginByAccount, getUserInfo } from '@/network/api/member'
import { getMemberMessagesPushAll } from '@/network/api/common'

const state = {
  token: localStorage.getItem('pest_club-token'),
  // 登录用户信息
  userInfo: {},
  // 推送消息（全部）
  messageTotal: ''
}

const mutations = {
  // 保存 token
  setToken(state, token) {
    state.token = token // 保存到 vuex
    localStorage.setItem('pest_club-token', token) // 同步给缓存
  },
  // 移除 token
  removeToken(state) {
    state.token = null
    localStorage.removeItem('pest_club-token')
  },
  // 保存用户信息
  setUserInfo(state, data) {
    state.userInfo = data
  },
  // 删除用户信息
  removeUserInfo(state) {
    state.userInfo = {}
  },
  // 保存推送消息总数
  setMessageTotal(state, data) {
    state.messageTotal = data
  },
  // 删除推送消息总数
  removeMessageTotal(state) {
    state.messageTotal = ''
  }
}

const actions = {
  // 登录请求
  async login({ dispatch, commit }, data) {
    const { data: result } = await loginByAccount(data)
    if (result) {
      // 保存token
      commit('setToken', result.token)
      // 获取用户信息
      dispatch('getUserInfo')
      // 获取推送消息数量
      dispatch('getMemberMessagesPushAll')
    }
  },
  // 登出
  logout(context) {
    // 移除token
    context.commit('removeToken')
    // 删除用户信息
    context.commit('removeUserInfo')
    // 删除推送消息
    context.commit('removeMessageTotal')
  },
  // 获取用户信息
  async getUserInfo(context) {
    const { data } = await getUserInfo()
    context.commit('setUserInfo', data)
  },
  // 获取系统推送消息(全部)
  async getMemberMessagesPushAll(context) {
    const {
      data: { data: mesData }
    } = await getMemberMessagesPushAll()
    if (mesData.total !== 0) {
      context.commit('setMessageTotal', mesData.total)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
