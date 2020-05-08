<!--付款-->
<template>

  <div class="payment">

    <div class="pay_content vux-scrollable">

      <div class="p_head">
        <img :src="shopLogo" alt="" class="shopLogo">
        <p class="shopName">{{shopName}}</p>
      </div>

      <divider class="dividerText">支付金额</divider>
      <div class="payAmount">
        <div class="diy_input diy_input_b" @click="diyInput">
          <div class="input_num">
            <span class="amountIcon">¥</span>
            {{form.amount}}
          </div>
        </div>
      </div>

      <div v-if="environment == 2">
        <divider class="dividerText">支付方式</divider>
        <div class="payType">
          <div class="item" @click="form.radioValue = 7">
            <div class="label">
              <img :src="icon_weixin2" alt="" class="pay_logo">
              微信
            </div>
            <div class="typeRadio">
              <img :src="form.radioValue==7?icon_choose:icon_choose_empty" alt="" class="icon_choose">
            </div>
          </div>
          <div class="item" @click="form.radioValue = 6">
            <div class="label">
              <img :src="icon_zhifubao" alt="" class="pay_logo">
              支付宝
            </div>
            <div class="typeRadio">
              <img :src="form.radioValue==6?icon_choose:icon_choose_empty" alt="" class="icon_choose">
            </div>
          </div>
        </div>
      </div>

      <div class="formInfo" v-else-if="environment == 1 || environment == 3">
        <divider class="dividerText">手机号</divider>

        <group class="form_item">
          <div class="diy_input diy_input_b diy_input_phone" @click="stopKeyborad">
            <div class="icon">
              <img :src="icon_phone" alt="">
            </div>
            <div v-if="form.phone == ''" class="placeholder">
              请输入手机号
            </div>
            <div class="input_num phone_num" v-else>
              {{form.phone}}
            </div>
          </div>
          <div class="info_p">
            <div class="left">
              温馨提示：
            </div>
            <div class="right">
              <p class="pInfo">未填写返还U米手机号将无法获得U米。</p>
              <p class="pInfo">填写的手机号码需为小米粒账号，否则无法获得U米。</p>
            </div>
          </div>
        </group>
      </div>

      <popup v-model="popupShow" position="bottom" :show-mask="false" :hide-on-blur="false">
        <div class="popupContent">
          <div class="popup_head">
            <div class="diy_input">
              <div class="input_num" v-if="keyboardType == 1">
                <span class="amountIcon">¥</span>
                {{form.amount}}
              </div>
              <div class="input_num" v-if="keyboardType == 2">
                {{form.phone}}
              </div>
            </div>
          </div>
          <div class="keyboard">
            <div class="left">
              <div class="item hoverActive" v-for="x in 12" @click.stop="numberClick(x)">
                <span v-if="x == 10">·</span>
                <span v-else-if="x == 11">0</span>
                <span v-else-if="x == 12" class="down"></span>
                <span v-else>{{x}}</span>
              </div>
            </div>
            <div class="right">
              <div class="delete hoverActive" @click.stop="numberClick(13)">
                <!--<img :src="icon_cancel2" alt="" draggable="false" style="user-select: none;">-->
                <span class="icon_cancel"></span>
              </div>
              <div class="payEdit" @click.stop="numberClick(14)">
                支付
              </div>
            </div>
          </div>
        </div>
      </popup>
    </div>

  </div>

</template>

