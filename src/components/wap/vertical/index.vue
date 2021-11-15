<template>
  <div class="portrait-answer__wrapper">
    <div :class="frameworkClass" v-if="!dataSource.length"></div>
    <div id="portrait-answer" :class="{'no-header':controlAnswered}" v-else>
      <my-header v-if="!controlAnswered&&controlHeader" :secondTime="secondTime" @showAnswerCard="showAnswerCard" @over="handleOver"></my-header>
      <topic-handle
        v-model="controlIndex"
        :dataSource="dataSource"
        :controlAnswered="controlAnswered"
        :controlShowStatus="controlShowStatus"
        :controlShowBottom="controlShowBottom"
        v-bind="$attrs"
        v-on="$listeners"
        @showAnswerCard="showAnswerCard"
      ></topic-handle>
      <vertical-answer-dialog class="answer-dialog" :showSubmit="!controlAnswered" :dataSource="topicData" v-model="answerCardVisible" @change-topic="changeTopic" @submit="handleSubmit" :controlCurrentTopicIndex="controlIndex"></vertical-answer-dialog>
      <my-dialog v-model="confirmVisible" class="confirm-box">
        <div style="background-color: white">
          <div class="confirm-content">{{ confirmText }}</div>
          <div class="handle-box">
            <div @click="closeConfirmDialog">检查一下</div>
            <div @click="submitAnswer" class="sub-btn">提交</div>
          </div>
        </div>
      </my-dialog>
    </div>
  </div>
</template>

<script>
import '_scss/index.scss'
import { debounce } from '@/libs/utils/index.js'
import TopicHandle from '@/components/wap/topic-handle'
import MyHeader from '@/components/wap/components/header'
import verticalAnswerDialog from '@/components/wap/components/vertical-answer-dialog'
import myDialog from '@/components/dialog'
import { flatTopic } from '@/libs/utils/handle-topic'
import { HAS_ANSWER } from '@/config/answer-config.js'
export default {
  components: {
    TopicHandle,
    MyHeader,
    verticalAnswerDialog,
    myDialog
  },
  props: {
    /** 试卷题目数据 */
    topicData: {
      type: Array,
      default: () => []
    },
    /** 试卷答题倒计时，以秒为单位，有则显示 */
    secondTime: {
      type: Number
    },
    /** 是否显示底部解析 */
    controlShowBottom: {
      type: Boolean,
      default: false
    },
    /** 当前为解析还是作答 */
    controlAnswered: {
      type: Boolean,
      default: false
    },
    controlHeader: {
      type: Boolean,
      default: true
    },
    /** 是否显示题目顶部状态 */
    controlShowStatus: {
      type: Boolean,
      default: false
    },
    /** 当前显示的题目索引 */
    controlCurrentTopicIndex: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      answerCardVisible: false,
      confirmVisible: false,
      controlIndex: 0,
      confirmText: '本次作业还有题目未作答哦'
    }
  },
  computed: {
    dataSource () {
      console.log(flatTopic(this.topicData))
      return flatTopic(this.topicData)
    },
    frameworkClass () {
      return this.controlAnswered ? 'portrait-framework answerd' : 'portrait-framework'
    }
  },
  watch: {
    controlCurrentTopicIndex: {
      handler (c) {
        this.controlIndex = c
      },
      immediate: true
    }
  },
  methods: {
    handleSubmit () {
      const flag = this.dataSource.every(v => v.answer_status == HAS_ANSWER)
      if (flag) {
        this.confirmText = '作业提交后不可更改哦'
      } else {
        this.confirmText = '本次作业还有题目未作答哦'
      }
      this.confirmVisible = true
    },
    closeConfirmDialog () {
      this.confirmVisible = false
    },
    submitAnswer: debounce(function () {
      this.answerCardVisible = false
      this.confirmVisible = false
      this.$emit('submit', this.dataSource)
    }, 300),
    showAnswerCard () {
      this.answerCardVisible = true
    },
    handleOver () {
      console.log('倒计时结束')
      this.$emit('countdown-over')
    },
    changeTopic (v) {
      this.controlIndex = v.index
      this.answerCardVisible = false
    }
  }
}
</script>
<style lang="scss">
.portrait-framework {
  height: 100%;
  background-color: #f8f9fb;
  background-image: url('~@/assets/img/vertical/framework.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  &.answerd {
    background-image: url('~@/assets/img/vertical/framework-analysis.png');
  }
}

.portrait-answer__wrapper{
  height: 100%;
}

#portrait-answer {
  height: 100%;
  .topic-content{
    overflow-y: auto;
  }
  &.no-header {
    .swiper-container {
      height: 100%;
    }
  }
  .swiper-container {
    height: calc(100% - 72px);
  }
  .answer-dialog {
    .c-dialog {
      &__content {
        transform: translate3d(0, 0, 0);
        bottom: 0;
        left: 0;
        width: 100%;
      }
    }
  }
  .confirm-box {
    .c-dialog__content {
      width: 610px;
      height: 280px;
      padding: 56px 40px;
      font-size: 32px;
      font-weight: 400;
      color: $--wapcolor-answer-main;
      text-align: center;
      border-radius: 24px;
      background-color: #fff;
    }

    .confirm-content {
      margin-bottom: 40px;
    }

    .handle-box {
      display: flex;
      > div {
        width: 248px;
        height: 80px;
        line-height: 80px;
        border-radius: 80px;
        font-weight: 600;
        background-color: $--color-wap-warning-primary;
        &:first-child {
          background-color: #f4f5f8;
          color: #6a707c;
        }
        & + div {
          margin-left: 34px;
        }
      }
    }
  }
}
</style>
