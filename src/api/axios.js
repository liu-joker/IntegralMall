import request from '@/utils/request'


class loginApi {

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

  //添加收货地址
  static addAddress(name,phone,areaId,address) {
    return request({
      url: '/addAddress',
      method: 'post',
      data: {
        areaId:areaId,
        address:address,
        phone:phone,
        name:name,
      },
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

  //订单列表
  static findUserShopOrder(pageNum,pageSize,status,payStatus,expressStatus) {
    return request({
      url: '/findUserShopOrder',
      method: 'post',
      data: {
        pageNum:pageNum,
        pageSize:pageSize,
        status:status,
        payStatus:payStatus,
        expressStatus:expressStatus,
      },
    })
  };

  //取消订单
  static cancelOrder(orderNum) {
    return request({
      url: '/cancelOrder',
      method: 'post',
      data: {
        orderNum:orderNum,
      },
    })
  };

//积分详情
  static userPoint(startTime,pageNum,pageSize) {
    return request({
      url: '/userPoint',
      method: 'post',
      data: {
        startTime:startTime,
        pageNum:pageNum,
        pageSize:pageSize,
      },
    })
  };

  //订单详情
  static findShopOrderDetails(orderNum) {
    return request({
      url: '/findShopOrderDetails',
      method: 'post',
      data: {
        orderNum:orderNum,
      },
    })
  };

  //确认收货
  static finishOrder(orderNum) {
    return request({
      url: '/finishOrder',
      method: 'post',
      data: {
        orderNum:orderNum,
      },
    })
  };

  //确认支付密码
  static pay(orderNum,password) {
    return request({
      url: '/pay',
      method: 'post',
      data: {
        orderNum:orderNum,
        password:password,
      },
    })
  };

  //获取收银台商户信息
  static getAgentH5(agentId) {
    return request({
      url: '/getAgentH5?agentId='+agentId,
      method: 'get',
      data: {
      },
    })
  };

  //扫码下单
  static scanOrder(agentId,amount,payType,brandId,appType,phone) {
    return request({
      url: '/scanOrder',
      method: 'post',
      data: {
        agentId:agentId,
        amount:amount,
        payType:payType,
        brandId:brandId,
        appType:appType,
        phone:phone,
      },
    })
  };

}


export default loginApi



