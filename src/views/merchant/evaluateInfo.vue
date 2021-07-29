<template>

  <div class="evaluateInfo">
    <div class="head">
      <div class="left">
        <div class="number">{{agentAvgScore}}</div>
        <span>商家评分</span>
      </div>
      <div class="right">
        <div class="startList">
          <div class="item" v-for="(x,index) in 5" :key="index">
            <div class="itemL" :style="'background-position:' + (index * 1.75) + 'rem -20.75rem;'"></div>
            <div class="itemR">
              <div class="itemR_BGC" v-if="scoreList.length>0" :style="itemRSty(index)"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
        <div class="spanItem" @click="show1 = true">
          <span>{{menuActive.label}}</span>
          <svg-icon class="form_icon" icon-class="bottom"></svg-icon>
        </div>
        <!-- <div class="spanItem">
           <span>筛选</span>
           <svg-icon class="form_icon" icon-class="bottom"></svg-icon>
         </div>-->
      </div>

      <actionsheet v-model="show1" :menus="menus1" :close-on-clicking-mask="false" show-cancel
                   @on-click-menu="menuClick"></actionsheet>

    </div>
    <div class="dataList">
      <scroller lock-x @on-scroll-bottom="onScrollBottom" ref="scrollerBottom2" :scroll-bottom-offst="300"
                v-if="!noDataShow" height="76.26vh">
        <div class="list">
          <div class="item" v-for="(x,index) in orderList" :key="index">
            <div class="c_i_content">
              <div class="left">
                <img :src="x.userPhoto | imgUrl" alt="">
              </div>
              <div class="right">
                <div class="r_head">
                  <div class="r_top">
                    <span>{{x.userPhone}}</span>
                    <span class="time">{{x.createTime}}</span>
                  </div>
                  <div class="r_bottom">
                    <div class="userEvaluate">
                      <span>评分</span>
                      <div class="startList">
                        <div class="startItem" v-for="(z,index) in 5" :key="index"
                             :style="z<(x.score+1)?itemBgc2:itemBgc1">
                        </div>
                      </div>

                      <span>¥{{x.amount2}}/人</span>
                    </div>
                  </div>
                </div>
                <div class="i_foot">
                  {{x.comment}}
                </div>
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
  import {Group, Datetime, LoadMore, Scroller, Divider, Actionsheet} from 'vux'
  import {formatMoney} from "@/filters"
  import start from '@/assets/merchant/start.png'
  import startActive from '@/assets/merchant/startActive.png'
  export default {
    name: 'evaluateInfo',
    components: {
      Group,
      Datetime,
      LoadMore,
      Scroller,
      Divider,
      Actionsheet
    },
    data() {
      return {
        scoreList: [],
        itemBgc1: 'background-image:url(' + start + ');',
        itemBgc2: 'background-image:url(' + startActive + ');',
        menus1: [
          {label: '全部评价', menuType: 1},
          {label: '消费金额由高到低', menuType: 2},
          {label: '消费金额由低到高', menuType: 3},
          {label: '评分高到低', menuType: 4},
          {label: '评分低到高', menuType: 5},
        ],
        show1: false,
        agentId: "",
        agentAvgScore: '',
        menuActive: {label: '全部评价', menuType: 1},
        time: this.getTime(),

        noDataShow: false,
        onFetching: false,
        CommontInfo: false,
        pageNum: 1,
        pageSize: 10,
        info: '',
        orderList: [],

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
      this.agentId = this.$route.query.agentId

      this.getAgentScore()
      this.getData()
    },
    methods: {
      menuClick(key, item) {
        if (key != 'cancel') {
          this.menuActive = item
          this.getData()
        }
      },
      getTime() {
        let m = (new Date().getMonth() + 1)
        if (m < 10) {
          m = '0' + m
        }
        return (new Date().getFullYear()) + '-' + m
      },
      onChange() {
        this.getData()
      },
      itemRSty(index) {
        if (this.scoreList.length > 0) {
          let w = this.scoreList.find(v => {
            return v.score == 5 - index
          })
          if (w) {
            return `width:${w.width}rem`
          } else {
            return ''
          }
        } else {
          return ''
        }
      },
      getAgentScore() {
        this.$axiosApi.getAgentScore(this.agentId).then(res => {
          if (res.code == 200) {
            this.agentAvgScore = res.data.agentAvgScore

            if (res.data.scoreCount) {
              var colorsArr = res.data.scoreCount.reduce(function (arr, primaryColor) {
                arr.push(primaryColor.count);
                return arr;
              }, []);

              var sumValue = colorsArr.reduce(function (sum, number) { //sum2 前两个数的和
                return sum + number;
              })
              this.scoreList = res.data.scoreCount.map(v => {
                v.width = (v.count / sumValue) * 13.625
                return v
              })
            }
          }
        })
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

        let agentId = this.agentId
        let time = this.time
        let orderBy = this.menuActive.menuType
        let pageNum = this.pageNum
        let pageSize = this.pageSize

        this.$axiosApi.getAgentCommont(agentId, time, orderBy, pageNum, pageSize).then(res => {
          if (res.code == 200) {
            if (res.data.length == this.orderList.length) {
              this.CommontInfo = true
            }

            this.orderList = res.data.map(v => {
              v.itemAmount = formatMoney(v.amount)
              v.amount2 = formatMoney(v.amount)
              let s = (v.score - 1) * 5 + 0.5
              v.UserStartStyle = {
                'background-position': '0px -' + s + 'rem' //0.5start = -2.5rem
              }
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
