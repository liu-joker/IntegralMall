<template>

  <div class="merchantInfo">

    <div class="headTitle">
      <div class="h_title">{{info.shopName}}</div>
      <div class="evaluate">
        <span class="start" :style="startStyle"></span>
        <span>4.5分</span>
      </div>
    </div>
    <div class="m_content">
      <div class="sticky">
        <tab :line-width="1" custom-bar-width="3.75rem" bar-active-color="#4385FF" active-color="#323232"
             default-color="#646464" class="stickyTab">
          <tab-item @click.native="returnTop(0)" :selected="tabActive==0">概况</tab-item>
          <tab-item @click.native="returnTop(1)" :selected="tabActive==1">相册</tab-item>
          <tab-item @click.native="returnTop(2)" :selected="tabActive==2">评论</tab-item>
        </tab>
      </div>
      <div class="swiperTab">
        <swiper v-model="tabActive" :show-dots="false" :threshold="10000" :min-moving-distance="10000">
          <swiper-item class="swiperItem swiper_merchantInfo">
            <div class="tab-swiper tab-swiper1" v-show="tabActive == 0">
              <div class="bannerImg">
                <img :src="info.frontPhoto | imgUrl" alt="">
              </div>
              <div class="addressInfo">
                <div class="addressOrName">
                  <div class="left">
                    <img :src="icon_dingnwei" alt="">
                  </div>
                  <div class="right">
                    <div class="item_l">
                      <div class="address_text">
                        {{info.district}}{{info.address}}
                      </div>
                      <!--<div class="distance">距离您  3.6km</div>-->
                    </div>
                    <div class="item_r">
                      <!--  <div class="icon_item">
                          <img :src="icon_daohang" alt="">
                          导航
                        </div>-->
                      <a :href="'tel:'+info.contactPhone">
                        <div class="icon_item">

                          <img :src="icon_phone" alt="">
                          电话
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
                <div class="businessHours">
                  <div class="img">
                    <img :src="icon_open" alt="">
                  </div>
                  <p>营业时间:{{info.openTime}}</p>
                </div>
              </div>
              <div class="m_card">
                <div class="card_title">
                  商家介绍
                </div>
                <div class="PresentationInfo">
                  {{info.selfIntroduce}}
                </div>
              </div>
              <div class="m_card">
                <div class="card_title">
                  经营范围
                </div>
                <div class="PresentationInfo">
                  <pre v-html="info.key1">

                  </pre>
                </div>
              </div>
            </div>
          </swiper-item>
          <swiper-item class="swiperItem">
            <div class="tab-swiper" v-show="tabActive == 1">
              <div class="imgList">
                <div class="item" v-for="(x,index) in imgList" :key="index">
                  <img v-lazy="x" alt="">
                </div>
              </div>
            </div>
          </swiper-item>
          <swiper-item class="swiperItem">
            <div class="tab-swiper commentItem" v-show="tabActive == 2">
              <scroller lock-x @on-scroll-bottom="onScrollBottom" ref="scrollerBottom2" :scroll-bottom-offst="300"
                        v-if="!noDataShow" height="77.5vh">
                <div class="commentList">
                  <div class="itemC" :class="index == CommontList.length-1?'last-itemC':''"
                       v-for="(x,index) in CommontList" :key="index">
                    <div class="c_i_content">
                      <div class="left">
                        <img :src="x.img" alt="">
                      </div>
                      <div class="right">
                        <div class="r_head">
                          <div class="r_top">
                            <span>{{x.userPhone}}</span>
                            <span class="time">{{x.createTime}}</span>
                          </div>
                          <div class="r_bottom">
                            <div class="userEvaluate">
                              <span>评分</span>
                              <span class="start" :style="x.UserStartStyle"></span>
                              <span>¥{{x.amount2}}/人</span>
                            </div>
                          </div>
                        </div>
                        <div class="i_foot">
                          {{x.comment}}
                        </div>
                      </div>
                    </div>
                  </div>
                  <load-more tip="正在加载..." class="loadingMore" v-if="onFetching"></load-more>
                  <divider v-if="CommontInfo && CommontList.length>0">到底了</divider>
                </div>
              </scroller>

              <div class="noItem">
                <div class="noData" v-if="CommontList.length == 0">暂无评论</div>
              </div>
            </div>
          </swiper-item>
        </swiper>

      </div>
      <!--<div class="pay" v-show="tabActive == 0" @click.native="ToPayPage">
        付 款
      </div>-->
    </div>
  </div>

</template>

