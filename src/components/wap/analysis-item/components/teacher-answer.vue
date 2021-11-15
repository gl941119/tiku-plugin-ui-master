<!-- 底部答案文字解析 -->
<template>
  <div class="wap-analysis">
    <!--如果老师名字都不存在，说明老师评阅不会存在-->
    <div class="analysis" v-if="teacherAnnotationItem.teacher_name">
        <div>
            <div class="title">老师批阅</div>
        </div>
        <div >
            <img  class= "teacher" v-if="teacherAnnotationItem.teacher_img" :src="teacherAnnotationItem.teacher_img">
            <p  class= "teacher-name" v-if="teacherAnnotationItem.teacher_name">{{teacherAnnotationItem.teacher_name}}</p>
        </div>
        <template v-if="teacherAnnotationItem.audio">
          <teacher-answeraudio :audioSrc="teacherAnnotationItem.audio" />
        </template>
        <div class="text" v-if="teacherAnnotationItem.teacher_textanalysis">
            <p>
            {{teacherAnnotationItem.teacher_textanalysis}}
            </p>
        </div>
    </div>
  </div>
</template>

<script>
import TeacherAnsweraudio from './teacher-answer-audio'
export default {
  components: {
    TeacherAnsweraudio
  },
  props: {
    /** 老师分析回答图片对象 */
    teacherAnnotationItem: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  methods: {
    /** 重写格式时间函数 */
    formatTime (time) {
      const min = Math.floor(time / 60)
      const second = Math.round(time - min * 60)
      this.currentTime = this.addZero(min) + '\'' + this.addZero(second) + '"'
    },
    /** 重写控制播放函数,监听播放事件方法写在TopAudioMixins混合里面 */
    controlPlay () {
      this.playFlag = !this.playFlag
    }
  }
}
</script>
<style lang='scss'>
.wap-analysis {
  margin-top: 32px;
  .analysis {
    padding: 20px;
    background-color:#FFFFFF;
    .title {
      font-size:32px;
      font-weight: bold;
      color: #303133;
      line-height:40px;
      margin-left: 22px;
      margin-bottom: 32px;
    }
    .text {
      padding: 32px 32px;
      background:#F7F8FA;
      border-radius:16px;
      margin-top: 30px;
      p {
        font-size:28px;
        font-weight:400;
        line-height:48px;
      }
    }
    .teacher{
      width:72px;
      height:72px;
      border-radius:50%;
    }
    .teacher-name{
      height:34px;
      font-size:24px;
      font-weight:400;
      line-height:36px;
      color:#303133;
      margin-left: 80px;
      margin-top: -50px;
    }
  }
}
</style>
