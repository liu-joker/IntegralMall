import Cookies from 'js-cookie'




const StatisticsPromotion = 'statisticsPromotion'
const TokenKey = 'User-Token'
const UserInfo = 'User-Info'
const wxUserPhone = 'User-Phone' //微信扫码支付存储用户手机号码
const searchRecord = 'searchRecord'//搜索历史
const MGHistory = 'MGHistory'//搜索历史
const brandId = 'brandId'
const agentIntroduce = 'agentIntroduce'
const SEnvironment = 'SEnvironment'

class cookies {
  static setSEnvironment(type) {
    return Cookies.set(SEnvironment, type)
  }
  static getSEnvironment() {
    return Cookies.get(SEnvironment)
  }

  static setAgentIntroduce(agent) {
    return Cookies.set(agentIntroduce, agent)
  }

  static getAgentIntroduce() {
    return Cookies.get(agentIntroduce)
  }

  static setBrandId(data) {
    return Cookies.set(brandId, data)
  }

  static getBrandId() {
    return Cookies.get(brandId)
  }

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
