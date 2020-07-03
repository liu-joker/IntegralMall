<template>

  <div class="loginView">
    <x-dialog v-model="showView" class="dialog-CA" :dialog-style="{'max-width': '80%'}">
      <div class="dialogContent">
        <div class="head">
          <div class="title">手机号登录</div>
          <div class="close" @click="close"><svg-icon slot="label" class="form_icon" icon-class="close"></svg-icon></div>
        </div>
        <div class="dialogFrom">
          <group class="inputItem">
            <x-input label-width="auto" class="input" placeholder-align="left" text-align="left"
                     placeholder="手机号" ref="userPhone" required  :is-type="phoneType" :max="11" v-model="userPhone">
            </x-input>
          </group>
          <group class="inputItem code" >
            <x-input class="input" placeholder-align="left" text-align="left" placeholder="验证码"
                     v-model="code" show-clear ref="code" :max="6"></x-input>
            <x-button mini class="getcode" @click.native="getCode" :disabled="code_disabled"
                      :class="(code_disabled)?'code_time_class':''">{{code_time}}
            </x-button>
          </group>
          <div class="submit editSubmit">
            <x-button type="primary" class="button" :disabled="butDisabled" :class="(butDisabled)?'butDisabled':''" @click.native="submit">登录</x-button>
          </div>
        </div>
      </div>
    </x-dialog>
  </div>

</template>

<script>
  import { XButton, XInput, Group, Cell, XDialog} from 'vux'

  export default {
    name: 'loginView',
    components: {
      XButton,
      XInput,
      Group,
      Cell,
      XDialog
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
        showView: true,
        code_disabled: false,
        butDisabled: false,
        code_time: "获取验证码",
        brandId: '8436cb02523c43bb9f6a9aea5fcac7d6',
        userPhone:'',
        code:''
      }
    },
    props:['loginData'],
    created() {
      this.showView = this.loginData.showView
      //this.brandId = this.loginData.brandId
    },
    methods: {
      submit() {
        let phone = this.userPhone
        let code = this.code
        let brandId = this.brandId
        this.butDisabled = true
        this.$axiosApi.loginRegisterSms(phone, code, brandId).then(res=>{
          this.butDisabled = false
          if(res.code == 200){
            this.$Cookie.setToken(res.data)
            this.$store.dispatch('getUserInfo').then(res=>{
              this.$vux.toast.show({text:'登录成功'})
              this.showView = false
              this.loginData.showView = false

              /*if(this.$store.getters.userInfo.password != 1){
                this.$vux.confirm.show({
                  content: "暂未设置交易密码",
                  confirmText: '前往设置',
                  onCancel() {

                  },
                  onConfirm: () => {
                    this.$router.push({
                      path: '/updatePayPwd'
                    })
                  }
                })
              }*/
            })
          }
        })
      },
      getCode() {
        //获取验证码

        if (this.userPhone.trim()!="" && this.$refs.userPhone.valid) {
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


          this.$axiosApi.sendSms(this.userPhone, this.brandId).then(response => {
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
          this.$vux.toast.show({text:'请填写手机号'})
        }


      },
      close(){
        this.showView = false
        this.loginData.showView = false
      }
    },
    watch: {
      'loginData.showView': {
        handler: function (newVal, oldVal) {
          this.showView = this.loginData.showView
        },
        deep: true
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less">
  @shopTheme:#2D2922;
  @disabledTheme:#BDBDBD;
  .loginView{
    .dialogContent{
      padding: 3.75rem 3.75rem 4.625rem;
      background: url('~@/assets/merchant/pic_shopping.png') no-repeat center;
      background-size: cover;
      .head{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .title{
          font-size: 2.375rem;
          color: #323232;
          font-family:PingFang SC;
          font-weight:bold;

        }
        .close{
          font-size: 1.75rem;
        }
      }
      .dialogFrom{
        padding-top: 4.25rem;
        .weui-cells {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 0;
          font-size: 1.875rem;
        }
        .getcode {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          font-size: 1.5rem;
          height: 3.25rem;
          line-height: 3.25rem;
          border-radius: 1.625rem;
          margin-right: 1.25rem !important;
          background-color: @shopTheme;
          color: #FFFFFF;
        }
        .inputItem {
          border-bottom: 1px solid #dadada;
          &:last-child {
            border-bottom: 0;
          }
          .input {
            height: calc(6.625rem - 20px);
            padding: 10px 1.25rem;
            text-decoration: none;
            display: flex;
            flex: 1;
            .weui-label {
              font-size: 2rem;
              text-align: left;
            }

          }
          .getCode {
            color: #dadada;
            width: 11rem;
            font-size: 1.875rem;
            text-align: right;
            padding-right: 1rem;
            white-space: nowrap;
          }
        }
        .code{
          margin-top: 2.5rem;
        }
        .submit {
          margin-top: 5.625rem;
          .button{
            background-color: @shopTheme;
            font-size: 2.125rem;
            color: #FEFEFE;
            height: 4.5rem;
            line-height: 4.5rem;
            &.butDisabled{
              background-color: @disabledTheme;
            }
          }
        }
        .code_time_class{
          background-color: @disabledTheme;
        }

      }
    }
  }

</style>
