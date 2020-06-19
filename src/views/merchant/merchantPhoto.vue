<template>

  <div class="merchantPhoto">
    <div class="photoList">
      <div class="item"  v-for="(x,index) in imgList">
        <div class="delete">
          <img src="@/assets/merchant/icon_cancel.png" alt="">
        </div>
        <img :src="x | imgUrl" alt="">
      </div>
      <label :for="'file'">
        <div class="item addItem">
          <div class="itemCenter">
            <div class="addImgBut">
              <svg-icon slot="label" class="form_icon" icon-class="add2"></svg-icon>
              <span>上传照片</span>
            </div>
            <div class="img_success" v-if="userImgList1" style="display: none">
              <img :src="userImgList1" alt="图片">
            </div>
            <div class="uploadImg">
              <input type="file" @change="getFile" :ref="'file'" :id="'file'" accept="image/*"
                     style="display: none">
            </div>
          </div>
        </div>
      </label>

    </div>
  </div>

</template>

<script>
  import * as qiniu from 'qiniu-js';

  export default {
    name: 'merchantPhoto',
    data() {
      return {
        userImgList1: null,
        imgList: [],
        agentId: ''
      }
    },
    created() {
       this.agentId = this.$route.query.agentId

      this.getData()
    },
    methods: {
      getData() {
        this.$axiosApi.getAgentPhoto(this.agentId).then(res => {
          if (res.code == 200) {
            this.imgList = res.data
          }
        })
      },
      submit() {
        this.uploadImgToQiniu(this.userImgList1).then(res => {
          if (res) {
            let data = {
              agentId: this.agentId,
              photo: res
            }
            this.$axiosApi.addPhoto(data).then(res2 => {
              if (res2.code == 200) {
                this.userImgList1 = null
                this.$vux.toast.show({text: '上传成功,审核通过后即可展示...'})
              }
            })
          }
        })
      },
      getFile(e) {
        let _this = this
        var files = e.target.files[0]
        if (!e || !window.FileReader) return  // 看支持不支持FileReader
        let reader = new FileReader()
        reader.readAsDataURL(files) // 这里是最关键的一步，转换就在这里
        reader.onloadend = (x => {
          this.userImgList1 = x.target.result
          this.submit()
        })
      }
      ,
      //上传图片到七牛
      uploadImgToQiniu(upList) {
        let this_ = this
        return new Promise(function (resolve, reject) {
          this_.$axiosApi.getAuth().then(response => {
            if (response.code == 200) {
              var uploadToken = response.data
              let imgList = ''
              let img = new Image();
              img.src = upList;
              let Nfile = this_.imgCompress(img, {quality: 0.4})
              let key = new Date().getTime() + this_.$Cookie.getToken().substring(this_.$Cookie.getToken().length - 10, this_.$Cookie.getToken().length) + Nfile.imgType
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
                  console.log(result.key)
                  imgList = result.key
                  resolve(imgList);
                }
              })
            }
          })
        })
      }
      ,
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

            that.$vux.toast.show({text: "图片过大，请重新上传图片"})

          } else {
            Robj.partitionBase = base64.split(",")[1]
            Robj.imgType = "." + urlFile.type.split("/")[1]
          }
          return Robj
        }
        return img.onload()
      }
      ,
      convertBase64UrlToBlob(urlData) {
        var arr = urlData.split(','), mime = arr[0].match(/:(.*?);/)[1], bstr = atob(arr[1]), n = bstr.length,
          u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {type: mime});
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less">

  .merchantPhoto {
    min-height: 100vh;
    .photoList {
      padding: 1.875rem;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      .item {
        position: relative;
        background-color: #f4f4f4;
        border-radius: 1rem;
        width: 20rem;
        height: 20rem;
        margin-bottom: 1.75rem;
        overflow: hidden;
        &.addItem {
          font-size: 1.75rem;
          color: #646464;
          display: flex;
          align-items: center;
          justify-content: center;
          .itemCenter {

            .addImgBut {
              text-align: center;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
            }
            .form_icon {
              margin-bottom: 1.25rem;
              font-size: 3rem;
            }
          }
        }
        .delete {
          position: absolute;
          right: 0.5rem;
          top: 0.5rem;
          img {
            width: 1.75rem;
            height: 1.75rem;
          }
        }
      }
    }
  }

</style>
