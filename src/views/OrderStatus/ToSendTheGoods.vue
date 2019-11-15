<template>

  <div class="ToSendTheGoods">
    <div class="list">
      <div class="item">
        <div class="headTitle">
          <div class="left">
            <span class="b_tag"></span>
            <span>订单创建时间：</span>
            <span class="time">2019-11-05</span>
          </div>
          <div class="right">
            待付款
          </div>
        </div>
        <div class="O_content">
          <div class="goods">
            <div class="goodsItem">
              <div class="img">
                <img :src="pic_sort2" alt="">
              </div>
              <div class="textInfo">
                <div>{{'九阳自动豆浆机九阳自动豆浆机九阳自动九阳 自动豆浆机豆浆机'}}</div>
                <div class="numInfo">
                  <div class="num" v-html="'￥500.00'"></div>
                  <div>x1</div>
                </div>
              </div>
            </div>
            <div class="footBut">
              <div class="but">确认收货</div>
            </div>
          </div>

        </div>

      </div>
    </div>
  </div>

</template>

<script>
  import pic_sort2 from "@/assets/images/pic_sort2.png"

  export default {
        name: 'ToSendTheGoods',
        data() {
            return {
              pic_sort2:pic_sort2
            }
        },
        created() {

        },
        methods: {}
    }
</script>

<style rel="stylesheet/less" lang="less">

  .ToSendTheGoods{
    min-height: calc(100vh - 0.625rem);
    padding-top: 0.625rem;
    background-color: #f4f4f4;
    .list{
      padding-left: 1.875rem;
      background-color: #fff;
      .headTitle {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 1.75rem;
        color: #323232;
        padding-right: 1.875rem;
        .left{
          display: flex;
          align-items: center;
          justify-content: flex-start;
          .time{
            margin-left: 0.75rem;
          }
        }
        .right{
          font-size: 1.5rem;
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

      .item{
        padding-top: 1.875rem;
        .O_content {
          padding-left: 1.75rem;
          .goods {
            margin-top: 1.25rem;
            padding-bottom: 1.875rem;
            border-bottom: 1px solid #F4F4F4;
            .goodsItem{
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
            .footBut{
              display: flex;
              justify-content: flex-end;
              align-items: center;
              margin-top: 3.5rem;
              padding-right: 3.5rem;
              .but{
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
  }


</style>
