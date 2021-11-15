<template>
  <div class="useranswer">
    <template v-if="!beforeAnswer">
        <!-- 批阅中状态 -->
        <div v-if="beforeReview" class="useranswer-boder">
          <p  class="useranswer-title">我的答案</p>
          <div class="useranswer-answers">
            <div v-for="(item, index) in studentAnswer" :key="index" class="useranswer-item">
              <img class="useranswer-imgsize" :src="item" @click="previewAnswer(index, item, studentAnswer)" >
            </div>
        </div>
        </div>
        <div>
          <div class="useranswer-boder" v-for="(teacherAnnotationItem, teacherAnnotationIndex) in teacherAnnotation" :key="teacherAnnotationIndex">
          <p v-if="teacherAnnotationIndex === 0 && !beforeReview" class="useranswer-title">我的答案</p>
          <p v-else class="useranswer-title">第{{studentAnswerLength-teacherAnnotationIndex}}次作答
            <span class="answer-time">{{teacherAnnotationItem.student_answer_time}}</span>
          </p>
           <!-- 已作答存在教师批阅图片 -->
          <div v-if="teacherAnnotationItem.url.length">
              <!-- 作答错误 ，待改错状态-->
            <div class="useranswer-answers" v-if="errorAnswer||rightAnswerPart">
              <div v-for="(item, index) in teacherAnnotationItem.url" :key="index" class="useranswer-item">
                <img class="useranswer-imgsize" :src="item" >
                  <div class="btn-previewcomments"  @click="previewcomments(index, item, teacherAnnotationItem)" >
                    <div class="text-backgrand"><p class="pctext">待改错</p></div>
                  </div>
              </div>
            </div>
              <!-- 作答正确，或者已批改状态 -->
            <div class="useranswer-answers" v-else-if="rightAnswer">
              <div v-for="(item, index) in teacherAnnotationItem.url" :key="index" class="useranswer-item">
                <img class="useranswer-imgsize" :src="item" >
                <div class="btn-previewcomments"  @click="previewcomments(index, item, teacherAnnotationItem)" >
                  <div class="text-backgrand"><p class="pctext">已批改</p></div>
                </div>
              </div>
            </div>
              <!-- 批阅中状态下前几次老师评论列表不显示文字 -->
            <div class="useranswer-answers" v-else>
              <div v-for="(item, index) in teacherAnnotationItem.url" :key="index" class="useranswer-item">
                <img class="useranswer-imgsize" :src="item" >
              </div>
            </div>
          </div>
          <!-- 学生未作答 -->
          <div v-else class="useranswer-item">
            <div class="useranswer-noanswer">
              <span>未作答</span>
            </div>
          </div>
           <!-- 老师批阅 -->
          <teacher-answer v-if="controlShowTeacherAnswer"
            :teacherAnnotationItem="teacherAnnotationItem">
          </teacher-answer>
        </div>
        </div>
          <!-- 是否显示底部解析 -->
        <slot name="bottom">
          <template  v-if="controlShowBottom" >
            <bottom-analysis
              :dataSubject="dataSubject">
            </bottom-analysis>
          </template>
        </slot>
    </template>
    <div v-else class="no-answer" >
      <div v-if="studentAnswer.length">
       <p class="useranswer-title">我的答案</p>
        <div class="useranswer-answers"  >
          <div v-for="(item, index) in studentAnswer" :key="index" class="useranswer-item">
              <img class="useranswer-imgsize" :src="item" @click="previewAnswer(index, item, studentAnswer)" >
              <div class="btn-del" @click="delAnswer(index,item)"></div>
            </div>
        </div>
     </div>
    </div>
  </div>
</template>
<script>
import BottomAnalysis from './../../components/bottom-analysis'
import AnalysisMixin from '@/components/mixins/analysis-mixins'
import TeacherAnswer from './teacher-answer'
export default {
  data () {
    return {
      imgsize: {
        w: 212,
        h: 212
      }
    }
  },
  components: {
    TeacherAnswer,
    BottomAnalysis
  },
  mixins: [AnalysisMixin],
  props: {
    controlStatus: {
      type: String,
      default: '0'
    },
    /** 是否显示底部解析 */
    controlShowBottom: {
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
    },
    dataSubject: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}
</script>
<style lang="scss">
  .useranswer{
    padding: 0 32px;
    margin-top: 32px;
    .no-answer {
      margin-top: 12px;
    }
    &-imgsize{
      width: 100%;
    }
    &-noanswer{
      width: 31%;
      background: #F7F8FA;
      border-radius: 8px;
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      text-align: center;
      margin-top: 16px;
      span {
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #909399;
        position:absolute;
        top:50%;
        transform: translate(-50%,-50%);
      }
    }
    .answer-time{
      width: 52px;
      height: 17px;
      font-size: 12px;
      font-weight: 400;
      line-height: 20px;
      color: #909399;
    }
    .user-score{
      margin-top: 32px;
    }
    .useranswer-title{
      margin-top: 32px;
      margin-left: 20px;
      font-size: 16px;
      font-weight: bold;
    }
    .useranswer-boder{
      border-top: 8px solid #fafafa;
    }
    .useranswer-item{
      display: flex;
      font-size: 12px;
      flex: 0 0 31%;
      position: relative;
      padding-bottom: 23%;
      margin-top: 10px;
    }
    &-answers {
      margin-top: 16px;
      display: flex;
      flex-wrap: wrap;
    }
    &-item {
      position: relative;
      margin-left: 16px;
      img {
        border-radius: 8px;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      .comments {
        position: absolute;
        right: 12px;
        bottom: 12px;
        padding: 4px 16px;
        background: rgba($color: #000000, $alpha: 0.3);
        border-radius: 20px;
        color: white;
      }
      .btn-del {
        display: none;
        cursor: pointer;
        position: absolute;
        right: 5px;
        bottom: 5px;
        width: 50px;
        height: 50px;
        background: url('~_img/analysis-item/icon-del.png') no-repeat;
        background-size: cover;
      }
      .btn-previewcomments {
         position: absolute;
         display: flex;
         width: 100%;
         height: 100%;
         justify-content: center;
         align-items: center;
        .text-backgrand{
          width: 120px;
          height: 40px;
          background: #303133;
          opacity: 0.7;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          margin: 10px;
        }
        .pctext{
          height:40px;
          font-size:20px;
          font-weight:500;
          line-height:40px;
          color:#f9fafb;;
        }
      }
      .cover {
        display: none;
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background:rgba(0,0,0,0.7);
        border-radius:8px;
        align-items: center;
        justify-content: center;
        .btn-preview {
          cursor: pointer;
          width:120px;
          height:60px;
          background:#08BC95;
          border-radius:14px;
          line-height: 40px;
          color: white;
          text-align: center;
        }
      }
      &:hover {
        .btn-del {
          display: block;
        }
        .btn-notdel {
          display: block;
        }
        .cover {
          display: flex;
        }
      }
    }
    .answer{
      margin-top: 12px;
      padding: 16px 20px;
      font-size: 16px;
      background: #F5F5F5;
    }
  }
</style>
