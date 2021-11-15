// components
import TopicHandle from '@/components/wap/topic-handle'
// web 端 题目整合输出
import TopicCombine from '@/components/web/topic-combine'
import XtVideo from '@/components/wap/components/xt-video/xt-video'
import AnswerSheet from '@/components/wap/components/answer-sheet'
import PortraitScreen from '@/components/wap/vertical'
import H5Answer from '@/h5/views/h5-answer'
// lib
import DialogMask from '@/components/dialog'
import jsBridge from '@/libs/utils/app-call-back.js'
import { callAPP } from '@/libs/utils/index.js'
import { flatTopic } from '@/libs/utils/handle-topic.js'
import WebAnswer from '@/web/views/answer/index.vue'
import { XtConfirm, XtMessage } from '@/components/wap/components/xt/index'

import TopicStore from '@/store/modules/topic-store.js'

const Confirm = XtConfirm()
const Message = XtMessage()
export {
  H5Answer,  // h5答题页面，包括横屏与竖屏，可自由切换
  TopicHandle, // 单纯的答题组件，外部基本不会使用
  TopicCombine,// web端单纯的答题组件，外部基本不会使用
  XtVideo,//独立的视频组件
  PortraitScreen, // h5竖屏答题页面
  DialogMask, // 仅有蒙层样式的弹窗组件
  AnswerSheet, //独立的答题卡组件
  jsBridge,  //app回调h5注册方法
  callAPP, // 调用app接口方法
  WebAnswer, // web端答题整体界面输出
  Message,// 提示
  Confirm, // 确认
  flatTopic, // 扁平化题目函数
  TopicStore
}
