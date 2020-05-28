export function imgUrl(x) {
  if (x) {
    if (x.indexOf('http') > -1) {
      return x
    } else {
      let baseUrl = 'http://img.cdn.hljcxiaoxiong.com/'
      return baseUrl + x
    }
  }
  return ""


}

export function plottingScale(x) {
  if (x) {
    let s = (x / 1000).toFixed(2)
    if (s == 'NaN') {
      return x
    } else {
      return s;
    }
  }
  return ''
}

export function formatMoney(x) {
  let s = (x / 100).toFixed(2)
  if (s == 'NaN') {
    return x
  } else {
    return s;
  }
}

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

export function formatDate(time) {
  var dateee = new Date(time).toJSON();
  var date = new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
  return date
}

export function environment() {
  let payEnv;

  //1微信2自家app3其他
// 判断微信还是支付宝
  let start = 3
  let ua = navigator.userAgent.toLowerCase();
  if (ua.indexOf('android') > -1 || ua.indexOf('linux') > -1) {
    start = 1
  } else if (ua.indexOf('iphone') > -1) { //苹果手机
    start = 2
  }
  if (/MicroMessenger/.test(window.navigator.userAgent)) {
// 微信
    payEnv = '1';
  } else if (/AlipayClient/.test(window.navigator.userAgent)) {
// 支付宝
    payEnv = '3';
  } else {
    try {
      if (start == 2) {
        try {
          window.app.getToken()
        } catch (err) {
          window.setToken = (params) => {
            commit('SET_TOKEN', params)
          }
          window.webkit.messageHandlers.getToken.postMessage({})
        }
      } else {
        window.app.getToken()
      }
      payEnv = '2';
    } catch (error) {
      payEnv = '4';
    }
  }
  return payEnv
}

export function environmentAI() {

  //判断android和ios环境  1 android 2 ios 3 其他
  let start = 3

  /*let ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf('android') > -1 || ua.indexOf('linux') > -1) { //安卓手机
      console.log("安卓手机",ua)
      start = 1
    } else if (ua.indexOf('iphone') > -1) { //苹果手机
      start = 2
      console.log("苹果手机")
    } else {
      start = 3
      // alert('请在手机浏览器中浏览此网页！')
    }*/


  if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
    start = 2
  //  console.log("苹果手机")
  } else if (/(Android)/i.test(navigator.userAgent)) {
 //   console.log("安卓手机")
    start = 1
  } else {
    start = 3
    // alert('请在手机浏览器中浏览此网页！')
  }
  ;


  return start

}


export function getPosition () {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        let latitude = position.coords.latitude
        let longitude = position.coords.longitude
        let data = {
          latitude: latitude,
          longitude: longitude
        }
        resolve(data)
      }, function () {
        reject(arguments)
      })
    } else {
      reject('你的浏览器不支持当前地理位置信息获取')
    }
  })
}
