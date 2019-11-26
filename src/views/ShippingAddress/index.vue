<template>

  <div class="ShippingAddress">
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
    name: 'ShippingAddress',
    data() {
      return {
        icon_position: icon_position,
        addressList: []
      }
    },
    created() {
      this.$vux.loading.show({
        text: '加载中...'
      })
      this.getData()
    },
    methods: {
      setDefAddress(x) {
        //设置默认地址
        console.log(x.isDefault)
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
        this.$router.push({path: '/AddShippingAddress'})
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less">

  .ShippingAddress {
    min-height: 100vh;
    background-color: #f4f4f4;
    .S_head {
      padding-top: 0.625rem;
      .addAddress {
        background-color: #ffffff;
        padding: 2rem;
        color: #323232;
        font-size: 2rem;
        user-select: none;
        &:active {
          background-color: #ECECEC;
        }
      }
    }
    .addressList {
      margin-top: 1px;
      background-color: #ffffff;
      .list {
        .item {
          padding: 1.5rem 0;
          border-bottom: 1px solid #f4f4f4;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          .left_icon {
            padding: 0 1.7rem;
            img {
              width: 3.375rem;
              height: 3.375rem;
            }
          }
          .ItemCenter {
            flex: 1;
            font-size: 1.75rem;
            color: #323232;
            padding-right: 3.5rem;
            .item_head {
              margin-bottom: 0.75rem;
              .phone {
                color: #8C8C8C;
              }
            }
            .address_info {
              font-size: 1.5rem;
            }
          }
          .right {
            width: 8.5rem;
            display: flex;
            flex-direction: column;
            color: #323232;
            font-size: 1.5rem;
            text-align: center;
            border-left: 1px solid #f4f4f4;

            .setDefault {
              color: #E84646;
            }
            .delete {
              margin-top: 2.75rem;
              color: #8c8c8c;
            }
          }
        }
      }
    }
  }
</style>
