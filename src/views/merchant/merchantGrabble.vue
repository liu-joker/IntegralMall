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
              <!--<div class="item" @click="showSelectList">-->
              <div class="item">
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

              <div class="item2" v-for="(x,index) in shopList" @click="toAgentDetail(x)">
                <img :src="x.shopFrontPhoto | imgUrl" class="merchantLogo" alt="">
                <div class="item_content">
                  <div class="item_title">{{x.shopName}}</div>
                  <div class="startInfo">
                    <div class="left">
                      <span class="start" :style="startStyle"></span>
                      <span>4.5分</span>
                      <!--<span class="consumptionPerPerson">¥330/人</span>-->
                    </div>
                    <div class="right">
                      {{x.distance | plottingScale}}km
                    </div>
                  </div>
                  <div class="addressInfo">
                    <div class="left">
                      <span>{{x.city}}  {{x.district}}</span>
                      <span class="proportion">U米返还{{x.discount}}%</span>
                    </div>
                    <div class="right">
                      <!--<span class="salesVolume">月销量 359</span>-->
                    </div>
                  </div>
                  <div class="merchantInfo" v-if="x.selfIntroduce && x.selfIntroduce.trim() != ''">{{x.selfIntroduce}}</div>
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
        <div class="item" v-for="x in search" @click="searchContent(x)" v-if="x">{{x}}</div>
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
        tradeType:'',
        info: {},
        brandId:'59c7a6325bb44368a6102cb189504b05'

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
      toAgentDetail(x){
        //https://www.hlxiaoxiong.com/IntegralMall/#/merchantInfo?agentId=1&brandId=deb99c1be8a748a59f760485fd49df15
        this.$router.push({
          path:`/merchantInfo?agentId=${x.agentId}&brandId=${this.brandId}&terminalType=1`
        })
      },
      selectData(x) {
        //附近
        this.kmActive = x.km
        this.showScrollBox = false
        this.getData()
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
        console.log('getData')
        let shopName = this.name.trim()
        if (shopName == '') return
        let brandId = this.brandId;
        let lng = 114.03167;
        let lat = 22.532151;
        let distance ;  //=this.kmActive//距离
        let pageNum = this.pageNum;
        let pageSize = this.pageSize;
        let tradeType;  //商户类型

        this.$axiosApi.getNearAgent(brandId, lng, lat, distance, pageNum, pageSize,shopName,tradeType).then(res=>{
          this.info = res.data
          this.shopList = res.data.list
          this.GrabbleShow = false

          this.search = [...new Set([shopName].concat(this.search))]
          this.$Cookie.setMGHistory(this.search)
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



</style>
