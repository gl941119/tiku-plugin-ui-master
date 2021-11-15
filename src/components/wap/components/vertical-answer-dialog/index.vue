<!-- 竖屏答题卡弹出层 -->
<template>
  <div class="vertical-answer-dialog">
    <bottom-dialog v-model="visiable" @input="handleInput">
      <answer-sheet class="answer-sheet" :dataSource="dataSource" @onClick="changeTopic" :controlCurrentTopicIndex="controlCurrentTopicIndex" controlOrientation="0" :isShowModule="false">
        <div v-if="showSubmit" slot="footer" class="vertical-answer-dialog__handle">
          <div class="btn" @click.stop="handleSubmit">提交</div>
        </div>
      </answer-sheet>
    </bottom-dialog>
  </div>
</template>

<script>
import BottomDialog from '@/components/dialog'
import answerSheet from '../answer-sheet'
export default {
  components: {
    BottomDialog,
    answerSheet
  },
  props: {
    showSubmit: {
      type: Boolean,
      default: true
    },
    controlCurrentTopicIndex: {
      type: Number,
      default: 0
    },
    value: {
      type: Boolean,
      default: false
    },
    dataSource: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      visiable: false
    }
  },
  watch: {
    value: {
      handler (c) {
        this.visiable = c
      },
      immediate: true
    }
  },
  methods: {
    handleInput (v) {
      this.$emit('input', v)
    },
    handleSubmit () {
      this.$emit('submit')
    },
    changeTopic (v) {
      this.$emit('change-topic', v)
    }
  }
}
</script>
<style lang='scss'>
.vertical-answer-dialog {
  .answer-sheet {
    background-color: #ffffff;
    border-top-left-radius: 24px;
    border-top-right-radius: 24px;
  }
  &__handle {
    width: 100%;
    height: 144px;
    padding: 24px 32px;
    background-color: #fff;
    .btn {
      height: 96px;
      line-height: 96px;
      background-color: #ffd700;
      border-radius: 48px;
      text-align: center;
      font-size: 32px;
      font-weight: bold;
      color: #2b2f36;
    }
  }
}
</style>
