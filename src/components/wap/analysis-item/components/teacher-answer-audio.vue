<!-- 底部答案文字解析 -->
<template>
    <div class="wap-audio-analysis"  >
        <div class="control" @click="controlPlay" :class="{'playing':this.playFlag}"></div>
        <div class="place"></div>
        <div class="wap-audio-analysis-time">
            <span v-if="!canPlayFlag">正在缓冲</span>
            <span>{{currentTime}}</span>
        </div>
         <audio ref="subjectAudio" :src="audioSrc"></audio>
    </div>
</template>

<script>
import TopAudioMixins from '@/components/mixins/top-audio-mixins.js'
export default {
  mixins: [TopAudioMixins],
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
    @keyframes playing {
    0% {
        background-image: url('~_img/basics/playing-first.png');
    }
    50% {
        background-image: url('~_img/basics/playing-second.png');
    }
    100% {
        background-image: url('~_img/basics/playing-third.png');
    }
 }
  .wap-audio-analysis {
    height: 94px;
    background-color: #fff9f2;
    border-radius: 16px;
    margin: 24px 0 16px 0;
    display: flex;
    align-items: center;
    margin-top: 50px;
    .control {
      width: 46px;
      height: 40px;
      margin-left: 34px;
      background-image: url('~_img/basics/playing-first.png');
       background-size: contain;

      &.playing {
        animation: playing 1s infinite;
      }
    }
    .place {
      flex: 1;
    }
    &-time {
      font-size: 24px;
      margin: 0 32px;
      color: $--color-wap-warning-primary;
      text-align: right;
      white-space: nowrap;
    }
  }
  .wapbottom-cut {
    height: 16px;
    background: #FAFAFA;
  }
}
</style>
