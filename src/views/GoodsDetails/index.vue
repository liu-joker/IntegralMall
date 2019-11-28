<template>

  <div class="GoodsDetails">

    <div class="G_banner">
      <swiper auto dots-position="center" loop style="width: 100%;margin:0 auto;" :aspect-ratio="40.63/46.88"
              :interval=5000>
        <swiper-item class="swiper-demo-img" v-for="(item, index) in itemInfo.photoList" :key="index">
          <img :src="item | imgUrl" alt="" class="bannerImg">
        </swiper-item>
      </swiper>
    </div>
    <div class="Banner_info">
      <div class="head">
        <div class="name">{{itemInfo.name}}</div>
        <div class="tag">自营</div>
        <div class="tag" v-if="tagShow">U米兑换</div>
      </div>
      <div class="num">
        <span class="PresentPrice" v-html="PresentPrice()"></span>
        <span class="originalPrice">&yen;{{itemInfo.showAmount | formatMoney}}</span>
      </div>
      <div class="way">
        <p class="way_title">选择折扣方式：</p>
        <checker v-model="active" default-item-class="defaultItem" radio-required selected-item-class="selected"
                 class="list">
          <checker-item :value="item.payMode" v-for="(item, index) in priceInfo" :key="index"
                        v-html="item.itemName"></checker-item>
        </checker>
      </div>
    </div>

    <div class="goodsInfo">
      <!--    <div class="title">
            商品详情
          </div>-->
      <div class="goodsImgList">
        <div class="item" v-html="itemInfo.description">

        </div>
      </div>
    </div>


    <div class="pay">
      <div class="left">
        <div class="price">
          <div class="num" v-html="PresentPrice()"></div>
          <div>价格</div>
        </div>
        <div class="share" @click="share" v-if="$Cookie.getToken('token') != ''">
          <img :src="icon_share2" alt="" class="shareImg">
          <div>分享</div>
        </div>
      </div>
      <div class="right" :class="itemInfo.status == 2?'disable':''" @click="pay">
        免费领取
      </div>
    </div>

  </div>

</template>

