import { BASE_PUBLIC_PROPS, JUDGE_PROPS, FILL_PROPS, ANALYSIS_PROPS, GROUP_PROPS } from '@/config/topic-props'
import { QUESTION_TYPE_GROUP } from '@/config/subject-config'
import store from '@/store'
const START_INDEX = 0
const FIRST_SUB_TOPIC = 1
export default {
  props: {
    ...BASE_PUBLIC_PROPS,
    ...JUDGE_PROPS,
    ...FILL_PROPS,
    ...ANALYSIS_PROPS,
    ...GROUP_PROPS,
    /** 整个数据源 controlCanToggle为true必传 */
    dataSource: {
      type: Array,
      default: () => []
    },
    /** 当前题目索引 controlCanToggle为true必传 */
    controlCurrentTopicIndex: {
      type: Number,
      default: 0
    },
    // 是否是学生端传递,
    isStudent: {
      type: Boolean,
      default: true
    },
    // 是否是试卷中心预览传递,
    paperPreview:{
      type: Boolean,
      default: false
    },
  },
  data () {
    return {
      topicIndex: this.controlCurrentTopicIndex,
      subDataIndex: FIRST_SUB_TOPIC // 默认展示第一小题
    }
  },

  watch: {
    controlCurrentTopicIndex (newVal, oldVal) {
      if (newVal !== oldVal) {
        let maxIndex = this.dataSource.length - 1
        this.topicIndex = maxIndex < newVal ? maxIndex : Math.max(newVal, 0)
      }
    },
    showCurrentTopic: {
      handler (c) {
        this.$store.dispatch('fetchCurrentTopic', c)
      },
      immediate: true
    }
  },

  computed: {
    /** 当前展示题目 */
    showCurrentTopic () {
      return this.dataSource[this.topicIndex]
    },
    /** 函数参数 */
    handlerFunction () {
      return {
        particulars: this.particulars,
        picture: this.picture,
        preview: this.preview,
        changeTopic:this.changeTopic,
        choose: this.choose,
        delanswer: this.delanswer,
        changeStatus: this.changeStatus,
        answerSubmit: this.answerSubmit,
        selfAnswer: this.selfAnswer,
        save: this.save,
        showAnswerCard: this.showAnswerCard
      }
    },
    /** 题目列表的条数 */
    topicLen () {
      return this.dataSource.length || START_INDEX
    },
    /** 组装返回给用户的数据 */
    combineUserdata () {
      return [this.showCurrentTopic, this.dataSource, this.topicIndex]
    },
    /** 是否当前为组合题 */
    isCurrentGroup () {
      return this.showCurrentTopic.topic_type === QUESTION_TYPE_GROUP
    }
  },
  methods: {
    /** 邻近的题目 */
    handleGetNearTopic (isPrev = false) {
      let len = this.dataSource.length
      let index = isPrev ? Math.max(this.topicIndex - 1, START_INDEX) : Math.min(this.topicIndex + 1, len - 1)
      return this.dataSource[index]
    },
    handleGetSlot (h, slotName) {
      let hasSlot = this.$slots[slotName]
      return hasSlot ? <div slot={ slotName }>{ hasSlot }</div> : null
    }
  }
}
