import { createStore } from 'vuex'
import AuthService from '@/services/AuthService'
import axios from 'axios'

const api_endpoint = "http://127.0.0.1:8000"

export default createStore({
  state: {
    data: []
  },
  getters: {
    posts: (state) => state.data
  },
  mutations: {
    fetch(state, {res}){
      state.data = res.data
    }
  },
  actions: {
    async fetchPosts({commit}, payload){
        let headers = AuthService.getApiHeader()
        let url = api_endpoint + '/api/posts/' + payload
        let res = await axios.get(url,headers)
        if(res.status == 200){
          commit("fetch", {res})
        }
    }
  },
  modules: {
  }
})
