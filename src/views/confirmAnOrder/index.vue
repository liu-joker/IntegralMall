<template>

  <div class="confirmAnOrder">

    <div class="C_head">
      <div class="headTitle">
        <span class="b_tag"></span>
        <span>收货地址</span>
      </div>
      <div class="addAddress">
        <div class="AddressContent" v-if="AddressInfo == ''" @click="changeAddress(0)">
          <svg-icon slot="label" class="form_icon" icon-class="add2"></svg-icon>
          新增收货地址
        </div>
        <div class="AddressInfo" v-else @click="changeAddress(1)">
          <p>{{AddressInfo.name}}</p>
          <p>{{AddressInfo.phone}}</p>
          <p>{{AddressInfo.areaName}} {{AddressInfo.address}}</p>
        </div>
      </div>
    </div>

    <div class="OrdersInfo">
      <div class="headTitle">
        <span class="b_tag"></span>
        <span>订单商品</span>
      </div>
      <div class="O_content">
        <div class="goods">
          <div class="img">
            <div class="img_p">
              <img :src="orderInfo.imgUrl" alt="">
            </div>
          </div>

          <div class="textInfo">
            <div>{{orderInfoItem.name}}</div>
            <div class="numInfo">
              <div class="num" v-html="orderInfo.itemName"></div>
              <div>x1</div>
            </div>
          </div>
        </div>
        <div class="CommodityPrices">
          <div class="PricesItemInfo">
            <div class="label">商品价格：</div>
            <div class="Prices">&yen;{{orderInfoItem.showAmount | formatMoney}}</div>
          </div>
          <div class="PricesItemInfo">
            <div class="label">累计折扣：</div>
            <div class="Prices">-&yen;{{(orderInfoItem.showAmount - orderInfo.amount) | formatMoney}}</div>
          </div>
          <div class="PricesItemInfo">
            <div class="label">所需U米 ：</div>
            <div class="Prices">{{orderInfo.coin}}</div>
          </div>
          <div class="PricesItemInfo">
            <div class="label"></div>
            <div class="Prices needUM" @click="toHelp">
              <img :src="icon_hqum" alt="">
              <div>获取U米</div>
            </div>
          </div>
          <div class="PricesItemInfo defaultPrices">
            <div class="label">实际支付价格：</div>
            <div class="Prices" v-html="orderInfo.itemName"></div>
          </div>
        </div>
      </div>
      <div class="method" v-if="payMode != 2">
        <div class="method_content">
          <div class="label">选择支付方式：</div>
          <div class="payList">
            <!-- <div class="item" :class="PayActive == 3?'active':''" @click="PayActive = 3">
               <span class="round"></span>
               银联支付
             </div>-->
            <div class="item" :class="PayActive == 2?'active':''" @click="PayActive = 2">
              <span class="round"></span>
              微信支付
            </div>
          </div>
        </div>
      </div>

    </div>


    <div class="pay">
      <div class="left">
        <div class="price">
          <div>合计： </div>
          <div class="num" v-html="orderInfo.itemName"></div>
        </div>
      </div>
      <div class="right" @click="BuyNow">
        免费领取
      </div>
    </div>


    <popup v-model="dialogShow" position="bottom" show-mask>
      <div class="popupD">
        <div class="head_p">
          <div class="passwordD">
            <div :class="index<password.length?'round':''" v-for="(x,index) in 6" :key="index"></div>
          </div>
        </div>
        <div class="center_p">
          <div class="Number">
            <div class="item" v-for="(x,index) in 12" :key="index" @click.stop="numberClick(x)">
              <span v-if="x == 10"> </span>
              <span v-else-if="x == 11">0</span>
              <img v-else-if="x == 12" class="delete" :src="icon_cancel">
              <span v-else>{{x}}</span>
            </div>
          </div>
        </div>
      </div>
    </popup>
  </div>

</template>

