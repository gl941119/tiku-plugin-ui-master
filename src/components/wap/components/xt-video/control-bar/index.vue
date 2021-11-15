<template>
  <div class="vjs-control-wrap">
  <div class="vjs-control-back" v-if="isFullscreen"  @click="onBack">
        <div class="vjs-back-btn"></div>
  </div>

  <div :class="{fullscreen:isFullscreen}" class="vjs-control-bar">
    <template v-if="isFullscreen">
<!--      <button v-if="isLive" class="vjs-reload-control vjs-control vjs-button vjs-reload" type="button" title="刷新" @click="reload"></button>-->
      <ali-play  ref="play" :fullscreen="isFullscreen"></ali-play>
      <!-- progress -->
      <div class="vjs-center vjs-control">
        <div  class="vjs-current-time vjs-time-control vjs-control">
          <span class="vjs-control-text" role="presentation">当前时间&nbsp;</span>
          <span class="vjs-current-time-display" aria-live="off" role="presentation">{{ currentTimeDisplay }}</span>
        </div>
        <ali-progress
          v-on="$listeners"
                      ref="progress"
                      :options="options"
                      :is-dot-show="isDotShow">
        </ali-progress>
        <div  class="vjs-duration vjs-time-control vjs-control">
          <span class="vjs-control-text" role="presentation">时长&nbsp;</span>
          <span class="vjs-duration-display" aria-live="off" role="presentation">{{ durationDisplay }}</span>
        </div>

        <slot></slot>
      </div>
    </template>
    <template v-else>
<!--      <button v-if="isLive" class="vjs-reload-control vjs-control vjs-button vjs-reload" type="button" title="刷新" @click="reload"></button>-->
      <ali-play  ref="play"></ali-play>
      <!-- progress -->
      <div class="vjs-center vjs-control ml24 mr24">
        <div  class="vjs-current-time vjs-time-control vjs-control">
          <span class="vjs-control-text" role="presentation">当前时间&nbsp;</span>
          <span class="vjs-current-time-display" aria-live="off" role="presentation">{{ currentTimeDisplay }}</span>
        </div>
        <ali-progress
          v-on="$listeners"
                      ref="progress"
                      :options="options"
                      :is-dot-show="isDotShow">
        </ali-progress>
        <div  class="vjs-duration vjs-time-control vjs-control">
          <span class="vjs-control-text" role="presentation">时长&nbsp;</span>
          <span class="vjs-duration-display" aria-live="off" role="presentation">{{ durationDisplay }}</span>
        </div>
      </div>

      <slot></slot>
    </template>


    <div v-if="supportFullscreen" :class="{fullsceen:isFullscreen}" class="vjs-fullscreen-control vjs-control vjs-button"
         @click="onFullscreen">
    </div>


    <!-- /右边 -->
  </div>
  </div>
</template>

<script>

import fullscreen from '../plugins/utils/fullscreen'
import formatTime from '../plugins/utils/format-time.js'

import AliProgress from './progress'
import AliPlay from './play'




export default {
  components: {
    AliProgress,
    AliPlay
  },
  props: {
    options: {
      type: Object,
      required: true
    },
    volume: {
      type: Number,
      default: 0
    },
    disableVolume: {
      type: Boolean,
      default: false
    },
    isFullscreen:{//全屏
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      currentDefinition: {},
      currentPlaylistName: '',
      currentTime: 0,
      duration: 0,
      liveTimeDisplay: '00:00',
      isImportantTagsShow: false, // 是否显示重点标记
      playing: false, // 是否在播放
      isDotShow: true // 是否显示dot
    }
  },
  computed: {
    // 是否支持全屏操作（按钮是否显示）
    supportFullscreen () {
      if (!this.options.control) return false
      return this.options.control.fullscreen
    },
    //是否是直播
    // isLive () {
    //   return this.options.isLive === undefined ? false : this.options.isLive
    // },
    // liveStartTime () {
    //   return this.options.liveStartTime || 0
    // },
    sources () {
      return this.options.sources.slice(0).reverse() || []
    },
    playlist () {
      return this.options.playlist || []
    },
    currentTimeDisplay () {
      return formatTime(this.currentTime)
    },
    durationDisplay () {
      return formatTime(this.duration)
    }
  },
  watch: {
    currentTime () {
      // this.updateLiveTime()
    },
    // 'options.fullscreen' (v) { //暂无需求
    //   console.log(v)
    //   this.isFullscreen = v
    //   this.$nextTick(() => {
    //     this.initChildren()
    //   })
    // }
  },
  mounted () {
    //监听全屏事件
    fullscreen.onFullScreenEvent(this.fullscreenchange.bind(this))

    this.$nextTick(()=>this.options.fullscreen&&this.onFullscreen())
  },
  destroyed () {
    //移除监听全屏事件
    fullscreen.offFullScreenEvent(this.fullscreenchange.bind(this))
  },
  methods: {
    //退出全屏
    onBack(){
      this.player.exitFullscreen()
      this.$emit('exitFullscreen')
    },
    // 全屏
    onFullscreen () {
      this.player.requestFullscreen()
      this.$emit('requestFullScreen')
    },
    init (player) {
      this.player = player
      // this.currentDefinition = this.options.currentDefinition
      this.currentPlaylistName = this.options.currentPlaylistName
      this.initChildren()
      this.bindEvents()
    },
    initChildren () {
        this.$refs.progress && this.$refs.progress.init(this.player)
        this.$refs.play && this.$refs.play.init(this.player)
    },
    bindEvents () {
      this.player.on('durationchange', this.updateContent)
      this.player.on('loadstart', this.updateContent)
      this.player.on('loadedmetadata', this.updateContent)

      this.player.on('timeupdate', this.onTimeUpdate)
      this.player.on('playing', this.onPlaying)
      this.player.on('waiting', this.onWaiting)
    },
    reload () {
      this.$emit('reload')
    },

    updateLiveTime () {
      const now = parseInt(new Date().getTime() / 1000)
      const time = now - this.liveStartTime

      this.liveTimeDisplay = formatTime(time)
    },
    // event
    updateContent () {
      this.duration = this.player.duration() || this.options.duration
    },
    onTimeUpdate () {
      this.currentTime = this.player.currentTime()
    },
    onPlaying () {
      this.playing = true
    },
    onWaiting () {
      this.playing = false
    },
    /**
     * 监听全屏改变
     */
    fullscreenchange (e) {
      //记录状态
      // this.isFullscreen = fullscreen.fullScreenStatus()

      this.$emit('fullscreenchange',fullscreen.fullScreenStatus(),e)
    }
    // end envent
  }
}
</script>

<style scoped>
</style>
