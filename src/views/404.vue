<template>
  <div class="content_404">
    <div class="center_404">
      <img :src="img404" alt="">
      <p>网络异常，请检查网络设置!</p>
    </div>
  </div>
</template>

<script>
  import img404 from '../assets/pic_nonetwork@2x.png'
  export default {
    name:'page404',
    data(){
      return{
        img404
      }
    }
  }
</script>

<style  rel="stylesheet/scss" lang="scss">
  .content_404{
    .center_404{
      margin-top: 11.25rem;
      text-align: center;
      img{
        width:16.875rem;
        margin-bottom: 1rem;
      }
      p{
        font-size: 1.75rem;
        color: #818181;
        text-align: center;
      }
    }
  }
</style>