<script>
  import {formatMoney, imgUrl} from "@/filters"
  import {Popup} from 'vux'
  import icon_cancel from "@/assets/images/icon_cancel.png"
  import icon_hqum from "@/assets/images/icon_hqum.png"

  export default {
    name: 'confirmAnOrder',
    components: {
      Popup
    },
    data() {
      return {
        icon_cancel: icon_cancel,
        icon_hqum: icon_hqum,
        PayActive: 2,
        AddressInfo: {},
        itemId: '',
        payMode: '',
        orderInfo: {},
        orderInfoItem: {},
        payInfo: '',
        dialogShow: false,
        password: ''
      }
    },
    created() {
      this.$vux.loading.show({
        text: '加载中...'
      })
      this.itemId = this.$route.params.itemId
      this.payMode = this.$route.params.payMode
      this.getData()
    },
    mounted() {
      window['onPayFailure'] = () => {
        this.onPayFailure()
      }
      window['onPaySuccess'] = () => {
        this.onPaySuccess()
      }
    },
    methods: {
      toHelp(){
        this.$router.push({
          path:'/HelpCenter'
        })
      },
      numberClick(x) {
        if (x < 10 || x == 11) {
          if (this.password.length == 6) {
            return
          }
          let num = x == 11 ? 0 : x
          console.log(num)
          this.password = this.password + String(num)
          if (this.password.length == 6) {
            let orderNum = this.payInfo.orderNum
            let password = this.password
            this.$vux.loading.show({
              text: '请稍候...'
            })
            this.$axiosApi.pay(orderNum, password).then(res => {
              this.$vux.loading.hide()
              this.password = ""
              this.dialogShow = false
              if (res.code == 200) {
                //708 支付密码错误
                if (res.data.respCode == 10000) {
                  this.$vux.alert.show({
                    content: '领取成功',
                    onShow() {
                    },
                    onHide: () => {
                      this.$router.push({
                        path: '/ToSendTheGoods'
                      })
                    }
                  })
                } else if(res.code == 2007){
                  this.$vux.alert.show({
                    title: '提示',
                    content: res.message,
                    onShow() {
                    },
                    onHide: () => {
                      this.$router.push({
                        path: '/HelpCenter'
                      })
                    }
                  })
                } else {
                  this.$vux.alert.show({
                    title: '提示',
                    content: res.data.msg,
                    onShow() {
                    },
                    onHide() {
                    }
                  })
                }
              } else {
                this.$vux.alert.show({
                  title: '提示',
                  content: res.message,
                  onShow() {
                  },
                  onHide() {
                  }
                })
              }
            })
          }

        } else if (x == 12) {
          this.password = this.password.substring(0, this.password.length - 1)
          console.log(this.password)
        }
      },
      onPayFailure() {
        this.$router.push({path: '/allOrders'})
      },
      onPaySuccess() {
        this.$router.push({path: '/ToSendTheGoods'})
      },
      BuyNow() {
        //立即购买

        if (this.itemId != "" && this.payMode != "" && this.PayActive != "" && this.AddressInfo.id) {


          if (this.payMode == 2) {
            this.PayActive = 4
          }
          this.$vux.loading.show({
            text: '请稍候...'
          })
          this.$axiosApi.createOrder(this.itemId, this.payMode, this.PayActive, this.AddressInfo.id).then(res => {
            this.$vux.loading.hide()
            if (res.code == 200) {
              this.payInfo = res.data

              if (res.data.passType == 0) {
                //第三方支付
                let thirdData = JSON.stringify(res.data.thirdData.data)

             //   window.app.onWeChatPay(thirdData)
                if (this.$EnvironmentAI() == 1) {
                  window.app.onWeChatPay(thirdData)
                } else if (this.$EnvironmentAI() == 2) {
                  try {
                    window.app.onWeChatPay(thirdData)
                  }catch (err){
                    window.webkit.messageHandlers.onWeChatPay.postMessage(thirdData)
                  }
                }


              } else if (res.data.passType == 1) {
                //支付密码
                this.password = ''
                this.dialogShow = true
              } else {
                //短信支付
              }


              this.$store.dispatch('getUserInfo')

            } else if (res.code == 2003) {
              this.$vux.alert.show({
                title: '提示',
                content: res.message,
                onShow() {
                },
                onHide: () => {
                  this.$router.push({
                    path: '/allOrders'
                  })
                }
              })
            } else if(res.code == 2007){
              this.$vux.alert.show({
                title: '提示',
                content: res.message,
                onShow() {
                },
                onHide: () => {
                  this.$router.push({
                    path: '/HelpCenter'
                  })
                }
              })
            }else {
              console.log(res, 'res')
              this.$vux.alert.show({
                title: '提示',
                content: res.message,
                onShow() {
                },
                onHide() {
                }
              })
            }
          })
        } else {
          this.$vux.toast.show({text:'请完善信息'})
        }

      },
      changeAddress(x) {
        this.$router.push({path: '/ShoppingAddress'})
      },
      getData() {
        if (this.itemId != "") {
          this.$axiosApi.addressList().then(res => {
            if (res.code == 200) {
              this.AddressInfo = res.data.find(v => {
                return v.isDefault == 1
              }) || ""
            }
          })

          this.$axiosApi.orderItem(this.itemId, this.payMode).then(res => {
            this.$vux.loading.hide()
            if (res.code == 200) {
              this.orderInfo = res.data
              this.orderInfo.imgUrl = imgUrl(res.data.item.photo.split(',')[1])
              this.orderInfoItem = res.data.item
              this.orderInfo.itemName = '¥' + formatMoney(res.data.amount) + "+" + res.data.coin + "U米"
            } else {
              this.$vux.alert.show({
                title: '提示',
                content: res.message,
                onShow() {
                },
                onHide() {
                }
              })
            }
          })
        }


      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less">



</style>
