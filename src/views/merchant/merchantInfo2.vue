<template>

  <div class="merchantInfoDetails2">

    <div class="headTitle">
      <div class="h_title">{{info.shopName}}</div>
      <div class="evaluate">
        <span class="start" :style="startStyle"></span>
        <span>4.5分</span>
      </div>
    </div>
    <div class="m_content">
      <div class="swiperTab">
        <div class="tab-swiper tab-swiper1">
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
            <div class="businessHours" @click="toDetails">
              <div class="img">
                <img :src="icon_open" alt="">
              </div>
              <div class="businessHoursInfo">
                <div class="time">
                  营业时间:{{info.openTime}}
                </div>
                <div>
                  <svg-icon class="form_icon" icon-class="right"></svg-icon>
                </div>
              </div>
            </div>
          </div>
          <div class="cardList">
            <div class="sticky_Box">
              <sticky ref="sticky" >
                <div class="sticky" ref="sticky2">
                  <tab :line-width="1" custom-bar-width="4.125rem" bar-active-color="#4385FF" active-color="#323232"
                       default-color="#646464" class="stickyTab" :scroll-threshold="5">
                    <tab-item @click.native="scrollTo(0)" :selected="active==0">直播</tab-item>
                    <tab-item @click.native="scrollTo(1)" :selected="active==1">优惠</tab-item>
                    <tab-item @click.native="scrollTo(2)" :selected="active==2">小店</tab-item>
                    <tab-item @click.native="scrollTo(3)" :selected="active==3">特权</tab-item>
                    <tab-item @click.native="scrollTo(4)" :selected="active==4">活动</tab-item>
                  </tab>
                </div>
              </sticky>
            </div>

            <div class="m_cardList">
              <div class="m_card">
                <div class="card_title">
                  <div class="titleText">
                    精彩呈现
                  </div>
                  <div class="titleR" v-if="videoData.videoTitle" @click="toMoreVideo">
                    查看更多>>
                  </div>
                </div>
                <div class="Video" v-if="videoData.videoTitle">
                  <div class="video_content">
                    <video-view :videoData="videoData"></video-view>
                  </div>
                  <div class="PresentationInfo">
                    {{videoData.videoTitle}}
                  </div>
                </div>
                <div class="m_noItem" v-else>
                  暂无精彩视频
                </div>

                <div class="card_title card_title2">
                  <div class="titleText">精彩评论</div>
                </div>
                <div v-if="CommontList.length != 0">
                  <div class="commentList">
                    <div class="itemC" v-for="(x,index) in CommontList" :key="index">
                      <div class="c_i_content">
                        <div class="left">
                          <img :src="x.img !=''?x.img:pic_head" alt="">
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
                  </div>
                  <div class="allCommentList" @click="toCommentList" v-if="AgentGoods.length >2">
                    <div class="left">查看全部评论</div>
                    <div class="right">
                      <svg-icon class="form_icon" icon-class="right"></svg-icon>
                    </div>
                  </div>
                </div>
                <div class="m_noItem" v-else>
                  暂无评论
                </div>

              </div>
              <div class="m_card">
                <div class="card_title">
                  到店套餐
                </div>
                <div v-if="AgentGoods.length !=0">
                  <div class="goodsList">
                    <div class="item_G" v-for="(x,index) in AgentGoods"  @click="toPackageDetails(x)">
                      <div class="left">
                        <img :src="x.goodsPhotoList[0] | imgUrl" alt="">
                      </div>
                      <div class="right">
                        <div class="goodsTitle">{{x.goodsTitle}}</div>
                        <div class="right_d2">
                          <div class="d2_left">{{x.useDayValue}}|{{x.appointment == 0 ? '免预约' : '需要预约'}}</div>
                          <div class="d2_right"  @click="toPackageDetails(x)">
                            <div class="but">抢购</div>
                          </div>
                        </div>
                        <div class="right_d3">
                          <div class="d3_left">
                            <span class="amount">¥{{x.realAmount | formatMoney}}</span>
                            <span class="oldAmount">¥{{x.showAmount | formatMoney}}</span>
                          </div>
                          <!--<div class="d3_right">已售：{{x.buyBumber}}</div>-->
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="allGoods" @click="toPackageDetails" v-if="AgentGoods.length >1">
                    <div class="left">查看其它套餐</div>
                    <div class="right">
                      <svg-icon class="form_icon" icon-class="bottom"></svg-icon>
                    </div>
                  </div>
                </div>
                <div class="m_noItem" v-else>
                  暂无套餐
                </div>
              </div>
              <div class="m_card shop_card">
                <div class="card_title">
                  <div class="titleText">
                    精品推荐
                  </div>
                  <div class="titleR" v-if="selectList.length!=0" @click="toShopSelectList">
                    查看更多>>
                  </div>
                </div>
                <div class="shopList" v-if="selectList.length!=0">
                  <scroller :lock-y="true" :scrollbar-x='false' ref="scroller">
                    <div class="box1" :style="box1Style">
                      <div class="box1-list" ref="box1">
                        <div class="box1-item" v-for="(x,index) in selectList" @click="toGoodsDetails(x)">
                          <div class="headImg">
                            <img :src="x.imgUrl" alt="">
                          </div>
                          <div class="item_footText">
                            <div class="info">{{x.name}}</div>
                            <div class="number">{{x.coin}}U米</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </scroller>
                </div>
                <div class="m_noItem" v-else>
                  暂无推荐
                </div>
              </div>
              <div class="m_card privilege">
                <div class="card_title">
                  特权尊享
                </div>
                <div v-if="false">
                  <div class="itemList">
                    <div class="item">
                      <div class="left">
                        <img src="http://img.cdn.hljcxiaoxiong.com/1542681329744" alt="">
                      </div>
                      <div class="right">
                        <div class="item_name">腾讯视频VIP</div>
                        <div class="item_info">
                          <div class="info">【新用户仅需8元】腾讯视频1个月</div>
                          <div class="but">抢购</div>
                        </div>
                        <div class="amount">
                          <div class="number">¥10.00</div>
                          <div>已售：243</div>
                        </div>
                      </div>
                    </div>
                    <div class="item">
                      <div class="left">
                        <img src="http://img.cdn.hljcxiaoxiong.com/1542681329744" alt="">
                      </div>
                      <div class="right">
                        <div class="item_name">腾讯视频VIP</div>
                        <div class="item_info">
                          <div class="info">【新用户仅需8元】腾讯视频1个月</div>
                          <div class="but">抢购</div>
                        </div>
                        <div class="amount">
                          <div class="number">¥10.00</div>
                          <div>已售：243</div>
                        </div>
                      </div>
                    </div>
                    <div class="item">
                      <div class="left">
                        <img src="http://img.cdn.hljcxiaoxiong.com/1542681329744" alt="">
                      </div>
                      <div class="right">
                        <div class="item_name">腾讯视频VIP</div>
                        <div class="item_info">
                          <div class="info">【新用户仅需8元】腾讯视频1个月</div>
                          <div class="but">抢购</div>
                        </div>
                        <div class="amount">
                          <div class="number">¥10.00</div>
                          <div>已售：243</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="allGoods" @click="toMorePrivilege">
                    <div class="left">查看更多特权</div>
                    <div class="right">
                      <svg-icon class="form_icon" icon-class="bottom"></svg-icon>
                    </div>
                  </div>
                </div>
                <div class="m_noItem" v-else>
                  暂无特权
                </div>
              </div>
              <div class="m_card activity_card">
                <div class="card_title">
                  <div class="titleText">
                    精彩活动
                  </div>
                  <div class="titleR" v-if="false">
                    查看更多>>
                  </div>
                </div>
                <div class="activity_list" v-if="ActivityList.length !=0">
                  <div class="item" @click="toActivityDetail(x)" v-for="(x,index) in ActivityList">
                    <div class="itemHead">
                      <div class="itemTitle">{{x.activityTitle}}</div>
                    </div>
                    <div class="item_content">
                      <img :src="x.PhotoList[0] | imgUrl" alt="">
                    </div>
                    <div class="itemFoot">
                      <div class="left">活动结束时间：</div>
                      <div class="right">
                        <div class="time" v-if="x.status==1">{{x.endDate}}</div>
                        <div class="oldTime" v-else-if="x.status==2">该活动已失效</div>
                        <div class="oldTime" v-else>该活动已下架</div>
                      </div>
                    </div>
                  </div>
                  <!--<div class="item">
                    <div class="itemHead">
                      <div class="itemTitle">520浪漫优惠活动</div>
                    </div>
                    <div class="item_content">
                      <img src="http://img.cdn.hljcxiaoxiong.com/15746500946631125.jpg" alt="">
                    </div>
                    <div class="itemFoot">
                      <div class="left">活动剩余时间：</div>
                      <div class="right">
                        &lt;!&ndash;<div class="time">01:23:54:15</div>&ndash;&gt;
                        <div class="oldTime" v-if="true">该活动已失效</div>
                      </div>
                    </div>
                  </div>-->
                </div>
                <div class="m_noItem" v-else>
                  暂无活动
                </div>
              </div>
            </div>

          </div>
          <div class="cardListFoot">
            商家已为您服务到底了！
          </div>

        </div>
      </div>


      <!-- <div class="pay" v-show="tabActive == 0 && terminalType == 1" @click="ToPayPage">
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
  import videoView from "@/components/videoView"
  import pic_head from "@/assets/images/pic_head@2x.png"
  import {
    XButton,
    Scroller, LoadMore, Divider,
    Sticky,
    Tab,
    TabItem,
    Swiper,
    SwiperItem
  } from 'vux'

  export default {
    name: 'merchantInfo2',
    components: {
      videoView,
      XButton,
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
        pic_head: pic_head,
        startStyle: {
          'background-position': '0px -18rem' //0.5start = -2.5rem
        },
        UserStartStyle: {
          'background-position': '0px -18rem' //0.5start = -2.5rem
        },
        box1Style: '',
        tabActive: 0,
        grabbleHeight: 0,
        active: 0,
        imgList: [],
        selectList: [],
        useDayList: [
          {id: 1, value: '全部可用'},
          {id: 2, value: '周一至周五'},
          {id: 3, value: '仅周末'},
          {id: 4, value: '节假日不可用'},
        ],//可用日期：1全部可用、2周一至周五、3仅周末、4节假日不可用
        info: '',
        brandId: '',
        agentId: '',
        pageNum: 1,
        pageSize: 10,
        CommontList: [],
        ActivityList: [],
        AgentGoods: [],
        CommontInfo: false,
        onFetching: false,
        noDataShow: false,
        terminalType: '0',
        sticky2Height: '',
        videoData: {
          autoplay: false,//自动播放
          sources: [{
            type:'',
            src:''
          }],//url地址
          poster: "",//封面地址
          videoTitle: ''//视频标题
        },
        userId:''
      }
    },

    created() {
      this.agentId = this.$route.query.agentId
      this.userId = this.$route.query.userId
      if(this.userId == undefined || this.userId == null || this.userId == ""){
        this.$router.push({
          path:'/404'
        })
      }
      this.brandId = this.$route.query.brandId
      this.terminalType = this.$route.query.terminalType
      this.getData()
      this.getCommontInfo()
      this.getAgentGoods()
      this.getItemList()
      this.getUserActivity()
    },
    mounted() {
      // 监听滚动事件
      window.addEventListener('scroll', this.onScroll, false)
      this.sticky2Height = this.$refs.sticky2.offsetHeight || 0
      this.$nextTick(() => {
        this.$refs.sticky.bindSticky()
      })
    },
    destroy() {
      // 必须移除监听器，不然当该vue组件被销毁了，监听器还在就会出错
      window.removeEventListener('scroll', this.onScroll)
    },
    methods: {

      // 滚动监听器
      onScroll() {
        // 获取所有锚点元素
        const navContents = document.querySelectorAll('.m_cardList .m_card')
        // 所有锚点元素的 offsetTop
        const offsetTopArr = []
        navContents.forEach(item => {
          offsetTopArr.push(item.offsetTop - this.sticky2Height)
        })
        // 获取当前文档流的 scrollTop
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        // 定义当前点亮的导航下标
        let navIndex = 0
        for (let n = 0; n < offsetTopArr.length; n++) {
          // 如果 scrollTop 大于等于第n个元素的 offsetTop 则说明 n-1 的内容已经完全不可见
          // 那么此时导航索引就应该是n了
          if (scrollTop >= offsetTopArr[n]) {
            navIndex = n
          }
        }
        this.active = navIndex
      },
      // 跳转到指定索引的元素
      scrollTo(index) {
        // 获取目标的 offsetTop
        // css选择器是从 1 开始计数，我们是从 0 开始，所以要 +1
        const targetOffsetTop = document.querySelector(`.m_cardList .m_card:nth-child(${index + 1})`).offsetTop - this.sticky2Height
        // 获取当前 offsetTop
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        // 定义一次跳 50 个像素，数字越大跳得越快，但是会有掉帧得感觉，步子迈大了会扯到蛋
        const STEP = 35
        // 判断是往下滑还是往上滑
        if (scrollTop > targetOffsetTop) {
          // 往上滑
          smoothUp()
        } else {
          // 往下滑
          smoothDown()
        }

        // 定义往下滑函数
        function smoothDown() {
          // 如果当前 scrollTop 小于 targetOffsetTop 说明视口还没滑到指定位置
          if (scrollTop < targetOffsetTop) {
            // 如果和目标相差距离大于等于 STEP 就跳 STEP
            // 否则直接跳到目标点，目标是为了防止跳过了。
            if (targetOffsetTop - scrollTop >= STEP) {
              scrollTop += STEP
            } else {
              scrollTop = targetOffsetTop
            }
            document.body.scrollTop = scrollTop
            document.documentElement.scrollTop = scrollTop
            // 关于 requestAnimationFrame 可以自己查一下，在这种场景下，相比 setInterval 性价比更高
            requestAnimationFrame(smoothDown)
          }
        }

        // 定义往上滑函数
        function smoothUp() {
          if (scrollTop > targetOffsetTop) {
            if (scrollTop - targetOffsetTop >= STEP) {
              scrollTop -= STEP
            } else {
              scrollTop = targetOffsetTop
            }
            document.body.scrollTop = scrollTop
            document.documentElement.scrollTop = scrollTop
            requestAnimationFrame(smoothUp)
          }
        }
      },

      toActivityDetail(x){
        //活动详情
        this.$router.push({
          path: `/ActivityDetail?agentId=${this.agentId}&brandId=${this.brandId}&id=${x.id}`
        })
      },
      toGoodsDetails(x){
        //商品详情
        this.$router.push({path: `/GoodsDetails/${x.id}?userId=${this.userId}`})
      },
      toMorePrivilege(){
        //更多特权
        this.$router.push({
          path: `/morePrivilege?agentId=${this.agentId}&brandId=${this.brandId}`
        })
      },
      toShopSelectList() {
        //查看更多商品
        this.$router.push({
          path: `/commodityTypeList?id=0&userId=${this.userId}`
        })
      },
      toPackageDetails(x) {
        //套餐详情
        this.$router.push({
          path: `/PackageDetails?agentId=${this.agentId}&brandId=${this.brandId}&userId=${this.userId}&id=${x.id}`
        })
      },
      toMoreVideo() {
        //更多视频
        this.$router.push({
          path: `/videoList?agentId=${this.agentId}&brandId=${this.brandId}`
        })
      },
      toCommentList() {
        //评论列表
        this.$router.push({
          path: `/commentList?agentId=${this.agentId}&brandId=${this.brandId}`
        })
      },
      toDetails() {
        //商户信息
        this.$router.push({
          path: `/BusinessDetails?agentId=${this.agentId}&brandId=${this.brandId}`
        })
      },
      ToPayPage() {
        //付款
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

            this.videoData.videoTitle = res.data.videoTitle
            this.videoData.poster = imgUrl(res.data.videoPic)
            this.videoData.sources[0] = {
              type: '',
              src: imgUrl(res.data.videoPath)
            }


            console.log(this.imgList)
          }
        })
      },
      getUserActivity() {
        let agentId = this.agentId
        this.$axiosApi.getUserActivityList(agentId).then(res => {
          if (res.code == 200) {
            this.ActivityList = res.data.map(v=>{
              v.PhotoList = JSON.parse(v.activityPhoto)
              return v
            })
          } else {
            this.$vux.toast.show({text: res.message})
          }
        })
      },
      getItemList() {

        let itemType = ""
        let name = ""
        let third = 0 //0
        let pageNum = 1
        let pageSize = 6
        this.$axiosApi.itemList(itemType, third, pageNum, pageSize, name).then(res => {
          if (res.code == 200) {
            let time = new Date().getTime() / 100000000
            let shopList = res.data.list.map(v => {
              v.imgUrl = imgUrl(v.photo.split(',')[0])
           /*   let resume = 550
              v.browse = (time + (v.name.length * resume)).toFixed(0)*/
              return v
            })
            this.selectList = shopList
            this.$nextTick(x => {
              let w = this.$refs.box1.offsetWidth + "px" || "100%"
              this.box1Style = "width:" + w
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
      getCommontInfo() {
        //获取商户评论列表
        let orderBy = 4
        let pageNum = 1
        let pageSize = 3
        let time = ''
        this.$axiosApi.getAgentCommont(this.agentId, time, orderBy, pageNum, pageSize).then(res => {
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
      getAgentGoods() {
        let isFirst = 1
        this.$axiosApi.agentGoods(this.agentId, isFirst).then(res => {
          if (res.code == 200) {
            //res.data.item.photo.split(',')
            let time = new Date().getTime() / 10000000000
            this.AgentGoods = res.data.map(v => {
              v.goodsPhotoList = JSON.parse(v.goodsPhoto)
              let resume = 55
              v.buyBumber = (time + (v.goodsTitle.length * resume)).toFixed(0)
              let useDayValue = this.useDayList.find(x => {
                return x.id == v.useDay
              })
              if (useDayValue) {
                v.useDayValue = useDayValue.value
              }
              return v
            })
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
  @themeColor: #F89F04;
  @butActive: #F89F04;

  //商户详情
  .merchantInfoDetails2 {
    min-height: 100vh;
    background-color: #f4f4f4;
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
      padding: 1.875rem;
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
      .sticky_Box{
        height: 6.25rem;
      }
      .vux-fixed{
        border-bottom: 1px solid #EAEAEA;
      }
      .sticky {
        padding: 1.75rem 1.875rem;
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;

        .stickyTab {
          width: 30.625rem;
          padding-top: 2.75rem;
          .vux-tab-container {
            height: auto;
            overflow: inherit;
          }
          .vux-tab {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            height: auto;
            .vux-tab-item {
              font-size: 2rem;
              color: #646464;
              position: relative;
              z-index: 2;
              line-height: 2rem;
              text-align: left;
              flex: 1;
            }
            .vux-tab-selected {
              color: #323232;
              font-weight: bold;
            }
            .vux-tab-ink-bar {
              z-index: 1;
              height: auto !important;
              bottom: -0.75rem;
            }
            .vux-tab-bar-inner {
              width: 4.125rem !important;
              background-color: @themeColor !important;
              height: 0.375rem !important;
              margin: 0;
            }
          }

        }
        .vux-tab-item {
          background: transparent;
        }
      }
      .bannerImg {
        padding: 0 1.875rem;
        background-color: #fff;
        height: 16.25rem;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 100%;
          display: inline-block;
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
          > .businessHoursInfo {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 1.75rem;
            color: #323232;
          }
        }
      }
      .cardList {
        margin-top: 1.25rem;
      }
      .card_title {
        font-size: 2rem;
        font-weight: bold;
        color: #323232;
        padding: 1rem 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .titleR {
          font-size: 1.625rem;
          font-weight: normal;
        }
      }
      .card_title2 {
        font-size: 1.75rem;
      }
      .m_card {
        padding: 0 1.875rem;
        margin-bottom: 1.25rem;
        background-color: #ffffff;
        &:last-of-type {
          margin-bottom: 0;
        }

        .Video {
          .video_content {
            /*height: 22rem;*/
          }
        }
        .PresentationInfo {
          padding: 1.5rem 0;
          font-size: 1.75rem;
          color: #323232;
          border-bottom: 1px solid #eaeaea;

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
      .commentList {
        background-color: #fff;
        .itemC {
          padding: 1.5rem 0 0;
          border-bottom: 1px solid #EAEAEA;

          &:last-of-type {
            /*border: none;*/
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

      .allCommentList {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 1.5rem;
        color: #646464;
        padding: 1.25rem 0;
      }
      .goodsList {
        padding-bottom: 1rem;
        .item_G {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 1.25rem;
          .left {
            margin-right: 1.25rem;
            img {
              width: 7.875rem;
              height: 7.875rem;
              border-radius: 5px;
            }
          }
          .right {
            flex: 1;
            .goodsTitle {
              font-size: 1.875rem;
              color: #323232;
            }
            .right_d2 {
              display: flex;
              align-items: center;
              justify-content: space-between;
              font-size: 1.5rem;
              color: #646464;
              margin-bottom: 0.5rem;
              .d2_right {
                height: 3rem;
                line-height: 3rem;
                padding: 0 1.625rem;
                border-radius: 1.5rem;
                color: #FFFFFF;
                background-color: @themeColor;
                &:active {
                  opacity: 0.9;
                }
              }
            }
            .right_d3 {
              display: flex;
              align-items: center;
              justify-content: space-between;
              font-size: 1.5rem;
              color: #646464;
              .d3_left {
                .amount {
                  font-size: 2rem;
                  color: #F85404;
                  font-weight: bold;
                }
                .oldAmount {
                  text-decoration: line-through;
                }
              }
            }
          }
        }
      }
      .allGoods {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        color: #323232;
        padding: 1.5rem 0;
        .right {
          margin-left: 0.5rem;
          color: #646464;
        }
      }

      .shop_card {
        padding: 0;
        margin-bottom: 2.5rem;
        .card_title {
          padding: 1rem 1.875rem 0;
        }
      }
      .shopList {
        .box1 {
          width: auto;
          white-space: nowrap;
          .box1-list {
            width: auto;
            padding: 1.5rem 1.875rem;
            display: inline-block;
            .box1-item {
              display: inline-block;
              width: 12.75rem;
              height: 19rem;
              box-shadow: 0 0 1rem 0 rgba(209, 209, 209, 0.5);
              margin-right: 1rem;
              flex: 1;
              &:last-of-type {
                margin-right: 0;
              }
              .headImg {
                padding: 1rem;
                img {
                  width: 10.625rem;
                  height: 10.625rem;
                }
              }
              .item_footText {
                padding: 0 0.75rem 1rem;
                font-size: 1.25rem;
                .info {
                  height: 3.5rem;
                  white-space: pre-wrap;
                  display: -webkit-box;
                  -webkit-line-clamp: 2;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  -webkit-box-orient: vertical;
                }
                .number {
                  font-size: 1.375rem;
                  color: #E84646;
                }
              }
            }
          }
        }
      }

      .privilege {
        .itemList {
          padding-top: 1rem;
          .item {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            margin-bottom: 1.25rem;
            &:last-of-type {
              margin-bottom: 0;
            }

            .left {
              margin-right: 1.5rem;
              img {
                width: 7.875rem;
                height: 7.875rem;
              }
            }
            .right {
              flex: 1;
              .item_name {
                font-size: 1.875rem;
                color: #323232;
                font-weight: bold;
              }
              .item_info {
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-size: 1.5rem;
                color: #646464;
                .but {
                  height: 3rem;
                  line-height: 3rem;
                  padding: 0 1.625rem;
                  border-radius: 1.5rem;
                  color: #FFFFFF;
                  background-color: @themeColor;
                  &:active {
                    opacity: 0.9;
                  }
                }
              }
              .amount {
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-size: 1.5rem;
                color: #646464;
                margin-top: 0.5rem;
                .number {
                  font-size: 2rem;
                  color: #F85404;
                  font-weight: bold;
                }
              }
            }
          }
        }
      }

      .activity_card {
        .activity_list {
          .item {
            border-top: 1px solid #EAEAEA;
            .itemHead {
              .itemTitle {
                padding: 1.875rem 0 1rem;
                font-size: 1.875rem;
                color: #323232;
                font-weight: bold;
              }
            }
            .item_content {
              background-color: #fff;
              height: 21.625rem;
              overflow: hidden;
              display: flex;
              align-items: center;
              justify-content: center;
              img {
                width: 100%;
                display: inline-block;
                height: auto;
                border-radius: 1rem;
              }
            }
            .itemFoot {
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 1.5rem 0;
              font-size: 1.5rem;
              color: #646464;
              .time {
                font-size: 2rem;
                color: @themeColor;
              }
            }
          }
        }
      }

      .cardListFoot {
        font-size: 1.25rem;
        color: #8c8c8c;
        text-align: center;
        padding: 1.625rem 0;
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

      .pay {
        width: 100%;
        height: 6.75rem;
        background-color: @themeColor;
        font-size: 2.375rem;
        color: #ffffff;
        position: fixed;
        left: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        &:active {
          background-color: @butActive;
        }
      }
    }
    .m_noItem {
      width: 100%;
      padding: 5rem 0;
      text-align: center;
      font-size: 1.625rem;
      color: #8C8C8C;
      //background-color: #f4f4f4;
    }

  }
</style>
