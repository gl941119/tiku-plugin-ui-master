<script>
import {
  QUESTION_TYPE_SINGLE,
  QUESTION_TYPE_MULTIPLE,
  QUESTION_TYPE_JUDGE,
  QUESTION_TYPE_FILL,
  QUESTION_TYPE_ANALYSIS,
  QUESTION_TYPE_GROUP
} from '@/config/subject-config'
import TopicCombineMixins from '../../mixins/topic-components-mixins'
import MethodsMixins from '../../mixins/methods-mixins'
import { REVIEW_NO_ANSWER, HAS_ANSWER, NOT_ALL_ANSWER } from '@/config/answer-config'

import Selection from '../selection'
import Judge from '../judge'
import Fill from '../fill'
import AnalysisItem from '../analysis-item'
import GroupItem from '../group-item'
export default {
  name: 'Topic',
  mixins: [MethodsMixins, TopicCombineMixins],
  components: {
    Selection,
    Judge,
    Fill,
    AnalysisItem,
    GroupItem
  },
  methods: {
      choose (source) {
       if (source && typeof source === 'object') {
        let { topic_type: questionType } = this.dataSubject

        let isGroupTopic = questionType === QUESTION_TYPE_GROUP

        let index = Math.max(this.subdataIndex - 1, 0)

        for (let i in source) {
          if (isGroupTopic) {
            let subQuestion = this.dataSubject.children || []
            this.$set(subQuestion[index], i, source[i])
            subQuestion[index][i] = source[i]
            if (subQuestion[index].student_no_finish !== false) {
              this.$set(subQuestion[index], 'student_no_finish', !!subQuestion[index].student_answer.length)
            }
          } else {
            this.$set(this.dataSubject, i, source[i])
          }
        }

        if (isGroupTopic) {
          let { subQuestion = [] } = this.dataSubject
          let studentNoFinish = subQuestion.some((i) => i.student_no_finish === true)
          this.$set(this.dataSubject, 'student_no_finish', studentNoFinish)
        }
        /** 选择答案事件 可得到最新的数据源 */
        this.$emit('choose', this.dataSubject)
      }
    }
  },
  render (h) {
    let { className, renderTopicComponents } = this
    return <div class={className}>{renderTopicComponents(h)}</div>
  }
}
</script>
