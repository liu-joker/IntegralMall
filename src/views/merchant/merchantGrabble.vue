<template>

  <div class="GrabbleIndex merchantGrabble">
    <div class="header">
      <div class="grabble" ref="grabble">
        <div class="left">
          <x-input placeholder="搜索" class="grabble_inp" type="text" :max="20" ref="grabble_inp" @on-enter="getData"
                   @on-focus="GrabbleShow = true" v-model="name">
            <svg-icon slot="label" class="form_icon" icon-class="grabble"></svg-icon>
          </x-input>
        </div>
        <div class="right">
          <span class="grabble_but" @click="countermand">取消</span>
        </div>
      </div>
    </div>

    <div class="shopContent" ref="shopContent" v-if="!GrabbleShow">
      <div class="nearby" ref="pageContent">
        <div class="vuxFixed">
          <div class="nearbyDiv">
            <div class="list">
              <div class="item" @click="showSelectList">
                <span>附近</span>
                <span class="select_span"><svg-icon class="form_icon" icon-class="bottom"></svg-icon></span>
              </div>
            </div>
          </div>
        </div>
        <div class="xDialog">
          <x-dialog v-model="showScrollBox" hide-on-blur class="dialogItem">
            <div class="dialogContent distance">
              <div class="item" v-for="(x,index) in kmList" :key="index" :class="kmActive == x.km?'active':''"
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

              <div class="item2">
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
              <div class="item2" v-for="x in 10">
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

            </template>
          </waterfall>
        </div>
        <div v-if="showShop" class="noItem">很遗憾，没有找到该商家！</div>
        <divider class="period" v-if="!showShop">没有更多了~</divider>
      </div>
    </div>

    <div class="searchRecord" v-show="GrabbleShow">

      <div class="searchTop">
        <div class="left">历史记录</div>
        <div class="right" @click="delectSearch">
          <img :src="delect" alt="">
        </div>
      </div>

      <div class="searchContent">
        <div class="item" v-for="x in search" @click="searchContent(x)">{{x}}</div>
      </div>

    </div>

    <back-to-top></back-to-top>

  </div>

</template>

