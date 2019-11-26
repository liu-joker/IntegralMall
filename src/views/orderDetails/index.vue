<template>

  <div class="confirmAnOrder">

    <div class="C_head">
      <div class="headTitle">
        <span class="b_tag"></span>
        <span>收货地址</span>
      </div>
      <div class="addAddress">
        <div class="AddressInfo">
          <p>{{orderInfo.shopName}}</p>
          <p>{{orderInfo.shopPhone}}</p>
          <p>{{orderInfo.shopAreaName}} {{orderInfo.address}}</p>
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
            <img :src="orderInfo.imgUrl" alt="">
          </div>
          <div class="textInfo">
            <div>{{orderInfo.itemName}}</div>
            <div class="numInfo">
              <div class="num" v-html="orderInfo.itemAmount"></div>
              <div>x1</div>
            </div>
          </div>
        </div>
        <div class="CommodityPrices">
          <div class="PricesItemInfo">
            <div class="label">商品价格：</div>
            <div class="Prices">&yen;{{orderInfo.showAmount | formatMoney}}</div>
          </div>
          <div class="PricesItemInfo">
            <div class="label">会员折扣：</div>
            <div class="Prices">-&yen;{{(orderInfo.showAmount - orderInfo.amount) | formatMoney}}</div>
          </div>
          <div class="PricesItemInfo">
            <div class="label">U米折扣 ：</div>
            <div class="Prices">-{{orderInfo.coin}}</div>
          </div>
          <div class="PricesItemInfo defaultPrices">
            <div class="label">实际支付价格：</div>
            <div class="Prices" v-html="orderInfo.itemAmount"></div>
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
            订单编号：{{orderInfo.orderNum}}
          </p>
          <div class="but tag-read"  :data-clipboard-text="orderInfo.orderNum" @click="copyText">复制</div>
        </div>
        <div class="item">
          <p>
            订单创建时间：{{orderInfo.createTime}}
          </p>
        </div>
        <div class="item">
          <p>
            订单支付时间：{{orderInfo.updateTime}}
          </p>
        </div>
        <div class="item" v-if="orderInfo.expressNumber!=''">
          <p>
            物流编号：{{orderInfo.expressNumber}} 【{{orderInfo.expressName}}】
          </p>
        </div>
      </div>

    </div>

    <div class="expressDetail" v-if="expressDetail.length !=0">
      <div class="headTitle">
        <span class="b_tag"></span>
        <span>物流信息</span>
      </div>

      <div class="logisticsList">
        <div class="item" v-for="(x,index) in expressDetail" :key="index"  :class="index == 0?'active':''">
          <div class="time">
            {{x.time}}
          </div>
          <div class="itemCenter"><span class="radio"></span></div>
          <div class="info">
            {{x.desc}}
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import pic_sort2 from "@/assets/images/pic_sort2.png"
  import {formatMoney, imgUrl, formatDate} from "@/filters"
  import Clipboard from 'clipboard'//点击复制组件
  export default {
    name: 'orderDetails',
    data() {
      return {
        pic_sort2: pic_sort2,
        PayActive: 0,
        AddressInfo: {},
        orderNum: '',
        orderInfo: {},
        expressDetail: {},

      }
    },
    created() {
       this.orderNum = this.$route.params.orderNum
      console.log(this.orderNum,"000")
      this.getData()
    },
    methods: {
      copyText() {
        var clipboard = new Clipboard('.tag-read')

        clipboard.on('success', e => {
          this.$vux.toast.show({text: '已复制到粘贴板',position: 'top',type:"text",width:"20em"})
          // 释放内存
          console.log(1)

          clipboard.destroy()
        })
        clipboard.on('error', e => {
          // 不支持复制
          this.$vux.toast.show({text: '该浏览器不支持复制',position: 'top',type:"text",width:"20em"})
          // 释放内存
          clipboard.destroy()
        })
      },
      changeAddress(x) {
        if (x == 0) {
          this.$router.push({path: '/ShippingAddress'})
        } else {
          this.$router.push({path: '/AddShippingAddress'})
        }
      },
      getData() {
        this.$vux.loading.show({
          text: '加载中...'
        })
        if (this.orderNum != "") {


          this.$axiosApi.findShopOrderDetails(this.orderNum).then(res => {
            this.$vux.loading.hide()
            if (res.code == 200) {

              this.orderInfo = res.data.orderDetail
              this.orderInfo.imgUrl = imgUrl(this.orderInfo.itemPhoto.split(',')[0])
              if (this.orderInfo.coin == 0) {
                //金额
                this.orderInfo.itemAmount = '&yen;' + formatMoney(this.orderInfo.amount)
              } else if (this.orderInfo.amount == 0) {
                //积分
                this.orderInfo.itemAmount = this.orderInfo.coin + "U"
              } else {
                //现金加积分
                this.orderInfo.itemAmount = '&yen;' + formatMoney(this.orderInfo.amount) + "+" + this.orderInfo.coin + "U"
              }

              if (res.data.expressDetail) {
                let list = res.data.expressDetail.msg.context


                //es6 排序
                let qsort = fn => ([x, ...xn]) => x == null ? []
                  : [
                    ...qsort(fn)(xn.filter(a => fn(a, x))),
                    x,
                    ...qsort(fn)(xn.filter(a => !fn(a, x)))
                  ]


                list = qsort((a, b) => a.time > b.time)(list)


                this.expressDetail = list.map(v => {
                  v.time = formatDate(v.time * 1000)
                  return v
                })
                console.log(this.expressDetail)
              }else {
                this.expressDetail = []
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
              height: 100%;
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
    .OrdersInfo {
      background-color: #ffffff;
      padding: 1.875rem 0 2rem 1.875rem;
      .ItemInfo {
        padding-left: 1.75rem;
        .item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 1.5rem;
          color: #323232;
          line-height: 2.875rem;
          padding-right: 1.75rem;
          .but {
            font-size: 1.25rem;
            width: 4.25rem;
            height: 1.875rem;
            color: #ffffff;
            text-align: center;
            line-height: 1.875rem;
            border-radius: 2px;
            background-color: #2D2922;
            &:active {
              opacity: 0.85;
            }
          }
        }
      }
    }
    .expressDetail {
      margin-top: 1px;
      padding: 1.875rem 0 2rem 1.875rem;
      background-color: #fff;
      .logisticsList {
        padding: 0 1rem;
        .item {
          padding: 0.75rem 0;
          display: flex;
          align-items: flex-start;
          justify-content: space-around;
          .time {
            font-size: 1.5rem;
            width: 8.5rem;
            text-align: right;
            margin-right: 1.5rem;
          }
          .itemCenter{
            padding: 0.5rem 0;
            .radio{
              display: block;
              width: 1rem;
              height: 1rem;
              border-radius: 0.5rem;
              background-color: #CCCCCC;

            }
          }

          .info {
            font-size: 1.5rem;
            margin-left: 1.5rem;
            flex: 1;
            color: #868686;
          }

          &.active{
            .itemCenter{
              .radio{
                background-color: #FF9B36;
              }
            }
            .info{
              color: #323232;
            }
          }

        }
      }
    }

  }

</style>
