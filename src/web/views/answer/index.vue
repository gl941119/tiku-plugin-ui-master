<template>
  <div>
    <div v-if="dataSource.length" class="across-web" :style="offsetHeightStyle" id="v-answer">
      <div class="left-topic">
        <topic-combine :dataSource="dataSource" :isStudent="isStudent" :paperPreview="paperPreview"  :controlShowBottom="controlShowBottom" :controlShowStatus="controlShowStatus" :controlAnswered="controlAnswered" :controlCurrentTopicIndex="controlCurrentTopicIndex" @change-topic="changeTopic" @next-last="nextLast" @save="handleSave">
          <template #questionBottom>
            <slot name="questionBottom"></slot>
          </template>
        </topic-combine>
        <div v-if="isStudent && !controlAnswered" class="second-time">
          <my-header :secondTime="secondTime" @over="handleOver">
            <div></div>
          </my-header>
        </div>
      </div>
      <div class="across-right">
        <!--答题卡-->
        <AnswerSheet :dataSource="topicData" @onClick="onClick"  :isShowModule="isShowModule"  :tipData="tipData" :isShowTip="isShowTip" :controlCurrentTopicIndex="controlCurrentTopicIndex" :isShowAccuracy="isShowAccuracy" class="answer-sheet scorll-bar" :style="{'height': (!controlAnswered ? 'calc(100% - 71px)':'100%')}">
          <div v-if="isStudent" slot="extra" class="web-extra">
            （共{{dataSourceLength}}题）
          </div>
          <div v-if="isStudent && !controlAnswered" slot="footer">
            <div class="answer-sheet-footer">
              <div @click="handleSubmit" class="btn">
                <span>提交</span>
              </div>
            </div>
          </div>
          <!-- 教师端插槽预留 -->
          <div v-if="!isStudent" slot="header">
            <slot name="header"></slot>
          </div>
        </AnswerSheet>
      </div>
      
      <my-dialog v-model="confirmVisible" class="webconfirm-box">
        <div class="confirm-content">{{ confirmText }}</div>
        <div class="handle-web">
          <div @click='()=>{ this.confirmVisible = false }'>检查一下</div>
          <div class="sub-line"></div>
          <div @click="submitAnswer">提交</div>
        </div>
      </my-dialog>
    </div>
    <div v-else class="across-web">
      <img class="scree_img" src="~@/assets/img/basics/web-screen.png" :style="offsetHeightStyle" alt="">
    </div>
  </div>
</template>

