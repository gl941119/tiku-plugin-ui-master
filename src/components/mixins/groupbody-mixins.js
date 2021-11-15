const CONTENT_HEIGHT = {
  min: 40,
  max: 451,
  default: 160
}
const ACROSS_CONTENT_HEIGHT = { //横屏模式下默认值和最大值
  min: 30,
  max: 200,
  default: 60
}
export default {
  data () {
    return {
      height: CONTENT_HEIGHT.default,
      across_height:ACROSS_CONTENT_HEIGHT.default,
    }
  },
  props: {
    /** 题目对象 */
    dataSubject: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    contentStyle () {
      if (window.orientation == 90 || window.orientation == -90) { //横屏
        return {
          height: `${this.across_height}px`
        }
      } else{
        return {
          height: `${this.height}px`
        }
      }
    }
  },
  mounted () {
    this.bindEvents()
  },
  beforeDestroy () {
    this.unBindEvents()
  },
  methods: {
    bindEvents () {
      let dom = document.body
      this.$refs.control.addEventListener('mousedown', this.down)
      dom.addEventListener('mouseup', this.up)
      dom.addEventListener('mousemove', this.move)
      this.$refs.control.addEventListener('touchstart', this.down)
      dom.addEventListener('touchend', this.up)
      dom.addEventListener('touchmove', this.move)
    },
    unBindEvents () {
      let dom = document.body
      this.$refs.control.removeEventListener('mousedown', this.down)
      dom.removeEventListener('mouseup', this.up)
      dom.removeEventListener('mousemove', this.move)
      this.$refs.control.removeEventListener('touchstart', this.down)
      dom.removeEventListener('touchend', this.up)
      dom.removeEventListener('touchmove', this.move)
    },
    down (e) {
      let styH = this.$refs.content.offsetHeight
      console.log('styH:'+styH)
      this.active = true
      this.disY = e.clientY || e.touches[0].clientY
      this.styH = styH
    },
    bodymo(e){
      e.preventDefault()
    },
    move (e) {
      let C_HEIGHT= {
        min: 40,
        max: 451,
        default: 160
      }
      if (window.orientation == 90 || window.orientation == -90){
        C_HEIGHT=ACROSS_CONTENT_HEIGHT
      } else{
        C_HEIGHT=CONTENT_HEIGHT 
      }
      document.body.addEventListener('touchmove', this.bodymo, { passive: false }) //passive 参数不能省略，用来兼容ios和android
      e.stopPropagation()
      let clientY = e.clientY || e.touches[0].clientY
      if (!this.active) return
      // 通过事件委托，计算移动的距离
      let top = clientY - this.disY
      let newTop = top + this.styH
      if (newTop < C_HEIGHT.min) {
        newTop = C_HEIGHT.min
      }
      if (newTop > C_HEIGHT.max) {
        newTop = C_HEIGHT.max
      }
      this.height = newTop
      this.across_height = newTop
      console.log('newTop:'+newTop)
      this.$emit('changeHeight' , newTop)
      
    },
    up (e) {
      document.body.removeEventListener('touchmove', this.bodymo,{ passive: false })
      this.active = false
    }
  }
}
