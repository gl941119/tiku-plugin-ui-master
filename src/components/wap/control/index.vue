<template>
  <div class="wap-control-default" :class="controlClassName" :style="selectedBorderStyle">
    <!--
        @slot 默认内容插槽
      -->
    <slot>1</slot>
    <div class="extra-content" v-if="controlExtraContent">
      <!--
        @slot 额外内容插槽（右上角的tips）
      -->
      <slot name="extraContent">
        待改错
      </slot>
    </div>
  </div>
</template>
<script>
import {
  QUESTION_TYPE_ANALYSIS,
  QUESTION_TYPE_GROUP,
  RIGHTSTATUS,
  GROUP_HAS_ANSWER,
  PART_RIGHT
} from '@/config/subject-config'

const ANSWERD = '1' // 已作答
const SUBJECTIVE_GROUP = '1' // 主观组合题
/** 批阅状态 */

export default {
  name: 'Control',
  props: {
    /** 数据类 */
    /** 控制组件数据源 */
    dataSubject: {
      type: Object,
      required: true
    },
    /** 是否为解析状态 */
    controlAnalysisStep: {
      type: Boolean,
      default: false
    },
    /** 是否显示额外的tip内容 */
    controlExtraContent: {
      type: Boolean,
      default: false
    },
    /** 当前选中id */
    dataCurrentId: {
      type: String,
      default: '2795'
    },
    /** 设置类名 */
    styleClass: { type: String, default: '' }
  },
  computed: {
    controlClassName () {
      let classSource = !this.controlAnalysisStep
        ? {
          'wap-control-subjective-topic': this.isSubjectiveTopic,
          'wap-control-answered': this.controlAnswered,
          'wap-control-part-answered': this.studentNoFinish // 学生部分作答
        }
        : {
          'wap-control-subjective-topic': this.isSubjectiveTopic,
          'wap-control-right': this.isStudentPartRight ? false : this.isRightAnswer,
          'wap-control-error': this.isStudentPartRight ? false : !this.isRightAnswer,
          'wap-control-part-right': this.isStudentPartRight
        }
      this.styleClass && (classSource[this.styleClass] = Boolean(this.styleClass))
      return classSource
    },
    /** 是否为主观题
     * 简答题 组合题中带有简答题
     */
    isSubjectiveTopic () {
      let subjectiveGroup = false
      if (this.dataSubject.topic_type === QUESTION_TYPE_GROUP) {
        let { children = [] } = this.dataSubject
        subjectiveGroup = children.some((i) => i.topic_type === QUESTION_TYPE_ANALYSIS)
      }
      return this.dataSubject.topic_type === QUESTION_TYPE_ANALYSIS || subjectiveGroup
    },
    /** 是否为已有作答的组合题 */
    isGroupTopic () {
      return this.isSubjectiveTopic ? this.dataSubject.group_part_answered === GROUP_HAS_ANSWER : false
    },
    /** 是否为正确答案 */
    isRightAnswer () {
      return this.dataSubject.answer_status === RIGHTSTATUS
    },
    /** 客观题 学生部分正确 */
    isStudentPartRight () {
      return this.dataSubject.is_all_right !== PART_RIGHT
    },
    /** 学生是否已作答 */
    controlAnswered () {
      let student_answer = this.studentAnswerList
      return Boolean(student_answer.length)
    },
    /** 是否为部分作答 */
    studentNoFinish () {
      return this.dataSubject.student_no_finish === true
    },
    /** 控制按钮的状态 */
    controlBtnStatus () {
      if (this.controlAnalysisStep) {
        return this.isRightAnswer ? 'RIGHT' : 'ERROR'
      }
      return this.controlAnswered ? 'ANSWERED' : 'REVIEW_NO_ANSWER'
    },
    /** 是否选中状态 */
    selectedBorderStyle () {
      let colorMap = {
        REVIEW_NO_ANSWER: '#C0C4CC',
        ANSWERED: '#FF8000',
        RIGHT: '#07CD5A',
        ERROR: '#FF6547'
      }
      /** 部分作答显示未作答的边框颜色 */
      let color = this.studentNoFinish ? colorMap.REVIEW_NO_ANSWER : colorMap[this.controlBtnStatus]
      let selected = this.dataCurrentId === this.dataSubject.id
      return selected && { border: `1px solid ${color}` }
    }
  }
}
</script>
<style lang="scss">
@import '@/assets/scss/var.scss';
@import '@/assets/scss/control-mixin.scss';
$big-hei: 42px;
$default-hei: 38px;
$small-hei: 32px;
%base-style {
  opacity: 1;
  cursor: pointer;
  text-align: center;
  user-select: none;
}
/**默认大小 */
.wap-control {
  /**默认样式 */
  &-default {
    position: relative;
    @extend %base-style;
    @include border-radius-type(50%);
    @include control-size($small-hei, 30px, 14px);
    @include control-theme(#ffffff, #909399);
    border: 1px solid #c0c4cc;
    .extra-content {
      position: absolute;
      top: -7px;
      left: 23px;
      width: 44px;
      height: 14px;
      text-align: center;
      background-color: #f64500;
      color: #ffffff;
      font-size: 10px;
      line-height: 14px;
      border-radius: 10px;
      font-weight: normal;
      padding: 0 4px;
    }
  }
  /**主观题 */
  &-subjective-topic {
    @include border-radius-type(4px);
  }
  /**已答 */
  &-answered {
    @include control-theme(#ff8000, #ffffff);
    border: 1px solid #ff8000;
  }
  /**组合题有部分作答 */
  &-part-answered {
    background: linear-gradient(to bottom, #ff8000 50%, #c0c4cc 50%);
    border: none;
    color: #ffffff;
    line-height: 32px;
  }
  /**正确 */
  &-right {
    @include control-theme(#07cd5a, #ffffff);
    border: 1px solid #07cd5a;
  }
  /**部分正确 */
  &-part-right {
    background: linear-gradient(to bottom, #07cd5a 50%, #ff6547 50%);
    border: none;
    color: #ffffff;
    line-height: 32px;
  }
  /**错误 */
  &-error {
    @include control-theme(#ff6547, #ffffff);
    border: 1px solid #ff6547;
  }
  /**small */
  &-small {
    @include control-size($small-hei, 32px, 14px);
  }
}
</style>
