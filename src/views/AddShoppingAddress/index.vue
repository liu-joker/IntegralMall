<template>

  <div class="AddShoppingAddress">
    <div class="form">
      <group class="form_item">
        <x-input placeholder="收货人" class="item" type="text" v-model="form.name" :max="11"
                 ref="name" required>
        </x-input>
        <x-input placeholder="联系电话" class="item" type="tel" is-type="china-mobile" v-model="form.phone"
                 :is-type="phoneType" :max="11"
                 ref="phone" required>
        </x-input>
        <x-address @on-hide="logHide" class="item" title="选择省、市、区" v-model="form.address" :list="addressData"
                   ref="address"></x-address>
        <x-input placeholder="详细地址" class="item" type="text" v-model="form.info" :max="50"
                 ref="info" required>
        </x-input>
      </group>
    </div>

    <div class="but">
      <x-button class="submit" @click.native="submit">保存并使用</x-button>
    </div>

  </div>

</template>

<script>
  import {
    Group, XInput, Cell, XAddress, XButton
  } from 'vux'
  import data from "@/json"

  export default {
    name: 'AddShoppingAddress',
    components: {
      Group,
      XInput,
      Cell,
      XAddress,
      XButton
    },
    data() {
      return {
        phoneType: function (value) {
          if (!(/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/).test(value)) {
            return {
              valid: false,
              msg: "格式不正确!"
            }
          } else {
            return {
              valid: true,
            }
          }
        },
        form: {
          name: "",
          phone: "",
          address: [],
          info: "",
        },
        addressData: data.area,
      }
    },
    created() {
        if(this.$route.query.token){
          let token = this.$route.query.token
          this.$Cookie.setToken(token)
        }
    },
    methods: {
      submit() {
        let name = this.form.name
        let phone = this.form.phone
        let info = this.form.info
        let areaId = this.form.address[2] || this.form.address[1] || "" //区编号
        console.log(this.form.address,areaId)
        if (name != "" && phone != "" && info != "" && areaId != "") {
          this.$vux.loading.show({
            text: '请稍候...'
          })
          this.$axiosApi.addAddress(name,phone,areaId,info).then(res=>{
            this.$vux.loading.hide()
            if(res.code == 200){

              this.$vux.toast.show({
                text: '添加成功',
                width: 'auto'
              })
              setTimeout(()=>{
                this.$router.go(-1)
              },1500)
            }else {
              this.$vux.toast.show({text:res.message})
            }
          })
        }else {
          this.$vux.toast.show({text:"请完善地址信息"})
        }
      },
      onClick() {

      },
      logHide(str) {
        console.log('on-hide', str)
        if (str) {
          console.log(this.form.address)
        }
      },

    }
  }
</script>

<style rel="stylesheet/less" lang="less">



</style>