<script>
  import icon_my from "@/assets/images/icon_my.png"
  import icon_browse from "@/assets/images/icon_browse.png"
  import icon_cancel from "@/assets/images/icon_cancel@2x.png"
  import delect from "@/assets/images/delect.png"
  import {imgUrl} from "@/filters";
  import {XInput, Divider, XDialog} from 'vux'
  import BackToTop from "@/components/BackToTop"

  export default {
    name: 'merchantGrabble',
    components: {
      XInput,
      Divider,
      BackToTop,
      XDialog
    },
    data() {
      return {
        icon_my: icon_my,
        icon_browse: icon_browse,
        icon_cancel: icon_cancel,
        delect: delect,
        GrabbleShow: false,
        waterfallData: {
          col: 1,
          width: 0,
          gutterWidth: 0
        },
        shopList: [1, 2],
        search: [],
        pageNum: 1,
        pageSize: 20,
        third: '',
        itemType: '',
        name: '',
        timer: null,
        startStyle: {
          'background-position': '0px -18rem' //0.5start = -2.5rem
        },
        grabbleHeight: 88,
        showScrollBox: false,
        kmList: [{km: 500, table: '附近'}, {km: 1000, table: '1km'}, {km: 5000, table: '5km'}, {km: 10000, table: '10km'},
          {km: 15000, table: '15km'}, {km: 20000, table: '20km'}],
        kmActive: 500,
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
      }
    },
    created() {



      this.tradeType = this.$route.query.tradeType


      if (this.$Cookie.getMGHistory()) {
        this.search = eval(this.$Cookie.getMGHistory())
      }
      //this.getData()

    },
    mounted() {
      this.$refs.grabble_inp.focus()
      this.grabbleHeight = this.$refs.grabble.offsetHeight

    },
    methods: {
      selectData(x) {
        //附近
        this.kmActive = x.km
        this.showScrollBox = false
      },
      showSelectList() {
        this.showScrollBox = !this.showScrollBox
        if (this.showScrollBox) {
          document.body.scrollTop = document.documentElement.scrollTop = this.pageContent
        }
      },
      countermand() {
        this.$router.go(-1)
      },
      butGetData() {
        clearInterval(this.timer);
        this.timer = null;
        this.timer = setTimeout(() => {
          this.getData()
        }, 300)
      },
      GoodsDetails(x) {
        this.$router.push({path: '/GoodsDetails/' + x.id})
      },
      delectSearch() {
        this.$Cookie.removeMGHistory()
        this.search = []
      },
      searchContent(x) {
        this.name = x
        clearInterval(this.timer);
        this.timer = null;
        this.timer = setTimeout(() => {
          this.getData()
        }, 300)
      },
      getData() {
        //
        let itemType = this.itemType
        let name = this.name.trim()
        let third = this.third //0
        let pageNum = this.pageNum
        let pageSize = this.pageSize
        if (name == '') return


        this.$axiosApi.itemList(itemType, third, pageNum, pageSize, name).then(res => {
          if (res.code == 200) {
            //

            let time = new Date().getTime() / 100000000
            let shopList = res.data.list.map(v => {
              v.imgUrl = imgUrl(v.photo.split(',')[0])
              let resume = 550
              v.browse = (time + (v.name.length * resume)).toFixed(0)
              return v
            })
            this.shopList = shopList
            this.GrabbleShow = false
            console.log(this.search)
            this.search = [...new Set([name].concat(this.search))]
            this.$Cookie.setMGHistory(this.search)
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
      loadmore() {
        if (this.shopList.length == 0) return
        this.pageSize += 10
        clearInterval(this.timer);
        this.timer = null;
        this.timer = setTimeout(() => {
          this.getData()
        }, 300)
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">

  .GrabbleIndex {
    width: 100%;
    min-height: 100vh;
    background-color: #F5F5F5;
    .header {
      width: 100%;
      padding-top: 5.5rem;
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
        background-color: #ffffff;
        .left {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .callbackIcon {
            margin-right: 1.875rem;
            img {
              width: 1.375rem;
            }
          }
          .grabble_inp {
            background-color: #fff;
            width: 100%;
            padding: 0;
            height: 3.75rem;
            border-radius: 1.875rem;
            font-size: 1.75rem;
            border: 1px solid #DCDCDC;
            &:before {
              border: 0;
            }
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
          .grabble_but {
            color: #323232;
            font-size: 2rem;
          }
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
    .shopContent {
      position: relative;
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
          width: 100%;
          padding: 15.5rem 0;
          text-align: center;
          font-size: 2rem;
          color: #868686;
          /*background-color: #f4f4f4;*/
        }

      }
    }
    .searchRecord {
      position: fixed;
      width: 100%;
      height: calc(100vh - 6.75rem);
      bottom: 0;
      left: 0;
      background-color: #ffffff;
      .searchTop {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1.875rem;
        .left {
          font-size: 1.75rem;
          color: #323232;
        }
        .right {
          width: 1.875rem;
        }
      }
      .searchContent {
        padding: 0 1.875rem;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: center;
        .item {
          padding: 0 1.875rem;
          height: 2.875rem;
          border-radius: 1.4375rem;
          background-color: #F4F4F4;
          font-size: 1.75rem;
          color: #323232;
          line-height: 2.875rem;
          margin-right: 1.25rem;
          margin-bottom: 1.25rem;
          max-width: 20rem;
          word-break: break-all;
          display: -webkit-box; /**对象作为伸缩盒子模型展示**/
          -webkit-box-orient: vertical; /**设置或检索伸缩盒子对象的子元素的排列方式**/
          -webkit-line-clamp: 1; /**显示的行数**/
          overflow: hidden;
        }
      }
    }
  }

</style>
