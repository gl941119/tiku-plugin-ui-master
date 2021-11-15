  <!-- 状态提示信息 -->
<template>
    <div class="wapstatus">
     <!-- 主观题 -->
      <div v-if="isSubjective">
        <div class="wapstatus-errorAnwser" v-if="errorAnswer || rightAnswerPart">
          <span>待改错</span>
        </div>
        <div class="wapstatus-beforeReview" v-if="beforeReview">
          <span v-if="studentAnswerLength-1 > 0">改错{{studentAnswerLength-1}}次</span>
        </div>
         <div class="wapstatus-errorAnwser" v-if="rightAnswer">
          <span v-if="studentAnswerLength-1 > 0">改错{{studentAnswerLength-1}}次</span>
        </div>
        <div :class="getStatus.className"><span>{{ getStatus.text}}</span></div>
      </div>
      <!-- 客观题 -->
      <div v-else>
        <div :class="getSubjective.className"><span>{{ getSubjective.text}}</span></div>
      </div>
       <!-- 答题卡 -->
      <div v-if="showSheet" class="answer-sheet">
        <span @click="handleClick">答题卡</span>
      </div>
    </div>
</template>
<script>
import { REVIEW_NO_ANSWER, REVIEW_RIGHT_ANSWER,ERROR_ANSWER, REVIEW_RIGHT_PART_ANSWER, REVIEW_ERROR_ANSWER, REVIEW_NO_REVIEW } from '@/config/answer-config'
import { QUESTION_TYPE_ANALYSIS, QUESTION_TYPE_GROUP, RIGHTSTATUS  } from '@/config/subject-config'
export default {
  props: {
    /** 顶部状态 */
    controlStatus: {
      type: String,
      default: '0'
    },
    showSheet:{
      type: Boolean,
      default: true
    },
    /** 题目对象 */
    dataSubject: {
      type: Object,
      default: () => {
        return {}
      }
    },
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
      return `${this.dataSubject.student_score || 0}/${this.dataSubject.points}`
    },
    // 学生回答的或者老师批阅的次数
    studentAnswerLength () {
      return this.dataSubject?.teacher_annotation?.length
    },

    getStatus () {
      if (this.beforeAnswer) {
        return {
          text: `未作答(${this.studentScore})`,
          className: 'wapstatus-before wapstatus'
        }
      } else if (this.errorAnswer) {
        return {
          text: `作答错误(${this.studentScore})`,
          className: 'wapstatus-error wapstatus'
        }
      } else if (this.rightAnswerPart) {
        return {
          text: `部分正确(${this.studentScore})`,
          className: 'wapstatus-error wapstatus'
        }
      } else if (this.beforeReview) {
        return {
          text: '老师批阅中，请耐心等候',
          className: 'wapstatus-review wapstatus'
        }
      } else if (this.rightAnswer) {
        return {
          text: `作答正确(${this.studentScore})`,
          className: 'wapstatus-right wapstatus'
        }
      } else {
        return {
          text: `未作答(${this.studentScore})`,
          className: 'wapstatus-before wapstatus'
        }
      }
    },
    getSubjective () {
     if (this.studentIsError) {
        return {
          text: `作答错误(${this.studentScore})`,
          className: 'wapstatus-error wapstatus'
        }
      } else if (this.studentIsRightPart) {
        return {
          text: `部分正确(${this.studentScore})`,
          className: 'wapstatus-right wapstatus'
        }
      } else if (this.studentIsRight) {
        return {
          text: `作答正确(${this.studentScore})`,
          className: 'wapstatus-right wapstatus'
        }
      } else if (this.studentIsNotAnswer) {
        return {
          text: `未作答(${this.studentScore})`,
          className: 'wapstatus-before wapstatus'
        }
      } else {
        return {
          text: `未作答(${this.studentScore})`,
          className: 'wapstatus-before wapstatus'
        }
      }
    }
  },
  methods:{
    handleClick(){
      this.$emit('showAnswerCard')
    }
  }
}
</script>
<style lang="scss">
.wapstatus {
    position: relative;
    height:80px;
    span {
      height:34px;
      font-size:24px;
      font-weight:400;
      line-height: 80px;
      margin-left: 20px;
      margin-right: 20px;
    }
  &-before {
    background:#F6F7F8;
    span {
      color:#6A707C;
    }
  }
  &-right {
    background:#FFF2E5;
    span {
      color:#FF8600;
    }
  }
  &-error {
    background:#FFEDE6;
    span {
      color:#FF4D07;
    }
  }
  &-errorAnwser{
    float: left;
    height: 42px;
    margin-top: 20px;
    margin-left: 20px;
    background: #FF6547;
    opacity: 0.8;
    border-radius: 22px;
    span {
      font-size: 24px;
      font-weight: 400;
      line-height:42px !important;
      color: #FFFFFF;
    }
  }
  &-beforeReview{
    margin-left: 20px;
    float: left;
    height: 42px;
    margin-top: 20px;
    background: #FF8000;
    opacity: 0.5;
    border-radius: 22px;
    span {
      font-size: 24px;
      font-weight: 400;
      line-height:42px !important;
      color: #FFFFFF;
    }
  }
  &-review {
    background:#FFF5EB;
    span {
      color:#FF8000;
    }
  }
  .answer-sheet{
    position: absolute;
    width: 152px;
    height: 48px;
    border-radius: 200px;
    right: 32px;
    top:16px;
    border: 2px solid #C2C7D1;
    text-align: center;
    span{
      font-size: 28px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #2B2F36;
      line-height: 48px;
    }
  }
}
</style>
