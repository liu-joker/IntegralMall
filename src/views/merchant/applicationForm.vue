<template>

  <div class="applicationForm">
    <div class="head">
      <div class="item" v-for="(x,index) in titleList" :class="formActive == index?'active':''"
           @click="changeFormActive(index)">{{x}}
      </div>
    </div>
    <div class="formComponent">
      <div class="form" v-show="formActive == 0">
        <group class="inputItem">
          <x-input label-width="auto" class="input" placeholder-align="left" text-align="left"
                   placeholder="请输入商家绑定手机号" ref="name" required>
            <div class="inputTitle" slot="label">商家绑定手机号: </div>
          </x-input>
        </group>
        <group class="inputItem">
          <x-input label-width="auto" class="input" placeholder-align="left" text-align="left"
                   placeholder="请输入法人手机号" ref="idCard" required>
            <div class="inputTitle" slot="label"><span class="requestSpan"> * </span>法人姓名: </div>

          </x-input>
        </group>
        <group class="inputItem">
          <x-input label-width="auto" class="input" placeholder-align="left" text-align="left"
                   placeholder="请选择法人手机号" ref="idCard" required>
            <div class="inputTitle" slot="label"><span class="requestSpan"> * </span>法人证件类型: </div>

          </x-input>
        </group>
        <group class="inputItem">
          <x-input label-width="auto" class="input" placeholder-align="left" text-align="left"
                   placeholder="请输入法人证件号码" ref="idCard" required>
            <div class="inputTitle" slot="label"><span class="requestSpan"> * </span>法人证件号码: </div>

          </x-input>
        </group>
        <group class="inputItem last groupCard">
          <div slot="title" class="inputTitle">
            <span class="requestSpan"> * </span>身份证照片:
          </div>
          <div class="uploadImgList">
            <div class="item" v-for="(x,index) in imgList" :key="index">
              <label :for="'file'+index" @click="uploadImg(index)">
                <div class="addImgBut" v-if="!userImgList[index]">
                  <img :src="x.img" alt="">
                  <div>{{x.label}}</div>
                </div>
                <div class="img_success" v-if="userImgList[index]">
                  <img :src="userImgList[index]" alt="图片" :class="'img'+index">
                </div>
              </label>

              <div class="uploadImg">
                <input type="file" @change="getFile" :ref="'file'+index" :id="'file'+index" accept="image/*"
                       style="display: none">
              </div>
            </div>
          </div>
          <div class="up_tip">
            <div class="left">提示：</div>
            <div class="right">
              <p>1、身份证照片需露出四角</p>
              <p>2、请保证图片清晰</p>
              <p>3、请手机拍摄照片上传</p>
              <p>4、<span class="requestSpan">*</span>为必填项</p>
            </div>
          </div>
        </group>
      </div>
      <div class="form" v-show="formActive == 1">
        <group class="inputItem">
          <x-input label-width="auto" class="input" placeholder-align="left" text-align="left"
                   placeholder="请输入商家中文名称" ref="name" request>
            <div class="inputTitle" slot="label"><span class="requestSpan"> * </span>商家中文名称: </div>
          </x-input>
        </group>
        <group class="inputItem">
          <x-input label-width="auto" class="input" placeholder-align="left" text-align="left"
                   placeholder="请输入商家英文或拼音名称" ref="name">
            <div class="inputTitle" slot="label">商家英文名称: </div>
          </x-input>
        </group>
        <group class="inputItem">
          <x-input label-width="auto" class="input" placeholder-align="left" text-align="left"
                   placeholder="格式:区号-号码,如0755-83785421" ref="name">
            <div class="inputTitle" slot="label">固定电话: </div>
          </x-input>
        </group>
        <group class="inputItem">
          <cell is-link @click.native="show2 = true">
            <div class="cellTitle" slot="title">
              <span class="requestSpan"> * </span>商户性质:
            </div>
            <div class="cellContent">
              <span class="selectValue">xxx</span>
            </div>
          </cell>
        </group>
        <group class="inputItem">
          <cell is-link @click.native="show3 = true">
            <div class="cellTitle" slot="title">
              <span class="requestSpan"> * </span>行业类型:
            </div>
            <div class="cellContent">
              <span class="selectValue">xxx</span>
            </div>
          </cell>
        </group>
        <group class="inputItem">
          <x-input label-width="auto" class="input" placeholder-align="left" text-align="left"
                   placeholder="请输入实际经营地址" ref="name" request>
            <div class="inputTitle" slot="label"><span class="requestSpan"> * </span>营业地址: </div>
          </x-input>
        </group>

        <group class="inputItem">
          <cell is-link @click.native="MapShow = true">
            <div class="cellTitle" slot="title" style="min-width: 10rem;margin-right: 1.25rem">
              <span class="requestSpan"> * </span>选址定位:
            </div>
            <div class="cellContent">
              <span class="selectValue">{{mapData.address || '请选择实际经营地址'}}</span>
            </div>
          </cell>
        </group>
        <group class="inputItem">
          <cell is-link @click.native="show4 = true">
            <div class="cellTitle" slot="title">
              <span class="requestSpan"> * </span>经营范围:
            </div>
            <div class="cellContent">
              <span class="selectValue">xxx</span>
            </div>
          </cell>
        </group>
        <group class="inputItem last groupCard">
          <div slot="title" class="inputTitle">
            <span class="requestSpan"> * </span>营业执照/复印件照片:
          </div>
          <div class="uploadImgList">
            <div class="item" v-for="(x,index) in imgList2" :key="index">
              <label :for="'file'+index" @click="imgIndex2 = index">
                <div class="addImgBut" v-if="!userImgList2[index]">
                  <img :src="x.img" alt="">
                  <div>{{x.label}}</div>
                </div>
                <div class="img_success" v-if="userImgList2[index]">
                  <img :src="userImgList2[index]" alt="图片" :class="'img'+index">
                </div>
              </label>

              <div class="uploadImg">
                <input type="file" @change="getFile" :ref="'file'+index" :id="'file'+index" accept="image/*"
                       style="display: none">
              </div>
            </div>
            <div class="item item_tip">
              <p><span class="requestSpan">*</span>复印件照片需要加盖彩色公章</p>
            </div>
          </div>
          <div class="up_tip">
            <div class="left">提示：</div>
            <div class="right">
              <p>1、请保证图片清晰</p>
              <p>4、<span class="requestSpan">*</span>为必填项</p>
            </div>
          </div>
        </group>
        <popup v-model="MapShow" height="100%" class="popup">
            <div class="map">
              <div id="GDMap">
                <template>
                  <vueamap :mapData="mapData" v-on:mapFun="mapFun"></vueamap>
                </template>
              </div>
            </div>
          </popup>

        <div class="popupDiv">
          <popup v-model="show2" height="35%" class="popup">
            <div class="popupHead">
              <p>请选择商家性质</p>
              <span @click="show2 = false"><svg-icon slot="label" class="form_icon"
                                                     icon-class="close"></svg-icon></span>

            </div>
            <div class="contentPopup">
              <div class="item ripple" v-for="(x,index) in channelList1" :key="index" @click="selectChannelItem(x)">
                <span class="name">{{x}}</span>
              </div>
              <div class="noData" v-if="channelList1.length == 0">
                暂无数据
              </div>
            </div>
          </popup>
        </div>
        <div class="popupDiv">
          <popup v-model="show3" height="35%" class="popup">
            <div class="popupHead">
              <p>请选择商家性质</p>
              <span @click="show3 = false"><svg-icon slot="label" class="form_icon"
                                                     icon-class="close"></svg-icon></span>

            </div>
            <div class="contentPopup">
              <div class="item ripple" v-for="(x,index) in channelList1" :key="index" @click="selectChannelItem(x)">
                <span class="name">{{x}}</span>
              </div>
              <div class="noData" v-if="channelList1.length == 0">
                暂无数据
              </div>
            </div>
          </popup>
        </div>

      </div>
      <div class="form" v-show="formActive == 2">
        <group class="inputItem">
          <cell is-link @click.native="show2 = true">
            <div class="cellTitle" slot="title">
              <span class="requestSpan"> * </span>账户类型:
            </div>
            <div class="cellContent">
              <span class="selectValue">xxx</span>
            </div>
          </cell>
        </group>
        <group class="inputItem">
          <x-input label-width="auto" class="input" placeholder-align="left" text-align="left"
                   placeholder="请输入银行名称" ref="name" request>
            <div class="inputTitle" slot="label"><span class="requestSpan"> * </span>银行名称: </div>
          </x-input>
        </group>
        <group class="inputItem">
          <x-input label-width="auto" class="input" placeholder-align="left" text-align="left"
                   placeholder="请输入开户人姓名" ref="name" request>
            <div class="inputTitle" slot="label"><span class="requestSpan"> * </span>开户名称: </div>
          </x-input>
        </group>
        <group class="inputItem">
          <x-input label-width="auto" class="input" placeholder-align="left" text-align="left"
                   placeholder="请输入开户账户" ref="name" request>
            <div class="inputTitle" slot="label"><span class="requestSpan"> * </span>开户账户: </div>
          </x-input>
        </group>

        <div>
          <!--对私-->
          <group class="inputItem">
            <x-input label-width="auto" class="input" placeholder-align="left" text-align="left"
                     placeholder="请输入预留手机号" ref="name" request>
              <div class="inputTitle" slot="label"><span class="requestSpan"> * </span>预留手机号: </div>
            </x-input>
          </group>
          <group class="inputItem last groupCard">
            <div slot="title" class="inputTitle">
              <span class="requestSpan"> * </span>结算卡正反面照片:
            </div>
            <div class="uploadImgList">
              <div class="item" v-for="(x,index) in imgList4" :key="index">
                <label :for="'file'+index" @click="imgIndex4 = index">
                  <div class="addImgBut" v-if="!userImgList4[index]">
                    <img :src="x.img" alt="">
                    <div>{{x.label}}</div>
                  </div>
                  <div class="img_success" v-if="userImgList4[index]">
                    <img :src="userImgList4[index]" alt="图片" :class="'img'+index">
                  </div>
                </label>

                <div class="uploadImg">
                  <input type="file" @change="getFile" :ref="'file'+index" :id="'file'+index" accept="image/*"
                         style="display: none">
                </div>
              </div>

            </div>
          </group>
        </div>
        <div v-show="false">
          <!--对公-->
          <group class="inputItem last groupCard">
            <div slot="title" class="inputTitle">
              <span class="requestSpan"> * </span>开户账号:
            </div>
            <div class="uploadImgList">
              <div class="item" v-for="(x,index) in imgList3" :key="index">
                <label :for="'file'+index" @click="imgIndex3 = index">
                  <div class="addImgBut" v-if="!userImgList3[index]">
                    <img :src="x.img" alt="">
                    <div>{{x.label}}</div>
                  </div>
                  <div class="img_success" v-if="userImgList3[index]">
                    <img :src="userImgList3[index]" alt="图片" :class="'img'+index">
                  </div>
                </label>

                <div class="uploadImg">
                  <input type="file" @change="getFile" :ref="'file'+index" :id="'file'+index" accept="image/*"
                         style="display: none">
                </div>
              </div>

            </div>
          </group>

        </div>

        <div class="up_tip">
          <div class="left">提示：</div>
          <div class="right">
            <p>1、账户类型为对私时，默认提现账户为已绑定
              结算账号</p>
            <p>2、请保证照片清晰</p>
            <p>3、<span class="requestSpan">*</span>为必填项</p>
          </div>
        </div>
      </div>
    </div>
    <div class="foot_but">
      <x-button class="submit merchantBut" @click.native="submit">下一步</x-button>
    </div>
  </div>

