<template>

  <div class="MerchantCA">
    <div class="headTitle">
      <img :src="agentInfo.frontPhoto | imgUrl" alt="logo" class="title_logo">
      <div class="h_title">{{agentInfo.shopName}}</div>
    </div>

    <div class="performanceData">
      <div class="top_data">
        <div class="item">
          <span class="number">¥{{agentInfo.dayData.amount | formatMoney}}</span>
          <span>今日收入</span>
        </div>
        <div class="item">
          <span class="number">{{agentInfo.dayData.count}}</span>
          <span>今日订单</span>
        </div>
        <div class="item">
          <span class="number">¥{{agentInfo.monthData.amount | formatMoney}}</span>
          <span>本月收入</span>
        </div>
      </div>
      <div class="bottom_but">
        <div class="item" @click="toOperatingIncome">
          <img src="@/assets/merchant/icon_sjzx.png" alt="">
          <span>营业收入</span>
        </div>
        <div class="item" @click="toEarnings">
          <img src="@/assets/merchant/icon_sytx.png" alt="">
          <span>收益提现</span>
        </div>
      </div>
    </div>

    <div class="eCharts">
      <e-charts-bar :AgentChart="AgentChart" v-if="AgentChart"></e-charts-bar>
    </div>

    <div class="cellList">
      <group>
        <cell :title="x.title" :value="x.value" @click.native="onClick(x)" v-for="(x,index) in cellList" :key="index"
              :is-link="x.type=='url'" class="cellItem"></cell>
      </group>
    </div>

    <div>
      <x-dialog v-model="showToast" class="dialog-CA" :dialog-style="{'max-width': '80%'}">
        <div class="dialogContent">
          <div class="content1" v-show="showContent">
            <div class="d_head">离开店只差一步啦~</div>
            <p class="label_title">订单获取U米比例设置：</p>
            <div class="select_but" @click="showContent = false">
              <div class="left" v-if="selectActive == 'none'">不返还U米</div>
              <div class="left" v-else>
                返还金额{{selectList[selectActive].value1}}%的U米={{selectList[selectActive].value2}}折
              </div>
              <div class="right"><img src="@/assets/merchant/icon_down.png" alt=""></div>
            </div>
            <div class="d_tip">
              <p>提示：</p>
              <p>1、例如商家收款100元，返还设置比例100%
                （7折），则订单营销服务费30元，商家实际
                到账70元，用户获得100U米。</p>
              <p>2、返还U米比例可随时在商家中心修改。</p>
            </div>
          </div>
          <div class="content2" v-show="!showContent">
            <div class="content2_head">
              <div class="left" @click="showContent = true">
                <svg-icon class="form_icon" icon-class="left"></svg-icon>
              </div>
              <span>U米比例设置</span>
            </div>
            <div class="list">
              <div class="item" v-for="(x,index) in selectList" :key="index" @click="selectFun(x.value,index)">
                <div class="left leftBG">{{x.value2}}折</div>
                <div class="text">返还金额{{x.value1}}%的U米={{x.value2}}折</div>
                <div class="active" v-show="ratio == x.value"><img src="@/assets/merchant/icon_select.png" alt="">
                </div>
              </div>
              <div class="item" @click="selectFun(0,'none')">
                <div class="left"></div>
                <div class="text">不返回U米</div>
                <div class="active" v-show="ratio == 0"><img src="@/assets/merchant/icon_select.png" alt="">
                </div>
              </div>
            </div>
          </div>
          <div class="d_foot_but" v-if="showContent" @click="subCoin">
            确 定
          </div>
        </div>
      </x-dialog>
    </div>

  </div>

</template>

