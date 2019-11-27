import router from './router'
import cookies from '@/utils/auth'
import axios from '@/api/axios'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式

const whiteList = ['/login'] // 不重定向白名单
console.log(1)

router.beforeEach((to, from, next) => {
  /*if (to.meta.title) {
    document.title = to.meta.title
    console.log(document.title)
  }else {
    document.title = ''
  }*/
  // let token = ""
  let token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJITEpDIiwiZXhwIjoxNTc1MzM5MDU5LCJ1c2VyIjoiMDIzY2RiOTkxMTk5NDBhMWIwZTBlYjRiNWY2MDA5OTUifQ.u9T16ia2fUmHOEbu7XQFcw0NPVoXZjM3QaksL3UcUDZPLjvebbZMrDXEJOPq5c9kk4PmDCKSGusLha8DpnFQDw"
 /* try {
    token = window.app.getToken() || ""
  } catch (e){
    token = ""
  }*/
  cookies.setToken(token)
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

/*router.beforeResolve((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
    console.log(document.title)
  } else {
    document.title = ''
  }
})*/

