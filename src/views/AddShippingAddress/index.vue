<template>

  <div class="AddShippingAddress">
    <div class="form">
      <group class="form_item">
        <x-input placeholder="收货人" class="item" type="text" v-model="form.name" :max="11"
                 ref="phone" required>
        </x-input>
        <x-input placeholder="联系电话" class="item" type="tel" is-type="china-mobile" v-model="form.phone" :max="11"
                 ref="phone" required>
        </x-input>
        <!--<cell title="选择省、市、区" :value="form.address" @click.native="onClick" is-link class="item"></cell>-->
        <x-address @on-hide="logHide" class="item" title="选择省、市、区" v-model="form.address" :list="addressData"   ></x-address>
        <x-input placeholder="详细地址" class="item" type="text" v-model="form.info" :max="30"
                 ref="phone" required>
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
    Group, XInput, Cell,XAddress,XButton
  } from 'vux'
  import data from "@/json"

  export default {
    name: 'AddShippingAddress',
    components: {
      Group,
      XInput,
      Cell,
      XAddress,
      XButton
    },
    data() {
      return {
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

    },
    methods: {
      submit(){

      },
      onClick() {

      },
      logHide (str) {
        console.log('on-hide', str)
        if(str){
          console.log(this.form.address)
        }
      },

    }
  }
</script>

<style rel="stylesheet/less" lang="less">

  .AddShippingAddress {
    min-height: 100vh;
    background-color: #f4f4f4;
    .vux-popup-picker-value{
      padding-right: 2.5rem;
    }
    .weui-cell{
     padding: 0;
    }
    .weui-cell_access .weui-cell__ft:after {
      width: 1.5rem;
      height: 1.5rem;
      margin-top: -0.75rem;
    }
    .weui-cell:before {
      left: 2rem;
    }
    .weui-cells {
      margin-top: 0;
    }

    .form {
      padding-top: 0.625rem;
      .form_item {
        background-color: #ffffff;

        .item {
          padding: 2.25rem 1.875rem 2.25rem 2rem;
          font-size: 1.75rem;
          color: #8C8C8C;
        }
      }
    }
    .but{
      padding: 0 1.875rem;
      margin-top: 3.75rem;
      user-select: none;
      .submit{
        background-color: #2D2922;
        font-size: 2.125rem;
        color: #FEFEFE;
      }
      .weui-btn_default:not(.weui-btn_disabled):active{
        color: #FEFEFE;
        background-color: #2D2922;
        opacity: 0.85;
      }
    }
  }

</style>
