/**
 * 依赖video.js和flv.js实现的播放器
 * 直播方案:
 *     高版本浏览器使用http-flv方案,采用h5支持截图功能
 *     低版本使用m3u8方案,采用h5支持截图功能
 * 录播重播方案:
 *     全部采用h5方案
 * 两种方案都支持：
 * 1.截图
 * 2.切换码率
 * 使用帮助
    <xt-video :options="videoOptions"
              @playing="onPlaying"
              @waiting="onWaiting"
              @reload="onReload"
              @ready="onReady"
              @requestFullScreen="requestFullScreen">
      这里是控件的slot
    </xt-video>
    videoOptions: {
      native: true, // 是否原生模式
      isLive: true, // 是否是直播
      fullscreen: false, // 是否全屏
      autoplay: true, // 是否自动播放
      muted: false, // 静音
      volume: 50, // 音量
      liveStartTime: 0, // 直播开始时间
      control: {
        fullscreen: true // 是否支持全屏操作
      },
      sources: [
        {
          definition: 'OD', // 分辨率
          type: 'video/mp4', // 'mp4': 'video/mp4', 'm3u8': 'application/x-mpegURL'

          label: '名称', // eg.高清
          src: '' // 视频地址
        }
      ] // 视频源
    }
  支持的事件列表
  'ready',
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
 * @author xiaolin.dai
 * @date 2020/1/10
 * @version v1.0.0
 */
// import XtVideo from './xt-video'
// // import BdVideo from './src/bd-video'
// // import AliVideo from './src/ali-video'
//
// // export { BdVideo, AliVideo }
// export default XtVideo
