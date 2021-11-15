<template>
  <div id="v-answer">
   <my-header></my-header>
   <topic-handle :dataSource="dataSource" :controlAnswered="controlAnswered"
                 :controlCurrentTopicIndex="controlCurrentTopicIndex"
                 :controlShowStatus="controlShowStatus"
                 :controlShowTeacherAnswer="controlShowTeacherAnswer"
                 :controlShowGroupStatus="controlShowGroupStatus"
                 :controlStatus="controlStatus"
              :controlShowBottom="controlShowBottom"
        ></topic-handle>
    <!--    横屏-->
        <!-- <Across v-bind="$data"></Across> -->

  </div>
</template>

<script>
  import allSourceMock from '@/mock/all-source-mock'
  import newAllSourceMock from '@/mock/new-source-mock'
  import Across from '../../../components/wap/across'
  // console.log('allSourceMock', allSourceMock)
  import '_scss/index.scss'
  import TopicHandle from '@/components/wap/topic-handle'
  import MyHeader from '@/components/wap/components/header'
  import {REVIEW_NO_ANSWER,REVIEW_TO_READ, REVIEW_RIGHT_ANSWER,REVIEW_RIGHT_PART_ANSWER, REVIEW_ERROR_ANSWER, REVIEW_NO_REVIEW} from '@/config/answer-config'

  export default {
    components: {
      TopicHandle, Across, MyHeader
    },
    data() {
      return {
        dataSource: newAllSourceMock,
        controlShowBottom: true,
        controlAnswered: true,
        controlShowStatus:false,
        // 显示组合题顶部状态栏
        controlShowGroupStatus:true,
        //是否显示老师批阅
        controlShowTeacherAnswer:true,
        controlCurrentTopicIndex: 0,
        // 答题状态 （线下题） 分为0 1 2 3 4 5   6种状态
        controlStatus:'5'
      }
    },
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
