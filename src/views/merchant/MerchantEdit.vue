<template>

  <div class="MerchantEdit">
    <div class="headTitle">
      <img :src="agentInfo.frontPhoto | imgUrl" alt="logo" class="title_logo">
     <div class="right">
       <div class="h_title">{{agentInfo.shopName}}   <span class="type">{{agentInfo.tradeType | tradeType}}</span> </div>
       <div class="evaluate">
         <span class="start" :style="startStyle"></span>
         <span>4.5分</span>
       </div>
     </div>

    </div>

    <div class="businessAddress marginTop editItem">
        <div class="editContent">
          <div class="editTitle">
            营业地址
          </div>
          <div class="editCenter">
            广东省深圳市福田区车公庙天安数码城创新科技广场二期东座506
          </div>
        </div>
    </div>

    <div class=" marginTop editItem">
      <div class="editContent">
        <div class="editTitle">
          营业时间
        </div>
        <div class="editCenter">
          <group class="inputItem">
            <x-input label-width="1.5rem" class="input" type="text" placeholder-align="left" text-align="left"
                   title=" "  placeholder="请输入营业时间，如8:00-21:00（周日歇业）" v-model="openTime" ></x-input>
          </group>
        </div>
      </div>
    </div>

    <div class=" marginTop editItem">
      <div class="editContent">
        <div class="editTitle">
          商家类型
        </div>
        <div class="editCenter">
          影视传媒
        </div>
      </div>
    </div>

    <div class=" marginTop editItem">
      <div class="editContent">
        <div class="editTitle">
          商家介绍
        </div>
        <div class="editCenter">
          <group class="inputItem textareaItem">
            <x-textarea :max="100" :rows="2" placeholder="请输入商家介绍，如：小米粒总部招商中心致力为实体服务类商家提供爆店式营销解决方案。"  v-model="selfIntroduce"></x-textarea>
          </group>
        </div>
      </div>
    </div>

    <div class=" marginTop editItem">
      <div class="editContent">
        <div class="editTitle">
          经营范围
        </div>
        <div class="editCenter">
          <group class="inputItem textareaItem">
            <x-textarea :max="200" :rows="7" placeholder="
      请输入简介
      如：1. 婚纱摄影
          2. 写真
          3. COS服装
          4. 淘宝服装摆拍
          5. 摄影"  v-model="key1"></x-textarea>
          </group>
        </div>
      </div>
    </div>

    <div class=" marginTop editItem">
      <div class="editContent">
        <div class="editTitle">
          订单获取U米比例
        </div>
        <div class="editCenter">
          <div class="inputItem selectInp" @click="showToast = true">
            <div class="left">
              <div v-if="selectActive == 'none'">不返还U米</div>
              <div v-else>
                返还金额{{selectList[selectActive].value1}}%的U米={{selectList[selectActive].value2}}折
              </div>
            </div><span class="triangle"></span>
          </div>
        </div>
      </div>
    </div>

    <div class="footBut">
      <x-button class="merchantBut EfootBut" :class="disabled?'disabled':''" :disabled="disabled" @click.native="submit">确认修改</x-button>
    </div>




    <div>
      <x-dialog v-model="showToast" class="dialog-CA" :dialog-style="{'max-width': '80%'}">
        <div class="dialogContent">
          <div class="content1" v-show="showContent">
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
          <div class="d_foot_but" v-if="showContent" @click="showToast = false">
            确 定
          </div>
        </div>
      </x-dialog>
    </div>

  </div>

</template>

<script>

  import {Group, Cell, XDialog, XButton, XInput,XTextarea } from 'vux'
  import trade_type_list from "@/json/trade_type"

  export default {
    name: 'MerchantEdit',
    components: {
      Group,
      Cell,
      XDialog,
      XButton,
      XInput,
      XTextarea,
    },
    data() {
      return {
        showToast: false,
        showContent: true,
        disabled: false,
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
        startStyle: {
          'background-position': '0px -18rem' //0.5start = -2.5rem
        },
        tradeTypeList:trade_type_list,
        openTime:'',
        selfIntroduce:'',
        key1:'',
      }
    },
    created() {
    /*  if(!this.$Cookie.getAgentIntroduce()){
        this.showToast = true
      }*/
      this.getData()
    },
    methods: {

      submit() {
        let data = {
          agentId: this.agentId,
          ratio: this.ratio,
          selfIntroduce: this.selfIntroduce,
          openTime: this.openTime,
          key1: this.key1,
        }
        this.disabled = true
        this.$axiosApi.agentIntroduceUpd(data).then(res => {
          if (res.code == 200) {
            this.showToast = false
            this.$Cookie.setAgentIntroduce('true')
            this.$vux.toast.show({text:'设置成功'})
            this.getData()
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
          setTimeout(()=>{
            this.disabled = false
          },1500)
        })
      },
      selectFun(x,index) {
        console.log(x)
        this.selectActive = index
        this.ratio = x
      },

      getData() {
        let agentId = this.agentId

        this.$axiosApi.agentIntroduce(agentId).then(res=>{
          if(res.code == 200){
            this.agentInfo = res.data
            this.openTime = res.data.openTime
            this.selfIntroduce = res.data.selfIntroduce
            this.key1 = res.data.key1
            this.ratio = res.data.discount
            if(this.ratio == 0){
              this.selectActive = 'none'
            }else {
              this.selectActive = this.selectList.findIndex((v)=>{
                return v.value == this.ratio
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
    },
    filters: {
      tradeType(value) {
        console.log(trade_type_list)
        const item = trade_type_list.find(x => {
          return x.id == value
        })
        if(item){
          return item.name
        }else {
          return value
        }
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less">



</style>
