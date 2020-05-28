// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import '@/icons'
import '@/styles/index.css'
import '@/styles/theme.less'
import store from './store'

//import objectAssign from 'object-assign'
import  './utils/templateCreated.js'
import  './utils/inertiaMove.js'
import  { LoadingPlugin } from 'vux'
Vue.use(LoadingPlugin)
import axios from 'axios'
import '@/permission'
Vue.prototype.axios = axios;

import VueAMap from 'vue-amap';
Vue.use(VueAMap);

import VueAwesomeSwiper from 'vue-awesome-swiper'
// import style
import 'swiper/css/swiper.css'
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)

import  { ToastPlugin } from 'vux'
Vue.use(ToastPlugin)

import VueScroller from "vue-scroller"
Vue.use(VueScroller);

Vue.config.productionTip = false
Vue.use(Vuex)

import { AlertPlugin } from 'vux'
Vue.use(AlertPlugin)

import waterfall from 'vue-waterfall2'
Vue.use(waterfall)


import failToLoad from '@/assets/failToLoad.png'

import VueLazyload from 'vue-lazyload'
// 使用VueLazyload并传入相应的配置
Vue.use(VueLazyload, {
  error: failToLoad,
  // loading: loading,// 懒加载使用的图片
})

require('es6-promise').polyfill()
import axiosApi from '@/api/axios'
Vue.prototype.$axiosApi = axiosApi;

//ios点击事件兼容问题
import fastclick from"fastclick";
fastclick.attach(document.body)

import Cookie from '@/utils/auth'
Vue.prototype.$Cookie = Cookie;

import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

import { ConfirmPlugin } from 'vux'
Vue.use(ConfirmPlugin)
import * as filters from './filters'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
import {environmentAI} from './filters'
Vue.prototype.$EnvironmentAI = environmentAI;

import VueWechatTitle from 'vue-wechat-title';
Vue.use(VueWechatTitle)





/** i18n **/
/*let store = new Vuex.Store({
  modules: {

  }
})


store.registerModule('vux', {
  state: {
    demoScrollTop: 0,
    isLoading: false,
    direction: 'forward'
  },
  mutations: {
    updateDemoPosition (state, payload) {
      state.demoScrollTop = payload.top
    },
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    },
    updateDirection (state, payload) {
      state.direction = payload.direction
    }
  },
  actions: {
    updateDemoPosition ({commit}, top) {
      commit({type: 'updateDemoPosition', top: top})
    }
  }
})*/
// plugins


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
