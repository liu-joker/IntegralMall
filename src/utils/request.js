import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import cookies from '@/utils/auth'
import { AlertModule,ToastPlugin } from 'vux'
Vue.use(ToastPlugin,{
  type:'text',
  position: 'bottom'
})
import {environmentAI} from '@/filters'
// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 60000 // 请求超时时间
})

// request拦截器   请求之前
service.interceptors.request.use(config => {
  const headers = config.headers["Content-Type"]
  // console.log(headers.indexOf("application/x-www-form-urlencoded"))
  //console.log(config.data)
  if (headers == undefined || headers.indexOf("application/x-www-form-urlencoded") != -1) {
    config.data = qs.stringify(config.data);
  }
  config.headers['token'] = cookies.getToken()

      //测试token
  //  config.headers['token'] ='eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJITEpDIiwiZXhwIjoxNjA5NDY2OTQ4LCJ1c2VyIjoiMDA4MTE5Njk0Mzk3NDRkZmJiNjJmOGY0MGVhZGI4OGUifQ.YQ-evTqPinJpwNAIJ3nR19lQA-PMFD-qi5Q4Www8vVhJe8oRxsZM-DH_Vom3PGria1e-1vL5HXokDST5oC0rcw'

  /*if (store.getters.token) {
    config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }*/
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  return Promise.reject(error)
})


// respone拦截器  响应之后
service.interceptors.response.use(
  response => {

    Vue.$vux.loading.hide()
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    const res = response.data

    if (res.code != '200') {

      let message = ""
      if (res.code == '401' || res.code == '402' || res.code == '0' || res.code == '726') {


        AlertModule.show({
          title: '提示',
          content: "登录失效，请重新登录!",
          onHide() {

            if(cookies.getSEnvironment() == 1 && cookies.getToken()!=""){
              cookies.setToken('')
              location.reload()
              return
            }

            try {
             // console.log(1)
              if (environmentAI() == 2) {
                window.webkit.messageHandlers.onLoginErro.postMessage({})
              } else if (environmentAI() == 1) {
                window.app.onLoginErro()
              }
              return
            } catch (e) {
            }
          }
        })
        return Promise.reject(res)
      } else {
        message = res.message
         Vue.$vux.toast.show({text:message})

        /* AlertModule.show({
           title: '提示',
           content: message,
           onHide() {
           }
         })*/
        return
      }


    }
    return res
  },
  error => {
    Vue.$vux.loading.hide()

    var errordata = error.response.data

    const originalRequest = error.config;
    if (error.code == 'ECONNABORTED' && error.message.indexOf('timeout') != -1 && !originalRequest._retry) {
      error.message = "请求超时！"
    }
    console.log('err' + errordata)// for debug

    //error.message="系统错误，请联系客服！"

    if (errordata.code != '200') {
      if (errordata.code == '401' || errordata.code == '402' || errordata.code == '0' || errordata.code == '726') {

        if(cookies.getSEnvironment() == 1 && cookies.getToken()!=""){
          cookies.setToken('')
          location.reload()
          return
        }

        try {
          if (environmentAI() == 2) {
            window.webkit.messageHandlers.onLoginErro.postMessage({})
          } else if (environmentAI() == 1) {
            window.app.onLoginErro()
          }
          return
        } catch (e) {
          error.message = "登录失效，请重新登录!"
        }

      } else {
        error.message = errordata.message
      }

    }

    Vue.$vux.toast.show({text:error.message})

   /* AlertModule.show({
      title: '提示',
      content: error.message,
    })*/

    return Promise.reject(error)
  }
)


export default service
