<template>

  <div class="WithdrawalRecord">
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
                v-if="!noDataShow" height="78.75vh">
        <div class="list">
          <div class="item" v-for="(x,index) in orderList">
            <img :src="icon_txcg" class="leftImg" alt="">
            <div class="itemContent">
              <div class="left">
                <div>提现成功</div>
                <div class="time">{{x.createTime}}</div>
              </div>
              <div class="right">
                <div class="amount">
                  - ¥{{x.amount | formatMoney}}
                </div>
              </div>
            </div>
          </div>
          <load-more tip="正在加载..." class="loadingMore" v-if="onFetching"></load-more>
          <divider v-if="pageSize > info.total && info.list.length>0">到底了</divider>
        </div>
      </scroller>
      <div class="noData" v-if="noDataShow">暂无数据</div>


    </div>
  </div>

</template>

<script>
  import {Group, Datetime, LoadMore, Scroller, Divider} from 'vux'
  import {formatMoney} from "@/filters"

  import icon_txcg from "@/assets/merchant/icon_txcg.png"

  export default {
    name: 'WithdrawalRecord',
    components: {
      Group,
      Datetime,
      LoadMore,
      Scroller,
      Divider,
    },
    data() {
      return {
        icon_txcg: icon_txcg,
        noDataShow: false,
        onFetching: false,
        pageNum: 1,
        pageSize: 10,
        info: '',
        orderList:[],
        agentId:this.$store.getters.agentInfo.agentId,
        monthCount:{},
        allCount:{},
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
      getTime(){
        let m = (new Date().getMonth() + 1)
        if(m<10){
          m = '0'+m
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
          if (this.pageSize > this.info.total) return this.onFetching = false;
          this.pageSize += 10;
          this.getData()

        }
      },
      getData(){

        let data = {
          agentId:this.agentId,
          type:2,
          time:this.time,
          pageNum:this.pageNum,
          pageSize:this.pageSize,
        }

        this.$axiosApi.agentProfitRecord(data).then(res=>{
          if(res.code == 200){

            this.monthCount = res.data.monthCount
            this.allCount = res.data.allCount
            console.log( this.allCount)
            this.orderList = res.data.monthRecord.list.map(v => {
              v.itemAmount = formatMoney(v.amount)
              return v
            })

            if (this.orderList.length == 0) {
              this.noDataShow = true
            }else {
              this.noDataShow = false

              this.info = res.data.monthRecord
              this.onFetching = false
              this.$nextTick(() => {
                // this.$refs.scrollerBottom2.reset()
              })
            }
          }else {
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
