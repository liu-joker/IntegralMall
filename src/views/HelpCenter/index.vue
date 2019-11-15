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
          title:'1.U米的获取',
          html:'<p>1.信用卡代还，按照实际扣除的手续费根据1:1的比率转化为U米。</p><br /><p>2.通过商城购物，根据实际支付的现金取得U米；数量所取得U米根据商品制定相关。</p>',
          show:false
        },{
          title:'2.U米的作用',
          html:'<p>U米可用于商城购物，让您支付更少的现金买到自己想要的商品。</p>',
          show:false
        },{
          title:'3.会员等级',
          html:'<p>等级享受价格优惠~</p>',
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
