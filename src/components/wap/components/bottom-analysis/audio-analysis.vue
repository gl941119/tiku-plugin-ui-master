<template>
  <div>
    <div class="wap-analysis-title">
      <div v-if="audioTitle" class="title">
        <span class="label"></span>
        <span>语音解析</span>
        <span class="tip">专属解析语音，解决难点，突破易错点</span>
      </div>
    </div>
    <div class="wap-audio-analysis">
      <top-audio :audio-src="audioSrc" :autoPlay="false" />
    </div>
  </div>
</template>

<script>
import TopAudio from '../top-audio'

export default {
  props: {
    /** 音频地址 */
    audioSrc: {
      type: String
    },
     // 是否显示标题部分
    audioTitle:{
      type:Boolean,
      default:true
    },
  },
  components: {
    TopAudio
  }
}
</script>

<style  lang='scss'>
.wap-audio-analysis {
  margin-top: 26px;
}
</style>
