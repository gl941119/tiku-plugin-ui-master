export default class baseEvent {
  events = []

  /** 注册事件 */
  on (fn) {
    fn && this.events.push(fn)
  }

  /** 移出事件 */
  remove (fn) {
    if (!fn) return
    const idx = this.events.findIndex(m => m === fn)
    if (idx !== -1) {
      this.events.splice(idx, 1)
    }
  }

  /** 清空 */
  clear () {
    this.events = []
  }
  /**
   * 触发事件
   * @param  {...any} params
   */
  dispatch (...params) {
    this.events.forEach(handler => {
      handler(...params)
    })
  }
}