<script>

  import eChartsBar from "@/components/eChartsBar"
  import {Group, Cell, XDialog} from 'vux'

  export default {
    name: 'MerchantCA',
    components: {
      eChartsBar,
      Group,
      Cell,
      XDialog
    },
    data() {
      return {
        cellList: [{
          title: '商家信息',
          type: 'url',
          url: "/MerchantEdit",
          value: '',
          funType: 'url'
        }, {
          title: '收款码',
          type: 'url',
          url: "/qrCode",
          value: '',
          funType: 'url'
        }, {
          title: '评论管理',
          type: 'url',
          url: "/evaluateInfo",
          value: '',
          funType: 'url'
        },
          {
          title: '相册管理',
          type: 'url',
          url: "/merchantPhoto",
          value: '',
          funType: 'url'
        },
          {
          title: '帮助中心',
          type: 'url',
          url: "/HelpCenterApp",
          value: '',
          funType: 'url'
        }/*, {
          title: '分享店铺',
          type: 'url',
          url: "/HelpCenter",
          value: '',
          funType: 'url'
        }*/],
        showToast: false,
        showContent: true,
        selectList: [
          {value1: '100', value2: '7',value:'10'},
          {value1: '90', value2: '7.3',value:'9'},
          {value1: '80', value2: '7.6',value:'8'},
          {value1: '70', value2: '7.9',value:'7'},
          {value1: '60', value2: '8.2',value:'6'},
          {value1: '50', value2: '8.5',value:'5'},
          {value1: '40', value2: '8.8',value:'4'},
          {value1: '30', value2: '9.1',value:'3'},
          {value1: '20', value2: '9.4',value:'2'},
          {value1: '10', value2: '9.7',value:'1'},
        ],
        selectActive: 0,
        ratio: 10,
        agentId: this.$store.getters.agentInfo.agentId,
        agentInfo:{
          dayData:{},
          monthData:{},
        },
        AgentChart:null,

      }
    },
    created() {
      if(!this.$Cookie.getAgentIntroduce()){
        this.showToast = true
      }
      this.getData()
      this.getChart()
    },
    methods: {
      toOperatingIncome(){
        this.$router.push({
          path:'/OperatingIncome?agentId='+this.agentId
        })
      },
      toEarnings(){
        this.$router.push({
          path:'/earnings?agentId='+this.agentId
        })
      },
      subCoin() {
        let data = {
          agentId: this.agentId,
          ratio: this.ratio
        }

        this.$axiosApi.agentIntroduceUpd(data).then(res => {
          if (res.code == 200) {
            this.showToast = false
            this.$Cookie.setAgentIntroduce('true')
            this.$vux.toast.show({text:'设置成功'})
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
      selectFun(x,index) {
        console.log(x)
        this.selectActive = index
        this.ratio = x
      },
      onClick(x) {

        if (x.funType == 'url') {
          console.log(x)
          this.$router.push({
            path: x.url+'?agentId='+this.agentId
          })
        } else if (x.funType == 'AppUrl') {

          if (this.$EnvironmentAI() == 1) {
            window.app.contactService()
          } else if (this.$EnvironmentAI() == 2) {
            try {
              window.app.contactService()
            } catch (err) {
              window.webkit.messageHandlers.contactService.postMessage({})
            }
          }


        }
      },
      getData() {
        let data = {
          agentId:this.agentId
        }
        this.$axiosApi.agentCenter(data).then(res=>{
          if(res.code == 200){
            this.agentInfo = res.data
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
      getTime(){
        let m = (new Date().getMonth() + 1)
        if(m<10){
          m = '0'+m
        }
        return (new Date().getFullYear()) + '-' + m
      },
      getChart(){
        let data = {
          agentId:this.agentId,
          time:this.getTime(),
        }
        this.$axiosApi.findAgentChart(data).then(res=>{
          if(res.code == 200){

            let dataList = res.data.monthAccountRecord

            let list1 = dataList.map((v,index)=>{
              let z = index+1;
              if(z<10){
               z = '0' + z
              }
              return z
            });
            let list2 = dataList.map((v,index)=>{
              return v.amount
            })
            this.AgentChart = {
              data:list2,
              xList:list1
            }
            console.log(this.AgentChart)
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
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less">



</style>
