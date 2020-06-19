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
        <div class="tagList">
          <div class="tag">自营</div>
          <div class="tag" v-if="tagShow">U米兑换</div>
        </div>

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
        if (this.$Cookie.getToken() == '' && this.$EnvironmentAI() == 2) {
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
          return
        }

        if (this.$Cookie.getToken() == "") {
          if (this.$route.query.userId) {

            // let appName =  this.$store.getters.appName
            this.$vux.confirm.show({
              content: "请前往APP领取",
              confirmText: '前往下载',
              onCancel() {

              },
              onConfirm: () => {
                location.href = 'https://www.hlxiaoxiong.com/h5/#/?userID=' + this.$route.query.userId
              }
            })
          } else {
            this.$vux.alert.show({
              title: '提示',
              content: "缺少重要参数",
              onShow() {
              },
              onHide() {
              }
            })
          }

          return
        }


        if (this.$store.getters.userInfo.password != 1) {
          this.$vux.confirm.show({
            content: "暂未设置交易密码",
            confirmText: '前往设置',
            onCancel() {

            },
            onConfirm: () => {
              this.$router.push({
                path: '/updatePayPwd'
              })
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



</style>
