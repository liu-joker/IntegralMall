<template>

  <div class="merchantMove">
    <div class="merchantMoveContent" v-if="verifyStatus == 1">
      <img src="@/assets/merchant/pic_sjrzlc.png" alt="" class="merchantMoveInfo">
      <div class="but">
        <x-button class="submit merchantBut" @click.native="submit">申 请 入 驻</x-button>
      </div>
    </div>
    <div class="merchantMoveStart" v-else>

      <div class="start_head">
        <img src="@/assets/merchant/pic_aoudit_ing.png" alt="" class="merchantMoveInfo" v-if="verifyStatus == 3">
        <img src="@/assets/merchant/pic_audit_fail.png" alt="" class="merchantMoveInfo" v-if="$store.getters.agentInfo.verifyStatus == 2">
        <p class="text_info" v-if="verifyStatus == 3">审核中···</p>
        <p class="text_err" v-else-if="$store.getters.agentInfo.verifyStatus == 2">很遗憾，提供资料错误或缺失，请重新上传</p>
      </div>

      <div class="start2" v-if="$store.getters.agentInfo.verifyStatus == 2">
        <x-button class="merchantBut addInfo" @click.native="submit">完善信息</x-button>
      </div>

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
      return {
        verifyStatus:0
      }
    },
    created() {
     this.verifyStatus = this.$store.getters.agentInfo.verifyStatus || 3
      console.log(this.verifyStatus)
    },
    methods: {
      submit() {
        this.$router.push({
          path:'/applicationForm'
        })
      },

    }
  }
</script>

<style rel="stylesheet/less" lang="less">


</style>
