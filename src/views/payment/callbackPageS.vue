<!--支付成功回调-->
<template>

  <div class="callbackPageS">
    <div class="head">
      <div class="item">
        <img :src="callbackPageS" alt="">
        <p>支付成功</p>
      </div>
    </div>
    <div class="center">
      <div class="item">
        <p>实付：¥{{ amount | formatMoney}}</p>
        <p>获得U米：<span class="yellow">{{point}}</span></p>
        <p v-if="phone">U米获取手机号：<span class="yellow">{{phone}}</span></p>
        <div class="noPhone">
          <p class="download">U米可前往小米粒免费兑换商品，<span @click="download">前往下载>></span></p>
        </div>
      </div>
    </div>
    <div class="selectTitle">
      <div class="left">猜你喜欢</div>
      <div class="right" @click="toMore">查看更多>></div>
    </div>

    <div class="shopContent" ref="shopContent">
      <div class="commodity_content">
        <div class="list" >
          <waterfall :col='waterfallData.col' :width="itemWidth" :gutterWidth="gutterWidth"
                     :data="shopList"
          >
            <template>
              <div class="item" v-for="(x,index) in shopList" :key="index"
                   @click="GoodsDetails(x)">
                <div class="img">
                  <img v-lazy="x.imgUrl" alt="">
                  <!--<img :lazy-src="x.imgUrl" alt="">-->
                  <!--<img :src="x.imgUrl" alt="">-->
                </div>
                <div class="text">
                  <div class="name">{{x.name}}</div>
                  <div class="foot">
                    <div class="left">{{x.coin}}U米</div>
                    <div class="right">
                      <img :src="icon_browse" alt="" class="eye">
                      {{x.browse}}
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </waterfall>
          <div v-if="showShop" class="noItem">暂无该类商品</div>

          <div class="period">
            <divider class="periodDivider  fadeIn animated" v-show="dividerShow && !showShop">
              前往APP查看更多商品
            </divider>
            <div class="periodLoading" v-show="!dividerShow">
              <load-more></load-more>
            </div>
          </div>
        </div>
      </div>
    </div>


    <!--  <div class="foot">
        <x-button class="but">前往商城免费兑换</x-button>
      </div>-->


  </div>

</template>

<script>
  import {XButton, Scroller, LoadMore,Divider} from 'vux'
  import callbackPageS from "@/assets/images/callbackPageS.png"
  import {formatMoney, imgUrl} from "@/filters"
  import icon_browse from "@/assets/images/icon_browse.png"

  export default {
    name: 'callbackPageS',
    components: {
      XButton,
      Scroller,
      LoadMore,
      Divider
    },
    data() {
      return {
        icon_browse: icon_browse,
        callbackPageS: callbackPageS,
        amount: '0',
        point: '0',
        isUser: 0,
        preUser: "",
        phone: "",
        waterfallData: {
          col: 2,
          width: 0,
          gutterWidth: 0
        },
        selectList: [],
        dividerShow: false,
        shopList:[],
        third: 0,
        itemType: '',
        pageNum: 1,
        pageSize: 6,
      }
    },
    computed: {
      itemWidth: function () {
        return 0.445 * document.documentElement.clientWidth
      },
      gutterWidth: function () {
        return 0.024 * document.documentElement.clientWidth
      },
      swiper() {
        return this.$refs.mySwiper.$swiper
      },
      showShop: function () {
        if (this.shopList) {
          if (this.shopList.length == 0) {
            return true
          } else {
            return false
          }
        } else {
          return false
        }
      },
    },
    created() {
      this.amount = this.$route.query.amount
      this.point = this.$route.query.point
      this.isUser = this.$route.query.isUser || 0
      this.preUser = this.$route.query.preUser
      this.phone = this.$route.query.phone
      this.getData()
    },
    methods: {
      toMore(){
        this.$router.push({
          path: `/commodityTypeList?id=0&userId=${this.preUser}`
        })
      },
      getData(type) {
        let itemType = this.itemType
        let name = ""
        let third = this.third //0
        let pageNum = this.pageNum
        let pageSize = this.pageSize
        this.$axiosApi.itemList(itemType, third, pageNum, pageSize, name).then(res => {
          if (res.code == 200) {
            //
            let time = new Date().getTime() / 100000000
            this.info = res.data
            let shopList = res.data.list.map(v => {
              v.imgUrl = imgUrl(v.photo.split(',')[0])
              let resume = 550
              v.browse = (time + (v.name.length * resume)).toFixed(0)
              return v
            })
            this.shopList = shopList
            console.log(shopList)

            this.$nextTick(() => {
              this.dividerShow = true
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
        })
      },
      GoodsDetails(x) {
        if (!this.preUser || this.preUser == "") return
        this.$router.push({path: `/GoodsDetails/${x.id}?userId=${this.userId}`})
      },
      download() {
        if (!this.preUser || this.preUser == "") return
        location.href = 'https://www.hlxiaoxiong.com/h5/#/?userID=' + this.preUser
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less">


</style>
