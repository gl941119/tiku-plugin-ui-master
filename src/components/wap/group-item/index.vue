<script>
import SubjectTitle from './../components/subject-title'
import SubjectBody from './components/subject-body'
import SubjectSubquestion from './components/subject-subquestion'
import BasicsMixins from './../../mixins/subject-basics-mixins'
import GroupMixins from './../../mixins/group-mixins'
import Swiper from 'swiper/bundle'
import 'swiper/swiper.min.css'
import 'swiper/swiper-bundle.min.css'
import { QUESTION_TYPE_SINGLE, QUESTION_TYPE_MULTIPLE, QUESTION_TYPE_JUDGE, QUESTION_TYPE_FILL, QUESTION_TYPE_GROUP, QUESTION_TYPE_ANALYSIS } from '@/config/subject-config'
export default {
  components: {
    SubjectTitle,
    SubjectBody,
    SubjectSubquestion
  },
  mixins: [BasicsMixins, GroupMixins],
  data () {
    return {
      /** 子题目题的序号 （用于组合题） */
      subdataIndex: 0,
      swiperOption: null,
      myGroupSwiper: null,
      swiperWidth: 0,
      /** 虚拟slid配置 */
      virtualData: {
        offset: 0,
        slides: [0, 1],
        from: 0,
        to: 1
      },
      bodyContentHeight: 160,// 竖屏状态下题干默认高度
      acrossBodyContentHeight: 60 // 横屏状态下题干默认高度
    }
  },

  mounted () {
    const self = this
    this.myGroupSwiper = new Swiper('.' + this.swiperClass, {
      noSwiping: true,
      initialSlide: this.subdataIndex,
      noSwipingClass: 'stop-move',
      virtual: {
        slides: self.slidesChildren,
        renderExternal: (data) => {
          this.virtualData = data
        }
      },
      on: {
        slideChange: (e) => {
          this.subdataIndex = e.activeIndex
        },
      }
    })
    this.swiperWidth = this.myGroupSwiper.width
  },
  props: {
    /* 控制类props */
    /** (组合题中)是否显示子题目 */
    controlShowSubTitle: {
      type: Boolean,
      default: true
    },
    /** (组合题中)大题顶部状态栏 */
    // controlShowGroupStatus:{
    //   type: Boolean,
    //   default: true
    // },
    /** 单选题还是多选题，默认为true单选 */
    controlIsSingle: {
      type: Boolean,
      default: true
    },
    // /* 数据类props */
    /** 控制类props */
    /** 学生作答上传图片之后轮询传入图片数组 */
    dataStudentAnswer: {
      type: Array,
      default: () => {
        return []
      }
    },
    /** 是否显示拍照作答按键 */
    controlShowPictureAnswer: {
      type: Boolean,
      default: false
    },
    /** 是否显示顶部答题状态 */
    controlShowStatus: {
      type: Boolean,
      default: false
    },
    /** 是否显示题目要求 */
    controlTopicRequest: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    swiperClass () {
      return 'group-swiper-container_' + this.dataSubject.id
    },
    offsetLeftStyle () {
      return {
        left: this.virtualData.offset + 'px'
      }
    },
    /**  是否是横屏 */
    isAcross () {
      const orientation = window.orientation || 0
      return Math.abs(orientation) === 90
    },
    stopstyle () {
      let subjectbodyHeight=this.$refs?.subjectbody?.offsetHeight || 0
      if (this.isAcross) { //横屏
        if (/ipad/i.test(ua)) {
          return {
            height: `${subjectbodyHeight - this.acrossBodyContentHeight}px`
          }
        } else {
          return {
            height: `${subjectbodyHeight - this.acrossBodyContentHeight}px`
          }
        }
      }
      else {
        var ua = navigator.userAgent.toLowerCase()
        if (/ipad/i.test(ua)) {
          return {
            height: `${subjectbodyHeight - this.bodyContentHeight}px`
          }
        }
        else {
          return {
            height: `${subjectbodyHeight - this.bodyContentHeight}px`
          }
        }
      }
    },
    /** 虚拟slid配置 */
    slidesChildren () {
      return this.dataSubject.children.map((v, i) => i)
    },
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
    /* 题目总小题数 */
    dataInnerTotal () {
      return this.dataSubject.children.length !== undefined ? this.dataSubject.children.length : 0
    },
    /** 子题v-on事件 */
    subQuestionEvent () {
      return {
        particulars: this.particulars,
        preview: this.preview,
        picture: this.picture,
        choose: this.choose,
        delanswer: this.delanswer
      }
    },
    currentSubTopic () {
      return this.dataSubject.children[this.subdataIndex]
    }
  },
  methods: {
    picture () {
      /** 学生点击拍照调用摄像头功能 */
      this.$emit('picture')
    },
    choose (res) {
      const temp = this.currentSubTopic
      const topic_type = temp.topic_type
      /** 当为单选题和判断题时自动切换下一题，若为最后一题则打开答题卡 */
      if (!this.isAcross && (topic_type === QUESTION_TYPE_SINGLE || topic_type === QUESTION_TYPE_JUDGE)) {
        if (this.subdataIndex === this.dataInnerTotal - 1) { // 最后一题
          this.$emit('changeTopic')
          console.log('切换下一个大题')

        } else {
          this.myGroupSwiper.slideTo(Number(this.subdataIndex) + 1, 500, false)
        }
      }
      this.$emit('choose', res, temp)
    },
    changeHeight (v) {
      this.bodyContentHeight = v
      this.acrossBodyContentHeight = v
    }
  },
  render (h) {
    /** @slot 有默认底部slot 可自定义 */
    let extraSlotBottom = this.hasSlotBottom ? <div slot="bottom">{ this.$slots.bottom }</div> : null
    /** @slot 有默认status */
    let extraSlotStatus = this.hasSlotStatus ? <div slot="status">{ this.$slots.status }</div> : null
    /** @slot 主观题自定义状态 */
    let analysisSlotQuestionBottom = this.hasSlotQuestionBottom ? <div slot="questionBottom">{ this.$slots.questionBottom }</div> : null
    let className = this.styleSetClass + ' wapgruop'
    let classRequire = 'topic'
    let defaultstyle=this.isAcross? 'sub-content scorll-bar acrossdefaultstyle':'sub-content scorll-bar defaultstyle'
    /** @slot 有默认status */
    let showSheet = this.showSheet ? <div class="status"> <div class="answer-sheet"> <span on-click={ this.showAnswerCard }>答题卡</span></div> </div> : null
    /** 组合题顶部状态栏 */
    let groupStatus = this.controlAnswered ?
      showSheet
      : null
    /** 题目标题 */
    let subjectTitle = this.controlShowTitle ? <subject-title dataRankSting={ this.dataRankSting } controlIsGroup={ true } controlShowScore={ this.controlShowScore } dataSubject={ this.dataSubject } controlShowSource={ this.controlShowSource }></subject-title> : null
    /** 题目要求 */
    let subjectRequire = this.controlTopicRequest ? <div><p>{ this.dataSubject.topic_request }</p></div> : null
    /** 题干 */
    let subjecBody = <subject-body ref="subjectbody" on-changeHeight={ this.changeHeight } dataSubject={ this.dataSubject }></subject-body>
    /** 子题内容 */
    let _this = this
    const subjecSubquestionList = this.virtualData.slides.map((v) => {
      /** 子题Props参数 */
      let dataInnerTotal = _this.dataSubject.children.length !== undefined ? _this.dataSubject.children.length : 0
      /* 当前题目子标题序号 */
      let subdataIndexString = `${v + 1}/${dataInnerTotal}`
      /* 题目当前小题数/当前组合题小题总数  如：1/3 */
      let dataSubInnerIndexString = `第${v + 1}小题(共${dataInnerTotal}小题)`
      const dataItem = _this.dataSubject.children[v]
      /** 虚拟渲染时可能出现slides长度大于dataSubject.children */
      if(!dataItem) return
      let subQuestionProps = {
        dataItem,
        showMedia: _this.currentSubTopic.id === dataItem.id,
        controlShowPictureAnswer: _this.controlShowPictureAnswer,
        // 题目选项宽度，百分比单位
        dataWidth: _this.dataWidth,
        /** 子题标题序号示 */
        dataRankSting: subdataIndexString,
        controlStatus: _this.controlStatus,
        controlAnswered: _this.controlAnswered,
        controlIsSingle: Number(_this.dataSubject.children[v].topic_type) === QUESTION_TYPE_SINGLE,
        dataStudentAnswer: _this.dataStudentAnswer,
        showSheet: _this.showSheet,
        controlLimit: _this.controlLimit,
        /** 子题标题是否显示 */
        controlShowTitle: _this.controlShowSubTitle,
        // /** 子题标题右边 小题数和小题总数显示 */
        dataSubInnerIndexRight: dataSubInnerIndexString,
        controlShowTeacherAnswer: _this.controlShowTeacherAnswer,
        controlIsGroup: _this.controlIsGroup,
        controlShowStatus: _this.controlShowStatus,
        controlShowBottom: _this.controlShowBottom,
        controlShowScore: _this.controlShowScore,
        controlShowSource: false
      }
      // let stopMove=_that.subdataIndex===1||_that.subdataIndex===_that.dataInnerTotal ? 'sub-content scorll-bar stop-move':'sub-content scorll-bar'
      return (
        <div class={ { 'swiper-slide': true, 'stop-move': _this.isAcross } } style={ _this.offsetLeftStyle } key={ dataItem.parent_id + '_' + dataItem.id }>
          <subject-subquestion  { ...{ props: subQuestionProps } } { ...{ on: _this.subQuestionEvent } }>
            { extraSlotStatus }{ extraSlotBottom }{ analysisSlotQuestionBottom }</subject-subquestion>
        </div>
      )
    })
    // let subjecSubquestionList = <subject-subquestion class="sub-content scorll-bar" { ...{ props: this.subQuestionProps }} {...{ on: this.subQuestionEvent }}>
    //   {extraSlotStatus}{extraSlotBottom}{analysisSlotQuestionBottom}</subject-subquestion>
    return (
      <div class={ className }>
        {groupStatus }
        {subjectTitle }
        <div class={ classRequire }>
          { subjectRequire }
        </div>
        <div style="flex:1;position: relative;" ref="subjectbody">
          {subjecBody }
          <div class={defaultstyle} style={ this.stopstyle }>
            <div class={ this.swiperClass }>
              <div class="swiper-wrapper" >
                { subjecSubquestionList }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

</script>
<style lang="scss">
.wapgruop {
  background: $--background;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  .topic {
    background: #ffffff;
    p {
      font-size: 24px;
      font-weight: 400;
      line-height: 40px;
      color: #909399;
    }
  }
  .status {
    position: relative;
    height: 80px;
    background: #f8f9fb;
    span {
      height: 34px;
      font-size: 24px;
      font-weight: 400;
      line-height: 80px;
      margin-left: 20px;
      margin-right: 20px;
    }
    .answer-sheet {
      position: absolute;
      width: 152px;
      height: 48px;
      border-radius: 200px;
      right: 32px;
      top: 16px;
      border: 2px solid #c2c7d1;
      text-align: center;
      span {
        font-size: 28px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #2b2f36;
        line-height: 48px;
      }
    }
  }
  .sub-content {
    overflow-x: hidden;
    position: absolute;
    width: 100%;
    border:0px solid hsla(0, 100%, 50%, 0);
  }
  .acrossdefaultstyle{
   height: calc(100% - 75px);
  }
  .defaultstyle{
    height: 100%;
  }
  .swiper-slide {
    height: auto;
    background-color: #fff;
  }
  // 滚动条美化
  .scorll-bar::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
    background-color: #ffffff;
  }

  .scorll-bar::-webkit-scrollbar {
    width: 6px;
    background-color: #ffffff;
  }

  .scorll-bar::-webkit-scrollbar-thumb {
    background-color: #c1c1c1;
    border-radius: 4px;
  }
}
</style>
