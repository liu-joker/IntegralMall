<template>

    <qrcode :url="qrcodeData.url" :iconurl="qrcodeData.icon" :wid="qrcodeData.wid" :hei="qrcodeData.hei" :imgwid="qrcodeData.imgwid" :imghei="qrcodeData.imghei"></qrcode>

</template>

<script>

  import qrcode from 'vue_qrcodes'
  export default {
    name: 'vueQrcodes',
    components:{
      qrcode
    },
    props: ['qrcodeData'],
    data() {
      return {
      }
    },
    created() {
    },
    methods: {}
  }
</script>

<style rel="stylesheet/less" lang="less">


</style>
