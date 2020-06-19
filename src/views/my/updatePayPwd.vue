<!--修改交易密码-->
<template>
  <div class="updatePayPwd">
    <div class="subject">
      <div class="content2">
        <group class="inputItem">
          <x-input class="input" placeholder-align="left" text-align="left" placeholder="请设置交易密码"
                   type="password" v-model="form.password" show-clear ref="password"></x-input>
        </group>
        <group class="inputItem">
          <x-input class="input" placeholder-align="left" text-align="left" placeholder="请再次输入交易密码"
                   type="password" v-model="form.password2" show-clear ref="password2"></x-input>
        </group>
        <group class="inputItem code" >
          <x-input class="input" placeholder-align="left" text-align="left" placeholder="请输入验证码"
                   v-model="form.code" show-clear ref="code"></x-input>
          <x-button mini class="getcode" @click.native="getCode" :disabled="code_disabled"
                    :class="(code_disabled)?'code_time_class':''">{{code_time}}
          </x-button>
        </group>
      </div>
      <div class="submit editSubmit">
        <x-button type="primary" class="button" @click.native="editTrue">提交</x-button>
      </div>
    </div>
  </div>

</template>

<script>
  import {Group, XButton, XInput, Datetime} from 'vux'

  export default {
    name: 'updatePayPwd',
    components: {
      Group,
      XButton,
      XInput,
      Datetime
    },
    data() {
      return {
        form: {
          phone: this.$store.getters.userInfo.phone,
          password: '',
          password2: '',
          code: ''
        },
        code_disabled: false,
        code_time: "获取验证码",
        brandId: this.$store.getters.userInfo.brandId,

      }
    },
    created() {

    },
    methods: {
      editTrue() {

//        console.log(this.$store.getters.havePaypass)
        if (this.$refs.password.valid && this.$refs.password2.valid && this.form.password.trim() != "" && this.form.password2.trim() != "" && this.form.password2 == this.form.password) {
          this.$vux.confirm.show({
            title: '温馨提示',
            content: '确定提交吗？',
            onCancel: () => {
            },
            onConfirm: () => {
              this.$vux.loading.show()
              let password = this.form.password
              let code = this.form.code
              this.$axiosApi.updatePayPwd(code, password).then(response => {
                this.$vux.loading.hide()
                if (response.code == 200) {
                  this.$store.dispatch('getUserInfo').then((res) => {
                    if(res.data.password == 1){
                      this.$vux.confirm.show({
                        title: '提示',
                        content: '修改成功',
                        showCancelButton: false,
                        onConfirm: () => {
                        }
                      })
                    }
                  })
                }else {
                  this.$vux.confirm.show({
                    title: '提示',
                    content: response.message,
                    showCancelButton: false
                  })
                }
              })
            }
          })
        } else {
          this.$vux.toast.show({
            type: 'text',
            text: '两次输入的密码不一致！',
            width: 'auto'
          })

        }
      },
      getCode() {
        //获取验证码
        if (this.form.phone.trim() != "") {
          /* if(true){*/
          this.code_disabled = true
          let TIME_COUNT = 60;
          this.code_time = TIME_COUNT + 's'
          let clock = window.setInterval(() => {
            if (TIME_COUNT >= 1) {
              TIME_COUNT--
              this.code_time = TIME_COUNT + 's'
            } else {
              this.code_time = "获取验证码"
              this.code_disabled = false
              clearInterval(clock)
            }
          }, 1000)

          this.$axiosApi.sendSms(this.form.phone, this.brandId).then(response => {
            if (response.code == 200) {
              this.$vux.toast.show({
                text: '验证码已发送',
                width: 'auto'
              })
            }
          }).catch(error => {
            console.log(error)
          })
        } else {

          this.$vux.toast.show({
            type: 'text',
            text: '手机号格式不正确！',
            width: 'auto'
          })
        }


      },
    }
  }
</script>

<style rel="stylesheet/less" lang="less">

</style>
