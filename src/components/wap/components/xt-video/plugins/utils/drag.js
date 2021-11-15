var crossvent = require('crossvent')
var doc = document
function touchy (el, op, type, fn) {
  var touch = {
    mouseup: 'touchend',
    mousedown: 'touchstart',
    mousemove: 'touchmove'
  }
  var pointers = {
    mouseup: 'pointerup',
    mousedown: 'pointerdown',
    
    mousemove: 'pointermove'
  }
  var microsoft = {
    mouseup: 'MSPointerUp',
    mousedown: 'MSPointerDown',
    mousemove: 'MSPointerMove'
  }
  if (window.navigator.pointerEnabled) {
    crossvent[op](el, pointers[type], fn)
  } else if (window.navigator.msPointerEnabled) {
    crossvent[op](el, microsoft[type], fn)
  } else {
    crossvent[op](el, touch[type], fn)
    crossvent[op](el, type, fn)
  }
}
function whichMouseButton (e) {
  if (e.touches !== void 0) { return e.touches.length }
  if (e.which !== void 0 && e.which !== 0) { return e.which } // see https://github.com/bevacqua/dragula/issues/261
  if (e.buttons !== void 0) { return e.buttons }
  var button = e.button
  if (button !== void 0) { // see https://github.com/jquery/jquery/blob/99e8ff1baa7ae341e94bb89c3e84570c7c3ad9ea/src/event.js#L573-L575
    return button & 1 ? 1 : button & 2 ? 3 : (button & 4 ? 2 : 0)
  }
}

function getOffset (el) {
  var rect = el.getBoundingClientRect()
  return {
    left: rect.left + getScroll('scrollLeft', 'pageXOffset'),
    top: rect.top + getScroll('scrollTop', 'pageYOffset')
  }
}

function getScroll (scrollProp, offsetProp) {
  if (typeof window[offsetProp] !== 'undefined') {
    return window[offsetProp]
  }
  if (documentElement.clientHeight) {
    return documentElement[scrollProp]
  }
  return doc.body[scrollProp]
}

function getElementBehindPoint (point, x, y) {
  var p = point || {}
  var state = p.className
  var el
  p.className += ' gu-hide'
  el = doc.elementFromPoint(x, y)
  p.className = state
  return el
}

function getEventHost (e) {
  // on touchend event, we have to use `e.changedTouches`
  // see http://stackoverflow.com/questions/7192563/touchend-event-properties
  // see https://github.com/bevacqua/dragula/issues/34
  if (e.touches && e.touches.length) {
    return e.touches[0]
  }
  if (e.changedTouches && e.changedTouches.length) {
    return e.changedTouches[0]
  }
  return e
}

function getCoord (coord, e) {
  var host = getEventHost(e)
  var missMap = {
    pageX: 'clientX', // IE8
    pageY: 'clientY' // IE8
  }
  if (coord in missMap && !(coord in host) && missMap[coord] in host) {
    coord = missMap[coord]
  }
  return host[coord]
}

function getParent (el) { return el.parentNode === doc ? null : el.parentNode }

export default {
  touchy,
  whichMouseButton,
  getOffset,
  getScroll,
  getElementBehindPoint,
  getEventHost,
  getCoord,
  getParent
}
