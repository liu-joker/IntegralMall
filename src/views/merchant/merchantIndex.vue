<template>

  <div class="merChantIndex">

    <div class="header" ref="grabble">
      <div class="left">
        <img src="@/assets/images/pic_sjxc.png" alt="">
        <span>深圳</span>
        <span class="select_span"><svg-icon class="form_icon" icon-class="bottom"></svg-icon></span>
      </div>
      <div class="grabble_input">
        <x-input placeholder="搜索" class="grabble_inp" type="text" :max="20" @on-focus="grabble_fun">
          <svg-icon slot="label" class="form_icon" icon-class="grabble"></svg-icon>
        </x-input>
      </div>
      <div class="right">
        <div class="popover">
          <img src="@/assets/merchant/icon_add@2x.png" alt="更多" @click="popoverShowFun()" id="moreFun"
               ref="moreFun">
          <transition name="fade">
            <div class="popoverContent" v-show="popoverShow" transiton="fade" ref="isPopover">
              <div class="list">
              <!--  <div class="item">
                  <img src="@/assets/merchant/icon_add_sys.png" alt="">
                  <span>扫一扫</span>
                </div>
               -->
                <div class="item" @click="toQRCode">
                  <img src="@/assets/merchant/icon_add_skm.png" alt="">
                  <span>收款码</span>
                </div>
                <div class="item" @click="toMyOrder">
                  <img src="@/assets/merchant/icon_myorder.png" alt="">
                  <span>我的订单</span>
                </div>
                <div class="item" @click="toAgentCenter">
                  <img src="@/assets/merchant/icon_shangjiaruzhu.png" alt="">
                  <span>{{$store.getters.agentInfo.isAgent == 1 && $store.getters.agentInfo.status == 1?'商家中心':'商家入驻'}}</span>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>

    <div class="mallSelect">
      <div class="tab_title">
        <div class="titleItem" @click="toIndex">
          <svg-icon class="form_icon" icon-class="shoppingCart"></svg-icon>
          <span>免费商城</span>
        </div>
      </div>
      <div class="list">
        <div class="item" @click="shopSelectList(0)">
          <img src="@/assets/merchant/icon_jingxuan.png" alt="精选">
          <span>精选</span>
        </div>
        <div class="item" @click="shopSelectList(26)">
          <img src="@/assets/merchant/icon_meishi2.png" alt="美食">
          <span>美食</span>
        </div>
        <div class="item" @click="shopSelectList(19)">
          <img src="@/assets/merchant/icon_canyin.png" alt="餐饮">
          <span>餐饮</span>
        </div>
        <div class="item" @click="shopSelectList(20)">
          <img src="@/assets/merchant/icon_jiaoyu.png" alt="教育">
          <span>教育</span>
        </div>
        <div class="item" @click="shopSelectList(0)">
          <img src="@/assets/merchant/icon_quanbu.png" alt="全部">
          <span>全部</span>
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

    <div class="merchantRecommend">
      <div class="tab_title">
        <div class="titleItem" @click="getAuthCode">
          <svg-icon class="form_icon" icon-class="merchant"></svg-icon>
          <span>商家推荐</span>
        </div>
      </div>
      <div class="list">
        <div class="item" v-for="(x,index) in selectList" :key="index" @click="toAgentGrabble(x)">
          <img :src="x.img" alt="">
          <span>{{x.name}}</span>
        </div>
      </div>
    </div>

    <div class="nearby" ref="pageContent">
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
            <div class="item" v-for="(x,index) in kmList" :key="index" :class="kmActive == x.m?'active':''" @click="selectData(x)">
              {{x.table}}
            </div>
          </div>
        </x-dialog>
      </div>

    </div>



    <div class="merchantList" :class="showScrollBox?'minHeight':''">
      <waterfall :col='waterfallData.col' :data="shopList"
                 @loadmore="loadMore">
        <template>
      <div class="list">

        <div class="item" v-for="(x,index) in shopList" @click="toAgentDetail(x)">
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
                <span class="proportion">U米返还{{x.discount || '0'}}%</span>
              </div>
              <div class="right">
                <!--<span class="salesVolume">月销量 359</span>-->
              </div>
            </div>
            <div class="merchantInfo" v-if="x.selfIntroduce && x.selfIntroduce.trim() != ''">{{x.selfIntroduce}}</div>
          </div>
        </div>
      </div>
        </template>
      </waterfall>
      <divider class="period" v-if="!showShop">没有更多了~</divider>
    </div>

    <back-to-top></back-to-top>

  </div>

