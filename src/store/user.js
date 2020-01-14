import axiosApi from '@/api/axios'
const user = {
  state: {
    userInfo: {
      grade:0
    },
    selectItem:'all'
  },
  mutations: {
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_SELECTITEM: (state, data) => {
      state.selectItem = data
    },
  },
  actions: {
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
    SetSelectItem({commit}, data) {
      commit('SET_SELECTITEM', data)
    },
  }
}
export default user
