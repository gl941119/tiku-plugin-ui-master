<template>
  <!--  手机横屏-->
  <div class="across-warp">
    <!--    骨架屏-->
    <div class="across-bg" v-if="!dataSource.length"></div>
    <!--题目-->
    <div class="topic">
      <!--题目主体-->
      <topic-handle v-model="controlIndex" v-bind="$attrs" v-on="$listeners" v-if="dataSource.length" :disableSwiping="true" :dataSource="dataSource" ref="topic-handle" class="topic-main"></topic-handle>
      <!--题目按钮-->
      <div class="topic-footer">
        <div class="topic-footer--time" v-if="secondTime">
          <img src="../../../assets/img/across/across-time.png" alt />
          <span>{{countDownStr}}</span>
        </div>
        <div :class="handleDisabled(isFirst)" @click="onPrev">上一题</div>
        <div :class="handleDisabled(isLast)" @click="onNext">下一题</div>
      </div>
    </div>
    <div class="across-right">
      <!--开关-->
      <div class="switch" @click="onSwitch">
        <img v-show="showAnswer" src="../../../assets/img/across/switch-close.png" alt />
        <img v-show="!showAnswer" src="../../../assets/img/across/switch-open.png" alt />
      </div>
      <!--答题卡-->
      <AnswerSheet :dataSource="$attrs.topicData" class="answer-sheet" v-if="showAnswer" @changeTopic="changeTopic" :controlCurrentTopicIndex="controlIndex" v-bind="$attrs">
        <!-- 横屏时用-->
        <div slot="footer" class="footer">
          <div v-if="!isDisabledSubmitBtn" class="footer-btn" :class="isDisabledSubmitBtn ? 'disabled':''" @click="handleSubmit">提交</div>
        </div>
        <!--            <div slot="footer">1232</div>-->
      </AnswerSheet>
    </div>
  </div>
</template>
<script>

import TopicHandle from '@/components/wap/topic-handle'
import AnswerSheet from '../components/answer-sheet'
import { XtConfirm } from '@/components/wap/components/xt/index'
import { flatTopic } from '@/libs/utils/handle-topic'
import { HAS_ANSWER } from '@/config/answer-config.js'
import { debounce } from '@/libs/utils/index.js'
import { QUESTION_TYPE_GROUP } from '@/config/subject-config'

const $confirm = XtConfirm()

