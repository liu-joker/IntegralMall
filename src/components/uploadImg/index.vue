<template>

  <div>
    <input type="file" @change="getFile" ref="file" accept="image/*"
           style="display: none">
    <!-- <label :for="'file'+index" @click="uploadImg(index)">{{x.label}}</label>-->
  </div>

</template>

<script>
  export default {
    name: 'uploadImg',
    data() {
      return {
        userImgLis: '',
        NuserImgList: '',
        auth:''
      }
    },
    created() {

    },
    methods: {
      submit() {
        this.uploadImgToQiniu()
      },
      getFile(e) {
        let _this = this
        var files = e.target.files[0]
        if (!e || !window.FileReader) return  // 看支持不支持FileReader
        let reader = new FileReader()
        reader.readAsDataURL(files) // 这里是最关键的一步，转换就在这里
        reader.onloadend = (x => {
          this.userImgLis = x.target.result
          this.NuserImgList = files
          /* this.$set(this.userImgList, this.imgIndex, x.target.result)
           this.$set(this.NuserImgList, this.imgIndex, files)*/
          /*this.imgList[this.imgIndex] = x.currentTarget.result
          console.log(x.currentTarget.result)
          console.log()*/
        })
      },

      /* uploadImg(x) {
         this.imgIndex = x
         if (x == 0) {
           this.imgIndex = x
         }
       },*/

      //上传图片到七牛
      uploadImgToQiniu() {
        this.$axiosApi.getAuth().then(response => {
          //获取上传签名
          if (response.code == 200) {
            var uploadToken = this.auth
            let imgList = ''
            let img = new Image();
            img.src = this.userImgList;
            let Nfile = this.imgCompress(img, {quality: 0.4})
            let key = new Date().getTime() + i + this.$Cookies.getToken().substring(0, 12) + Nfile.imgType
            var Extra = {
              fname: key,
              params: {},
            };
            let config = {
              useCdnDomain: false,   //表示是否使用 cdn 加速域名，为布尔值，true 表示使用，默认为 false。
              region: qiniu.region.z2     // 根据具体提示修改上传地区,当为 null 或 undefined 时，自动分析上传域名区域
            };
            var observable = qiniu.upload(Nfile.urlFile, key, uploadToken, Extra, config);
            observable.subscribe({
              next: (result) => {
                // 主要用来展示进度
                console.log(result)
              },
              error: (errResult) => {
                // 失败报错信息
                console.log(errResult)
              },
              complete: (result) => {
                // 接收成功后返回的信息
                imgList = result.key


                /* if (imgList[0] && imgList[1] && imgList[2]) {
                   let userName = this.form.name
                   let idCard = this.form.idCard
                   let type = 3
                   let photoFront = imgList[0]
                   let photoBack = imgList[1]
                   let photoMan = imgList[2]
                   this.$axiosApi.realName(userName, idCard, type, photoFront, photoBack, photoMan).then(res => {
                     if (res.code == 200) {
                       this.$vux.confirm.show({
                         title: '提示',
                         content: '操作成功！请等待验证',
                         showCancelButton: false,
                         onConfirm: () => {
                           this.$router.push({path: '/AddSettlementBank/'+1})
                         }
                       })
                     }
                   })
                 }*/
              }
            })
          }
        })
      },
      // 压缩图片
      imgCompress(path, obj) {   //path是指上传的图片，obj是压缩的品质，越低越模糊
        let _this = this  //这里的this 是把vue的实例对象指向改变为_this
        var img = new Image();
        img.src = path.src;
        img.onload = function () {
          var that = this;  //这里的this 是把img的对象指向改变为that
          // 默认按比例压缩
          var w = that.width,
            h = that.height,
            scale = w / h;
          w = obj.width || w;
          h = obj.height || (w / scale);
          var quality = 0.7;  // 默认图片质量为0.7
          //生成canvas
          var canvas = document.createElement('canvas');
          var ctx = canvas.getContext('2d');
          // 创建属性节点
          var anw = document.createAttribute("width");
          anw.nodeValue = w;
          var anh = document.createAttribute("height");
          anh.nodeValue = h;
          canvas.setAttributeNode(anw);
          canvas.setAttributeNode(anh);
          ctx.drawImage(that, 0, 0, w, h);
          // 图像质量
          if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
            quality = obj.quality;
          }
          var Robj = {}
          // quality值越小，所绘制出的图像越模糊
          var base64 = canvas.toDataURL('image/jpeg', quality);
          // 回调函数返回base64的值
          var urlFile = _this.convertBase64UrlToBlob(base64)  //这个地方的处理是为了把压缩的base64转化为对象，获得压缩后图片的大小size，方便对压缩后的图片再次进行判断；
          Robj.base64 = base64
          Robj.urlFile = urlFile

          if (urlFile.size / 1024 > 1025) {
            // _this.$msgbox("图片过大，请重新上传图片")
          } else {
            Robj.partitionBase = base64.split(",")[1]
            Robj.imgType = "." + urlFile.type.split("/")[1]
          }
          return Robj
        }
        return img.onload()
      },
      convertBase64UrlToBlob(urlData) {
        var arr = urlData.split(','), mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {type: mime});
      },
    }
  }
</script>

<style rel="stylesheet/less" lang="less">


</style>
