<!-- header -->
<template>
  <div class="c-header">
    <div class="c-header__content">
      <div class="time">
        <template v-if="secondTime">
          <img src="../../../assets/img/basics/count-down.png" />
          <span v-if="countDownStr">{{ countDownStr }}</span>
        </template>
      </div>
      <slot>
        <div class="answer-card" @click="clickAnswerCard">答题卡</div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    secondTime: {
      type: Number
    }
  },
  data () {
    return {
      countDownTime: 0,
      countDownStr: '',
      timer: null
    }
  },
  created () {

  },
  watch: {
    secondTime: {
      handler (c) {
        if (c) {
          this.countDownTime = c
          this.setTimer()
        }
      },
      immediate: true
    }
  },
  methods: {
    clickAnswerCard () {
      this.$emit('showAnswerCard')
    },
    formatTime (time) {
      const m = String(parseInt(time / 60)).padStart(2, '0')
      const s = String(time % 60).padStart(2, '0')
      return `${m}:${s}`
    },
    setTimer () {
      if (!this.timer) {
        this.timer = setInterval(() => {
          if (!this.countDownTime) {
            clearInterval(this.timer)
            this.timer = null
            this.$emit('over')
          } else {
            this.countDownStr = this.formatTime(--this.countDownTime)
          }
        }, 1000)
      }
    }
  },
}
</script>
<style lang='scss'>
.c-header {
  height: 72px;
  padding: 0 32px;
  border-bottom: 1px solid #ebedf2;
  &__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .time {
      display: flex;
      align-items: center;
      img {
        width: 30px;
        height: 30px;
      }
      span {
        font-size: 24px;
        font-weight: 400;
        color: #2b2f36;
        margin-left: 10px;
      }
    }
    .answer-card {
      width: 132px;
      height: 48px;
      font-size: 24px;
      border-radius: 24px;
      border: 2px solid #c2c7d1;
      line-height: 44px;
      text-align: center;
    }
  }
}
</style>
