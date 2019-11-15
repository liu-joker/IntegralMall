<template style="width: 100%">
  <div id="app">
    <!--<div style="width: 100%;display: flex;justify-content: center">
      <div style="background-color: #cccccc;width: 41.875rem">
        222
      </div>
    </div>-->

    <!--<div class="bgc">
      <img src="./assets/bg_hongbao@2x.png"  class="bgimg">
    </div>-->

    <keep-alive :include="cachedViews">
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        bodyHeight: '',
        cachedViews: ['index']
      }
    }
  }
</script>

<style>

</style>
