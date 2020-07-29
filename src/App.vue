<template style="width: 100%">
  <div id="app" :class="appClass">
    <keep-alive :include="cachedViews">
      <!--<router-view v-wechat-title="$route.meta.title"></router-view>-->
      <router-view v-wechat-title="appTitle"></router-view>
    </keep-alive>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        bodyHeight: '',
        cachedViews: ['index','applicationForm']
      }
    },
    computed: {
      appTitle:function () {
        if(this.$store.getters.brandId != ""){
          console.log(this.$store.getters.brandId)
         return this.$route.meta.title
        }else {
          return this.$route.meta.title
        }
      },
      appClass:function () {
        let themeClass = 'theme1'
        if(this.$Cookie.getBrandId() && this.$Cookie.getBrandId() != ""){
          themeClass = 'theme2'
        }
        this.$nextTick(()=>{
          document.querySelector(".body").setAttribute('class', themeClass)
        })
        return ''
      }
    },
    mounted(){
      console.log(this.$route.meta)
      console.log(this.$store.getters.brandId)
    }
  }
</script>

<style>

</style>
