<template>
  <div :name="transitionName" class="back-to-ceiling" @click="backToTop" v-show="visible" :style="customStyle"
       title="回到顶部">
    <svg-icon slot="label" class="form_icon" icon-class="ToTop"></svg-icon>
  </div>

</template>

<script>
  export default {
    name: 'BackToTop',
    props: {
      visibilityHeight: {
        type: Number,
        default: 400
      },
      backPosition: {
        type: Number,
        default: 0
      },
      customStyle: {
        type: Object,
        default: () => {
          return {
            right: '2.5rem',
            bottom: '4.625rem',
          }
        }
      },
      transitionName: {
        type: String,
        default: 'BackToTop'
      }
    },
    data() {
      return {
        visible: false,
        interval: null,

      }
    },
    created() {

    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.handleScroll)
      if (this.interval) {
        clearInterval(this.interval)
      }
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll)
    },
    methods: {
      handleScroll() {
        //反回顶部
        this.visible = window.pageYOffset > this.visibilityHeight
      },
      backToTop() {

        document.body.scrollTop = document.documentElement.scrollTop = 0
        return
        const start = window.pageYOffset
        let i = 0
        this.interval = setInterval(() => {
          const next = Math.floor(this.easeInOutQuad(10 * i, start, -start, 250))
          if (next <= this.backPosition) {
            window.scrollTo(0, this.backPosition)
            clearInterval(this.interval)
          } else {
            window.scrollTo(0, next)
          }
          i++
        }, 16.7)
      },
      easeInOutQuad(t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t + b
        return -c / 2 * (--t * (t - 2) - 1) + b
      },
    }
  }
</script>

<style rel="stylesheet/less" lang="less">

  .back-to-ceiling {
    position: fixed;
    display: inline-block;
    text-align: center;
    user-select: none;
    -moz-user-select: -moz-none;
    -ms-user-select: none;
    width: 4.875rem;
    height: 4.875rem;
    z-index: 100;
    border-radius: 2.4375rem;
    border: 1px solid #E0E0E0;
    background-color: #fff;
    color: #8A8A8A;
    font-size: 2.375rem;
    line-height: 4.875rem;
  }

</style>
