import axiosApi from '@/api/axios'
import {environmentAI,environment} from '@/filters'
import { AlertModule } from 'vux'

const user = {
  state: {
    userInfo: {
      grade: 0
    },
    selectItem: 'all',
    agentInfo: {},
    token:""
  },
  mutations: {
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_SELECTITEM: (state, data) => {
      state.selectItem = data
    },
    SET_BRANDID: (state, data) => {
      state.brandId = data
    },
    SET_APPNAME: (state, data) => {
      state.appName = data
    },
    SET_AGENTINFO: (state, data) => {
      state.agentInfo = data
    },
    SET_TOKEN: (state, data) => {
      state.token = data
    },
  },
  actions: {
    setAppName({commit}, data) {
      commit('SET_APPNAME', data)
    },
    setBrindId({commit}, data) {
      commit('SET_BRANDID', data)
    },
    getUserInfo({commit}) {
      return new Promise((resolve, reject) => {
        axiosApi.shopUserinfo().then(response => {

          if (response.code == 200) {
            commit('SET_USERINFO', response.data)
            resolve(response)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    getAgentInfo({commit}) {
      return new Promise((resolve, reject) => {
        axiosApi.isAgent().then(response => {
          if (response.code == 200) {
            commit('SET_AGENTINFO', response.data)
            resolve(response)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    SetSelectItem({commit}, data) {
      commit('SET_SELECTITEM', data)
    },
    getToken({commit}) {
      return new Promise((resolve, reject) => {
        let token;

        token = ''
        token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJITEpDIiwiZXhwIjoxNTkxMTUyNDAyLCJ1c2VyIjoiOGI4M2JmM2JmNDI5NGYwMmJmZmQ5NjEzZjAxZmI5ZjAifQ._GG3AFcxQvKpe1UmS3ziOiMHfBCieMYSJn8QSiyLeIADfe3g4qSS7ua5c2Sc7uUI0oGi56OJvLe-ph0yFxwEhQ'
        resolve(token)

        if(environmentAI() == 1 && environment() == 2){
          try{
            token = window.app.getToken()
            commit('SET_TOKEN',token )
            resolve(token)
          }catch (err){
            token = ''
            resolve(token)
          }
        }else if(environmentAI() == 2 && environment() == 2){
          try {
            token = window.app.getToken()
            commit('SET_TOKEN',token )
            resolve(token)
          }catch(err){
            window.setToken = (params)=>{
              if(params){
                commit('SET_TOKEN',params)
                resolve(params)
              }else {
                resolve('')
              }
            }
            window.webkit.messageHandlers.getToken.postMessage({})
          }
        }else {
          token = ''
          resolve(token)
        }
      })
    },
  }
}
export default user
