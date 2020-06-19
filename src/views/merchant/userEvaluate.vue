<template>

  <div class="UserEvaluate">
    <div class="userEcontent1" >
      <div class="head">
        <p class="title">服务您满意吗</p>
        <p>给商家的服务一点评价吧~ </p>
      </div>
      <div class="EvaluateCenter">
        <div class="Econtent">
          <div class="title">
            <div class="left">
              <img src="@/assets/merchant/lizhifuLogo.png" alt="">
            </div>
            <div class="right">天安数码城多媒体工作室(原天安集美 题斜互联媒体工作室)</div>
          </div>
          <div class="startList">
            <div class="item" v-for="(x,index) in 5" :key="index" @click="activeIndex = x"
                 :style="x<(activeIndex+1)?itemBgc2:itemBgc1">
            </div>
          </div>
          <group class="inputItem textareaItem">
            <x-textarea :max="200" :rows="7" placeholder="请填写评论~" v-model="comment"></x-textarea>
          </group>
          <div class="foot">
            <div class="but">
              <x-button class="merchantBut" :class="activeIndex==0 || comment==''?'disabled':''"  :disabled="activeIndex==0 || comment==''" @click.native="submit">发表评论</x-button>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import start from '@/assets/merchant/start.png'
  import startActive from '@/assets/merchant/startActive.png'
  import {Group, XTextarea, XButton} from 'vux'

  export default {
    name: 'userEvaluate',
    components: {
      Group,
      XTextarea,
      XButton
    },
    data() {
      return {
        start: start,
        startActive: startActive,
        isComment: false,
        activeIndex: 0,
        itemBgc1: 'background-image:url(' + start + ');',
        itemBgc2: 'background-image:url(' + startActive + ');',
        comment: '',
        orderNum: '',
        agentId: '',
      }
    },
    created() {
      this.orderNum = this.$route.query.orderNum
      this.agentId = this.$route.query.agentId
      if(!this.orderNum || !this.agentId){
        this.$router.push({
          path:'/404'
        })
      }
    },
    methods: {

      submit(){
        var address = location.href.split('/#/')[0] + '/#/';
        if(this.activeIndex !=0 && this.comment!=""){
          let data = {
            agentId:this.agentId,
            orderNum:this.orderNum,
            score:this.activeIndex,
            comment:this.comment
          }

          this.$axiosApi.addCommont(data).then(res=>{
            if(res.code == 200){
              window.location.replace(address + 'evaluateSuccess')
            }
          })

        }else{
          this.$vux.toast.show({text:'评价信息不得为空！'})
        }

      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">


</style>
