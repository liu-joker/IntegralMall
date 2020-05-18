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

  </div>

</template>

<script>

  import eChartsBar from "@/components/eChartsBar"

  export default {
    name: 'MerchantCA',
    components:{
      eChartsBar
    },
    data() {
      return {}
    },
    created() {

    },
    methods: {

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
  }

</style>
