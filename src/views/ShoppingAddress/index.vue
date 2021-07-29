<template>

  <div class="ShoppingAddress">
    <div class="S_head">
      <div class="addAddress" @click="addAddress">
        <svg-icon slot="label" class="form_icon" icon-class="add2"></svg-icon>
        <span class="title">
          新增收货地址
        </span>
      </div>
    </div>
    <div class="addressList">
      <div class="list">
        <div class="item" v-for="(x,index) in addressList" :key="index">
          <div class="left_icon">
            <img :src="icon_position" alt="">
          </div>
          <div class="ItemCenter">
            <div class="item_head">
              <span>{{x.name}}</span>
              <span class="phone">{{x.phone}}</span>
            </div>
            <div class="address_info" v-html="x.addressInfo">
            </div>
          </div>
          <div class="right">
            <span :class="x.isDefault != 1?'setDefault':''"
                  @click="setDefAddress(x)">{{x.isDefault != 1 ? "设为默认" : "默认"}}</span>
            <span class="delete" @click="updateAddress(x)">删除</span>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import icon_position from "@/assets/images/icon_position.png"

  export default {
    name: 'ShoppingAddress',
    data() {
      return {
        icon_position: icon_position,
        addressList: [],
        token:''
      }
    },
    created() {
       if(this.$route.query.token){
          let token = this.$route.query.token
          this.token = this.$route.query.token
          this.$Cookie.setToken(token)
        }
      this.getData()
    },
    methods: {
      setDefAddress(x) {
        //设置默认地址
        if (x.isDefault == 0) {
          this.$vux.loading.show({
            text: '请稍候...'
          })
          this.$axiosApi.setDefAddress(x.id).then(res => {
            this.$vux.loading.hide()
            if (res.code == 200) {
              this.$vux.toast.show({
                text: '操作成功',
                width: 'auto'
              })
              this.$router.go(-1)
            }else {
              this.$vux.alert.show({
                title: '提示',
                content: res.message,
                onShow () {
                },
                onHide () {
                }
              })
            }
          })
        }
      },
      updateAddress(x) {
        //删除地址
        this.$vux.confirm.show({
          title: '提示',
          content: '确认删除此地址吗',
          confirmText: '确认',
          onCancel() {
          },
          onConfirm: () => {
            this.$vux.loading.show({
              text: '请稍候...'
            })
            this.$axiosApi.updateAddress(x.id).then(res => {
              this.$vux.loading.hide()
              if (res.code == 200) {
                this.$vux.toast.show({
                  text: '操作成功',
                  width: 'auto'
                })
                this.getData()
              }else {
                this.$vux.alert.show({
                  title: '提示',
                  content: res.message,
                  onShow () {
                  },
                  onHide () {
                  }
                })
              }
            })
          }
        })
      },
      getData() {
        this.$vux.loading.show({
          text: '加载中...'
        })
        this.$axiosApi.addressList().then(res => {
          this.$vux.loading.hide()
          if(res.code == 200){
            this.addressList = res.data.map(v => {
              v.addressInfo = v.areaName + '<br />' + v.address
              return v
            })
          }else {
            this.$vux.alert.show({
              title: '提示',
              content: res.message,
              onShow () {
              },
              onHide () {
              }
            })
          }

        })
      },
      addAddress() {
        if(this.token){
          this.$router.push({path: '/AddShoppingAddress?token='+this.token})
        }else{
          this.$router.push({path: '/AddShoppingAddress'})
        }
        
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less">


</style>
