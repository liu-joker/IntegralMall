<template>

  <div class="Index">

    <div class="I_head">
      <div class="left">我的U米：<span>{{$store.getters.userInfo.coin}}</span></div>
      <div class="right" @click="toMy">
        <img :src="icon_my" alt="" class="icon_my">
      </div>
    </div>

    <div class="I_banner">
      <swiper auto dots-position="center" loop style="width: 100%;margin:0 auto;" :aspect-ratio="40.63/46.88" :interval=5000>
        <swiper-item class="swiper-demo-img" v-for="(x, index) in bannerList" :key="index">
          <img :src="x.photo | imgUrl" alt="">
        </swiper-item>
      </swiper>
    </div>

    <div class="I_select">
      <div class="list">
        <div class="item" v-for="(x,index) in selectList" :key="index">
          <div class="name">{{x.typeName}}</div>
          <img :src="x.imgUrl" alt="">
        </div>
      </div>
    </div>


    <div class="I_shopList">
      <div class="list">
        <div class="item" v-for="(x,index) in shopList" :key="index" @click="GoodsDetails(x)">
          <img :src="x.imgUrl | imgUrl" alt="" class="itemImg">
          <div class="item_info">
            <div class="name">{{x.name}}</div>
            <div class="S_info">{{x.resume}}</div>
            <div class="item_foot">
              <div class="left">
                <img :src="icon_browse" alt="" class="eye">
                {{x.browse}}次浏览
              </div>
              <div class="right">
                <div class="but">详情</div>
              </div>
            </div>
          </div>
        </div>
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
  import {Swiper,SwiperItem} from 'vux'

  export default {
    name: 'index',
    components: {
      Swiper,
      SwiperItem
    },
    data() {
      return {
        icon_my: icon_my,
        banner1: banner1,
        icon_browse: icon_browse,
        bannerList: {},
        selectList:[
          {id:0,name:'家居',imgUrl:pic_sort1},
          {id:1,name:'电器',imgUrl:pic_sort2},
          {id:2,name:'热门',imgUrl:pic_sort3},
          {id:3,name:'推荐',imgUrl:pic_sort4},
          {id:4,name:'爆款',imgUrl:pic_sort5},
        ],
        shopList:[
          {id:0,imgUrl:"",name:'欧式多功能座椅',info:'进口原木支撑椅脚，坚硬耐用，可水洗坐垫，方便拆洗。',browse:132358},
          {id:1,imgUrl:"",name:'九阳豆浆机',info:'进口原木支撑椅脚，坚硬耐用，可水洗坐垫，方便拆洗。',browse:132358},
          {id:2,imgUrl:"",name:'九阳豆浆机',info:'进口原木支撑椅脚，坚硬耐用，可水洗坐垫，方便拆洗。',browse:132358},
          {id:3,imgUrl:"",name:'九阳豆浆机',info:'进口原木支撑椅脚，坚硬耐用，可水洗坐垫，方便拆洗。',browse:132358},
          {id:4,imgUrl:"",name:'九阳豆浆机',info:'进口原木支撑椅脚，坚硬耐用，可水洗坐垫，方便拆洗。',browse:132358},
        ]
      }
    },
     created() {
      this.getData()
      this.getBannerList()
    },
    methods: {
      GoodsDetails(x){
        console.log(x)
        this.$router.push({path:'/GoodsDetails/'+x.id})
      },
      getData(){
        this.$axiosApi.itemList().then(res=>{
          if(res.code==200){
            //
            this.shopList = res.data.map(v=>{
              v.imgUrl = v.photo.split(',')[0]
              v.browse = 132358
              return v
            })
          }
        })

      },

      getBannerList(){
        this.$axiosApi.itemAdvert().then(res=>{
          if(res.code == 200){
            this.bannerList = res.data.shopAdvert
            this.selectList = this.selectList.map((v,index)=>{
              v.typeName = res.data.shopType[index].typeName
              v.typeOrder = res.data.shopType[index].typeOrder
              return v
            })
          }
        })

      },
      toMy(){
        this.$router.push({path:'/my'})
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less">

  .Index {
    background-color: #f4f4f4;
    .I_head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: rgba(15, 15, 18, 0.7);
      padding: 1.25rem 1.35rem;
      color: #ffffff;
      font-size: 1.875rem;
      font-family: PingFangSCRegular;
      position: fixed;
      top: 0;
      left: 0;
      width: calc(100% - 2.7rem);
      z-index: 2;
      .right {
        .icon_my {
          width: 3rem;
          height: 3rem;
        }
      }
    }

    .I_select{
      background-color: #ffffff;
      padding: 1.25rem;
      .list{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .item{
          margin-right: 0.625rem;
          width: 8.375rem;
          height: 8.375rem;
          position: relative;
          >img{
            width: 8.375rem;
            height: 8.375rem;
          }
          .name{
            position: absolute;
            background:rgba(15,15,18,0.6);
            width: 100%;
            height: 100%;
            color: #ffffff;
            font-size:1.88rem;
            font-family:PingFang SC;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          &:last-child{
            margin-right: 0;
          }
        }
      }

    }

    .I_shopList{
      .list{
        padding: 1.25rem;
        .item{
          width: 100%;
          font-family:PingFang SC;
          background-color: #ffffff;
          border-radius: 1rem;
          margin-bottom: 1.25rem;
          .itemImg{
            width: 100%;
            height: 20rem;
          }
          .item_info{
            padding: 1.875rem;
            .name{
              font-size: 1.875rem;
              color: #000000;
              margin-bottom: 1rem;
            }
            .S_info{
              font-size: 1.5rem;
              color: #646464;
            }
            .item_foot{
              margin-top: 3rem;
              display: flex;
              align-items: center;
              justify-content: space-between;
              .left{
                display: flex;
                align-items: center;
                justify-content: flex-start;
                color: #8C8C8C;
                font-size: 1.5rem;
                .eye{
                  width: 1.75rem;
                  height: 1.75rem;
                  margin-right: 0.5rem;
                }
              }
              .right{
                .but{
                  padding: 0.5rem 1.625rem;
                  background-color: #2D2922;
                  color: #fefefe;
                  font-size: 1.5rem;
                  border-radius: 2px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                }
              }
            }
          }

        }
      }
    }
  }

</style>
