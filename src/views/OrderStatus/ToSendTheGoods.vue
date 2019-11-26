<template>

  <div class="ToSendTheGoods">
    <scroller lock-x @on-scroll-bottom="onScrollBottom" ref="scrollerBottom2" :scroll-bottom-offst="300"
              v-if="!noDataShow">
    <div class="list">
      <div class="item" v-for="(x,index) in orderList" :key="index" @click="openOrderDetails(x)">
        <div class="headTitle">
          <div class="left">
            <span class="b_tag"></span>
            <span>订单创建时间：</span>
            <span class="time">{{x.createTime}}</span>
          </div>
          <div class="right red">
            待发货
          </div>
        </div>
        <div class="O_content">
          <div class="goods">
            <div class="goodsItem">
              <div class="img">
                <img :src="x.photoList[1] | imgUrl" alt="">
              </div>
              <div class="textInfo">
                <div>{{x.itemName}}</div>
                <div class="numInfo">
                  <div class="num" v-html="x.itemAmount"></div>
                  <div>x1</div>
                </div>
              </div>
            </div>
            <div class="footBut">
              <div class="but" v-if="x.payStatus == 3 && x.status == 3" @click.stop="cancelOrder(x)">取消订单</div>
             <!-- <div class="but" v-if="x.expressStatus == 2 || x.expressStatus == 1">
                {{x.expressStatus == 2 ? '确认收货' : '已签收'}}
              </div>-->
              <!--<div class="but" v-if="butShowList.but3">立即付款</div>-->
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

</template>

<script>
  import pic_sort2 from "@/assets/images/pic_sort2.png"
  import {formatMoney} from "@/filters"
  import { LoadMore,Scroller,Divider} from 'vux'

  export default {
    name: 'ToSendTheGoods',
    components: {
      LoadMore,
      Scroller,
      Divider,
    },
    data() {
      return {
        pic_sort2: pic_sort2,
        pageNum: 1,
        pageSize: 10,
        orderList: [],
        noDataShow: false,
        status: [{id: 1, value: '已完成'}, {id: 2, value: '已取消'}, {id: 3, value: '待完成'}],
        payStatusList: [{id: 0, value: '待付款'}, {id: 1, value: '支付成功'}, {id: 2, value: '支付失败'}, {id: 3, value: '支付处理中'}],
        expressStatusList: [{id: 0, value: '未发货'}, {id: 1, value: '已收货'}, {id: 2, value: '发货中'}],
        onFetching : false,
        info:''
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
      openOrderDetails(x) {
        //订单详情
        this.$router.push({
          path: '/orderDetails/' + x.orderNum
        })
      },
      cancelOrder(x) {
        //取消订单
        this.$vux.confirm.show({
          title: '温馨提示',
          content: '确定取消该笔订单吗',
          onCancel() {
          },
          onConfirm: () => {
            this.$vux.loading.show({
              text: '请稍候...'
            })

            let orderNum = x.orderNum
            this.$axiosApi.cancelOrder(orderNum).then(res => {
              if (res.code == 200) {
                this.$vux.toast.show({
                  text: '操作成功',
                  width: 'auto'
                })
                setTimeout(() => {
                  this.getData()
                }, 1000)
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
        })
      },
      expressStatus(x) {

        if (x.status == 2) {
          return "已取消"
        } else if (x.status == 1) {
          return "已签收"
        } else {
          if (x.payStatus != 1) {
            return this.payStatusList.find(v => {
              return v.id == x.payStatus
            }).value
          } else {
            return this.expressStatusList.find(v => {
              return v.id == x.expressStatus
            }).value
          }
        }
        return this.expressStatusList.find(v => {
          return x == v.id
        }).value
      },
      getData() {
        this.$vux.loading.show({
          text: '加载中...'
        })
        let status
        let payStatus
        let expressStatus = 0
        this.$axiosApi.findUserShopOrder(this.pageNum, this.pageSize, status, payStatus, expressStatus).then(res => {
          this.$vux.loading.hide()
          if (res.code == 200) {
            this.orderList = res.data.list.map(v => {
              if (v.coin == 0) {
                //金额
                v.itemAmount = '&yen;' + formatMoney(v.amount)
              } else if (v.amount == 0) {
                //积分
                v.itemAmount = v.coin + "U"
              } else {
                //现金加积分
                v.itemAmount = '&yen;' + formatMoney(v.amount) + "+" + v.coin + "U"
              }
              v.photoList = v.itemPhoto.split(',')
              return v
            })
            if(this.orderList.length == 0){
              this.noDataShow = true
            }else {
              this.info = res.data
              this.onFetching = false
              this.$nextTick(() => {
                this.$refs.scrollerBottom2.reset()
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

  .ToSendTheGoods {
    min-height: calc(100vh - 0.625rem);
    padding-top: 0.625rem;
    background-color: #f4f4f4;
    .list {
      padding-left: 1.875rem;
      background-color: #fff;
      .headTitle {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 1.75rem;
        color: #323232;
        padding-right: 1.875rem;
        .left {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          .time {
            margin-left: 0.75rem;
          }
        }
        .right {
          font-size: 1.5rem;
          &.red{
            color: #E84646;
          }
        }
        .b_tag {
          width: 0.375rem;
          height: 1.75rem;
          display: block;
          background-color: #2D2922;
          border-radius: 0.175rem;
          margin-right: 1.375rem;
        }
      }

      .item {
        padding-top: 1.875rem;
        .O_content {
          padding-left: 1.75rem;
          .goods {
            margin-top: 1.25rem;
            padding-bottom: 1.875rem;
            border-bottom: 1px solid #F4F4F4;
            .goodsItem {
              display: flex;
              align-items: flex-start;
              justify-content: flex-start;
            }
            .img {
              margin-right: 2rem;
              width: 7.125rem;
              height: 7.125rem;
              img {
                width: 100%;
                height: 100%;
                border-radius: 0.5rem;
              }
            }
            .textInfo {
              padding-right: 3.5rem;
              font-size: 1.5rem;
              flex: 1;
              color: #323232;
              .numInfo {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-top: 0.75rem;
                color: #8C8C8C;
                .num {
                  font-size: 1.75rem;
                  color: #323232;
                }
              }
            }
            .footBut {
              display: flex;
              justify-content: flex-end;
              align-items: center;
              margin-top: 3.5rem;
              padding-right: 3.5rem;
              .but {
                width: 8.25rem;
                height: 3rem;
                background-color: #2D2922;
                color: #FFFFFF;
                font-size: 1.5rem;
                text-align: center;
                line-height: 3rem;
                border-radius: 2px;
              }
            }
          }
          .CommodityPrices {
            padding: 1.5rem 4.375rem 1.5rem 0;
            border-bottom: 1px solid #F4F4F4;

            .PricesItemInfo {
              display: flex;
              align-items: center;
              justify-content: space-between;
              font-size: 1.5rem;
              color: #8C8C8C;
              margin-bottom: 1rem;
              &.defaultPrices {
                color: #323232;
                .Prices {
                  font-size: 1.75rem;
                  font-weight: bold;
                }
              }
              &:last-child {
                margin-bottom: 0;
              }
            }
          }

        }
      }
    }
    .noData{
      padding: 4.5rem 0;
      text-align: center;
      font-size: 2rem;
      color: #868686;
      background-color: #f4f4f4;
    }

  }


</style>
