 import axios from 'axios'
import qs from 'qs'
 import cookies from '@/utils/auth'
import { AlertModule   } from 'vux'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 60000 // 请求超时时间
})



// request拦截器   请求之前
service.interceptors.request.use(config => {


  const headers=config.headers["Content-Type"]
  // console.log(headers.indexOf("application/x-www-form-urlencoded"))
  //console.log(config.data)
  if(headers==undefined || headers.indexOf("application/x-www-form-urlencoded")!=-1){
      console.log(config.data)
      config.data=qs.stringify(config.data);
      console.log(config.data)
  }

  config.headers['token'] = cookies.getToken()

  /*if (store.getters.token) {
    config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }*/
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  return Promise.reject(error)
})


// respone拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    const res = response.data


    // console.log(99999)
    // console.log(response.data)


    if (response.data.resp_code == '000000'){
      AlertModule.show({
        title: 'VUX is Cool',
        content: this.$t('Do you agree?'),
        onShow () {
          console.log('Module: I\'m showing')
        },
        onHide () {
          console.log('Module: I\'m hiding now')
        }
      })
      return Promise.reject(response.data)
    }else {
      return response.data
    }




  },
  error => {
    console.log()


    var errordata=error.response.data

    const originalRequest = error.config;
    if(error.code == 'ECONNABORTED' && error.message.indexOf('timeout')!=-1 && !originalRequest._retry){
      error.message="请求超时！"
    }
    console.log('err' + error)// for debug

    //error.message="系统错误，请联系客服！"

    if (errordata.code!='200'){
      if(errordata.code=='401' || errordata.code=='402'){
        try {
          window.app.onLoginErro()
          return
        } catch (e) {
          error.message="登录失效，请重新登录！"
        }

      }else if(errordata.code=='405') {
        error.message="请先实名！"
        AlertModule.show({
          title: '提示',
          content: error.message,
          onHide(){
            window.app.closePage();
          }
        })
        return
      }

    }



    AlertModule.show({
      title: '提示',
      content: error.message,
    })

    return Promise.reject(error)
  }
)



export default service
