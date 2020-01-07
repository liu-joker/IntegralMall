<!--支付成功回调-->
<template>

  <div class="callbackPageS">
    <div class="head">
      <div class="item">
        <img :src="callbackPageS" alt="">
        <p>支付成功</p>
      </div>
    </div>
    <div class="center">
      <div class="item">
        <p>实付：￥{{ amount | formatMoney}}</p>
        <p v-if="isUser == 1">获得U米：<span class="yellow">{{point}}</span></p>
        <div class="noPhone" v-else>
          <p>未填写或非小米粒账号，无法获取U米</p>
          <p class="download">下载小米粒，注册消费返还U米，<span @click="download">前往下载>></span></p>
        </div>
      </div>
    </div>
  <!--  <div class="foot">
      <x-button class="but">前往商城免费兑换</x-button>
    </div>-->


  </div>

</template>

<script>
  import {XButton} from 'vux'
  import callbackPageS from "@/assets/images/callbackPageS.png"
  import {formatMoney, imgUrl} from "@/filters"

  export default {
    name: 'callbackPageS',
    components: {
      XButton,
    },
    data() {
      return {
        callbackPageS: callbackPageS,
        amount:'0',
        point:'0',
        isUser:0,
        preUser:"",
      }
    },
    created() {
      this.amount = formatMoney(this.$route.query.amount)
      this.point = this.$route.query.point
      this.isUser = this.$route.query.isUser || 0
      this.preUser = this.$route.query.preUser
    },
    methods: {
      download(){
        if(!this.preUser || this.preUser == "") return
        location.href = 'https://www.hlxiaoxiong.com/h5/#/?userID=' + this.preUser
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less">

  .callbackPageS {
    .head {
      .item {
        padding: 5rem 0 3.625rem;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        font-size: 2rem;
        color: #12C637;
        img {
          width: 9.125rem;
          height: 9.125rem;
          margin-bottom: 1.75rem;
        }
      }
    }
    .center {
      padding: 0 1.875rem;
      .item {
        padding: 2.25rem 0;
        border-top: 1px solid #EAEAEA;
        font-size: 1.75rem;
        color: #646464;
        text-align: center;
        >p {
          margin-bottom: 0.5rem;
        }
        .yellow {
          font-size: 2.125rem;
          color: #F89F04;
        }
        .noPhone{
          font-size: 2.125rem;
          color: #323232;
          margin-top: 4.75rem;
          p{
            margin-bottom: 1.75rem;
          }
          .download{
            font-size: 1.5rem;
            span{
              color: #F89F04;
            }
          }
        }
      }
    }
    .foot{
      margin-top: 5rem;
      padding: 0 2.81rem;
      .but{
        color: #ffffff;
        background-color: #F89F04;
        font-size: 2rem;
        &:active{
          background-color: #F89F04;
          opacity: 0.8;
          color: #ffffff;
        }
      }
    }
  }

</style>
