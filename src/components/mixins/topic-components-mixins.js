import {
  QUESTION_TYPE_SINGLE,
  QUESTION_TYPE_MULTIPLE,
  QUESTION_TYPE_JUDGE,
  QUESTION_TYPE_FILL,
  QUESTION_TYPE_ANALYSIS,
  QUESTION_TYPE_GROUP,
  QUESTION_TYPE_OFFLINE,
  QUESTION_TYPE_SELF
} from '@/config/subject-config'
import { REVIEW_NO_ANSWER, HAS_ANSWER, NOT_ALL_ANSWER } from '@/config/answer-config'
import { BASE_PUBLIC_PROPS, JUDGE_PROPS, FILL_PROPS, ANALYSIS_PROPS, GROUP_PROPS } from '@/config/topic-props'
export default {
  props: {
    ...BASE_PUBLIC_PROPS,
    ...JUDGE_PROPS,
    ...FILL_PROPS,
    ...ANALYSIS_PROPS,
    ...GROUP_PROPS,
    /** 设置整合组件的类名 */
    styleCombineClass: {
      type: String,
      default: ''
    },
    /** 子题目题的序号 （用于组合题） */
    subdataIndex: {
      type: Number,
      default: 1
    },
    // 是否是学生端传递,
    isStudent: {
      type: Boolean,
      default: true
    },
    // 是否是试卷中心预览传递,
    paperPreview: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    /** 当前题目类型 */
    questionType () {
      return Number(this.dataSubject.topic_type)
    },
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
    /** 单选题还是多选题，默认为true单选 */
    controlIsSingle () {
      return this.questionType === QUESTION_TYPE_SINGLE
    },
    className () {
      return (this.controlAnswered ? 'bgc-gary ' : '') + (this.styleCombineClass ? 'topic-content ' + this.styleCombineClass : 'topic-content')
    }
  },
  methods: {
    choose (source,subQuestion) {
      if (source && typeof source === 'object') {
        let { topic_type: questionType } = this.dataSubject
        let isGroupTopic = questionType === QUESTION_TYPE_GROUP

        for (let i in source) {
          if (isGroupTopic) {
            subQuestion[i] = source[i]
            this.$set(subQuestion, i, source[i])
          } else {
            this.$set(this.dataSubject, i, source[i])
          }
        }

        if (isGroupTopic) {
          const subQuestionList = this.dataSubject.children || []
          let status = REVIEW_NO_ANSWER
          if (subQuestionList.every(v => v.answer_status == HAS_ANSWER)) {
            status = HAS_ANSWER
          } else if (subQuestionList.every(v => v.answer_status == REVIEW_NO_ANSWER)) {
            status = REVIEW_NO_ANSWER
          } else {
            status = NOT_ALL_ANSWER
          }
          this.$set(this.dataSubject, 'answer_status', status)
          /** 单独抛出组合题小题 */
          this.$emit('choose', subQuestion)
          return
        }
        /** 选择答案事件 可得到最新的数据源 */
        this.$emit('choose', this.dataSubject)
      }
    },
    // 组合题保存小题
    save (res) {
      this.$emit('save', res)
    },
    /** 根据题型渲染对应的题 */
    combineTopicVNode () {
      const props = Object.assign({}, this.$props, {
        subdataIndex: this.subdataIndex,
        controlIsSingle: this.controlIsSingle
      })
      let handlerFn = {
        choose: this.choose,
        changeTopic: this.changeTopic,
        particulars: this.particulars,
        picture: this.picture,
        preview: this.preview,
        delanswer: this.delanswer,
        changeStatus: this.changeStatus,
        answerSubmit: this.answerSubmit,
        selfAnswer: this.selfAnswer,
        save: this.save,
        showAnswerCard: this.showAnswerCard
      }
      /** 选择题 */
      let selectionVNode = [QUESTION_TYPE_SINGLE, QUESTION_TYPE_MULTIPLE].includes(this.questionType)
        ? { tag: 'selection', props: { props, on: { choose: this.choose, showAnswerCard: this.showAnswerCard } } }
        : null
      let topicMapSource = {}

      topicMapSource[QUESTION_TYPE_SINGLE] = selectionVNode

      topicMapSource[QUESTION_TYPE_MULTIPLE] = selectionVNode

      topicMapSource[QUESTION_TYPE_JUDGE] = {
        tag: 'judge',
        props: { props, on: { choose: this.choose, showAnswerCard: this.showAnswerCard } }
      }

      topicMapSource[QUESTION_TYPE_FILL] = {
        tag: 'fill',
        props: { props, on: { choose: this.choose, showAnswerCard: this.showAnswerCard } }
      }

      topicMapSource[QUESTION_TYPE_ANALYSIS] = {
        tag: 'analysis-item',
        props: { props, on: handlerFn }
      }
      topicMapSource[QUESTION_TYPE_OFFLINE] = { // 线下题
        tag: 'offline-item',
        props: { props, on: handlerFn }
      }
      topicMapSource[QUESTION_TYPE_GROUP] = {
        tag: 'group-item',
        props: { props, on: handlerFn }
      }
      return topicMapSource[this.questionType]
    },

    /** 渲染对应的组件 */
    renderTopicComponents (h) {
      /** @slot 有默认底部slot 可自定义 */
      let extraSlotBottom = this.hasSlotBottom ? <div slot="bottom">{ this.$slots.bottom }</div> : null
      /** @slot 主观题自定义状态 */
      let analysisSlotStatus = this.hasSlotStatus ? <div slot="status">{ this.$slots.status }</div> : null
      /** @slot 主观题自定义状态 */
      let analysisSlotQuestionBottom = this.hasSlotQuestionBottom ? <div slot="questionBottom">{ this.$slots.questionBottom }</div> : null
      let {
        tag: Tag,
        props: { props, on }
      } = this.combineTopicVNode()
      return (
        <Tag { ...{ props, on } }>
          {extraSlotBottom }
          {analysisSlotStatus }
          {analysisSlotQuestionBottom }
        </Tag>
      )
    }
  }
}
