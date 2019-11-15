import router from './router'
import cookies from '@/utils/auth'
import axios from '@/api/axios'
import store from './store'

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }else {
    document.title = ''
  }
  let token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJITEpDIiwiZXhwIjoxNTc0MDc2ODgzLCJ1c2VyIjoiMDIzY2RiOTkxMTk5NDBhMWIwZTBlYjRiNWY2MDA5OTUifQ.RXjxqjbGcx49zNRMfatEtLD1F1OdihqMVuOmb7j3FA3KcatxWTGUWrQUA3Dv0CYrjbWXj4uG8aD8kv7b3Vv03g"
  cookies.setToken(token)
  if(token && !store.getters.userInfo){
    store.dispatch('getUserInfo').then(response => {
      console.log(response)
      next()
    })
  }

  next()
})

