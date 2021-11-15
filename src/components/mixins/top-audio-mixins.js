const playUrl = require('_img/basics/play.png')
const pauseUrl = require('_img/basics/pause.png')

export default {
  name: 'TopAudio',
  props: {
    /** 音频地址 */
    audioSrc: {
      type: String
    },
    /** 否自动播放 */
    autoPlay: {
      type: Boolean,
      default: true
    }
  },
  data: function () {
    return {
      leftStyle: {
        width: '0%',
        transition: 'width 0s'
      },
      previewStyle: {
        width: '0%'
      },
      /** 标记是否按下鼠标 */
      isMouseDownOnBall: false,
      /** 鼠标进body时是否是mousedown */
      isMouseDownOnBody: false,
      /** 鼠标离开进度条时的clientX */
      outProgressClientX: 0,
      /** 主要用于防止一个页面内有多个本组件，MouseMove时互相影响而设置的字段 */
      isCurrentProgress: false,
      /** 格式化后的当前时间 */
      currentTime: '00:00',
      /** 格式化后的总时长 */
      allTime: '00:00',
      /** 当前播放进度，用来控制进度条 */
      percent: 0,
      /** 音频是否可以开始播放 */
      canPlayFlag: false,
      /** 音频是否在播放 */
      playFlag: false,
      /** 缓存音频状态 */
      tempFlag: false,
      /** 音频总时长 */
      duration: 0,
      timer: null,
      loadMore: true,
      /** 是wap还是pc */
      isWap: true
    }
  },
  computed: {
    getIsWifi () {
      return this.$store.getters.getIsWifi
    },
    getAudioList () {
      return this.$store.getters.getAudioList
    },
    getCurrentTopic () {
      return this.$store.getters.getCurrentTopic
    },
    /** 播放或暂停图标 */
    nowUrl () {
      return this.playFlag ? pauseUrl : playUrl
    },
    /** audio实例 */
    subjectAudio () {
      return this.$refs.subjectAudio
    },
    /** 进度条实例 */
    progressElement () {
      return this.$refs.progress
    },
    /** 音频是否在加载状态 */
    loadingFlag () {
      /** 当前缓存进度小于当前播放进度，或者音频还在加载不能播放时 */
      return (parseInt(this.leftStyle.width) > parseInt(this.previewStyle.width)) || !this.canPlayFlag
    }
  },
  watch: {
    /** 加载状态 */
    loadingFlag: {
      handler (c) {
        if (!c) {
          setTimeout(() => {
            this.loadMore = c
          }, 1000)
        } else {
          this.loadMore = c
        }
      },
      immediate: true
    },
    /** 监听进度条变化，改变音频当前时长 */
    percent (c) {
      const percentNum = c >= 100 ? 100 : c
      this.leftStyle.width = percentNum + '%'
    },
    /** 音频是否在播放状态，true是正在播放,动态改变进度条样式 */
    playFlag: {
      handler (c) {
        this.$nextTick(() => {
          if (this.subjectAudio) {
            if (c) {
              this.subjectAudio.play()
              this.leftStyle.transition = 'all 0.5s'
            } else {
              this.leftStyle.transition = 'width 0s'
              this.subjectAudio.pause()
            }
            this.playFlag = !this.subjectAudio.paused
          }
              // 播放完毕
          this.subjectAudio.onended = () => {
            console.log('播完啦')
            this.playFlag = false
            this.currentTime= '00:00',
            this.formatTime(this.currentTime)
            this.leftStyle = {
              width: '0%',
              transition: 'width 0s'
            }
          }
        })
      },
      immediate: true
    }
  },
  mounted () {
    this.addAudioEvents()
  },
  methods: {
    /** 处理自动播放 */
    handleAutoPlay (c) {
      if (this.getIsWifi) {
        const audioStatus = this.getAudioList[this.audioSrc]
        if (!audioStatus) {
          this.playFlag = this.autoPlay
        } else {
          this.subjectAudio.currentTime = (audioStatus.percent || 0) * this.duration / 100
        }
      } else {
        this.playFlag = false
      }
    },
    /** 加0函数，格式时间用 */
    addZero (num) {
      return num < 10 ? '0' + num : '' + num
    },
    /** 格式时间函数 */
    formatTime (time) {
      const min = Math.floor(time / 60)
      const second = Math.round(time - min * 60)
      return this.addZero(min) + ':' + this.addZero(second)
    },
    /** 计算进度 */
    computedPercent (x) {
      let percent = ((x - this.progressElement.offsetLeft) / this.progressElement.clientWidth) * 100
      percent = percent >= 100 ? 100 : percent
      this.leftStyle.width = percent + '%'
      this.$nextTick(() => {
        this.subjectAudio.currentTime = percent * this.duration / 100
      })
    },
    /** 监听audio事件 */
    addAudioEvents () {
      this.$nextTick(() => {
        if (this.subjectAudio) {
          this.subjectAudio.ondurationchange = this.durationChange
          this.subjectAudio.ontimeupdate = this.timeUpdate
          this.subjectAudio.onpause  = this.audioOnpause 
          this.subjectAudio.oncanplaythrough = this.oncanplaythrough
          this.getBuffered()
        }
      })
    },
    /** 可以播放事件 */
    oncanplaythrough (e) {
      this.canPlayFlag = true
    },
    audioOnpause(){
      this.playFlag = false
    },
    getBuffered () {
      if (!this.timer) {
        this.timer = setInterval(() => {
          const timeRanges = this.subjectAudio.buffered
          if (timeRanges.length) {
            this.previewStyle.width = timeRanges.end(timeRanges.length - 1) / this.duration * 100 + '%'
          }
        }, 1000)
      }
    },
    /** audio时长改变事件，此时获取时长，初始化时间 */
    durationChange () {
      this.duration = this.subjectAudio.duration
      /** 处理自动播放，与记录播放时长 */
      this.handleAutoPlay(this.getCurrentTopic)
      this.allTime = this.formatTime(this.duration)
    },
    /** audio播放暂停事件 */
    controlPlay () {
      if (this.loadMore) {
        return false
      }
      if (this.percent >= 100) {
        this.leftStyle = {
          width: '0%',
          transition: 'width 0s'
        }
      }
       // 音频播放互斥,传出对象由外部控制
       let objAudio = {
        subjectAudio: this.subjectAudio
      }
      this.$emit('clickAudio', objAudio)
      /** 异步更改播放状态 */
      this.$nextTick(() => {
        this.playFlag = !this.playFlag
        this.tempFlag = this.playFlag
      })
    },
    /** audio播放时事件 */
    timeUpdate () {
      const {
        currentTime
      } = this.subjectAudio
      this.currentTime = this.formatTime(currentTime)
      this.percent = (currentTime / this.duration) * 100
      /** 记录当前音频播放时长 */
      this.$store.commit('setAudioList', {
        url: this.audioSrc,
        percent: this.percent
      })
    },
    /** 进度条鼠标左键按下事件 */
    mousedownHandler (e) {
      if (e.which === 1 || e.touches) {
        const clientX = (e.touches && e.touches[0] && e.touches[0].clientX) || e.clientX
        this.isMouseDownOnBall = true
        this.isCurrentProgress = true
        this.computedPercent(clientX || 0)
        this.playFlag = false
      }
    },
    /** 进度条鼠标移动事件 */
    mousemoveHandler (e) {
      if (this.isMouseDownOnBall && this.isCurrentProgress) {
        const clientX = (e.touches && e.touches[0] && e.touches[0].clientX) || e.clientX
        this.playFlag = false
        this.computedPercent(clientX || 0)
      }
    },
    /** 进度条事件鼠标抬起事件 */
    mouseupHandler (e) {
      if (this.isMouseDownOnBall && this.isCurrentProgress) {
        this.isMouseDownOnBall = false
        this.isCurrentProgress = false
        if (e.touches) return
        this.$nextTick(() => {
          if (this.percent < 100) {
            this.playFlag = this.tempFlag
          }
        })
      }
    },
    mouseoverHandler (e) {
      /** 没有按左键进入进度条 */
      if (e.which === 0) {
        this.isMouseDownOnBall = false
      }
    },
    mouseoutHandler (e) {
      if (e.which === 1 && this.isCurrentProgress) {
        this.outProgressClientX = e.clientX
        this.isMouseDownOnBody = true
        this.bodyEventHandler()
      }
    },
    /** body元素的事件监听器 */
    bodyEventHandler () {
      document.body.addEventListener('mouseup', this.bodyMouseupHandler)
      document.body.addEventListener('mousemove', this.bodyMousemoveHandler)
    },
    /** body元素的mouseup事件监听器 */
    bodyMouseupHandler (body) {
      this.isMouseDownOnBall = false
      this.isMouseDownOnBody = false
      this.outProgressClientX = 0
      this.isCurrentProgress = false
      this.$nextTick(() => {
        if (this.percent < 100) {
          this.playFlag = this.tempFlag
        }
      })
      document.body.removeEventListener('mouseup', this.bodyMouseupHandler)
      document.body.removeEventListener('mousemove', this.bodyMousemoveHandler)
    },
    /** body元素的mousemove事件监听器 */
    bodyMousemoveHandler (e) {
      e.preventDefault()
      if (e.which === 1 && this.isMouseDownOnBody) {
        this.playFlag = false
        this.computedPercent(e.clientX || 0)
      }
    }
  }
}