</template>

<script>
  import {Scroller, LoadMore, Divider, XInput, XImg, Sticky, Popover, Cell, XDialog} from 'vux'
//  import 'swiper/dist/css/swiper.css'
  import {imgUrl,environment} from "@/filters";
  import {TransferDomDirective as TransferDom} from 'vux'
  import icon_meishi from "@/assets/merchant/icon_meishi.png"
  import icon_jiudian from "@/assets/merchant/icon_jiudian.png"
  import icon_yule from "@/assets/merchant/icon_yule.png"
  import icon_lvyou from "@/assets/merchant/icon_lvyou.png"
  import icon_meirong from "@/assets/merchant/icon_meirong.png"
  import icon_jiaju from "@/assets/merchant/icon_jiaju.png"
  import icon_yiliao from "@/assets/merchant/icon_yiliao.png"
  import icon_jianshen from "@/assets/merchant/icon_jianshen.png"
  import icon_shenghuo from "@/assets/merchant/icon_shenghuo.png"
  import icon_gengduo from "@/assets/merchant/icon_gengduo.png"
  import BackToTop from "@/components/BackToTop"

  export default {
    name: 'merchantIndex',
    components: {
      Scroller,
      LoadMore,
      Divider,
      XInput,
      XImg,
      Sticky,
      Popover,
      Cell,
      XDialog,
      TransferDom,
      BackToTop
    },
    data() {
      const self = this
      return {
        grabbleHeight: 88,
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
        bannerList: [{resume: "真的美", photo: "banner11-12.png", order: 1}, {
          resume: "真的丑",
          photo: "pic_sort11-12.png",
          order: 2
        }],
        indicatorList: '',
        swiperIndex: 0,
        popoverShow: false,
        startStyle: {
          'background-position': '0px -18rem' //0.5start = -2.5rem
        },
        UserStartStyle: {
          'background-position': '0px -18rem' //0.5start = -2.5rem
        },
        selectList: [
          {type: 1, name: '美食', img: icon_meishi},
          {type: 2, name: '酒店住宿', img: icon_jiudian},
          {type: 3, name: '休闲娱乐', img: icon_yule},
          {type: 4, name: '周边旅游', img: icon_lvyou},
          {type: 5, name: '美容美发', img: icon_meirong},
          {type: 6, name: '家居装修', img: icon_jiaju},
          {type: 7, name: '医疗健康', img: icon_yiliao},
          {type: 8, name: '运动健康', img: icon_jianshen},
          {type: 9, name: '生活服务', img: icon_shenghuo},
          {type: 10, name: '更多', img: icon_gengduo},
        ],
        showScrollBox: false,
        kmList: [{m: 500, table: '附近'}, {m: 1000, table: '1km'}, {m: 5000, table: '5km'}, {m: 10000, table: '10km'},
          {m: 15000, table: '15km'}, {m: 20000, table: '20km'},],
        pageContent: '',
        kmActive: 500,
        waterfallData: {
          col: 1,
          width: 0,
          gutterWidth: 0
        },
        shopList: [],
        pageNum: 1,
        pageSize: 20,
        info: {},
        brandId: '59c7a6325bb44368a6102cb189504b05'
      }
    },
    computed: {
      indicator_item: function () {
        let w = this.bannerList.length * 1.875
        this.indicatorList = `width:` + w + `rem;margin-left:` + -w / 2 + `rem`
        let r = this.swiperIndex * 1.875
        let style = `
        left:${r}rem
        `
        return style
      },
      showShop: function () {
        if (this.shopList.length != 0) {
          return false
        } else {
          return true
        }
      }
    },
    created() {

      console.log(environment(), '环境')

      /* this.$vux.alert.show({
         title: '提示',
         content: environment(),
         onShow() {
         },
         onHide() {
         }
       })*/


      document.addEventListener('click', (e) => {
        //
        try {
          if (!this.$refs.isPopover.contains(e.target) && e.target.id != 'moreFun') {
            this.popoverShow = false;
          }
        } catch (err) {
        }
      })
      this.getBannerList()
      // this.isAgent()
      this.getData()
    },
    mounted() {
      this.grabbleHeight = this.$refs.grabble.offsetHeight
      this.pageContent = this.$refs.pageContent.offsetTop - this.$refs.grabble.offsetHeight + 10
      console.log(this.pageContent)
      //  this.getAuthCode()
    },
    methods: {
      popoverShowFun() {
        if (this.popoverShow == false) {
          this.$store.dispatch('getAgentInfo').then(res => {
            console.log(this.$store.getters.agentInfo)
            this.popoverShow = true
          })
        } else {
          this.popoverShow = false
        }

      },
      getAuthCode() {
        ly.getAuthCode({
          "merchantId": "2020042900101187",
          "scopes": ["lzfApiUserInfo", "lzfApiChooseBankCard"],
          "callback": ((result) => {
            //处理授权码
            //  console.log(result,'result')

            if (result.status == 1) {
              this.$vux.alert.show({
                title: '提示',
                content: result.code,
                onShow() {
                },
                onHide() {
                }
              })
            } else {
              this.$vux.alert.show({
                title: '提示',
                content: result.failureDetails,
                onShow() {
                },
                onHide() {
                }
              })
            }
          })
        });
      },
      toAgentGrabble(x) {
        this.$router.push({
          path: `/tradeType?tradeType=${x.type}&title=${x.name}&brandId=100`
        })
      },
      toAgentDetail(x) {
        //https://www.hlxiaoxiong.com/IntegralMall/#/merchantInfo?agentId=1&brandId=deb99c1be8a748a59f760485fd49df15
        this.$router.push({
          path: `/merchantInfo?agentId=${x.agentId}&brandId=${this.brandId}&terminalType=1`
        })
      },
      loadMore() {
        if (this.pageSize > this.info.total) return
        this.pageSize += 10
        clearInterval(this.timer);
        this.timer = null;
        this.timer = setTimeout(() => {
          console.log('loadmore')
          this.getData()
        }, 300)
      },
      getData() {
        let brandId = this.brandId;
        let lng = 114.03167;
        let lat = 22.532151;
        let distance;  //=this.kmActive//距离
        let pageNum = this.pageNum;
        let pageSize = this.pageSize;
        let shopName;
        let tradeType;  //商户类型

        this.$axiosApi.getNearAgent(brandId, lng, lat, distance, pageNum, pageSize, shopName, tradeType).then(res => {
          this.info = res.data
          this.shopList = res.data.list
        })
      },
      toIndex() {
        console.log(111)
        location.href = 'http://192.168.1.8:8088/#/merChantIndex'
      },
      toAgentCenter() {


        if (this.$store.getters.agentInfo.isAgent == 1 && this.$store.getters.agentInfo.status == 1) {
          //商家中心
          this.$router.push({
            path: '/MerchantCA'
          })
        } else {
          this.$router.push({
            path: '/merchantMove'
          })
        }
      },
      isAgent() {
        this.$store.dispatch('getAgentInfo').then(res => {
          console.log(this.$store.getters.agentInfo)
        })
      },
      toMyOrder(){
        this.$router.push({
          path: '/myOrder'
        })
      },
      toQRCode() {
        this.$router.push({
          path: '/qrCode'
        })
      },
      grabble_fun() {
        this.$router.push({
          path: 'merchantGrabble'
        })
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

      getBannerList() {
        this.$axiosApi.itemAdvert().then(res => {
          if (res.code == 200) {
            this.bannerList = res.data.shopAdvert

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

      shopSelectList(id) {
        console.log(id)
        this.$router.push({
          path: '/commodityTypeList?id=' + id
        })
      }
    }
  };
</script>

<style rel="stylesheet/less" lang="less">


</style>
