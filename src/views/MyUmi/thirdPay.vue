<template>

  <div class="MyUmi" style="background:#fff">
    <div class="MyUmi_content">
      <img src="https://uat99oauth2.huaruntong.cn:10001/imgs/icon@3x1e80cc.png" alt="">
      <div class="num">
        <!-- <span>sssss</span> -->
        1U米可兑换50华润通积分
      </div>
      <div class="toUmiDetail">
        <!-- <span @click="toUmiDetail">查看U米明细>></span> -->
      </div>
    </div>
    <div class="MyUmi_choose">
      <div class="choose_one" v-for="(item,index) in UmiDetail" :key="index" @click='choose(item)' :class='choose_default == item.id?"choose_class":""'> 
        <div class="choose_text">U{{item.amount}}</div>
        <div class="choose_ico" v-if="choose_default == item.id"><img :src="choose_default == item.id?icon_choose:''" alt=""></div>
      </div>
      <!-- <p class="text_msg">U米默认转换到<span>余额</span>,转换手续费为转换金额的10%</p> -->
      <div class="Umi_but" @click='toAmount'>立即转换</div>
    </div>
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
  import icon_umi from "@/assets/images/icon_umi.png"
  import icon_choose from "@/assets/images/icon_choose@2x.png"
  import icon_cancel from "@/assets/images/icon_cancel.png"
    import {Popup, Divider, Group, XInput,} from 'vux'
  export default {
    name: 'thirdPay',
    components: {
      Popup,
      Divider,
      Group,
      XInput,
   
    },
    data() {
        
      return {
        icon_umi: icon_umi,
        icon_choose:icon_choose,
        UmiDetail:[
          {amount:10,id:1,},
          {amount:20,id:2,},
          {amount:50,id:3,},
          {amount:100,id:4,},
          {amount:200,id:5,},
          {amount:500,id:6,},
        ],
        choose_default:1,
        choose_amount:'',
        dialogShow:false,
        password:'',
        icon_cancel:icon_cancel,
        code:''
      }
    },
    mounted(){

    },
    created() {
    // if(this.$route.query.code){
       let code = this.$route.query.code 
       this.code = code
    // }
     if(this.$route.query.state){
       let token = this.$route.query.state
      this.$Cookie.setToken(token)
     }
      
      console.log('route',this.$route)
    // this.getData()
    },
    activated(){
    //   this.$store.dispatch('getUserInfo')
    },
    methods: {
      toUmiDetail(){
        this.$router.push({path: '/TheDetail'})
      },
      choose(v){
        this.choose_default=v.id
        this. choose_amount = v.amount
      },
      toAmount(){
        let coinType = this.choose_default
        let that = this
        

         this.$axiosApi.hrPointsOrder(coinType).then(res=>{
                      this.$vux.loading.hide()
                     
                      if(res.code==200){
                        let that =this
                       console.log(res.data)
                       this.orderNum = res.data
                       this.dialogShow = true
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
        return
       
        
      },
      passClick(x){
        // let agentId = this.form.agentId
        // let agentId = 14  测试用 
        // let point = Number(this.form.amount)
        // let brandId = this.form.brandId
        // let brandId = 'deb99c1be8a748a59f760485fd49df15' 测试用
        // let phone = String(this.form.phone)
        // let phone = '18576648626'  测试用 密码为123456
        // let appType = this.environment
       
                if (x < 10 || x == 11) {
                  if (this.password.length == 6) {
                    return
                  }
                  let num = x == 11 ? 0 : x
              
                  this.password = this.password + String(num)
                  if (this.password.length == 6) {
                    let password = this.password
                    let orderNum = this.orderNum
                    let code = this.code
                    this.$vux.loading.show({
                      text: '请稍候...'
                    })
                    console.log('hrPointsOrderPay',orderNum,password,code)
                    this.$axiosApi.hrPointsOrderPay(orderNum,password,code).then(res=>{
                      this.$vux.loading.hide()
                      this.password = ""
                      this.dialogShow = false
                      if(res.code==200){
                        let that =this
                        if(res.data.respCode==10000){
                          this.$vux.alert.show({
                            title:'提示',
                            content: res.data.respMsg,
                            onShow() {
                            },
                            onHide: () => {
                            }
                          })
                        }else if(res.data.respCode==10002){
                          this.$vux.alert.show({
                            title: '提示',
                            content: '未完成授权，请前往授权',
                            onShow() {
                               window.location.href = res.data.data
                            },
                            onHide() {
                            }
                          })
                           
                        }
                        
                        else{
                          this.$vux.alert.show({
                            title: '提示',
                            content: res.data.respMsg,
                            onShow() {
                            },
                            onHide() {
                            }
                          })
                        }
                          
                      }else{
                          // this.$vux.alert.show({
                          //   title: '提示',
                          //   content: res.message,
                          //   onShow() {
                          //   },
                          //   onHide() {
                          //   }
                          // })
                      }
                    })
                  }
              }else if (x == 12) {
              this.password = this.password.substring(0, this.password.length - 1)
              
            }
         },
         getData(){
             this.$axiosApi.hrPointsOrder(coinType).then(res=>{
                      this.$vux.loading.hide()
                     
                      if(res.code==200){
                        let that =this
                       console.log(res.data)
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
    }
  }
</script>

<style rel="stylesheet/less" lang="less">

.MyUmi_choose{
  margin-top:7.375rem;
  width:100%;
  display:flex;
  flex-wrap:wrap;
  display: -webkit-flex; 
  justify-content: space-evenly;
  // padding:7.375rem 1.875rem 0;
  .choose_one{
    width:13.125rem;
    height:7.5rem;
    display: flex;
    display: -webkit-flex; 
    position: relative;
    justify-content: center;
    align-items: center;
    border: 2px solid #DBDBDB;
    border-radius: 0.625rem;
    color: #636363;
    box-sizing: border-box;
    margin-bottom:1.875rem;
    .choose_text{
      font-size:2.375rem;
    }
    .choose_ico{
      width:3.125rem;
      height:3.125rem;
      position: absolute;
      bottom:0;right:0;
      img{width:100;}
    }
  }
  .choose_class{
    color:#AD812F;
    border: 4px solid #AD812F;
  }
  

}
.text_msg{
  margin-top:0.625rem;
  // padding-left:1.875rem;
  font-size:1.5rem;
  color: #636363;
  width:43.125rem;
  >span{
    color:#AD812F;
    font-weight: 600;
  }
}
.Umi_but{
  width:43.125rem;
  height:4.5rem;
  margin:0 1.875rem;
  border-radius: 10px;
  background: #2D2921;
  color:#fefefe;
  font-size:2.125rem;
  text-align: center;
  line-height:4.5rem;
  margin-top:10.3125rem;
}
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
