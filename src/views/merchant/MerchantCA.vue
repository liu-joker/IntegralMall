<template>

  <div class="MerchantCA">
    <div class="headTitle">
      <img src="@/assets/images/pic_sjxc.png" alt="logo" class="title_logo">
      <div class="h_title">天安数码城多媒体工作室（原天安集美题 斜互联媒体工作室</div>
    </div>

    <div class="performanceData">
      <div class="top_data">
        <div class="item">
          <span class="number">¥3652.32</span>
          <span>今日收入</span>
        </div>
        <div class="item">
          <span class="number">32</span>
          <span>今日订单</span>
        </div>
        <div class="item">
          <span class="number">¥3652.32</span>
          <span>本月收入</span>
        </div>
      </div>
      <div class="bottom_but">
        <div class="item">
          <img src="@/assets/merchant/icon_sjzx.png" alt="">
          <span>营业收入</span>
        </div>
        <div class="item">
          <img src="@/assets/merchant/icon_sytx.png" alt="">
          <span>收益提现</span>
        </div>
      </div>
    </div>

    <div class="eCharts">
        <e-charts-bar></e-charts-bar>
    </div>

    <div class="cellList">
      <group>
        <cell :title="x.title" :value="x.value" @click.native="onClick(x)" v-for="(x,index) in cellList" :key="index"
              :is-link="x.type=='url'" class="cellItem" ></cell>
      </group>
    </div>

    <div>
      <x-dialog v-model="showToast" class="dialog-CA"  :dialog-style="{'max-width': '80%'}">
        <div class="dialogContent">
          <div class="content1" v-show="showContent">
            <div class="d_head">离开店只差一步啦~</div>
            <p class="label_title">订单获取U米比例设置：</p>
            <div class="select_but"  @click="showContent = false">
              <div class="left" v-if="selectActive == 'none'">不返还U米</div>
              <div class="left" v-else>返还金额{{selectList[selectActive].value1}}%的U米={{selectList[selectActive].value2}}折</div>
              <div class="right"><img src="@/assets/merchant/icon_down.png" alt=""></div>
            </div>
            <div class="d_tip">
              <p>提示：</p>
              <p>1、例如商家收款100元，返还设置比例100%
                （7折），则订单营销服务费30元，商家实际
                到账70元，用户获得100U米。</p>
              <p>2、返还U米比例可随时在商家中心修改。</p>
            </div>
          </div>
          <div class="content2" v-show="!showContent">
            <div class="content2_head">
              <div class="left" @click="showContent = true"><svg-icon class="form_icon" icon-class="left"></svg-icon></div>
              <span>U米比例设置</span>
            </div>
            <div class="list">
              <div class="item" v-for="(x,index) in selectList" :key="index" @click="selectFun(index)">
                <div class="left leftBG">{{x.value2}}折</div>
                <div class="text">返还金额{{x.value1}}%的U米={{x.value2}}折</div>
                <div class="active" v-show="selectActive == index"><img src="@/assets/merchant/icon_select.png" alt=""></div>
              </div>
              <div class="item" @click="selectFun('none')">
                <div class="left"></div>
                <div class="text">不返回U米</div>
                <div class="active" v-show="selectActive == 'none'"><img src="@/assets/merchant/icon_select.png" alt=""></div>
              </div>
            </div>
          </div>
          <div class="d_foot_but" v-if="showContent" @click="subCoin">
            确 定
          </div>
        </div>
      </x-dialog>
    </div>

  </div>

</template>

