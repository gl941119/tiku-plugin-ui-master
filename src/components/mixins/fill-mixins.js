import { REVIEW_NO_ANSWER, HAS_ANSWER, NOT_ALL_ANSWER } from '@/config/answer-config'
import { debounce } from '@/libs/utils/index.js'
const STR = '(@*&)'

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
    },
    /** 控制直接显示正确答案，优先级高于controlAnswered */
    controlShowRightAnswer: {
      type: Boolean,
      default: false
    }
    /* 样式类props */
  },
  data () {
    return {
      STR,
      /* 匹配填空项正则 */
      reg: /<input readonly.*?\/>/g,
      /* 初始填空项索引 */
      fillIndex: 0,
      /* 答案数组 */
      answerList: [],
      /* 题干数据 */
      questionBody: '',
      /* 学生正确答案数组 */
      userRightList: [],
      /* 需计算长度的字符串 */
      computedLengthText: '',
      fillDomList: []
    }
  },
  /* 组件开发需监听controlAnswered与controlShowRightAnswer来控制显示 */
  watch: {
    controlAnswered () {
      this.initQuestionBody()
    },
    controlShowRightAnswer () {
      this.initQuestionBody()
    }
  },
  created () {
    this.addFillInput()
    this.initQuestionBody()
  },
  mounted () {
    this.fillDomList = this.$refs.myFill.querySelectorAll('.fill-item')
    this.initFillWidth()
  },
  methods: {
    /* 根据状态动态设置类名 */
    setOptionStatus (right, user) {
      if (this.controlShowRightAnswer) {
        return 'right'
      }
      if (!this.controlAnswered && user) {
        return 'inputed'
      }
      if (this.controlAnswered && !user) {
        return 'no'
      }
      return this.isRight(right, user) ? 'right' : 'error'
    },
    computedFillWidth (e) {
      this.computedLengthText = e.value
      this.$nextTick(() => {
        e.style.width = Math.max(this.$refs.computedLengthDom.offsetWidth + 12, 80) + 'px'
      })
    },
    initFillWidth () {
      this.fillDomList.forEach(e => {
        e.style.width = Math.max(e.scrollWidth + 8, 80) + 'px'
      })
    },
    /* 初始化题干 */
    initQuestionBody () {
      if (this.controlShowRightAnswer) {
        this.answerList = [...this.rightAnswerList]
      } else {
        const student_answer = this.studentAnswerList || []
        this.answerList = [...student_answer]
      }
      this.fillIndex = 0
      const canEdit = !this.controlAnswered && !this.controlShowRightAnswer
      let str = ''
      let setClass = ''
      let text = ''
      const questionBody = this.questionOriginBody.replace(this.reg, () => {
        /** 若答案数组项有值，则可能是作答状态也可能是解析状态，解析状态还需判断正误 */
        if (this.answerList[this.fillIndex]) {
          setClass = this.setOptionStatus(this.rightAnswerList[this.fillIndex], this.answerList[this.fillIndex])
          text = this.answerList[this.fillIndex].replace(this.STR, '<span class="or">或</span>')
        } else {
          this.answerList[this.fillIndex] = ''
          setClass = this.controlAnswered ? 'no' : ''
          text = this.controlAnswered ? '未作答' : ''
        }
        str = `<span class="fill-box">
                <span><input class="fill-item ${setClass}" ${canEdit ? '' : 'disabled'} data-index="${this.fillIndex}"  value="${text}"></input><span class="index">(${this.fillIndex + 1})</span></span>
              </span>`
        this.fillIndex += 1
        return str
      })
      this.questionBody = questionBody
    },
    /* 填空项是否正确 */
    isRight (rightAnswer = '', userAnswer = '') {
      const reg = /\s+/ig
      const rightList = rightAnswer.split(STR)
      const resObj = rightList.find(s => {
        return s.trim().replace(reg, '') === userAnswer.trim().replace(reg, '')
      })
      return !!resObj
    },
    checkNode (node) {
      return node.className.indexOf('fill-item') !== -1
    },
    /* 检验答题状态 */
    checkAnswerStatus (answerList) {
      let status = REVIEW_NO_ANSWER
      if (answerList.every(str => !!str)) {
        status = HAS_ANSWER
      } else if (answerList.every(str => !str)) {
        status = REVIEW_NO_ANSWER
      } else {
        status = NOT_ALL_ANSWER
      }
      return status
    },
    /* 填空项输入事件 */
    handleInput (e) {
      const target = e.target
      if (this.checkNode(target)) {
        const width = this.computedFillWidth(target)
        target.style.width = width + 'rem'
        this.handleChangeAnswer(target)
      }
    },
    /* 抛出答案事件，防抖 */
    handleChangeAnswer: debounce(function (target) {
      this.answerList[target.dataset.index] = target.value
      const answer_status = this.checkAnswerStatus(this.answerList)
      /* 组装抛出答案对象 */
      const resObj = {
        student_answer: this.answerList,
        answer_status
      }
      /** 获取答案事件,输入时触发 可取得所输答案对象 */
      this.$emit('choose', resObj)
    }),
    handleClick (e) {
      const target = e.target
      const value = target.value
      if (this.checkNode(target)) {
        if (!(~~target.dataset.isFocus)) {
          target.value = ''
          target.value = value
          target.dataset.isFocus = '1'
        }
        if (!target.onblur) {
          /* 懒绑定填空项失焦事件 */
          target.onblur = (e) => {
            this.hadnleBlur(e, target.value)
          }
        }
      }
    },
    handleKeydown (e) {
      const target = e.target
      const value = target.value
      /* 当在输入框内输入换行时，禁止换行并将光标移到最后 */
      if (this.checkNode(target) && e.keyCode === 13) {
        target.value = ''
        target.value = value
      }
    },
    /* 填空项失焦事件 */
    hadnleBlur (e, text) {
      const target = e.target
      target.dataset.isFocus = '0'
      text = text.trim().replace(/\s+/g, ' ')
      target.value = text
      /* 失焦后若有内容，则添加inputed类名,没有则移除 */
      if (text) {
        target.classList.add('inputed')
      } else {
        target.classList.remove('inputed')
      }
    },
    /* 采用事件代理的形式为填空项绑定事件 */
    addFillInput () {
      this.$nextTick(() => {
        if (this.$refs.myFill) {
          this.$refs.myFill.addEventListener('input', this.handleInput)
          this.$refs.myFill.addEventListener('click', this.handleClick)
          this.$refs.myFill.addEventListener('keydown', this.handleKeydown)
        }
      })
    },
    replaceOption (str) {
      return str.replace(STR, '<span class="or">或</span>')
    }
  }
}
