
/** 获得app端webview注入对象 */
 const getAppOwner = ()=> {
  try {
    let tmp = null
    if (window.App) {
      return window.App
    } else if ((tmp = window.webkit) && (tmp = tmp.messageHandlers)) {
      return window.webkit.messageHandlers
    }
  } catch (ex) {
    console.log(ex)
  }
  return null
}

/**
 * APP端跳转
 * */
export const callApp = (name, val) => {
  try {
    let appFn = getAppOwner()
    let data = ''
    if (val) {
      data = JSON.stringify(val)
    }
    try {
      if (data) {
        appFn[name](data)
      } else {
        appFn[name]()
      }
    } catch (e) {
      appFn[name].postMessage(data)
    }
  } catch (e) {
    console.log(e)
  }
}
// userAgent用于判断是否app
export const IS_APP = navigator.userAgent.indexOf('XTHKEDU') !== -1
export const percentify =  (time, end, rounded)=> {
  let percent = time / end || 0
  percent = (percent >= 1 ? 1 : percent) * 100
  return rounded ? percent.toFixed(2):percent
}
