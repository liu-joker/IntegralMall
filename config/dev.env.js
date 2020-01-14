'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"http://192.168.1.11:8099/v2.0/shop"'
  // BASE_API: '"BaseUrlApi"' //解决跨域问题
   BASE_API: '"BaseUrlApi"' //解决跨域问题
  //BASE_API: '"http://129.211.65.120:8099/v2.0/shop/"'
  //  BASE_API:'"https://www.hlxiaoxiong.com/v2.0/shop"'
  //https://www.huiliancard.com
})
