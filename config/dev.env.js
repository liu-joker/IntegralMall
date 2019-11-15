'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API:'"http://192.168.1.11:8611"'
  // BASE_API:'"https://www.hlxiaoxiong.com/v2.0"'
  //https://www.huiliancard.com
})
