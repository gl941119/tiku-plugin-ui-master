import { HAS_ANSWER } from '@/config/answer-config'

export default {
  props: {
    /* 数据类props */
    /* 控制类props */
    /** 单选题还是多选题，默认为true单选 */
    controlIsSingle: {
      type: Boolean,
      default: true
    },
    /** 是否显示title */
    controlShowTitle: {
      type: Boolean,
      default: true
    },
    /** 未作答、已作答标志，true为已作答 */
    controlAnswered: {
      type: Boolean,
      default: false
    },
    /** 是否显示顶部答题状态 */
    controlShowStatus: {
      type: Boolean,
      default: false
    }
    /* 样式类props */
  },
  data () {
    return {
      /* 当前答案数组 */
      nowAnswerList: []
    }
  },
  created () {
    this.nowAnswerList = this.studentAnswerList
  },
  methods: {
    /* 根据状态动态设置类名 */
    setOptionStatus (name) {
      const { controlAnswered, nowAnswerList, studentAnswerList, rightAnswerList } = this
      return {
        'now-answer': !controlAnswered && nowAnswerList.find(value => value === name),
        'right': controlAnswered && studentAnswerList.indexOf(name) !== -1 && rightAnswerList.indexOf(name) !== -1,
        'error': controlAnswered && studentAnswerList.indexOf(name) !== -1 && rightAnswerList.indexOf(name) === -1
      }
    },
    /** 选择答案 */
    handleChoose (item) {
      /* 已作答直接返回 */
      if (this.controlAnswered) {
        return false
      }
      let resObj = {}
      if (this.controlIsSingle) {
        this.nowAnswerList = [item.label]
      } else {
        const tempAnswer = this.nowAnswerList.find(value => value === item.label)
        this.nowAnswerList = tempAnswer ? this.nowAnswerList.filter(value => value !== item.label) : [...this.nowAnswerList, item.label]
      }
      /** 判断所选答案是否正确 */
      resObj = {
        student_answer: this.nowAnswerList,
        answer_status: HAS_ANSWER
      }
      /** 选择答案事件 可取得所选答案对象 */
      this.$emit('choose', resObj)
    }
  }
}
