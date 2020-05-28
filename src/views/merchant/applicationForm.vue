<template>

  <div class="applicationForm">
    <div class="head">
      <div class="item" v-for="(x,index) in titleList" :class="formActive == index+1?'active':''"
           @click="changeFormActive(index)">{{x}}
      </div>
    </div>
    <div class="formComponent">
      <div class="form" v-show="formActive == 1">
        <group class="inputItem">
          <x-input label-width="auto" class="input" placeholder-align="left" text-align="left"
                   placeholder="请输入商家绑定手机号" ref="name" required v-model="agentPhone" disabled>
            <div class="inputTitle" slot="label">商家绑定手机号: </div>
          </x-input>
        </group>
        <group class="inputItem">
          <x-input label-width="auto" class="input" placeholder-align="left" text-align="left"
                   placeholder="请输入法人姓名" :max="5" ref="legalName" required v-model="form1.legalName">
            <div class="inputTitle" slot="label"><span class="requestSpan"> * </span>法人姓名: </div>

          </x-input>
        </group>
        <group class="inputItem">
          <x-input label-width="auto" class="input" placeholder-align="left" text-align="left"
                   placeholder="请输入法人手机号" ref="contactPhone" required v-model="form1.contactPhone" :is-type="phoneType">
            <div class="inputTitle" slot="label"><span class="requestSpan"> * </span>法人手机号: </div>

          </x-input>
        </group>
        <group class="inputItem">
          <x-input label-width="auto" class="input" placeholder-align="left" text-align="left"
                   placeholder="请选择法人证件类型" ref="idcardType" required v-model="form1.idcardType" disabled>
            <div class="inputTitle" slot="label"><span class="requestSpan"> * </span>法人证件类型: </div>

          </x-input>
        </group>
        <group class="inputItem">
          <x-input label-width="auto" class="input" placeholder-align="left" text-align="left"
                   placeholder="请输入法人证件号码" ref="legalIdcard" required v-model="form1.legalIdcard" :is-type="idcardType">
            <div class="inputTitle" slot="label"><span class="requestSpan"> * </span>法人证件号码: </div>

          </x-input>
        </group>
        <group class="inputItem last groupCard">
          <div slot="title" class="inputTitle">
            <span class="requestSpan"> * </span>身份证照片:
          </div>
          <div class="uploadImgList">
            <div class="item" v-for="(x,index) in imgList1" :key="index">
              <label :for="'file'+index" @click="uploadImg(index)">
                <div class="addImgBut" v-if="!userImgList1[index]">
                  <img :src="x.img" alt="">
                  <div>{{x.label}}</div>
                </div>
                <div class="img_success" v-if="userImgList1[index]">
                  <img :src="userImgList1[index]" alt="图片" :class="'img'+index">
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
      <div class="form" v-show="formActive == 2">
        <group class="inputItem">
          <x-input label-width="auto" class="input" placeholder-align="left" text-align="left"
                   placeholder="请输入商家中文名称" ref="shopName" :max="20" required v-model="form2.shopName">
            <div class="inputTitle" slot="label"><span class="requestSpan"> * </span>商家中文名称: </div>
          </x-input>
        </group>
        <group class="inputItem">
          <x-input label-width="auto" class="input" placeholder-align="left" text-align="left"
                   placeholder="请输入商家英文或拼音名称" ref="shopNameEng" v-model="form2.shopNameEng">
            <div class="inputTitle" slot="label">商家英文名称: </div>
          </x-input>
        </group>
        <group class="inputItem">
          <x-input label-width="auto" class="input" placeholder-align="left" text-align="left"
                   placeholder="请输入商家简称" ref="shopNameShort" :max="10" required v-model="form2.shopNameShort">
            <div class="inputTitle" slot="label"><span class="requestSpan"> * </span>商家简称: </div>
          </x-input>
        </group>
        <group class="inputItem">
          <x-input label-width="auto" class="input" placeholder-align="left" text-align="left"
                   placeholder="格式:区号-号码,如0755-83785421" ref="regTel" :max="15" v-model="form2.regTel">
            <div class="inputTitle" slot="label">固定电话: </div>
          </x-input>
        </group>
        <group class="inputItem">
          <cell is-link @click.native="show2 = true">
            <div class="cellTitle" slot="title">
              <span class="requestSpan"> * </span>商户性质:
            </div>
            <div class="cellContent">
              <span class="selectValue">{{form2.agentType.name}}</span>
            </div>
          </cell>
        </group>
        <group class="inputItem">
          <cell is-link @click.native="show3 = true">
            <div class="cellTitle" slot="title">
              <span class="requestSpan"> * </span>行业类型:
            </div>
            <div class="cellContent">
              <span class="selectValue">{{form2.tradeType.name}}</span>
            </div>
          </cell>
        </group>
        <group class="inputItem">
          <x-input label-width="auto" class="input" placeholder-align="left" text-align="left"
                   placeholder="请输入实际经营地址" ref="businessAddress" :max="50" required v-model="form2.businessAddress">
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
          <x-address class="item" title="" v-model="form2.areaId" :list="addressData" ref="areaId" :placeholder="'请选择经营地区范围'">
            <div class="cellTitle" slot="title" slot-scope="props">
              <span class="requestSpan"> * </span>经营地区范围:
            </div>
          </x-address>

        </group>

        <group class="inputItem last groupCard">
          <div slot="title" class="inputTitle">
            <span class="requestSpan"> * </span>商家logo:
          </div>
          <div class="uploadImgList">
            <div class="item" v-for="(x,index) in imgList2" :key="index" v-if="index<1">
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
          </div>
        </group>
        <group class="inputItem last groupCard">
          <div slot="title" class="inputTitle">
            <span class="requestSpan"> * </span>营业执照/复印件照片:
          </div>
          <div class="uploadImgList">
            <div class="item" v-for="(x,index) in imgList2" :key="index" v-if="index<2 && index>0">
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
        </group>
        <group class="inputItem last groupCard">
          <div slot="title" class="inputTitle">
            <span class="requestSpan"> * </span>门店照片:
          </div>
          <div class="uploadImgList">
            <div class="item" v-for="(x,index) in imgList2" :key="index" v-if="index>1 && index<4">
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
          </div>
        </group>
        <group class="inputItem last groupCard">
          <div slot="title" class="inputTitle">
            租赁合同照片:
          </div>
          <div class="uploadImgList">
            <div class="item" v-for="(x,index) in imgList2" :key="index" v-if="index>3 && index<imgList2.length">
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
              <p>注册地址与经营地址不一致时需要上传</p>
            </div>
          </div>
          <br>
          <br>
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
          <popup v-model="show2" height="45%" class="popup">
            <div class="popupHead">
              <p>请选择商家性质</p>
              <span @click="show2 = false"><svg-icon slot="label" class="form_icon"
                                                     icon-class="close"></svg-icon></span>

            </div>
            <div class="contentPopup">
              <div class="item ripple" v-for="(x,index) in channelList1" :key="index" @click="selectChannelItem1(x)">
                <span class="name">{{x.name}}</span>
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
              <p>请选择行业类型</p>
              <span @click="show3 = false"><svg-icon slot="label" class="form_icon"
                                                     icon-class="close"></svg-icon></span>
            </div>
            <div class="contentPopup">
              <div class="item ripple" v-for="(x,index) in channelList2" :key="index" @click="selectChannelItem2(x)">
                <span class="name">{{x.name}}</span>
              </div>
              <div class="noData" v-if="channelList2.length == 0">
                暂无数据
              </div>
            </div>
          </popup>
        </div>

      </div>
      <div class="form" v-show="formActive == 3">
        <group class="inputItem">
          <cell is-link @click.native="show2 = true">
            <div class="cellTitle" slot="title">
              <span class="requestSpan"> * </span>账户类型:
            </div>
            <div class="cellContent">
              <span class="selectValue">{{menuActive.label}}</span>
            </div>
          </cell>
        </group>
        <group class="inputItem">
          <x-input label-width="auto" class="input" placeholder-align="left" text-align="left"
                   placeholder="请输入银行名称" ref="bankName" required v-model="form3.bankName">
            <div class="inputTitle" slot="label"><span class="requestSpan"> * </span>银行名称: </div>
          </x-input>
        </group>
        <group class="inputItem">
          <x-input label-width="auto" class="input" placeholder-align="left" text-align="left"
                   placeholder="请输入开户人姓名" ref="name3" required  v-model="form3.name">
            <div class="inputTitle" slot="label"><span class="requestSpan"> * </span>开户名称: </div>
          </x-input>
        </group>
        <group class="inputItem">
          <x-input label-width="auto" class="input" placeholder-align="left" text-align="left"
                   placeholder="请输入开户账户" ref="bankCard" required v-model="form3.bankCard">
            <div class="inputTitle" slot="label"><span class="requestSpan"> * </span>开户账户: </div>
          </x-input>
        </group>

        <actionsheet v-model="show2" :menus="menus1" :close-on-clicking-mask="false" show-cancel @on-click-menu="menuClick"></actionsheet>
        <div v-show="menuActive.menuType == 1">
          <!--对私-->
         <!-- <group class="inputItem">
            <x-input label-width="auto" class="input" placeholder-align="left" text-align="left"
                     placeholder="请输入预留手机号" ref="name" required>
              <div class="inputTitle" slot="label"><span class="requestSpan"> * </span>预留手机号: </div>
            </x-input>
          </group>-->
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
        <div v-show="menuActive.menuType == 2">
          <!--对公-->
          <group class="inputItem last groupCard">
            <div slot="title" class="inputTitle">
              <span class="requestSpan"> * </span>开户许可证照片:
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
  import {Group, XButton, XInput, Datetime, Cell, Popup, XAddress, Actionsheet } from 'vux';
  import icon_addphoto from "@/assets/merchant/icon_addphoto.png"
  //  import loadMap from '@/utils/loadMap.js'

  import vueamap from "@/components/VueAmap"
  import * as qiniu from 'qiniu-js';
  import jsondata from "@/json"

  export default {
    name: 'applicationForm',
    components: {
      Group,
      XButton,
      XInput,
      Datetime,
      Cell,
      Popup,
      vueamap,
      XAddress,
      Actionsheet
    },
    data() {
      return {
        phoneType: function (value) {
          if (!(/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/).test(value)) {
            return {
              valid: false,
              msg: "格式不正确!"
            }
          } else {
            return {
              valid: true,
            }
          }
        },
        idcardType: function (value) {

          if (!(/^(\d{18}|\d{17}x)$/).test(value)) {
            return {
              valid: false,
              msg: "格式不正确!"
            }
          } else {
            return {
              valid: true,
            }
          }
        },
        titleList: ['1.基本信息填写', '2.店铺信息填写', '3.结算信息填写'],
        imgList1: [{img: icon_addphoto, label: '身份证正面'}, {img: icon_addphoto, label: '身份证反面'}, {
          img: icon_addphoto,
          label: '手持身份证照片'
        }],
        imgList2: [{img: icon_addphoto, label: '商家logo照片'}, {img: icon_addphoto, label: '营业执照照片'}, {
          img: icon_addphoto,
          label: '门头照片'
        }, {
          img: icon_addphoto,
          label: '店内照片'
        }, {img: icon_addphoto, label: '租赁合同照片'}],
        imgList3: [{img: icon_addphoto, label: '开户许可证正面照'}],
        imgList4: [{img: icon_addphoto, label: '结算卡正面照片'}, {img: icon_addphoto, label: '结算卡反面照片'}],
        userImgList1: [],
        userImgList2: [],
        userImgList3: [],
        userImgList4: [],
        NuserImgList: [],
        channelList1: [
          {
            "id": "1",
            "name": "个体工商户"
          },
          {
            "id": "2",
            "name": "机关事业单位"
          },
          {
            "id": "3",
            "name": "国有企业、外/合资企业 "
          },
          {
            "id": "4",
            "name": "股份制企业、私营企业 "
          },
          {
            "id": "5",
            "name": "其它"
          }],
        channelList2: [
          {
            "id": "1",
            "name": "餐饮美食",
            "parentId": "0"
          },
          {
            "id": "2",
            "name": "酒店住宿",
            "parentId": "0"
          },
          {
            "id": "3",
            "name": "休闲娱乐",
            "parentId": "0"
          },
          {
            "id": "4",
            "name": "周边旅游",
            "parentId": "0"
          },
          {
            "id": "5",
            "name": "美容美发",
            "parentId": "1"
          },
          {
            "id": "6",
            "name": "家居装修",
            "parentId": "1"
          },
          {
            "id": "7",
            "name": "医疗健康",
            "parentId": "1"
          },
          {
            "id": "8",
            "name": "运动健康",
            "parentId": "1"
          },
          {
            "id": "9",
            "name": "生活服务",
            "parentId": "1"
          },
          {
            "id": "10",
            "name": "更多",
            "parentId": "2"
          }],
        show2: false,
        show3: false,
        show4: false,
        channel: 0,
        imgIndex1: 0,
        imgIndex2: 0,
        imgIndex3: 0,
        imgIndex4: 0,
        formActive: 3,
        form: {
          name: '',
          idCard: '',
          time2: '',
        },
        mapData: {
          address: '',
          lng: "",
          lat: "",
          edit: true
        },
        // 更多参考：https://lbs.amap.com/api/javascript-api/guide/abc/plugins#plugins
        MapShow: false,
        agentPhone: this.$store.getters.userInfo.phone,
        agentId: null,
        form1: {
          legalName: '',//法人姓名
          contactPhone: '',//联系人手机号
          idcardType: '身份证',//联系人手机号
          legalIdcard: '',//法人身份证
        },
        form2: {
          shopName: '',//商家名称中文
          shopNameEng: '',//商家英文(拼音)
          shopNameShort: '',//商家名称中文（简称）
          regTel: '',//注册(联系人)电话
          agentType: {},//商家性质
          tradeType: {},//行业类型
          businessAddress: '',//营业地址
          areaId: [],//地域id
          lng: '',//经度
          lat: '',//纬度
        },
        form3:{
          isCompany:2,//账户类型:1对私2对公
          bankName:"",//银行名称
          name:"",//开户人姓名
          bankCard:"",//银行卡号
          bankId:''//银行卡id(有值时修改，null时新增)
        },
        menus1:[{
          label:'对公',
          menuType:'2',
        },{
          label:'对私',
          menuType:'1',
        }],
        menuActive:{
          label:"对公",
          menuType:"2"
        },
        addressData: jsondata.area,
      }
    },
    created() {

    },
    mounted() {

    },
    methods: {
      menuClick(key,item){
        if(key != 'cancel'){
          this.menuActive = item
        }
      },
      mapFun(data) {
        this.mapData = data
        this.MapShow = false
      },
      selectChannelItem1(x) {
        //商家性质选择
        this.form2.agentType = x
        this.show2 = false
      },
      selectChannelItem2(x) {
        //商家性质选择
        this.form2.tradeType = x
        this.show3 = false
      },
      changeFormActive(index) {
        if (this.formActive > index + 1) {
          this.formActive = index + 1
          return
          this.getAddAgent(this.formActive)


        }
      },
      getAddAgent(x) {
        this.$axiosApi.getAddAgent(x).then(res => {
          if (res.code == 200) {

            if (x == 1) {

            } else if (x == 2) {

            } else if (x == 3) {

            }

          } else {
            this.$vux.alert.show({
              title: '提示',
              content: res,
              onShow() {
              },
              onHide() {
              }
            })
          }
        })
      },
      submit() {

        if (this.formActive == 1) {

          let legalName = this.form1.legalName;//法人姓名
          let contactPhone = this.form1.contactPhone;//联系人手机号
          let legalIdcard = this.form1.legalIdcard;//法人身份证

          if (this.$refs.legalName.valid && this.$refs.contactPhone.valid && this.$refs.legalIdcard.valid && legalName.trim() != ""
            && contactPhone.trim() != "" && legalIdcard.trim() != '' && this.userImgList1.length == this.imgList1.length) {
            this.uploadImgToQiniu(this.userImgList1).then(res => {
              if (res) {
                let frontPhoto = res[0];//正
                let backPhoto = res[1];//反
                let handPhoto = res[2];//手

                let data = {
                  "legalName": legalName,//法人姓名
                  "contactPhone": contactPhone,//联系人手机号
                  "legalIdcard": legalIdcard,//法人身份证
                  "frontPhoto": frontPhoto,//正
                  "backPhoto": backPhoto,//反
                  "handPhoto": handPhoto,//手
                }
                console.log(data)
                return
                this.$axiosApi.part1(data).then(response => {
                  if (response.code == 200) {
                    this.agentId = response.data;
                    this.formActive += 1
                  } else {
                    this.$vux.alert.show({
                      title: '提示',
                      content: response.message,
                      onShow() {
                      },
                      onHide() {
                      }
                    })
                  }
                })

              }
            })

          } else {
            this.$vux.alert.show({
              title: '提示',
              content: '请完善信息',
              onShow() {
              },
              onHide() {
              }
            })
          }
        }
        else if (this.formActive == 2 && this.agentId!="") {

          let agentId = this.agentId;//商户id
          let shopName = this.form2.shopName.trim();//商家名称中文
          let shopNameShort = this.form2.shopNameShort.trim();//商家名称简称
          let shopNameEng = this.form2.shopNameEng;//商家英文(拼音)
          let regTel = this.form2.regTel.trim();//注册(联系人)电话
          let tradeType = this.form2.tradeType.id;//行业类型
          let agentType = this.form2.agentType.id;//商家性质
          let businessAddress = this.form2.businessAddress.trim();//营业地址
          let areaId = this.form2.areaId[2] || "";//地域id
          let lng = this.mapData.lng;//经度
          let lat = this.mapData.lat;//纬度

          if (agentId && agentId!="" && this.$refs.shopName.valid && this.$refs.shopNameShort.valid && this.$refs.regTel.valid && this.$refs.businessAddress.valid &&
            shopName !="" && shopNameShort !="" && regTel!="" && tradeType && agentType && businessAddress !="" && lng && lat && areaId!=""){

            if (this.userImgList2[0] && this.userImgList2[1] && this.userImgList2[2] && this.userImgList2[3]) {
              this.uploadImgToQiniu(this.userImgList2).then(res => {
                if (res) {
                  console.log(res)
                  let shopLogo = res[0];//商户logo
                  let licensePhoto = res[1];//营业执照(照片)
                  let shopFrontPhoto = res[2];//门头照片
                  let shopBackPhoto = res[3];//店内照片
                  let rentPhoto = res[4] || '';//租赁合同照片

                  let data = {
                    agentId:agentId,//商户id
                    shopName:shopName,//商家名称中文
                    shopNameShort:shopNameShort,//商家名称简称
                    shopNameEng:shopNameEng,//商家英文(拼音)
                    regTel:regTel,//注册(联系人)电话
                    tradeType:tradeType,//行业类型
                    agentType:agentType,//商家性质
                    businessAddress:businessAddress,//营业地址
                    areaId:areaId,//地域id
                    lng:lng,//经度
                    lat:lat,//纬度
                    shopLogo:shopLogo,//商户logo
                    licensePhoto:licensePhoto,//营业执照(照片)
                    shopFrontPhoto:shopFrontPhoto,//门头照片
                    shopBackPhoto:shopBackPhoto,//店内照片
                    rentPhoto:rentPhoto,//租赁合同照片
                  };

                  console.log(data)
                  return
                  this.$axiosApi.part2(data).then(response => {
                    if (response.code == 200) {
                      this.formActive += 1
                    } else {
                      this.$vux.alert.show({
                        title: '提示',
                        content: response.message,
                        onShow() {
                        },
                        onHide() {
                        }
                      })
                    }
                  })
                }
              })
            }else {
              this.$vux.alert.show({
                title: '提示',
                content: 'logo、营业执照、门店照片不能为空',
                onShow() {
                },
                onHide() {
                }
              })
            }
          }else {
            this.$vux.alert.show({
              title: '提示',
              content: '请完善信息',
              onShow() {
              },
              onHide() {
              }
            })
          }
        }
        else if (this.formActive == 3) {

          let agentId = this.agentId;//商户id
          let isCompany = this.menuActive.id;//账户类型:1对私2对公
          let bankName = this.form3.bankName;//银行名称
          let name = this.form3.name;//开户人姓名
          let bankCard = this.form3.bankCard;//银行卡号
          let bankId = null;//银行卡号

        }


        /*        if (this.formActive < this.titleList.length) {
                  this.formActive += 1
                } else if (this.formActive == 3) {
                  this.$router.go(-1)
                }*/


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

          if (this.formActive == 1) {
            this.$set(this.userImgList1, this.imgIndex1, x.target.result)
//          this.$set(this.NuserImgList, this.imgIndex1, files)
            this.imgList1[this.imgIndex1] = x.currentTarget.result
          } else if (this.formActive == 2) {
            this.$set(this.userImgList2, this.imgIndex2, x.target.result)
            this.imgList2[this.imgIndex2] = x.currentTarget.result
          } else if (this.formActive == 3) {
            this.$set(this.userImgList3, this.imgIndex3, x.target.result)
            this.imgList3[this.imgIndex3] = x.currentTarget.result
          }


       //   console.log(this.userImgList1)
        })
      }
      ,
      uploadImg(x) {
        this.imgIndex1 = x
        if (x == 0) {
          this.imgIndex1 = x
        }
      }
      ,
      //上传图片到七牛
      uploadImgToQiniu(upList) {
        let this_ = this
        return new Promise(function (resolve, reject) {
          this_.$axiosApi.getAuth().then(response => {
            if (response.code == 200) {
              var uploadToken = response.data
              let imgList = []
              for (let i = 0; i < upList.length; i++) {
                let img = new Image();
//                  img.src = this.userImgList1[i];
                img.src = upList[i];
                let Nfile = this_.imgCompress(img, {quality: 0.4})
                let key = new Date().getTime() + i + this_.$Cookie.getToken().substring(this_.$Cookie.getToken().length - 12, this_.$Cookie.getToken().length) + Nfile.imgType
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
                    if (imgList.length == upList.length) {
                      resolve(imgList);
                    }
                  }
                })
              }
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
