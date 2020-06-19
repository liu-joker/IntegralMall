<template>

  <div class="Share">

    <div class="head">
      <div class="title">
        <div class="left">
          <img :src="$store.getters.userInfo.brandLog | imgUrl" alt="">
          {{$store.getters.userInfo.brandName}}商城
        </div>
        <div class="right">
          <div class="but" @click="showProp(2)">
            <img :src="icon_share3" alt="" class="shareImg">
            分享
          </div>
        </div>
      </div>
    </div>
    <div class="Share_content">
      <div class="S_c_head">
        <div class="name">{{itemInfo.name}}</div>
        <div>{{itemInfo.resume}}</div>
        <div class="S_c_foot">
          <x-button class="copy_but tag-read"  :data-clipboard-text="itemInfo.resume" @click.native="copyText">复制文字</x-button>
        </div>
      </div>
      <div class="Img_list">
        <div class="list">
          <div class="item" v-for="(x,index) in imgList" :key="index">
            <div class="img">
              <img :src="x.img" alt="">
            </div>
          </div>
        </div>
        <div class="img_l_foot">
          <div class="copy_but" @click="showProp(1)">分享图片</div>
        </div>
      </div>
    </div>

    <popup v-model="popupShow" class="popupContent">

      <div class="imgList" v-if="showType == 1">
        <div class="item" v-for="(x,index) in imgList" :key="index" @click="x.active = !x.active">
          <div class="Itemimg">
            <img :src="x.img" alt="">
          </div>
          <div class="imgActive">
            <div class="radio" :class="x.active ? 'active':''">
              <img :src="icon_selecting" alt="" v-show="x.active">
            </div>
          </div>
        </div>
      </div>
      <div class="Sharetitle">
        <div class="title_text">
          分享到
        </div>
      </div>
      <div class="weixin">
        <div class="left" @click="share(0)">
          <img :src="icon_weixin" alt="" class="img">
          <span class="name">微信</span>
        </div>
        <div class="right" @click="share(1)">
          <img :src="icon_pengyouq" alt="" class="img">
          <span class="name">朋友圈</span>
        </div>
      </div>
    </popup>

  </div>

</template>

<script>
  import icon_share3 from "@/assets/images/icon_share3.png"
  import icon_selecting from "@/assets/images/icon_selecting.png"
  import icon_weixin from "@/assets/images/icon_weixin.png"
  import icon_pengyouq from "@/assets/images/icon_pengyouq.png"
  import {Popup,XButton } from 'vux'
  import Clipboard from 'clipboard'//点击复制组件
  import {formatMoney, imgUrl, formatDate} from "@/filters"

  export default {
    name: 'share',
    components: {
      Popup,
      XButton
    },
    data() {
      return {
        icon_share3: icon_share3,
        icon_selecting: icon_selecting,
        icon_weixin: icon_weixin,
        icon_pengyouq: icon_pengyouq,
        imgList: [],
        popupShow: false,
        showType: 1,
        id: '',
        appName: this.$store.getters.userInfo.brandName,
        activePay: '',
        itemInfo: '',
        priceInfo: '',
      }
    },
    created() {
      this.id = this.$route.params.id
      this.activePay = this.$route.params.active
      this.getData()

    },
    methods: {
      share(x) {
        let item = this.priceInfo.find(v => {
          return v.payMode == this.activePay
        }).itemName
        let imgList = []
        if (this.showType == 1) {
          //选择图片分享
          const compact = arr => arr.filter(res => res.active != false)
          imgList = compact(this.imgList).map(v => v.img)
        } else {
          imgList = this.imgList.map(v => v.img)
        }
        if(imgList.length == 0){
          this.$vux.toast.show({text: '请选择要分享的图片', position: 'top', type: "text", width: "20em"})
          return
        }
        console.log(imgList)
//        let userId = "111"
        let userId = this.$store.getters.userInfo.userId
        let data = {
          "pri": item,
          "originalPri": '¥' + formatMoney(this.itemInfo.showAmount),
          "title": this.itemInfo.name,
          "images": imgList,
          "qrCodeLink": "https://www.hlxiaoxiong.com/IntegralMall/#/GoodsDetails/" + this.id + '?userId=' + userId,
          "type": x
        }

        console.log(JSON.stringify(data))

     //   window.app.shareOfApp(JSON.stringify(data))

        if (this.$EnvironmentAI() == 1) {
          window.app.shareOfApp(JSON.stringify(data))
        } else if (this.$EnvironmentAI() == 2) {
          try {
            window.app.shareOfApp(JSON.stringify(data))
          }catch (err){
            window.webkit.messageHandlers.shareOfApp.postMessage(JSON.stringify(data))
          }
        }

        this.popupShow = false
      },
      getData() {
        this.$vux.loading.show({
          text: '加载中...'
        })
        const data = {
          itemId: this.id,
          grade: this.$store.getters.userInfo.grade,
        }
        this.$axiosApi.itemDetail(data.itemId, data.grade).then(res => {
          this.$vux.loading.hide()
          if (res.code == 200) {
            this.itemInfo = res.data.item
            this.imgList = (res.data.item.photo.split(',').map(v => {
              let t = {
                img: imgUrl(v),
                active: false
              }
              return t
            }))
            this.imgList.splice(0, 1)
            this.priceInfo = res.data.priceInfo.map(v => {
              this.tagShow = true
              //1金钱2积分3混合
              if (v.payMode == 1) {
                this.tagShow = false
                v.itemName = '¥' + formatMoney(v.amount)
              } else {
                v.itemName = '¥' + formatMoney(v.amount) + "+" + v.coin + "U米"
              }
              return v
            })
            let active = this.priceInfo.find(v => {
              return v.payMode == 1
            })

            if (active) {
              this.active = active.payMode
            } else {
              this.active = this.priceInfo[0].payMode
            }
          } else {
            this.$vux.alert.show({
              title: '提示',
              content: res.message,
              onShow() {
              },
              onHide() {
              }
            })
          }

        })
      },
      copyText() {
        var clipboard = new Clipboard('.tag-read')
        clipboard.on('success', e => {
          this.$vux.toast.show({text: '文字已复制到粘贴板', position: 'top', type: "text", width: "20em"})
          // 释放内存
          clipboard.destroy()
        })
        clipboard.on('error', e => {
          // 不支持复制
          this.$vux.toast.show({text: '请长按文字选择复制', position: 'top', type: "text", width: "20em"})
          // 释放内存
          clipboard.destroy()
        })
      },
      showProp(x) {
        this.showType = x
        this.popupShow = true
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less">



</style>
