import axiosApi from '@/api/axios'
const user = {
  state: {
    userInfo: "",
  },
  mutations: {
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    }
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
  }
}
export default user
