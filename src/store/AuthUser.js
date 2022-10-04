import { createStore } from 'vuex'
import AuthService from '@/services/AuthService'

let auth_key = 'login-user'
let auth = JSON.parse(localStorage.getItem(auth_key))

const initialState = {
    user: auth ? auth.user: '',
    token: auth ? auth.token: '',
    isAuthen: auth ? true : false
}

export default createStore({
  state: initialState,
  getters: {
    user: (state) => state.user,
    token: (state) => state.token,
    isAuthen: (state) => state.isAuthen
  },
  mutations: {
    loginsuccess(state, user, token){
      state.user = user,
      state.token = token,
      state.isAuthen = true
    },
    logoutsuccess(state){
      state.user = '',
      state.token = '',
      state.isAuthen = false
    }
  },
  actions: {
    async login({commit},{email,password}){
      let res = await AuthService.login({email,password})
      if(res.success){
        commit('loginsuccess',res.user, res.token)
      }
      return res
    },
    async register({commit},payload){
      let res = await AuthService.register(payload)
      if(res.success){
        return res
      }
    },
    async logout({commit}){
      commit('logoutsuccess')
      localStorage.removeItem(auth_key)
      return {
        success: true
      }
    }
  },
  modules: {
  }
})
