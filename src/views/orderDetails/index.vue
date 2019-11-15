<template>

  <div class="confirmAnOrder">

    <div class="C_head">
      <div class="headTitle">
        <span class="b_tag"></span>
        <span>收货地址</span>
      </div>
      <div class="addAddress">
        <div class="AddressInfo">
          <p>{{AddressInfo.name}}</p>
          <p>{{AddressInfo.phone}}</p>
          <p>{{AddressInfo.areaName}} {{AddressInfo.address}}</p>
        </div>
      </div>
    </div>

    <div class="OrdersItemInfo">
      <div class="headTitle">
        <span class="b_tag"></span>
        <span>订单商品</span>
      </div>
      <div class="O_content">
        <div class="goods">
          <div class="img">
            <img  :src="orderInfo.imgUrl || pic_sort2" alt="">
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
            <div class="label">会员折扣：</div>
            <div class="Prices">-&yen;{{(orderInfoItem.showAmount - orderInfo.amount) | formatMoney}}</div>
          </div>
          <div class="PricesItemInfo">
            <div class="label">U米折扣 ：</div>
            <div class="Prices">-{{orderInfo.coin}}</div>
          </div>
          <div class="PricesItemInfo defaultPrices">
            <div class="label">实际支付价格：</div>
            <div class="Prices" v-html="orderInfo.itemName"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="OrdersInfo">
      <div class="headTitle">
        <span class="b_tag"></span>
        <span>订单信息</span>
      </div>

      <div class="ItemInfo">
        <div class="item">
          <p>
            订单编号：3454DSA41327FA
          </p>
          <div class="but">复制</div>
        </div>
        <div class="item">
          <p>
            订单创建时间：2019-05-030 18:32:23
          </p>
        </div>
        <div class="item">
          <p>
            订单支付时间：2019-05-030 18:32:23
          </p>
        </div>
        <div class="item">
          <p>
            物流编号：543287514357
          </p>
        </div>
      </div>

    </div>
  </div>

</template>

<script>
  import pic_sort2 from "@/assets/images/pic_sort2.png"
  import {formatMoney,imgUrl} from "@/filters"

  export default {
    name: 'orderDetails',
    data() {
      return {
        pic_sort2: pic_sort2,
        PresentPrice: "&yen;500.00",
        PayActive: 0,
        AddressInfo: {},
        orderId:'',
        payMode:'',
        orderInfo:{},
        orderInfoItem:{},

      }
    },
    created() {
      this.orderId = this.$route.params.orderId
      this.payMode = this.$route.params.payMode
      console.log(this.orderId)
      this.getData()
    },
    methods: {
      changeAddress(x){
        if(x == 0){
          this.$router.push({path: '/ShippingAddress'})
        }else {
          this.$router.push({path: '/AddShippingAddress'})
        }
      },
      getData() {
        if(this.orderId !=""){
          this.$axiosApi.userAddress().then(res => {
            if (res.code == 200) {
              this.AddressInfo = res.data
            }
          })

          this.$axiosApi.orderConfirmDetail(this.orderId).then(res => {
            if (res.code == 200) {
              this.orderInfo = res.data
              this.orderInfo.imgUrl = imgUrl(res.data.item.photo.split(',')[0])
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
      margin-bottom: 1.25rem;
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
    .OrdersItemInfo {
      margin-top: 0.625rem;
      background-color: #ffffff;
      padding: 1.875rem 0 0 1.875rem;
      .O_content {
        padding-left: 1.75rem;
        .goods {
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
              width: 100%;
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
    .OrdersInfo{
      background-color: #ffffff;
      padding: 1.875rem 0 2rem 1.875rem;
      .ItemInfo{
        padding-left: 1.75rem;
        .item{
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 1.5rem;
          color: #323232;
          line-height: 2.875rem;
          padding-right: 1.75rem;
          .but{
            font-size: 1.25rem;
            width: 4.25rem;
            height: 1.875rem;
            color: #ffffff;
            text-align: center;
            line-height: 1.875rem;
            border-radius: 2px;
            background-color: #2D2922;
            &:active{
              opacity: 0.85;
            }
          }
        }
      }
    }

  }

</style>
