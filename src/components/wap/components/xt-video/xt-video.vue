<template>
  <div :class="videoClass" class="xt-video"
       ref="xt-video"
       @touchstart="onMouseMove">

    <!--    <div class="xt-video&#45;&#45;toolbar" v-if="innerFullScreen" v-show="showToolbar">-->
    <!--&lt;!&ndash;      <img class="top-img" @click="returnTo" src="@/assets/images/return@2x.png" alt />&ndash;&gt;-->
    <!--    </div>-->
    <!--    播放器-->
    <video
      ref="Video"
      :autoplay="options.autoplay"
      :controls="showNativeControls"
      :style="videoPlayStyle"
      :poster="sources.poster"
      preload
      playsinline="isiPhoneShowPlaysinline"
      webkit-playsinline="isiPhoneShowPlaysinline"
      x-webkit-airplay
      :x5-video-player-type="x5VideoPlayerType"
      t7-video-player-type="inline"
      x5-video-orientation="landscape|portrait"
      x5-video-player-fullscreen="false"
    >
      <source :src="sources.src" :type="sources.type">
    </video>
    <!--    loading-->
    <div v-show="!showNativeControls" class="vjs-loading-spinner" dir="ltr"><span class="vjs-control-text">视频播放器 is loading.</span>
    </div>
    <!--    播放按钮-->
    <div v-show="showPlay&&!showNativeControls" :style="controlStyle">
      <div ref="btnplay" class="vjs-bigplay-button" @click="play"></div>
    </div>
    <!--      插槽-->
    <slot name="content"></slot>
    <!--      自定义控件-->
    <control-bar ref="controlBar"
                 v-show="!showNativeControls"
                 :style="controlStyle"
                 :class="controlClass"
                 :options="options"
                 :volume="volume"
                 :disable-volume="false"
                 :isFullscreen="isFullscreen"
                 @requestFullScreen="requestFullScreen"
                 @reload="reload"
                 v-on="$listeners"
                 @fullscreenchange="fullscreenchange"
    >
      <slot></slot>
    </control-bar>
  </div>
</template>

