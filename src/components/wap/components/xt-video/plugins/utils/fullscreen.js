

//是否支持全屏操作
function supportFullScreen () {
  const doc = document.documentElement

  return ('requestFullscreen' in doc) ||
      ('mozRequestFullScreen' in doc && document.mozFullScreenEnabled) ||
      ('msRequestFullscreen' in doc && document.msFullscreenEnabled) ||
      ('webkitRequestFullScreen' in doc)
}
//返回是否全屏状态
function fullScreenStatus () {
  if (document.fullscreen ||
      document.mozFullScreen ||
      document.fullscreenElement ||
      document.msFullscreenElement ||
      document.webkitIsFullScreen) {
    return true
  } else {
    return false
  }
}
//进入全屏
function requestFullscreen (element) {
  // console.log(element.requestFullscreen,element.webkitEnterFullscreen,element.webkitRequestFullscreen)
  if (element.requestFullscreen) {
    element.requestFullscreen()
  }else if(element.webkitEnterFullscreen){
    element.webkitEnterFullscreen()//兼容ios
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen()
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen()
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen()
  } else {
    console.log('Fullscreen API is not supported.')
  }
}
//退出全屏
function exitFullscreen () {
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen()
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen()
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen()
  } else {
    console.log('Fullscreen API is not supported.')
  }
}
//监听全屏事件
function onFullScreenEvent (callback) {
  document.addEventListener('fullscreenchange', callback)
  document.addEventListener('mozfullscreenchange', callback)
  document.addEventListener('MSFullscreenChange', callback)
  document.addEventListener('webkitfullscreenchange', callback)
}
//移除监听全屏事件
function offFullScreenEvent (callback) {
  document.removeEventListener('fullscreenchange', callback)
  document.removeEventListener('mozfullscreenchange', callback)
  document.removeEventListener('MSFullscreenChange', callback)
  document.removeEventListener('webkitfullscreenchange', callback)
}

export default {
  supportFullScreen,
  fullScreenStatus,
  requestFullscreen,
  exitFullscreen,
  onFullScreenEvent,
  offFullScreenEvent
}
