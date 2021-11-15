<!-- 单选题 -->
<template>
  <div class="wap-single question-common" :class="styleSetClass">
    <div class="wap-single__wrapper">
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
      <div class="wap-single-body select-img" v-html="questionOriginBody"></div>
      <div class="wap-single-option-box">
        <div class="wap-single-option" :style="optionWidth" v-for="(item, index) in questionOption" :key="index" :class="setOptionStatus(item.label)">
          <span class="wap-single-option-item__wrapper" @click="handleChoose(item)">
            <span class="wap-single-option-item">{{ item.label }}</span>
          </span>
          <div v-html="item.option_title" class="wap-single-option-text"></div>
        </div>
      </div>
      <!-- 教师端预览统计插槽 -->
      <slot name="questionBottom"></slot>
      <template v-if="controlShowBottom">
        <!--
        @slot 有默认底部slot 可自定义
        -->
        <slot name="bottom">
          <div class="select-bottom-answer">
            <div>
              <p>
                正确答案：
                <span>{{rightAnswerList.join(' ')}}</span>
              </p>
            </div>
            <div>
              <div>
                我的答案：
                <span class="no-answer" v-if="noAnswer">未作答</span>
                <span v-else :class="{'error':answerError}">{{studentAnswerList.join(' ')}}</span>
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
  </div>
</template>

<script>
import SubjectTitle from '../components/subject-title'
import BasicsMixins from '../../mixins/subject-basics-mixins'
import SelectMixins from '../../mixins/select-mixins'
import BottomAnalysis from '../components/bottom-analysis'
import SubjectStatus from './../components/subject-status'

export default {
  name: 'single-selection',
  mixins: [BasicsMixins, SelectMixins],
  components: {
    SubjectTitle,
    BottomAnalysis,
    SubjectStatus
  }
}
</script>
<style lang='scss'>
.wap-single {
  font-family: PingFang SC;
  font-size: 32px;
  &__wrapper {
    background-color: #fff;
    border-radius: 0 0 24px 24px;
  }
  &-body {
    padding: 0 32px;
    overflow: hidden;
    padding-top: 32px;
    word-break: break-all;
    * {
      font-size: 32px !important;
      font-weight: bold !important;
    }
  }
  &-option-box {
    display: flex;
    flex-wrap: wrap;
    padding: 0 32px;
  }
  &-option {
    display: flex;
    margin-top: 48px;
    &-item {
      &__wrapper {
        width: 96px;
        height: 96px;
        text-align: center;
        line-height: 96px;
        flex-shrink: 0;
        margin-right: 12px;
      }
      width: 72px;
      height: 72px;
      display: inline-block;
      font-size: 32px;
      border: 1px solid #909399;
      font-weight: 400;
      line-height: 72px;
      text-align: center;
      border-radius: 50%;
      vertical-align: middle;
    }
    &-text {
      line-height: 72px;
      font-size: 32px;
      padding-top: 12px;
      * {
        margin: 0 !important;
        padding: 0 !important;
        line-height: 72px !important;
        font-size: 32px !important;
      }
    }
    &.now-answer,
    &.right,
    &.error {
      .wap-single-option-item {
        font-weight: 500;
        border: 1px solid transparent;
      }
    }
    &.now-answer {
      .wap-single-option-item {
        background-color: $--color-wap-active-primary;
      }
    }
    &.right {
      .wap-single-option-item {
        color: #fff;
        background-color: $--color-right-primary;
      }
    }
    &.error {
      .wap-single-option-item {
        color: #fff;
        background-color: $--color-error-primary;
      }
    }
  }
  .select-bottom-answer {
    padding: 72px 32px 32px;
    > div {
      font-size: 32px;
      font-weight: 500;
      display: inline-block;
      &:first-child {
        margin-right: 64px;
      }
      span {
        color: $--color-wap-right-primary;
        &.error {
          color: $--color-wap-error-primary;
        }
      }
    }
    .no-answer {
      color: #adb1b9;
    }
  }
}
</style>
