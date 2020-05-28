<template>

  <div class="qrCode">
    <div class="qr_content">
      <div class="title">立之付扫一扫，向我付钱</div>

      <!--<qrcode :value="value" class="qrcode_img"></qrcode>-->
      <vue-qrcodes :qrcodeData="qrcodeData" v-if="qrcodeData.show"></vue-qrcodes>
      <div class="setOrSave">
        <div class="setBut">设置金额</div><div @click="toQrCodeImg">保存图片</div>
      </div>
      <div class="collectionRecord">
        <div>
          <img src="@/assets/merchant/icon_skjl.png" alt="">
          <span>收款记录</span>
        </div>

        <svg-icon class="form_icon" icon-class="right"></svg-icon>
      </div>
    </div>
    <div class="changeVip ripple">
      <span>立即开通立之付VIP商家</span>
      <svg-icon class="form_icon" icon-class="right"></svg-icon>
    </div>
  </div>
</template>

<script>
  import {Qrcode} from 'vux'
  import vueQrcodes from '@/components/vueQrcodes'
  export default {
    name: 'qrCode',
    components: {
      Qrcode,
      vueQrcodes
    },
    data() {
      return {
        value:'http://192.168.1.34:8088/#/qrCode',
        qrcodeData:{
          url:'http://192.168.1.34:8088/#/payment?agentId=1&brandId=deb99c1be8a748a59f760485fd49df15',
          icon:'http://img.cdn.hljcxiaoxiong.com/pic_sort11-12.png',
          wid: 200,
          hei: 200,
          imgwid:53,
          imghei:53,
          show:false
        }
      }
    },
    created() {

    },
    mounted(){
      this.setQrcode()
    },
    methods: {
      toQrCodeImg(){
        this.$router.push({
          path:'/qrCodeImg'
        })
      },
      setQrcode(){
        let w = document.body.clientWidth
        this.qrcodeData.wid = Math.floor((23.125/46.875) * w)
        this.qrcodeData.hei = Math.floor((23.125/46.875) * w)
        this.qrcodeData.imgwid = Math.floor((5/46.875) * w)
        this.qrcodeData.imghei = Math.floor((5/46.875) * w)
        this.qrcodeData.show = true
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less">


</style>
