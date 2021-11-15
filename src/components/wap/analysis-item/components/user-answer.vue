<template>
  <div class="wapuseranswer">
    <template v-if="!beforeAnswer" class="wapuseranswer-boder">
        <!-- 批阅中状态 -->
        <div v-if="beforeReview">
          <p  class="wapuseranswer-title">我的答案</p>
          <div class="wapuseranswer-answers">
            <div v-for="(item, index) in studentAnswer" :key="index" class="wapuseranswer-item">
              <img  :src="item"  @click="previewAnswer(index, item, studentAnswer)">
            </div>
        </div>
        </div>
        <div>
          <div class="wapuseranswer-boder" v-for="(teacherAnnotationItem, teacherAnnotationIndex) in teacherAnnotation" :key="teacherAnnotationIndex">
          <!-- 作答错误 ，待改错状态-->
          <p v-if="teacherAnnotationIndex === 0 && !beforeReview" class="wapuseranswer-title">我的答案</p>
          <p v-else class="wapuseranswer-title">第{{studentAnswerLength-teacherAnnotationIndex}}次作答
            <span class="answer-time">{{teacherAnnotationItem.student_answer_time}}</span>
          </p>
           <!-- 已作答存在教师批阅图片 -->
          <div v-if="teacherAnnotationItem.url.length">
              <!-- 作答错误 ，待改错状态-->
            <div class="wapuseranswer-answers" v-if="errorAnswer||rightAnswerPart">
              <div v-for="(item, index) in teacherAnnotationItem.url" :key="index" class="wapuseranswer-item">
                <img  :src="item" >
                  <div class="btn-previewcomments" @click="previewcomments(index, item, teacherAnnotationItem)" >
                    <div class="text-backgrand"><p class="pctext">待改错</p></div>
                  </div>
              </div>
            </div>
              <!-- 作答正确，或者已批改状态 -->
            <div class="wapuseranswer-answers" v-else-if="rightAnswer">
              <div v-for="(item, index) in teacherAnnotationItem.url" :key="index" class="wapuseranswer-item">
                <img  :src="item" >
                <div class="btn-previewcomments" @click="previewcomments(index, item, teacherAnnotationItem)" >
                  <div class="text-backgrand"><p class="pctext">已批改</p></div>
                </div>
              </div>
            </div>
              <!-- 批阅中状态下前几次老师评论列表不显示文字 -->
            <div class="wapuseranswer-answers" v-else>
              <div v-for="(item, index) in teacherAnnotationItem.url" :key="index" class="wapuseranswer-item">
                <img  :src="item" >
              </div>
            </div>
          </div>
          <!-- 学生未作答 -->
          <div v-else  class="wapuseranswer-item" >
            <div class="wapuseranswer-noanswer">
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
       <p class="wapuseranswer-title">我的答案</p>
        <div class="wapuseranswer-answers"  >
          <div v-for="(item, index) in studentAnswer" :key="index" class="wapuseranswer-item">
              <img  :src="item"  @click="previewAnswer(index, item, studentAnswer)" >
              <div class="btn-del" @click="delAnswer(index,item)" ></div>
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
    dataSubject: {
      type: Object,
      default: () => {
        return {}
      }
    },
    /** 控制类props */
    /** 学生作答上传图片之后轮询传入图片数组 */
    dataStudentAnswer: {
      type: Array,
      default: () => {
        return []
      }
    }
  }
}
</script>
<style lang="scss">
  .wapuseranswer{
    margin-top: 32px;
    border-top: 8px solid #fafafa;
    .no-answer {
      margin-top: 12px;
      // display: flex;
      // img.app {
      //   width: 255px;
      // }
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
        font-size: 32px;
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
      font-size: 16px;
      font-weight: 400;
      line-height: 20px;
      color: #909399;
    }
    .user-score{
      margin-top: 32px;
    }
    .wapuseranswer-title{
      margin-top: 40px;
      margin-left: 20px;
      font-size: 32px;
      font-weight: bold;
    }
    .wapuseranswer-boder{
      border-top: 8px solid #fafafa;
    }
    .wapuseranswer-item{
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
        cursor: pointer;
        position: absolute;
        right: 0px;
        top: 0px;
        width: 22px;
        height: 22px;
        background: url('~_img/analysis-item/icon-delete.png') no-repeat;
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
          width:86px;
          height:28px;
          background:#303133;
          border-radius:14px;
          display: flex;
          justify-content: center;
        }
        .pctext{
          height:28px;
          font-size:14px;
          font-weight:500;
          line-height:28px;
          color:#ffffff;
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
          width:86px;
          height:28px;
          background:#08BC95;
          border-radius:14px;
          line-height: 28px;
          color: white;
          text-align: center;
        }
      }
      &:hover {
        .btn-del {
          display: block;
        }
        .cover {
          display: flex;
        }
      }
    }
    &-qrcode {
      margin-top: 16px;
      margin-left: 16px;
      display: flex;
      flex-direction: column;
      padding: 4px;
      p {
        margin-top: 10px;
        order: 1;
        font-size: 16px;
      }
    }
  }
</style>
