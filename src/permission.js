import router from './router'
import cookies from '@/utils/auth'
import axios from '@/api/axios'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式

const whiteList = ['/payment','/callbackPageS','/errorPayPage','/merchantInfo','/AddShippingAddress'] // 白名单
console.log(1)

router.beforeEach((to, from, next) => {
  let token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJITEpDIiwiZXhwIjoxNTc3MTczOTIzLCJ1c2VyIjoiMDIzY2RiOTkxMTk5NDBhMWIwZTBlYjRiNWY2MDA5OTUifQ.qt3cd16U1-sx8d1eYRdq2x8WUCmE84TDtdoNX4dkW0yFz0TNNSAhaRPEDREqCkmXotg1uzYrheZzyfEhQ-MKZw"
 /* try {
    token = window.app.getToken() || ""
  } catch (e){
    token = ""
  }*/
  console.log(whiteList.indexOf(to.path),1)
  cookies.setToken(token)
  if(token !="" && !store.getters.userInfo.phone && whiteList.indexOf(to.path)==-1){
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

