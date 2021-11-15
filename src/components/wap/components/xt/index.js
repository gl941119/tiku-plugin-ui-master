import Vue from 'vue'
import _XtConfirm from './xt-confirm'
import _XtMessage from './xt-message'

// 挂载函数
function Fn (component) {
  return function (propsData = {}) {
    if (propsData.toString() !== '[object Object]') {
      propsData = { propsData }
    }
    let { getContainer } = propsData
    // 继承
    const ConfirmConstructor = Vue.extend(component)
    const div = document.createElement('div')
    // 指定  挂载的 HTML 节点
    const getContainerFunc = () => {
      return getContainer === undefined ? document.querySelector('body') : getContainer
    }
    // 添加
    getContainerFunc().appendChild(div)
    // 加载
    new ConfirmConstructor({
      propsData
    }).$mount(div)
  }
}

// export default {
//   XtConfirm:()=>Fn(XtConfirm), // 手动挂载confirm组件
//   XtMessage:()=>Fn(XtMessage)
// }
export const XtConfirm =  ()=>Fn(_XtConfirm)// 手动挂载confirm组件
export const XtMessage = ()=>Fn(_XtMessage)
