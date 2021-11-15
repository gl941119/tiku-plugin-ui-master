<template>
  <div ref="progress" class="vjs-progress-control vjs-control">
    <div class="vjs-progress-holder vjs-slider vjs-slider-horizontal" @click="onSliderClick">
<!--      缓存-->
      <div :style="loadedStyle" class="vjs-load-progress">
        <div v-for="(item, index) in parts" :key="index" :style="{left: item.left,width: item.width}"></div>
      </div>
<!--      进度-->
      <div ref="bar" :style="barStyle"
           class="vjs-play-progress vjs-slider-bar stop-swiping">
      </div>
    </div>
  </div>
</template>

<script>
import dragUtil from '../plugins/utils/drag'
import {percentify} from '../plugins/utils/tools'
import fullscreen from '../plugins/utils/fullscreen'
import formatTime from '../plugins/utils/format-time.js'
export default {
  name: 'AliProgress',
  components: {
  },
  props: {
    options: {
      type: Object,
      required: true
    },
    isDotShow: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      currentTime: 0,
      value: 0,
      loaded: 0,
      parts: []
    }
  },
  computed: {

    loadedStyle () {
      return {
        width: `${this.loaded}%`
      }
    },
    barStyle () {
      return {
        width: `${this.value}%`
      }
    },
    currentTimeDisplay () {
      return formatTime(this.currentTime)
    },
    currentPosition () {
      return `${this.value}%`
    },
    /**
     * 是否手动切换到全屏模式
     */
    sceenByManual () {
      return this.options.sceenByManual || false
    }
  },
  mounted () {
    this.resetSize()
    window.addEventListener('resize', this.resetSize)
    fullscreen.onFullScreenEvent(this.resetSize.bind(this))

    this.bindEvent()
  },
  destroyed () {
    if (this.player.progressInterval)  this.player.clearInterval(this.player.progressInterval)
    if (this.player.progressCache)  this.player.clearInterval(this.player.progressCache)
    window.removeEventListener('resize', this.resetSize)
    fullscreen.offFullScreenEvent(this.resetSize.bind(this))
  },
  methods: {
    init (player) {
      this.sliderSize = this.$el.clientWidth
      this.player = player
      this.player.progressIntervalFc = this.setProgressInterval//进度条定时器
      this.player.progressCacheFc = this.setProgressCache //缓存定时器
    },
    bindEvent () {
      dragUtil.touchy(this.$refs.bar, 'add', 'mousedown', this.onDragStart)
      dragUtil.touchy(document.documentElement, 'add', 'mousemove', this.onDragging)
      dragUtil.touchy(document.documentElement, 'add', 'mouseup', this.onDragEnd)
    },
    resetSize () {
      this.sliderSize = this.$el.clientWidth
    },
    setProgressInterval () {
      return setInterval(() => this.update(), 300)
    },
    setProgressCache(){
      return window.setInterval(() => {
       this.updateCache()
      }, 300)
    },
    updateCache(){
      const player = this.player
      const buffered = player.buffered() //缓存
      const bufferedEnd = player.bufferedEnd() //??
      const children = this.parts //缓存的范围
      const duration =  player.duration() ||  this.options.duration //配置项的时长
      this.loaded = percentify(bufferedEnd, duration, true) //缓存进度
      // 计算缓存
      for (let i = 0; i < buffered.length; i++) {
        const start = buffered.start(i)
        const end = buffered.end(i)
        let part = children[i]

        if (!part) {
          part = {
            left: `${percentify(start, bufferedEnd)}%`,
            width: `${percentify(end - start, bufferedEnd)}%`
          }
          children[i] = part
        }
      }
      children.length = buffered.length
      // console.log(this.loaded,'更新缓存')
      if (player.progressCache&&this.loaded==='100.00') {//缓存100后停止
        player.clearInterval(player.progressCache)
        // console.log('停止缓存')
      }
    },
    //更新数据
    update () {
      const player = this.player
      const paused = player.paused() //是否在播放
      const currentTime = player.currentTime() //进度
      const duration =  player.duration() ||  this.options.duration //配置项的时长
      this.value = percentify(currentTime, duration, true)//进度条
      this.$emit('onUpdate',{value:this.value,currentTime})
      this.currentTime = currentTime//进度
      // console.log(this.value,'更新进度')

      if (player.progressInterval&&this.value==='100.00') {//进度100后停止
        player.clearInterval(player.progressInterval)
        // console.log('停止进度')
        this.$emit('onOver',{value:this.value,currentTime})
      }
    },
    onSliderClick (event) {

      if (this.sceenByManual) {
        const sliderOffsetLeft = this.$el.getBoundingClientRect().top
        let startX = event.clientY
        startX = this.sliderSize - startX + this.$el.getBoundingClientRect().width
        this.setPosition(((startX - sliderOffsetLeft) / this.sliderSize) * 100)
      } else {
        const sliderOffsetLeft = this.$el.getBoundingClientRect().left
        const startX = event.clientX
        // console.log(sliderOffsetLeft,startX,this.sliderSize,((   startX - sliderOffsetLeft) / this.sliderSize))
        this.setPosition(((   startX - sliderOffsetLeft) / this.sliderSize) * 100)
      }
    },
    onButtonDown (event) {
      event.preventDefault()
      this.onDragStart(event)
    },
    onDragStart (event) {
      this.dragging = true
      this.isClick = true
      if (event.type === 'touchstart') {
        event.clientY = event.touches[0].clientY
        event.clientX = event.touches[0].clientX
      }

      this.startX = event.clientX
      if (this.sceenByManual) {
        this.startX = this.sceenByManual ? event.clientY : event.clientX
        this.startX = this.sliderSize - this.startX + this.$el.getBoundingClientRect().width
      }

      this.startPosition = parseFloat(this.currentPosition)
      this.newPosition = this.startPosition
    },

    onDragging (event) {
      if (this.dragging) {
        this.isClick = false
        let diff = 0
        if (event.type === 'touchmove') {
          event.clientY = event.touches[0].clientY
          event.clientX = event.touches[0].clientX
        }

        this.currentX = event.clientX
        if (this.sceenByManual) {
          this.currentX = this.sceenByManual ? event.clientY : event.clientX
          this.currentX = this.sliderSize - this.currentX + this.$el.getBoundingClientRect().width
        }

        diff = ((this.currentX - this.startX) / this.sliderSize) * 100
        this.newPosition = this.startPosition + diff
        this.setPosition(this.newPosition)
      }
    },

    onDragEnd () {
      if (this.dragging) {
        /*
         * 防止在 mouseup 后立即触发 click，导致滑块有几率产生一小段位移
         * 不使用 preventDefault 是因为 mouseup 和 click 没有注册在同一个 DOM 上
         */
        setTimeout(() => {
          this.dragging = false
          if (!this.isClick) {
            this.setPosition(this.newPosition)
          }
        }, 0)
        window.removeEventListener('mousemove', this.onDragging)
        window.removeEventListener('touchmove', this.onDragging)
        window.removeEventListener('mouseup', this.onDragEnd)
        window.removeEventListener('touchend', this.onDragEnd)
        window.removeEventListener('contextmenu', this.onDragEnd)
      }
    },
    //定位
    setPosition (newPosition) {
      if (newPosition === null || isNaN(newPosition)) return
      if (newPosition < 0) {
        newPosition = 0
      } else if (newPosition > 100) {
        newPosition = 100
      }
      this.value = parseFloat(newPosition.toFixed(2))

      this.emitChange()
    },
    emitChange () {

      const duration = this.$parent.player.duration() ||  this.options.duration
      const currentTime = (this.value / 100) * duration
      this.$parent.player.seek(currentTime)
    }
  }
}
</script>

<style scoped>
</style>
