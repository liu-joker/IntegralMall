<!--订单详情-->
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
            <div class="label">所需U米 ：</div>
            <div class="Prices">{{orderInfo.coin}}</div>
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
          <x-button class="but tag-read" :data-clipboard-text="orderInfo.orderNum" @click.native="copyText">复制</x-button>
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
        <div class="item" v-for="(x,index) in expressDetail" :key="index" :class="index == 0?'active':''">
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
  import {formatMoney, imgUrl, formatDate} from "@/filters"
  import {XButton} from 'vux'

  import Clipboard from 'clipboard'//点击复制组件
  export default {
    name: 'orderDetails',
    components: {
      XButton
    },
    data() {
      return {
        PayActive: 0,
        AddressInfo: {},
        orderNum: '',
        orderInfo: {},
        expressDetail: {},

      }
    },
    created() {
      this.orderNum = this.$route.params.orderNum
      this.getData()
    },
    methods: {
      copyText() {
        var clipboard = new Clipboard('.tag-read')

        clipboard.on('success', e => {
          this.$vux.toast.show({text: '文字已复制到粘贴板', position: 'top', type: "text", width: "20em"})
          // 释放内存
          console.log(1)

          clipboard.destroy()
        })
        clipboard.on('error', e => {
          // 不支持复制
          this.$vux.toast.show({text: '请长按文字选择复制', position: 'top', type: "text", width: "20em"})
          // 释放内存
          clipboard.destroy()
        })
      },
      changeAddress(x) {
        if (x == 0) {
          this.$router.push({path: '/ShoppingAddress'})
        } else {
          this.$router.push({path: '/AddShoppingAddress'})
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
              this.orderInfo.imgUrl = imgUrl(this.orderInfo.itemPhoto.split(',')[1])
              this.orderInfo.itemAmount = '¥' + formatMoney(this.orderInfo.amount) + "+" + this.orderInfo.coin + "U米"

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
              } else {
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



</style>
