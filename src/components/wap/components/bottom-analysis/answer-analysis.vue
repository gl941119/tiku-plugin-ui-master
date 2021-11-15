<!-- 底部答案文字解析 -->
<template>
  <div class="bottom-wapanalysis">
    <div class="wap-analysis-title">
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
.bottom-wapanalysis {
  .text {
    margin-top: 32px;
    * {
      font-size: 28px !important;
      font-weight: 400 !important;
      line-height: 48px !important;
    }
  }
}
</style>
