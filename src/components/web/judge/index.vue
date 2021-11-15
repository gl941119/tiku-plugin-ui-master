<!-- 判断题组件 -->
<template>
  <div class="judge question-common" :class="styleSetClass">
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
    <div class="question-common-body-web select-img" v-html="questionOriginBody"></div>
    <div class="judge-option">
      <div v-for="v in questionOption" :key="v.id" class="judge-option-item" :style="optionWidth" :class="setOptionStatus(v.label)" @click="handleChoose(v)">
        <span class="lable"></span>
        <span>{{ v.option_title}}</span>
      </div>
    </div>
    <!-- 教师端预览统计插槽 -->
    <slot name="questionBottom"></slot>
    <template v-if="controlShowBottom">
      <!--
        @slot 有默认底部slot 可自定义
      -->
      <slot name="bottom">
        <div v-if="!paperPreview" class="judge-bottom-answer">
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
import JudgeMixins from '../../mixins/judge-mixins'
import BottomAnalysis from '../components/bottom-analysis'
import SubjectStatus from './../components/subject-status'

export default {
  components: {
    SubjectTitle,
    BottomAnalysis,
    SubjectStatus
  },
  mixins: [BasicsMixins, JudgeMixins]
}
</script>
<style lang='scss'>
.judge {
  &-option {
    padding: 0 32px;
    margin-top: 12px;
    display: flex;
    flex-wrap: wrap;
    &-item {
      margin-bottom: 36px;
      cursor: pointer;
      font-size: 16px;
      > .lable {
        display: inline-block;
        width: 22px;
        height: 22px;
        vertical-align: middle;
        margin-right: 28px;
        border-radius: 50%;
        background-image: url('~_img/judge/wap-option-default.png');
        background-size: contain;
      }
      &.now-answer {
        > .lable {
          background-image: url('~_img/judge/wap-option-now.png');
        }
      }
      &.right {
        > .lable {
          background-image: url('~_img/judge/wap-option-right.png');
        }
      }
      &.error {
        > .lable {
          background-image: url('~_img/judge/wap-option-error.png');
        }
      }
    }
  }
  .question-common-body-web{
    padding: 0 32px
  }
  &-bottom-answer {
    padding: 0 32px;
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
