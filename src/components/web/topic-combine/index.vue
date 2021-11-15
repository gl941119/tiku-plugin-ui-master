<script>
import TopicComponent from '../topic-component'
import MethodsMixins from '../../mixins/methods-mixins'
import TopicCombineMixin from '../../mixins/topic-combine-mixin'
import { QUESTION_TYPE_SINGLE, QUESTION_TYPE_JUDGE } from '@/config/subject-config'
import { debounce } from '@/libs/utils/index.js'
const IS_PREV = true
const START_INDEX = 0
const FIRST_SUB_TOPIC = 1
export default {
  name: 'TopicCombine',
  mixins: [MethodsMixins, TopicCombineMixin],
  components: {
    TopicComponent
  },
   data () {
    return {
      // 是否当前题是否是组合题小题，并且为组合题的最后一小题，其中当前组合题也是最后一题
      IS_Last_Group_Last:false,
    }
  },
  methods: {
    /** 切换上一题 */
    handlePrevTopic:debounce(function (){
      this.IS_Last_Group_Last =false
      if (this.topicIndex === START_INDEX && this.subDataIndex === FIRST_SUB_TOPIC) {
        /** 学生作答切换上一题题为第一题 */
        this.$emit('prev-start', ...this.combineUserdata)
        return
      }
      this.handleToggleTopicBefore(() => {
        /** 若当前为组合题 则是切换小题 */
        if (this.isCurrentGroup && this.subDataIndex !== FIRST_SUB_TOPIC) {
          this.subDataIndex = Math.max(FIRST_SUB_TOPIC, this.subDataIndex - 1)
          return
        }
        this.topicIndex = Math.max(this.topicIndex - 1, START_INDEX)
        /** 若当前题为组合题则回到第一小题 */
        this.subDataIndex = FIRST_SUB_TOPIC
      })
    }),
    /** 切换下一题 */
    handleNextTopic:debounce(function (){
      let _this=this
      if (this.topicIndex === this.topicLen - 1 && !this.isCurrentGroup) {
        /** 学生作答切换下一题为最后一题  并且不是组合题*/
        this.$emit('next-last', ...this.combineUserdata)
        return
      }
      this.handleToggleTopicBefore(() => {
        /** 若当前为组合题 则是切换小题 */
        if (_this.isCurrentGroup) {
          let { children = [] } = _this.showCurrentTopic

          let subLen = children.length
          // 若为最后一小题 切换至下一题
          if (_this.subDataIndex === subLen) {
           //  若为最后一小题，父组合题也为最后一题，弹出答题卡提交页面
             if(this.topicIndex === this.topicLen - 1)
              {      
                /** 学生作答切换下一题为最后一题  并且是组合题*/
                this.$emit('next-last', ...this.combineUserdata)
                 /** 若当前题为组合题则回到第一小题 */
                // _this.subDataIndex = FIRST_SUB_TOPIC
                return
              }
              else{
                this.topicIndex = Math.min(_this.topicIndex + 1, _this.topicLen)
                /** 若当前题为组合题则回到第一小题 */
                _this.subDataIndex = FIRST_SUB_TOPIC
                return
              }
          }
          if(_this.subDataIndex === subLen-1 && this.topicIndex === this.topicLen - 1){// 当前题是否是组合题小题，并且为组合题的最后一小题，其中当前组合题也是最后一题
            this.IS_Last_Group_Last =true
          }
          /** 组合题内部切换小题 */
          _this.subDataIndex = Math.min(subLen, _this.subDataIndex + 1)
          return

        }
        _this.topicIndex = Math.min(_this.topicIndex + 1, _this.topicLen)
        /** 若当前题为组合题则回到第一小题 */
        _this.subDataIndex = FIRST_SUB_TOPIC
      })
    }),

    /** 切换题目前置事件
     * @param {Function} cb 回调函数
     */
    handleToggleTopicBefore (cb) {
      /** 回到顶部 */
      let topic = this.$refs.topic
      topic && (topic.$el.scrollTop = 0)
      /** 切换下一题的前置事件 */
      this.$emit('before', ...this.combineUserdata)
       /** 保存题目 */
      if(!this.isCurrentGroup){
        this.$emit('save', this.combineUserdata[0])
      }
      cb()
      /** 切换下一题的后置事件 */
      this.$emit('change-topic', ...this.combineUserdata)
    },
    choose (res) {
      // 保存题目
      this.$emit('save', res)
      // const { topic_type } = res
      // /** 当为单选题和判断题时自动切换下一题，若为最后一题则打开答题卡 */
      // if (topic_type == QUESTION_TYPE_SINGLE || topic_type == QUESTION_TYPE_JUDGE) {
      //   this.handleNextTopic()
      // }
    },
    // 组合题保存小题答案
    save(res){
      // 保存题目
      this.$emit('save', res)
      // const { topic_type } = res
      // /** 当为单选题和判断题时自动切换下一题，若为最后一题则打开答题卡 */
      // if (topic_type == QUESTION_TYPE_SINGLE || topic_type == QUESTION_TYPE_JUDGE) {
      //   this.handleNextTopic()
      // }
    },
    /** 切换题目 */
    handleChangeNextBtn (h) {
      let footer__prevcClass = (this.topicIndex === START_INDEX && this.subDataIndex === FIRST_SUB_TOPIC ? 'topic-combine-footer__prev not-click ':'topic-combine-footer__prev')
      let footer__nextClass
      if(this.isCurrentGroup) { // 如果当前题为组合题，并且为最后一题，组合题也是最后一小题 （解析状态下，下一题按钮置灰）(教师端非解析状态下也置灰)
        footer__nextClass=(this.topicIndex === this.topicLen - 1 && this.controlAnswered && this.IS_Last_Group_Last ? 'topic-combine-footer__next not-click':'topic-combine-footer__next')
      } else{// 如果当前题为非组合题，是最后一小题 （解析状态下，下一题按钮置灰）(教师端非解析状态下也置灰)
        footer__nextClass=(this.topicIndex === this.topicLen - 1 && this.controlAnswered ? 'topic-combine-footer__next not-click':'topic-combine-footer__next')
      }
      return (
        <div class="topic-combine-footer">
          <div
            class={footer__prevcClass}
            on-click={(e) => {
              this.handlePrevTopic()
            }}
          >
            上一题
          </div>
          <div
            class={footer__nextClass}
            on-click={(e) => {
              this.handleNextTopic()
            }}
          >
            下一题
          </div>
        </div>
      )
    }
  },
  render (h) {
    let { topicLen, topicIndex, $props, $slots, showCurrentTopic, subDataIndex, handlerFunction } = this
    let props = Object.assign({}, $props, {
      dataSubject: showCurrentTopic,
      subdataIndex: subDataIndex,
      dataRankSting: `${topicIndex + 1}/${topicLen}`
    })
    let bottomSlot = this.handleGetSlot(h, 'bottom')
    let statusSlot = this.handleGetSlot(h, 'status')
    let questionBottomSlot = this.handleGetSlot(h, 'questionBottom')
    return (
      <div class="topic-combine" key={topicIndex+subDataIndex}>
        <topic-component ref="topic" class="topic-combine-content" {...{ props, on: handlerFunction }}>
          {bottomSlot}
          {statusSlot}
          {questionBottomSlot}
        </topic-component>
        {this.handleChangeNextBtn(h)}
      </div>
    )
  }
}
</script>
<style lang="scss">
.topic-combine {
  height: 100%;
  &-content {
    height: calc(100% - 71px);
    overflow-x: hidden;
    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
      background-color: rgb(221, 228, 244);
    }
    &::-webkit-scrollbar {
      width: 6px;
      background-color: rgb(221, 228, 244);
    }
    &::-webkit-scrollbar-thumb {
      background-color: #c1c1c1;
      border-radius: 4px;
    }
  }
  .float-left {
    margin-bottom: 0;
  }
  &-footer {
    background-color: #ffffff;
    height: 71px;
    width: 100%;
    border-top: 1px solid #f3f3f3;
    padding-right: 48px;
    line-height: 70px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    @mixin btn-border($bor-color, $f-color) {
      border: 1px solid $bor-color;
      color: $f-color;
    }
    &__prev,
    &__next {
      width: 100px;
      height: 39px;
      line-height: 37px;
      opacity: 1;
      border-radius: 20px;
      text-align: center;
      font-size: 16px;
      cursor: pointer;
      user-select: none;
    }
    &__prev {
      margin-right: 24px;
      @include btn-border(#fa5825, #fa5825);
    }
    .not-click{
      pointer-events: none;
      background: #C0C4CC;
      color: #737f90;
      opacity: 0.4;
      border: 1px solid #737f90;
    }
    &__next {
      @include btn-border(#fa5825, #fa5825);
    }
  }
}
</style>
