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
        appName: this.$store.getters.userInfo.brandName,
        helpList: []
      }
    },
    created() {
      if(this.$store.getters.userInfo.brandId == 'dc244cacf322438f8b8cff6b47865020'){
        this.helpList = [{
          title: '1.U米是什么？',
          html: '<p>'+this.appName+'用户可通过购买线下服务来获得U米。用户使用U米，可以在U米商城兑换商品、服务等。最终解释权归'+this.appName+'所有。</p>',
          show: false
        }, {
          title: '2.如何获得U米？',
          html: '<p>(1) '+this.appName+'用户通过APP购买合作商家的线下服务，可获取U米。</p>',
          show: false
        },{
          title: '3.如何查询U米？',
          html: '<p>关注汇米城公众号，进入汇米城公众号‘汇米商城--我的--我的U米’，可以查询到当前可用U米、U米明细等信息</p>',
          show: false
        }, {
          title: '4.如何使用U米？',
          html: '<p>可以在商城使用U米兑换商品，服务等。</p>',
          show: false
        }]

      }else {
        this.helpList = [{
          title: '1.U米是什么？',
          html: '<p>'+this.appName+'用户可通过购买线下服务来获得U米。用户使用U米，可以在U米商城兑换商品、服务等。最终解释权归'+this.appName+'所有。</p>',
          show: false
        }, {
          title: '2.如何获得U米？',
          html: '<p>(1) '+this.appName+'用户通过APP购买合作商家的线下服务，可获取U米。</p>',
          show: false
        },{
          title: '3.如何查询U米？',
          html: '<p>登录'+this.appName+'APP，进入“商城-我的-我的U米”，可以查询到当前可用U米、U米使用记录等信息。</p>',
          show: false
        }, {
          title: '4.如何使用U米？',
          html: '<p>可以在商城使用U米兑换商品，服务等。</p>',
          show: false
        }]
      }
    },
    methods: {}
  }
</script>

<style rel="stylesheet/less" lang="less">


</style>
