<template>

  <div class="Index_2" id="Index_2" ref="Index_2">
    <div class="header">
      <div class="grabble" :style="headBgc" ref="grabble">
        <div class="left">
          <x-input placeholder="搜索" class="grabble_inp" type="text" :max="20" @on-focus="grabble_fun">
            <svg-icon slot="label" class="form_icon" icon-class="grabble"></svg-icon>
          </x-input>
        </div>
        <div class="right" @click="toMy">
          <img :src="icon_my" alt="" class="icon_my">
        </div>
      </div>

      <div class="banner_content">
        <swiper :options="swiperOption" v-if="bannerList.length>1" ref="swiper1">
          <swiper-slide class="swiper-demo-img" v-for="(x, index) in bannerList" :key="index">
            <img :src="x.photo | imgUrl" alt="" class="bannerImg">
          </swiper-slide>
        </swiper>

        <div class="indicatorList" :style="indicatorList">
          <div class="indicator_item" :style="indicator_item"></div>
        </div>
      </div>

    </div>
    <div class="container">
      <div class="classification">
        <div class="item" v-for="(x,index) in selectList2" :class="yellowClass(index)" @click="selectData2(x,index)">
          <div class="item_head">
            <div class="title">{{x.title}}</div>
            <div class="title_info">{{x.info}}</div>
          </div>
          <div class="img_2">
            <img v-for="(y,index) in x.photoList" :src="y" alt="">
          </div>
        </div>
      </div>


      <div class="shopContent" ref="shopContent">
        <div :style="'height:'+select_headHeight+'px'">
          <sticky ref="sticky" :offset="grabbleHeight">
            <div class="select_head " ref="select_head">
              <scroller :lock-y="true" :scrollbar-x='false' ref="scroller">
                <div class="box1" :style="box1Style">
                  <div class="box1-list" ref="box1">
                    <div class="box1-item" :class="index == selectValue?'active':''" v-for="(i,index) in selectList"
                         :key="index"
                         @click="selectData(i,index)">
                      <div class="s_item_top">{{i.typeName}}</div>
                      <div class="s_item_bottom" :style="item_bottom">
                        <div class="text">
                          {{i.info}}
                        </div>
                      </div>
                      <div class="active_item" :style="active_item"></div>
                    </div>
                  </div>
                </div>
              </scroller>
            </div>
          </sticky>
        </div>
        <div class="commodity_content">
          <swiper :options="swiperOption2" ref="mySwiper" class="swiper2">
            <swiper-slide v-for="(item, index) in selectList" :key="index">
              <div class="list" v-if="item.shopList">
                <waterfall :col='waterfallData.col' :width="itemWidth" :gutterWidth="gutterWidth"
                           :data="item.shopList"
                           @loadmore="loadmore(item)" :key="index">
                  <template>
                    <div class="item" v-for="(x,index) in item.shopList" :key="index"
                         @click="GoodsDetails(x)">
                      <div class="img">
                        <img v-lazy="x.imgUrl" alt="">
                        <!--<img :lazy-src="x.imgUrl" alt="">-->
                        <!--<img :src="x.imgUrl" alt="">-->
                      </div>
                      <div class="text">
                        <div class="name">{{x.name}}</div>
                        <div class="foot">
                          <div class="left">
                            <span class="coin">{{x.coin}}U米</span>
                            <span class="originalPrice">&yen;{{x.showAmount | formatMoney}}</span>
                          </div>
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
                    没有更多了~
                  </divider>
                  <div class="periodLoading" v-show="!dividerShow">
                    <load-more></load-more>
                  </div>
                </div>
              </div>

            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
    <login-view :loginData="loginData"></login-view>

    <back-to-top></back-to-top>
  </div>

</template>

