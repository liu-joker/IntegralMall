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
        time: (new Date().getFullYear()) + '-' + (new Date().getMonth() + 1),
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
    methods: {
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

  .TheDetail {
    min-height: 100vh;
    background-color: #F4F4F4;
    padding-top: 0.625rem;

    .weui-cell {
      padding: 0;
    }
    .TheDetail_content {
      background-color: #fff;
      min-height: calc(100vh - 0.625rem);
      padding: 1.875rem 2rem;
      .select_title {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        font-size: 1.75rem;
        color: #323232;
      }
      .list {
        margin-top: 2rem;
        .item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #f4f4f4;
          padding: 1.75rem 0;
          &:last-child {
            border-bottom: 0;
          }
          .left {
            font-size: 1.75rem;
            color: #323232;
            .time {
              margin-top: 1rem;
              font-size: 1.5rem;
              color: #8C8C8C;
            }
          }
          .right {
            font-size: 2.375rem;
            color: #323232;
            &.add {
              color: #AD822F;
            }
          }
        }
      }
    }

    .triangle {
      margin-left: 1rem;
      width: 0px;
      height: 0px;
      border-top: 1rem solid #323232;
      border-left: 1rem solid transparent;
      border-right: 1rem solid transparent;
    }
    .no-more{
      font-size: 0.75rem;
      text-align: center;
      padding-top: 0.5rem;
    }
  }
</style>
