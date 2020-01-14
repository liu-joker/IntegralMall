<template>

  <div class="errorPayPage">
    <div class="errContent">
<!--      <img :src="pic_zf_whz" alt="" class="img">
      <p class="info">请使用小米粒APP或微信扫码</p>
      <x-button class="but" @click.native="submit">去下载</x-button>-->
      <div class="img1">
        <div class="butList" @click="submit">
          <div class="but but1"></div>
          <div class="but but2"></div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import pic_zf_whz from "@/assets/images/pic_zf_whz.png"
  import bgImg from "@/assets/images/pic_background@2x.jpg"
//  import bgImg from "@/assets/images/pic_button@2x.png"
//  import bgImg from "@/assets/images/pic_button@2x.png"
//  import bgImg from "@/assets/images/pic_button_down@2x.png"
  import {XButton} from 'vux'

  export default {
    name: 'errorPayPage',
    components: {
      XButton,
    },
    data() {
      return {
        pic_zf_whz: pic_zf_whz,
        userId: '',
        bgImg:bgImg,
      }
    },
    created() {
      this.userId = this.$route.query.userId
    },
    methods: {
      submit() {
        location.href = 'https://www.hlxiaoxiong.com/h5/#/?userID=' + this.$route.query.userId
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less">

  .errorPayPage {
    .errContent {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 100vh;
      .img1{
        height: 100vh;
        width: 100%;
        position: relative;
        background: url('~@/assets/images/pic_background@2x.jpg') center center no-repeat;
        background-size: cover;
        .butList{
          width: 33.5rem;
          height: 5.5rem;
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translate(-50%,0);
          &:active .but2{
            display: block;
          }
          .but{
            position: absolute;
            left:0;
            top: 0;
            width: 100%;
            height: 100%;
          }
          .but1{
            background: url('~@/assets/images/pic_button.png') center center no-repeat;
            background-size: cover;
            z-index: 1;
          }
          .but2{
            background: url('~@/assets/images/pic_button_down.png') center center no-repeat;
            background-size: cover;
            display: none;
            z-index: 2;
          }

        }
      }
    }
  }


</style>
