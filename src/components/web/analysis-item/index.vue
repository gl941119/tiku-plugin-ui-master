<template>
  <div class="analysis question-common" :class="styleSetClass">
     <!-- 顶部提示信息 -->
    <slot name="status">
      <subject-status v-if="controlShowStatus"
        :controlStatus="controlStatus"
        :dataSubject="dataSubject">
      </subject-status >
    </slot>
    <!-- 是否显示题目标题 -->
    <subject-title v-if="controlShowTitle"
    :dataRankSting="dataRankSting"
    :controlShowStyle="controlShowStyle"
    :dataSubInnerIndexRight="dataSubInnerIndexRight"
    :controlIsGroup="controlIsGroup"
    :controlShowScore="controlShowScore"
    :controlAutoPlay="controlAutoPlay"
    :dataSubject="dataSubject">
    </subject-title>
     <!-- 二维码栏提示信息 -->
    <subjectqrcode-status  :dataAppName="dataAppName" :dataSubject="dataSubject" :controlStatus="controlStatus"> </subjectqrcode-status>
     <!-- 题目要求 -->
    <div class="analysis-topic" v-if="controlTopicRequest">
      <p>{{dataSubject.topic_request}}</p>
    </div>
    <!-- 题目内容 -->
    <div class="analysis-body question-common-body-web" v-html="dataSubject.topic_body"></div>
      <!-- 用户作答信息 -->
    <user-answer
      @particulars="particulars"
      @preview="preview"
      @delanswer="delanswer"
      @choose="choose"
      :dataStudentAnswer="dataStudentAnswer"
      :dataAppName="dataAppName"
      :controlShowBottom="controlShowBottom"
      :controlStatus="controlStatus"
      :controlShowTeacherAnswer="controlShowTeacherAnswer"
      :dataSubject="dataSubject">
     <!-- 是否显示底部解析 -->
      <div slot="bottom">
        <slot name="bottom">
          <template  v-if="controlShowBottom" >
            <bottom-analysis
              :dataSubject="dataSubject">
            </bottom-analysis>
          </template>
        </slot>
      </div>
    </user-answer>
  </div>
</template>

<script>
import SubjectTitle from './../components/subject-title'
import SubjectqrcodeStatus from './components/subjectqrcode-status'
import UserAnswer from './components/user-answer'
import BottomAnalysis from './../components/bottom-analysis'
import BasicsMixins from '@/components/mixins/subject-basics-mixins'
import GroupMixins from '@/components/mixins/group-mixins'
import SubjectStatus from './../components/subject-status'
export default {
  name: 'analysis-item',
  components: {
    SubjectTitle,
    SubjectqrcodeStatus,
    UserAnswer,
    SubjectStatus,
    BottomAnalysis
  },
  mixins: [BasicsMixins, GroupMixins],
  data () {
    return {}
  },
  props: {
    /** 控制类props */
    /** 二维码信息来源 */
    dataAppName: {
      type: String,
      default: 'online_edu_user_web'
    },
    /** 控制类props */
    /** 学生作答上传图片之后轮询传入图片数组 */
    dataStudentAnswer: {
      type: Array,
      default: () => {
        return []
      }
    }
  },

  methods: {
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
    },
    choose (answerList) {
      /** 输入答案事件,输入框失焦时触发 可取得所输答案数组 */
      this.$emit('choose', answerList)
    }
  }
}
</script>

<style lang="scss">
.analysis {
  background: $--background;
  opacity: 1;
  &-body {
    padding: 0 32px;
    margin-top: 20px;
    font-size: 18px;
    font-weight: bold;
    line-height: 26px;
    color: $--color-body;
    opacity: 1;
  }
  &-topic{
    padding: 0 32px;
    background:#FFFFFF;
    p {
      font-size:16px;
      font-weight:400;
      line-height:40px;
      color:#909399;
    }
  }
  .is-expiration {
    margin-top: 16px;
    background: #fafafa;
    padding: 16px 24px;
    line-height: 24px;
    font-size: 16px;
    color: #fb642a;
    border-top: 1px dashed #000;
  }
}
</style>
