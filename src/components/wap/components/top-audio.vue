<template>
  <div class="wap-audio stop-swiping">
    <div class="progress-wrapper">
      <img class="control" :src="nowUrl" draggable="false" @click.stop="controlPlay" @mouseover.stop @mouseup.stop />
      <div class="wap-audio-time">
        <span>{{currentTime}}</span>
      </div>
      <div ref="progress" class="progress" @touchstart.stop="mousedownHandler" @touchmove.stop="mousemoveHandler" @touchend="mouseupHandler" @mouseout.stop="mouseoutHandler">
        <div class="preview-progress" :style="previewStyle"></div>
        <div class="left" :style="leftStyle">
          <div class="ball">
            <div class="inner-ball" :class="{'loading':loadMore}"></div>
          </div>
        </div>
      </div>
      <div class="wap-audio-time">
        <span>{{allTime}}</span>
      </div>
    </div>
    <audio ref="subjectAudio" :src="audioSrc" :autoplay="phoneAutoplay"></audio>
  </div>
</template>

<script>
import TopAudioMixins from '@/components/mixins/top-audio-mixins.js'
import { OS } from '@/config/common.js'

export default {
  mixins: [TopAudioMixins],
  computed: {
    phoneAutoplay () {
      return OS.isPhone ? 'autoplay' : ''
    }
  }
}
</script>

<style  lang='scss'>
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.wap-audio {
  height: 86px;
  background-color: #f5f5f5;
  border-radius: 16px;
  .progress {
    background-color: #dee0e4;
    height: 8px;
    line-height: 0px;
    border-radius: 4px;
    flex: 1;
    margin: 0 16px;
    position: relative;
    &-wrapper {
      height: 86px;
      display: flex;
      align-items: center;
      padding: 0 32px;
      > .control {
        width: 54px;
        height: 54px;
        margin-right: 24px;
      }
    }
    .preview-progress {
      height: 8px;
      width: 0%;
      border-radius: 4px;
      background-color: #fff2b1;
      position: absolute;
      transition: all 0.5s;
    }
    .left {
      height: 100%;
      background-color: $--color-wap-active-primary;
      position: relative;
      border-radius: 4px;
    }
    .ball {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background-color: #fff;
      padding: 4px;
      position: absolute;
      top: -6px;
      right: -16px;
      .inner-ball {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: $--color-wap-active-primary;
        &.loading {
          background-image: url('~_img/basics/loading.png');
          background-position: center;
          background-size: 16px 16px;
          background-repeat: no-repeat;
          background-color: transparent;
          animation: rotate 0.5s linear infinite;
        }
      }
    }
  }
  &-time {
    font-size: 24px;
    color: #909399;
    text-align: right;
    white-space: nowrap;
  }
}
</style>
