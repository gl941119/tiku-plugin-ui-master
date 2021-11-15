
/** 获得app端webview注入对象 */
export function getAppOwner () {
  try {
    let tmp = null
    if (window.App) {
      return window.App
    } else if ((tmp = window.webkit) && (tmp = tmp.messageHandlers)) {
      return window.webkit.messageHandlers
    } else if (window.top) {
      return window.top
    }
  } catch (ex) {
    console.log(ex)
  }
  return null
}
/**
 * app接口调用
 * name  调用app方法名,目前统一叫callAPP
 * val   对象 包含name字段(方法名，必填)  vule字段（json类型可选）
 * */
export const callAPP = (name, val) => {
  try {
    let appFn = getAppOwner()
    let data
    if (val !== undefined && val !== null) {
      data = JSON.stringify(val)
    }
    try {
      data ? appFn[name](data) : appFn[name]()
    } catch (e) {
      try {
        appFn.postMessage(`${name}-${data}`, '*')

      } catch (e) {
        appFn[name].postMessage(data)
      }
    } finally {
      console.log({ appFn: name, data })
    }
  } catch (e) {
    console.log({ e: e.toString() })
  }
}
/**
 * 消抖执行方法
 * @param {Function} fn 待执行方法
 * @param {Number} delay 消抖延时执行时间。默认180
 */
export const debounce = (fn, delay = 180) => {
  let timer = null

  return function () {
    let args = arguments
    let context = this
    if (timer) {
      clearTimeout(timer)
      timer = setTimeout(function () {
        fn.apply(context, args)
        timer = null
      }, delay)
    } else {
      timer = setTimeout(function () {
        fn.apply(context, args)
      }, delay)
    }
  }
}



