<template>

  <div>
    <popup v-model="popupShow" position="bottom" :show-mask="false" :hide-on-blur="false">
      <div class="popupContent">
        <div class="keyboard">
          <div class="left">
            <div class="item hoverActive" v-for="x in 12" @click.stop="numberClick(x)">
              <span v-if="x == 10">·</span>
              <span v-else-if="x == 11">0</span>
              <span v-else-if="x == 12" class="down"></span>
              <span v-else>{{x}}</span>
            </div>
          </div>
          <div class="right">
            <div class="delete hoverActive" @click.stop="numberClick(13)">
              <!--<img :src="icon_cancel2" alt="" draggable="false" style="user-select: none;">-->
              <span class="icon_cancel"></span>
            </div>
            <div class="payEdit" @click.stop="numberClick(14)">
              支付
            </div>
          </div>
        </div>
      </div>
    </popup>
  </div>

</template>

<script>
  import {Popup} from 'vux'

  export default {
    name: 'keyboard',
    components: {
      Popup,
    },
    props:['keyboardData'],
    data() {
      return {
        keyboardType: 1,//1金额2手机号
        popupShow: true,
        readonly: true,
        amountDisabled: false,
        form: {
          amount: ''
        },
        keyboardData2:{
          keyboardType:1,
          popupShow: true,
          readonly: true,
          amountDisabled: false,
          phone:'',
          amount:''
        }
      }
    },
    created() {

    },
    methods: {
      numberClick(x) {

        if (this.keyboardType == 1) {
          if (this.amountDisabled && x != 12 && x != 14) {
            return
          }
          if (x == 12) {
            //显示
            this.popupShow = false
          } else if (x < 12) {
            let num = x

            if (this.form.amount.indexOf('.') > -1 && (this.form.amount.length - this.form.amount.indexOf('.')) > 2) return false;
            if (x == 11) {
              if (this.form.amount != "" && Number(this.form.amount) == 0 && x != 10 && this.form.amount.length == 1) return false;
              num = 0
            }
            if (x == 10) {
              if (this.form.amount.indexOf('.') > -1 || this.form.amount == "") return false;
              num = '.'
            }
            if (Number(Number(this.form.amount + String(num))) >= 1000000) return false
            if (this.form.amount != "" && Number(this.form.amount) == 0 && x != 10 && this.form.amount.length == 1) return false;
            this.form.amount += String(num)
          } else if (x == 13) {
            this.form.amount = this.form.amount.substring(0, this.form.amount.length - 1)
          } else if (x == 14) {
            this.submit()
          }
        } else if (this.keyboardType == 2) {
          if (x == 12) {
            //显示
            this.popupShow = false
          } else if (x < 12) {
            let num = x

            if (this.form.phone.indexOf('.') > -1 && (this.form.phone.length - this.form.phone.indexOf('.')) > 2) return false;
            if (x == 11) {
              if (this.form.phone == "") return false;
              num = 0
            }
            if (x == 10) {
              return
              if (this.form.phone.indexOf('.') > -1 || this.form.phone == "") return false;
              num = '.'
            }
            if (Number(Number(this.form.phone + String(num))) >= 99999999999) return false
            if (this.form.phone != "" && Number(this.form.phone) == 0 && x != 10 && this.form.phone.length == 1) return false;
            this.form.phone += String(num)
          } else if (x == 13) {
            this.form.phone = String(this.form.phone).substring(0, this.form.phone.length - 1)
          } else if (x == 14) {
            this.submit()
          }
        }


      },
      submit() {

      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less">

  .popupContent {
    /*background-color: #ffffff;*/
    .popup_head {
      background-color: #F4F4F4;
      .diy_input {
        background-color: #F4F4F4;
        height: 7.35rem;
        font-size: 4.25rem;
        color: #323232;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 2px;
        font-family: 'PingFang SC';
        font-weight: bold;
        .input_num {
          display: flex;
          align-items: baseline;
          justify-content: center;
        }
        .amountIcon {
          font-size: 2.625rem;
          margin-right: 0.875rem;
        }
      }
    }
    .keyboard {
      background-color: #ffffff;
      display: flex;
      align-items: stretch;
      justify-content: space-between;
      border-top: 1px solid #EAEAEA;
      .hoverActive:active {
        background-color: #f4f4f4;
      }
      .left {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        .item {
          width: calc(33.33% - 1px);
          height: 6.25rem;
          font-size: 3.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border-right: 1px solid #EAEAEA;
          border-bottom: 1px solid #EAEAEA;
          .down {
            width: 3rem;
            height: 2.5rem;
            background: url('~@/assets/images/icon_pack_up.png') center center no-repeat;
            background-size: cover;
          }
        }
      }
      .right {
        width: 11.625rem;
        > div {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .delete {
          height: 25%;
          .icon_cancel {
            width: 3.375rem;
            height: 2.5rem;
            background: url('~@/assets/images/icon_cancel2.png') center center no-repeat;
            background-size: cover;
          }
        }
        .payEdit {
          height: 75%;
          background-color: #F89F04;
          font-size: 2.625rem;
          color: #ffffff;
          &:active {
            opacity: 0.9;
          }
        }
      }
    }
  }

</style>
