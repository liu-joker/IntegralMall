<template>

  <div class="MyUmi">
    <div class="MyUmi_content">
      <img :src="icon_umi" alt="">
      <div class="num">
        <span>{{$store.getters.userInfo.coin}}</span>/U米
      </div>
      <div class="toUmiDetail">
        <span @click="toUmiDetail">查看U米明细>></span>
      </div>
    </div>
  </div>

</template>

<script>
  import icon_umi from "@/assets/images/icon_umi.png"

  export default {
    name: 'MyUmi',
    data() {
      return {
        icon_umi: icon_umi
      }
    },
    mounted(){

    },
    created() {
      this.$store.dispatch('getUserInfo')
    },
    activated(){
      this.$store.dispatch('getUserInfo')
    },
    methods: {
      toUmiDetail(){
        this.$router.push({path: '/TheDetail'})
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less">



</style>
