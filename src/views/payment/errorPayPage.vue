<template>

  <div class="errorPayPage">
    <div class="errContent">
      <img :src="pic_zf_whz" alt="" class="img">
      <p class="info">请使用小米粒APP或微信扫码</p>
      <x-button class="but" @click.native="submit">去下载</x-button>

    </div>
  </div>

</template>

<script>
  import pic_zf_whz from "@/assets/images/pic_zf_whz.png"
  import {XButton} from 'vux'

  export default {
    name: 'errorPayPage',
    components: {
      XButton,
    },
    data() {
      return {
        pic_zf_whz: pic_zf_whz,
        userId: ''
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
      padding-top: 5.5rem;
      .img {
        width: 28.75rem;
        height: 28.75rem;
      }
      .info {
        font-size: 1.75rem;
        color: #646464;
        text-align: center;
      }
      .but {
        color: #ffffff;
        background-color: #F89F04;
        font-size: 2.375rem;
        margin-top: 5.5rem;
        width: 28.15rem;
        text-align: center;
        height: 5rem;
        line-height: 5rem;
        border-radius: 3rem;
        &:active {
          background-color: #F89F04;
          opacity: 0.8;
          color: #ffffff;
        }
      }
    }
  }


</style>
