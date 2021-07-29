<template>
  <div class="callbackPagejf">
     
    <div class="head">
      <div class="item">
        <img :src="callbackPageS" alt="">
        <p>支付成功</p>
      </div>
    </div> 
     <div class="center">
      <div class="item">
        <p>实付：{{ amount}} 积分</p>
        <p>付款手机号：<span class="yellow">{{phone}}</span></p>
      </div>
    </div>
     
  </div>
</template>

<script>
 import callbackPageS from "@/assets/images/callbackPageS.png"
export default {
  name:'callbackPagejf',
  data(){
      return {
          callbackPageS:callbackPageS,
          amount:'',
          phone:'',
      }

  },
  created(){
    
    this.amount = this.$route.query.point
    this.phone = this.$route.query.phone
    // console.log(phone)
    //  var mphone = phone.substr(0, 3) + '****' + phone.substr(7);   
    //  this.phone = mphone
  }
}
</script>

<style lang='scss' scoped>
.callbackPagejf{
    background-color: #f4f4f4;
    min-height: 100%;
    .head {
      background-color: #fff;
      margin-top:10.5rem;
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
      background-color: #fff;
      .item {
        padding: 2.25rem 0;
        border-top: 1px solid #EAEAEA;
        font-size: 1.75rem;
        color: #646464;
        text-align: center;
        > p {
          margin-bottom: 0.5rem;
        }
        .yellow {
          font-size: 2.125rem;
          color: #F89F04;
        }
        .noPhone {
          font-size: 1.5rem;
          color: #323232;
          margin-top: 2.75rem;
          /*p {
            margin-bottom: 1.75rem;
          }*/
          
        }
        
      }
    }
}
</style>