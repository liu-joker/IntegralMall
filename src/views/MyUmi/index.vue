<template>

  <div class="MyUmi">
    <div class="MyUmi_content">
      <img :src="icon_umi" alt="">
      <div class="num">
        <span>{{$store.getters.userInfo.coin}}</span>/U米
      </div>
      <div class="toUmiDetail">
        <span @click="toUmiDetail">查看U米明细>></span>
      </div>
    </div>
    <div class="MyUmi_choose">
      <div class="choose_one" v-for="(item,index) in UmiDetail" :key="index" @click='choose(item)' :class='choose_default == item.id?"choose_class":""'> 
        <div class="choose_text">¥{{item.amount}}</div>
        <div class="choose_ico"><img :src="choose_default == item.id?icon_choose:''" alt=""></div>
      </div>
      <!-- <p class="text_msg">U米默认转换到<span>余额</span>,转换手续费为转换金额的10%</p> -->
      <div class="Umi_but" @click='toAmount'>立即转换</div>
    </div>
    
    
  </div>

</template>

<script>
  import icon_umi from "@/assets/images/icon_umi.png"
  import icon_choose from "@/assets/images/icon_choose@2x.png"
  export default {
    name: 'MyUmi',
    data() {
      return {
        icon_umi: icon_umi,
        icon_choose:icon_choose,
        UmiDetail:[
          {amount:100,id:1,},
          {amount:300,id:2,},
          {amount:500,id:3,},
          {amount:1000,id:4,},
          {amount:3000,id:5,},
          {amount:5000,id:6,},
        ],
        choose_default:1,
        choose_amount:'',
      }
    },
    mounted(){

    },
    created() {
      this.$store.dispatch('getUserInfo')
    },
    activated(){
      this.$store.dispatch('getUserInfo')
    },
    methods: {
      toUmiDetail(){
        this.$router.push({path: '/TheDetail'})
      },
      choose(v){
        this.choose_default=v.id
        this. choose_amount = v.amount
      },
      toAmount(){
        let type = this. choose_default
        let that = this
        this.$vux.confirm.show({
            title: '温馨提示',
            content: '您要确认装换U米吗？',
            onCancel() {
            },
            onConfirm: () => {
              that.$vux.loading.show({
                text: '请稍候...'
              })
                 that.$axiosApi.getExchangeAmount(type).then(res=>{
                    that.$vux.loading.hide()
                    if(res.code = 200){
                      that.$vux.alert.show({
                          title: '提示',
                          content: '转换成功',
                          onShow() {
                          },
                          onHide() {
                          }
                        })
                      that.$store.dispatch('getUserInfo')
                    }else{
                      that.$vux.alert.show({
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
        
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less">
.MyUmi_choose{
  margin-top:7.375rem;
  width:100%;
  display:flex;
  flex-wrap:wrap;
  display: -webkit-flex; 
  justify-content: space-evenly;
  // padding:7.375rem 1.875rem 0;
  .choose_one{
    width:13.125rem;
    height:7.5rem;
    display: flex;
    display: -webkit-flex; 
    position: relative;
    justify-content: center;
    align-items: center;
    border: 2px solid #DBDBDB;
    border-radius: 0.625rem;
    color: #636363;
    box-sizing: border-box;
    margin-bottom:1.875rem;
    .choose_text{
      font-size:2.375rem;
    }
    .choose_ico{
      width:3.125rem;
      height:3.125rem;
      position: absolute;
      bottom:0;right:0;
      img{width:100;}
    }
  }
  .choose_class{
    color:#AD812F;
    border: 4px solid #AD812F;
  }
  

}
.text_msg{
  margin-top:0.625rem;
  // padding-left:1.875rem;
  font-size:1.5rem;
  color: #636363;
  width:43.125rem;
  >span{
    color:#AD812F;
    font-weight: 600;
  }
}
.Umi_but{
  width:43.125rem;
  height:4.5rem;
  margin:0 1.875rem;
  border-radius: 10px;
  background: #2D2921;
  color:#fefefe;
  font-size:2.125rem;
  text-align: center;
  line-height:4.5rem;
  margin-top:10.3125rem;
}

</style>
