<!-- 填空题组件 -->
<template>
  <div class="wap-fill question-common" :class="styleSetClass">
    <div class="wap-fill__wrapper">
      <!-- 提示信息 -->
      <slot name="status">
        <subject-status v-if="controlShowStatus" :controlStatus="controlStatus" :showSheet="showSheet" :dataSubject="dataSubject" @showAnswerCard="showAnswerCard"></subject-status>
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
      <div ref="myFill" class="wap-fill-body select-img" v-html="questionBody"></div>
      <!-- 教师端预览统计插槽 -->
      <slot name="questionBottom"></slot>
      <template v-if="controlShowBottom">
        <!--
        @slot 有默认底部slot 可自定义
        -->
        <slot name="bottom">
          <div class="wap-fill-bottom-answer">
            <div>
              <p>正确答案：</p>
              <div class="answer" v-for="(v,index) in rightAnswerList" :key="'answer'+index">
                <span>({{ index+1 }})</span>
                <p v-html="replaceOption(v)"></p>
              </div>
            </div>
            <div>
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
  mixins: [BasicsMixins, FillMixins]
}
</script>
<style lang='scss'>
.wap-fill {
  &__wrapper {
    background-color: #fff;
    border-radius: 0 0 24px 24px;
  }
  &-body {
    padding: 0 32px;
    overflow: hidden;
    * {
      line-height: 64px !important;
      font-size: 32px !important;
      font-weight: 400 !important;
    }
  }
  .fill-box {
    display: inline-block;
    position: relative;
    text-indent: 0;
    white-space: nowrap;
    overflow: hidden;
    max-width: 95%;
    padding-left: 84px;
    margin: 10px;
    vertical-align: middle;
    > span {
      display: flex;
      align-items: center;
    }
    .index {
      position: absolute;
      width: 84px;
      font-weight: 500 !important;
      text-align: center;
      vertical-align: middle;
      left: 0px;
      background-color: $--color-wap-active-primary;
      border-top: 1px solid $--color-wap-active-primary;
      border-left: 1px solid $--color-wap-active-primary;
      border-bottom: 1px solid $--color-wap-active-primary;
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
    border-top: 1px solid transparent;
    border-right: 1px solid transparent;
    border-bottom: 1px solid transparent;
    background-color: $--color-wap-active-primary;
    border-top-right-radius: 4px;
    border-top-left-radius: 0px;
    border-bottom-right-radius: 4px;
    border-bottom-left-radius: 0px;
    vertical-align: middle;
    text-overflow: ellipsis;
    -webkit-appearance: none;
    opacity: 1;
    &:focus {
      border-color: $--color-wap-default-primary;
      background-color: #fff;
      text-overflow: revert;
      & ~ .index {
        background-color: #fff !important;
        border-color: $--color-wap-default-primary;
      }
    }
    &.right,
    &.error,
    &.no {
      border-color: $--color-wap-default-primary;
      background-color: #fff;
      text-overflow: ellipsis;
      & ~ .index {
        background-color: #fff;
        border-color: $--color-wap-default-primary;
      }
    }
    &.inputed {
      border-color: $--color-wap-default-primary;
      background-color: #fff;
      & ~ .index {
        color: #000;
        background-color: #fff;
        border-color: $--color-wap-default-primary;
      }
    }
    &.right {
      color: $--color-wap-right-primary;
      & ~ .index {
        color: $--color-wap-right-primary;
      }
    }
    &.error {
      color: $--color-wap-error-primary;
      & ~ .index {
        color: $--color-wap-error-primary;
      }
    }
    &.no {
      color: $--color-wap-default-primary;
      & ~ .index {
        color: $--color-wap-default-primary;
      }
    }
  }

  &-bottom-answer {
    font-size: 28px;
    font-weight: 400;
    padding: 0 32px;
    margin-top: 48px;
    overflow: hidden;
    > div {
      margin-bottom: 80px;
      > p {
        margin-bottom: 40px;
        font-size: 32px;
        font-weight: 800;
      }
    }
    .answer {
      margin-bottom: 32px;
      display: flex;
      font-size: 28px;
      font-weight: 400;
      line-height: 40px;
      color: $--wapcolor-tite-headline;
      word-break: break-all;
      > span {
        margin-right: 24px;
        color: $--color-wap-right-primary;
      }
      &.my-answer {
        &.error {
          > span {
            color: $--color-wap-error-primary;
          }
        }
        &.no {
          > span {
            color: $--color-wap-default-primary;
          }
        }
      }
    }
  }
  .invisible-box {
    position: fixed;
    z-index: -99999;
    left: -99999px;
    font-size: 32px;
    font-weight: 400;
    color: transparent;
  }
}
</style>
