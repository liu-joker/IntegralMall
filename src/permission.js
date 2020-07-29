import router from './router'
import cookies from '@/utils/auth'
import axios from '@/api/axios'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import {environmentAI} from './filters'
import {AlertModule} from 'vux'


const whiteList = ['payment', 'callbackPageS', 'errorPayPage', 'merchantInfo', 'GoodsDetails', 'commodityTypeList', 'agreementOfUsage'] // 白名单
const whiteList2 = ['merChantIndex', 'tradeType']
router.beforeEach((to, from, next) => {
  let brandId
  if(/Lycheepay/.test(window.navigator.userAgent)){
    //立之付环境判断
       brandId = '59c7a6325bb44368a6102cb189504b05'
       cookies.setBrandId(brandId)
  }


 /* let themeClass = 'theme1'
  if(cookies.getBrandId() != ""){
    themeClass = 'theme2'
  }
  console.log(123)
  document.querySelector("#app").setAttribute('class', themeClass)*/



  let token = ""
  try {
    store.dispatch('getToken', brandId).then(res => {
      token = res
      /*          AlertModule.show({
                  title: '提示',
                  content: token,
                })
            token = ''*/
      if(cookies.getSEnvironment() == 1){
        if(cookies.getToken() == 'undefined' || cookies.getToken() == undefined){
          cookies.setToken('')
        }
      }else {
        cookies.setToken(token)
      }
      //cookies.setToken(token)
      if (cookies.getToken() != "undefined" && cookies.getToken() != "null" && cookies.getToken() != null && cookies.getToken() != "" && !store.getters.userInfo.phone && whiteList.indexOf(to.name) == -1) {
        NProgress.start()
        store.dispatch('getUserInfo').then((res) => {
          console.log(res)
          next()
          NProgress.done()
        }).catch(error => {

        })
      } else {
        next()
      }

    })
  } catch (e) {
    token = ""
    cookies.setToken(token)
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

