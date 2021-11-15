import { RIGHTSTATUS } from '@/config/subject-config'
import { HAS_ANSWER } from '@/config/answer-config'

export default {
  props: {
    /* 数据类props */
    /* 控制类props */
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
  created () {
    this.nowAnswerList = this.studentAnswerList
  },
  computed: {
    /* 回答是否正确 */
    isRight () {
      return this.dataSubject.answer_status === RIGHTSTATUS
    },
  },
  methods: {
    /* 根据状态动态设置类名 */
    setOptionStatus (name) {
      const { controlAnswered, nowAnswerList, rightAnswerList, studentAnswerList } = this
      return {
        'now-answer': !controlAnswered && nowAnswerList.includes(name),
        'right': controlAnswered && rightAnswerList.includes(name),
        'error':
          controlAnswered && studentAnswerList.includes(name) && !rightAnswerList.includes(name)
      }
    },
    /** 选择答案事件 */
    handleChoose (v) {
      /* 已作答直接返回 */ 
      if (this.controlAnswered) {
        return false
      }
      this.nowAnswerList = [v.label]
      const resObj = {
        student_answer: [v.label],
        answer_status: HAS_ANSWER
      }
      this.$forceUpdate()
      /** 选择答案事件 可取得所选答案对象 */
      this.$emit('choose', resObj)
    }
  }
}
