import request from '@/utils/request'


class loginApi {

  //首页商品列表
  static itemList(itemType, third, pageNum, pageSize, name) {
    return request({
      url: '/itemList?itemType=' + itemType + '&third=' + third + '&pageNum=' + pageNum + '&pageSize=' + pageSize + '&name=' + name,
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

  //获取用户协议信息
  static getprotocol(brandId) {
    return request({
      url: 'https://www.hlxiaoxiong.com/v2.0/user/protocol',
      method: 'post',
      data: {
        brandId: brandId
      },
      headers: {"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"},
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

  //添加收货地址
  static addAddress(name, phone, areaId, address) {
    return request({
      url: '/addAddress',
      method: 'post',
      data: {
        areaId: areaId,
        address: address,
        phone: phone,
        name: name,
      },
    })
  };

  //设置默认地址
  static setDefAddress(id) {
    return request({
      url: '/setDefAddress',
      method: 'post',
      data: {
        id: id
      },
    })
  };

  //删除地址
  static updateAddress(id) {
    return request({
      url: '/updateAddress',
      method: 'post',
      data: {
        id: id
      },
    })
  };

  //发送验证码
  static sendSms(phone, brandId) {
    return request({
      url: 'https://www.hlxiaoxiong.com/v2.0/notice/sendSms',
      method: 'post',
      data: {
        'phone': phone,
        'brandId': brandId,
      },
      headers: {"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"},
    })
  };

//设置或修改交易密码
  static updatePayPwd(code, password) {
    return request({
      url: 'https://www.hlxiaoxiong.com/v2.0/user/updatePayPwd',
      method: 'post',
      data: {
        'code': code,
        'password': password,
      },
      headers: {"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"},
    })
  };

  // /loginRegisterSms 商城注册
  static loginRegisterSms(phone, code, brandId) {
    return request({
      url: 'https://www.hlxiaoxiong.com/v2.0/user/loginRegisterSms',
      method: 'post',
      data: {
        'phone': phone,
        'code': code,
        'brandId': brandId,
      },
      headers: {"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"},
    })
  };

  //用户信息
  static shopUserinfo() {
    return request({
      url: '/shopUserinfo',
      method: 'get',
      data: {},
    })
  };


  //下单
  static orderItem(itemId, payMode) {
    return request({
      url: '/orderItem',
      method: 'post',
      data: {
        itemId: itemId,
        payMode: payMode,
      },
    })
  };

  //确认订单（详情）
  static createOrder(itemId, payMode, payType, addressId) {
    return request({
      url: '/createOrder',
      method: 'post',
      data: {
        itemId: itemId,
        payMode: payMode,
        payType: payType,
        addressId: addressId,
      },
    })
  };

  //订单列表
  static findUserShopOrder(pageNum, pageSize, status, payStatus, expressStatus) {
    return request({
      url: '/findUserShopOrder',
      method: 'post',
      data: {
        pageNum: pageNum,
        pageSize: pageSize,
        status: status,
        payStatus: payStatus,
        expressStatus: expressStatus,
      },
    })
  };

  //取消订单
  static cancelOrder(orderNum) {
    return request({
      url: '/cancelOrder',
      method: 'post',
      data: {
        orderNum: orderNum,
      },
    })
  };

//积分详情
  static userPoint(startTime, pageNum, pageSize) {
    return request({
      url: '/userPoint',
      method: 'post',
      data: {
        startTime: startTime,
        pageNum: pageNum,
        pageSize: pageSize,
      },
    })
  };

  //订单详情
  static findShopOrderDetails(orderNum) {
    return request({
      url: '/findShopOrderDetails',
      method: 'post',
      data: {
        orderNum: orderNum,
      },
    })
  };

  //确认收货
  static finishOrder(orderNum) {
    return request({
      url: '/finishOrder',
      method: 'post',
      data: {
        orderNum: orderNum,
      },
    })
  };

  //确认支付密码
  static pay(orderNum, password) {
    return request({
      url: '/pay',
      method: 'post',
      data: {
        orderNum: orderNum,
        password: password,
      },
    })
  };

  //获取收银台商户信息
  static getAgentH5(agentId) {
    return request({
      url: '/getAgentH5?agentId=' + agentId,
      method: 'get',
      data: {},
    })
  };

  //扫码下单
  static scanOrder(agentId, amount, payType, brandId, appType, phone) {
    return request({
      url: '/scanOrder',
      method: 'post',
      data: {
        agentId: agentId,
        amount: amount,
        payType: payType,
        brandId: brandId,
        appType: appType,
        phone: phone,
      },
    })
  };


  //商户

  //上传凭证
  static getAuth() {
    return request({
      // url: 'https://www.hlxiaoxiong.com/v2.0/notice/getAuth',
      url: 'http://129.211.65.120:8099/v2.0/notice/getAuth',
      method: 'post',
      data: {},
      headers: {"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"},
    })
  };

  ///getNearAgent根据条件筛选商户
  static getNearAgent(brandId, lng, lat, distance, pageNum, pageSize, shopName, tradeType) {
    return request({
      url: '/getNearAgent',
      method: 'post',
      data: {
        brandId: brandId,
        lng: lng,
        lat: lat,
        distance: distance,
        pageNum: pageNum,
        pageSize: pageSize,
        shopName: shopName,
        tradeType: tradeType,
      },
    })
  };

  //是否为商户
  static isAgent() {
    return request({
      url: '/isAgent',
      method: 'get',
      data: {},
    })
  };

  //新增商户1
  static part1(data) {
    return request({
      url: '/addAgent/part1',
      method: 'post',
      data: data,
    })
  };

  //新增商户2
  static part2(data) {
    return request({
      url: '/addAgent/part2',
      method: 'post',
      data: data,
    })
  };

  //新增商户3
  static part3(data) {
    return request({
      url: '/addAgent/part3',
      method: 'post',
      data: data,
    })
  };

  //获取商户二维码链接
  static qrCodeInfo() {
    return request({
      url: '/qrCodeInfo',
      method: 'get',
      data: {},
    })
  };


  //商户详情
  static agentDetail(agentId, lng, lat) {
    return request({
      url: '/agentDetail',
      method: 'post',
      data: {
        agentId: agentId,
        lng: lng,
        lat: lat,
      },
    })
  };

  //商户评论列表
  /*  static getAgentCommont(agentId, orderBy, pageNum, pageSize) {
      return request({
        url: '/getAgentCommont?agentId=' + agentId + '&orderBy=' + orderBy + '&pageNum=' + pageNum + '&pageSize=' + pageSize,
        method: 'get',
        data: {},
      })
    };*/


//获取商户信息
  static getAddAgent(part) {
    return request({
      url: '/getAddAgent?part=' + part,
      method: 'get',
      data: {},
    })
  };

///agentIntroduceUpd商户自我介绍、积分返还修改
  static agentIntroduceUpd(data) {
    return request({
      url: '/agentIntroduceUpd',
      method: 'post',
      data: data,
    })
  };

  ///agentCenter商户中心-主页
  static agentCenter(data) {
    return request({
      url: '/agentCenter',
      method: 'post',
      data: data,
    })
  };

  //POST /findAgentChart 收益试图
  static findAgentChart(data) {
    return request({
      url: '/findAgentChart',
      method: 'post',
      data: data,
    })
  };

  ///registerLoginH5 免登陆

  static registerLoginH5(phone, brandId) {
    return request({
      url: 'https://www.hlxiaoxiong.com/v2.0/user/registerLoginH5',
      method: 'post',
      data: {
        phone: phone,
        brandId: brandId,
      },
      headers: {"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"},
    })
  };


//获取快付通网页授权token和openid
  static getKWebToken(jsCode) {
    return request({
      url: '/getKWebToken?jsCode=' + jsCode,
      method: 'get',
      data: {},
      headers: {"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"},
    })
  };

//获取快付通网页授权token和openid
  static getKUser(accessToken, openId) {
    return request({
      url: '/getKUser?accessToken=' + accessToken + "&openId=" + openId,
      method: 'get',
      data: {},
      headers: {"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"},
    })
  };

  //立支付下单
  static lzfPay(agentId, brandId, amount) {
    return request({
      url: '/lzfPay',
      method: 'post',
      data: {
        agentId: agentId,
        brandId: brandId,
        amount: amount,
      },
      headers: {"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"},
    })
  };

// /qrCodeInfo 商户获取连接生成二维码
  static qrCodeInfo() {
    return request({
      url: '/qrCodeInfo',
      method: 'get',
      data: {},
      headers: {"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"},
    })
  };

  ///agentProfitRecord 收益、提现记录
  static agentProfitRecord(data) {
    return request({
      url: '/agentProfitRecord',
      method: 'post',
      data: data,
      headers: {"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"},
    })
  };

  // /findAgentSettle 银行卡信息 显示后4位数字
  static findAgentSettle(data) {
    return request({
      url: '/findAgentSettle',
      method: 'post',
      data: data,
      headers: {"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"},
    })
  };

  // /repayAgent 商户提现
  static repayAgent(data) {
    return request({
      url: '/repayAgent',
      method: 'post',
      data: data,
      headers: {"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"},
    })
  };

  // /agentIntroduce 商户自我介绍信息
  static agentIntroduce(agentId) {
    return request({
      url: '/agentIntroduce?agentId=' + agentId,
      method: 'get',
      data: {},
      headers: {"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"},
    })
  };

  // /getUserScanOrder 获取用户扫码订单列表
  static getUserScanOrder(time, pageNum, pageSize) {
    return request({
      url: '/getUserScanOrder?time=' + time + '&pageNum=' + pageNum + '&pageSize=' + pageSize,
      method: 'get',
      data: {},
      headers: {"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"},
    })
  };

  // /addCommont 添加评论
  static addCommont(data) {
    return request({
      url: '/addCommont',
      method: 'post',
      data: data,
      headers: {"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"},
    })
  };

  //   /getAgentScore 获取商户平均分
  static getAgentScore(agentId) {
    return request({
      url: '/getAgentScore?agentId=' + agentId,
      method: 'get',
      data: {},
      headers: {"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"},
    })
  };

  // /getAgentCommont 获取商户评论列表

  static getAgentCommont(agentId, time, orderBy, pageNum, pageSize) {
    return request({
      url: '/getAgentCommont?agentId=' + agentId + '&time=' + time + '&orderBy=' + orderBy + '&pageNum=' + pageNum + '&pageSize=' + pageSize,
      method: 'get',
      data: {},
      headers: {"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"},
    })
  };

  // /getAgentPhoto 获取商户相册
  static getAgentPhoto(agentId) {
    return request({
      url: '/getAgentPhoto?agentId=' + agentId,
      method: 'get',
      data: {},
      headers: {"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"},
    })
  };

  // POST /addPhoto 添加或修改商户相册
  static addPhoto(data) {
    return request({
      url: '/addPhoto',
      method: 'post',
      data: data,
      headers: {"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"},
    })
  };

  ///agentGoods 商户团购套餐列表
  static agentGoods(agentId, isFirst) {
    return request({
      url: '/agentGoods?agentId=' + agentId + '&isFirst=' + isFirst,
      method: 'get',
      data: {},
      headers: {"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"},
    })
  };

  ///agentGoodsDetail 团购套餐详情
  static agentGoodsDetail(goodsId) {
    return request({
      url: '/agentGoodsDetail?goodsId=' + goodsId,
      method: 'get',
      data: {},
      headers: {"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"},
    })
  };

  ///getUserActivity 用户获取商户活动
  static getUserActivityList(agentId) {
    return request({
      url: '/getUserActivityList',
      method: 'post',
      data: {
        agentId: agentId
      },
      headers: {"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"},
    })
  };

  //POST /getUserActivityDetail 用户获取商户活动详情
  static getUserActivityDetail(id) {
    return request({
      url: '/getUserActivityDetail',
      method: 'post',
      data: {
        id: id
      },
      headers: {"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"},
    })
  };


  ///agentVideos 商户所有视频
  static agentVideos(agentId) {
    return request({
      url: '/agentVideos?agentId=' + agentId,
      method: 'get',
      data: {},
      headers: {"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"},
    })
  };


  ///getUserActivity 用户获取商户活动
  static getUserActivity(agentId) {
    return request({
      url: '/getUserActivity',
      method: 'post',
      data: {
        agentId: agentId
      },
      headers: {"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"},
    })
  };
}


export default loginApi



