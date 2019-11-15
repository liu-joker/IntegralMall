<template>

  <div class="TheDetail">
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
        <div class="item">
          <div class="left">
            <div class="info">购买商品成功增加U米</div>
            <div class="time">2019-10-25</div>
          </div>
          <div class="right">+60.00</div>
        </div>
        <div class="item">
          <div class="left">
            <div class="info">购买商品成功增加U米</div>
            <div class="time">2019-10-25</div>
          </div>
          <div class="right add">-60.00</div>
        </div>
      </div>

    </div>
  </div>

</template>

<script>
  import {Group, Datetime} from 'vux'

  export default {
    name: 'TheDetail',
    components: {
      Group,
      Datetime
    },
    data() {
      return {
        time: (new Date().getFullYear()) + '-' + (new Date().getMonth() + 1),
      }
    },
    computed:{
      year:function () {
        return new Date(this.time).getFullYear()
      },
      month:function () {
        return new Date(this.time).getMonth() + 1
      }
    },
    created() {
      console.log()
    },
    methods: {
      onChange() {
        console.log(this.time)
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less">

  .TheDetail {
    min-height: 100vh;
    background-color: #F4F4F4;
    padding-top: 0.625rem;

    .weui-cell{
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
  }
</style>
