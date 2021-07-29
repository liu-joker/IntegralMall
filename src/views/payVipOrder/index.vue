<template>
  <div class="payVip">
      <div class="pay_vip_head">
        <img src="../../assets/images/payVip.jpg" alt="">
      </div>
      <div class="pay_vip_cont">
            <div class="pay_vip_payment">
                <div class="pay_title">订购金额</div>
                <div class="pay_title_amount">
                    <div>&yen;{{money}}</div>
                    <div><span>x</span> 1</div>
                </div>
            </div>
            <div class="C_head">
                <div class="headTitle">
                    <!-- <span class="b_tag"></span> -->
                    <span>收货地址</span>
                </div>
                <div class="addAddress">
                    <div class="AddressContent"  v-if="!AddressInfo.areaName || !AddressInfo.name || !AddressInfo.phone" @click="changeAddress(0)">
                        <svg-icon slot="label" class="form_icon" icon-class="add2"></svg-icon>
                        新增收货地址
                    </div>
                    <div class="AddressInfo" v-else @click="changeAddress(1)">
                        <p>{{AddressInfo.name}}</p>
                        <p>{{AddressInfo.phone}}</p>
                        <p>{{AddressInfo.areaName}} {{AddressInfo.address}}</p>
                    </div>
                </div>
            </div>
            <div class="pay_fear">
                <div class="fear_title"> 
                    收货方式
                </div>
                <div class="fear_type"><div class="type_choose"></div> 快递</div>
            </div>
            <div class="pay_type">
                <div class="fear_title"> 
                    请选择支付方式
                </div>
                <div class="pay_choose">
                    <div class="zhifubao">
                        <div class="zhifubaoicon"><img src="../../assets/images/icon_zhifubao.png" alt=""></div>
                        <div class="zhifubao_msg">
                            <div class="msg_title">支付宝</div>
                            <div class="msg_info">高效、安全、专用（消费）的支付方式</div>
                        </div>
                    </div>
                    <div class="pay_select"><img src="../../assets/images/icon_select.png" alt=""></div>
                    
                </div>
            </div>
            <div class="pay_toPay" @click='pay' :class="{stop_pay:stop_pay}">立即开通</div>
      </div>
  </div>
</template>

<script>
export default {
  name:'payVipOrder',
  data(){
      return {
          AddressInfo: {
              name:'',
              phone:'',
              areaName:'',
          },
          token:'',
          gradeId:'',
          money:'',
          payType:'',
          orderNum:'',
          addressId:'',
          stop_pay:false,
      }
  },
  created(){
      console.log('this.$route',this.$route,window.location)
      this.token = this.$route.query.token
      this.money = this.$route.query.money
      this.gradeId = this.$route.query.gradeId
      this.$Cookie.setToken(this.token)
      this.getData()
     
  },
  methods:{
       changeAddress(x) {
           if(this.token){
                this.$router.push({path: '/ShoppingAddress?token='+this.token})
           }else{
                this.$router.push({path: '/ShoppingAddress'})
           }
       
      },
      getData(){
          this.$axiosApi.addressList().then(res => {
            if (res.code == 200) {
              this.AddressInfo = res.data.find(v => {
                return v.isDefault == 1
              }) || ""
         
            }
          })
        
        this.$axiosApi.memberChannel().then(res=>{
            if(res.code==200){
                this.payType = res.data[0]
              
            }else {
              this.$vux.alert.show({
                title: '提示',
                content: res.message,
                onShow () {
                },
                onHide () {
                }
              })
            }
        })
      },
      pay(){
          if(this.stop_pay){
            return
          }else{
             
            if(!this.AddressInfo.areaName || !this.AddressInfo.phone || !this.AddressInfo.name){
                this.$vux.toast.show({text:"请完善地址信息"})
                return
            } 

            
            let bankId =''
            let gradeId = this.gradeId
            let channelTag = this.payType
            this.$vux.loading.show({
                text: '请稍候...'
            })
          this.stop_pay = true
          this.$axiosApi.upgradeMembersNew(bankId,gradeId,channelTag).then(res=>{
              if(res.code==200){
                let orderNum = res.data.orderNum
                let addressId = this.AddressInfo.id
                console.log(res.data)
                this.$axiosApi.payMembersGift(orderNum,addressId).then(res=>{
                    if(res.code ==200){
                        
                        if(res.data.respCode==10000){
                            this.$vux.loading.hide()
                            this.stop_pay = false
                            window.location = res.data.data
                        }else {
                            this.stop_pay = false
                            this.$vux.alert.show({
                                title: '提示',
                                content: res.data.respMessage,
                                onShow () {
                                },
                                onHide () {
                                }
                            })
                        }

                    }else {
                        this.stop_pay = false
                        this.$vux.alert.show({
                            title: '提示',
                            content: res.message,
                            onShow () {
                            },
                            onHide () {
                            }
                        })
                    }
                    
                })
              }else {
                this.stop_pay = false
                this.$vux.alert.show({
                    title: '提示',
                    content: res.message,
                    onShow () {
                    },
                    onHide () {
                    }
                })
              }
          })
        }
      }
  }
}
</script>