<script>
  import pic_sjgk from "@/assets/images/pic_sjgk.png"
  import icon_dingnwei from "@/assets/images/icon_dingnwei.png"
  import banner1 from "@/assets/images/banner1.png"
  import icon_daohang from "@/assets/images/icon_daohang.png"
  import icon_phone from "@/assets/images/icon_phone.png"
  import icon_open from "@/assets/images/icon_open.png"
  import pic_sjxc from "@/assets/images/pic_sjxc.png"
  import {imgUrl, formatMoney} from "@/filters"

  import {
    Scroller, LoadMore, Divider,
    Sticky,
    Tab,
    TabItem,
    Swiper,
    SwiperItem
  } from 'vux'

  export default {
    name: 'merchantInfo',
    components: {
      Scroller, LoadMore, Divider,
      Sticky,
      Tab,
      TabItem,
      Swiper,
      SwiperItem
    },
    data() {
      return {
        pic_sjgk: pic_sjgk,
        icon_dingnwei: icon_dingnwei,
        icon_daohang: icon_daohang,
        icon_phone: icon_phone,
        icon_open: icon_open,
        banner1: banner1,
        startStyle: {
          'background-position': '0px -18rem' //0.5start = -2.5rem
        },
        UserStartStyle: {
          'background-position': '0px -18rem' //0.5start = -2.5rem
        },
        tabActive: 0,
        imgList: [pic_sjxc, pic_sjxc, pic_sjxc, pic_sjxc],
        info: '',
        brandId: '',
        agentId: '',
        pageNum: 1,
        pageSize: 10,
        CommontList: [],
        CommontInfo: false,
        onFetching: false,
        noDataShow: false,
      }
    },

    created() {
      this.agentId = this.$route.query.agentId
      //  this.brandId = this.$route.query.brandId
      this.getData()
      this.getCommontInfo()
    },
    methods: {
      ToPayPage() {
        this.$router.push({path: '/payment?agentId=' + this.agentId + '&brandId=' + this.brandId})
      },
      getData() {
        let agentId = this.agentId
        let lng = null
        let lat = null
        this.$axiosApi.agentDetail(agentId, lng, lat).then(res => {
          if (res.code == 200) {
            this.info = res.data
            this.imgList = eval(res.data.photo).map(v => {
              return imgUrl(v)
            })
            console.log(this.imgList)
          }
        })
      },
      onScrollBottom() {
        if (this.onFetching) {
        } else {
          this.onFetching = true;
          if (this.CommontInfo) return this.onFetching = false;
          this.pageSize += 10;
          this.getCommontInfo()

        }
      },
      getCommontInfo() {
        //获取商户评论列表

        let orderBy = 1
        this.$axiosApi.getAgentCommont(this.agentId, orderBy, this.pageNum, this.pageSize).then(res => {
          if (res.code == 200) {

            if (res.data.length == this.CommontList.length) {
              this.CommontInfo = true
            }
            this.CommontList = res.data.map(v => {
              v.img = imgUrl(v.userPhoto)
              v.amount2 = formatMoney(v.amount)
              let s = (v.score - 1) * 5 + 0.5
              v.UserStartStyle = {
                'background-position': '0px -' + s + 'rem' //0.5start = -2.5rem
              }
              return v
            })
            this.onFetching = false
          }
        })
      },
      returnTop: function (x) {
        this.tabActive = x
        if (x == 1) {
//          this.$refs.tab2.scrollIntoView({block: "start", behavior: "smooth"});
        } else if (x == 0) {
//          this.$refs.tab1.scrollIntoView({block: "start", behavior: "smooth"});
        }
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less">

  .merchantInfo {
    min-height: 100vh;
    background-color: #ffffff;
    .start {
      display: inline-block;
      width: 8.375rem;
      height: 1.5rem;
      background: url('~@/assets/images/start.png') no-repeat;
      background-size: 8.375rem 22.5rem;
      background-position: 0px -0.5rem;
      margin-right: 0.5rem;
    }
    .headTitle {
      padding: 1.875rem 1.875rem 0;
      background-color: #fff;
      .h_title {
        color: #323232;
        font-size: 2rem;
        font-weight: bold;
        margin-bottom: 1.25rem;
      }
      .evaluate {
        color: #646464;
        font-size: 1.25rem;
        display: flex;
        align-items: baseline;
        justify-content: flex-start;

      }
    }
    .m_content {
      .sticky {
        padding: 3rem 1.875rem 2.875rem;
        background-color: #fff;

        .stickyTab {
          width: 50%;
          .vux-tab-container {
            height: auto;
          }
          .vux-tab {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            height: auto;
            .vux-tab-item {
              font-size: 1.875rem;
              color: #646464;
              position: relative;
              z-index: 2;
              line-height: 1.875rem;
              text-align: left;
            }
            .vux-tab-selected {
              font-size: 2.375rem;
              color: #323232;
              font-weight: bold;
              line-height: 2.375rem;
            }
            .vux-tab-ink-bar {
              z-index: 1;
              height: auto !important;
            }
            .vux-tab-bar-inner {
              width: 4.5rem !important;
              background-color: #F89F04 !important;
              height: 0.75rem !important;
              margin: 0;
            }
          }

        }
        .vux-tab-item {
          background: transparent;
        }
      }
      .swiperTab {
        .vux-swiper {
          height: auto !important;
          overflow: auto;
          overflow-y: scroll;
          overflow-x: hidden;
          width: 100%;
          .swiperItem {
            width: 100%;
            position: relative;
            &.swiper_merchantInfo{
              background-color: #f4f4f4;
            }
            .commentItem {
              max-height: 100vh;
            }
            .tab-swiper1 {
              padding: 0 0 1.75rem;
            }
          }
          .bannerImg {
            padding: 0 1.875rem;
            background-color: #fff;
            height: 16.25rem;
            overflow: hidden;
            img {
              width: 100%;
              height: auto;
              border-radius: 5px;
            }
          }
          .addressInfo {
            background-color: #fff;
            padding: 1.625rem 1.875rem 1.75rem;
            .addressOrName {
              display: flex;
              align-items: baseline;
              justify-content: flex-start;
              .left {
                margin-right: 1.5rem;
                img {
                  width: 2.25rem;
                  height: 2.25rem;
                }
              }
              .right {
                flex: 1;
                border-bottom: 1px solid #EAEAEA;
                padding-bottom: 1rem;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .item_l {
                  flex: 1;
                  text-align: left;
                  padding-right: 1.5rem;
                  border-right: 1px solid #EAEAEA;
                  .address_text {
                    font-size: 1.75rem;
                    color: #323232;
                  }
                  .distance {
                    margin-top: 0.25rem;
                    font-size: 1.25rem;
                    color: #8C8C8C;
                  }
                }
                .item_r {
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  padding-left: 2rem;
                  .icon_item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    font-size: 1.25rem;
                    color: #8c8c8c;
                    &:first-child {
                      margin-right: 2.875rem;
                    }
                    img {
                      width: 2.75rem;
                      height: 2.75rem;
                      margin-bottom: 0.75rem;
                    }
                  }

                }
              }
            }
            .businessHours {
              display: flex;
              align-items: center;
              justify-content: flex-start;
              margin-top: 1.875rem;
              .img {
                img {
                  width: 2.25rem;
                  height: 2.25rem;
                  margin-right: 1.5rem;
                }
              }
              > p {
                flex: 1;
                font-size: 1.75rem;
                color: #323232;
              }
            }
          }
          .card_title {

            font-size: 2rem;
            font-weight: bold;
            color: #323232;
            padding-bottom: 1rem;
            border-bottom: 1px solid #eaeaea;
          }
          .m_card {
            padding: 1.75rem 1.875rem 2rem;
            margin-top: 1.25rem;
            background-color: #ffffff;
            .PresentationInfo {
              padding-top: 1.5rem;
              font-size: 1.75rem;
              color: #323232;
              pre {
                font-family: PingFang SC;
                line-height: 1.5em;
                margin: 0;
                padding: 0;
                font-size: 1.75rem;
                color: #323232;
              }
            }
          }
          .M_Presentation {

          }

          .imgList {
            padding: 0 1.875rem 0;
            background-color: #fff;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;
            .item {
              margin-bottom: 1.375rem;
              img {
                width: 20rem;
                height: 20rem;
                border-radius: 10px;
              }
            }
          }
          .commentList {
            background-color: #fff;
            .itemC {
              padding: 1.5rem 1.875rem 0;
              &.last-itemC {
                .c_i_content {
                  .right {
                    border: none;
                  }
                }
              }
              .c_i_content {
                display: flex;
                align-items: flex-start;
                justify-content: space-between;
                .left {
                  margin-right: 1.5rem;
                  img {
                    width: 4.5rem;
                    height: 4.5rem;
                    border-radius: 2.25rem;
                  }
                }

                .right {
                  flex: 1;
                  border-bottom: 1px solid #EAEAEA;

                  .r_head {
                    .r_top {
                      font-size: 2rem;
                      color: #323232;
                      display: flex;
                      align-items: baseline;
                      justify-content: space-between;
                      .time {
                        font-size: 1.5rem;
                        color: #646464;
                      }
                    }
                    .r_bottom {
                      font-size: 1.5rem;
                      color: #646464;
                      display: flex;
                      align-items: center;
                      justify-content: flex-start;
                      .start {
                        margin-right: 1.5rem;
                      }
                    }
                  }
                  .i_foot {
                    padding: 2.5rem 0 1.875rem;
                    font-size: 1.75rem;
                    color: #323232;
                  }
                }

              }
            }
          }
        }
        /*   .vux-swiper-item {
             position: relative !important;
           }*/
      }
      .pay {
        width: 100%;
        height: 6.75rem;
        background-color: #F89F04;
        font-size: 2.375rem;
        color: #ffffff;
        position: fixed;
        left: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        &:active {
          background-color: #d08504;
        }
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

</style>
