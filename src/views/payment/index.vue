<!--付款-->
<template>

  <div class="payment">

    <div class="pay_content vux-scrollable">

      <div class="p_head">
        <img :src="shopLogo" alt="" class="shopLogo">
        <p class="shopName">{{shopName}}</p>
      </div>

      <divider class="dividerText" v-if='!payjifen'>支付金额</divider>
      <divider class="dividerText" v-else>支付积分</divider>
      <div class="payAmount">
        <div class="diy_input diy_input_b" @click="diyInput">
          <div class="input_num">
            <span class="amountIcon">¥</span>
            {{form.amount}}
          </div>
        </div>
      </div>
         <!-- v-if="environment == 2 && !EnvironmentalType" -->
      <div v-if="!EnvironmentalType">
        <divider class="dividerText">支付方式</divider>
        <div class="payType">
            <!-- v-if="environment==1 || environment==2" -->
          <div class="item" @click="form.radioValue = 7, payjifen = false" v-if="environment==1 || environment==2">
            <!-- <div class="item" @click="form.radioValue = 7, payjifen = false" > -->
            <div class="label">
              <img :src="icon_weixin2" alt="" class="pay_logo">
              微信支付
            </div>
            <div class="typeRadio">
              <img :src="form.radioValue==7?icon_choose:icon_choose_empty" alt="" class="icon_choose">
            </div>
          </div>
            <!--  v-if="environment==3 || environment==2" -->
          <!-- <div class="item" @click="form.radioValue = 6, payjifen = false" > -->
               <div class="item" @click="form.radioValue = 6, payjifen = false" v-if="environment==3 || environment==2">
            <div class="label">
              <img :src="icon_zhifubao" alt="" class="pay_logo">
              支付宝支付
            </div>
            <div class="typeRadio">
              <img :src="form.radioValue==6?icon_choose:icon_choose_empty" alt="" class="icon_choose">
            </div>
          </div>
          <div class="item" @click="form.radioValue = 8, payjifen = true" v-if='isJifen'>
            <div class="label">
              <img :src="icon_jifen" alt="" class="pay_logo">
              积分支付
            </div>
            <div class="typeRadio">
              <img :src="form.radioValue==8?icon_choose:icon_choose_empty" alt="" class="icon_choose">
            </div>
          </div>
        </div>
      </div>
         <!-- v-else-if="environment == 1 || environment == 3" -->
      <div class="formInfo"  v-if="environment == 1 || environment == 2 || environment == 3">
        
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
            <div class="left" style='width:8rem;'>
              温馨提示：
            </div>
            <div class="right">
              <p class="pInfo">1.支付宝或微信支付未填写返还U米手机号将无法获得U米。</p>
              <p class="pInfo">2.填写的手机号码需为{{brandName}}账号，否则无法获得U米。</p>
              <p class="pInfo">3.选择U米积分支付时填写的手机号码需为{{brandName}}账号并保证有足够的U米积分，否则无法支付成功。</p>
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
              <div class="item hoverActive" v-for="x in 12" @click.stop="numberClick(x)" :key="x">
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
    <!-- 密码键盘 -->
    <popup v-model="dialogShow" position="bottom" show-mask>
      <div class="popupD">
        <div class="head_p">
          <div class="passwordD">
            <div :class="index<password.length?'round':''" v-for="(x,index) in 6" :key="index"></div>
          </div>
        </div>
        <div class="center_p">
          <div class="Number">
            <div class="item" v-for="(x,index) in 12" :key="index" @click.stop="passClick(x)">
              <span v-if="x == 10"> </span>
              <span v-else-if="x == 11">0</span>
              <img v-else-if="x == 12" class="delete" :src="icon_cancel">
              <span v-else>{{x}}</span>
            </div>
          </div>
        </div>
      </div>
    </popup>
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
  import icon_jifen from "@/assets/images/icon_jifen.png"
  import {formatMoney, imgUrl, environment} from "@/filters"
  import brandIdList from "@/json/brandId.json"
  import {Popup, Divider, Group, XInput,} from 'vux'
  import icon_cancel from "@/assets/images/icon_cancel.png"

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
        isJifen:false,  //积分选择显隐
        payjifen:false,  //选中积分付款
        dialogShow:false, 
        password:'',
        shopLogo: "",
        icon_weixin2: icon_weixin2,
        icon_zhifubao: icon_zhifubao,
        icon_choose: icon_choose,
        icon_choose_empty: icon_choose_empty,
        icon_pack_up: icon_pack_up,
        icon_cancel2: icon_cancel2,
        icon_cancel:icon_cancel,
        icon_phone: icon_phone,
        icon_jifen:icon_jifen,
        shopName: "",
        popupShow: false,//按键
        readonly: true,
        keyboardType: 1,//1为金额 2为号码 3为积分（键盘上方显示内容）
        environment: '',
        form: {
          phone: '',
          brandId: '',
          amount: '',
          userId: '',
          agentId: '',
          radioValue: 7,//7微信6支付宝  
        },
        amountDisabled: false,
        EnvironmentalType: "",
      }
    },
    computed: {
      brandName:function () {
        let item = brandIdList.find(v=>{
          return v.brandId == this.form.brandId
        })
        console.log(item)
        return item.brandName
      }
    },
    created() {
      this.form.userId = this.$route.query.userId
      this.form.agentId = this.$route.query.agentId
      this.EnvironmentalType = this.$route.query.EnvironmentalType
      this.form.brandId = this.$route.query.brandId
      if (this.$route.query.amount && this.$route.query.amount != 'null') {
        this.form.amount = this.$route.query.amount
        this.amountDisabled = true
      }
      //    console.log(this.agentId)

      this.form.phone = this.$Cookie.getwxUserPhone() || ""
    //1微信2自家app3支付宝4其他5立支付环境
      this.environment = environment()
        
      console.log(environment())
   //   this.environment = 1


      if(this.environment != 2){
        this.popupShow = false
      }else {
        this.popupShow = true
      }
      // 1微信2手机app3支付宝4其他5立支付   
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
            if(res.data.pointAgent==1){
              this.isJifen = true
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
              
              if(this.payjifen)return false
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


        if(this.EnvironmentalType == 1){
          this.submit2()
          return
        }
        // this.$Cookie.setwxUserPhone(this.from.phone,100000000)
        
        let agentId = this.form.agentId
        let point = this.form.amount
        let amount = Number(this.form.amount) * 100
         //  let payType = this.form.radioValue
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

        if (this.form.phone == "") {
          this.$vux.alert.show({
            title: '提示',
            content: '请输入手机号',
            onShow() {
            },
            onHide() {
            }
          })
          return
        }
        if ( this.form.phone.length < 11) {
          this.$vux.alert.show({
            title: '提示',
            content: '手机号码格式不正确',
            onShow() {
            },
            onHide() {
            }
          })
          return
        }


        let phone = String(this.form.phone)
        if (amount < 1000) {
          this.$vux.toast.show({
            text: '最低付款不得小于10元',
            width: '20em',
            type: 'text'
          })
          return
        }
        this.$Cookie.setwxUserPhone(this.form.phone)
        // this.$vux.loading.show({
        //   text: '请稍候...'
        // })
        //积分支付
        if(this.payjifen){
            let poitn = String(this.form.amount)
            if(point.indexOf('.')!=-1){
              this.$vux.alert.show({
                title: '提示',
                content: '积分不能为小数',
                onShow() {
                },
                onHide() {
                }
             })
             return
            }
           
          
            this.popupShow =false
            setTimeout(() => {
              this.dialogShow =true
            }, 100);
          
             
        }else{
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
      },
      submit2(){
        let agentId = this.form.agentId
        let amount = Number(this.form.amount) * 100
        let brandId = this.form.brandId
        if (amount < 1000) {
          this.$vux.toast.show({
            text: '最低付款不得小于10元',
            width: '20em',
            type: 'text'
          })
          return
        }
        this.$axiosApi.lzfPay(agentId,brandId,amount).then(res=>{
          if(res.code == 200){

            if(res.data.respCode == 10000){
              let payOrderNo = res.data.data.payOrderNo
              let merchantId = res.data.data.merchantId
              let signatureAlgorithm = res.data.data.signatureAlgorithm
              let signatureInfo = res.data.data.signatureInfo
              ly.pay({
                "merchantId":merchantId,
                "payOrderNo":payOrderNo,
                "signatureAlgorithm":signatureAlgorithm,
                "signatureInfo":signatureInfo,
                "callback":function(result){
                  //处理支付结果
                  console.log(result)
                  if (result.status == 1) {
                    this.$vux.alert.show({
                      title: '提示',
                      content: '成功',
                      onShow() {
                      },
                      onHide() {
                      }
                    })
                  }else {
                    this.$vux.alert.show({
                      title: '提示',
                      content: result.failureDetails,
                      onShow() {
                      },
                      onHide() {
                      }
                    })
                  }
                }
              });
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
      passClick(x){
        let agentId = this.form.agentId
        // let agentId = 14  测试用 
        let point = Number(this.form.amount)
        let brandId = this.form.brandId
        // let brandId = 'deb99c1be8a748a59f760485fd49df15' 测试用
        let phone = String(this.form.phone)
        // let phone = '18576648626'  测试用 密码为123456
        let appType = this.environment
                if (x < 10 || x == 11) {
                  if (this.password.length == 6) {
                    return
                  }
                  let num = x == 11 ? 0 : x
              
                  this.password = this.password + String(num)
                  if (this.password.length == 6) {
                    let payPass = this.password
                    this.$vux.loading.show({
                      text: '请稍候...'
                    })
                  
                    this.$axiosApi.consumePoint(agentId,brandId,point,appType,payPass,phone).then(res=>{
                      this.$vux.loading.hide()
                      this.password = ""
                      this.dialogShow = false
                      if(res.code==200){
                        let that =this
                         let mphone = phone.substr(0, 3) + '****' + phone.substr(7);   
                          this.$vux.alert.show({
                            content: '支付成功',
                            onShow() {
                              
                            },
                            onHide: () => {this.$router.push({path:'/callbackPagejf?point='+point+'&phone='+mphone})
                            }
                          })
                      }else{
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
              }else if (x == 12) {
              this.password = this.password.substring(0, this.password.length - 1)
              
            }
         }
    }
  }
</script>

<style rel="stylesheet/less" lang="less">

.popupD {
      border-radius: 1.5rem 1.5rem 0 0;

      .head_p {
        padding: 3.75rem 1.875rem 1.875rem;
        .text {
          .amount {
            text-align: center;
            color: #646464;
            font-size: 1.75rem;
            .info_amount {
              color: #323232;
              padding: 1.875rem 6.25rem;
            }
          }

        }
        .passwordD {
          background-color: #F5F5F5;
          border: 2px solid #E8E8E8;
          border-radius: 2.75rem;
          height: 5.5rem;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-around;
          > div {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 5.25rem;
            width: 16.6%;
            flex: 1;
            border-right: 2px solid #E8E8E8;
            &.round:after {
              content: " ";
              display: block;
              width: 1.25rem;
              height: 1.25rem;
              background-color: #000000;
              border-radius: 0.625rem;
            }
            &:last-child {
              border: none;
            }
          }
        }
      }
      .center_p {
        .Number {
          display: flex;
          flex-wrap: wrap;
          .item {
            width: calc(33.33% - 2px);
            height: 7.12rem;
            display: flex;
            align-items: center;
            justify-content: center;
            border-top: 2px solid #E8E8E8;
            border-right: 2px solid #E8E8E8;
            font-weight: bold;
            font-size: 3rem;

            .delete {
              width: 4.875rem;
              height: 3rem;
            }
          }
        }
      }
    }

</style>
