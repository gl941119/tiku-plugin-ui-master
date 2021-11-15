<!-- 底部答案文字解析 -->
<template>
  <div class="web-analysis">
    <div class="web-analysis-title">
      <div class="title">
        <span class="label"></span>
        <span>图文解析</span>
      </div>
    </div>
    <div class="text select-img" v-html="answerAnalysis"></div>
  </div>
</template>

<script>
export default {
  props: {
    answerAnalysis: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang='scss'>
.web-analysis {
  >.text {
    * {
      font-size: 16px !important;
      font-weight: 400 !important;
      line-height: 28px !important;
    }
  }
}
</style>
