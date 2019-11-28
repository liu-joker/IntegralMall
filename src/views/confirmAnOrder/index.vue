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
                    content: res.message,
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
        this.$router.push({path: '/ForThePayment'})
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
                window.app.onWeChatPay(thirdData)
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
          this.$vux.alert.show({
            title: '提示',
            content: '请完善信息',
            onShow() {
            },
            onHide() {
            }
          })
        }

      },
      changeAddress(x) {
        this.$router.push({path: '/ShippingAddress'})
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

  .confirmAnOrder {

    min-height: calc(100vh - 0.625rem);
    padding-top: 0.625rem;
    background-color: #f4f4f4;
    .headTitle {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      font-size: 2rem;
      color: #323232;
      .b_tag {
        width: 0.375rem;
        height: 2rem;
        display: block;
        background-color: #2D2922;
        border-radius: 0.175rem;
        margin-right: 1.375rem;
      }
    }
    .C_head {
      background-color: #ffffff;
      padding: 1.875rem;
      .addAddress {
        padding-left: 1.75rem;
        margin-top: 1.25rem;
        .AddressContent {
          background-color: #F4F4F4;
          color: #8C8C8C;
          font-size: 1.75rem;
          padding: 1rem 2.25rem;
          user-select: none;
          &:active {
            opacity: 0.9;
          }
        }
        .AddressInfo {
          color: #323232;
          font-size: 1.75rem;
        }
      }
    }
    .OrdersInfo {
      margin-top: 0.625rem;
      background-color: #ffffff;
      padding: 1.875rem 0 6.375rem 1.875rem;
      .O_content {
        padding-left: 1.75rem;
        .goods {
          margin-top: 1.25rem;
          padding-bottom: 3.75rem;
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
          border-bottom: 1px solid #F4F4F4;
          .img {
            margin-right: 2rem;
            width: 7.125rem;
            height: 7.125rem;
            position: relative;
            border-radius: 0.5rem;
            overflow: hidden;
            .img_p {
              position: absolute;
              left: 50%;
              top: 0;
              transform: translate(-50%, 0);
              width: 8.25rem;
              img {
                display: inline-block;
                height: 7.125rem;
                width: auto;
              }
            }
          }
          .textInfo {
            padding-right: 4.375rem;
            font-size: 1.5rem;
            flex: 1;
            color: #323232;
            .numInfo {
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-top: 0.75rem;
              color: #8C8C8C;
              .num {
                font-size: 2rem;
                color: #E84646;
              }
            }
          }
        }
        .CommodityPrices {
          padding: 1.5rem 4.375rem 1.5rem 0;
          border-bottom: 1px solid #F4F4F4;

          .PricesItemInfo {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 1.5rem;
            color: #8C8C8C;
            margin-bottom: 1rem;
            &.defaultPrices {
              color: #323232;
              .Prices {
                font-size: 1.75rem;
                font-weight: bold;
              }
            }
            .needUM{
              display: flex;
              align-items: center;
              justify-content: flex-end;
              font-size: 1.25rem;
              color: #F89F04;
              img{
                width: 1.25rem;
                height: 1.25rem;
                margin-right: 0.5rem;
                display: inline-block;
              }
            }
            &:last-child {
              margin-bottom: 0;
            }
          }
        }

      }
    }
    .method {
      margin-top: 1.875rem;
      .method_content {
        display: flex;
        align-items: baseline;
        justify-content: flex-start;
        padding-left: 1.75rem;
        .label {
          font-size: 1.75rem;
          color: #323232;
          margin-right: 1.5rem;
        }
        .payList {
          .item {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            margin-bottom: 1.375rem;
            font-size: 1.5rem;
            color: #323232;
            .round {
              display: block;
              margin-right: 0.75rem;
              width: 1.25rem;
              height: 1.25rem;
              background-color: #F4F4F4;
              border: 1px solid #8C8C8C;
              border-radius: 1rem;
            }
            &.active {
              .round {
                background-color: #2D2922;
                border-color: #AD822F;
              }
            }
          }
        }
      }
    }
    .pay {
      display: flex;
      align-items: stretch;
      justify-content: space-between;
      background-color: #ffffff;
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 6.19rem;
      .left {
        flex: 1;
        padding: 1rem 4.25rem 0.75rem 2.3rem;
        color: #8C8C8C;
        font-size: 1.125rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-top: 1px solid #D0D0D0;
        .price {
          color: #323232;
          font-size: 2rem;
          font-weight: bold;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          font-family: PingFang SC;
        }
        .share {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          .shareImg {
            width: 2.875rem;
            height: 2.875rem;
          }
        }
      }
      .right {
        width: 12.75rem;
        background-color: #2D2922;
        border-top: 1px solid #2D2922;
        text-align: center;
        line-height: 6.2rem;
        font-size: 2rem;
        color: #ffffff;
      }
    }
    .popupD {
      border-radius: 1.5rem 1.5rem 0 0;

      .head_p {
        padding: 3.75rem 1.875rem 1.875rem;
        .text {
          .amount {
            text-align: center;
            color: #646464;
            font-size: 1.75rem;
            .info_amount {
              color: #323232;
              padding: 1.875rem 6.25rem;
            }
          }

        }
        .passwordD {
          background-color: #F5F5F5;
          border: 2px solid #E8E8E8;
          border-radius: 2.75rem;
          height: 5.5rem;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-around;
          > div {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 5.25rem;
            width: 16.6%;
            flex: 1;
            border-right: 2px solid #E8E8E8;
            &.round:after {
              content: " ";
              display: block;
              width: 1.25rem;
              height: 1.25rem;
              background-color: #000000;
              border-radius: 0.625rem;
            }
            &:last-child {
              border: none;
            }
          }
        }
      }
      .center_p {
        .Number {
          display: flex;
          flex-wrap: wrap;
          .item {
            width: calc(33.33% - 2px);
            height: 7.12rem;
            display: flex;
            align-items: center;
            justify-content: center;
            border-top: 2px solid #E8E8E8;
            border-right: 2px solid #E8E8E8;
            font-weight: bold;
            font-size: 3rem;

            .delete {
              width: 4.875rem;
              height: 3rem;
            }
          }
        }
      }
    }
  }

</style>
