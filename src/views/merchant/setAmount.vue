<template>

  <div class="setAmount">
    <group class="inputItem">
      <x-input label-width="11.125rem" class="input" type="number" placeholder-align="left" text-align="left"
               title="还款金额" @on-blur="amountFun"
               placeholder="请输入还款金额" v-model="form.amount" @input="form.amount>200000?form.amount = '200000':''"></x-input>
    </group>
  </div>

</template>

<script>
//  import keyboard from '@/components/keyboard/index.vue'
    export default {
      components: {},
      name: 'setAmount',
        data() {
            return {
              form:{
                amount:''
              }
            }
        },
        created() {

        },
        methods: {
          amountFun() {
            //格式金额
            this.form.amount = this.form.amount > 200000?200000:this.form.amount
            return this.form.amount = Math.floor(this.form.amount * 1)
          },
        }
    }
</script>

<style rel="stylesheet/less" lang="less">


</style>
