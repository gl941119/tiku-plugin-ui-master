<!-- 底部解析 -->
<template>
  <div class="wap-bottom-analysis">
    <template v-if="showVideo">
      <video-analysis :videoSrc="analysisVideoUrl" />
    </template>
    <template v-if="showAudio">
      <audio-analysis :audioSrc="analysisAudioUrl" />
    </template>
    <template v-if="answerAnalysis">
      <answer-analysis :answerAnalysis="answerAnalysis" />
    </template>
  </div>
</template>

<script>
import AnswerAnalysis from './bottom-analysis/answer-analysis'
import VideoAnalysis from './bottom-analysis/video-analysis'
import AudioAnalysis from './bottom-analysis/audio-analysis'
import { QUESTION_TYPE_GROUP } from '@/config/subject-config.js'

export default {
  props: {
    dataSubject: {
      type: Object,
      default: () => {
        return {}
      }
    },
    /** 是否显示子题目音视频 */
    showMedia: {
      type: Boolean,
      default: false
    }
  },
  components: {
    AnswerAnalysis,
    VideoAnalysis,
    AudioAnalysis
  },
  computed: {
    getCurrentTopic () {
      return this.$store.getters.getCurrentTopic
    },
    isGroup () {
      return Number(this.getCurrentTopic.topic_type) === QUESTION_TYPE_GROUP
    },
    analysisAudioUrl () {
      return this.getCurrentTopic?.analysis_audio?.url || ''
    },
    showAudio () {
      if (this.isGroup) {
        return this.showMedia && (this.analysisAudioUrl && this.getCurrentTopic.id === this.dataSubject.parent_id)
      } else {
        return this.analysisAudioUrl && this.getCurrentTopic.id === this.dataSubject.id
      }
    },
    analysisVideoUrl () {
      return this.getCurrentTopic?.analysis_video?.url || ''
    },
    showVideo () {
      if (this.isGroup) {
        return this.showMedia && (this.analysisVideoUrl && this.getCurrentTopic.id === this.dataSubject.parent_id)
      } else {
        return this.analysisVideoUrl && this.getCurrentTopic.id === this.dataSubject.id
      }
    },
    answerAnalysis(){
      if (this.isGroup) {
        return (this.getCurrentTopic.topic_analysis || '') + (this.dataSubject.topic_analysis || '')
      } else {
        return (this.dataSubject.topic_analysis || '')
      }
    }
  }
}
</script>
<style lang='scss'>
.wap-bottom-analysis {
  > div {
    padding: 32px;
    background-color: #fff;
    border-radius: 24px;
    margin-top: 24px;
    &:last-child {
      margin-bottom: 48px;
    }
  }
}
</style>
