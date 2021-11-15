<template>
  <div id="v-answer">
    <topic-handle :dataSource="dataSource" :controlAnswered="controlAnswered"
                  :controlCurrentTopicIndex="controlCurrentTopicIndex"
                  :controlShowStatus="controlShowStatus"
                  :controlShowTeacherAnswer="controlShowTeacherAnswer"
                  :controlShowGroupStatus="controlShowGroupStatus"
                  :controlStatus="controlStatus"
                  :controlShowBottom="controlShowBottom"
                  @changeStatus="changeStatus"
                   @selfAnswer="selfAnswer"
                  @answerSubmit="answerSubmit"></topic-handle>
  </div>
</template>

<script>
  import offlineSourceMock from '@/mock/new-offline-source-mock'
  import '_scss/index.scss'
  import TopicHandle from '@/components/wap/topic-handle'
  import {REVIEW_NO_ANSWER,REVIEW_TO_READ, REVIEW_RIGHT_ANSWER,REVIEW_RIGHT_PART_ANSWER, REVIEW_ERROR_ANSWER, REVIEW_NO_REVIEW} from '@/config/answer-config'

  export default {
    components: {
      TopicHandle
    },
    data() {
      return {
        dataSource: offlineSourceMock,
        controlShowBottom: false,
        controlAnswered: true,
        controlShowStatus:false,
        // 显示组合题顶部状态栏
        controlShowGroupStatus:true,
        //是否显示老师批阅
        controlShowTeacherAnswer:true,
        controlCurrentTopicIndex: 0,
        // 答题状态 （线下题） 分为0 1 2 3 4 5   6种状态
        controlStatus:'0',
      }
    },
    methods: {
      changeStatus (status) {
        this.controlStatus = status.Status
      },
      answerSubmit(answerList){
        // 提交之后状态变为带批阅状态
        this.controlStatus = '5'
        console.log('提交')
      },
      selfAnswer(val){
        console.log(val)
      }
    }
  }
</script>
<style lang="scss">
#v-answer {
  height: 100%;
  .swiper-container {
    height: calc(100% - 72px);
  }
}
</style>
