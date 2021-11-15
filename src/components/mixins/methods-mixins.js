export default {
  methods: {
    picture () {
      console.log('学生点击拍照调用摄像头功能')
      /** 学生点击拍照调用摄像头功能 */
      this.$emit('picture')
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
    choose (source) {
      /** 选择答案事件 可得到最新的数据源 */
      this.$emit('choose', source)
    },
    delanswer (imgeObject) {
      /** 学生点击删除已作答图片 ,对象取得3个参数 （status，index, item,）
       *  status表示当前状态，
       * index当前图片序号，
       * item当前图片元素 */
      this.$emit('delanswer', imgeObject)
    },
    // 组合题最后一题抛出事件
    changeTopic(){
      this.$emit('changeTopic')
    },
    // 组合题保存小题
    save(res){
      this.$emit('save', res)
    },
     // 简答题、线下题，主动重新修改，外部改变状态
     changeStatus(status){
      this.$emit('changeStatus',status)
    },
    answerSubmit(answerList){ 
      this.$emit('answerSubmit',answerList)
    },
     // 线下题，自主作答提交
     selfAnswer(val){
      this.$emit('selfAnswer',val)
    },
    showAnswerCard () {
      this.$emit('showAnswerCard')
    }
  }
}
