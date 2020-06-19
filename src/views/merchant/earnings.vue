<template>

  <div class="Earnings">
    <div class="contentE">
      <div class="head">
        <div>剩余可提现收益</div>
        <div class="number">¥{{showAmount | formatMoney}}</div>
      </div>
      <div class="cardCenter">
        <div class="cardHead">
          <div class="left">
            <!--<img src="@/assets/merchant/icon_screen_b.png" alt="">-->
            <span>{{bankInfo.bankName}} {{bankInfo.bankCard}}</span>
          </div>
          <div class="right">
            <span @click="toPush">提现记录</span>
          </div>
        </div>
        <group class="inputItem">
          <x-input label-width="2.5rem" class="input" type="number" placeholder-align="left" text-align="left"
                   title="¥" @on-blur="amountFun"
                   placeholder="请输入提现金额" v-model="amount" @input="amount>200000?amount = '200000':''"></x-input>
        </group>
        <p class="tip">提现单笔手续费0.5元</p>

        <div class="footBut">
          <x-button class="merchantBut EfootBut" @click.native="submit">提取收益</x-button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import {Group, XButton, XInput} from 'vux';

  export default {
    name: 'earnings',
    components: {
      Group,
      XButton,
      XInput,
    },
    data() {
      return {
        amount:'',
        bankInfo:{},
        showAmount:'',
        agentId:'',
      }
    },
    created() {
      this.agentId = this.$route.query.agentId

      this.findAgentSettle()
    },
    methods: {
      toPush(){
        this.$router.push({
          path:'/WithdrawalRecord'
        })
      },
      findAgentSettle(){
        let data = {
          agentId:this.agentId
        }
        this.$axiosApi.findAgentSettle(data).then(res=>{
          if(res.code == 200){
            this.bankInfo = res.data.bank[0]
            this.showAmount = res.data.amount
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
      },
      submit(){

        let amount = this.amount * 100
        let agentId = this.agentId
        let settleId = this.bankInfo.id
        if(!isNaN(amount)){
          if(agentId!='' && settleId!=""){


            if(amount<1000){
              this.$vux.toast.show({text:'提现金额不得低于10元'})
              return
            }

            let data = {
              amount:amount,
              agentId:agentId,
              settleId:settleId,
            }
            this.$axiosApi.repayAgent(data).then(res=>{
              if(res.code == 200){

                if(res.data.respCode == 10000){
                  this.findAgentSettle()
                  this.$vux.alert.show({
                    title: '提示',
                    content: '提现成功！',
                    onShow() {
                    },
                    onHide() {
                    }
                  })
                }else {
                  this.$vux.toast.show({text:res.data.respMessage})
                }
              }else {
                this.$vux.toast.show({text:res.message})
              }
            })
          }else{
            this.$vux.toast.show({text:'缺少参数'})
          }
        }else {
          this.$vux.toast.show({text:'金额格式错误'})
        }
      },
      amountFun() {
        //格式金额
        this.amount = this.amount > 200000?200000:this.amount
        return this.amount = Math.floor(this.amount * 1)
      },
    }
  }
</script>

<style rel="stylesheet/less" lang="less">


</style>
