import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

const routerList = [

  {
    path: '/',
    name: 'index',
    component: () => import('@/views/index_2'),
    meta: {
      title: '商城',
    }
  },
  {
    path: '/commodityTypeList',
    name: 'commodityTypeList',
    component: () => import('@/views/index_2/commodityTypeList'),
    meta: {
      title: '小米粒商城'
    }
  },
  {
    path: '/grabble',
    name: 'grabble',
    component: () => import('@/views/index_2/grabble'),
    meta: {
      title: '小米粒商城'
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
    path: '/ShippingAddress',
    name: 'ShippingAddress',
    component: () => import('@/views/ShippingAddress'),
    meta: {
      title: '收货地址'
    }
  },
  {
    path: '/AddShippingAddress',
    name: 'AddShippingAddress',
    component: () => import('@/views/AddShippingAddress'),
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
    path: '/merchantInfo',
    name: 'merchantInfo',
    component: () => import('@/views/merchant/merchantInfo'),
    meta: {
      title: '商家详情'
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
