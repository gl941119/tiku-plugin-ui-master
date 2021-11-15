
<script>
import SubjectTitle from './../components/subject-title'
import SubjectBody from './components/subject-body'
import SubjectSubquestion from './components/subject-subquestion'
import BasicsMixins from '@/components/mixins/subject-basics-mixins'
import GroupMixins from '@/components/mixins/group-mixins'
import { QUESTION_TYPE_SINGLE, QUESTION_TYPE_MULTIPLE, QUESTION_TYPE_JUDGE, QUESTION_TYPE_FILL, QUESTION_TYPE_GROUP, QUESTION_TYPE_ANALYSIS } from '@/config/subject-config'
export default {
  components: {
    SubjectTitle,
    SubjectBody,
    SubjectSubquestion
  },
  mixins: [BasicsMixins, GroupMixins],
  data () {
    return {
      dataSubInnerIndex: '1.'
    }
  },
  props: {
    /* 控制类props */
    /** ()是否显示子题目 */
    controlShowSubTitle: {
      type: Boolean,
      default: true
    },
    /* 数据类props */
    /** 子题目题的序号 （用于组合题） */
    subdataIndex: {
      type: Number,
      default: 1
    },
    /** 是否显示顶部答题状态 */
    controlShowStatus: {
      type: Boolean,
      default: false
    },
    /** 单选题还是多选题，默认为true单选 */
    controlIsSingle: {
      type: Boolean,
      default: true
    },
    /** 控制类props */
    /** 学生作答上传图片之后轮询传入图片数组 */
    dataStudentAnswer: {
      type: Array,
      default: () => {
        return []
      }
    },
    /** 是否显示题目要求 */
    controlTopicRequest: {
      type: Boolean,
      default: true
    },
    /** 二维码信息来源 */
    dataAppName: {
      type: String,
      default: 'online_edu_user_web'
    }
  },
  methods: {
    // //判断组合体是否作答全部题目
    // choose(answerList) {
    //   let subQuestion=this.dataSubject.sub_question
    //   let student_no_finish = subQuestion.some(arr => arr.student_answer.length === 0) && !subQuestion.every(arr => arr.student_answer.length === 0)
    //   if(!student_no_finish) {
    //     for (let i = 0; i <this.dataInnerTotal; i++) {
    //     let { topic_type } = this.dataSubject.sub_question[i]
    //         if (topic_type === QUESTION_TYPE_FILL) {
    //           if(answerList.student_no_finish===true) {
    //             student_no_finish = true
    //             break
    //           }
    //         }
    //     }
    //   }
    //   /** 输入答案事件,输入框失焦时触发 可取得所输答案数组 */
    //   this.$emit('choose', answerList, student_no_finish)
    //   console.log(answerList)
    // },
    choose (res) {
      const temp = this.dataSubject.children[this.subdataIndex-1]
      const topic_type  = temp.topic_type
      // /** 当为单选题和判断题时自动切换下一题，若为最后一题则打开答题卡 */
      // if (topic_type === QUESTION_TYPE_SINGLE || topic_type === QUESTION_TYPE_JUDGE) {
      //   if (this.subdataIndex === this.dataInnerTotal-1) { // 最后一题
      //     this.$emit('changeTopic')
      //     console.log('切换下一个大题')
      //   }
      // }
      this.$emit('choose', res)
      this.$emit('save', temp)
    }
  },
  computed: {
    /** 是否存在bottom插槽 */
    hasSlotBottom () {
      return Boolean(this.$slots.bottom)
    },
    /** 是否存在questionBottom插槽 */
    hasSlotQuestionBottom () {
      return Boolean(this.$slots.questionBottom)
    },
    /** 是否存在status插槽 */
    hasSlotStatus () {
      return Boolean(this.$slots.status)
    },
    /* 题目总小题数 */
    dataInnerTotal () {
      return this.dataSubject.children.length !== undefined ? this.dataSubject.children.length : 0
    },
    /* 当前题目子标题序号 */
    subdataIndexString () {
      return `${this.subdataIndex}/${this.dataInnerTotal}`
    },
    dataSubInnerIndexString () {
      /* 题目当前小题数/当前组合题小题总数  如：1/3 */
      // return `第${this.subdataIndex}小题(共${this.dataSubject.sub_question !== undefined ? this.dataSubject.sub_question.length : 0}小题)`
      return ''
    },
    /** 子题Props参数 */
    subQuestionProps () {
      /** 子题序号,防止this.subdataIndex - 1 会存在有-1的风险未验证! */
      let subjectdataIndex
      if (this.subdataIndex - 1 >= 0) {
        subjectdataIndex = this.subdataIndex - 1
      } else {
        subjectdataIndex = 1
      }
      const dataItem = this.dataSubject.children[subjectdataIndex]
      return {
        dataItem,
        showMedia: true,
        dataAppName: this.dataAppName,
        // 题目选项宽度，百分比单位
        dataWidth: this.dataWidth,
        /** 子题标题序号示 */
        dataRankSting: this.subdataIndexString,
        controlStatus: this.controlStatus,
        controlAnswered: this.controlAnswered,
        controlIsSingle: Number(this.dataSubject.children[subjectdataIndex].topic_type) === QUESTION_TYPE_SINGLE,
        dataStudentAnswer: this.dataStudentAnswer,
        /** 子题标题是否显示 */
        controlShowTitle: this.controlShowSubTitle,
        /** 子题标题右边 小题数和小题总数显示 */
        dataSubInnerIndexRight: this.dataSubInnerIndexString,
        controlShowTeacherAnswer: this.controlShowTeacherAnswer,
        controlIsGroup: this.controlIsGroup,
        controlShowStatus: this.controlShowStatus,
        controlShowBottom: this.controlShowBottom,
        controlShowScore: this.controlShowScore
      }
    },
    /** 子题v-on事件 */
    subQuestionEvent () {
      return {
        particulars: this.particulars,
        preview: this.preview,
        choose: this.choose,
        save:this.save,
        delanswer: this.delanswer
      }
    }

  },
  render (h) {
    /** @slot 有默认底部slot 可自定义 */
    let extraSlotBottom = this.hasSlotBottom ? <div slot="bottom">{this.$slots.bottom}</div> : null
    /** @slot 主观题自定义状态 */
    let analysisSlotQuestionBottom = this.hasSlotQuestionBottom ? <div slot="questionBottom">{this.$slots.questionBottom}</div> : null
    /** @slot 有默认status */
    let extraSlotStatus = this.hasSlotStatus ? <div slot="status">{this.$slots.status}</div> : null
    let className = this.styleSetClass + ' gruop'
    let classFloat = 'float-left'
    let classFloatBorder = 'float-left float-left-border'
    let classRequire = 'topic '
    /** 题目标题 */
    let subjectTitle = this.controlShowTitle ? <subject-title dataRankSting={this.dataRankSting} controlIsGroup={true} controlShowScore={this.controlShowScore} dataSubject={this.dataSubject} controlShowSource={this.controlShowSource}></subject-title> : null
    /** 题目要求 */
    let subjectRequire = this.controlTopicRequest ? <div><p>{this.dataSubject.topic_request}</p></div> : null
    /** 题干 */
    let subjecBody = <subject-body dataSubject={this.dataSubject}></subject-body>
    /** 子题内容 */
    let subjecSubquestion = <subject-subquestion { ...{ props: this.subQuestionProps }} {...{ on: this.subQuestionEvent }}>
      {extraSlotStatus}{extraSlotBottom}{analysisSlotQuestionBottom}</subject-subquestion>
    return (
      <div class={className}>
        <div class={classFloatBorder}>
          {subjectTitle}
          <div class={classRequire}>
            {subjectRequire}
          </div>
          {subjecBody}
        </div>
        <div class={classFloat}>
          {subjecSubquestion}
        </div>
      </div>
    )
  }
}
</script>
<style lang="scss">
  .gruop{
    background: #F3F4F5;
    display: flex;
    justify-content: space-between;
    height: 100%;
    .topic{
      background:#FFFFFF;
      p {
        font-size:14px;
        font-weight:400;
        line-height:40px;
        color:#909399;
      }
    }
  }
  .float-left{
    height: 100%;
    // overflow: auto;
    flex: 1;
    background: #FFFFFF;
    word-break: break-all;
    // padding: 20px;
    &-border{
      border-right: 1px solid #efe9e9;
    }
    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
      background-color: rgb(221, 228, 244);
    }
    &::-webkit-scrollbar {
      width: 6px;
      background-color: rgb(221, 228, 244);
    }
    &::-webkit-scrollbar-thumb {
      background-color:  #c1c1c1;
      border-radius: 4px;
    }
  }
</style>
