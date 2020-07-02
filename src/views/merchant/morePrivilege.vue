<!--更多特权-->
<template>

  <div class="morePrivilege">
    <div class="itemList">
      <div class="item">
        <div class="left">
          <img src="http://img.cdn.hljcxiaoxiong.com/1542681329744" alt="">
        </div>
        <div class="right">
          <div class="item_name">腾讯视频VIP</div>
          <div class="item_info">
            <div class="info">【新用户仅需8元】腾讯视频1个月</div>
            <div class="but">抢购</div>
          </div>
          <div class="amount">
            <div class="number">¥10.00</div>
            <div>已售：243</div>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="left">
          <img src="http://img.cdn.hljcxiaoxiong.com/1542681329744" alt="">
        </div>
        <div class="right">
          <div class="item_name">腾讯视频VIP</div>
          <div class="item_info">
            <div class="info">【新用户仅需8元】腾讯视频1个月</div>
            <div class="but">抢购</div>
          </div>
          <div class="amount">
            <div class="number">¥10.00</div>
            <div>已售：243</div>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="left">
          <img src="http://img.cdn.hljcxiaoxiong.com/1542681329744" alt="">
        </div>
        <div class="right">
          <div class="item_name">腾讯视频VIP</div>
          <div class="item_info">
            <div class="info">【新用户仅需8元】腾讯视频1个月</div>
            <div class="but">抢购</div>
          </div>
          <div class="amount">
            <div class="number">¥10.00</div>
            <div>已售：243</div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
    export default {
        name: 'morePrivilege',
        data() {
            return {
              agentId:''
            }
        },
        created() {
          this.agentId = this.$route.query.agentId
          // this.brandId = this.$route.query.brandId
        },
        methods: {}
    }
</script>

<style rel="stylesheet/less" lang="less">
  @themeColor: #F89F04;
  @butActive: #F89F04;
  .morePrivilege{
    min-height: 100vh;
    padding: 0 1.875rem;
    .itemList {
      padding-top: 1rem;
      .item {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        margin-bottom: 1.25rem;
        &:last-of-type {
          margin-bottom: 0;
        }

        .left {
          margin-right: 1.5rem;
          img {
            width: 7.875rem;
            height: 7.875rem;
          }
        }
        .right {
          flex: 1;
          .item_name {
            font-size: 1.875rem;
            color: #323232;
            font-weight: bold;
          }
          .item_info {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 1.5rem;
            color: #646464;
            .but {
              height: 3rem;
              line-height: 3rem;
              padding: 0 1.625rem;
              border-radius: 1.5rem;
              color: #FFFFFF;
              background-color: @themeColor;
              &:active {
                opacity: 0.9;
              }
            }
          }
          .amount {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 1.5rem;
            color: #646464;
            margin-top: 0.5rem;
            .number {
              font-size: 2rem;
              color: #F85404;
              font-weight: bold;
            }
          }
        }
      }
    }
  }

</style>
