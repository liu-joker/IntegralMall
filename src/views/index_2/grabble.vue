<template>

  <div class="GrabbleIndex">
    <div class="header">
      <div class="grabble" ref="grabble">
        <div class="left">
          <x-input placeholder="搜索" class="grabble_inp" type="text" :max="20" ref="grabble_inp" @on-enter="getData"
                   @on-focus="GrabbleShow = true" v-model="name">
            <svg-icon slot="label" class="form_icon" icon-class="grabble"></svg-icon>
          </x-input>
        </div>
        <div class="right">
          <span class="grabble_but" @click="butGetData">搜索</span>
        </div>
      </div>
    </div>

    <div class="shopContent" ref="shopContent" v-if="!GrabbleShow">

      <div class="commodity_content fadeIn animated">
        <div class="list">
          <waterfall :col='waterfallData.col' :width="itemWidth" :gutterWidth="gutterWidth" :data="shopList"
                     @loadmore="loadmore">
            <template>
              <div class="item fadeIn animated" v-for="(x,index) in shopList" :key="index" @click="GoodsDetails(x)">
                <div class="img">
                  <img v-lazy="x.imgUrl" alt="">
                </div>
                <div class="text">
                  <div class="name">{{x.name}}</div>
                  <div class="foot">
                    <div class="left">{{x.coin}}</div>
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
        <div v-if="showShop" class="noItem">暂无该类商品</div>
        <divider class="period" v-if="!showShop">没有更多了~</divider>
      </div>
    </div>

    <div class="searchRecord" v-show="GrabbleShow">

      <div class="searchTop">
        <div class="left">搜索记录</div>
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
  import {XInput, Divider} from 'vux'
  import BackToTop from "@/components/BackToTop"

  export default {
    name: 'grabble',
    components: {
      XInput,
      Divider,
      BackToTop,
    },
    data() {
      return {
        icon_my: icon_my,
        icon_browse: icon_browse,
        icon_cancel: icon_cancel,
        delect: delect,
        GrabbleShow: true,
        waterfallData: {
          col: 2,
          width: 0,
          gutterWidth: 0
        },
        shopList: [],
        search: [],
        pageNum: 1,
        pageSize: 20,
        third: '',
        itemType: '',
        name: '',
        userId: '',
        environment: '',
        brandId: '',
        timer: null,
      }
    },
    computed: {
      itemWidth: function () {
        return 0.445 * document.documentElement.clientWidth
      },
      gutterWidth: function () {
        return 0.024 * document.documentElement.clientWidth
      },
      showShop:function () {
        if(this.shopList.length!=0){
          return false
        }else {
          return true
        }
      }
    },
    created() {
      this.userId = this.$route.query.userId
      this.environment = this.$route.query.environment
      this.brandId = this.$route.query.brandId
      if (this.$Cookie.getSearchRecord()) {
        this.search = eval(this.$Cookie.getSearchRecord())
      }
      this.getData()

    },
    mounted() {
      this.$refs.grabble_inp.focus()
    },
    methods: {
      butGetData(){
        clearInterval(this.timer);
        this.timer = null;
        this.timer = setTimeout(() => {
          this.getData()
        }, 300)
      },
      GoodsDetails(x) {
        this.$router.push({path: `/GoodsDetails/${x.id}?userId=${this.userId}&brandId=${this.brandId}&environment=${this.environment}`})
      },
      delectSearch() {
        this.$Cookie.removeSearchRecord()
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
            this.$Cookie.setSearchRecord(this.search)
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



</style>
