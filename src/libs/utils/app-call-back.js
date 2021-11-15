import BaseEvent from './base-event'
const jsBridge = {
  // /** APP回传地址图片地址 */
  addPhotos: new BaseEvent(),
  // /** APP回传视频地址到h5 */
  addVideo: new BaseEvent(),
  /** APP回传音频地址到h5 */
  addAudio: new BaseEvent(),
  /** 获取网络状态 */
  setNetworkStatus: new BaseEvent()
}

Object.keys(jsBridge).forEach(m => {
  if (!window[m]) {
    window[m] = function () {
      const arr = [...arguments]
      Reflect.apply(jsBridge[m].dispatch, jsBridge[m], arr)
    }
  }
})
if (!window.callH5) {
  window.callH5 = function (v) {
    console.log(v)
    if (v) {
      try {
        v = JSON.parse(v)
      } catch (ex) {
        // alert(ex)
      }
      window[v.name] && window[v.name](v.param)
    }
  }

}

const jsBridgeProxy = new Proxy(jsBridge, {
  get: function (obj, prop) {
    if(!obj[prop]) {
      obj[prop] = new BaseEvent()
      if (!window[prop]) {
        window[prop] = function () {
          const arr = [...arguments]
          Reflect.apply(jsBridge[prop].dispatch, jsBridge[prop], arr)
        }
      }
    }
    return obj[prop]
  }
})

export default jsBridgeProxy