</template>

<script>
  import {Group, XButton, XInput, Datetime, Cell, Popup} from 'vux';
  import icon_addphoto from "@/assets/merchant/icon_addphoto.png"
  //  import loadMap from '@/utils/loadMap.js'
  import vueamap from "@/components/VueAmap"
  export default {
    name: 'applicationForm',
    components: {
      Group,
      XButton,
      XInput,
      Datetime,
      Cell,
      Popup,
      vueamap
    },
    data() {
      return {
        titleList: ['1.基本信息填写', '2.店铺信息填写', '3.结算信息填写'],
        imgList: [{img: icon_addphoto, label: '身份证正面'}, {img: icon_addphoto, label: '身份证反面'}, {
          img: icon_addphoto,
          label: '手持身份证照片'
        }],

        imgList2: [{img: icon_addphoto, label: '营业执照照片'}],
        imgList3: [{img: icon_addphoto, label: '开户许可证正面照'}],
        imgList4: [{img: icon_addphoto, label: '结算卡正面照片'},{img: icon_addphoto, label: '结算卡反面照片'}],
        userImgList: [],
        userImgList2: [],
        userImgList3: [],
        userImgList4: [],
        NuserImgList: [],
        channelList1: [],
        show2: false,
        show3: false,
        show4: false,
        channel: 0,
        imgIndex: 0,
        imgIndex2: 0,
        imgIndex3: 0,
        imgIndex4: 0,
        formActive: 0,
        form: {
          name: '',
          idCard: '',
          time2: '',
        },


        mapData: {
          address: '',
          lng: 114.032188,
          lat: 22.529779,
          edit: true
        },

        // 更多参考：https://lbs.amap.com/api/javascript-api/guide/abc/plugins#plugins
        MapShow: false,

      }
    },
    created() {

    },
    mounted() {

    },
    methods: {
      mapFun(data) {
        this.mapData = data
        this.MapShow = false
      },
      selectChannelItem(x) {
        //商家性质选择
        this.channel = x
        this.show2 = false
      },
      changeFormActive(x) {
        if (this.formActive > x) {
          this.formActive = x
        }
      },
      submit() {
        if (this.formActive < this.titleList.length - 1) {
          this.formActive += 1
        }else if(this.formActive == 2){

          this.$router.go(-1)
        }


        //        var address = location.href.split('/#/')[0] + '/#/';
//                  window.location.replace(address + 'transferAccounts')



        // this.uploadImgToQiniu()
      },
      getFile(e) {
        let _this = this
        var files = e.target.files[0]
        if (!e || !window.FileReader) return  // 看支持不支持FileReader
        let reader = new FileReader()
        reader.readAsDataURL(files) // 这里是最关键的一步，转换就在这里
        reader.onloadend = (x => {
          this.$set(this.userImgList, this.imgIndex, x.target.result)
          this.$set(this.NuserImgList, this.imgIndex, files)
          this.imgList[this.imgIndex] = x.currentTarget.result
          console.log(this.userImgList)
        })
      }
      ,
      uploadImg(x) {
        this.imgIndex = x
        if (x == 0) {
          this.imgIndex = x
        }
      }
      ,
      //上传图片到七牛
      uploadImgToQiniu() {
        if (this.$refs.name.valid && this.$refs.idCard.valid && this.form.name.trim() != "" && this.form.idCard.trim() != "" && this.NuserImgList.length == 3) {
          this.$axiosApi.getAuth().then(response => {
            if (response.code == 200) {
              var uploadToken = response.data
              let imgList = []
//            if(this.userImgList.length==3){
              if (true) {
                for (let i = 0; i < this.userImgList.length; i++) {
                  let img = new Image();
                  img.src = this.userImgList[i];
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
                      console.log(result.key)
                      imgList[i] = result.key
                      if (imgList[0] && imgList[1] && imgList[2]) {
                        let userName = this.form.name
                        let idCard = this.form.idCard
                        let type = 3
                        let photoFront = imgList[0]
                        let photoBack = imgList[1]
                        let photoMan = imgList[2]


                        /*     this.$axiosApi.realName(userName, idCard, type, photoFront, photoBack, photoMan).then(res => {
                               if (res.code == 200) {
                                 this.$vux.confirm.show({
                                   title: '提示',
                                   content: '操作成功！请等待验证',
                                   showCancelButton: false,
                                   onConfirm: () => {
                                     this.$router.push({path: '/AddSettlementBank/' + 1})
                                   }
                                 })
                               }
                             })*/
                      }
                    }
                  })
                }
              }
            }
          })
        }
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
        var arr = urlData.split(','), mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {type: mime});
      }
      ,
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  #GDMap {
    width: 100%;
    height: 100vh;
    position: relative;
  }
</style>
