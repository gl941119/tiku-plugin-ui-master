<!-- 单选题 -->
<template>
  <div class="single question-common" :class="styleSetClass">
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
      />
    </template>
    <div class="single-body select-img" v-html="questionOriginBody"></div>
    <div class="single-option-box">
      <div class="single-option" :style="optionWidth" v-for="(item, index) in questionOption" :key="index" :class="setOptionStatus(item.label)" @click="handleChoose(item)">
        <span class="single-option-item">{{ item.label }}</span>
        <div v-html="item.option_title" class="single-option-text"></div>
      </div>
    </div>
    <!-- 教师端预览统计插槽 -->
    <slot name="questionBottom"></slot>
    <template v-if="controlShowBottom">
      <!--
        @slot 有默认底部slot 可自定义
      -->
      <slot name="bottom">
        <div v-if="!paperPreview" class="select-bottom-answer">
          <div>
            <p>
              正确答案：
              <span>{{rightAnswerList.join(' ')}}</span>
            </p>
          </div>
          <div>
            <div  v-if="isStudent">
              我的答案：
              <span v-if="noAnswer">未作答</span>
              <span v-else :class="{'error':answerError}">{{studentAnswerList.join(' ')}}</span>
            </div>
          </div>
        </div>
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
<style lang="scss">
.single {
  font-family: PingFang SC;
  &-option-box {
    display: flex;
    flex-wrap: wrap;
    padding:0 32px;
  }
  .single-body{
    padding:0 32px;
  }
  &-option {
    display: flex;
    padding: 12px 0;
    cursor: pointer;
    margin-bottom: 16px;
    &-item {
      width: 36px;
      height: 36px;
      border: 1px solid #909399;
      color: $--color-body;
      line-height: 36px;
      font-size: 16px;
      text-align: center;
      border-radius: 50%;
      margin-right: 24px;
      flex-shrink: 0;
      vertical-align: middle;
    }
    &-text {
      * {
        line-height: 36px !important;
        font-size: 16px !important;
      }
    }
    &.now-answer,
    &.right,
    &.error {
      .single-option-item {
        color: #fff;
        border: 1px solid transparent;
      }
    }
    &.now-answer {
      .single-option-item {
        background-color: $--color-wap-warning-primary;
      }
    }
    &.right {
      .single-option-item {
        background-color: $--color-right-primary;
      }
    }
    &.error {
      .single-option-item {
        background-color: $--color-error-primary;
      }
    }
  }
  .select-bottom-answer {
    padding:0 32px;
    > div {
      font-size: 16px;
      font-weight: bold;
      display: inline-block;
      &:first-child {
        margin-right: 32px;
      }
      span {
        color: $--color-wap-right-primary;
        &.error {
          color: $--color-wap-error-primary;
        }
      }
    }
  }
}
</style>
