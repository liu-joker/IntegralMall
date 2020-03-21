<template>
  <div class="wrapper"
       ref="wrapper"
       @touchstart="onStart"
       @touchmove="onMove"
       @touchend="onEnd"
       @touchcancel="onEnd"
       @mousedown="onStart"
       @mousemove="onMove"
       @mouseup="onEnd"
       @mousecancel="onEnd"
       @mouseleave="onEnd"
       @transitionend="onTransitionEnd"
  >
    <div ref="wrapperScroller"
         :style="scrollerStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'wrapper',
    data() {
      return {
        wrapper: null,
        scroller: null,
        minY: 0,
        maxY: 0,
        wrapperHeight: 0,
        offsetY: 0,
        duration: 0,
        bezier: 'linear',
        startY: 0,
        pointY: 0,
        startTime: 0,                 // 惯性滑动范围内的 startTime
        momentumStartY: 0,            // 惯性滑动范围内的 startY
        momentumTimeThreshold: 300,   // 惯性滑动的启动 时间阈值
        momentumYThreshold: 15,       // 惯性滑动的启动 距离阈值
        isStarted: false,             // start锁
        scrollTop: document.body.scrollTop | document.documentElement.scrollTop
      };
    },
    computed: {
      scrollerStyle() {
        return {
          'transform': `translate3d(0, ${this.offsetY}px, 0)`,
          'transition-duration': `${this.duration}ms`,
          'transition-timing-function': this.bezier,
        };
      }
    },
    mounted() {
      this.wrapperScroll()
    },
    watch:{
      scrollTop(o){
        console.log(o)
      }
    },
    methods: {
      wrapperScroll() {
        this.$nextTick(() => {
          console.log(this.scrollTop)
          this.wrapper = this.$refs.wrapper;
          this.scroller = this.$refs.wrapperScroller;
          const {height: wrapperHeight} = this.wrapper.getBoundingClientRect();
          const {height: scrollHeight} = this.scroller.getBoundingClientRect();
          this.wrapperHeight = wrapperHeight;
          this.minY = wrapperHeight - scrollHeight;
          console.log(this.scroller.getBoundingClientRect())
        });
      },
      onStart(e) {
        this.wrapperScroll()
        const point = e.touches ? e.touches[0] : e;
        this.isStarted = true;
        this.duration = 0;
        this.stop();
        this.pointY = point.pageY;
        this.momentumStartY = this.startY = this.offsetY;
        this.startTime = new Date().getTime();
      },
      onMove(e) {
        if (!this.isStarted) return;
        const point = e.touches ? e.touches[0] : e;
        const deltaY = point.pageY - this.pointY;
        // 浮点数坐标会影响渲染速度
        let offsetY = Math.round(this.startY + deltaY);
        // 超出边界时增加阻力
        if (offsetY < this.minY || offsetY > this.maxY) {
          offsetY = Math.round(this.startY + deltaY / 3);
        }
        this.offsetY = offsetY;
        const now = new Date().getTime();
        // 记录在触发惯性滑动条件下的偏移值和时间
        if (now - this.startTime > this.momentumTimeThreshold) {
          this.momentumStartY = this.offsetY;
          this.startTime = now;
        }
      },
      onEnd(e) {
        if (!this.isStarted) return;
        this.isStarted = false;
        if (this.isNeedReset()) return;
        const absDeltaY = Math.abs(this.offsetY - this.momentumStartY);
        const duration = new Date().getTime() - this.startTime;
        // 启动惯性滑动
        if (duration < this.momentumTimeThreshold && absDeltaY > this.momentumYThreshold) {
          const momentum = this.momentum(this.offsetY, this.momentumStartY, duration);
          this.offsetY = Math.round(momentum.destination);
          this.duration = momentum.duration;
          this.bezier = momentum.bezier;
        }
      },
      onTransitionEnd() {
        this.isNeedReset();
      },
      momentum(current, start, duration) {
        const durationMap = {
          'noBounce': 2500,
          'weekBounce': 800,
          'strongBounce': 400,
        };
        const bezierMap = {
          'noBounce': 'cubic-bezier(.17, .89, .45, 1)',
          'weekBounce': 'cubic-bezier(.25, .46, .45, .94)',
          'strongBounce': 'cubic-bezier(.25, .46, .45, .94)',
        };
        let type = 'noBounce';
        // 惯性滑动加速度
        const deceleration = 0.009;
        // 回弹阻力
        const bounceRate = 10;
        // 强弱回弹的分割值
        const bounceThreshold = 300;
        // 回弹的最大限度
        const maxOverflowY = this.wrapperHeight / 6;
        let overflowY;

        const distance = current - start;
        const speed = 2 * Math.abs(distance) / duration;
        let destination = current + speed / deceleration * (distance < 0 ? -1 : 1);
        if (destination < this.minY) {
          overflowY = this.minY - destination;
          type = overflowY > bounceThreshold ? 'strongBounce' : 'weekBounce';
          destination = Math.max(this.minY - maxOverflowY, this.minY - overflowY / bounceRate);
        } else if (destination > this.maxY) {
          overflowY = destination - this.maxY;
          type = overflowY > bounceThreshold ? 'strongBounce' : 'weekBounce';
          destination = Math.min(this.maxY + maxOverflowY, this.maxY + overflowY / bounceRate);
        }

        return {
          destination,
          duration: durationMap[type],
          bezier: bezierMap[type],
        };
      },
      // 超出边界时需要重置位置
      isNeedReset() {
        let offsetY;
        if (this.offsetY < this.minY) {
          offsetY = this.minY;
        } else if (this.offsetY > this.maxY) {
          offsetY = this.maxY;
        }
        if (typeof offsetY !== 'undefined') {
          this.offsetY = offsetY;
          this.duration = 500;
          this.bezier = 'cubic-bezier(.165, .84, .44, 1)';
          return true;
        }
        return false;
      },
      stop() {
        // 获取当前 translate 的位置
        const matrix = window.getComputedStyle(this.scroller).getPropertyValue('transform');
        this.offsetY = Math.round(+matrix.split(')')[0].split(', ')[5]);
      },
    },
  }
</script>

<style rel="stylesheet/less" lang="less">
  .wrapper {
    margin: 0 auto;
    height: 100vh;
    width: 100%;
    overflow: hidden;
  }
</style>
