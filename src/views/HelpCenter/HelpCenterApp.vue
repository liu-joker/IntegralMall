<template>
  <div class="HelpCenterApp">
    <div class="item2" v-if="itemShow == 1">
      <tab>
        <tab-item :selected="selectIndex == 0" @on-item-click="onItemClick">商家入驻操作手册</tab-item>
        <tab-item :selected="selectIndex == 1" @on-item-click="onItemClick">商家中心功能介绍</tab-item>
      </tab>
      <swiper :options="swiperOption" ref="swiper1">
        <swiper-slide class="swiper-demo-img" :key="0">
          <div class="imgList">
            <img :src="x" v-for="(x,index) in imgList1" :key="index" alt="">
          </div>
        </swiper-slide>
        <swiper-slide class="swiper-demo-img" :key="1">
          <div class="imgList">
            <img :src="x" v-for="(x,index) in imgList2" :key="index" alt="">
          </div>
        </swiper-slide>
      </swiper>
    </div>
    <div class="item1" v-else>
      <div class="title">操作指南</div>
      <p>（1）更改地址：进入APP--点击商城页面--点击右上角我的--点击收货地址--点击新增收货地址/编辑。</p>
      <p>（2）修改交易密码：进入APP--点击我的--点击右上角设置--点击修改交易密码。</p>
      <br/>
      <br/>
      <div class="title">订单问题</div>
      <p>（1）提交订单：</p>
      <p class="p1">①已支付成功的订单在“我的订单”中可以查看；</p>
      <p class="p1">②已支付成功的订单，在商品库充足的情况下，将根据您的订单信息不同会有不同的
        到货时间（偏远地区配送时间可能会更长）；</p>
      <p class="p1">③订单支付成功后，跟踪订单物流信息可以在订单详情中查看物流轨迹。</p>
      <p>（2）订单取消：</p>
      <p class="p1">①订单支付成功后，状态在配货中的订单无法取消；</p>
      <p>（3）异常取消：</p>
      <p class="p1">①已发货的订单显示的快递单号查询不到配送信息一般是由于上传错误的快递单号货
        快递暂时未录入信息导致，若您的订单长时间未更新，可以直接联系{{appName}}客服
        帮您处理。</p>
      <p>（4）订单修改：</p>
      <p class="p1"> ①下单成功后订单信息无法修改，如确定订单信息错误，请第一时间联系平台客服修
        改订单信息；如货物已发出，需拦截或者拒收订单，届时产生的相关运输费用由消
        费者承担。</p>
      <p class="p1">②如后台收款人姓名及电话错误，请在下单前到“收货地址”中进行电话及姓名信息
        的更正。</p>
      <p>（5）订单常见问题：</p>
      <p class="p1">①为避免地址信息重复，填好省、市、区后，在详细地址里直接填写具体的街道地
        址；</p>
      <p class="p1">②收货人电话一定要保持畅通。</p>
      <br/>
      <br/>
      <div class="title">物流问题</div>
      <p>（1）商品发货：</p>
      <p class="p1">①订单支付成功后，会在T+1个工作日安排发货；</p>
      <p class="p1">②平台会在产品发货后及时将快递/物流信息在交易相关页面予以更新。</p>
      <p>（2）配送问题：</p>
      <p class="p1">①客户下单平台发货后，一般时效在：3-5天左右（不含偏远地区等）。</p>

    </div>
  </div>
</template>

<script>
  import {Tab, TabItem} from 'vux'

  import enter_01 from "@/assets/helpCenter/enter_01.jpg"
  import enter_02 from "@/assets/helpCenter/enter_02.jpg"
  import enter_03 from "@/assets/helpCenter/enter_03.jpg"
  import enter_04 from "@/assets/helpCenter/enter_04.jpg"
  import enter_05 from "@/assets/helpCenter/enter_05.jpg"
  import enter_06 from "@/assets/helpCenter/enter_06.jpg"
  import enter_07 from "@/assets/helpCenter/enter_07.jpg"

  import center_01 from "@/assets/helpCenter/center_01.jpg"
  import center_02 from "@/assets/helpCenter/center_02.jpg"
  import center_03 from "@/assets/helpCenter/center_03.jpg"
  import center_04 from "@/assets/helpCenter/center_04.jpg"
  import center_05 from "@/assets/helpCenter/center_05.jpg"
  import center_06 from "@/assets/helpCenter/center_06.jpg"
  import center_07 from "@/assets/helpCenter/center_07.jpg"
  import center_08 from "@/assets/helpCenter/center_08.jpg"
  import center_09 from "@/assets/helpCenter/center_09.jpg"
  import center_10 from "@/assets/helpCenter/center_10.jpg"
  import center_11 from "@/assets/helpCenter/center_11.jpg"
  import center_12 from "@/assets/helpCenter/center_12.jpg"
  import center_13 from "@/assets/helpCenter/center_13.jpg"


  export default {
    name: 'HelpCenterApp',
    components: {
      Tab,
      TabItem,
    },
    data() {
      const self = this
      return {
        appName: this.$store.getters.userInfo.brandName,
        itemShow: 0,//帮助中心类别
        selectIndex: 0,
        swiperOption: {//swiper3
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
              self.selectIndex = this.realIndex
              console.log(this.realIndex)
            }
          }
        },
        imgList1: [enter_01, enter_02, enter_03, enter_04, enter_05, enter_06, enter_07],
        imgList2: [center_01, center_02, center_03, center_04, center_05, center_06, center_07, center_08, center_09, center_10, center_11, center_12, center_13,],
      }
    },
    computed: {
      swiper() {
        return this.$refs.swiper1.$swiper
      },
    },
    created() {
      if (this.$store.getters.userInfo.brandId == 'dc244cacf322438f8b8cff6b47865020') {
        this.itemShow = 1
      }

    },
    methods: {
      onItemClick(index) {
        this.selectIndex = index
        console.log(this.selectIndex)
        this.swiper.slideTo(this.selectIndex, 400, false)
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less">

  @import "../../styles/default.css";

  @themeColor: #F89F04;
  .HelpCenterApp {

    background-color: #f4f4f4;
    text-align: left;
    min-height: 100vh;

    .vux-tab-container {
      height: auto;
      .vux-tab .vux-tab-item.vux-tab-selected {
        color: @themeColor;
      }
      .vux-tab-ink-bar {
        background-color: @themeColor;
      }
    }

    .item1 {
      min-height: calc(100vh - 3rem);
      padding: 1.5rem;
    }
    .title {
      font-size: 1.75rem;
      font-weight: bold;
      color: #323232;
    }
    p {
      color: #646464;
      font-size: 1.5rem;
      &.p1 {
        padding-left: 2rem;
      }
    }
    .item2 {
      .imgList {
        min-height: 100vh;
        img {
          width: 100%;
          height: auto;
        }
      }

    }
  }

</style>