<script>
import '_scss/index.scss'
import TopicCombine from '@/components/web/topic-combine'
import myDialog from '@/components/dialog'
import MyHeader from '@/components/wap/components/header'
import AnswerSheet from '@/components/wap/components/answer-sheet'
import { flatTopic } from '@/libs/utils/handle-topic'
import { HAS_ANSWER } from '@/config/answer-config.js'
export default {
  components: {
    TopicCombine,
    AnswerSheet,
    MyHeader,
    myDialog
  },
  props: {
    /** 试卷题目数据 */
    topicData: {
      type: Array,
      default: () => []
    },
    // /** 试卷答题倒计时，以秒为单位，有则显示 */
    secondTime: {
      type: Number,
      default: 600
    },
    // 解析页传递过来的index
    topicIndex: {
      type: Number,
      default: 0
    },
    /** 是否显示底部解析 */
    controlShowBottom: {
      type: Boolean,
      default: true
    },
    /** 当前为解析还是作答 */
    controlAnswered: {
      type: Boolean,
      default: false
    },
    //是否显示正确率
    isShowAccuracy: {
      type: Boolean,
      default: false
    },
    // 是否是学生端传递
    isStudent: {
      type: Boolean,
      default: true
    },
     /** 是否显示答题卡顶部状态 */
    isShowModule: {
      type: Boolean,
      default: true
    },
    /** 是否是试卷配置中心预览状态 */
    paperPreview: {
      type: Boolean,
      default: false
    },
    /** 是否显示题目顶部状态 */
    controlShowStatus: {
      type: Boolean,
      default: false
    },
  },
  data () {
    return {
      /** 当前显示的题目索引 */
      controlCurrentTopicIndex: 0,
      confirmVisible: false,
      confirmText: '作业提交后不可更改哦',
      // 显示答题卡头部，默认状态0，1，2
      tipData: ['0', '1', '2'],
      isShowTip: true,
      innerHeight:608 // 默认容器高度
    }
  },
  watch: {
    topicIndex (value) {
      this.controlCurrentTopicIndex = value
    }
  },
  mounted() {
    //挂载浏览器高度获取方法
    const that = this
    this.innerHeight = window.innerHeight
    window.onresize = () => {
      return (() => {
        that.innerHeight = window.innerHeight
      })()
    }
  },
  computed: {
    dataSource () {
      return flatTopic(this.topicData)
    },
    offsetHeightStyle() {
      if(this.isStudent){
        return {
          height: this.innerHeight+'px'
        }
      } else{
        return {
          height: this.innerHeight-40+'px'
        }
      }
      
    },
    // 题目数量
    dataSourceLength () {
      return this.dataSource.length || 0
    }
  },
  methods: {
    handleSubmit () {
      if(this.paperPreview) {
        this.confirmVisible = false
        this.$emit('submit')
      } else{
        const flag = this.dataSource.every(v => v.answer_status == HAS_ANSWER)
        if (flag) {
          this.confirmText = '作业提交后不可更改哦'
        } else {
          this.confirmText = '本次作业还有题目未作答哦'
        }
        this.confirmVisible = true
        }
    },
    submitAnswer () {
      this.$emit('submit')
    },
    handleOver () {
      console.log('倒计时结束')
      this.$emit('countdown-over')
    },
    // 点击答题卡转跳?v.index
    onClick (v) {
      this.controlCurrentTopicIndex = v.index
      this.$emit('click-topic', v)
    },
    // 切换题型
    changeTopic (vdata, alldata, index) {
      this.$emit('change-topic', vdata, alldata)
      this.controlCurrentTopicIndex = index
    },
    //最后一题 提交
    nextLast () {
      console.log('提交')
      if(!this.controlAnswered) {
        this.handleSubmit()
      }
    },
    //保存题目数据
    handleSave (v) {
      // 已作答查看解析状态不保存题目
      if(this.controlAnswered){
        return
      }
      this.$emit('save', v)
    },
  }
}
</script>
<style  lang="scss" >
.across-web {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f3f4f5;
  width: 1090px;
  .left-topic {
    width: 848px;
    background: #ffffff;
    opacity: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
    .second-time {
      margin-top: -71px;
      width: 200px;
      .c-header {
        height: 72px;
        padding: 0 32px;
        border-bottom: 1px solid #ffffff !important;
        display: flex;
      }
    }
  }
  > .across-right {
    margin-left: 16px;
    display: flex;
    width: 226px;
    position: relative;
    height: 100%;
    .answer-sheet {
      width: 376px;
      height: calc(100% - 71px);
      background: #ffffff;
      overflow: auto;
      overflow-x: hidden;
      &-footer {
        width: 226px;
        height: 72px;
        background: #ffffff;
        opacity: 1;
        display: flex;
        border-top: 1px solid #e2c8c8;
        justify-content: center;
        align-items: center;
        position: absolute;
        bottom: -1px;
        margin-left: -27px;
        .btn {
          width: 180px;
          height: 39px;
          background: #fa5825;
          opacity: 1;
          border-radius: 20px;
          display: flex;
          justify-content: center;
          span {
            font-size: 16px;
            font-family: PingFang SC;
            font-weight: 500;
            line-height: 39px;
            color: #ffffff;
          }
        }
      }
      .web-extra {
        font-family: PingFang SC;
        font-weight: 400;
        line-height: 24px;
        font-size: 14px;
        color: #909399;
      }
    }
  }
  .webconfirm-box {
    .c-dialog__content {
      width: 420px;
      height: 159px;
      font-size: 18px;
      font-weight: 400;
      color: #ffffff;
      background: #ffffff;
      text-align: center;
      border-radius: 8px;
    }
    .confirm-content {
      color: #303133;
      margin-top: 40px;
    }
    .handle-web {
      display: flex;
      font-size: 18px;
      > div {
        width: 210px;
        height: 50px;
        line-height: 50px;
        font-weight: 600;
        margin-top: 40px;
        border-top: 1px solid #f3f3f3 !important;
        background-color: #ffffff !important;
        color: #fa5825;
        font-size: 16px;
        &:first-child {
          color: #909399;
        }
      }
      .sub-line {
        margin-top: 48px;
        width: 0;
        height: 38px;
        border: 1px solid #f3f3f3;
      }
    }
  }
  .scree_img{
    width: 100%;
    height: 100%;
  }
}
// 滚动条美化
.scorll-bar::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
  background-color: #ffffff;
}

.scorll-bar::-webkit-scrollbar {
  width: 6px;
  background-color: #ffffff;
}

.scorll-bar::-webkit-scrollbar-thumb {
  background-color: #c1c1c1;
  border-radius: 4px;
}
</style>
