  <!-- 状态提示信息 -->
<template>
  <div class="wappicture">
    <p>
      请认真作答，最多上传9张
    </p>
    <div :class='contentClass' @click="picture()">
      <p>
        拍照答题
      </p>
    </div>
  </div>
</template>
<script>
/* 学生上传图片数量极限 */
const STUDENT_ANSWER_ALL = 9
export default {
  props: {
    /** 控制类props */
    /** 是否显示题目要求 */
    controlTopicRequest: {
      type: Boolean,
      default: false
    },
    /** 题目对象 */
    dataSubject: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    /* 学生上传图片的数量是否超过9张 */
    studentAnswerOut () {
      return this.studentAnswerList?.length >= STUDENT_ANSWER_ALL
    },
    /* 样式 */
    contentClass () {
      return !this.studentAnswerOut ? 'content' : 'content-close'
    }
  },
  methods: {
    picture () {
      if (!this.studentAnswerOut) {
        /** 学生点击拍照调用摄像头功能 */
        this.$emit('picture')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.wappicture {
  margin-top:100px;
  height:156px;
  background:#FFFFFF;
  p{
    font-size:22px;
    line-height:40px;
    color:#909399;
    text-align: center;
  }
  .content{
  height:80px;
  background:linear-gradient(87deg,rgba(250,88,37,1) 0%,rgba(250,123,37,1) 100%);
  border-radius:80px;
  p {
    font-size:28px;
    font-weight:400;
    line-height:80px;
    color:#ffffff;
    text-align: center;
  }
}
.content-close{
  height:80px;
  background:#C0C4CC;
  border-radius:80px;
  p {
    font-size:28px;
    font-weight:400;
    line-height:80px;
    color:#ffffff;
    text-align: center;
  }
}
}

</style>
