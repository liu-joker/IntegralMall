<template>

  <div class="myOrder">
    <div class="selectList">
      <div class="left">
        <div class="spanItem">
          <group>
            <datetime format="YYYY-MM" start-date="2018-01-01" v-model="time" @on-change="onChange">
              <div class="select_title">
                <span class="time">{{year}}年{{month}}月</span>
                <span class="triangle"></span>
              </div>
            </datetime>
          </group>
        </div>
      </div>
      <div class="right">
        <div class="spanItem">
          <!--<span>全部</span>
          <img src="@/assets/merchant/icon_screen_b.png" alt="">-->
        </div>
      </div>
    </div>
    <div class="dataList">
      <scroller lock-x @on-scroll-bottom="onScrollBottom" ref="scrollerBottom2" :scroll-bottom-offst="300"
                v-if="!noDataShow" height="92.4vh">
        <div class="list">
          <div class="item" v-for="(x,index) in orderList">
            <img :src="x.frontPhoto | imgUrl" class="leftImg" alt="">
            <div class="itemContent">
              <div class="agentName">{{x.shopName}}</div>
              <div class="time">下单时间：{{x.createTime}}</div>
              <div class="amount">总价：¥{{x.itemAmount}}</div>
              <div class="evaluate">
                <span class="evaluateSpan" v-if="x.isComment == 0" @click="toEvalutate(x)">评价</span>
                <span class="evaluateSpan disabled" v-else>已评价</span>
              </div>
            </div>
          </div>
          <load-more tip="正在加载..." class="loadingMore" v-if="onFetching"></load-more>
          <divider v-if="CommontInfo && orderList.length>0">到底了</divider>
        </div>
      </scroller>
      <div class="noData" v-if="noDataShow">暂无数据</div>


    </div>
  </div>

</template>

<script>
  import {Group, Datetime, LoadMore, Scroller, Divider} from 'vux'
  import {formatMoney} from "@/filters"

  export default {
    name: 'myOrder',
    components: {
      Group,
      Datetime,
      LoadMore,
      Scroller,
      Divider,
    },
    data() {
      return {
        noDataShow: false,
        onFetching: false,
        CommontInfo: false,
        pageNum: 1,
        pageSize: 10,
        info: '',
        orderList: [],
        monthCount: {},
        allCount: {},
        time: this.getTime(),
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
      toEvalutate(x) {
        this.$router.push({
          path: '/userEvaluate?agentId=' + x.agentId + '&orderNum=' + x.orderNum
        })
      },
      getTime() {
        let m = (new Date().getMonth() + 1)
        if (m < 10) {
          m = '0' + m
        }
        return (new Date().getFullYear()) + '-' + m
      },
      onChange() {
        console.log(this.time)
        this.getData()
      },
      onScrollBottom() {
        if (this.onFetching) {
        } else {
          this.onFetching = true;
          if (this.CommontInfo) return this.onFetching = false;
          this.pageSize += 10;
          this.getData()

        }
      },
      getData() {

        let time = this.time
        let pageNum = this.pageNum
        let pageSize = this.pageSize

        this.$axiosApi.getUserScanOrder(time, pageNum, pageSize).then(res => {
          if (res.code == 200) {
            if (res.data.length == this.orderList.length) {
              this.CommontInfo = true
            }

            this.orderList = res.data.map(v => {
              v.itemAmount = formatMoney(v.amount)
              return v
            })

            if (this.orderList.length == 0) {
              this.noDataShow = true
            } else {
              this.noDataShow = false

              this.info = res.data
              this.onFetching = false
              this.$nextTick(() => {
                // this.$refs.scrollerBottom2.reset()
              })
            }
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
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less">


</style>
