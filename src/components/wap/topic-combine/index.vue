<script>
import TopicComponent from '../topic-component'
import { QUESTION_TYPE_GROUP } from '@/config/subject-config'
import MethodsMixins from '../../mixins/methods-mixins'
import TopicCombineMixin from '../../mixins/topic-combine-mixin'
import ToggleTopic from './toggle-events'
const START_INDEX = 0
const FIRST_SUB_TOPIC = 1

export default {
  name: 'TopicCombine',
  mixins: [MethodsMixins, TopicCombineMixin],
  props: {
    /** 移动多少距离才触发切换事件 默认50 */
    controlTouchMoveDis: {
      type: Number,
      default: 50
    }
  },
  components: {
    TopicComponent
  },
  data () {
    return {
      mainHandler: null,
      smallHandler: null
    }
  },
  mounted () {
    let allTopicDom = document.querySelector('.topic-content')
    this.mainHandler = new ToggleTopic(allTopicDom, this.controlTouchMoveDis)
    this.mainHandler.start([this.handlePrevMainTopic, this.handleNextMainTopic])
    this.handleSubBindEvent()
  },
  beforeDestroy () {
    this.mainHandler.destroy()
    this.smallHandler && this.smallHandler.destroy()
  },
  methods: {
    /** 切换大题 */
    handlePrevMainTopic () {
      if (this.topicIndex === START_INDEX) {
        /** 学生作答切换下一题为最后一题 */
        this.$emit('prev-start', ...this.combineUserdata)
        return
      }
      this.handleToggleTopicBefore(() => {
        this.topicIndex = Math.max(this.topicIndex - 1, START_INDEX)
        /** 若当前题为组合题则回到第一小题 */
        this.subDataIndex = FIRST_SUB_TOPIC
      })
    },
    /** 切换下一题大题 */
    handleNextMainTopic () {
      if (this.topicIndex === this.topicLen - 1) {
        /** 学生作答切换下一题为最后一题 */
        this.$emit('next-last', ...this.combineUserdata)
        return
      }
      this.handleToggleTopicBefore(() => {
        this.topicIndex = Math.min(this.topicIndex + 1, this.topicLen)
        /** 若当前题为组合题则回到第一小题 */
        this.subDataIndex = FIRST_SUB_TOPIC
      })
    },
    /** 切换组合题小题 */
    handleToggleGroupSub (toggleType = 'PREV') {
      let { topic_type: questionType, children: subQuestion = [] } = this.showCurrentTopic
      if (questionType === QUESTION_TYPE_GROUP) {
        let maxLen = subQuestion.length
        let prev = Math.max(FIRST_SUB_TOPIC, this.subDataIndex - 1)
        let next = Math.min(maxLen, this.subDataIndex + 1)
        this.subDataIndex = toggleType === 'PREV' ? prev : next
      }
    },

    /** 切换题目前置事件
     * @param {Function} cb 回调函数
     */
    async handleToggleTopicBefore (cb) {
      /** 切换下一题的前置事件 */
      this.$emit('before', ...this.combineUserdata)
      cb()
      /** 切换下一题的前置事件 */
      this.$emit('change-topic', ...this.combineUserdata)
      await this.$nextTick()
      /** 回到顶部 */
      let topic = this.$refs.topic
      topic && (topic.$el.scrollTop = 0)
      this.handleSubBindEvent()
    },
    /** 子题目绑定事件 */
    handleSubBindEvent () {
      if (this.smallHandler) {
        this.smallHandler.destroy()
        this.smallHandler = null
      }
      if (this.isCurrentGroup) {
        // 子题目区域
        let smallDom = document.querySelector('.sub-content')
        if (!smallDom) return
        this.smallHandler = new ToggleTopic(smallDom, this.controlTouchMoveDis)
        this.smallHandler.start(true, [this.handleToggleGroupSub, this.handleToggleGroupSub.bind(this, 'NEXT')])
      }
    }
  },
  render (h) {
    let { topicLen, topicIndex, $props, showCurrentTopic, subDataIndex, handlerFunction } = this
    let props = Object.assign({}, $props, {
      dataSubject: showCurrentTopic,
      subdataIndex: subDataIndex,
      dataRankSting: `${topicIndex + 1}/${topicLen}`
    })
    console.log(props)
    let bottomSlot = this.handleGetSlot(h, 'bottom')
    let statusSlot = this.handleGetSlot(h, 'status')
    let questionBottomSlot = this.handleGetSlot(h, 'questionBottom')
    return (
      <topic-component ref="topic" { ...{ props, on: handlerFunction } }>
        {bottomSlot }
        {statusSlot }
        {questionBottomSlot }
      </topic-component>
    )
  }
}
</script>
<style lang="scss">
.topic-content {
  height: 100%;
  overflow-x: hidden;
}
</style>
