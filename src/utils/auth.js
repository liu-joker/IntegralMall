import Cookies from 'js-cookie'




const StatisticsPromotion = 'statisticsPromotion'
const TokenKey = 'User-Token'
const UserInfo = 'User-Info'
const wxUserPhone = 'User-Phone'
const searchRecord = 'searchRecord'
const MGHistory = 'MGHistory'

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

  static getwxUserPhone() {
    return Cookies.get(wxUserPhone)
  }

  static setwxUserPhone(phone) {
    return Cookies.set(wxUserPhone, phone)
  }

  static getSearchRecord() {
    return Cookies.get(searchRecord)
  }

  static setSearchRecord(x) {
    return Cookies.set(searchRecord, x)
  }

  static removeSearchRecord() {
    return Cookies.remove(searchRecord)
  }
  static getMGHistory() {
    return Cookies.get(MGHistory)
  }

  static setMGHistory(x) {
    return Cookies.set(MGHistory, x)
  }

  static removeMGHistory() {
    return Cookies.remove(MGHistory)
  }
}

export default cookies