<script>

  import eChartsBar from "@/components/eChartsBar"
  import {Group, Cell,XDialog } from 'vux'

  export default {
    name: 'MerchantCA',
    components:{
      eChartsBar,
      Group,
      Cell,
      XDialog
    },
    data() {
      return {
        cellList: [{
          title: '商家信息',
          type: 'url',
          url: "/ShippingAddress",
          value: '',
          funType: 'url'
        }, {
          title: '收款码',
          type: 'url',
          url: "/MyUmi",
          value: '',
          funType: 'url'
        }, {
          title: '营销管理',
          type: 'url',
          url: "/updatePayPwd",
          value: '',
          funType: 'url'
        }, {
          title: '相册管理',
          type: 'url',
          url: "/ShippingAddress",
          value: '',
          funType: 'AppUrl'
        }, {
          title: '帮助中心',
          type: 'url',
          url: "/HelpCenter",
          value: '',
          funType: 'url'
        }, {
          title: '分享店铺',
          type: 'url',
          url: "/HelpCenter",
          value: '',
          funType: 'url'
        }],
        showToast:true,
        showContent:true,
        selectList:[
          {value1:'100',value2:'7'},
          {value1:'90',value2:'7.3'},
          {value1:'80',value2:'7.6'},
          {value1:'70',value2:'7.9'},
          {value1:'60',value2:'8.2'},
          {value1:'50',value2:'8.5'},
          {value1:'40',value2:'8.8'},
          {value1:'30',value2:'9.1'},
          {value1:'20',value2:'9.4'},
          {value1:'10',value2:'9.7'},
        ],
        selectActive:0
      }
    },
    created() {

    },
    methods: {
      subCoin(){
        this.showToast = false
      },
      selectFun(x){
        this.selectActive = x
      },
      onClick(x) {

        return
        if (x.funType == 'url') {
          console.log(x)
          this.$router.push({
            path: x.url
          })
        } else if (x.funType == 'AppUrl') {

          if (this.$EnvironmentAI() == 1) {
            window.app.contactService()
          } else if (this.$EnvironmentAI() == 2) {
            try {
              window.app.contactService()
            }catch (err){
              window.webkit.messageHandlers.contactService.postMessage({})
            }
          }


        }
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less">

  .MerchantCA {
    background-color: #EAEAEA;
    min-height: 100vh;
    .headTitle {
      padding: 1.875rem 1.875rem 3rem;
      background-color: #fff;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      margin-bottom: 1px;
      .title_logo {
        margin-right: 1.875rem;
        border-radius: 5px;
        width: 6.25rem;
        height: 6.25rem;
      }
      .h_title {
        flex: 1;
        color: #323232;
        font-size: 1.875rem;
        line-height: 3.5rem;
        margin-top:-0.75rem;
      }
    }
    .performanceData{
      background-color: #fff;
      padding: 1.875rem 0 2.125rem;
      margin-bottom: 1.25rem;
      .top_data{
        display: flex;
        align-content: flex-start;
        justify-content: space-around;
        margin-bottom: 3rem;
        .item{
          color: #646464;
          font-size: 1.5rem;
          display: flex;
          align-items: center;
          flex-direction: column;
          .number{
            font-size: 2.15rem;
            color: #F35E53;
            margin-bottom: 1.25rem;
            font-weight: bold;
          }
        }
      }
      .bottom_but{
        display: flex;
        align-items: center;
        justify-content: center;
        .item{
          color: #323232;
          font-size: 2rem;
          line-height: 3.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 1;
          &:active{
            opacity: 0.8;
          }
          &:first-child{
            border-right: 1px solid #EAEAEA;
          }
          img{
            width: 2.75rem;
            height: 2.75rem;
            margin-right: 1.375rem;
            vertical-align: middle;
          }
        }
      }
    }
    .eCharts{
      width: 100%;
      height: 25.875rem;
      background-color: #fff;
    }
    .cellList {
      background-color: #fff;
      margin-top: 0.625rem;
      .weui-cells {
        margin-top: 0;
      }
      .cellItem {
        font-size: 2rem;
        padding: 2rem 1.5rem 2rem 2rem;
      }
    }

    .dialog-CA{
      width: 20rem;
      .dialogContent{
        text-align: left;
        .content1{
          padding: 0 1.875rem;
          .d_head{
            text-align: center;
            font-size: 2.375rem;
            color: #323232;
            font-weight: bold;
            padding: 2.5rem 0;
          }
          .label_title{
            padding: 1.875rem 0;
            font-size: 1.75rem;
          }
          .select_but{
            width: calc(100% - 3.5rem);
            padding: 1rem 1.875rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            background-color: #F4F4F4;
            border-radius: 0.75rem;
            font-size: 1.75rem;
            margin-bottom: 1.875rem;
            .right{
              img{
                width: 1.625rem;
                height: 1.625rem;
              }
            }
          }
          .d_tip{
            font-size: 1.5rem;
            line-height: 2.375rem;
            color: #646464;
            margin-bottom: 3rem;
          }
        }
        .content2{
          .content2_head{
            position: relative;
            padding: 1.875rem;
            border-bottom: 1px solid #EAEAEA;
            text-align: center;
            font-size: 2rem;
            .left{
              position: absolute;
            }
          }
          .list{
            padding: 0 1.875rem;
            .item{
              border-bottom: 1px solid #EAEAEA;
              padding: 1.5rem 0;
              font-size: 1.75rem;
              color: #323232;
              display: flex;
              align-items: center;
              justify-content: flex-start;
              &:last-child{
                border-bottom: 0;
              }
              .left{
                width: 2.625rem;
                height: 2.625rem;
                font-size: 0.5rem;
                color: #ffffff;
                text-align: center;
                line-height: 2.625rem;
                &.leftBG{
                  background: url('~@/assets/merchant/MerchantCA_redBG.png') center center no-repeat;
                  background-size: cover;
                }
              }
              .text{
                flex: 1;
                margin-left: 1.5rem;
              }
              .active{
                img{
                  width: 2.125rem;
                  height: 2.125rem;
                }
              }
            }
          }
        }
        .d_foot_but{
          width: 100%;
          height: 4.375rem;
          background-color: #F89F04;
          text-align: center;
          line-height: 4.375rem;
          color: #ffffff;
          font-size: 2rem;
        }
      }
    }

  }

</style>
