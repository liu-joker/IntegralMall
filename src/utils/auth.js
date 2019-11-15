import Cookies from 'js-cookie'




const StatisticsPromotion = 'statisticsPromotion'
const TokenKey = 'User-Token'
const UserInfo = 'User-Info'

class cookies {

  static setUserInfo(Info) {
    return Cookies.set(UserInfo, Info)
  }

  static getUserInfo() {
    return Cookies.get(UserInfo)
  }

  static getToken() {
    return Cookies.get(TokenKey)
  }

  static setToken(token) {
    return Cookies.set(TokenKey, token)
  }

  static removeToken() {
    return Cookies.remove(TokenKey)
  }


  static getStatisticsPromotion() {
    return Cookies.get(StatisticsPromotion)
  }

  static setStatisticsPromotion(T,Time) {
    return Cookies.set(StatisticsPromotion, T,{
      expires: Time
    })
  }

  static removeStatisticsPromotion() {
    return Cookies.remove(StatisticsPromotion)
  }

}

export default cookies
