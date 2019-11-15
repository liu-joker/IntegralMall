// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import '@/icons'
import '@/styles/index.css'
import store from './store'


//import objectAssign from 'object-assign'
import  './utils/templateCreated.js'
import  { LoadingPlugin } from 'vux'
Vue.use(LoadingPlugin)
import axios from 'axios'
import '@/permission'
Vue.prototype.axios = axios;

import  { ToastPlugin } from 'vux'
Vue.use(ToastPlugin)

import VueScroller  from 'vue-scroller'
Vue.use(VueScroller)

Vue.config.productionTip = false
Vue.use(Vuex)

import  { AlertPlugin } from 'vux'
Vue.use(AlertPlugin)


require('es6-promise').polyfill()
import axiosApi from '@/api/axios'
Vue.prototype.$axiosApi = axiosApi;

console.log(111)

import Cookie from '@/utils/auth'
Vue.prototype.$Cookie = Cookie;
/*import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer)*/
import { ConfirmPlugin } from 'vux'
Vue.use(ConfirmPlugin)
import * as filters from './filters'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
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
