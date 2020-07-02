<template>

  <div class="VideoList">
    <div class="Video" v-for="(x,index) in videoDataList" :key="index" v-if="videoDataList.length!=0">
      <div class="video_content">
        <video-view :videoData="x"></video-view>
      </div>
      <div class="PresentationInfo">
        {{x.videoTitle}}
      </div>
    </div>
  </div>

</template>

<script>
  import videoView from "@/components/videoView"
  import {imgUrl, formatMoney} from "@/filters"

  export default {
    name: 'videoList',
    components: {
      videoView,
    },
    data() {
      return {
        videoDataList: [],
        agentId: ''
      }
    },
    created() {
      this.agentId = this.$route.query.agentId
      // this.brandId = this.$route.query.brandId
      this.getData()
    },
    methods: {
      getData() {
        let agentId = this.agentId
        this.$axiosApi.agentVideos(agentId).then(res => {
          if (res.code == 200) {

            this.videoDataList = res.data.map(v => {
              return {
                id: v.id,
                agentId: v.agentId,
                autoplay: false,
                sources: [{
                  type: "",//这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
                  src: imgUrl(v.videoPath) //url地址
                }],
                poster: imgUrl(v.videoPic),
                videoTitle: v.videoTitle
              }
            })
            console.log(this.videoDataList)
          } else {

          }
        })
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less">

  .VideoList {
    width: calc(100% - 3.75rem);
    min-height: 100vh;
    padding: 0 1.875rem;
    .Video {
      padding-top: 1.875rem;
      &:last-of-type .PresentationInfo {
        border-bottom: none;
      }
    }
    .PresentationInfo {
      padding: 1.5rem 0;
      font-size: 1.75rem;
      color: #323232;
      border-bottom: 1px solid #eaeaea;

    }
  }

</style>
