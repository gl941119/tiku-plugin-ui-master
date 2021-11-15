<!-- 题目标题 -->
<template>
  <div>
    <div  v-if="controlIsGroup" class="subject-title" :class="{'show-style':controlShowStyle}">
      <span v-html="subjectTite"></span>
      {{ SUBJECT_TYPE[dataSubject.topic_type] }}
      <span
        v-if="controlShowScore"
        class="score"
      >({{ dataSubject.points }}分)</span>
       <span v-if="controlShowSource" class="source">（{{ topic_source_details }}）</span>
       <span class="sub-information">{{dataSubInnerIndexRight}}</span>
    </div>
    <div v-else class="subject-title" :class="{'show-style':controlShowStyle}">
      {{ SUBJECT_TYPE[dataSubject.topic_type] }}
      <span class="sub-information">{{dataSubInnerIndexRight}}</span>
    </div>
     <div v-if="showAudio">
      <top-audio :audio-src="bodyAudioUrl" :autoPlay="true" />
    </div>
  </div>
</template>

<script>
import TopAudio from './top-audio'
import { SUBJECT_TYPE, MATERIAL_TYPE } from '@/config/subject-config'
import { getTopicFile } from '@/libs/utils/handle-topic'
const { BODY_AUDIO } = MATERIAL_TYPE
export default {
  components: {
    TopAudio
  },
  props: {
    /** 题目对象 */
    dataSubject: {
      type: Object,
      default: () => {
        return {}
      }
    },
    /** 题目索引 使用时需设置controlShowTitle为true */
    dataRankSting: {
      type: String,
      default: ''
    },
    /** 是否显示标题样式 */
    controlShowStyle: {
      type: Boolean,
      default: true
    },
    /** 是否显示组合题的小题题目前面的序号 */
    controlIsGroup: {
      type: Boolean,
      default: false
    },
    // 是否显示题目来源
    controlShowSource: {
      type: Boolean,
      default: true
    },
    /** 是否显示分数 */
    controlShowScore: {
      type: Boolean,
      default: false
    },
    /** (用于组合题小题显示)组合题右边小题和题目总数显示 */
    dataSubInnerIndexRight: {
      type: String,
      default: ''
    },
    /** 改变音频播放时长后是否自动播放 */
    controlAutoPlay: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      SUBJECT_TYPE
    }
  },
  computed: {
     // 题目来源
    topic_source_details () {
      if (!this.controlShowSource) return ''
      let district_title = this.dataSubject.district_title.split(',').pop()
      return (
        this.dataSubject.topic_year.title +
        this.dataSubject.topic_semester.title +
        '·' +
        district_title +
        this.dataSubject.topic_source_details
      )
    },
    getCurrentTopic () {
      return this.$store.getters.getCurrentTopic
    },
    bodyAudioUrl () {
      return this.getCurrentTopic?.body_audio?.url || ''
    },
    showAudio(){
      return this.bodyAudioUrl  && this.getCurrentTopic.id === this.dataSubject.id
    },
    subjectTite () {
      if (this.dataRankSting.includes('/')) {
        return `<strong>${this.dataRankSting.split('/')[0]}</strong><span>/${this.dataRankSting.split('/')[1]}</span>`
      } else {
        return `<strong>${this.dataRankSting}</strong>`
      }
    }
  }
}
</script>
<style lang='scss'>
.subject-title {
  font-size: 16px;
  color: $--color-tite-headline;
  font-weight: bold;
  line-height:52px;
  padding:0 32px;
  &.show-style {
    background-color: $--wapcolor-tite-background;
    height:52px;;
  }
  .score {
    color: $--wapcolor-tite-score;
  }
  .source {
    color: #9fa3aa;
  }
  .sub-information{
    font-size: 14px;
    color: $--color-tite-headline;
    margin-right: 20px;
    float: right;
  }
}
</style>
