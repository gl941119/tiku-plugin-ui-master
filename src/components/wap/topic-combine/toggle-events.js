class ToggleTopic {
  constructor (eventComtainer, reDistance) {
    this.startClientX = 0
    this.eventComtainer = eventComtainer
    this.handlePublicStart = null
    this.handlePublicMove = null
    this.reDistance = reDistance
  }
  start (isStop, cb = []) {
    if (arguments.length === 1) {
      cb = isStop
      isStop = false
    }

    this.handlePublicStart = (event) => {
      isStop && event.stopPropagation()
      this.handleTouchStart(event, cb)
    }

    this.eventComtainer.addEventListener('touchstart', this.handlePublicStart)
    this.eventComtainer.addEventListener('touchend', this.handleTouchEnd)
  }

  destroy () {
    this.eventComtainer.removeEventListener('touchstart', this.handlePublicStart)
    this.eventComtainer.removeEventListener('touchend', this.handleTouchEnd)
  }

  handleTouchStart (startEvent, cb) {
    let [startTouch] = startEvent.changedTouches
    this.startClientX = startTouch.clientX
    this.handlePublicMove = (event) => {
      this.handleTouchMove(event, cb)
    }
    document.body.addEventListener('touchmove', this.handlePublicMove)
  }
  handleTouchEnd () {
    document.body.removeEventListener('touchmove', this.handlePublicMove)
  }
  handleTouchMove (moveEvent, cb) {
    let [prev, next] = cb
    let [endTouch] = moveEvent.changedTouches
    let endClientX = endTouch.clientX
    let touchMoveDis = this.startClientX - endClientX
    if (touchMoveDis > this.reDistance) {
      next()
      this.handleTouchEnd()
    }
    if (touchMoveDis < -this.reDistance) {
      prev()
      this.handleTouchEnd()
    }
  }
}

export default ToggleTopic
