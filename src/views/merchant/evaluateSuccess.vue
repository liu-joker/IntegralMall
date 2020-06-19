<template>

  <div class="evaluateSuccess">
    <div class="userEcontent2" >
      <div class="cellItem1">
        <img src="@/assets/images/callbackPageS.png" alt="">
      </div>
      <div class="cellItem2">评论发表成功</div>
      <div class="cellItem3">
        <x-button class="merchantBut toShop"  @click.native="toShop">前往商城兑换</x-button>
      </div>
    </div>
  </div>

</template>

<script>
  import { XButton} from 'vux'

  export default {
    name: 'evaluateSuccess',
    components: {
      XButton
    },
    data() {
      return {
      }
    },
    created() {
    },
    methods: {
      toShop(){
        this.$router.push({
          path:'/commodityTypeList?id='+0
        })
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">


</style>