export default {
  props: {
    secondTime: {
      type: Number
    },
    /** 当前显示的题目索引 */
    controlCurrentTopicIndex: {
      type: Number,
      default: 0
    },
    isDisabledSubmitBtn: {
      type: Boolean,
      default: false
    }
  },
  components: {
    TopicHandle, AnswerSheet
  },
  data () {
    return {
      controlIndex: 0,//内部索引
      showAnswer: true,
      countDownTime: 0,
      countDownStr: '',
      timer: null,
      realIndex: this.$attrs.controlCurrentTopicIndex || 0,
      isSubLast: false,
      isSubFirst: false
    }
  },
  watch: {
    getCurrentTopic (c) {
      const { subIndex, children } = c
      this.isSubFirst = subIndex === 0
      this.isSubLast = subIndex === children.length - 1
    },
    controlCurrentTopicIndex: {
      handler (c) {
        this.controlIndex = c
      },
      immediate: true
    },
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
  computed: {
    getCurrentTopic () {
      return this.$store.getters.getCurrentTopic
    },
    isGroup () {
      return Number(this.getCurrentTopic.topic_type) === QUESTION_TYPE_GROUP
    },
    isLast () {
      /** 组合题需要判断是不是最后一道小题 */
      if (this.isGroup) {
        return this.controlIndex === this.dataSource.length - 1 && this.isSubLast
      } else {
        return this.controlIndex === this.dataSource.length - 1
      }
    },
    isFirst () {
      /** 组合题需要判断是不是第一一道小题 */
      if (this.isGroup) {
        return this.controlIndex === 0 && this.isSubFirst
      } else {
        return this.controlIndex === 0
      }
    },
    dataSource () {
      return flatTopic(this.$attrs.topicData)
    },
    mySwiper () {
      return this.$refs['topic-handle'].mySwiper
    },
    prevDisabled () {
      return {
        'topic-footer--btn': true,
        'topic-footer--disabled': flag
      }
    }
  },
  methods: {
    //答题卡索引改变
    // changeTopic(){
    //   this.$emit('change-topic', v)
    // },
    handleSubmit () {
      if (this.isDisabledSubmitBtn) return
      const flag = this.dataSource.every(v => v.answer_status == HAS_ANSWER)
      if (flag) {
        this.confirmText = '作业提交后不可更改哦'
      } else {
        this.confirmText = '本次作业还有题目未作答哦'
      }
      $confirm({
        content: this.confirmText,
        onOk: () => {
          this.submitAnswer()
        },
        onCancel: () => {

        }
      })
    },
    submitAnswer: debounce(function () {
      console.log('提交')
      this.$emit('submit', this.dataSource)
    }, 300),
    changeTopic (index) {
      // const [,,topicIndex] = obj
      this.controlIndex = index
    },
    onNext () {
      if (this.isLast) return
      this.isSubLast = this.$refs['topic-handle'].nextTopic()
      this.isSubFirst = false
    },
    onPrev () {
      if (this.isFirst) return
      this.isSubFirst = this.$refs['topic-handle'].prevTopic()
      this.isSubLast = false
    },
    handleDisabled (flag) {
      return {
        'topic-footer--btn': true,
        'topic-footer--disabled': flag
      }
    },
    onSwitch () {
      this.showAnswer = !this.showAnswer
      //更新swiper
      this.$nextTick(() => this.mySwiper.update())

    },
    clickAnswerCard () {
      this.$emit('click-answer-card')
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
            this.$emit('countdown-over')
          } else {
            this.countDownStr = this.formatTime(--this.countDownTime)
          }
        }, 1000)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
//横屏
.across-warp {
  height: 100%;
  background: rgba(248, 249, 251, 1);
  padding: 24px 0 24px 24px;

  display: flex;
  justify-content: space-around;
  align-items: center;

  .disabled {
    background: #f4f5f8 !important;
    border: 1px solid #f4f5f8 !important;
    color: #adb1b9 !important;
  }
  .footer {
    height: 104px;
    width: 100%;
    display: flex;
    align-items: center;

    &-btn {
      width: 346px;
      height: 72px;
      background: #ffd700;
      border-radius: 36px;

      font-size: 28px;
      font-weight: 500;
      color: #2b2f36;
      line-height: 72px;
      text-align: center;
    }
  }

  .topic {
    width: 854px;
    height: 100%;
    background: #ffffff;
    box-shadow: 0px 4px 16px 0px rgba(235, 237, 242, 0.5);
    border-radius: 24px;
    overflow: hidden;
    flex: 1;
    display: flex;
    flex-direction: column;

    &-main {
      flex: 1;
      width: 100%;
    }
    >>> .wapstatus {
      padding: 8px;
      border-radius: 12px 12px 0 0;
    }

    &-footer {
      width: 100%;
      height: 104px;
      background: #ffffff;

      display: flex;
      justify-content: flex-end;
      align-items: center;

      padding: 0 32px;

      &--btn {
        width: 180px;
        height: 72px;
        border-radius: 36px;
        border: 1px solid #c2c7d1;

        font-size: 28px;
        font-weight: 500;
        color: #2b2f36;
        line-height: 72px;
        text-align: center;

        margin-right: 32px;
      }

      &--disabled {
        background: #f4f5f8;
        border: 1px solid #f4f5f8;
        color: #adb1b9;
      }

      &--time {
        flex: 1;

        > img {
          width: 30px;
          height: 30px;
          vertical-align: bottom;
        }

        > span {
          font-size: 24px;
          line-height: 30px;
          color: #2b2f36;
          margin-left: 10px;
        }
      }
    }
  }

  > .across-right {
    margin-left: 16px;
    display: flex;
    /*width: 246px;*/

    height: 100%;

    > .switch {
      width: 64px;
      height: 100%;
      background: #ffffff;

      background: url('../../../assets/img/across/switch.png') no-repeat;
      background-size: 64px 100%;

      display: flex;
      justify-content: center;
      align-items: center;
    }

    .answer-sheet {
      width: 376px;
      /*width: 0;*/
      height: 100%;
      background: #ffffff;
      /*border-radius: 24px 0px 0px 24px;*/
      overflow: hidden;
    }
  }
  .across-bg {
    background: url('../../../assets/img/across/across-bg.png') no-repeat;
    background-size: 100% 100%;
    position: fixed;
    left: 24px;
    top: 24px;
    right: 0;
    bottom: 24px;
    z-index: 9999;
  }
}
</style>

