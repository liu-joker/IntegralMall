<!--活动详情-->
<template>

  <div class="ActivityDetail">
    <div class="activity_list">
      <div class="item">
        <div class="itemHead">
          <div class="itemTitle">{{ActivityDetail.activityTitle}}</div>
        </div>
        <div class="item_content">
          <img :src="ActivityDetail.PhotoList | imgUrl" alt="">
        </div>
        <div class="itemFoot">
          <div class="left">活动剩余时间：</div>
          <div class="right">
            <div class="time" v-if="ActivityDetail.status==1">{{ActivityDetail.endDate}}</div>
            <div class="oldTime" v-else-if="ActivityDetail.status==2">该活动已失效</div>
            <div class="oldTime" v-else>该活动已下架</div>
          </div>
        </div>
        <div class="itemInfo">
          <div class="infoTitle">活动详情</div>
          <div v-html="ActivityDetail.activityDetail"></div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
    export default {
        name: 'activityDetail',
        data() {
            return {
              id:'',
              ActivityDetail:{}
            }
        },
        created() {
          this.agentId = this.$route.query.agentId
          this.id = this.$route.query.id
          this.brandId = this.$route.query.brandId
          this.getData()
        },
        methods: {
          getData(){

            this.$axiosApi.getUserActivityDetail(this.id).then(res=>{
              if(res.code == 200){
                this.ActivityDetail = res.data
                this.ActivityDetail.PhotoList = JSON.parse(res.data.activityPhoto)[0]
              }
            })
          }
        }
    }
</script>

<style rel="stylesheet/less" lang="less">
  @themeColor: #F89F04;
  @butActive: #F89F04;
  .ActivityDetail{
    padding: 0 1.875rem;
    .activity_list {
      padding-bottom: 4rem;
      .item {
        border-top: 1px solid #EAEAEA;
        .itemHead {
          .itemTitle {
            padding: 1.875rem 0 1rem;
            font-size: 1.875rem;
            color: #323232;
            font-weight: bold;
          }
        }
        .item_content {
          img {
            width: 100%;
            height: 21.625rem;
            border-radius: 1rem;
          }
        }
        .itemFoot {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem 0;
          font-size: 1.5rem;
          color: #646464;
          .time {
            font-size: 2rem;
            color: @themeColor;
          }
        }
        .itemInfo{
          font-size: 1.75rem;
          .infoTitle{
            padding: 1.875rem 0;
            color: #323232;
            font-weight: bold;
          }
        }
      }
    }
  }

</style>
