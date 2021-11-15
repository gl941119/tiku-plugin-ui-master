<!-- 题目标题 -->
<template>
  <div class="wapsubject-title__wrapper">
    <div v-if="controlIsGroup" class="wapsubject-title" :class="{'show-style':controlShowStyle}">
      <span v-html="subjectTite"></span>
      <span class="wapsubject-title__type">{{ SUBJECT_TYPE[dataSubject.topic_type] }}</span>
      <span v-if="controlShowScore" class="score">（{{ dataSubject.points }}分）</span>
      <span v-if="controlShowSource" class="source">（{{ topic_source_details }}）</span>
      <span class="sub-information">{{dataSubInnerIndexRight}}</span>
    </div>
    <div v-else class="wapsubject-title" :class="{'show-style':controlShowStyle}">
      {{ SUBJECT_TYPE[dataSubject.topic_type] }}
      <span class="sub-information">{{dataSubInnerIndexRight}}</span>
    </div>
    <top-audio v-if="showAudio" :audio-src="bodyAudioUrl" :autoPlay="true" />
  </div>
</template>

<script>
import TopAudio from './top-audio'
import { SUBJECT_TYPE } from '@/config/subject-config'

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
    /** 是否显示题目来源 */
    controlShowSource: {
      type: Boolean,
      default: false
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
    showAudio () {
      return this.bodyAudioUrl && this.getCurrentTopic.id === this.dataSubject.id
    },
    subjectTite () {
      if (this.dataRankSting.includes('/')) {
        return `<span class="now">${this.dataRankSting.split('/')[0]}</span><span>/${this.dataRankSting.split('/')[1]}</span>`
      } else {
        return `<span class="now">${this.dataRankSting}</span>`
      }
    }
  }

}
</script>
<style lang='scss'>
.wapsubject-title {
  padding: 24px 0;
  font-size: 24px;
  color: #6a707c;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  &__wrapper {
    background-color: #fff;
    padding: 0 32px;
  }
  &__type {
    margin-left: 16px;
    color: #2b2f36;
  }
  &.show-style {
    background-color: $--wapcolor-tite-background;
  }
  .now {
    font-size: 40px;
    font-weight: 400;
    color: #2b2f36;
  }
  .score {
    color: $--wapcolor-tite-score;
  }
  .source {
    color: #9fa3aa;
  }
  .sub-information {
    font-size: 24px;
    color: $--wapcolor-tite-headline;
    margin-right: 20px;
    float: right;
  }
}
</style>
