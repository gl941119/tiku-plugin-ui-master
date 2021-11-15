import {
  REVIEW_NO_ANSWER,
  REVIEW_TO_READ,
  REVIEW_RIGHT_ANSWER,
  REVIEW_RIGHT_PART_ANSWER,
  REVIEW_ERROR_ANSWER,
  REVIEW_NO_REVIEW
} from '@/config/answer-config'
export default {
  data () {
    return {
      // 当前答案对象
      nowanswerobj: {}
    }
  },
  props: {
    controlStatus: {
      type: String,
      default: '0'
    },
    dataSubject: {
      type: Object,
      default: () => {
        return {}
      }
    },
    /** 是否显示老师批阅 */
    controlShowTeacherAnswer: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    dataStudentAnswer (imglist) {
      this.imgListChange(imglist)
    }
  },
  methods: {
    // 数据删除
    delAnswer (index, item) {
      let imgeObject = {
        // 状态，已批改/待改错
        status: this.controlStatus,
        // 当前索引
        index: index,
        // 当前图片元素
        item: item
      }
      this.$emit('delanswer', imgeObject)
    },
   // 主动重新修改，外部改变状态
    rePublish(){
      this.$emit('changeStatus',{Status:'0',isNotRead:true})
    },
    previewAnswer (index, item, list) {
      let imgeObject = {
        // 状态，已批改/待改错
        status: this.controlStatus,
        // 当前索引
        index: index,
        // 当前图片元素
        item: item,
        // 当前图片元素列表
        imgList: list
      }
      this.$emit('preview', imgeObject)
    },
    previewcomments (index, item, teacherAnnotationItem) {
      let imgeObject = {
        // 状态，已批改/待改错
        status: this.controlStatus,
        // 当前索引
        index: index,
        // 当前图片元素
        item: item,
        // 当前图片老师批注信息，包括图片列表
        teacherAnnotationItem: teacherAnnotationItem,
        // 底部解析信息
        analysisData: {
          analysis: this.dataSubject.topic_analysis,
          video: this.dataSubject.video,
          audio: this.dataSubject.audio
        }
      }
      this.$emit('particulars', imgeObject)
    },
    imgListChange (imglist) {
      // 做题状态才触发
      if (this.controlStatus === REVIEW_NO_ANSWER) {
        const resObj = {
          student_answer: imglist,
          student_is_right: this.dataSubject.student_is_right,
          student_score: this.dataSubject.student_score
        }
        this.$emit('choose', resObj)
      }
    }
  },
  computed: {
    // 老师批注的图片信息列表,二维数组对象
    teacherAnnotation () {
      let teacherAnnotation = []
      let teacherAnnotationIndex = this.dataSubject?.teacher_annotation?.length
      // 当没有老师批阅图片时，显示未作答
      if (teacherAnnotationIndex === 0) {
        teacherAnnotation[0] = {}
        teacherAnnotation[0].url = []
        teacherAnnotation[0].annotation = []
      } else {
        for (let i = 0; i < teacherAnnotationIndex; i++) {
          // 教师回答的图片列表数组
          const previewList = (this.dataSubject.teacher_annotation[i].teacher_annotation_picture.map(ta => (ta.url))) || []
          // 教师回答的每一个图片下面对应的详情信息列表数组
          const previewAnnotationList = (this.dataSubject.teacher_annotation[i].teacher_annotation_picture.map(ta => (ta.annotation))) || []
          // 教师信息
          const teacherList = this.dataSubject.teacher_annotation[i].teacher_annotation_teacher
          teacherAnnotation[i] = teacherList
          teacherAnnotation[i].url = previewList
          teacherAnnotation[i].annotation = previewAnnotationList || []
        }
      }
      return teacherAnnotation
    },
    // 学生当前回答的
    studentAnswer () {
      return this.studentAnswerList || 0
    },
    
     /* 未作答0 */
    beforeAnswer () {
      return this.controlStatus === REVIEW_NO_ANSWER
    },
    /* 作答正确 （已作答状态）4*/
    rightAnswer () {
      return this.controlStatus === REVIEW_RIGHT_ANSWER
    },
    /* 作答错误 ，（也是待改错状态）2*/
    errorAnswer () {
      return this.controlStatus === REVIEW_ERROR_ANSWER
    },
    /* 用于简答题批阅中 1*/
    beforeReview () {
      return this.controlStatus === REVIEW_NO_REVIEW
    },
     /* 用于简答题提交后待批阅 5*/
     ToRead () {
      return this.controlStatus === REVIEW_TO_READ
    },
    //  /* 部分正确（也是待改错状态） */学生在主观题情况下部分正确，由外部传入状态3
    rightAnswerPart () {
      return this.controlStatus === REVIEW_RIGHT_PART_ANSWER
    },
    // 学生回答的或者老师批阅的次数
    studentAnswerLength () {
      return this.dataSubject?.teacher_annotation?.length
    }

  }
}
