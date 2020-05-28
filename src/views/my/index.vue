<template>

  <div class="My">

    <div class="M_head">

      <div class="userInfo">
        <img :src="userPhoto()" alt=""
             class="userImg">
        <span class="phone">{{$store.getters.userInfo.phone}}</span>
      </div>
      <div class="allOrders">
        <span @click="allOrders">全部订单>></span>
      </div>
    </div>
    <div class="FeatureList">
      <div class="item" @click="OrderStatus(0)">
        <img :src="icon_dfukuan" alt="">
        <div class="FeatureName">待付款</div>
      </div>
      <div class="item" @click="OrderStatus(1)">
        <img :src="icon_dfahuo" alt="">
        <div class="FeatureName">待发货</div>
      </div>
      <div class="item" @click="OrderStatus(2)">
        <img :src="icon_dshou" alt="">
        <div class="FeatureName">待收货</div>
      </div>
    </div>

    <div class="cellList">
      <group>
        <cell :title="x.title" :value="x.value" @click.native="onClick(x)" v-for="(x,index) in cellList" :key="index"
              :is-link="x.type=='url'" class="cellItem"></cell>
      </group>
    </div>

  </div>

</template>

<script>

  import pic_sort4 from "@/assets/images/pic_sort4.png"
  import icon_dfukuan from "@/assets/images/icon_dfukuan.png"
  import icon_dfahuo from "@/assets/images/icon_dfahuo.png"
  import icon_dshou from "@/assets/images/icon_dshou.png"
  import pic_head from "@/assets/images/pic_head@2x.png"
  import {Group, Cell} from 'vux'
  import {formatMoney, imgUrl} from "@/filters"

  export default {
    name: 'index',
    components: {
      Group,
      Cell
    },
    data() {
      return {
        pic_sort4: pic_sort4,
        pic_head: pic_head,
        icon_dfukuan: icon_dfukuan,
        icon_dfahuo: icon_dfahuo,
        icon_dshou: icon_dshou,
        cellList: [{
          title: '收货地址',
          type: 'url',
          url: "/ShippingAddress",
          value: '',
          funType: 'url'
        }, {
          title: '我的U米',
          type: 'url',
          url: "/MyUmi",
          value: '',
          funType: 'url'
        }, {
          title: '修改交易密码',
          type: 'url',
          url: "/updatePayPwd",
          value: '',
          funType: 'url'
        }, {
          title: '联系客服',
          type: 'url',
          url: "/ShippingAddress",
          value: '',
          funType: 'AppUrl'
        }, {
          title: '帮助',
          type: 'url',
          url: "/HelpCenter",
          value: '',
          funType: 'url'
        },],
        userPhoto: function () {
          if (this.$store.getters.userInfo.photo && this.$store.getters.userInfo.photo != "") {
            return imgUrl(this.$store.getters.userInfo.photo)
          } else {
            return this.pic_head
          }
        }
      }
    },
    methods: {

      allOrders() {
        this.$router.push({
          path: '/allOrders'
        })
      },
      OrderStatus(x) {
        if (x == 0) {
          this.$router.push({
            path: '/ForThePayment'
          })
        } else if (x == 1) {
          this.$router.push({
            path: '/ToSendTheGoods'
          })
        } else {
          this.$router.push({
            path: '/ForTheGoods'
          })
        }
      },
      onClick(x) {
        if (x.funType == 'url') {
          console.log(x)
          this.$router.push({
            path: x.url
          })
        } else if (x.funType == 'AppUrl') {

          if (this.$EnvironmentAI() == 1) {
            window.app.contactService()
          } else if (this.$EnvironmentAI() == 2) {
            try {
              window.app.contactService()
            }catch (err){
              window.webkit.messageHandlers.contactService.postMessage({})
            }
          }


        }
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less">

  .My {
    background-color: #f4f4f4;
    min-height: 100vh;

    .weui-cell_access .weui-cell__ft:after {
      width: 1.5rem;
      height: 1.5rem;
      margin-top: -0.75rem;
    }
    .weui-cell:before {
      left: 2rem;
    }

    .M_head {
      padding: 4rem 1.875rem 1.75rem;
      margin-bottom: 1px;
      background-color: #ffffff;
      .userInfo {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        font-size: 2rem;
        color: #323232;
        margin-bottom: 1.875rem;
        .userImg {
          width: 5.5rem;
          height: 5.5rem;
          border-radius: 50%;
          margin-right: 1.25rem;
        }
      }
      .allOrders {
        font-size: 1.5rem;
        color: #323232;
        text-align: right;
      }
    }
    .FeatureList {
      margin-top: 1px;
      background-color: #ffffff;
      padding: 1.75rem 0;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .item {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        font-size: 1.5rem;
        > img {
          margin-bottom: 0.75rem;
          width: 3.5rem;
          height: 3.5rem;
        }
      }
    }
    .cellList {
      background-color: #fff;
      margin-top: 0.625rem;
      .weui-cells {
        margin-top: 0;
      }
      .cellItem {
        font-size: 2rem;
        padding: 2rem 1.5rem 2rem 2rem;
      }
    }
  }

</style>
