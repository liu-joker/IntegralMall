<template style="width: 100%">
  <div id="app">
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
        cachedViews: []
      }
    }
  }
</script>

<style>

</style>
