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
    created() {

    },
    methods: {
      toUmiDetail(){
        this.$router.push({path: '/TheDetail'})
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less">

  .MyUmi {
    min-height: 100vh;
    background-color: #f4f4f4;
    padding-top: 7.56rem;
    .MyUmi_content {
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      > img {
        width: 9.94rem;
        height: 9.94rem;
      }
      .num {
        font-size: 2rem;
        color: #323232;
        margin: 2.5rem 0;
        > span {
          font-size: 3.625rem;
        }

      }
      .toUmiDetail {
        font-size: 1.75rem;
        color: #AD822F;
      }

    }
  }

</style>
