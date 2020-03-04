<template>

  <div class="Index_2" id="Index_2" ref="Index_2">

    <div class="header">
      <div class="grabble" :style="headBgc" ref="grabble">
        <div class="left">
          <x-input placeholder="搜索" class="grabble_inp" type="text" :max="20" @on-focus="grabble_fun">
            <svg-icon slot="label" class="form_icon" icon-class="grabble"></svg-icon>
          </x-input>
        </div>
        <div class="right"  @click="toMy">
          <img :src="icon_my" alt="" class="icon_my">
        </div>
      </div>

      <div class="banner_content">
        <swiper auto dots-position="center" loop style="width: 100%;margin:0 auto;" :aspect-ratio="17.5/46.88"
                :interval=5000 :show-dots="false" v-model="swiperIndex">
          <swiper-item class="swiper-demo-img" v-for="(x, index) in bannerList" :key="index">
            <img :src="x.photo | imgUrl" alt="" class="bannerImg">
          </swiper-item>
        </swiper>
        <div class="indicatorList" :style="indicatorList">
          <div class="indicator_item" :style="indicator_item"></div>
        </div>
      </div>


    </div>
    <div class="container">
      <div class="classification">
        <div class="item" v-for="(x,index) in selectList2" :class="yellowClass(index)" @click="selectData(x)">
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
        <div class="select_head  fadeIn animated" ref="select_head" :style="select_headStyle">
          <scroller :lock-y="true" :scrollbar-x='false' ref="scroller">
            <div class="box1" :style="box1Style">
              <div class="box1-list" ref="box1">
                <div class="box1-item" :class="i.id == selectValue?'active':''" v-for="(i,index) in selectList"
                     :key="index"
                     @click="selectData(i)">
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

        <div class="commodity_content">
          <div class="list fadeIn animated">
            <waterfall :col='waterfallData.col' :width="itemWidth" :gutterWidth="gutterWidth" :data="shopList"
                       @loadmore="loadmore">
              <template>
                <div class="item fadeIn animated" v-for="(x,index) in shopList" :key="index"  @click="GoodsDetails(x)">
                  <div class="img">
                    <img v-lazy="x.imgUrl" alt="">
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
          </div>
          <divider class="period">没有更多商品了~</divider>
        </div>
      </div>
    </div>
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
  import {Swiper, SwiperItem, Scroller, LoadMore, Divider, XInput} from 'vux'
  import {imgUrl} from "@/filters";

  export default {
    name: 'index',
    components: {
      Swiper,
      SwiperItem,
      Scroller,
      LoadMore,
      Divider,
      XInput,
      BackToTop
    },
    data() {
      return {
        icon_my: icon_my,
        pic_backgroud: pic_backgroud,
        icon_browse: icon_browse,
        bannerList: [],
        scrollTop: 0,
        swiperIndex: 0,
        indicatorList: '',
        selectValue: 0,
        selectList: [],
        selectList2: [{
          id:18,
          title: '精选厨房',
          info: '美味来袭 精选厨房',
          photoList: [
            pic_sort3,
            pic_sort4
          ]
        }, {
          id:12,
          title: '运动健康',
          info: '年轻无极限 运动我精彩',
          photoList: [
            pic_sort5,
            pic_sort6
          ]
        }, {
          id:1,
          title: '电子数码',
          info: '工作学习两不误',
          photoList: [
            pic_sort1,
            pic_sort2
          ]
        }, {
          id:5,
          title: '旅行意义',
          info: '一场说走就走的旅行',
          photoList: [
            pic_sort7,
            pic_sort8
          ]
        },],
        box1Style: '',
        select_headStyle: '',
        select_headTop: '',
        grabbleHeight: 0,
        active_item: '',
        shopList: [],
        pageNum: 1,
        pageSize: 10,
        third: 0,
        itemType: '',
        info: '',
        onFetching: false,
        noDataShow: false,
        waterfallData: {
          col: 2,
          width: 0,
          gutterWidth: 0
        },
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
        return 'background-color: rgba(35, 35, 40, ' + top + ')'
      },
      item_bottom: function () {
        let top = this.scrollTop - this.select_headTop
        let style = ''
//        console.log(this.scrollTop,this.select_headTop,top,this.grabbleHeight)
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
      }
    },

    mounted() {
      window.addEventListener('scroll', this.handleScroll, true)
      this.select_headTop = this.$refs.shopContent.offsetTop - this.$refs.grabble.offsetHeight
      this.grabbleHeight = this.$refs.grabble.offsetHeight

      console.log(this.$refs.Index_2.offsetWidth)
      this.handleScroll()
    },
    created() {
      this.getData()
      this.getBannerList()
    },
    activated() {
       this.$store.dispatch('getUserInfo')
    },
    methods: {
      toMy() {
        this.$router.push({path: '/my'})
      },
      GoodsDetails(x) {
        this.$router.push({path: '/GoodsDetails/' + x.id})
      },
      getBannerList() {
        this.$axiosApi.itemAdvert().then(res => {
          if (res.code == 200) {
            this.bannerList = res.data.shopAdvert
            let selectList = res.data.shopType.map((v, index) => {
              v.imgUrl = imgUrl(v.photo)
              return v
            })
            let active = [{
              id: 0,
              typeName: "精选",
              info: '为你推荐'
            }]
            this.selectList = active.concat(selectList)
            console.log(this.selectList)
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
            console.log(this.box1Style)
          })
        })
      },
      getData(type) {
        //
        let itemType = this.itemType
        let name = ""
        let third = this.third //0
        let pageNum = this.pageNum
        let pageSize = this.pageSize
        this.$axiosApi.itemList(itemType, third, pageNum, pageSize, name).then(res => {
          if (res.code == 200) {
            //
            this.$vux.loading.hide()
            let time = new Date().getTime() / 100000000
            this.info = res.data
            let shopList = res.data.list.map(v => {
              v.imgUrl = imgUrl(v.photo.split(',')[0])
              let resume = 550
              v.browse = (time + (v.name.length * resume)).toFixed(0)
              return v
            })
            if(type && type == 1){
              this.shopList = shopList
            }else {
              this.shopList = this.shopList.concat(shopList)
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


      },
      grabble_fun() {
        this.$router.push({
          path: 'grabble'
        })
      },
      loadmore() {
//        this.shopList = this.shopList.concat(this.shopList)
        console.log(this.shopList)
        if(this.shopList.length == 0) return
        this.pageNum += 1
        this.getData()
      },
      // 获取滚动条高度
      handleScroll() {
        this.scrollTop = document.body.scrollTop | document.documentElement.scrollTop
        if (this.scrollTop >= this.select_headTop) {
          this.select_headStyle = 'position: fixed;top: 5.5rem;'
        } else {
          this.select_headStyle = ''
        }
      },
      //判断类别
      yellowClass(x) {
        let y = ((x + 1) * 2) % 8
        return y == 4 || y == 6 ? 'yellowClass' : ''
      },
      //切换类别
      selectData(i) {
        if(this.selectValue == i.id) return
        this.pageNum = 1
        this.selectValue = i.id

        let w = this.$refs.box1.offsetWidth/this.selectList.length
        let x = this.selectList.findIndex(o=>{
          return o.id == i.id
        })
        let z = x<4?0:w*(x-1)
        let t = document.body.scrollTop | document.documentElement.scrollTop
        if(t>this.select_headTop){
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
        console.log(x,z)

        this.$refs.scroller.reset({left:z},600,'ease-in-out')

        this.getData(1)
      },

    }
  }
</script>

<style rel="stylesheet/less" lang="less">

  .Index_2 {
    width: 100%;
    min-height: 100vh;
    background-color: #F6F3F7;
    .header {
      width: 100%;
      height: 17.5rem;
      background: url('~@/assets/images/pic_backgroud.png') top center no-repeat #ffffff;
      background-size: contain;
      padding-top: 6.5rem;
      .grabble {
        width: calc(100% - 3.75rem);
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.875rem 1.875rem;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 2000;
        /*background-color: #232328;*/
        .left {
          flex: 1;
          .grabble_inp {
            background-color: #fff;
            width: 100%;
            padding: 0;
            height: 3.75rem;
            border-radius: 1.875rem;
            font-size: 1.75rem;
            border: 1px solid #DCDCDC;
            .form_icon {
              margin-left: 2rem;
              margin-right: 1rem;
              font-size: 1.875rem;
              color: #8C8C8C;
            }
          }
        }
        .right {
          margin-left: 1.875rem;
          img {
            width: 3rem;
            height: 3rem;
          }
        }
      }
      .banner_content {
        height: 17.5rem;
        position: relative;
        .swiper-demo-img {
          padding: 0 1.875rem;
          .bannerImg {
            width: calc(100% - 3.75rem);
            height: 100%;
            border-radius: 0.625rem;
          }
        }
        .indicatorList {
          position: absolute;
          z-index: 100;
          bottom: 10px;
          left: 50%;
          height: 0.375rem;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 0.1875rem;
          min-width: 1.875rem;
          .indicator_item {
            transition: 0.3s;
            min-width: 1.875rem;
            border-radius: 0.1875rem;
            background-color: #ffffff;
            height: 0.375rem;
            position: absolute;
            top: 0;
          }
        }

      }
    }
    .container {
      .classification {
        background-color: #ffffff;
        padding: 0 1.875rem 1.25rem;
        margin-bottom: 1.25rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        .item:nth-child(2n) {
          margin-right: 0;
        }
        .item {
          width: calc((100% - (3rem)) / 2);
          background-color: #fff;
          margin-top: 2.5rem;
          margin-right: 3rem;

          &.yellowClass {
            .item_head {
              .title_info {
                color: #F89F04;
              }
            }
          }
          .item_head {
            margin-bottom: 1rem;
            .title {
              font-size: 2.125rem;
              font-weight: bold;
              font-family: Alibaba PuHuiTi;
            }
            .title_info {
              font-size: 1.375rem;
              color: #E84646;
            }
          }
          .img_2 {
            display: flex;
            align-items: center;
            justify-content: center;
            img {
              width: 10rem;
              height: 10rem;
            }
          }
        }
      }
      .shopContent {
        position: relative;
        padding-top: 6.5625rem;
        min-height: calc(100vh - 6.5625rem);
        .select_head {
          background-color: #ffffff;
          border-top: 1px solid #f4f4f4;
          /*height: 6.75rem;*/
          position: absolute;
          width: 100%;
          top: 0;
          left: 0;
          z-index: 999;
          .box1 {
            width: auto;
            white-space: nowrap;
            .box1-list {
              display: inline-block;
            }
            .box1-item {
              text-align: center;
              display: inline-block;
              min-width: 6rem;
              padding: 1rem 1rem;
              position: relative;
              margin-right: 1.625rem;
              &:last-child {
                margin-right: 0;
              }
              &.active {
                .s_item_top {
                  color: #F89F04;
                }
                .s_item_bottom {
                  color: #ffffff;
                  .text {
                    background-color: #F89F04;
                  }
                }
                .active_item {
                  display: block;
                }
              }
              .active_item {
                width: 3.75rem;
                height: 0.375rem;
                border-radius: 0.19rem;
                background-color: #F89F04;
                bottom: 0.75rem;
                display: none;
                position: absolute;
                left: 50%;
                transform: translate(-50%, 0);
                opacity: 0;
              }
              .s_item_top {
                font-weight: bold;
                font-size: 2.123rem;
                color: #323232;
                margin-bottom: 0.25rem;
              }
              .s_item_bottom {
                font-size: 1.125rem;
                color: #646464;
                position: relative;
                height: 1.5rem;
                .text {
                  position: absolute;
                  left: 0;
                  top: 0;
                  padding: 0 0.75rem;
                  border-radius: 0.75rem;
                }
              }
            }
          }
        }
        .commodity_content {
          margin-top: 1.25rem;
          position: relative;
          .list {
            padding: 0rem 1.875rem 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            .item:nth-child(2n) {
              margin-right: 0;
            }
            .item {
              width: calc(100%);
              background-color: #fff;
              margin-bottom: 1rem;
              margin-right: 1rem;
              border-radius: 0.5rem;
              overflow: hidden;
              .img {
                width: 100%;
                position: relative;
                overflow: hidden;
                background-size: cover;
                background-position: center;
                > img {
                  width: 100%;
                  height: auto;
                }
              }
              .text {
                padding: 1.5rem 1.25rem;
                .name {
                  font-size: 1.5rem;
                  word-break: break-all;
                  display: -webkit-box; /**对象作为伸缩盒子模型展示**/
                  -webkit-box-orient: vertical; /**设置或检索伸缩盒子对象的子元素的排列方式**/
                  -webkit-line-clamp: 2; /**显示的行数**/
                  overflow: hidden;
                  height: 3.875rem;
                  color: #000;
                }
                .foot {
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  font-size: 1.75rem;
                  margin-top: 1.625rem;
                  .left {
                    color: #E84646;
                    font-weight: 500;
                  }
                  .right {
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    color: #8C8C8C;
                    font-size: 1.25rem;
                    .eye {
                      width: 1.75rem;
                      height: 1.5rem;
                      margin-right: 0.5rem;
                    }
                  }
                }
              }

            }
          }
          .period {
            font-size: 1.75rem;
            padding: 1.75rem 0;
          }
          .noItem {
            .noData {
              width: 100%;
              padding: 9.5rem 0;
              text-align: center;
              font-size: 2rem;
              color: #868686;
              background-color: #f4f4f4;
            }
          }

        }
      }

    }
  }


</style>
