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




</style>
