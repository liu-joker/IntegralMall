import request from '@/utils/request'


class loginApi {


// /itemList

  //首页商品列表
  static itemList() {
    return request({
      url: '/itemList',
      method: 'get',
      data: {},
      headers: {"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"}
    })
  };

  //首页轮播图
  static itemAdvert() {
    return request({
      url: '/itemAdvert',
      method: 'get',
      data: {},
      headers: {"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"}
    })
  };

  //商品详情
  static itemDetail(itemId, grade) {
    return request({
      url: '/itemDetail' + '?itemId=' + itemId + '&grade=' + grade,
      method: 'get',
      data: {},
    })
  };

  //用户默认地址
  static userAddress() {
    return request({
      url: '/userAddress',
      method: 'post',
      data: {},
    })
  };

  //用户地址列表
  static addressList() {
    return request({
      url: '/addressList',
      method: 'post',
      data: {},
    })
  };

  //设置默认地址
  static setDefAddress(id) {
    return request({
      url: '/setDefAddress',
      method: 'post',
      data: {
        id:id
      },
    })
  };

  //删除地址
  static updateAddress(id) {
    return request({
      url: '/updateAddress',
      method: 'post',
      data: {
        id:id
      },
    })
  };

  //用户信息
  static shopUserinfo() {
    return request({
      url: '/shopUserinfo',
      method: 'get',
      data: {
      },
    })
  };

  //用户默认地址
  static userAddress() {
    return request({
      url: '/userAddress',
      method: 'post',
      data: {
      },
    })
  };

  //下单
  static orderItem(itemId,payMode) {
    return request({
      url: '/orderItem',
      method: 'post',
      data: {
        itemId:itemId,
        payMode:payMode,
      },
    })
  };

  //确认订单（详情）
  static createOrder(itemId,payMode,payType,addressId) {
    return request({
      url: '/createOrder',
      method: 'post',
      data: {
        itemId:itemId,
        payMode:payMode,
        payType:payType,
        addressId:addressId,
      },
    })
  };







//
  static userrequest(phone, password, brandId, code, prePhone) {
    return request({
      url: '/user/register',
      method: 'post',
      data: {
        'phone': phone,
        'password': password,
        'brandId': brandId,
        'code': code,
        'prePhone': prePhone,
      },
      headers: {"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"},
    })
  };

  static share(userId) {
    return request({
      url: '/user/share',
      method: 'post',
      data: {
        'userId': userId,
      },
      headers: {"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"},
    })
  };

  static sendSms(phone, brandId) {
    return request({
      url: '/notice/sendSms',
      method: 'post',
      data: {
        'phone': phone,
        'brandId': brandId,
        'fuse': 'register',
      },
      headers: {"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"},
    })
  };

  static register(phone, password, brandId, code, prePhone) {
    return request({
      url: '/user/register',
      method: 'post',
      data: {
        'phone': phone,
        'password': password,
        'brandId': brandId,
        'code': code,
        'prePhone': prePhone,
      },
      headers: {"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"},
    })
  }

  static generalizeRegister(phone, password, code, pre) {
    return request({
      url: '/user/register',
      method: 'post',
      data: {
        'phone': phone,
        'password': password,
        'code': code,
        'pre': pre,
      },
      headers: {"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"},
    })
  }

  //智能客服
  static findTitle(title, content) {
    return request({
      url: 'https://www.hlxiaoxiong.com/findTitle',
      method: 'post',
      data: {
        title: title,
        content: content,
      },
    })
  };

  //用户信息
  static getuserInfo(token) {
    return request({
      url: '/user/userInfo',
      method: 'post',
      data: {},
      headers: {"Content-Type": "application/x-www-form-urlencoded;charset=utf-8", "token": token},
    })
  };

  //360第八区获取下载链接接口
  static jsonFormat(ID) {
    return request({
      url: 'https://dibaqu.com/jsonFormat/' + ID,
      method: 'get',
      data: {},
    })
  };

  //获取微信签名
  static getSignature(url) {
    return request({
      url: '/notice/getSignature',
      method: 'post',
      data: {
        url: url
      },
    })
  };

//一代获取下载链接
  static versionnumber(brandId) {
    return request({
      url: '/user/initialize/newVersion',
      method: 'post',
      data: {
        brandId: brandId
      },
    })
  };

  //魔蝎回调
  static moxieCallback(token, taskId, phone) {
    return request({
      url: '/notice/moxieCallback?taskId=' + taskId + '&phone=' + phone + '&token=' + token,
      method: 'get',
      data: {},
      headers: {"Content-Type": "application/x-www-form-urlencoded;charset=utf-8", "token": token},
    })
  };

  //获取des签名
  static getH5Key(time, phone) {
    return request({
      url: '/user/getH5Key',
      method: 'post',
      data: {
        'time': time,
        'phone': phone
      },
    })
  };

  //表单注册

  static addRealName(data, time, phone, prePhone, brandId) {
    return request({
      url: '/user/h5RealName',
      method: 'post',
      data: {
        'data': data,
        'time': time,
        'phone': phone,
        'prePhone': prePhone,
        'brandId': brandId,
      },
    })
  };

  //实名+绑卡+设置交易密码
  static addRealNameAndBank(validMonth, validYear, cvn, phone, billDay, repaymentDay, time, data, amount, token) {
    return request({
      url: '/payment/h5MakePlanAndStartNew',
      method: 'post',
      data: {
        'validMonth': validMonth,
        'validYear': validYear,
        'cvn': cvn,
        'phone': phone,
        'billDay': billDay,
        'repaymentDay': repaymentDay,
        'time': time,
        'data': data,
        'amount': amount,
      },
      headers: {"Content-Type": "application/x-www-form-urlencoded;charset=utf-8", "token": token},
    })
  };

  //获取验证码
  static h5Bind(token, bankId) {
    return request({
      url: '/payment/h5Bind',
      method: 'post',
      data: {
        'bankId': bankId,
      },
      headers: {"Content-Type": "application/x-www-form-urlencoded;charset=utf-8", "token": token},
    })
  };

  //生成计划
  static h5MakePlanAndStart(token, bankId, amount) {
    return request({
      url: '/payment/h5MakePlanAndStart',
      method: 'post',
      data: {
        'bankId': bankId,
        'amount': amount,
      },
      headers: {"Content-Type": "application/x-www-form-urlencoded;charset=utf-8", "token": token},
    })
  };

  //点击统计
  static statisticsPromotion(preId) {
    return request({
      url: ' ' + preId,
      method: 'get',
      data: {},
      headers: {"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"},
    })
  };
}


export default loginApi



