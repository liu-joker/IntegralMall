<template>

  <div class="TheDetail">
    <scroller lock-x @on-scroll-bottom="onScrollBottom" ref="scrollerBottom2" :scroll-bottom-offst="300">
      <div class="TheDetail_content">
        <group>
          <datetime format="YYYY-MM" start-date="2018-01-01" v-model="time" @on-change="onChange">
            <div class="select_title">
              <span>{{year}}年{{month}}月</span>
              <span class="triangle"></span>
            </div>
          </datetime>
        </group>
        <div class="list">
          <div class="item" v-for="(x,index) in pointList" :key="index">
            <div class="left">
              <div class="info">{{x.remark}}</div>
              <div class="time">{{x.createTime}}</div>
            </div>
            <div class="right" :class="x.point>0?'add':''">{{x.point}}</div>
          </div>
          <load-more tip="正在加载..." class="loadingMore" v-if="onFetching"></load-more>
          <divider v-if="pageSize > info.total">到底了</divider>
        </div>
      </div>
    </scroller>
  </div>

</template>

<script>
  import {Group, Datetime, LoadMore, Scroller,Divider} from 'vux'

  export default {
    name: 'TheDetail',
    components: {
      Group,
      Datetime,
      Scroller,
      Divider,
      LoadMore
    },
    data() {
      return {
        time: this.getTime(),
        pageNum: 1,
        pageSize: 10,
        onFetching : false,
        info : '',
        pointList: []
      }
    },
    computed: {
      year: function () {
        return new Date(this.time).getFullYear()
      },
      month: function () {
        return new Date(this.time).getMonth() + 1
      }
    },
    created() {
      this.getData()
    },
    destroyed() {
      this.$vux.loading.hide()
    },
    methods: {
      getTime(){
        let m = (new Date().getMonth() + 1)
        if(m<10){
          m = '0'+m
        }
       return (new Date().getFullYear()) + '-' + m
      },
      onScrollBottom(){
        if (this.onFetching){

        } else {
          this.onFetching = true;
          if(this.pageSize > this.info.total) return  this.onFetching = false;
          this.pageSize += 10;
          this.getData()
        }
      },
      getData() {
        let startTime = this.time
        let pageNum = this.pageNum
        let pageSize = this.pageSize
        this.$vux.loading.show({
          text: '加载中...'
        })
        this.$axiosApi.userPoint(startTime, pageNum, pageSize).then(res => {
          this.$vux.loading.hide()
          if (res.code == 200) {
            this.pointList = res.data.list
            this.info = res.data
            this.onFetching = false
            this.$nextTick(() => {
              this.$refs.scrollerBottom2.reset()
            })
          } else {
            this.$vux.alert.show({
              title: '提示',
              content: res.message,
              onShow() {
              },
              onHide() {
              }
            })
          }
        })
      },
      onChange() {
        console.log(this.time)
        this.getData()
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less">


</style>
