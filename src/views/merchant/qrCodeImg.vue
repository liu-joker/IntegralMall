<template>

  <div class="qrCodeImg">
    <!--
    <div class="img-box" ref="imageWrapper" style="background-color:#fff;">
       <img src="@/assets/merchant/icon_quanbu.png" alt="全部" width="100" height="100">
     </div>
     <button @click="downloadFileByBase64(dataURL)">下载二维码</button>
     <a :href="dataURL" download="下载图片的名字"><img :src="dataURL" width="100%"/></a>
     -->

    <div class="img-box" ref="imageWrapper">
      <div class="qrImg_head">
        <img src="@/assets/merchant/lizhifu.png" alt="">
        <span>立之付</span>
      </div>
      <div class="qrImg_content">
        <div class="title">支付就用立之付</div>
        <div class="qrcode_img">
          <vue-qrcodes :qrcodeData="qrcodeData" v-if="qrcodeData.show"></vue-qrcodes>
          <div class="userName" v-if="name!=''">{{name}}</div>
        </div>
      </div>
      <div class="qr_foot">打开立之付【扫一扫】</div>
    </div>
    <div class="downloadImg">
      <img :src="dataURL" alt="">
    </div>


    <!--<x-button class="submit merchantBut" @click.native="submit">保存并使用</x-button>-->

  </div>

</template>

<script>
  import html2canvas from 'html2canvas';
  import lizhifu from '@/assets/merchant/lizhifuLogo.png';
  import { XButton } from 'vux'
  import vueQrcodes from '@/components/vueQrcodes'
  export default {
    name: 'qrCodeImg',
    components: {
      XButton,
      vueQrcodes
    },
    data() {
      return {
        QRUrl: '',
        LOGOUrl: '',
        dataURL: '',
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
    computed:{
      name:function () {
        let str = this.$store.getters.LzfUserName
          if(null != str && str != undefined && str !=""){
            if(str.length <= 3){
              return "*" + str.substring(1,str.length);
            } else if(str.length > 3 && str.length <= 6){
              return "**" + str.substring(2,str.length);
            } else if(str.length > 6){
              return str.substring(0,2) + "****" + str.substring(6,str.length)
            }
          } else {
            return "";
          }
      }
    },
    created() {
      this.qrCodeInfo()
      this.setQrcode()
      this.getUserInfo()
    },
    methods: {
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
      setQrcode(){
        let w = document.body.clientWidth
        this.qrcodeData.wid = Math.floor((28.125/46.875) * w)
        this.qrcodeData.hei = Math.floor((28.125/46.875) * w)
        this.qrcodeData.imgwid = Math.floor((5/46.875) * w)
        this.qrcodeData.imghei = Math.floor((5/46.875) * w)
        this.qrcodeData.show = true
    },
      // 将dom转成canvas
      submit(){

      },
      makeImg() {
        var that = this
        var opts = {
          logging: true, // 启用日志记录以进行调试 (发现加上对去白边有帮助)
          allowTaint: true, // 否允许跨源图像污染画布
          backgroundColor: null, // 解决生成的图片有白边
          useCORS: true // 如果截图的内容里有图片,解决文件跨域问题
        }
        // eslint-disable-next-line no-undef
        html2canvas(that.$refs.imageWrapper, opts).then((canvas) => {
          var url = canvas.toDataURL('image/png')
          that.dataURL = url
          console.log(that.dataURL)
        })
      },
      // http图片转成base64，防止解决不了的图片跨域问题
      getBase64Image(img) {
        var canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height
        var ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, img.width, img.height)
        var dataURL = canvas.toDataURL('image/png') // 可选其他值 image/jpeg
        return dataURL
      },
      main(src) {
        var that = this
        var image = new Image()
        image.src = src + '?v=' + Math.random() // 处理缓存
        image.crossOrigin = '*' // 支持跨域图片
        image.onload = function () {
          that.LOGOUrl = that.getBase64Image(image)
        }
      },
      // 下载html2canvas生成的截图
      uploadQR() {
        var a = document.createElement('a')
        a.href = this.dataURL
        a.download = '二维码'
        a.click()
      },
      dataURLtoBlob(dataurl) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {type: mime});
      },
      downloadFile(url, name = '二维码') {
        var a = document.createElement("a")
        a.setAttribute("href", url)
        a.setAttribute("download", name)
        a.setAttribute("target", "_blank")
        let clickEvent = document.createEvent("MouseEvents");
        clickEvent.initEvent("click", true, true);
        a.dispatchEvent(clickEvent);
      },

      downloadFileByBase64(base64, name) {
        var myBlob = this.dataURLtoBlob(base64)
        var myUrl = URL.createObjectURL(myBlob)
        this.downloadFile(myUrl, name)
      },
      // 获取数据
      async getUserInfo(params) {
        const data = {
          iconUrl: 'http://img.cdn.hljcxiaoxiong.com/banner11-12.png'
        }
        this.main(data.iconUrl) // 将logo路径转成base64，阻止无法解决的跨域问题
        setTimeout(() => {
          this.makeImg() // 等数据都生成后，再执行
        }, 300)
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less">


</style>