<script>
  // import formatTime from './plugins/utils/format-time.js'

  // import {
  //   VIDEO_SKD_SCRIPT,
  //   VIDEO_VOLUME_KEY,
  //   VIDEO_RESOLUTION_KEY,
  //   VIDEO_PLAYLIST_KEY,
  //   FORMAT_MIME_MAP,
  //   VIDEO_DEFINITION_MAP,
  //   LIVE_DEFINITION_MAP,
  //   VIDEO_PLAYBACK_KEY
  // } from './config/video-conf'

  // import {localStorage} from './plugins/utils/storage'
  import ControlBar from './control-bar/index'
  import fullscreen from './plugins/utils/fullscreen'

  import {callApp,IS_APP} from  './plugins/utils/tools'

  const INACTIVITY_TIMEOUT = 3000 // 3s 之后触发userActive
  const RIGHT_WIDTH = 348 + 14
  const OD_WIDTH = 1920 // 原画
  const SD_WIDTH = 768 // 标清
  const LD_WIDTH = 640 // 流畅
  let i = 0

  import { browser } from '@/config/common.js'
  import { callAPP } from '@/libs/utils/index.js'
  const DEFAULT_EVENTS = [
    // 'ready',
    'timeupdate',
    'loadeddata',
    'canplay',
    'canplaythrough',
    'play',
    'pause',
    'waiting',
    'playing',
    'ended',
    'error',
    'reload',
    'seeked'
  ]

  export default {
    name: 'XtVideo',
    components: {
      ControlBar
    },
    props: {
      dataSrc:{
        type:[String,undefined],
        required: true,
        default:'',
      },
      //第一帧图片
      dataPoster:{
        type:String,
      },
      //配置项
      controlOptions:{
        type:Object,
        required: false,
        default:()=>{}
      },
      controlStyle: {
        type: Object,
        default:()=>{}
      },
      // 播放之前
      beforePlay:{
        type:Function,
        default:()=>true
      }
    },
    data() {
      return {
        isFullscreen:false,//全屏
        showPlay: true,//是否显示播放按钮
        showControl: false,//是否显示进度条按钮
        innerFullScreen: false, // 内部全屏
        horizontalSceen: false, // 是否横屏
        // sceenByManual: false, // 是否手动触发的群培
        showToolbar: true, // 是否显示toolbar
        player: {},
        currentSource: {},
        videoClassList: [],
        volumeClass: '',
        volume: 50,
        liveTimeDisplay: '00:00',
        waiting: false,
        // 是否启用userActivity
        userActivityEnable: true
      }
    },
    computed: {
      /**播放视频需要的options*/
      options() {
        //默认值
        const defaultControlOptions = {
          native: false, // 是否原生模式
          // fullscreen: false, // 是否全屏
          autoplay: false, // 是否自动播放
          muted: false, // 静音
          volume: 50, // 音量
          control: {
            fullscreen: true // 是否显示全屏按钮
          }
        }
        const _controlOptions = Object.assign(defaultControlOptions,this.controlOptions)
        // this.fullscreenchange(_controlOptions.fullscreen)
        return {
          ..._controlOptions,
          sources: [ // 视频源
            {
              type: 'video/mp4', // 'mp4': 'video/mp4', 'm3u8': 'application/x-mpegURL'
              src: this.dataSrc, // 视频地址
              poster:this.dataPoster,//第一帧图片
            }
          ]
        }
      },
      //video 样式
      videoPlayStyle() {
        //未播放为白色,已播放为黑色
        // const background = this.showPlay ? 'white' : 'black'
        const background = 'black'
        return {background}
      },
      controlClass() {
        const control = this.showControl ? 'vjs-control-bar-show' : 'vjs-control-bar-hide'
        return [control]
      },
      isLive() {
        return this.options.isLive === undefined ? false : this.options.isLive
      },
      liveStartTime() {
        return this.options.liveStartTime || 0
      },
      videoClass() {
        return this.videoClassList.join(' ')
      },
      sources() {
        return this.options.sources.slice(0).reverse()[0] || {}
      },
      // videoStyle() {
      //   const style = {}
      //   debugger
      //   if (this.innerFullScreen) {
      //     if (this.sceenByManual) {
      //       const theTop =
      //         (document.documentElement.clientHeight - document.documentElement.clientWidth) / 2
      //       const theLeft =
      //         (document.documentElement.clientWidth - document.documentElement.clientHeight) / 2
      //       style.width = document.documentElement.clientHeight + 'px'
      //       style.height = document.documentElement.clientWidth + 'px'
      //       style.position = 'fixed'
      //       style.zIndex = '99'
      //       style.top = theTop + 'px'
      //       style.left = theLeft + 'px'
      //       style.transform = 'rotate(-90deg)'
      //     } else {
      //       style.top = '0'
      //       style.left = '0'
      //       style.position = 'fixed'
      //       style.zIndex = '99'
      //       style.width = '100%'
      //       style.height = '100%'
      //     }
      //   }
      //
      //   return style
      // },
      x5VideoPlayerType() {
        return this.options.native ? '' : 'h5-page'
      },
      showNativeControls() {
        return this.options.native
      }
    },
    watch: {
      /**
       * 监听手动全屏
       */
      full() {
        // fix ios 立马获取的宽度不正常
        setTimeout(() => {
          this.onResize()
        }, 100)
      }
    },
    mounted() {
      this.initPlayer()
      // if (this.options.agentFullScreen) {
      //   this.onOrientionChange()
      //   window.addEventListener('onorientationchange' in window ? 'orientationchange' : 'resize', this.onOrientionChange, false)
      // }
    },
    destroyed() {
      this.dispose()
    },
    methods: {
      fullscreenchange(v){
        this.isFullscreen = v
        if(v){
          this.addVideoClass('vjs-open')
        }else{
          this.removeVideoClass('vjs-open')
        }
        this.$emit('fullscreenchange',v)
      },
      // 双击
      onDoubleTap() {
        this.player.paused() ? this.player.play() : this.player.pause()
      },
      // initOptions() {
      //   const videoOptions = Object.assign({}, this.options)
      //   if (!videoOptions.sources || videoOptions.sources.length === 0) {
      //     return
      //   }
      //   this.currentSource = videoOptions.sources[0]
      // },
      //初始化
      initPlayer() {
        // this.initOptions()
        this.createPlayer()
      },
      createPlayer() {
        this.player = new Player(this.$refs['Video'], this.$refs['xt-video'],this)
        this.bindEvent()
        this.$refs.controlBar.init(this.player) //给子组件传入实例
        this.$emit('ready', this.player)
      },
      //横屏 竖屏
      // onOrientionChange() {
      //   this.innerFullScreen = [-90, 90].includes(window.orientation)
      //   this.options.fullscreen = this.innerFullScreen
      //   // this.sceenByManual = false
      // },
      // returnTo() {
      //   this.innerFullScreen = false
      //   this.options.fullscreen = false
      //   this.$emit('return')
      // },
      /**
       * 获取或者设置currentTime
       *
       * @param {int} t
       * @public
       */
      currentTime(t) {
        if (t !== undefined) {
          this.player.seek(t)
        } else {
          return this.player.getCurrentTime()
        }
      },
      /**
       * 销毁 player
       *
       * @public
       */
      dispose() {
        try {
          if (this.player) {
            this.unBindEvent()
            this.player.dispose()
          }
        } catch (error) {

        }
        // if (this.watchVideoStatusTime) {
        //   clearInterval(this.watchVideoStatusTime)
        // }
      },
      bindEvent() {
        DEFAULT_EVENTS.map(e => {
          this.player.on(e, () => {
            this.$emit(e, this.player)
          })
        })
        // this.player.on('ready', this.onReady)
        this.player.on('canplay', this.onReady)
        this.player.on('play', this.onPlay)
        this.player.on('pause', this.onPause)
        this.player.on('liveStreamStop', () => {
          this.addVideoClass('vjs-waiting')
          this.$emit('waiting', this.player)

          console.log('liveStreamStop')
          // this.reload()
        })

        this.player.on('waiting', () => {
          this.addVideoClass('vjs-waiting')
        })

        this.player.on('playing', () => {
          this.removeVideoClass('vjs-waiting')
        })

        this.player.on('timeupdate', () => {
          this.$emit('playing')
        })

        this.player.on('canplaythrough', () => {
          this.removeVideoClass('vjs-waiting')
        })

        this.userActivity_ = true
        // this.listenForUserActivity_()
        // 滑动时，用户激活态
        // window.addEventListener('touchmove', () => {
        //   this.userActivity_ = true
        // })
      },

      // listenForUserActivity_() {
      //   let inactivityTimeout
      //   this.userActivityInterval = setInterval(() => {
      //     if (!this.userActivityEnable) {
      //       clearTimeout(inactivityTimeout)
      //       this.userActive(true)
      //       return
      //     }
      //     if (!this.userActivity_) {
      //       return
      //     }
      //
      //     this.userActivity_ = false
      //     clearTimeout(inactivityTimeout)
      //
      //     inactivityTimeout = setTimeout(() => {
      //       this.userActive(false)
      //     }, INACTIVITY_TIMEOUT)
      //   }, 250)
      // },
      //销毁事件
      unBindEvent() {
        DEFAULT_EVENTS.map(e => {
          if (this.player) {
            this.player.off(e)
          }
        })
      },
      /**
       * 切换userActive启用状态
       */
      toggleUserActiveEnable(v) {
        this.userActivityEnable = v
      },
      /**
       * 播放视频
       */
        async play() {
        if (this.player) {
          if (!this.beforePlay) return
          const result =  await this.beforePlay(this.player)
          // if(!result) return //直接返回undefined
          this.showPlay = false  //关闭play控件
          this.showControl = true  //打开control控件
          this.player.play()

        }
      },
      /**
       * 暂停视频
       *
       * @public
       */
      pause() {
        if (this.player) {
          this.player.pause()
        }
      },
      requestFullScreen() {

        // if (this.options.agentFullScreen) {
        //   this.options.fullscreen = true
        //   this.sceenByManual = true
        //   this.innerFullScreen = true
        // }
        this.$emit('request-fullscreen')
      },
      // randomUrl(url) {
      //   let se = '?'
      //   if (url.search('\\?') > -1) {
      //     se = '&'
      //   }
      //   // if (!this.options.isLive) {
      //   //   return url
      //   // }
      //   return `${url}${se}t=${new Date().getTime()}`
      // },
      reload(noNeedSeek) {
        this.$emit('reload')
      },
      // reCreateHandle() {
      //   if (this.reCreateOption) {
      //     console.log('this.noNeedSeek:', this.noNeedSeek)
      //     !this.noNeedSeek && this.player.currentTime(this.reCreateOption.currentTime)
      //     !this.reCreateOption.paused && this.player.play()
      //   }
      // },
      onReady() {
        // console.log('onReady')
        //准备好后自动播放
        // this.reCreateHandle()
        console.error(this.options.autoplay,'this.options.autoplay')
        if (this.options.autoplay) {
          var evt = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window
          })
          this.$refs.btnplay.dispatchEvent(evt)

          this.player.play()
        }
      },
      // 用于切换分辨率，直播时不重建
      // onCurrentDefinition(url) {
      //   this.$emit('current-definition', url)
      //   // this.loadByUrl(url)
      //
      //   this.noNeedSeek = false
      // },

      // onChangePlaylist(p) {
      //   this.$emit('current-playlist', p)
      // },

      // loadByUrl(url) {
      //   if (this.options.isLive) {
      //     try {
      //       this.liveSeeked = false
      //       this.player.loadByUrl(url)
      //     } catch (error) {
      //
      //     }
      //   } else {
      //     const currentTime = this.player.currentTime()
      //     const paused = this.player.paused()
      //
      //     this.reCreateOption = {
      //       currentTime,
      //       paused
      //     }
      //     this.player.dispose()
      //     this.$nextTick(() => {
      //       this.createPlayer(url)
      //     })
      //   }
      // },
      /**
       * 是否用户激活
       */
      userActive(bool) {
        this.showToolbar = bool
        if (bool) {
          this.showControl = true //打开进度条
          setTimeout(() => {
            this.showControl = false //5s后关闭
          }, 5000)

        } else {}
        // 抛出用户激活事件
        this.$emit('user-active', bool)
      },
      /* callback */
      onMouseMove(e) {
        i++
        setTimeout(function () {i = 0}, 500)
        if (i > 1) {
          i = 0
          this.onDoubleTap()
        }
        if (e.screenX !== this.lastMoveX || e.screenY !== this.lastMoveY) {
          this.lastMoveX = e.screenX
          this.lastMoveY = e.screenY
          this.userActivity_ = true
          this.userActive(true)
        }
      },
      onMouseEnter() {
        this.userActivity_ = true
        this.userActive(true)
      },
      onMouseLeave() {
        this.userActive(false)
      },
      onCanplay() {
        this.$emit('ready', this.player)
        // this.addVideoClass('vjs-has-started')
      },
      onPlay() {
        this.addVideoClass('vjs-has-started')
        this.addVideoClass('vjs-playing')
      },
      onPause() {
        this.removeVideoClass('vjs-playing')
      },
      onTimeupDate() {
        this.currentTime = this.player.getCurrentTime()
      },

      /* /callback */
      addVideoClass(c) {
        const index = this.videoClassList.indexOf(c)
        if (index === -1) {
          this.videoClassList.push(c)
        }
      },
      removeVideoClass(c) {
        const index = this.videoClassList.indexOf(c)
        if (index !== -1) {
          this.videoClassList.splice(index, 1)
        }
      }
    }
  }

  class Player {
    constructor(tag, warp,thia) {
      this.tag = tag
      this.warp = warp
      // this.thia = thia
      this.fullscreenchange = thia.fullscreenchange
      // this.progressInterval = ()=>{}
      // this.progressCache = ()=>{}

    }
    // 全屏
    requestFullscreen(warp = this.warp){
      if(browser.ios){
        callAPP('callAPP', {name: 'enterFullScreen', param: {fullScreen:1}})//进入全屏
      }else{
        fullscreen.requestFullscreen(warp)
      }
      this.fullscreenchange(true)
    }
    //退出全屏
    exitFullscreen(){
      this.pause()
      if(browser.ios){
        callAPP('callAPP', {name: 'enterFullScreen', param: {fullScreen:0}})//退出全屏
      }else{
        fullscreen.exitFullscreen()
      }
      this.fullscreenchange(false)
    }
    on(event, callback) {
      this.tag.addEventListener(event, callback.bind(this))
    }

    play() {
        this.tag.play()
      this.progressInterval = this.progressIntervalFc() //开始计算进度
      this.progressCache =    this.progressCacheFc() //开始计算缓存
    }
    clearInterval (Interval){
      window.clearInterval(Interval)
    }
    pause() {
      this.tag.pause()
      this.clearInterval(this.progressInterval)//停止计算进度
    }
    //状态  true or false
    paused(){
     return  this.tag.paused
    }
    //媒体的持续时间(总长度)，以秒为单位
    duration() {
      return this.tag.duration
    }

    //这个属性可以读取到哪段时间范围内的媒体被缓存了。该属性包含了一个 TimeRanges 对象。
    buffered() {
      return this.tag.buffered
    }

    bufferedEnd() {
      const buffered = this.buffered()
      const duration = this.duration()
      let end = buffered.end(buffered.length - 1)
      //
      // if (end > duration) {
      //   end = duration
      // }
      return   end > duration ? duration:  end
    }

    //设置进度
    seek(t) {
      this.currentTime(t)
    }

    //给进度赋值or返回进度
    currentTime(t) {
      if (t !== undefined) this.tag.currentTime = t

      return this.tag.currentTime
    }
  }
</script>
<style lang="scss">
  @import "scss/var";
  @import "scss/index";
  @import "scss/control-bar";

  //禁用
  /*video::-webkit-media-controls{*/
  /*  display:none !important;*/
  /*}*/
</style>
