<!-- 填空题组件 -->
<template>
  <div class="fill question-common" :class="styleSetClass">
    <div class="fill__wrapper">
      <!-- 提示信息 -->
      <slot name="status">
        <subject-status v-if="controlShowStatus" :controlStatus="controlStatus" :dataSubject="dataSubject"></subject-status>
      </slot>
      <template v-if="controlShowTitle">
        <subject-title
          :dataSubject="dataSubject"
          :dataRankSting="dataRankSting"
          :dataSubInnerIndexRight="dataSubInnerIndexRight"
          :controlIsGroup="controlIsGroup"
          :controlShowStyle="controlShowStyle"
          :controlShowScore="controlShowScore"
          :controlAutoPlay="controlAutoPlay"
          :controlShowSource="controlShowSource"
        />
      </template>
      <div ref="myFill" class="fill-body select-img" v-html="questionBody"></div>
      <!-- 教师端预览统计插槽 -->
      <slot name="questionBottom"></slot>
      <template v-if="controlShowBottom">
        <!--
        @slot 有默认底部slot 可自定义
        -->
        <slot name="bottom">
          <div v-if="!paperPreview" class="fill-bottom-answer">
            <div>
              <p>正确答案：</p>
              <div class="answer" v-for="(v,index) in rightAnswerList" :key="'answer'+index">
                <span>({{ index+1 }})</span>
                <p v-html="replaceOption(v)"></p>

              </div>
            </div>
            <div v-if="isStudent">
              <p>我的答案：</p>
              <div class="answer my-answer" v-for="(v,index) in rightAnswerList" :key="'my_answer'+index" :class="setOptionStatus(rightAnswerList[index],answerList[index])">
                <span>({{ index+1 }})</span>
                <p>{{ answerList[index] || '未作答' }}</p>
              </div>
            </div>
          </div>
        </slot>
      </template>
    </div>
    <template v-if="controlShowBottom">
      <slot name="analysis">
        <bottom-analysis :dataSubject="dataSubject" :showMedia="showMedia" />
      </slot>
    </template>
    <span ref="computedLengthDom" class="invisible-box">{{ computedLengthText }}</span>
  </div>
</template>

<script>
import SubjectTitle from '../components/subject-title'
import BasicsMixins from '../../mixins/subject-basics-mixins'
import FillMixins from '../../mixins/fill-mixins'
import BottomAnalysis from '../components/bottom-analysis'
import SubjectStatus from './../components/subject-status'

export default {
  components: {
    SubjectTitle,
    BottomAnalysis,
    SubjectStatus
  },
  mixins: [BasicsMixins, FillMixins],
  methods: {
    computedFillWidth (e) {
      this.computedLengthText = e.value
      this.$nextTick(() => {
        e.style.width = Math.max(this.$refs.computedLengthDom.offsetWidth + 8, 160) + 'px'
      })
    },
  }
}
</script>
<style lang='scss'>
.fill {
  &__wrapper {
    background-color: #fff;
  }
  &-body {
    padding: 0 32px;
    overflow: hidden;
    * {
      line-height: 32px !important;
      font-size: 16px !important;
      font-weight: 500 !important;
    }
  }
  .fill-box {
    display: inline-block;
    position: relative;
    text-indent: 0;
    white-space: nowrap;
    overflow: hidden;
    max-width: 95%;
    margin: 10px;
    vertical-align: middle;
    padding-left: 42px;
    > span {
      display: flex;
      align-items: center;
    }
    .index {
      position: absolute;
      width: 42px;
      font-weight: 500 !important;
      text-align: center;
      vertical-align: middle;
      left: 0px;
      border-top: 1px solid $--color-active-primary;
      border-left: 1px solid $--color-active-primary;
      border-bottom: 1px solid $--color-active-primary;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }
  }
  .fill-item {
    display: inline-block;
    width: 154px;
    max-width: 100%;
    outline: 0;
    border: 0;
    font-size: 16px;
    font-weight: 500 !important;
    padding-right: 10px;
    border-top: 1px solid $--color-active-primary;
    border-right: 1px solid $--color-active-primary;
    border-bottom: 1px solid $--color-active-primary;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    vertical-align: middle;
    text-overflow: ellipsis;
    &:focus {
      border-color: $--color-default-primary;
      background-color: #fff;
      text-overflow: revert;
      & ~ .index {
        background-color: #fff !important;
        border-color: $--color-default-primary;
      }
    }
    &.right,
    &.error,
    &.no {
      border-color: $--color-default-primary;
      background-color: #fff;
      text-overflow: ellipsis;
      & ~ .index {
        background-color: #fff;
        border-color: $--color-default-primary;
      }
    }
    &.inputed {
      border-color: $--color-default-primary;
      background-color: #fff;
      & ~ .index {
        color: #000;
        background-color: #fff;
        border-color: $--color-default-primary;
      }
    }
    &.right {
      color: $--color-right-primary;
      & ~ .index {
        color: $--color-right-primary;
      }
    }
    &.error {
      color: $--color-error-primary;
      & ~ .index {
        color: $--color-error-primary;
      }
    }
    &.no {
      color: $--color-default-primary;
      & ~ .index {
        color: $--color-default-primary;
      }
    }
  }

  &-bottom-answer {
    padding: 0 32px;
    font-size: 14px;
    font-weight: 400;
    margin-top: 32px;
    overflow: hidden;
    > div {
      margin-bottom: 32px;
      > p {
        margin-bottom: 24px;
        font-size: 16px;
        font-weight: 800;
      }
    }
    .answer {
      margin-bottom: 16px;
      display: flex;
      font-size: 14px;
      font-weight: 400;
      color: $--wapcolor-tite-headline;
      word-break: break-all;
      > span {
        margin-right: 24px;
        color: $--color-right-primary;
      }
      .or {
        color: $--color-tite-score;
        margin: 0 8px;
      }
      &.my-answer {
        &.error {
          > span {
            color: $--color-error-primary;
          }
        }
        &.no {
          > span {
            color: $--color-default-primary;
          }
        }
      }
    }
  }
  .invisible-box {
    position: fixed;
    z-index: -99999;
    left: -99999px;
    font-size: 16px;
    font-weight: 400;
    color: transparent;
  }
}
</style>
