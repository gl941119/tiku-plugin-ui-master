<template>
  <div>
    <div class="web-analysis-title">
      <div class="title">
        <span class="label"></span>
        <span>语音解析</span>
      </div>
      <div class="tip">专属解析语音，解决难点，突破易错点</div>
    </div>
    <div class="web-audio-analysis">
      <top-audio :audio-src="audioSrc" :autoPlay="false" />
      
    </div>
  </div>
</template>

<script>
import TopAudio from '../top-audio'

export default {
  data(){
    return {
      showsConfirm: true
    }
  },
  props: {
    /** 音频地址 */
    audioSrc: {
      type: String
    }
  },
  components: {
    TopAudio,
    // XtConfirm
  }
}
</script>

<style  lang='scss'>
.web-analysis-title {
  margin-top: 26px;
}
</style>
