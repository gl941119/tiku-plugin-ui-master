<template>
  <div class="audio stop-swiping">
    <div class="progress-wrapper">
      <img class="control" :src="nowUrl" draggable="false" @click.stop="controlPlay" @mouseover.stop @mouseup.stop />
      <div class="audio-time">
        <span>{{currentTime}}</span>
      </div>
      <div ref="progress" class="progress" @mousedown="mousedownHandler" @mousemove="mousemoveHandler" @mouseup="mouseupHandler" @mouseout.stop="mouseoutHandler">
        <div class="preview-progress" :style="previewStyle"></div>
        <div class="left" :style="leftStyle">
          <div class="ball">
            <div class="inner-ball" :class="{'loading':loadMore}"></div>
          </div>
        </div>
      </div>
      <div class="audio-time">
        <span>{{allTime}}</span>
      </div>
    </div>
    <audio ref="subjectAudio" :src="audioSrc"></audio>
  </div>
</template>

<script>
import TopAudioMixins from '@/components/mixins/top-audio-mixins.js'

export default {
  mixins: [TopAudioMixins],
  data () {
    return {
      isWap: false
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

.audio {
  height: 44px;
  background-color: #f5f5f5;
  border-radius: 8px;
  .progress {
    background-color: #dee0e4;
    height: 4px;
    line-height: 0px;
    border-radius: 2px;
    flex: 1;
    margin: 0 8px;
    position: relative;
    cursor: pointer;
    &-wrapper {
      height: 44px;
      display: flex;
      align-items: center;
      padding: 0 16px;
      > .control {
        width: 28px;
        height: 28px;
        margin-right: 12px;
        cursor: pointer;
      }
    }
    .preview-progress {
      height: 4px;
      width: 0%;
      border-radius: 2px;
      background-color: #fff2b1;
      position: absolute;
      transition: all 0.5s;
    }
    .left {
      height: 100%;
      background-color: $--color-active-primary;
      position: relative;
      border-radius: 2px;
    }
    .ball {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: #fff;
      padding: 2px;
      position: absolute;
      top: -4px;
      right: -10px;
      cursor: pointer;
      .inner-ball {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: $--color-active-primary;
        &.loading {
          background-image: url('~_img/basics/loading.png');
          background-position: center;
          background-size: 8px 8px;
          background-repeat: no-repeat;
          background-color: transparent;
          animation: rotate 0.5s linear infinite;
        }
      }
    }
  }
  &-time {
    font-size: 12px;
    color: #909399;
    text-align: right;
    white-space: nowrap;
  }
}
</style>
