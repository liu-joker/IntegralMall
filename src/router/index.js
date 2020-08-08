import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

const routerList = [

  //商城模块
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/index_2'),
    meta: {
      title: 'U米商城',
    }
  },
  {
    path: '/commodityTypeList',
    name: 'commodityTypeList',
    component: () => import('@/views/index_2/commodityTypeList'),
    meta: {
      title: '商城'
    }
  },
  {
    path: '/grabble',
    name: 'grabble',
    component: () => import('@/views/index_2/grabble'),
    meta: {
      title: '商城'
    }
  },
  {
    path: '/GoodsDetails/:id',
    name: 'GoodsDetails',
    component: () => import('@/views/GoodsDetails'),
    meta: {
      title: '商品详情'
    }
  },
  {
    path: '/my',
    name: 'my',
    component: () => import('@/views/my'),
    meta: {
      title: '我的'
    }
  },
  {
    path: '/updatePayPwd',
    name: 'updatePayPwd',
    component: () => import('@/views/my/updatePayPwd'),
    meta: {
      title: '修改交易密码'
    }
  },
  {
    path: '/ShoppingAddress',
    name: 'ShoppingAddress',
    component: () => import('@/views/ShoppingAddress'),
    meta: {
      title: '收货地址'
    }
  },
  {
    path: '/AddShoppingAddress',
    name: 'AddShoppingAddress',
    component: () => import('@/views/AddShoppingAddress'),
    meta: {
      title: '添加收货地址'
    }
  },
  {
    path: '/HelpCenter',
    name: 'HelpCenter',
    component: () => import('@/views/HelpCenter'),
    meta: {
      title: '帮助中心'
    }
  },
  {
    path: '/HelpCenterApp',
    name: 'HelpCenterApp',
    component: () => import('@/views/HelpCenter/HelpCenterApp'),
    meta: {
      title: '帮助中心'
    }
  },
  {
    path: '/confirmAnOrder/:payMode/:itemId',
    name: 'confirmAnOrder',
    component: () => import('@/views/confirmAnOrder'),
    meta: {
      title: '确认订单'
    }
  },
  {
    path: '/allOrders',
    name: 'allOrders',
    component: () => import('@/views/allOrders'),
    meta: {
      title: '全部订单'
    }
  },
  {
    path: '/orderDetails/:orderNum',
    name: 'orderDetails',
    component: () => import('@/views/orderDetails'),
    meta: {
      title: '订单详情'
    }
  },
  {
    path: '/MyUmi',
    name: 'MyUmi',
    component: () => import('@/views/MyUmi'),
    meta: {
      title: '我的U米'
    }
  },
  {
    path: '/TheDetail',
    name: 'TheDetail',
    component: () => import('@/views/MyUmi/TheDetail'),
    meta: {
      title: 'U米明细'
    }
  },
  {
    path: '/ForThePayment',
    name: 'ForThePayment',
    component: () => import('@/views/OrderStatus/ForThePayment'),
    meta: {
      title: '待付款'
    }
  },
  {
    path: '/ToSendTheGoods',
    name: 'ToSendTheGoods',
    component: () => import('@/views/OrderStatus/ToSendTheGoods'),
    meta: {
      title: '待发货'
    }
  },
  {
    path: '/ForTheGoods',
    name: 'ForTheGoods',
    component: () => import('@/views/OrderStatus/ForTheGoods'),
    meta: {
      title: '待收货'
    }
  },
  {
    path: '/share/:id/:active',
    name: 'share',
    component: () => import('@/views/share/index'),
    meta: {
      title: '商品分享'
    }
  },

  {
    path: '/payment',
    name: 'payment',
    component: () => import('@/views/payment/index'),
    meta: {
      title: '支付'
    }
  },
  {
    path: '/promoCodePage/:eid/:esign',
    name: 'promoCodePage',
    component: () => import('@/views/payment/promoCodePage'),
    meta: {
      title: '请稍候...'
    }
  },
  {
    path: '/callbackPageS',
    name: 'callbackPageS',
    component: () => import('@/views/payment/callbackPageS'),
    meta: {
      title: '支付结果'
    }
  },
  {
    path: '/errorPayPage',
    name: 'errorPayPage',
    component: () => import('@/views/payment/errorPayPage'),
    meta: {
      title: '支付'
    }
  },
  {
    path: '/agreementOfUsage',
    name: 'agreementOfUsage',
    component: () => import('@/views/agreement/agreementOfUsage'),
    meta: {
      title: '用户协议'
    }
  },
  {
    path: '/agreementOfAgent',
    name: 'agreementOfAgent',
    component: () => import('@/views/agreement/agreementOfAgent'),
    meta: {
      title: '入驻合同书'
    }
  },
  {
    path: '/agreementOfAgent2',
    name: 'agreementOfAgent2',
    component: () => import('@/views/agreement/agreementOfAgent2'),
    meta: {
      title: '入驻合同书'
    }
  },


  {
    path: '/merchantInfo',
    name: 'merchantInfo',
    component: () => import('@/views/merchant/merchantInfo'),
    meta: {
      title: '商家详情'
    }
  },

  {
    path: '/merchantInfo2',
    name: 'merchantInfo2',
    component: () => import('@/views/merchant/merchantInfo2'),
    meta: {
      title: '商家详情'
    }
  },
  {
    path: '/BusinessDetails',
    name: 'BusinessDetails',
    component: () => import('@/views/merchant/BusinessDetails'),
    meta: {
      title: '商家详情'
    }
  },
  {
    path: '/commentList',
    name: 'commentList',
    component: () => import('@/views/merchant/commentList'),
    meta: {
      title: '评论列表'
    }
  },
  {
    path: '/videoList',
    name: 'videoList',
    component: () => import('@/views/merchant/videoList'),
    meta: {
      title: '视频列表'
    }
  },
  {
    path: '/activityDetail',
    name: 'activityDetail',
    component: () => import('@/views/merchant/activityDetail'),
    meta: {
      title: '活动详情'
    }
  },
  {
    path: '/PackageDetails',
    name: 'PackageDetails',
    component: () => import('@/views/merchant/PackageDetails'),
    meta: {
      title: '套餐详情'
    }
  },
  {
    path: '/morePrivilege',
    name: 'morePrivilege',
    component: () => import('@/views/merchant/morePrivilege'),
    meta: {
      title: '更多特权'
    }
  },





  //商家模块



  {
    path: '/merChantIndex',
    name: 'merChantIndex',
    component: () => import('@/views/merchant/merchantIndex'),
    meta: {
      title: '商家'
    }
  },
  {
    path: '/MerchantCA',
    name: 'MerchantCA',
    component: () => import('@/views/merchant/MerchantCA'),
    meta: {
      title: '商家中心'
    }
  },
  {
    path: '/earnings',
    name: 'earnings',
    component: () => import('@/views/merchant/earnings'),
    meta: {
      title: '收益提现'
    }
  },
  {
    path: '/WithdrawalRecord',
    name: 'WithdrawalRecord',
    component: () => import('@/views/merchant/WithdrawalRecord'),
    meta: {
      title: '提现记录'
    }
  },
  {
    path: '/OperatingIncome',
    name: 'OperatingIncome',
    component: () => import('@/views/merchant/OperatingIncome'),
    meta: {
      title: '营业收入'
    }
  },
  {
    path: '/MerchantEdit',
    name: 'MerchantEdit',
    component: () => import('@/views/merchant/MerchantEdit'),
    meta: {
      title: '商家详情'
    }
  },
  {
    path: '/marketingManagement',
    name: 'marketingManagement',
    component: () => import('@/views/merchant/marketingManagement'),
    meta: {
      title: '营销管理'
    }
  },
  {
    path: '/merchantGrabble',
    name: 'merchantGrabble',
    component: () => import('@/views/merchant/merchantGrabble'),
    meta: {
      title: '商家搜索'
    }
  },
  {
    path: '/tradeType',
    name: 'tradeType',
    component: () => import('@/views/merchant/tradeType'),
    meta: {
      title: '商家分类'
    }
  },
  {
    path: '/merchantMove',
    name: 'merchantMove',
    component: () => import('@/views/merchant/merchantMove'),
    meta: {
      title: '商家入驻'
    }
  },
  {
    path: '/qrCode',
    name: 'qrCode',
    component: () => import('@/views/merchant/qrCode'),
    meta: {
      title: '收款码'
    }
  },
  {
    path: '/qrCodeImg',
    name: 'qrCodeImg',
    component: () => import('@/views/merchant/qrCodeImg'),
    meta: {
      title: '下载收款码'
    }
  },
  {
    path: '/setAmount',
    name: 'setAmount',
    component: () => import('@/views/merchant/setAmount'),
    meta: {
      title: '设置金额'
    }
  },
  {
    path: '/applicationForm',
    name: 'applicationForm',
    component: () => import('@/views/merchant/applicationForm'),
    meta: {
      title: '申请入驻信息填写'
    }
  },
  {
    path: '/myOrder',
    name: 'myOrder',
    component: () => import('@/views/merchant/myOrder'),
    meta: {
      title: '我的订单'
    }
  },
  {
    path: '/userEvaluate',
    name: 'userEvaluate',
    component: () => import('@/views/merchant/userEvaluate'),
    meta: {
      title: '评价'
    }
  },
  {
    path: '/evaluateSuccess',
    name: 'evaluateSuccess',
    component: () => import('@/views/merchant/evaluateSuccess'),
    meta: {
      title: '评价'
    }
  },
  {
    path: '/evaluateInfo',
    name: 'evaluateInfo',
    component: () => import('@/views/merchant/evaluateInfo'),
    meta: {
      title: '评价信息'
    }
  },
  {
    path: '/merchantPhoto',
    name: 'merchantPhoto',
    component: () => import('@/views/merchant/merchantPhoto'),
    meta: {
      title: '相册管理'
    }
  },


  {path: '/404', component: () => import('@/views/404'), hidden: true},
  {path: '*', redirect: '/404', hidden: true}
]

export default new Router({
  scrollBehavior: () => ({y: 0}),
  // mode: 'history',
  routes: routerList
})