<style lang='scss' scoped>
    .payVip{
        width:100%;
        position: absolute;
        top:0;
        left:0;
        bottom:0;
        right:0;
        background:#f4f4f4;
       
        .pay_vip_head{
            height:21.75rem;
            >img{
                height:100%;
            }
        }
        .pay_vip_cont{
            // width:43.125rem;
            position: absolute;
            left:1.875rem;
            right:1.875rem;
            top:12.5rem;
            z-index: 999;
            background:#fff;
            border-radius: 20px;
            display: flex;
            flex-direction: column;
            padding:1.875rem;
            // height:61.25rem;
            .pay_vip_payment{
                padding-bottom:1.875rem;
                border-bottom:2px solid #f4f4f4;
                .pay_title{
                    color: #9B9B9B;
                    font-size:1.3125rem;
                    margin-bottom:1.875rem;

                }
                .pay_title_amount{
                    display: flex;
                    justify-content: space-between;
                    width:100%;
                    >div{
                        color:#FB5845;
                        font-size:2.25rem;
                        >span{
                            color: #A4A596;

                        }
                    }
                }
            }
            .C_head {
                background-color: #ffffff;
                padding-bottom: 1.875rem;
                border-bottom:2px solid #f4f4f4;
                padding-top:1.875rem;
                .headTitle {
                        // display: flex;
                        // align-items: center;
                        // justify-content: flex-start;
                        font-size: 1.75rem;
                        color: #323232;
                    .b_tag {
                        width: 0.375rem;
                        height: 1.875rem;
                        display: block;
                    
                        border-radius: 0.175rem;
                        margin-right: 1.375rem;
                    }
                    }
                .addAddress {
                    padding-left: 1.75rem;
                    margin-top: 1.25rem;
                    .AddressContent {
                        background-color: #F4F4F4;
                        color: #8C8C8C;
                        font-size: 1.75rem;
                        padding: 1rem 2.25rem;
                        user-select: none;
                    &:active {
                        opacity: 0.9;
                    }
                    }
                    .AddressInfo {
                        color: #323232;
                        font-size: 1.75rem;
                    }
                }
            }
            .pay_fear {
               height:5.3125rem;
               border-bottom:2px solid #f4f4f4;
               display: flex;
               justify-content: start;
               align-items: center;
               font-size:1.75rem;
               color:#646464;
                .fear_type{
                    margin-left:1.875rem;
                     display: flex;
                     justify-content: start;
                    align-items: center;
                    .type_choose{
                        height:1.0625rem;
                        width:1.0625rem;                       
                        box-sizing: border-box;
                        border:0.3125rem solid #FC5845;
                        border-radius: 50%;
                        margin-right:0.6875rem;
                    }
                }
            }
            .pay_type{
               margin-top:1.875rem;
               display: flex;
               flex-direction: column;
               justify-content: center;
               align-items: start;
               font-size:1.75rem;
               color:#646464;
               .pay_choose{
                   margin-top:1.875rem;
                   margin-left:1.25rem;
                  
                   width:100%;
                   display: flex;
                   justify-content: space-between;
                   align-items: center;
                .zhifubao{
                     height:2.25rem;
                     display: flex;
                     align-items: center;
                    .zhifubaoicon{
                         width:2.25rem;
                        height:2.25rem;
                        >img{
                            height:100%;
                        }
                    }
                   .zhifubao_msg{
                       margin-left:1.25rem;
                       display: flex;
                       flex-direction: column;
                       justify-content: space-between;
                       .msg_title{
                           color: #323232;
                           font-size:1.375rem;

                       }
                       .msg_info{
                           color: #8C8C8C;
                           font-size:1.125rem;
                       }
                   }
                   
                }
                .pay_select{
                   height:2rem;
                   height:2rem;
                    margin-right:1.25rem;
                   >img{height:100%;}
               }
               }
               
            }
            .pay_toPay{
                width:33rem;
                height:3.8125rem;
                text-align: center;
                line-height:3.8125rem;
                font-size:1.875rem;
                color:#fff;
                background:#e8322c;
                border-radius: 20px;
                margin-top:9.375rem;
                margin-bottom:0.625rem;
                margin-left:3.5625rem;
            }
            .stop_pay{
                background:#A8A8A8;
                color:#fff;
            }
        }
    }
</style>