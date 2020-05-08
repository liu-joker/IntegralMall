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
          <img src="@/assets/merchant/icon_add@2x.png" alt="更多" @click="popoverShow = !popoverShow" id="moreFun"
               ref="moreFun">
          <transition name="fade">
            <div class="popoverContent" v-show="popoverShow" transiton="fade" ref="isPopover">
              <div class="list">
                <div class="item">
                  <img src="@/assets/merchant/icon_add_sys.png" alt="">
                  <span>扫一扫</span>
                </div>
                <div class="item">
                  <img src="@/assets/merchant/icon_add_skm.png" alt="">
                  <span>收款码</span>
                </div>
                <div class="item">商家入驻</div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>

    <div class="mallSelect">
      <div class="tab_title">
        <div class="titleItem">
          <svg-icon class="form_icon" icon-class="shoppingCart"></svg-icon>
          <span>免费商城</span>
        </div>
      </div>
      <div class="list">
        <div class="item">
          <img src="@/assets/merchant/icon_jingxuan.png" alt="精选">
          <span>精选</span>
        </div>
        <div class="item">
          <img src="@/assets/merchant/icon_meishi2.png" alt="美食">
          <span>美食</span>
        </div>
        <div class="item">
          <img src="@/assets/merchant/icon_canyin.png" alt="餐饮">
          <span>餐饮</span>
        </div>
        <div class="item">
          <img src="@/assets/merchant/icon_jiaoyu.png" alt="教育">
          <span>教育</span>
        </div>
        <div class="item">
          <img src="@/assets/merchant/icon_quanbu.png" alt="全部">
          <span>全部</span>
        </div>
      </div>
    </div>

    <div class="banner">
      <div class="banner_content">
        <swiper :options="swiperOption" v-if="bannerList.length>1">
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
        <div class="titleItem">
          <svg-icon class="form_icon" icon-class="merchant"></svg-icon>
          <span>商家推荐</span>
        </div>
      </div>
      <div class="list">
        <div class="item" v-for="(x,index) in selectList" :key="index">
          <img :src="x.img" alt="">
          <span>{{x.name}}</span>
        </div>
      </div>
    </div>

    <div class="nearby" ref="pageContent">
      <sticky transfer-dom ref="sticky" :offset="grabbleHeight" class="vuxFixed">
        <div class="nearbyDiv">
          <div class="list">
            <div class="item" @click="showSelectList">
              <span>附近</span>
              <span class="select_span"><svg-icon class="form_icon" icon-class="bottom"></svg-icon></span>
            </div>
          </div>
        </div>
      </sticky>
      <div class="xDialog">
        <x-dialog v-model="showScrollBox" hide-on-blur class="dialogItem">
          <div class="dialogContent distance">
            <div class="item" v-for="(x,index) in kmList" :key="index" :class="kmActive == x.km?'active':''" @click="selectData(x)">
              {{x.table}}
            </div>
          </div>
        </x-dialog>
      </div>

    </div>

    <div class="merchantList">
      <div class="list">
        <div class="item">
          <img src="@/assets/images/pic_sjxc.png" class="merchantLogo" alt="">
          <div class="item_content">
            <div class="item_title">小米粒总部招商中心</div>
            <div class="startInfo">
              <div class="left">
                <span class="start" :style="startStyle"></span>
                <span>4.5分</span>
                <span class="consumptionPerPerson">¥330/人</span>
              </div>
              <div class="right">
                1.1km
              </div>
            </div>
            <div class="addressInfo">
              <div class="left">
                <span>深圳  福田区</span>
                <span class="proportion">U米返还60%</span>
              </div>
              <div class="right">
                <span class="salesVolume">月销量 359</span>
              </div>
            </div>
            <div class="merchantInfo">致力为实体服务类商家提供爆店式营销解决方案</div>
          </div>
        </div>
        <div class="item" v-for="x in 10">
          <img src="@/assets/images/pic_sjxc.png" class="merchantLogo" alt="">
          <div class="item_content">
            <div class="item_title">小米粒总部招商中心</div>
            <div class="startInfo">
              <div class="left">
                <span class="start" :style="startStyle"></span>
                <span>4.5分</span>
                <span class="consumptionPerPerson">¥330/人</span>
              </div>
              <div class="right">
                1.1km
              </div>
            </div>
            <div class="addressInfo">
              <div class="left">
                <span>深圳  福田区</span>
                <span class="proportion">U米返还60%</span>
              </div>
              <div class="right">
                <span class="salesVolume">月销量 359</span>
              </div>
            </div>
            <div class="merchantInfo">致力为实体服务类商家提供爆店式致力为实体服务类商家提供爆店式营销解决方案营销解决方案</div>
          </div>
        </div>
      </div>
    </div>


  </div>

</template>

<script>
  import {Scroller, LoadMore, Divider, XInput, XImg, Sticky, Popover, Cell, XDialog} from 'vux'
  import 'swiper/dist/css/swiper.css'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import {imgUrl} from "@/filters";
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

  export default {
    name: 'merchantIndex',
    components: {
      swiper,
      swiperSlide,
      Scroller,
      LoadMore,
      Divider,
      XInput,
      XImg,
      Sticky,
      Popover,
      Cell,
      XDialog,
      TransferDom
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
        kmList:[{km:500,table:'附近'},{km:1000,table:'1km'},{km:5000,table:'5km'},{km:10000,table:'10km'},
          {km:15000,table:'15km'},{km:20000,table:'20km'},],
        pageContent:'',
        kmActive:500
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
    },
    created() {
      document.addEventListener('click', (e) => {
        try{
          if (!this.$refs.isPopover.contains(e.target) && e.target.id != 'moreFun') {
            this.popoverShow = false;
          }
        }catch (err){
        }
      })
    },
    mounted() {
      this.grabbleHeight = this.$refs.grabble.offsetHeight
      this.pageContent = this.$refs.pageContent.offsetTop - this.$refs.grabble.offsetHeight + 10
      console.log(this.pageContent)
    },
    methods: {
      grabble_fun() {
        this.$router.push({
          path: 'merchantGrabble'
        })
      },
      selectData(x){
        //附近
        this.kmActive = x.km
        this.showScrollBox = false
      },
      showSelectList(){
        this.showScrollBox = !this.showScrollBox
        if(this.showScrollBox){
          document.body.scrollTop = document.documentElement.scrollTop = this.pageContent
        }
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less">


</style>
