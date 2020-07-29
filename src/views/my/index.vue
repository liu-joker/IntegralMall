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
        <cell :title="x.title" :value="x.value" @click.native="onClick(x)" v-for="(x,index) in cellList" :key="index" v-if="x.show"
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
        brandId: '',
        environment: '',
        cellList: [{
          id:1,
          show:true,
          title: '收货地址',
          type: 'url',
          url: "/ShoppingAddress",
          value: '',
          funType: 'url'
        }, {
          id:2,
          show:true,
          title: '我的U米',
          type: 'url',
          url: "/MyUmi",
          value: this.$store.getters.userInfo.coin,
          funType: 'url'
        }, {
          id:3,
          show:true,
          title: '修改交易密码',
          type: 'url',
          url: "/updatePayPwd",
          value: '',
          funType: 'url'
        }, {
          id:4,
          show:true,
          title: '联系客服',
          type: 'url',
          url: "/ShoppingAddress",
          value: '',
          funType: 'AppUrl'
        }, {
          id:5,
          show:true,
          title: '帮助',
          type: 'url',
          url: "/HelpCenter",
          value: '',
          funType: 'url'
        }, {
          id:6,
          show:this.$route.query.environment == 1,
          title: '退出登录',
          type: 'url',
          url: `/?brandId=${this.brandId}&environment=${this.environment}`,
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
    computed: {

    },
    created(){
      this.brandId = this.$route.query.brandId
      this.environment = this.$route.query.environment || ""
      console.log(document.location.hostname)
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

          if(x.id == 6){
            this.$Cookie.setToken('')
            this.$vux.toast.show({text:'当前账户已退出'})
            var address = location.href.split('/#/')[0] + '/#/';
            window.location.replace(address + `?brandId=${this.brandId}&environment=${this.environment}`)
            return
          }
          this.$router.push({
            path: x.url
          })
        } else if (x.funType == 'AppUrl') {

          if(this.$Cookie.getSEnvironment() == 1){

            this.$vux.confirm.show({
              content: "客服电话：4009637768",
              onCancel() {
                window.location.href = 'tel://4009637768';
              },
              onConfirm: () => {

              }
            })

            return
          }

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



</style>
