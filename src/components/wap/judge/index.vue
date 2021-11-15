<!-- 判断题组件 -->
<template>
  <div class="wap-judge question-common" :class="styleSetClass">
    <div class="wap-judge__wrapper">
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
      <div class="wap-judge-body select-img" v-html="questionOriginBody"></div>
      <div class="wap-judge-option">
        <div v-for="v in questionOption" :key="v.id" class="wap-judge-option-item" :style="optionWidth" :class="setOptionStatus(v.label)" @click="handleChoose(v)">
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
          <div class="wap-judge-bottom-answer">
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
.wap-judge {
  &__wrapper {
    background-color: #fff;
    border-radius: 0 0 24px 24px;
  }
  &-body {
    padding: 0 32px;
    * {
      font-size: 32px !important;
      line-height: 48px !important;
      font-weight: bold !important;
    }
  }
  &-option {
    margin-top: 44px;
    display: flex;
    flex-wrap: wrap;
    padding: 0 32px;
    &-item + &-item {
      margin-top: 24px;
    }

    &-item {
      height: 88px;
      display: flex;
      align-items: center;
      font-size: 32px;

      > .lable {
        display: inline-block;
        width: 40px;
        height: 40px;
        vertical-align: middle;
        margin-right: 40px;
        border-radius: 50%;
        background-image: url('~_img/judge/wap-option-default.png');
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
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
  &-bottom-answer {
    padding: 8px 32px 32px;
    > div {
      font-size: 32px;
      font-weight: 500;
      display: inline-block;
      p {
        font-size: 32px;
      }
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
