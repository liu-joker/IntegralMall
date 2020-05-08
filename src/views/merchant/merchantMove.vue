<template>

  <div class="merchantMove">
    <img src="@/assets/merchant/pic_sjrzlc@2x.png" alt="" class="merchantMoveInfo">
    <div class="but">
      <x-button class="submit merchantBut" @click.native="submit">保存并使用</x-button>
    </div>
  </div>

</template>

<script>
  import {XButton} from 'vux'

  export default {
    name: 'merchantMove',
    components: {
      XButton
    },
    data() {
      return {}
    },
    created() {

    },
    methods: {
      submit() {

      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less">


</style>
