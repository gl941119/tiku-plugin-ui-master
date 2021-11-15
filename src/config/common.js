/**
 * 应用名称(加入header中用于让后台区分应用)
 * */
export const APP_NAME = 'xthk_online_web'

/**
 * 应用版本
 * */
export const APP_VERSION = '1.1.0'

/**
 * 基础接口地址
 * */
export const INTERFACE_URL = process.env.VUE_APP_INTERFACE_URL

/**
 * 超时时间(毫秒)
 * */
export const TIMEOUT = 30000

/**
 * 默认cookie存储时间30天(毫秒)
 * */
export const defaultCookieExpire = 30 * 86400 * 1000

/**
 * 当前操作系统
 * */
export const OS = function () {
  const ua = navigator.userAgent,
    isWindowsPhone = /(?:Windows Phone)/.test(ua),
    isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
    isAndroid = /(?:Android)/.test(ua),
    isFireFox = /(?:Firefox)/.test(ua),
    isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
    isPhone = /(?:iPhone)/.test(ua) && !isTablet,
    isPc = !isPhone && !isAndroid && !isSymbian
  return {
    isTablet: isTablet,
    isPhone: isPhone,
    isAndroid: isAndroid,
    isPc: isPc
  }
}()


export const browser = function () {
  let u = navigator.userAgent
  let app = navigator.appVersion
  return {
    trident: u.indexOf('Trident') > -1, //IE内核
    presto: u.indexOf('Presto') > -1, //opera内核
    webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
    mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
    android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
    iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
    iPad: u.indexOf('iPad') > -1, //是否iPad
    webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
    weixin: u.indexOf('MicroMessenger') > -1, //是否微信
    qq: u.match(/\sQQ/i) == ' qq', //是否QQ
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
  }
}()