<script>
  import shopLogo from "@/assets/images/pic_sort4.png"
  import icon_weixin2 from "@/assets/images/icon_weixin2.png"
  import icon_zhifubao from "@/assets/images/icon_zhifubao@3x.png"
  import icon_choose from "@/assets/images/icon_choose.png"
  import icon_choose_empty from "@/assets/images/icon_choose-empty.png"
  import icon_pack_up from "@/assets/images/icon_pack_up.png"
  import icon_cancel2 from "@/assets/images/icon_cancel2.png"
  import icon_phone from "@/assets/images/icon_phone@2x.png"
  import {formatMoney, imgUrl, environment} from "@/filters"

  import {Popup, Divider, Group, XInput,} from 'vux'

  export default {
    name: 'payment',
    components: {
      Popup,
      Divider,
      Group,
      XInput,
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
        shopLogo: "",
        icon_weixin2: icon_weixin2,
        icon_zhifubao: icon_zhifubao,
        icon_choose: icon_choose,
        icon_choose_empty: icon_choose_empty,
        icon_pack_up: icon_pack_up,
        icon_cancel2: icon_cancel2,
        icon_phone: icon_phone,
        shopName: "",
        popupShow: false,
        readonly: true,
        keyboardType: 1,
        brandId: '',
        environment: '',
        form: {
          phone: '',
          amount: '',
          userId: '',
          agentId: '',
          radioValue: 7,//7微信6支付宝
        },
        amountDisabled: false
      }
    },
    created() {
      this.form.userId = this.$route.query.userId
      this.form.agentId = this.$route.query.agentId
      this.form.brandId = this.$route.query.brandId
      if (this.$route.query.amount && this.$route.query.amount != 'null') {
        this.form.amount = this.$route.query.amount
        this.amountDisabled = true
      }
      //    console.log(this.agentId)

      this.form.phone = this.$Cookie.getwxUserPhone() || ""

      this.environment = environment()
//      this.environment = 3
      if(this.environment != 2){
        this.popupShow = false
      }else {
        this.popupShow = true
      }
      //1微信2手机app3支付宝4其他
      if (this.environment == 4) {
        this.$router.push({
          path: '/errorPayPage?userId=' + this.form.userId
        })
        console.log('其他浏览器')
      }
      this.getData()

    },
    methods: {
      diyInput() {
        if (this.keyboardType != 1) {
          this.popupShow = false
          setTimeout(() => {
            this.popupShow = true
          }, 100)
        } else {
          this.popupShow = true
        }
        this.keyboardType = 1


      },
      stopKeyborad() {
        if (this.keyboardType != 2) {
          this.popupShow = false
          setTimeout(() => {
            this.popupShow = true
          }, 100)
        } else {
          this.popupShow = true
        }
        this.readonly = true
        this.keyboardType = 2
        setTimeout(() => {
          this.readonly = false
        }, 200);

      },
      getData() {
        this.$vux.loading.show({
          text: '加载中...'
        })
        let agentId = this.form.agentId
        if (agentId == undefined || agentId == "" || this.form.brandId == "" || this.form.brandId == undefined) {
          this.$router.push({
            path: '/404'
          })
        }
        this.$axiosApi.getAgentH5(agentId).then(res => {
          if (res.code == 200) {
            this.shopLogo = imgUrl(res.data.frontPhoto)
            this.shopName = res.data.shopName
          } else {
            this.$vux.alert.show({
              title: '提示',
              content: res.message,
              onShow() {
              },
              onHide() {
              }
            })
          }
          this.$vux.loading.hide()
        })
      },
      numberClick(x) {

        if (this.keyboardType == 1) {
          if (this.amountDisabled && x != 12 && x != 14) {
            return
          }
          if (x == 12) {
            //显示
            this.popupShow = false
          } else if (x < 12) {
            let num = x

            if (this.form.amount.indexOf('.') > -1 && (this.form.amount.length - this.form.amount.indexOf('.')) > 2) return false;
            if (x == 11) {
              if (this.form.amount != "" && Number(this.form.amount) == 0 && x != 10 && this.form.amount.length == 1) return false;
              num = 0
            }
            if (x == 10) {
              if (this.form.amount.indexOf('.') > -1 || this.form.amount == "") return false;
              num = '.'
            }
            if (Number(Number(this.form.amount + String(num))) >= 1000000) return false
            if (this.form.amount != "" && Number(this.form.amount) == 0 && x != 10 && this.form.amount.length == 1) return false;
            this.form.amount += String(num)
          } else if (x == 13) {
            this.form.amount = this.form.amount.substring(0, this.form.amount.length - 1)
          } else if (x == 14) {
            this.submit()
          }
        } else if (this.keyboardType == 2) {
          if (x == 12) {
            //显示
            this.popupShow = false
          } else if (x < 12) {
            let num = x

            if (this.form.phone.indexOf('.') > -1 && (this.form.phone.length - this.form.phone.indexOf('.')) > 2) return false;
            if (x == 11) {
              if (this.form.phone == "") return false;
              num = 0
            }
            if (x == 10) {
              return
              if (this.form.phone.indexOf('.') > -1 || this.form.phone == "") return false;
              num = '.'
            }
            if (Number(Number(this.form.phone + String(num))) >= 99999999999) return false
            if (this.form.phone != "" && Number(this.form.phone) == 0 && x != 10 && this.form.phone.length == 1) return false;
            this.form.phone += String(num)
          } else if (x == 13) {
            this.form.phone = String(this.form.phone).substring(0, this.form.phone.length - 1)
          } else if (x == 14) {
            this.submit()
          }
        }


      },
      submit() {

        // this.$Cookie.setwxUserPhone(this.from.phone,100000000)

        let agentId = this.form.agentId
        let amount = Number(this.form.amount) * 100
//        let payType = this.form.radioValue
        let payType
        if (this.environment == 2) {
          payType = this.form.radioValue
          if (payType == 7) {
            this.$vux.alert.show({
              title: '提示',
              content: "请使用微信扫码",
              onShow() {
              },
              onHide() {
              }
            })
            return
          }

        } else {
          payType = this.environment == 1 ? 7 : 6
        }

        let brandId = this.form.brandId
        let appType = this.environment

        if (this.environment == 1 && this.form.phone == "") {
          this.$vux.alert.show({
            title: '提示',
            content: '请输入手机号',
            onShow() {
            },
            onHide() {
            }
          })
          return
        } else {

        }
        let phone = String(this.form.phone)
        if (amount < 10) {
          this.$vux.toast.show({
            text: '最低付款不得小于0.1元',
            width: '20em',
            type: 'text'
          })
          return
        }
        this.$Cookie.setwxUserPhone(this.form.phone)
        this.$vux.loading.show({
          text: '请稍候...'
        })
        this.$axiosApi.scanOrder(agentId, amount, payType, brandId, appType, phone).then(res => {
          if (res.code == 200) {
            this.$vux.loading.hide()
            if (res.data.respCode == 10000) {
              window.location = res.data.data
            }else {
              this.$vux.alert.show({
                title: '提示',
                content: res.data.respMessage,
                onShow() {
                },
                onHide() {
                }
              })
            }
          } else {
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
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less">

  .payment {
    min-height: 100vh;
    user-select: none;
    .weui-cells {
      margin-top: 0;
    }
    .diy_input {
      background-color: #F4F4F4;
      height: 5rem;
      font-size: 2.625rem;
      color: #323232;
      display: flex;
      align-items: center;
      justify-content: center;
      .input_num {
        display: flex;
        align-items: baseline;
        justify-content: center;
      }
      .amountIcon {
        font-size: 1.875rem;
        margin-right: 0.875rem;
      }
    }
    .diy_input_phone {
      position: relative;
      .icon {
        position: absolute;
        left: 2.7rem;
        width: 3.375rem;
        height: 3.375rem;
      }
      .placeholder {
        color: #BDBDBD;
        font-size: 1.875rem;
      }
    }
    .diy_input_b {
      border-radius: 2.75rem;
      border: 4px solid #F0F0F0;

    }
    .pay_content {
      min-height: 100vh;
      .p_head {
        padding: 3rem 2rem;
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        .shopLogo {
          width: 5.5rem;
          height: 5.5rem;
          border-radius: 1rem;
          margin-right: 1.875rem;
        }
        .shopName {
          font-size: 1.875rem;
          color: #323232;
        }
      }
      .dividerText {
        font-size: 1.75rem;
        color: #646464;
        padding: 0 1.75rem;
        overflow: auto;
      }
      .payAmount {
        margin: 2rem 0;
        padding: 0 1.875rem;

      }
      .payType {
        padding: 0 6.25rem;
        margin-top: 2.25rem;
        .item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.75rem;
          &:last-child {
            margin-bottom: 0;
          }
          .label {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            font-size: 1.75rem;
            color: #323232;
            .pay_logo {
              width: 3.375rem;
              height: 3.375rem;
              margin-right: 1.25rem;
            }
          }
          .typeRadio {
            .icon_choose {
              width: 2.25rem;
              height: 2.25rem;
            }
          }
        }
      }
      .formInfo {
        .form_item {
          padding: 1.875rem 1.875rem 0;
          .item {
            background-color: #f4f4f4;
            padding: 2rem 0;
            font-size: 1.875rem;
            color: #323232;
            border-radius: 2px;
          }
        }
        .info_p {
          display: flex;
          align-items: baseline;
          justify-content: flex-start;
          font-size: 1.375rem;
          color: #646464;
          margin-top: 1rem;
          .pInfo {
            margin-top: 0.5rem;
          }
        }

      }
      .popupContent {
        /*background-color: #ffffff;*/
        .popup_head {
          background-color: #F4F4F4;
          .diy_input {
            background-color: #F4F4F4;
            height: 7.35rem;
            font-size: 4.25rem;
            color: #323232;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 2px;
            font-family: 'PingFang SC';
            font-weight: bold;
            .input_num {
              display: flex;
              align-items: baseline;
              justify-content: center;
            }
            .amountIcon {
              font-size: 2.625rem;
              margin-right: 0.875rem;
            }
          }
        }
        .keyboard {
          background-color: #ffffff;
          display: flex;
          align-items: stretch;
          justify-content: space-between;
          border-top: 1px solid #EAEAEA;
          .hoverActive:active {
            background-color: #f4f4f4;
          }
          .left {
            flex: 1;
            display: flex;
            flex-wrap: wrap;
            .item {
              width: calc(33.33% - 1px);
              height: 6.25rem;
              font-size: 3.25rem;
              display: flex;
              align-items: center;
              justify-content: center;
              border-right: 1px solid #EAEAEA;
              border-bottom: 1px solid #EAEAEA;
              .down {
                width: 3rem;
                height: 2.5rem;
                background: url('~@/assets/images/icon_pack_up.png') center center no-repeat;
                background-size: cover;
              }
            }
          }
          .right {
            width: 11.625rem;
            > div {
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .delete {
              height: 25%;
              .icon_cancel {
                width: 3.375rem;
                height: 2.5rem;
                background: url('~@/assets/images/icon_cancel2.png') center center no-repeat;
                background-size: cover;
              }
            }
            .payEdit {
              height: 75%;
              background-color: #F89F04;
              font-size: 2.625rem;
              color: #ffffff;
              &:active {
                opacity: 0.9;
              }
            }
          }
        }
      }
    }
  }

</style>
