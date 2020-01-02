<template>

  <div class="HelpCenter">
    <div class="groupList">
      <group class="groupItem" v-for="(x,index) in helpList" :key="index">
        <cell
          :title="x.title"
          is-link
          :border-intent="false"
          :arrow-direction="x.show ? 'up' : 'down'"
          @click.native="x.show = !x.show"
          class="cellItem"></cell>

        <div class="slide" :class="x.show?'animate':''">
          <div class="slideContent" v-html="x.html">

          </div>
        </div>
      </group>

    </div>

  </div>

</template>

<script>
  import {Group, Cell} from 'vux'

  export default {
    components: {
      Group,
      Cell
    },
    name: 'HelpCenter',
    data() {
      return {
        showContent004: false,
        helpList:[{
          title:'1.U米是什么？',
          html:'<p>U米是小米粒对用户还款的一种奖励。小米粒用户可通过制定信用卡还款计划或者购买线下服务来获得U米。用户使用U米，可以在U米商城兑换商品、服务等。最终解释权归小米粒所有。</p>',
          show:false
        },{
          title:'2.如何获得U米？',
          html:'<p>(1) 小米粒用户在APP内完整执行还款计划，可获取对应手续费的U米(2.00元手续费取得1U米)；在计划完成后统一结算。</p><br /><p>(2) 还款计划未完整执行完成的，将无法获取U米！</p><br /><p>(3) 小米粒用户通过APP购买合作商家的线下服务，可获取U米。</p>',
          show:false
        },{
          title:'3.U米余数怎么计算？',
          html:'<p>U米的最小单位为1，还款手续费不足1元时不计入U米(如手续费为25.70元，则只取得12U米)。</p>',
          show:false
        },{
          title:'4.如何查询U米？',
          html:'<p>登录小米粒APP，进入“商城-我的-我的U米”，可以查询到当前可用U米、U米使用记录等信息。</p>',
          show:false
        },{
          title:'5.如何使用U米？',
          html:'<p>可以在商城使用U米兑换商品，服务等。</p>',
          show:false
        }]
      }
    },
    created() {

    },
    methods: {}
  }
</script>

<style rel="stylesheet/less" lang="less">

  .HelpCenter{
    background-color: #f4f4f4;
    min-height: 100vh;
    padding-top: 0.625rem;
    .groupList{
      background-color: #ffffff;
      .weui-cell_access .weui-cell__ft:after{
        width: 1.5rem;
        height: 1.5rem;
        margin-top: -0.75rem;
      }
      .weui-cell:before{
        left:2rem;
      }
      .slide {
        overflow: hidden;
        max-height: 0;
        transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
        background-color: #f4f4f4;

        .slideContent{
          font-size: 1.5rem;
          color: #323232;
          padding: 1.75rem 3rem;
        }
      }
      .animate {
        max-height: 9999px;
        transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
        transition-delay: 0s;
      }
      .weui-cells{
        margin-top: 0;
      }

      .groupItem{
        border-bottom: 1px solid #f4f4f4;
        .cellItem{
          font-size: 1.875rem;
          color: #323232;
          padding: 2rem 1.5rem 2rem 2rem;
        }
      }
    }

  }

</style>