<script>
  import icon_my from "@/assets/images/icon_my.png"
  import pic_backgroud from "@/assets/images/pic_backgroud.png"
  import banner1 from "@/assets/images/banner1.png"
  import pic_sort1 from "@/assets/images/-s-pic_electronics1@2x.png"
  import pic_sort2 from "@/assets/images/-s-pic_electronics2@2x.png"
  import pic_sort3 from "@/assets/images/-s-pic_kitchen1@2x.png"
  import pic_sort4 from "@/assets/images/-s-pic_kitchen2@2x.png"
  import pic_sort5 from "@/assets/images/-s-pic_motion1@2x.png"
  import pic_sort6 from "@/assets/images/-s-pic_motion2@2x.png"
  import pic_sort7 from "@/assets/images/-s-pic_travel1@2x.png"
  import pic_sort8 from "@/assets/images/-s-pic_travel2@2x.png"
  import pic_commodity1 from "@/assets/images/pic_commodity1.png"
  import pic_commodity2 from "@/assets/images/pic_commodity2.png"
  import icon_browse from "@/assets/images/icon_browse.png"
  import BackToTop from "@/components/BackToTop"
  //  import Wrapper from "@/components/Wrapper"
  //  import {Swiper, SwiperItem, Scroller, LoadMore, Divider, XInput} from 'vux'
  import {Scroller, LoadMore, Divider, XInput, XImg, Sticky} from 'vux'
  import {imgUrl} from "@/filters";

  import loading from '@/assets/loading3.gif'
  import loginView from "@/components/loginView"
  import VueWechatTitle from 'vue-wechat-title';

  export default {
    name: 'index',
    components: {
      Scroller,
      LoadMore,
      Divider,
      XInput,
      BackToTop,
      XImg,
      Sticky,
      loginView,
    },
    data() {
      const self = this
      return {
        icon_my: icon_my,
        pic_backgroud: pic_backgroud,
        icon_browse: icon_browse,
        loading: loading,
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
        swiperOption2: {//swiper3
          notNextTick: false,
          loop: false,
          observer: true,
          observeParents: true,
          autoplayStopOnLast: false,
          autoplay: false,
          autoHeight: true,
          freeModeMomentumRatio: 2,
          on: {
            slideChangeTransitionEnd: function () {
//              console.log(this.activeIndex)
              let i = self.selectList[this.activeIndex]
              self.selectData(i, this.activeIndex)
            }
          }
        },
        bannerList: [],
        brandId: '',
        scrollTop: document.body.scrollTop | document.documentElement.scrollTop,
        swiperIndex: 0,
        indicatorList: '',
        selectValue: 0,
        selectList: [],
        selectList2: [{
          id: 19,
          title: '精选厨房',
          info: '美味来袭 精选厨房',
          photoList: [
            pic_sort3,
            pic_sort4
          ]
        }, {
          id: 21,
          title: '运动健康',
          info: '年轻无极限 运动我精彩',
          photoList: [
            pic_sort5,
            pic_sort6
          ]
        }, {
          id: 22,
          title: '电子数码',
          info: '工作学习两不误',
          photoList: [
            pic_sort1,
            pic_sort2
          ]
        }, {
          id: 23,
          title: '旅行意义',
          info: '一场说走就走的旅行',
          photoList: [
            pic_sort7,
            pic_sort8
          ]
        },],
        box1Style: '',
        select_headHeight: '',
        select_headTop: '',
        grabbleHeight: 0,
        active_item: '',
        shopList: [],
        pageNum: 1,
        pageSize: 20,
        third: 0,
        itemType: '',
        info: '',
        environment: '',
        dividerShow: false,
        noDataShow: false,
        timer: null,
        waterfallData: {
          col: 2,
          width: 0,
          gutterWidth: 0
        },
        loginData: {
          brandId: '',
          showView: false
        }
      }
    },
    computed: {
      headBgc: function () {
        let top
        if (this.scrollTop < 250) {
          top = this.scrollTop / 250
        } else {
          top = 1
        }
        let u = navigator.userAgent;
        if (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
          return 'background-color: rgba(35, 35, 40, 1)'
        }
        return 'background-color: rgba(35, 35, 40, ' + top + ')'
      },
      item_bottom: function () {
        let top = this.scrollTop - this.select_headTop
        let style = ''
        if (top > 0) {
          let t = top / this.grabbleHeight >= 1 ? 1 : top / this.grabbleHeight
          let o = 1 - t
          let h = o * 1.5
          style = `
          opacity: ` + o + `;
           height:` + h + `rem
          `;
          this.active_item = `
            opacity: ` + t + `;
          `;
        } else {
          style = ''
          this.active_item = ''
        }
        return style
      },
      itemWidth: function () {
        return 0.445 * document.documentElement.clientWidth
      },
      gutterWidth: function () {
        return 0.024 * document.documentElement.clientWidth
      },
      indicator_item: function () {
        let w = this.bannerList.length * 1.875
        this.indicatorList = `width:` + w + `rem;margin-left:` + -w / 2 + `rem`

        let r = this.swiperIndex * 1.875
        let style = `
        left:` + r + `rem
        `
        return style
      },
      swiper() {
        return this.$refs.mySwiper.$swiper
      },
      showShop: function () {
        let item = this.selectList[this.selectValue]
        if (item.shopList) {
          if (item.shopList.length == 0) {
            return true
          } else {
            return false
          }
        } else {
          return false
        }
      },
    },

    mounted() {
      window.addEventListener('scroll', this.handleScroll, true)
      this.select_headTop = this.$refs.shopContent.offsetTop - this.$refs.grabble.offsetHeight
      this.grabbleHeight = this.$refs.grabble.offsetHeight
      this.handleScroll()


    },
    beforeCreate() {
      let brandId = this.$route.query.brandId
      if (this.$EnvironmentType(brandId).shopName) {
        document.title = this.$EnvironmentType(brandId).shopName
        this.$route.meta.title = this.$EnvironmentType(brandId).shopName

        console.log(this.$EnvironmentType(brandId).shopName, this.$route.meta.title)
      }
    },
    created() {

      var url = window.location.href;
      var j = url.substring(url.indexOf('brandId=') + 8, url.indexOf('brandId=') + 40); //兼容app传参
      this.brandId = this.$route.query.brandId || j
      //environment 判断环境  1.外部开放商城
      this.environment = this.$route.query.environment || ""
      this.loginData.brandId = this.$route.query.brandId


      this.$Cookie.setSEnvironment(this.environment)
      this.$store.dispatch('setBrindId', this.brandId)

      this.getBannerList()
    },
    activated() {

      /*if(this.$Cookie.getToken() != null && this.$Cookie.getToken() != "null" && this.$Cookie.getToken() != ""){
              this.$store.dispatch('getUserInfo')
            }*/

      this.$nextTick(() => {
        this.$waterfall.forceUpdate()
      })
    },
    methods: {
      toMy() {

        if (this.$Cookie.getToken() != null && this.$Cookie.getToken() != "null" && this.$Cookie.getToken() != "") {
          this.$store.dispatch('getUserInfo').then(res=>{
            this.$router.push({path: `/my?brandId=${this.brandId}&environment=${this.environment}`})
          })
        } else {

          if (this.$Cookie.getToken() == '' && this.environment == 1 && this.loginData.brandId) {
            this.loginData.showView = true
            console.log('公众号')
            return
          }


          if (this.$EnvironmentAI() == 2) {
            this.$vux.confirm.show({
              content: "请先登录",
              onCancel() {

              },
              onConfirm: () => {
                try {
                  window.app.onLoginErro()
                } catch (err) {
                  window.webkit.messageHandlers.onLoginErro.postMessage({})
                }
              }
            })
          }

        }
      },
      GoodsDetails(x) {
        //this.$router.push({path: '/GoodsDetails/' + x.id})
        this.$router.push({path: `/GoodsDetails/${x.id}?brandId=${this.brandId}&environment=${this.environment}`})
      },
      getBannerList() {
        this.$axiosApi.itemAdvert().then(res => {
          if (res.code == 200) {
            this.bannerList = res.data.shopAdvert
            let selectList = res.data.shopType.map((v, index) => {
              v.imgUrl = imgUrl(v.photo)
              v.shopList = []
              v.pageNum = 1
              v.total = 0
              return v
            })
            let active = [{
              id: 0,
              typeName: "精选",
              info: '为你推荐',
              shopList: [],
              pageNum: 1,
              total: 0,
            }]

//            this.selectList = active.concat(selectList.slice(0,6))
            this.selectList = active.concat(selectList)


            this.getData()
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
          this.$nextTick(x => {
            let w = this.$refs.box1.offsetWidth + "px" || "100%"
            this.box1Style = "width:" + w
            this.select_headHeight = this.$refs.select_head.offsetHeight
          })
        })
      },
      getData(type) {
        //
        let itemType = this.itemType
        let name = ""
        let third = this.third //0
        let pageNum = this.selectList[this.selectValue].pageNum
        let pageSize = this.pageSize


        console.log(this.selectList[this.selectValue].id)
        if (this.selectList[this.selectValue].id == 0) {
          pageNum = 1
          pageSize = 20
        }
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
            this.selectList.map(v => {
              if (v.id == itemType) {
//                v.shopList = v.shopList.concat(shopList)
                v.shopList = [...new Set(v.shopList.concat(shopList))]
                v.total = res.data.total
                v.pageNum = res.data.pageNum
              }
              return v
            })
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
      grabble_fun() {
        this.$router.push({
          path: `/grabble?brandId=${this.brandId}&environment=${this.environment}`
        })
      },
      loadmore(item) {
        if (this.selectList[this.selectValue].id == 0) return
        console.log(this.selectList[this.selectValue].total, this.selectList[this.selectValue].shopList.length)
        if (this.selectList[this.selectValue].total == this.selectList[this.selectValue].shopList.length) return
        this.dividerShow = false
        clearInterval(this.timer)
        this.timer = null;
        this.timer = setTimeout(() => {
          if (this.selectList[this.selectValue].shopList.length == 0) {
            this.selectList[this.selectValue].pageNum = 1
          } else {
            this.selectList[this.selectValue].pageNum += 1
          }
          console.log('loadmore')
          this.getData(2)
        }, 150)
      },
      // 获取滚动条高度
      handleScroll() {
        this.scrollTop = document.body.scrollTop | document.documentElement.scrollTop
      },
      //判断类别
      yellowClass(x) {
        let y = ((x + 1) * 2) % 8
        return y == 4 || y == 6 ? 'yellowClass' : ''
      },
      //切换类别
      selectData2(x, index) {


        let i = this.selectList.findIndex(v => {
          return v.id == x.id
        })
        if (i != -1) {
          this.selectData(this.selectList[i], i)
        }

      },
      selectData(i, index) {
        this.selectValue = index
        document.body.scrollTop = document.documentElement.scrollTop = this.$refs.shopContent.offsetTop
        let w = this.$refs.box1.offsetWidth / this.selectList.length
        let x = index
        let z = x < 4 ? 0 : w * (x - 1)
        let t = document.body.scrollTop | document.documentElement.scrollTop
        if (t > this.select_headTop) {
          document.body.scrollTop = document.documentElement.scrollTop = this.select_headTop
        }
        if (i.id == 0) {
          this.third = 0
          this.itemType = ""
          z = 0
        } else {
          this.third = ''
          this.itemType = i.id
        }

        this.$refs.scroller.reset({left: z}, 600, 'ease-in-out')
        //防止重复获取数据
        this.swiper.slideTo(this.selectValue, 400, false)
//        this.swiper.updateSize();
        if (i.shopList.length != 0) return

        clearInterval(this.timer);
        this.timer = null;
        this.timer = setTimeout(() => {
          this.getData(1)
        }, 300)
      },

    }
  }
</script>

<style rel="stylesheet/less" lang="less">


</style>
