<!--评论列表-->
<template>
  <div class="CommentListInfo">
    <scroller lock-x @on-scroll-bottom="onScrollBottom" ref="scrollerBottom2" :scroll-bottom-offst="300"
              v-if="!noDataShow" height="100vh">
      <div class="commentList">
        <div class="itemC" v-for="(x,index) in CommontList" :key="index">
          <div class="c_i_content">
            <div class="left">
              <img :src="x.img" alt="">
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
                    <span class="start" :style="x.UserStartStyle"></span>
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
        <divider v-if="CommontInfo && CommontList.length>0">到底了</divider>
      </div>

    </scroller>
    <div class="noData" v-if="noDataShow">暂无数据</div>
  </div>

</template>

<script>
  import {imgUrl, formatMoney} from "@/filters"
  import {
    XButton,
    Scroller, LoadMore, Divider,
    Sticky,
    Tab,
    TabItem,
  } from 'vux'

  export default {
    name: 'commentList',
    components: {
      XButton,
      Scroller, LoadMore, Divider,
      Sticky,
      Tab,
      TabItem,
    },
    data() {
      return {
        agentId: '',
        CommontList: [],
        CommontInfo: false,
        onFetching: false,
        noDataShow: false,
        pageSize: 10,
      }
    },
    created() {
      this.agentId = this.$route.query.agentId
      this.brandId = this.$route.query.brandId
      this.getCommontInfo()
    },
    methods: {
      onScrollBottom() {
        if (this.onFetching) {
        } else {
          this.onFetching = true;
          if (this.CommontInfo) return this.onFetching = false;
          this.pageSize += 10;
          this.getCommontInfo()

        }
      },
      getCommontInfo() {
        //获取商户评论列表
        let orderBy = 1
        let pageNum = 1
        let pageSize = this.pageSize
        let time = ''
        this.$axiosApi.getAgentCommont(this.agentId, time, orderBy, pageNum, pageSize).then(res => {
          if (res.code == 200) {

            if (res.data.length == this.CommontList.length) {
              this.CommontInfo = true
            }
            this.CommontList = res.data.map(v => {
              v.img = imgUrl(v.userPhoto)
              v.amount2 = formatMoney(v.amount)
              let s = (v.score - 1) * 5 + 0.5
              v.UserStartStyle = {
                'background-position': '0px -' + s + 'rem' //0.5start = -2.5rem
              }
              return v
            })
            this.onFetching = false
          }
        })
      },
    }
  }
</script>

<style rel="stylesheet/less" lang="less">

  .CommentListInfo{
    .start {
      display: inline-block;
      width: 8.375rem;
      height: 1.5rem;
      background: url('~@/assets/images/start.png') no-repeat;
      background-size: 8.375rem 22.5rem;
      background-position: 0px -0.5rem;
      margin-right: 0.5rem;
    }
    .commentList {
      background-color: #fff;
      padding-left: 1.875rem;
      .itemC {
        padding: 1.5rem  1.875rem 0 0  ;
        border-bottom: 1px solid #EAEAEA;

        &:last-of-type {
          border: none;
        }
        .c_i_content {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          .left {
            margin-right: 1.5rem;
            img {
              width: 4.5rem;
              height: 4.5rem;
              border-radius: 2.25rem;
            }
          }

          .right {
            flex: 1;

            .r_head {
              .r_top {
                font-size: 2rem;
                color: #323232;
                display: flex;
                align-items: baseline;
                justify-content: space-between;
                .time {
                  font-size: 1.5rem;
                  color: #646464;
                }
              }
              .r_bottom {
                font-size: 1.5rem;
                color: #646464;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                .start {
                  margin-right: 1.5rem;
                }
              }
            }
            .i_foot {
              padding: 2.5rem 0 1.875rem;
              font-size: 1.75rem;
              color: #323232;
            }
          }

        }
      }
    }
    .noData {
      padding: 4.5rem 0;
      text-align: center;
      font-size: 2rem;
      color: #868686;
      background-color: #f4f4f4;
    }
  }

</style>
