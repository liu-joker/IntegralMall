<template>

  <div class="tradeType">

    <div class="center">
      <div class="header" ref="grabble">
        <div class="head_center">

          <div class="grabble_input">
            <x-input placeholder="搜索" class="grabble_inp" type="text" :max="20" @on-focus="grabble_fun">
              <svg-icon slot="label" class="form_icon" icon-class="grabble"></svg-icon>
            </x-input>
          </div>

        </div>
      </div>

      <div class="banner">
        <div class="banner_content">
          <swiper :options="swiperOption" v-if="bannerList.length>1" ref="merchantSwiper">
            <swiper-slide class="swiper-demo-img" v-for="(x, index) in bannerList" :key="index">
              <img :src="x.photo | imgUrl" alt="" class="bannerImg">
            </swiper-slide>
          </swiper>

          <div class="indicatorList" :style="indicatorList">
            <div class="indicator_item" :style="indicator_item"></div>
          </div>
        </div>
      </div>

      <div class="nearby" ref="pageContent" :class="showScrollBox?'minHeight':''">
        <sticky transfer-dom ref="sticky" :offset="grabbleHeight" class="vuxFixed">
          <div class="nearbyDiv">
            <div class="list">
              <!--<div class="item" @click="showSelectList">-->
              <div class="item">
                <span>附近</span>
                <span class="select_span"><svg-icon class="form_icon" icon-class="bottom"></svg-icon></span>
              </div>
            </div>
          </div>
        </sticky>
        <div class="xDialog">
          <x-dialog v-model="showScrollBox" hide-on-blur class="dialogItem">
            <div class="dialogContent distance">
              <div class="item" v-for="(x,index) in kmList" :key="index" :class="kmActive == x.m?'active':''"
                   @click="selectData(x)">
                {{x.table}}
              </div>
            </div>
          </x-dialog>
        </div>

      </div>

      <div class="merchant_content fadeIn animated">
        <div class="list2">
          <waterfall :col='waterfallData.col' :data="shopList"
                     @loadmore="loadmore">
            <template>

              <div class="item2" v-for="(x,index) in shopList" @click="toAgentDetail(x)">
                <img :src="x.shopFrontPhoto | imgUrl" class="merchantLogo" alt="">
                <div class="item_content">
                  <div class="item_title">{{x.shopName}}</div>
                  <div class="startInfo">
                    <div class="left">
                      <span class="start" :style="startStyle"></span>
                      <span>4.5分</span>
                      <!--<span class="consumptionPerPerson">¥330/人</span>-->
                    </div>
                    <div class="right">
                      {{x.distance | plottingScale}}km
                    </div>
                  </div>
                  <div class="addressInfo">
                    <div class="left">
                      <span>{{x.city}}  {{x.district}}</span>
                      <span class="proportion">U米返还{{x.discount}}%</span>
                    </div>
                    <div class="right">
                      <!--<span class="salesVolume">月销量 359</span>-->
                    </div>
                  </div>
                  <div class="merchantInfo" v-if="x.selfIntroduce && x.selfIntroduce.trim() != ''">{{x.selfIntroduce}}</div>
                </div>
              </div>

            </template>
          </waterfall>
        </div>
        <div v-if="showShop" class="noItem">很遗憾，没有找到该商家！</div>
        <divider class="period" v-if="!showShop">没有更多了~</divider>
      </div>

      <back-to-top></back-to-top>
    </div>

  </div>

</template>

<script>
  import {XInput, Divider, XDialog, Sticky} from 'vux'
  import {imgUrl} from "@/filters";
  import BackToTop from "@/components/BackToTop"

  export default {
    name: 'tradeType',
    components: {
      XInput,
      Divider,
      BackToTop,
      XDialog,
      Sticky
    },
    data() {
      const self = this
      return {
        grabbleHeight: 0,
        bannerList: [{resume: "真的美", photo: "banner11-12.png", order: 1}, {
          resume: "真的丑",
          photo: "pic_sort11-12.png",
          order: 2
        }],
        swiperOption: {//swiper3
          notNextTick: true,
          loop: true,
          autoplayStopOnLast: false,
          autoplay: {
            delay: 5000,
            stopOnLastSlide: false,
            disableOnInteraction: false
          },
          speed: 500,
          on: {
            slideChangeTransitionStart: function () {
              self.swiperIndex = this.realIndex
            }
          }
        },
        indicatorList: '',
        swiperIndex: 0,
        startStyle: {
          'background-position': '0px -18rem' //0.5start = -2.5rem
        },
        shopList: [1, 2],
        kmList: [{m: 500, table: '附近'}, {m: 1000, table: '1km'}, {m: 5000, table: '5km'}, {m: 10000, table: '10km'},
          {m: 15000, table: '15km'}, {m: 20000, table: '20km'},],
        showScrollBox: false,
        kmActive: 500,
        pageContent: '',
        pageNum: 1,
        pageSize: 20,
        waterfallData: {
          col: 1,
          width: 0,
          gutterWidth: 0
        },
        tradeType:''
      }
    },
    computed: {
      itemWidth: function () {
        return document.documentElement.clientWidth
      },
      gutterWidth: function () {
        return 0.024 * document.documentElement.clientWidth
      },
      showShop: function () {
        if (this.shopList.length != 0) {
          return false
        } else {
          return true
        }
      },
      indicator_item: function () {
        let w = this.bannerList.length * 1.875
        this.indicatorList = `width:` + w + `rem;margin-left:` + -w / 2 + `rem`
        let r = this.swiperIndex * 1.875
        let style = `
        left:${r}rem
        `
        return style
      },
    },
    created() {

      this.tradeType = this.$route.query.tradeType
      this.getData()
    },
    mounted() {
      document.title = this.$route.query.title
      this.pageContent = this.$refs.pageContent.offsetTop + 10
    },
    methods: {
      toAgentDetail(x){
        //https://www.hlxiaoxiong.com/IntegralMall/#/merchantInfo?agentId=1&brandId=deb99c1be8a748a59f760485fd49df15
        this.$router.push({
          path:`/merchantInfo?agentId=${x.agentId}&brandId=${this.brandId}&terminalType=1`
        })
      },
      getData() {

        console.log('getData')
        let shopName
        let brandId = this.$store.getters.userInfo.brandId;
        let lng = 114.03167;
        let lat = 22.532151;
        let distance ;  //=this.kmActive//距离
        let pageNum = this.pageNum;
        let pageSize = this.pageSize;
        let tradeType = this.tradeType;  //商户类型

        this.$axiosApi.getNearAgent(brandId, lng, lat, distance, pageNum, pageSize,shopName,tradeType).then(res=>{
          this.info = res.data
          this.shopList = res.data.list
          this.GrabbleShow = false

          this.search = [...new Set([shopName].concat(this.search))]
          this.$Cookie.setMGHistory(this.search)
        })
      },
      loadmore() {
        if (this.shopList.length == 0) return
        this.pageSize += 10
        clearInterval(this.timer);
        this.timer = null;
        this.timer = setTimeout(() => {
          this.getData()
        }, 300)
      },
      selectData(x) {
        //附近
        this.kmActive = x.m
        this.showScrollBox = false
        //this.getData()
      },
      showSelectList() {
        this.showScrollBox = !this.showScrollBox
        this.$nextTick(() => {
          if (this.showScrollBox) {
            document.body.scrollTop = document.documentElement.scrollTop = this.pageContent
          }
        })

      },
      grabble_fun() {
        this.$router.push({
          path: '/merchantGrabble'
        })
      },
    }
  }
</script>

<style rel="stylesheet/less" lang="less">


</style>
