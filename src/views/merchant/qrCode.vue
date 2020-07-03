<template>

  <div class="qrCode">
    <div class="qr_content">
      <div class="title">小米粒扫一扫，向我付钱</div>

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
    <div class="changeVip ripple" @click="toMerchantCA">
      <span>商家中心</span>
      <svg-icon class="form_icon" icon-class="right"></svg-icon>
    </div>
  </div>
</template>

<script>
  import {Qrcode} from 'vux'
  import lizhifu from '@/assets/merchant/lizhifuLogo.png';

  import vueQrcodes from '@/components/vueQrcodes'
  export default {
    name: 'qrCode',
    components: {
      Qrcode,
      vueQrcodes
    },
    data() {
      return {
        qrcodeData:{
          url:'',
          icon:lizhifu,
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
      this.qrCodeInfo()
      this.setQrcode()
    },
    methods: {
      toMerchantCA(){
        this.$router.push({
          path:'/MerchantCA'
        })
      },
      qrCodeInfo(){
        this.$axiosApi.qrCodeInfo().then(res=>{
          if(res.code == 200){
            this.qrcodeData.url = res.data
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
