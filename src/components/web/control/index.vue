<template>
  <div class="control-default" :class="controlClassName" :style="selectedBorderStyle">
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
          'control-subjective-topic': this.isSubjectiveTopic,
          'control-answered': this.controlAnswered,
          'control-part-answered': this.studentNoFinish // 学生部分作答
        }
        : {
          'control-subjective-topic': this.isSubjectiveTopic,
          'control-right': this.isStudentPartRight ? false : this.isRightAnswer,
          'control-error': this.isStudentPartRight ? false : !this.isRightAnswer,
          'control-part-right': this.isStudentPartRight
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
      let student_answer = this.dataSubject.student_answer
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
.control {
  /**默认样式 */
  &-default {
    position: relative;
    border: none;
    @extend %base-style;
    @include border-radius-type(50%);
    @include control-size($default-hei, $default-hei, 18px);
    @include control-theme(#f5f5f5, #303133);
    .extra-content {
      position: absolute;
      top: -7px;
      left: 18px;
      width: 42px;
      height: 16px;
      text-align: center;
      background-color: #ff6547;
      color: #ffffff;
      font-size: 12px;
      line-height: 16px;
      border-radius: 10px;
      padding: 0 3px;
    }
    &-selected {
      @include border-color(rgba(192, 196, 204, 1));
      color: #303133;
    }
  }
  /**已答 */
  &-answered {
    border: none;
    @include control-theme(rgba(255, 128, 0, 0.1), #ff8000);
    &-selected {
      @include border-color(#ff8000);
      color: #ff8000;
    }
  }
  /**主观题 */
  &-subjective-topic {
    @include border-radius-type(4px);
  }

  /**组合题有部分作答 */
  &-part-answered {
    background: linear-gradient(to bottom, rgba(255, 128, 0, 0.1) 50%, rgba(245, 245, 245, 1) 50%);
  }
  /**正确 */
  &-right {
    @include control-theme(rgba(7, 205, 90, 0.1), #07cd5a);
  }
  /**部分正确 */
  &-part-right {
    background: linear-gradient(to bottom, rgba(7, 205, 90, 0.1) 50%, rgba(255, 101, 71, 0.1) 50%);
    color: #ff6547;
  }
  /**错误 */
  &-error {
    @include control-theme(rgba(255, 101, 71, 0.1), #ff6547);
  }
  /**small */
  &-small {
    @include control-size($small-hei, 32px, 14px);
  }
}
</style>
