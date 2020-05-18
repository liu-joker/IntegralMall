<template>

  <div class="amap-page-container">
<!--    <div class="search-box" v-if="toSearch">
      <input
        v-model="searchKey"
        type="search"
        id="search">
      <button @click="searchByHand">搜索</button>
      <div class="tip-box" id="searchTip"></div>

    </div>-->
    <div :style="{width:'100%',height:'100%'}">
      <el-amap
        vid="amapDemo"
        :center="center"
        :zoom="zoom"
        class="amap-demo"
        :events="events">
        <el-amap-circle-marker :center="marker.center" :radius="marker.radius" :fill-color="marker.fillColor"
                               :fill-opacity="marker.fillOpacity" :events="marker.events"></el-amap-circle-marker>
      </el-amap>
    </div>
   <!-- <div class="toolbar">
      经纬度: [{{ lng }}, {{ lat }}] 地址: {{ address }}
    </div>-->
  </div>

</template>

<script>
  import VueAMap from 'vue-amap'

  VueAMap.initAMapApiLoader({
    // 高德的key
    key: '1e5396e933d4edb8d3bc96bba497911b',
    // 插件集合
    plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor','AMap.Geocoder'],
    // 高德 sdk 版本，默认为 1.4.4
    v: '1.4.4'
  });
  export default {
    name: 'Vmap',
    data() {
      const self = this;
      return {
        zoom: 12,
        center: [114.031898, 22.529931],
        lng: 0,
        lat: 0,
        address: '',
        marker: {
          center: [114.031898, 22.529931],
          radius: 7,
          fillOpacity: 1,
          fillColor: 'rgba(255,0,0,1)',
          events: {
            click: () => {
//              alert('click');
            }
          }
        },
        events: {
          click(e) {
            if (!self.mapData.edit) return false
            let {lng, lat} = e.lnglat;
            self.lng = lng;
            self.lat = lat;
//            self.center = [lng,lat]
            self.marker.center = [lng, lat]
            // 这里通过高德 SDK 完成。
            var geocoder = new AMap.Geocoder({
              radius: 1000,
              extensions: "all"
            });
            geocoder.getAddress([lng, lat], function (status, result) {
              if (status === 'complete' && result.info === 'OK') {
                if (result && result.regeocode) {
                  self.address = result.regeocode.formattedAddress;
                  let data = {
                    address: self.address,
                    lng: self.lng,
                    lat: self.lat,
                    edit:true
                  }
                  self.$emit("mapFun", data)
                  self.$nextTick();
                }
              }
            });
          }
        },
      };
    },
    props: ['mapData'],
    created() {
    },
    methods: {},
  watch: {
    mapData: {
      handler:function(newVal,oldVal) {
        console.log(newVal,'newVal')
        if(this.mapData.lng !=0 && this.mapData.lat != 0){
          this.center = [this.mapData.lng, this.mapData.lat]
          this.marker.center = [this.mapData.lng, this.mapData.lat]
          this.lng = this.mapData.lng
          this.lat = this.mapData.lat
        }
        this.address = this.mapData.address
        console.log(this.mapData,this.address)
      },
      deep: true
    }
  }
  }
</script>

<style rel="stylesheet/scss" lang="scss">

  .amap-page-container {
    width: 100%;
    height: 100%;
    .toolbar {
      padding: 1rem 0;
    }
  }

</style>
