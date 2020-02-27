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
    token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJITEpDIiwiZXhwIjoxNTgyNzY3NzI1LCJ1c2VyIjoiMmM1ZTk1NTczNzQ3NDljYTkwNjdlNzVkYWJmYmI3MDYifQ.gSNRSNGPoJsbns-cOxPc1lFRGI_M7Se1_D3fp5BC_3VD6TvOqn0O6CQ3nwS8YarWEzgoS0gI9EpMA9a_YywiCg"
    token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJITEpDIiwiZXhwIjoxNTgzMjA0OTkzLCJ1c2VyIjoiNjAyYTY5OTQwMWNmNDQ4MWE3NGI3ZDNlZmM2OGQzYWQifQ.EP--K49TXsbP_PHlEyk_bzehyHN9q1iuvIli1hGjjsqRLNQLZeLis48wXQIoYNKREqTXAUagT3UpHffKedADrw"
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

