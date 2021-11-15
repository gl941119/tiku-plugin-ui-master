<script>
import {
  QUESTION_TYPE_SINGLE,
  QUESTION_TYPE_MULTIPLE,
  QUESTION_TYPE_JUDGE,
  QUESTION_TYPE_FILL,
  QUESTION_TYPE_ANALYSIS,
  QUESTION_TYPE_GROUP,
  QUESTION_TYPE_OFFLINE

} from '@/config/subject-config'
import TopicCombineMixins from '../../mixins/topic-components-mixins'
import MethodsMixins from '../../mixins/methods-mixins'

import Selection from '../selection'
import Judge from '../judge'
import Fill from '../fill'
import AnalysisItem from '../analysis-item'
import GroupItem from '../group-item'
import offlineItem from '../offline-item'
export default {
  name: 'Topic',
  mixins: [MethodsMixins, TopicCombineMixins],
  components: {
    Selection,
    Judge,
    Fill,
    AnalysisItem,
    GroupItem,
    offlineItem
  },
  methods: {},
  render (h) {
    let { className, renderTopicComponents } = this
    return <div class={className}>{renderTopicComponents(h)}</div>
  }
}
</script>
