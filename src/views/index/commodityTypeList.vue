<!--商城分类-->
<template>

  <div class="commodityTypeList">

    <div class="select_head">
      <scroller :lock-y="true" :scrollbar-x='false'>
        <div class="box1" :style="box1Style">
          <div class="box1-list" ref="box1">
            <div class="box1-item" :class="selectValue == 'all'?'active':''" @click="selectData('all')" v-if="selectList.length != 0">
              全部
            </div>
            <div class="box1-item" :class="i.id == selectValue?'active':''" v-for="(i,index) in selectList" :key="index"
                 @click="selectData(i)">{{i.typeName}}
            </div>
          </div>
        </div>
      </scroller>
    </div>

    <div class="commodity_content">
      <scroller lock-x @on-scroll-bottom="onScrollBottom" ref="scrollerBottom2" :scroll-bottom-offst="300"
                v-if="!noDataShow">

        <div class="list">
          <div class="item fadeIn animated" v-for="(x,index) in shopList" :key="index" @click="GoodsDetails(x)">
            <div class="img">
              <img :src="x.imgUrl | imgUrl" alt="">
            </div>
            <div class="text">
              <div class="name">{{x.name}}</div>
              <div class="foot">
                <!--<div class="left">2000U米</div>-->
                <div class="right">
                  <img :src="icon_browse" alt="" class="eye">
                  {{x.browse}}次浏览
                </div>
              </div>
            </div>
          </div>
          <load-more tip="正在加载..." class="loadingMore" v-if="onFetching"></load-more>
          <divider v-if="pageSize > info.total && shopList.length>0">到底了</divider>
        </div>
      </scroller>
      <div class="noItem">
        <div class="noData" v-if="shopList.length == 0">暂无商品</div>
      </div>
    </div>
    <!--<div @click="cli">点击</div>-->


  </div>

</template>

<script>
  import {Scroller, LoadMore, Divider} from 'vux'
  import {imgUrl} from "@/filters";
  import icon_browse from "@/assets/images/icon_browse.png"
  import pic_sort2 from "@/assets/images/pic_sort2.png"

  export default {
    name: 'commodityTypeList',
    components: {
      Scroller,
      LoadMore,
      Divider,
    },
    data() {
      return {
        icon_browse: icon_browse,
        pic_sort2: pic_sort2,
        selectList: [],
        shopList: [],
        box1Style: '',
        selectValue: '',
        pageNum: 1,
        pageSize: 10,
        info: '',
        onFetching: false,
        noDataShow: false,
        firstGet:true
      }
    },
    computed: {},

    activated(){
      this.selectValue = this.selectValue == ""?this.$store.getters.selectItem:this.selectValue
      this.getBannerList()
      this.getData()
      console.log(this.$store.getters.selectItem,'111')
    },
    deactivated(){
      this.selectValue = ""
    },

    methods: {
      GoodsDetails(x) {
        this.$router.push({path: '/GoodsDetails/' + x.id})
      },
      onScrollBottom() {
        if (this.onFetching) {
        } else {
          this.onFetching = true;
          if (this.pageSize > this.info.total) return this.onFetching = false;
          this.pageSize += 10;
          this.getData('onScrollBottom')

        }
      },
      selectData(i) {
        this.firstGet=true
        this.pageSize = 10

        if(i != 'all'){
          this.selectValue = i.id
        }else {
          this.selectValue = 'all'
        }
        this.$store.dispatch('SetSelectItem',this.selectValue)

        this.getData()
      },
      getData(type) {

        let itemType = this.selectValue == 'all'?'':this.selectValue
        let third = ""
        let pageNum = this.pageNum
        let pageSize = this.pageSize
        if(type != 'onScrollBottom'){
          this.$vux.loading.show({
            text: '请稍候...'
          })
        }

        this.$axiosApi.itemList(itemType, third, pageNum, pageSize).then(res => {
          this.$vux.loading.hide()
          if (res.code == 200) {

            let time = new Date().getTime() / 100000000
            this.shopList = res.data.list.map(v => {
              v.imgUrl = v.photo.split(',')[0]
              v.browse = (time + (v.name.length * 555)).toFixed(0)
              return v
            })
            if (this.shopList.length == 0) {
              this.noDataShow = true
            } else {
              this.noDataShow = false

              this.info = res.data
              this.onFetching = false
              this.$nextTick(() => {
                try {
                  if(this.firstGet) this.$refs.scrollerBottom2.reset({top: 0})
                } catch (error) {

                }
                this.firstGet = false
              })
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
      getBannerList() {

        this.$vux.loading.show({
          text: '加载中...'
        })
        this.$axiosApi.itemAdvert().then(res => {
          if (res.code == 200) {
            this.selectList = res.data.shopType
            this.$nextTick(x => {
              let w = this.$refs.box1.offsetWidth + "px" || "100%"
              this.box1Style = "width:" + w
              console.log(this.box1Style)
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
    }
  }
</script>

<style rel="stylesheet/less" lang="less">

  .commodityTypeList {
    min-height: 100vh;
    background-color: #f4f4f4;
    position: relative;
    .vux-divider {
      width: 100%;
    }
    .select_head {
      background-color: #ffffff;
      border-top: 1px solid #f4f4f4;
      height: 5.125rem;
      position: fixed;
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
          min-width: 4rem;
          font-size: 1.75rem;
          color: #646464;
          padding: 1.25rem 1rem;
          &.active {
            font-size: 2rem;
            color: #323232;
            font-weight: bold;
          }
        }
      }
    }

    .commodity_content {
      .list {
        padding: 6.375rem 1.875rem 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        .item:nth-child(2n) {
          margin-right: 0;
        }
        .item {
          width: calc((100% - (1.25rem)) / 2);
          background-color: #fff;
          margin-bottom: 1rem;
          margin-right: 1rem;
          .img {
            width: 100%;
            height: 18.25rem;
            position: relative;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            background-size:cover;
            background-position: center;
            > img {
              position: absolute;
              width: 100%;
              height: auto;
            }
          }
          .text {
            padding: 1rem 0.5rem;
            .name {
              font-size: 1.25rem;
           /*   word-break: break-all;
              display: -webkit-box; !**对象作为伸缩盒子模型展示**!
              -webkit-box-orient: vertical; !**设置或检索伸缩盒子对象的子元素的排列方式**!
              -webkit-line-clamp: 2; !**显示的行数**!
              overflow: hidden;
              height: 3.25rem;*/
            }
            .foot {
              display: flex;
              align-items: center;
              justify-content: space-between;
              font-size: 1.25rem;
              margin-top: 2.75rem;
              .left {
                color: #E84646;
              }
              .right {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                color: #8C8C8C;
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
      .noItem{
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
