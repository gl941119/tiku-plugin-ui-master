  <!-- 状态提示信息 -->
<template>
    <div class="status-warp">
     <!-- 主观题 -->
      <div v-if="isSubjective">
        <div class="status-warp-errorAnwser" v-if="errorAnswer || rightAnswerPart">
          <span>待改错</span>
        </div>
        <div class="status-warp-beforeReview" v-if="beforeReview">
          <span  v-if="studentAnswerLength-1 > 0">改错{{studentAnswerLength-1}}次</span>
        </div>
         <div class="status-warp-errorAnwser" v-if="rightAnswer">
          <span v-if="studentAnswerLength-1 > 0">改错{{studentAnswerLength-1}}次</span>
        </div>
        <div :class="getStatus.className"><span>{{ getStatus.text}}</span></div>
      </div>
      <!-- 客观题 -->
      <div v-else>
        <div :class="getSubjective.className"><span>{{ getSubjective.text}}</span></div>
      </div>
    </div>
</template>
<script>
import { REVIEW_NO_ANSWER, REVIEW_RIGHT_ANSWER,ERROR_ANSWER, REVIEW_RIGHT_PART_ANSWER, REVIEW_ERROR_ANSWER, REVIEW_NO_REVIEW} from '@/config/answer-config'
import { QUESTION_TYPE_ANALYSIS, QUESTION_TYPE_GROUP, RIGHTSTATUS  } from '@/config/subject-config'
export default {
  props: {
    /** 顶部状态 */
    controlStatus: {
      type: String,
      default: '0'
    },
    /** 题目对象 */
    dataSubject: {
      type: Object,
      default: () => {
        return {}
      }
    },
    /** 未作答、已作答标志，true为已作答 */
    controlAnswered: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    // 是否是主观题
    isSubjective () {
      return this.dataSubject.topic_type === QUESTION_TYPE_ANALYSIS || this.dataSubject.topic_type === QUESTION_TYPE_GROUP
    },

    // 主观题未作答，由外部传入状态0
    beforeAnswer () {
      return this.controlStatus === REVIEW_NO_ANSWER
    },
    // 主观题回答正确，由外部传入状态4
    rightAnswer () {
      return this.controlStatus === REVIEW_RIGHT_ANSWER
    },
    // 主观题回答错误，由外部传入状态2
    errorAnswer () {
      return this.controlStatus === REVIEW_ERROR_ANSWER
    },
    // 学生在主观题情况下部分正确，由外部传入状态3
    rightAnswerPart () {
      return this.controlStatus === REVIEW_RIGHT_PART_ANSWER
    },
    // 主观题批阅中，由外部传入状态1
    beforeReview () {
      return this.controlStatus === REVIEW_NO_REVIEW && this.dataSubject.topic_type === QUESTION_TYPE_ANALYSIS
    },
    // 客观题回答正确
    studentIsRight () {
      return String(this.dataSubject.answer_status) === RIGHTSTATUS
    },
    // 客观题回答错误
    studentIsError () {
       return String(this.dataSubject.answer_status) === ERROR_ANSWER
    },
    // 客观题未作答
    studentIsNotAnswer () {
      return String(this.dataSubject.answer_status) === REVIEW_NO_ANSWER
    },
    // 学生在客观题情况下部分正确
    studentIsRightPart () {
      return this.dataSubject.topic_type !== QUESTION_TYPE_ANALYSIS && parseInt(this.dataSubject.student_score) > 0 && parseInt(this.dataSubject.student_score) < parseInt(this.dataSubject.points)
    },
    // 学生得分
    studentScore () {
      return `${this.dataSubject.student_score}/${this.dataSubject.points}`
    },
    // 学生回答的或者老师批阅的次数
    studentAnswerLength () {
      return this.dataSubject?.teacher_annotation?.length
    },

    getStatus () {
      if (this.beforeAnswer) {
        return {
          text: `未作答(${this.studentScore})`,
          className: 'status-warp-before status-warp'
        }
      } else if (this.errorAnswer) {
        return {
          text: `作答错误(${this.studentScore})`,
          className: 'status-warp-error status-warp'
        }
      } else if (this.rightAnswerPart) {
        return {
          text: `部分正确(${this.studentScore})`,
          className: 'status-warp-error status-warp'
        }
      } else if (this.beforeReview) {
        return {
          text: '老师批阅中，请耐心等候',
          className: 'status-warp-review status-warp'
        }
      } else if (this.rightAnswer) {
        return {
          text: `作答正确(${this.studentScore})`,
          className: 'status-warp-right status-warp'
        }
      } else {
        return {
          text: `未作答(${this.studentScore})`,
          className: 'status-before status-warp'
        }
      }
    },
    getSubjective () {
      if (this.studentIsError) {
        return {
          text: `作答错误(${this.studentScore})`,
          className: 'status-warp-error status-warp'
        }
      } else if (this.studentIsRightPart) {
        return {
          text: `部分正确(${this.studentScore})`,
          className: 'status-warp-right status-warp'
        }
      } else if (this.studentIsRight) {
        return {
          text: `作答正确(${this.studentScore})`,
          className: 'status-warp-right status-warp'
        }
      } 
      else if (this.studentIsNotAnswer) {
        return {
          text: `未作答(${this.studentScore})`,
          className: 'status-warp-before status-warp'
        }
      } else  {
        return {
          text: `未作答(${this.studentScore})`,
          className: 'status-warp-before status-warp'
        }
      }
    }
  }
}
</script>
<style lang="scss">
.status-warp {
    height:52px;
    >span {
      height:20px;
      font-size:14px;
      font-weight:400;
      line-height: 52px;
      margin-left: 20px;
      margin-right: 20px;
    }
  &-before {
    background:#F4F4F5;
    span {
      color:#909399;
    }
  }
  &-right {
    background:#ECFBF5;
    span {
      color:#18CB7F;
    }
  }
  &-error {
    background:#FFF1EB;
    span {
      color:#FF4D07;
    }
  }
  &-errorAnwser{
    margin-left: 20px;
    float: left;
    height: 21px;
    margin-top: 15px;
    background: #FF6547;
    opacity: 0.8;
    border-radius: 11px;
    span {
      font-size: 12px;
      font-weight: 400;
      line-height:21px !important;
      color: #FFFFFF;
    }
  }
  &-beforeReview{
    margin-left: 20px;
    float: left;
    height: 21px;
    margin-top: 15px;
    background: #FF8000;
    opacity: 0.5;
    border-radius: 11px;
    span {
      font-size: 12px;
      font-weight: 400;
      line-height:21px !important;
      color: #FFFFFF;
    }
  }
  &-review {
    background:#FFF5EB;
    >span {
      color:#FF8000;
    }
  }
}
</style>
