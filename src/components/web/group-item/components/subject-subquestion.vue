<!-- 组合题子题内容 -->
<script>
import SelectionItem from './../../selection'
import JudgeItem from './../../judge'
import FillItem from './../../fill'
import AnalysisItem from './../../analysis-item'
import BottomAnalysis from './../../components/bottom-analysis'
import BasicsMixins from '@/components/mixins/subject-basics-mixins'
import GroupMixins from '@/components/mixins/group-mixins'
import {
  QUESTION_TYPE_SINGLE,
  QUESTION_TYPE_MULTIPLE,
  QUESTION_TYPE_JUDGE,
  QUESTION_TYPE_FILL,
  QUESTION_TYPE_GROUP,
  QUESTION_TYPE_ANALYSIS
} from '@/config/subject-config'
export default {
  components: {
    SelectionItem,
    JudgeItem,
    FillItem,
    AnalysisItem,
    BottomAnalysis
  },
  mixins: [BasicsMixins, GroupMixins],
  data () {
    return {
      titleIndex: '1.'
    }
  },
  props: {
    /* 数据类props */
    /** 子题题目对象 */
    dataItem: {
      type: Object,
      default: () => {
        return {}
      }
    },
    /** 未作答、已作答标志，true为已作答 */
    controlAnswered: {
      type: Boolean,
      default: false
    },
     /** 是否显示子题目音视频 */
    showMedia: {
      type: Boolean,
      default: false
    },
    /** 提目状态 */
    controlStatus: {
      type: String,
      default: '0'
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
    /** 是否显示顶部答题状态 */
    controlShowStatus: {
      type: Boolean,
      default: false
    },
    /** 二维码信息来源 */
    dataAppName: {
      type: String,
      default: 'online_edu_user_web'
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
    /**  共同Props参数 */
    publicProps () {
      return {
        dataSubject: this.dataItem,
        showMedia: this.showMedia,
        controlShowStatus: this.controlShowStatus,
        dataSubInnerIndexRight: this.dataSubInnerIndexRight,
        controlIsGroup: this.controlIsGroup,
        controlShowTitle: this.controlShowTitle,
        controlShowBottom: this.controlShowBottom,
        controlShowScore: this.controlShowScore,
        controlAutoPlay: this.controlAutoPlay,
        styleSetClass: this.styleSetClass,
        dataRankSting: this.dataRankSting,
        controlShowTeacherAnswer: this.controlShowTeacherAnswer
      }
    },
    /** 子题模板 */
    tempMap () {
      switch (this.dataItem.topic_type) {
        case QUESTION_TYPE_SINGLE:
          return 'selection-item'
        case QUESTION_TYPE_MULTIPLE:
          return 'selection-item'
        case QUESTION_TYPE_JUDGE:
          return 'judge-item'
        case QUESTION_TYPE_FILL:
          return 'fill-item'
        default:
          return 'analysis-item'
      }
    },
    /** 子题Props参数 */
    subQuestionProps () {
      if (this.tempMap === 'analysis-item') {
        return {
          ...this.publicProps,
          controlStatus: this.controlStatus,
          dataAppName: this.dataAppName,
          dataStudentAnswer: this.dataStudentAnswer
        }
      } else {
        return {
          ...this.publicProps,
          controlAnswered: this.controlAnswered,
          // 题目选项宽度，百分比单位
          dataWidth: this.dataWidth,
          controlIsSingle: this.controlIsSingle
        }
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
    let tempMap = this.tempMap
    /** @slot 有默认底部slot 可自定义 */
    let extraSlotBottom = this.hasSlotBottom ? <div slot="bottom">{this.$slots.bottom}</div> : null
    /** @slot 主观题自定义状态 */
    let analysisSlotQuestionBottom = this.hasSlotQuestionBottom ? <div slot="questionBottom">{this.$slots.questionBottom}</div> : null
    /** @slot 有默认status */
    let extraSlotStatus = this.hasSlotStatus ? <div slot="status">{this.$slots.status}</div> : null
    return (
      <div>
        <tempMap {...{ props: this.subQuestionProps }} {...{ on: this.subQuestionEvent }}>
          {extraSlotStatus}
          {extraSlotBottom}
          {analysisSlotQuestionBottom}
        </tempMap>
      </div>
    )
  }
}
</script>
<style lang="scss"></style>
