<template>
  <div style="display: inherit">
<!--    <button v-if="fullscreen" class="vjs-play-control vjs-control vjs-button vjs-back" type="button"-->
<!--            title="后退" @click="back">-->
<!--     </button>-->
    <button :class="playClass" class="vjs-play-control vjs-control vjs-button" type="button"
            title="播放" @click="togglePlay">
     </button>
<!--    <button v-if="fullscreen" class="vjs-play-control vjs-control vjs-button vjs-forward" type="button"-->
<!--            title="前端" @click="forward">-->
<!--    </button>-->
  </div>
</template>

<script>
export default {
  name: 'AliPlay',
  props: {
    fullscreen: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      paused: false, //播放or暂停
      ready: false,
      ended: false
    }
  },
  computed: {
    playClass () {
      return this.paused ? 'vjs-paused' : 'vjs-playing'
    }
  },
  methods: {
    init (player) {
      this.player = player
      this.bindEvent()
    },
    bindEvent () {
      this.$parent.player.on('ready', this.onReady)
      this.$parent.player.on('play', this.onPlay)
      this.$parent.player.on('pause', this.onPause)
      this.$parent.player.on('end', this.onEnd)
    },
    back () {
      this.$parent.player.seek(this.$parent.player.currentTime() - 10)
    },
    forward () {
      this.$parent.player.seek(this.$parent.player.currentTime() + 10)
    },
    togglePlay () {
      if (this.paused) {
        if (this.ended) {
          this.$parent.player.replay()
        } else {
          this.$parent.player.play()
        }
      } else {
        this.$parent.player.pause()
      }
      this.paused = !this.paused
    },
    onReady () {
      this.ready = true
      this.paused = this.player.paused()
    },
    onPlay () {
      this.paused = false
    },
    onPause () {
      this.paused = true
    },
    onEnd () {
      this.paused = true
      this.ended = true
    }
  }
}
</script>

<style lang="scss">
</style>
