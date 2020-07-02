<!--商户信息-->
<template>
  <div class="merchantInfoDetails2">

    <div class="headTitle">
      <div class="h_title">{{agentInfo.shopName}}   <span class="type">{{agentInfo.tradeType | tradeType}}</span> </div>
      <div class="evaluate">
        <span class="start" :style="startStyle"></span>
        <span>4.5分</span>
      </div>
    </div>

    <div class="businessAddress marginTop editItem">
      <div class="editContent">
        <div class="editTitle">
          营业地址
        </div>
        <div class="editCenter">
          {{agentInfo.businessAddress}}
        </div>
      </div>
    </div>

    <div class=" marginTop editItem">
      <div class="editContent">
        <div class="editTitle">
          营业时间
        </div>
        <div class="editCenter">
          {{agentInfo.openTime}}
        </div>
      </div>
    </div>

    <div class=" marginTop editItem">
      <div class="editContent">
        <div class="editTitle">
          商家类型
        </div>
        <div class="editCenter">
          {{agentInfo.tradeType | tradeType}}
        </div>
      </div>
    </div>

    <div class=" marginTop editItem">
      <div class="editContent">
        <div class="editTitle">
          商家介绍
        </div>
        <div class="editCenter">
          {{agentInfo.selfIntroduce}}
        </div>
      </div>
    </div>

    <div class=" marginTop editItem">
      <div class="editContent">
        <div class="editTitle">
          经营范围
        </div>
        <div class="editCenter">
          <pre>{{agentInfo.key1}}</pre>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
  import {imgUrl, formatMoney} from "@/filters"
  import trade_type_list from "@/json/trade_type"

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
    name: 'BusinessDetails',
    components: {
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
        agentInfo:'',
        agentId: '',
        startStyle: {
          'background-position': '0px -18rem' //0.5start = -2.5rem
        },
        tradeTypeList:trade_type_list,
      }
    },
    created() {
      this.agentId = this.$route.query.agentId
      this.brandId = this.$route.query.brandId
      this.getData()
    },
    methods: {
      getData() {
        let agentId = this.agentId

        this.$axiosApi.agentIntroduce(agentId).then(res=>{
          if(res.code == 200){
            this.agentInfo = res.data
            this.openTime = res.data.openTime
            this.selfIntroduce = res.data.selfIntroduce
            this.key1 = res.data.key1
            this.ratio = res.data.discount
            if(this.ratio == 0){
              this.selectActive = 'none'
            }else {
              this.selectActive = this.selectList.findIndex((v)=>{
                return v.value == this.ratio
              })
            }

          }else {
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
    },
    filters: {
      tradeType(value) {
        const item = trade_type_list.find(x => {
          return x.id == value
        })
        if(item){
          return item.name
        }else {
          return value
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
    .marginTop {
      margin-top: 1.25rem;
    }
    .triangle {
      margin-left: 1rem;
      width: 0px;
      height: 0px;
      border-top: 1rem solid #323232;
      border-left: 1rem solid transparent;
      border-right: 1rem solid transparent;
    }
    .editItem {
      background-color: #fff;
      padding: 0 1.875rem;
      .editContent {
        .editTitle {
          padding: 1.75rem 0 1.25rem;
          font-size: 2rem;
          color: #323232;
          font-weight: bold;
          border-bottom: 1px solid #EAEAEA;
        }
        .editCenter {
          font-size: 1.75rem;
          padding: 1.5rem 0 2rem;
          .inputItem {

            height: 5.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 0.5rem;

            &.textareaItem {
              height: auto;
            }
            .weui-textarea {
              background: inherit;
            }
            .weui-cells {
              margin-top: 0;
              font-size: 1.75rem;
            }
          }
          .selectInp {
            padding: 0 1.875rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
        }
      }
    }
  }
</style>
