<template>

  <div class="confirmAnOrder">

    <div class="C_head">
      <div class="headTitle">
        <span class="b_tag"></span>
        <span>收货地址</span>
      </div>
      <div class="addAddress">
        <div class="AddressContent" v-if="AddressInfo == ''"@click="changeAddress(0)">
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
            <img :src="orderInfo.imgUrl" alt="">
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
          <div class="PricesItemInfo defaultPrices">
            <div class="label">实际支付价格：</div>
            <div class="Prices" v-html="orderInfo.itemName"></div>
          </div>
        </div>
      </div>
      <div class="method">
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
        立即购买
      </div>
    </div>
  </div>

</template>

<script>
  import pic_sort2 from "@/assets/images/pic_sort2.png"
  import {formatMoney,imgUrl} from "@/filters"

  export default {
    name: 'confirmAnOrder',
    data() {
      return {
        pic_sort2: pic_sort2,
        PresentPrice: "&yen;500.00",
        PayActive: 2,
        AddressInfo: {},
        itemId:'',
        payMode:'',
        orderInfo:{},
        orderInfoItem:{},

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
    mounted(){
      window['onPayFailure'] = () => {
        this.onPayFailure()
      }
      window['onPaySuccess'] = () => {
        this.onPaySuccess()
      }
    },
    methods: {
      onPayFailure() {
       /* this.$vux.alert.show({
          title: '提示',
          content: "取消",
          onShow () {
          },
          onHide () {
          }
        })*/

       this.$router.push({path:'/ForThePayment'})

      },
      onPaySuccess(){
     /*   this.$vux.alert.show({
          title: '提示',
          content: "成功",
          onShow () {
          },
          onHide () {
          }
        })*/
        this.$router.push({path:'/ToSendTheGoods'})

      },
      BuyNow(){
        //立即购买

        if(this.itemId != "" && this.payMode != "" && this.PayActive !="" && this.AddressInfo.id){
          this.$vux.loading.show({
            text: '请稍候...'
          })
          this.$axiosApi.createOrder(this.itemId,this.payMode,this.PayActive,this.AddressInfo.id).then(res=>{
            this.$vux.loading.hide()
            if(res.code == 200){
              let thirdData = JSON.stringify(res.data.thirdData.data)
              console.log(thirdData)
              this.$store.dispatch('getUserInfo')
              window.app.onWeChatPay(thirdData)
            }else if(res.code == 2003){
              this.$vux.alert.show({
                title: '提示',
                content: res.message,
                onShow () {
                },
                onHide:()=> {
                  this.$router.push({
                    path:'/allOrders'
                  })
                }
              })
            }else {
              console.log(res,'res')
              this.$vux.alert.show({
                title: '提示',
                content: res.message,
                onShow () {
                },
                onHide () {
                }
              })
            }
          })
        }else {
          this.$vux.alert.show({
            title: '提示',
            content: '请完善信息',
            onShow () {
            },
            onHide () {
            }
          })
        }

      },
      changeAddress(x){
        this.$router.push({path: '/ShippingAddress'})
      },
      getData() {
        if(this.itemId !=""){
          this.$axiosApi.addressList().then(res => {
            if (res.code == 200) {
              this.AddressInfo = res.data.find(v=>{
                return v.isDefault == 1
              }) || ""
            }
          })

          this.$axiosApi.orderItem(this.itemId,this.payMode).then(res => {
            this.$vux.loading.hide()
            if (res.code == 200) {
              this.orderInfo = res.data
              this.orderInfo.imgUrl = imgUrl(res.data.item.photo.split(',')[1])
              this.orderInfoItem = res.data.item

              if (this.payMode == 1) {
                this.orderInfo.itemName = '&yen;' + formatMoney(res.data.amount)
              } else if (this.payMode == 2) {
                this.orderInfo.itemName = res.data.coin + "U"
              } else {
                this.orderInfo.itemName = '&yen;' + formatMoney(res.data.amount) + "+" + res.data.coin + "U"
              }

            }else {
              this.$vux.alert.show({
                title: '提示',
                content: res.message,
                onShow () {
                },
                onHide () {
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
            img {
              width: 7.125rem;
              height: 7.125rem;
              border-radius: 0.5rem;
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
  }

</style>
