<template>

  <div class="merchantInfoDetails">

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
              <div class="noItem">
                <div class="noData" v-if="imgList.length == 0">暂无相片</div>
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
                  <div class="noItem">
                    <div class="noData" v-if="CommontList.length == 0">暂无评论</div>
                  </div>
                  <load-more tip="正在加载..." class="loadingMore" v-if="onFetching"></load-more>
                  <divider v-if="CommontInfo && CommontList.length>0">到底了</divider>
                </div>
              </scroller>


            </div>
          </swiper-item>
        </swiper>

      </div>
      <div class="pay" v-show="tabActive == 0 && terminalType == 1" @click="ToPayPage">
        付 款
      </div>
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
      Scroller,
      LoadMore,
      Divider,
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
        imgList: [],
        info: '',
        brandId: '',
        agentId: '',
        pageNum: 1,
        pageSize: 10,
        CommontList: [],
        CommontInfo: false,
        onFetching: false,
        noDataShow: false,
        terminalType: '0'
      }
    },

    created() {
      this.agentId = this.$route.query.agentId
      this.brandId = this.$route.query.brandId
      this.terminalType = this.$route.query.terminalType
      this.getData()
      this.getCommontInfo()
    },
    methods: {
      ToPayPage() {
        this.$router.push({path: '/payment?agentId=' + this.agentId + '&brandId=' + this.brandId + '&EnvironmentalType=' + '1'})
      },
      getData() {
        let agentId = this.agentId
        let lng = null
        let lat = null
        this.$axiosApi.agentDetail(agentId, lng, lat).then(res => {
          if (res.code == 200) {
            this.info = res.data
            if (res.data.photo) {
              this.imgList = eval(res.data.photo).map(v => {
                return imgUrl(v)
              })
            }

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
        let time = ''
        this.$axiosApi.getAgentCommont(this.agentId,time, orderBy, this.pageNum, this.pageSize).then(res => {
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


</style>
