import router from './router'
import cookies from '@/utils/auth'
import axios from '@/api/axios'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式

const whiteList = ['payment','callbackPageS','errorPayPage','merchantInfo','GoodsDetails','commodityTypeList'] // 白名单
router.beforeEach((to, from, next) => {
  let token = ""
  try {
    token = window.app.getToken() || ""
  } catch (e){
    token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJITEpDIiwiZXhwIjoxNTg5MzM0NTg1LCJ1c2VyIjoiNjAyYTY5OTQwMWNmNDQ4MWE3NGI3ZDNlZmM2OGQzYWQifQ.RhWvXLjMP7q4X7L-uNCCrXNOBfPUDRc8sMG6ytPuN1YaYc_B9vkmsIvWCW8xtqh5hGgT7qwCYEXnVgsoGVE5-Q"
  }
  cookies.setToken(token)
  if(token !="" && !store.getters.userInfo.phone && whiteList.indexOf(to.name)==-1 && false){
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

