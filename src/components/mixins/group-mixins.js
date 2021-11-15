
export default {
  props: {
    /* 控制类props */
    /** 未作答、已作答标志，true为已作答 */
    controlAnswered: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    choose (answerList) {
      /** 输入答案事件,输入框失焦时触发 可取得所输答案数组 */
      this.$emit('choose', answerList)
    },
     // 组合题保存小题
    save(res){
      this.$emit('save', res)
    },
    preview (imgeObject) {
      /** 学生点击预览放大自己答题图片事件， 对象取得4个参数( status,index, item, list)
       *status表示当前状态，
       *index表示当前点击图片索引，
       * item表示学生当前点击的图片，
       * list表示学生答题的图片集合 */
      this.$emit('preview', imgeObject)
    },
    particulars (imgeObject) {
      /** 学生点击查看老师对自己答案批注的事件， 取得5个参数(status，index, item, teacherAnnotationItem, analysisData)，
       *  *status表示当前状态，
       * index表示当前图片索引。
       * item表示学生当前点击的图片。
       * teacherAnnotationItem表示当前图片老师的批注信息。
       * analysisData表示当前题目的解析 */
      this.$emit('particulars', imgeObject)
    },
    delanswer (imgeObject) {
      /** 学生点击删除已作答图片 ,对象取得3个参数 （status，index, item,）
       *  status表示当前状态，
       * index当前图片序号，
       * item当前图片元素 */
      this.$emit('delanswer', imgeObject)
    }
  }
}
