<template style="width: 100%">
  <div id="app" :class="appClass">
    <keep-alive :include="cachedViews">
      <router-view v-wechat-title="$route.meta.title"></router-view>
    </keep-alive>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        bodyHeight: '',
        cachedViews: ['applicationForm']
      }
    },
    computed: {
      appClass:function () {
        let themeClass = 'theme1'
        if(this.$Cookie.getBrandId() && this.$Cookie.getBrandId() != ""){
          themeClass = 'theme2'
        }
        document.querySelector(".body").setAttribute('class', themeClass)
        return ''
      }
    }
  }
</script>

<style>

</style>
