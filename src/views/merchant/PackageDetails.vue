<!--套餐详情-->
<template>
  <div class="PackageDetails">
    <div class="head">
      <div class="select_head " ref="select_head">
        <scroller :lock-y="true" :scrollbar-x='false' ref="scroller">
          <div class="box1" :style="box1Style">
            <div class="box1-list" ref="box1">
              <div class="box1-item box1-itemTab" :class="index == selectValue?'active':''" v-for="(i,index) in AgentGoods"
                   :key="index"
                   @click="selectData(i,index)">
                <div class="s_item_top">{{i.goodsTitle}}</div>
              </div>
            </div>
          </div>
        </scroller>
      </div>
    </div>
    <div class="P_content">
      <div class="shopName"><img src="@/assets/merchant/icon_shop.png" alt="">{{agentGoodsDetail.shopName}}</div>
      <div class="packageName">{{agentGoodsDetail.goodsTitle}}</div>
      <div class="imgList">
        <scroller :lock-y="true" :scrollbar-x='false' ref="scroller2">
          <div class="box1" :style="box2Style">
            <div class="box1-list" ref="box2">
              <div class="box1-item" v-for="(i,index) in agentGoodsDetail.goodsPhotoList"
                   :key="index">
                <img :src="i | imgUrl" alt="">
              </div>
            </div>
          </div>
        </scroller>
      </div>

      <div class="PackageDetailsPre">
        <pre>{{agentGoodsDetail.goodsIntroduce}}</pre>
      </div>

      <div class="useRules">
        <div class="title">购买须知</div>
        <div class="marginB">有效期:</div>
        <div class="marginB">{{agentGoodsDetail.startDate}}至{{agentGoodsDetail.endDate}}</div>
        <div class="marginB">使用规则</div>
        <pre>{{agentGoodsDetail.useRules}}</pre>
      </div>

    </div>

    <div class="p_foot">
      <div class="left">
        <span class="realAmount">¥{{agentGoodsDetail.realAmount}}</span>
        <span class="showAmount">¥{{agentGoodsDetail.showAmount}}</span>
      </div>
      <div class="right" @click="submit">
        <div class="but">立即抢购</div>
      </div>
    </div>
  </div>

</template>

<script>
  import {Tab, TabItem, Scroller, Sticky} from 'vux'

  export default {
    name: 'PackageDetails',
    components: {
      Tab,
      TabItem,
      Scroller,
      Sticky
    },
    data() {
      return {
        tabActive: 0,
        agentId: '',
        goodsId: 2,
        box1Style: '',
        box2Style: '',
        selectValue: 0,
        selectList: [],
        AgentGoods: [],
        agentGoodsDetail: {},
        userId:''
      }
    },
    created() {

      this.agentId = this.$route.query.agentId
      this.userId = this.$route.query.userId

      this.getAgentGoods()
    },
    methods: {
      submit(){
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
      },
      getAgentGoods() {
        let isFirst = 2
        this.$axiosApi.agentGoods(this.agentId, isFirst).then(res => {
          if (res.code == 200) {
            //res.data.item.photo.split(',')
            let time = new Date().getTime() / 10000000000
            this.AgentGoods = res.data.map(v => {
              v.goodsPhotoList = JSON.parse(v.goodsPhoto)
              let resume = 55
              v.buyBumber = (time + (v.goodsTitle.length * resume)).toFixed(0)
              return v
            })

            let id = this.$route.query.id
            if(id != 'undefined') {
              this.selectValue = this.AgentGoods.findIndex(v=>{
                return v.id == id
              })
            }


            this.getData()
          }
        })
      },
      selectData(i, index) {
        if (this.selectValue != index) {
          this.selectValue = index
          this.getData()
        }
      },
      getData() {

        let goodsId = this.AgentGoods[this.selectValue].id
        this.$axiosApi.agentGoodsDetail(goodsId).then(res => {
          if (res.code == 200) {
            this.agentGoodsDetail = res.data
            this.agentGoodsDetail.goodsPhotoList = JSON.parse(res.data.goodsPhoto)
            console.log(this.agentGoodsDetail)

           // let id = this.$route.query.id

            this.$nextTick(x => {
              let w = this.$refs.box1.offsetWidth + "px" || "100%"
              this.box1Style = "width:" + w
              let w2 = this.$refs.box2.offsetWidth + "px" || "100%"
              this.box2Style = "width:" + w2
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
  .PackageDetails {
    padding-bottom: 6.625rem;
    .box1 {
      width: auto;
      white-space: nowrap;
      .box1-list {
        width: auto;
        padding: 0 1.875rem;
        display: inline-block;
        .box1-item.box1-itemTab{
          margin-right: 2.5rem;
          &:last-of-type{
            margin-right: 0;
          }
        }
        .box1-item {
          padding: 1rem 0;
          display: inline-block;
          width: auto;
          font-size: 1.75rem;
          font-weight: bold;
          color: #3a3a3a;
          max-width: 15rem;
          margin-right: 1rem;
          flex: 1;
          .s_item_top {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          &:last-of-type {
            margin-right: 0;
          }
          &.active {
            color: @themeColor;
            border-bottom: 0.25rem solid @themeColor;
          }
        }
      }
    }
    .head {
      .select_head {
        border-bottom: 1px solid #EAEAEA;
      }
    }
    .P_content {
      padding: 0 1.875rem;
      margin-top: 1.5rem;
      .shopName {
        font-size: 1.5rem;
        color: #3a3a3a;
        img {
          width: 2.185rem;
          height: 2.185rem;
          margin-right: 0.625rem;
        }
      }
      .packageName {
        font-size: 2rem;
        color: #3a3a3a;
        font-weight: bold;
        margin-top: 1rem;
      }
      .imgList {
        margin-top: 2rem;
        .box1-list {
          padding: 0;
          .box1-item {
            margin-right: 1.25rem;
            padding: 0;
            img {
              width: 16.375rem;
              height: 11.875rem;
              border-radius: 1rem;
            }
          }
        }

      }
      .PackageDetailsPre {
        padding: 1.5rem 0;
        font-size: 1.75rem;
        color: #3a3a3a;
      }
      .useRules {
        padding-bottom: 1.875rem;
        font-size: 1.75rem;
        color: #3a3a3a;
        .title {
          font-size: 2rem;
          color: #3A3A3A;
          font-weight: bold;
          padding-bottom: 1.875rem;
        }
        .marginB{
          margin-bottom: 1.875rem;
        }
      }
    }
    .p_foot {
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: fixed;
      left: 0;
      bottom: 0;
      background-color: #fff;
      width: calc(100% - 3.75rem);
      padding: 0 1.875rem;
      height: 6.625rem;
      border-top: 1px solid #EAEAEA;
      .left {
        font-size: 1.5rem;
        color: #646464;
        flex: 1;
        .realAmount {
          font-size: 2.375rem;
          font-weight: bold;
          color: #F85404;
          margin-right: 1rem;
        }
        .showAmount{
          text-decoration: line-through;
        }
      }
      .right {
        .but {
          font-size: 2rem;
          height: 3.875rem;
          line-height: 3.875rem;
          padding: 0 1.625rem;
          border-radius: 2rem;
          color: #FFFFFF;
          background-color: @themeColor;
          &:active {
            opacity: 0.9;
          }
        }
      }
    }
  }
</style>