<script>
  import icon_my from "@/assets/images/icon_my.png"
  import banner1 from "@/assets/images/banner1.png"
  import pic_sort1 from "@/assets/images/pic_sort1.png"
  import pic_sort2 from "@/assets/images/pic_sort2.png"
  import pic_sort3 from "@/assets/images/pic_sort3.png"
  import pic_sort4 from "@/assets/images/pic_sort4.png"
  import pic_sort5 from "@/assets/images/pic_sort5.png"
  import pic_commodity1 from "@/assets/images/pic_commodity1.png"
  import pic_commodity2 from "@/assets/images/pic_commodity2.png"
  import icon_browse from "@/assets/images/icon_browse.png"
  import icon_share2 from "@/assets/images/icon_share2.png"
  import {Swiper, SwiperItem, Checker, CheckerItem} from 'vux'
  import {formatMoney} from "@/filters"

  export default {
    name: 'GoodsDetails',
    components: {
      Swiper,
      SwiperItem,
      Checker,
      CheckerItem
    },
    data() {
      return {
        icon_my: icon_my,
        banner1: banner1,
        icon_browse: icon_browse,
        icon_share2: icon_share2,
        bannerList: [banner1, banner1, banner1],
        itemInfo: {},
        priceInfo: [],
        active: "",
        tagShow: false,
        PresentPrice: function () {
          if (this.priceInfo.length != 0) {
            let item = this.priceInfo.find(v => {
              return v.payMode == this.active
            })
            if (item) {
              return item.itemName
            } else {
              return ""
            }
          }
          return ""
        },
        id: ''
      }
    },
    created() {

      this.id = this.$route.params.id
      this.getData()
    },
    methods: {
      share() {
        this.$router.push({
          path: '/share/' + this.id + '/' + this.active
        })

      },
      pay() {
        if (this.itemInfo.status == 2) {
          return
        }

        if (this.$Cookie.getToken() == "") {
          this.$vux.confirm.show({
            content: "请前往小米粒APP领取",
            confirmText: '前往下载',
            onCancel() {

            },
            onConfirm: () => {
              location.href = 'https://www.hlxiaoxiong.com/h5/#/?userID=' + this.$route.query.userId
            }
          })

          return
        }

        let itemId = this.itemInfo.id;
        let payMode = this.active;

        this.$router.push({path: '/confirmAnOrder/' + payMode + '/' + itemId})

      },
      getData() {
        this.$vux.loading.show({
          text: '加载中...'
        })
        const data = {
          itemId: this.id,
          grade: this.$store.getters.userInfo.grade,
        }
        this.$axiosApi.itemDetail(data.itemId, data.grade).then(res => {
          this.$vux.loading.hide()
          if (res.code == 200) {
            this.itemInfo = res.data.item
            this.itemInfo.photoList = res.data.item.photo.split(',')
            this.itemInfo.photoList.splice(0, 1)
            this.priceInfo = res.data.priceInfo.map(v => {
              this.tagShow = true
              //1金钱2积分3混合
              v.itemName = '¥' + formatMoney(v.amount) + "+" + v.coin + "U米"
              return v

            })
            let active = this.priceInfo.find(v => {
              return v.payMode == 1
            })

            if (active) {
              this.active = active.payMode
            } else {
              this.active = this.priceInfo[0].payMode
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
</script>

<style rel="stylesheet/less" lang="less">

  .GoodsDetails {
    background-color: #f4f4f4;
    min-height: 100vh;

    .G_banner {
      .bannerImg {
        width: 100%;
        height: 100%;
      }
    }
    .Banner_info {
      padding: 1.875rem;
      background-color: #ffffff;
      .head {
        font-size: 1.75rem;
        color: #323232;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        .name {
          margin-right: 1.4rem;
        }
        .tag {
          color: #AD822F;
          border: 1px solid #AD822F;
          border-radius: 2px;
          font-size: 0.875rem;
          margin-right: 0.625rem;
          padding: 0.125rem;
        }
      }
      .num {
        margin-top: 2rem;
        margin-bottom: 1.75rem;
        .PresentPrice {
          color: #E84646;
          font-size: 2rem;
        }
        .originalPrice {
          color: #8C8C8C;
          font-size: 1.5rem;
          text-decoration: line-through;
          margin-left: 1.25rem;
        }
      }
      .way {
        .way_title {
          font-size: 1.5rem;
          color: #646464;
          margin-bottom: 1rem;
        }
        .list {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          .defaultItem {
            border: 1px solid #8c8c8c;
            padding: 0 0.75rem;
            border-radius: 2px;
            font-size: 1.75rem;
            color: #8c8c8c;
            margin-right: 1.875rem;
            height: 2.875rem;
            line-height: 2.875rem;
            &.selected {
              color: #ffffff;
              background-color: #2D2922;
              border-color: #2D2922;
            }
          }
        }
      }
    }
    .goodsInfo {
      margin-top: 1.25rem;
      background-color: #ffffff;
      padding-bottom: 8rem;
      .title {
        text-align: center;
        font-size: 2.375rem;
        color: #323232;
        line-height: 6.5rem;
      }
      .goodsImgList {
        .item {
          img {
            width: 100% !important;
            height: auto !important;
          }
        }
      }
    }
    .pay {
      display: flex;
      align-items: stretch;
      justify-content: space-between;
      background-color: #ffffff;
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 6.19rem;
      .left {
        flex: 1;
        padding: 1rem 4.25rem 0.75rem 2.3rem;
        color: #8C8C8C;
        font-size: 1.125rem;
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        border-top: 1px solid #D0D0D0;
        .price {
          display: flex;
          align-items: baseline;
          justify-content: space-around;
          flex-direction: column;
          .num {
            color: #E84646;
            font-size: 2rem;
            font-weight: bold;
            margin-bottom: 0.5rem;
          }
        }
        .share {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          .shareImg {
            width: 2.875rem;
            height: 2.875rem;
            margin-bottom: 0.25rem;
          }
        }
      }
      .right {
        width: 12.75rem;
        background-color: #2D2922;
        border-top: 1px solid #2D2922;
        text-align: center;
        line-height: 6.2rem;
        font-size: 2rem;
        color: #ffffff;
        &.disable {
          color: #FEFEFE;
          background-color: #BDBDBD;
          border-color: #BDBDBD;
        }
      }
    }
  }

</style>
