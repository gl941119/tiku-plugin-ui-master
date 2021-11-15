<template>
  <div class="wapanalysis question-common" :class="styleSetClass">
     <!-- 提示信息 -->
    <slot name="status">
      <subject-status v-if="controlShowStatus"
        :controlStatus="controlStatus"
        :showSheet="showSheet"
        :dataSubject="dataSubject">
      </subject-status >
    </slot>
    <!-- 是否显示题目标题 -->
    <subject-title  v-if="controlShowTitle"
    :dataRankSting="dataRankSting"
    :controlShowStyle="controlShowStyle"
    :controlShowScore="controlShowScore"
    :dataSubInnerIndexRight="dataSubInnerIndexRight"
    :controlIsGroup="controlIsGroup"
    :controlAutoPlay="controlAutoPlay"
    :dataSubject="dataSubject">
    </subject-title>
    <!-- 题目要求 -->
    <div class="wapanalysis-topic" v-if="controlTopicRequest">
      <p>{{dataSubject.topic_request}}</p>
    </div>
    <!-- 题目内容 -->
    <div class="wapanalysis-body" v-html="dataSubject.topic_body"></div>
    <!-- 用户作答信息 -->
    <user-answer
      @particulars="particulars"
      @preview="preview"
      @delanswer="delanswer"
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
    <!-- 用户拍照作答 -->
    <picture-answer v-if="controlShowPictureAnswer"
      @picture="picture"
      :dataSubject="dataSubject">
    </picture-answer>
  </div>
</template>

<script>
import SubjectTitle from './../components/subject-title'
import SubjectStatus from './../components/subject-status'
import PictureAnswer from './components/picture-answer'
import UserAnswer from './components/user-answer'
import BottomAnalysis from './../components/bottom-analysis'
import BasicsMixins from '@/components/mixins/subject-basics-mixins'
import GroupMixins from '@/components/mixins/group-mixins'
export default {
  name: 'analysis-item',
  components: {
    SubjectTitle,
    SubjectStatus,
    PictureAnswer,
    UserAnswer,
    BottomAnalysis
  },
  mixins: [BasicsMixins, GroupMixins],
  data () {
    return {
    }
  },
  props: {
    /** 是否显示拍照作答按键 */
    controlShowPictureAnswer: {
      type: Boolean,
      default: false
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
    picture () {
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
.wapanalysis {
    &-body{
      margin-top: 20px;
      font-size:18px;
      font-weight:bold;
      line-height:26px;
      padding: 0 32px;
      color:$--color-body;
      img {
      // 设置图片最大宽度和居中对齐
      max-width: 100% !important;
      vertical-align: middle !important;
      }
    }
    &-topic{
      background:#FFFFFF;
      p {
        font-size:24px;
        font-weight:400;
        line-height:40px;
        color:#909399;
      }
    }
    &-teacher{
      background:#F7F8FA;
      border-radius:16px;
      p{
        font-size:28px;
        font-weight:400;
        line-height:48px;

      }
    }
}
</style>
