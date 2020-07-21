import axiosApi from '@/api/axios'
import cookies from '@/utils/auth'
import {environmentAI, environment} from '@/filters'
import {AlertModule} from 'vux'

const user = {
  state: {
    userInfo: {
      grade: 0
    },
    selectItem: 'all',//商品类别判断  all 为精选
    agentInfo: {},//商户信息
    token: "",
    brandId: "",
    LzfUserName: "",//立之付用户名称
  },
  mutations: {
    SET_LZUSERNNAME: (state, LzfUserName) => {
      state.LzfUserName = LzfUserName
    },
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

        /*token = ''
        token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJITEpDIiwiZXhwIjoxNTk1Mjk5MTcwLCJ1c2VyIjoiMDIzY2RiOTkxMTk5NDBhMWIwZTBlYjRiNWY2MDA5OTUifQ.xDenRJ4PA2_D4yJxjpTI-XvHeg4NJyaMonPp324CejMyLFAL8zFUh7UqS04m5Y4lQqpefYff3ZVP74kXFsPVjA'
        let userName = '测试名称'
        commit('SET_LZUSERNNAME', userName)
        resolve(token)

        return*/


        let data = cookies.getBrandId()
        if (data && data == 'deb99c1be8a748a59f760485fd49df15') {
          //立之付登录相关
          ly.getAuthCode({
            "merchantId": "2020042900101187",
            "scopes": ["lzfApiUserInfo", "lzfApiChooseBankCard"],
            "callback": ((result) => {
              //处理授权码
              //  console.log(result,'result')
              if (result.status == 1) {
                axiosApi.getKWebToken(result.code).then(res1 => {
                  if (res1.code == 200) {
                    let accessToken = res1.data.accessToken
                    let openId = res1.data.openId

                    axiosApi.getKUser(accessToken, openId).then(res2 => {
                      if (res2.code == 200) {

                        let phone = res2.data.phone
                        let userName = res2.data.userName
                        commit('SET_LZUSERNNAME', userName)

                        let brandId = data

                        axiosApi.registerLoginH5(phone, brandId).then(res3 => {
                          if (res3.code == 200) {
                            resolve(res3.data)
                          } else {
                            AlertModule.show({
                              title: '提示',
                              content: res3.message,
                            })
                          }
                        })
                      } else {
                        AlertModule.show({
                          title: '提示',
                          content: res2.message,
                        })
                      }
                    })

                  } else {
                    AlertModule.show({
                      title: '提示',
                      content: res1.message,
                    })
                  }
                })
              } else {
                AlertModule.show({
                  title: '提示',
                  content: result.failureDetails,
                })
              }
            })
          });

        } else {
          if (environmentAI() == 1 && environment() == 2) {
            try {
              token = window.app.getToken()
              commit('SET_TOKEN', token)
              resolve(token)
            } catch (err) {
              token = ''
              resolve(token)
            }
          } else if (environmentAI() == 2 && environment() == 2) {
            try {
              token = window.app.getToken()
              commit('SET_TOKEN', token)
              resolve(token)
            } catch (err) {
              window.setToken = (params) => {
                if (params) {
                  commit('SET_TOKEN', params)
                  resolve(params)
                } else {
                  resolve('')
                }
              }
              window.webkit.messageHandlers.getToken.postMessage({})
            }
          } else {
            token = ''
            resolve(token)
          }
        }
      })
    },
  }
}
export default user
