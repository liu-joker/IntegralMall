<template>

</template>

<script>
    export default {
        name: 'promoCodePage',
        data() {
            return {}
        },
        created() {
          this.getData()
        },
        methods: {
          getData(){
            this.$vux.loading.show({
              text: '请稍候...'
            })
            let eid = this.$route.params.eid
            let esign = this.$route.params.esign
            this.$axiosApi.exCode(eid,esign).then(res=>{
              this.$vux.loading.hide()
              if(res.code == 200){
                window.location.replace(res.data)
                return
              }else {
                this.$vux.toast.show({text:res.message})
              }
            })
          }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">


</style>
