import router from './router'
import cookies from '@/utils/auth'
import axios from '@/api/axios'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }else {
    document.title = ''
  }
  // let token = window.app.getToken()
  let token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJITEpDIiwiZXhwIjoxNTc1MzM5MDU5LCJ1c2VyIjoiMDIzY2RiOTkxMTk5NDBhMWIwZTBlYjRiNWY2MDA5OTUifQ.u9T16ia2fUmHOEbu7XQFcw0NPVoXZjM3QaksL3UcUDZPLjvebbZMrDXEJOPq5c9kk4PmDCKSGusLha8DpnFQDw"
  // let token2 = ""
  /*try {
     token = window.app.getToken() || ""
  } catch (e){
    token = ""
  }*/
  cookies.setToken(token)
  // console.log(token2,"token2")
  if(token !="" && !store.getters.userInfo.phone){
    NProgress.start()
    store.dispatch('getUserInfo').then(response => {
      console.log(response)
      next()
      NProgress.done()
    })
  }else {
    next()
  }
})

