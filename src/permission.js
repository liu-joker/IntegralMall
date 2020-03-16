import router from './router'
import cookies from '@/utils/auth'
import axios from '@/api/axios'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式

const whiteList = ['payment','callbackPageS','errorPayPage','merchantInfo','GoodsDetails','commodityTypeList'] // 白名单
console.log(1)
router.beforeEach((to, from, next) => {

  console.log(to)
  let token = ""
  try {
    token = window.app.getToken() || ""
  } catch (e){
    token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJITEpDIiwiZXhwIjoxNTg0Njk1MDkyLCJ1c2VyIjoiNjAyYTY5OTQwMWNmNDQ4MWE3NGI3ZDNlZmM2OGQzYWQifQ.fpXXYaAw-Al3wG-VuAy9VZg4Ds5ln66CIbY6t-W9YQ3AfWctH2Q_gF7GAYuPQeO1m4uBU_8SWwXr9XAHehaJCg"
  }
  console.log(whiteList.indexOf(to.path),1)
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

