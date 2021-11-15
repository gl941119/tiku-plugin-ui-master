import {
  RIGHTSTATUS
} from '@/config/subject-config'

export default {
  props: {
    /* 数据类props */
    /** 题目对象 */
    dataSubject: {
      type: Object,
      default: () => {
        return {}
      }
    },
    /** 题目索引 （wap端需要传入当前索引和题目总数以/分割） 使用时需设置controlShowTitle为true */
    dataRankSting: {
      type: String,
      default: '1.'
    },
    showSheet: {
      type: Boolean,
      default: true
    },
    /** 是否显示子题目音视频 */
    showMedia: {
      type: Boolean,
      default: false
    },
    // 是否显示顶部改错次数
    controlLimit: {
      type: Boolean,
      default: true
    },
    /** 题目选项的宽度，百分比展示，默认100%，可根据剩余宽度自动调整间距 */
    dataWidth: {
      type: Number,
      default: 100
    },
    /* 控制类props */
    /** 是否显示title */
    controlShowTitle: {
      type: Boolean,
      default: true
    },
    /** 是否显示底部解析 */
    controlShowBottom: {
      type: Boolean,
      default: false
    },
    /** 是否显示标题样式 */
    controlShowStyle: {
      type: Boolean,
      default: true
    },
    /** (wap端用于组合题小题显示)组合题右边小题和题目总数显示 */
    dataSubInnerIndexRight: {
      type: String,
      default: ''
    },
    /** 是否显示组合题的小题题目前面的序号 */
    controlIsGroup: {
      type: Boolean,
      default: true
    },
    /** 是否显示分数 */
    controlShowScore: {
      type: Boolean,
      default: true
    },
    /** 提目状态 */
    controlStatus: {
      type: String,
      default: '0'
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
    },
    /** 改变音频播放时长后是否自动播放 */
    controlAutoPlay: {
      type: Boolean,
      default: true
    },
    /* 样式类props */
    /** 自定义类名 */
    styleSetClass: {
      type: String,
      default: ''
    },
    /** 控制类props */
    /** 是否显示题目要求 */
    controlTopicRequest: {
      type: Boolean,
      default: false
    },
    /** 是否显示老师批阅 */
    controlShowTeacherAnswer: {
      type: Boolean,
      default: false
    },
    /** 是否显示顶部答题状态 */
    controlShowStatus: {
      type: Boolean,
      default: false
    },
    /** 是否显示题目来源 */
    controlShowSource: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    /* 学生答案数组 */
    studentAnswerList () {
      return this.dataSubject.student_answer || []
    },
    /* 正确答案数组 */
    rightAnswerList () {
      return this.dataSubject.correct_answer || []
    },
    /* 自定义选项宽度 以百分比为单位 */
    optionWidth () {
      const dataWidth = this.dataWidth
      return {
        'width': dataWidth + '%',
        /* 宽度小于50%时根据剩下宽度自动设置margin-right，若大于50%则margin-right为0 */
        'margin-right': dataWidth * 2 > 100 ? '0%' : (100 - dataWidth * 2) / 2 + '%'
      }
    },
    /* 未作答 */
    noAnswer () {
      return !this.studentAnswerList.length
    },
    /* 回答错误 */
    answerError () {
      return String(this.dataSubject.answer_status) !== RIGHTSTATUS
    },
    questionOriginBody () {
      return this.dataSubject.topic_body
    },
    questionOption () {
      return this.dataSubject.exam_paper_topic_option
    }
  },
  methods: {
    /* 根据状态动态设置类名 需重写 */
    setOptionStatus () { },
    /** 选择答案 需重写 */
    handleChoose () { },
    showAnswerCard () {
      this.$emit('showAnswerCard')
    }
  }
}
