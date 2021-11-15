<script>
const NETWORK_STATUS_WIFI = '1'
import TopicComponent from '../topic-component'
import MethodsMixins from '../../mixins/methods-mixins'
import TopicCombineMixin from '../../mixins/topic-combine-mixin'
import { QUESTION_TYPE_SINGLE, QUESTION_TYPE_JUDGE, QUESTION_TYPE_GROUP } from '@/config/subject-config'
import { REVIEW_NO_ANSWER, NOT_ALL_ANSWER } from '@/config/answer-config'
import jsBridge from '@/libs/utils/app-call-back.js'
import { callAPP } from '@/libs/utils/index.js'
import store from '@/store'
import Swiper from 'swiper/bundle'
import 'swiper/swiper.min.css'
import 'swiper/swiper-bundle.min.css'
export default {
  name: 'TopicCombine',
  model: {
    prop: 'controlCurrentTopicIndex',
    event: 'sync-index'
  },
  mixins: [MethodsMixins, TopicCombineMixin],
  components: {
    TopicComponent
  },
  props: {
    disableSwiping: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      virtualData: {
        offset: 0,
        slides: [0, 1],
        from: 0,
        to: 1
      },
      swiperOption: null,
      mySwiper: null,
      swiperWidth: 0
    }
  },
  computed: {
    offsetLeftStyle () {
      return {
        left: this.virtualData.offset + 'px'
      }
    },
    /** 虚拟slid配置 */
    slides () {
      return this.dataSource.map((v, i) => i)
    }
  },
  mounted () {
    const self = this
    let index = 0
    const flag = this.dataSource.some((v, i) => {
      index = i
      const status = String(v.answer_status)
      return status === REVIEW_NO_ANSWER || status === NOT_ALL_ANSWER
    })
    if (!this.controlAnswered && flag) {
      this.topicIndex = index
    }
    if (~~this.controlCurrentTopicIndex) {
      this.topicIndex = ~~this.controlCurrentTopicIndex
    }
    this.mySwiper = new Swiper('.swiper-container', {
      noSwiping: true,
      initialSlide: this.topicIndex,
      /** 禁止滑动切换题目的类名 */
      noSwipingClass: 'stop-swiping',
      virtual: {
        slides: self.slides,
        renderExternal: (data) => {
          this.virtualData = data
        }
      },
      on: {
        slideChange: (e) => {
          this.$emit('save', this.combineUserdata[0])
          this.topicIndex = e.realIndex
          // this.$emit('change-topic', this.combineUserdata)
          this.$emit('sync-index', this.topicIndex)
        },
        touchEnd: (swiper, event) => {
          /** 当滑动的是最后一题，且向左滑动距离超过1/4屏，触发展示答题卡事件 */
          const offset = (this.topicLen - 1) * this.swiperWidth
          //是否最后一个
          const is_end = swiper.realIndex === (this.topicLen - 1)
            if (is_end&&(offset + swiper.translate < -this.swiperWidth / 4)) {
              this.$emit('showAnswerCard')
            }
        }
      }
    })
    this.swiperWidth = this.mySwiper.width
  },
  watch: {
    controlCurrentTopicIndex (c) {
      this.mySwiper.slideTo(c, 0, false)
    }
  },
  methods: {
    getNetworkStatus () {
      let obj = {
        name: 'getNetworkStatus'
      }
      callAPP('callAPP', obj)
      jsBridge.setNetworkStatus.on(v => {
        // 当前是否在wifi环境
        store.commit('setIsWifi', String(v.status) === NETWORK_STATUS_WIFI)
      })
    },
    choose (res) {
      const { topic_type } = res
      if (topic_type == QUESTION_TYPE_GROUP) return
      this.$emit('save', res)
      const autoFlag = (topic_type == QUESTION_TYPE_SINGLE || topic_type == QUESTION_TYPE_JUDGE) && this.combineUserdata[0].topic_type != QUESTION_TYPE_GROUP
      /** 当为单选题和判断题时自动切换下一题，若为最后一题则打开答题卡 */
      if (!this.disableSwiping && autoFlag) {
        this.autoSwitchover()
      }
    },
    /** 组合题切换题目 */
    changeTopic () {
      this.autoSwitchover()
    },
    autoSwitchover () {
      if (this.topicIndex === this.topicLen - 1) {
        this.$emit('showAnswerCard')
      } else {
        this.mySwiper.slideTo(Number(this.topicIndex) + 1, 500, false)
      }
    },
    /** 上一题 */
    prevTopic () {
      const topic = this.combineUserdata[0]
      /** 组合题直接切换小题 */
      if (Number(topic.topic_type) === QUESTION_TYPE_GROUP && topic.subIndex > 0) {
        topic.subIndex--
        const currentGroupSwiper = document.querySelector('.group-swiper-container_' + topic.id).swiper
        currentGroupSwiper.slidePrev()
        return topic.subIndex === 0
      } else {
        this.mySwiper.slidePrev()
        return false
      }
    },
    /** 下一题 */
    nextTopic () {
      const topic = this.combineUserdata[0]
      /** 组合题直接切换小题 */
      if (Number(topic.topic_type) === QUESTION_TYPE_GROUP && topic.subIndex < topic.children.length - 1) {
        topic.subIndex++
        const currentGroupSwiper = document.querySelector('.group-swiper-container_' + topic.id).swiper
        currentGroupSwiper.slideNext()
        return topic.subIndex === topic.children.length - 1
      } else {
        this.mySwiper.slideNext()
        return false
      }
    }
  },
  render (h) {
    const dataSource = this.dataSource
    let { topicLen, $props, handlerFunction } = this
    const topicVnodeList = this.virtualData.slides.map(v => {
      const dataSubject = dataSource[v]
      if (!dataSubject) return
      let props = Object.assign({}, $props, {
        dataSubject,
        dataRankSting: `${v + 1}/${topicLen}`,
        controlCurrentTopicIndex: v,
        controlShowSource: this.controlShowSource,
        controlShowScore: false
      })
      let bottomSlot = this.handleGetSlot(h, 'bottom')
      let statusSlot = this.handleGetSlot(h, 'status')
      let questionBottomSlot = this.handleGetSlot(h, 'questionBottom')
      return (
        <div class={ `swiper-slide ${this.disableSwiping ? 'stop-swiping' : ''}` } style={ this.offsetLeftStyle } key={ v }>
          <topic-component ref="topic" { ...{ props, on: handlerFunction } }>
            { bottomSlot }
            { statusSlot }
            { questionBottomSlot }
          </topic-component>
        </div>
      )
    })
    return (
      <div class="swiper-container">
        <div class="swiper-wrapper" style={ this.resetStyle }>
          { topicVnodeList }
        </div>
      </div>
    )
  }
}
</script>
<style lang="scss">
.topic-content {
  height: 100%;
  overflow: auto;
  &.bgc-gary {
    background-color: #f8f9fb;
  }
}
</style>
