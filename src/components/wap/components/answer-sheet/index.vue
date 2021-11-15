<template>
  <!--    答题卡-->
  <div :class="['answer-sheet',_wrapClass]">
    <!--    头部-->
    <slot name="header">
      <div class="header" v-if="isShowHeader">
        <div class="header-title">
          答题卡
          <slot name="extra">
            <!--          更多slot-->
            <div class="extra" v-if="showExtra">
              <span>查看解析</span>
              <div class="extra-icon"></div>
            </div>
          </slot>
        </div>
        <div class="header-tip" v-if="_tipData.length">
          <div class="header-tip--item" v-for="(item,index) in _tipData" :key="index">
            <CircleTip class="CircleTip" v-bind={...item}></CircleTip>
            <span>{{item.name}}</span>
          </div>
        </div>
      </div>
    </slot>
    <!--    题目-->
    <div class="main" :style="{maxHeight: maxHeight}">
      <div class="topic" :style="{marginTop:item.module? '':'0'}" v-for="(item,index) in _options" :key="index">
        <div class="topic-name" v-if="item.module">{{index+1}}. {{item.module}}</div>
        <div class="topic-content">
          <div class="topic-content--item" v-for="(v,n) in item.exam_paper_topic" :key="n">
            <CircleTip :type="v.answer_status" @click.native="onClick(v)" class="big-circle-tip"
                       :class="{ 'selected-circle':v.index === controlCurrentTopicIndex}">
              <div class="accuracy">
                <div class="accuracy-top">{{v.index+1}}</div>
                <div class="accuracy-bottom" v-if="isShowAccuracy">{{v.answer_right_student_rate+'%'}}</div>
              </div>

            </CircleTip>
          </div>
        </div>
      </div>
    </div>

    <!--    底部slot-->
    <slot name="footer">

    </slot>

  </div>

</template>

<script>
  import { OS } from '@/config/common.js'
  import CircleTip from './circle-tip'
  import {CONTROL_TYPE} from '@/config/answer-config'
  import {flatTopic} from '@/libs/utils/handle-topic'
  // import MOCK from '@/mock/answer-sheet'


  const SCREEN_STATUS = new Map([
    ['0', {wrapClass: 'answer-sheet-vertical'}],
    ['90', {wrapClass: 'answer-sheet-across'}],
    ['pc', {wrapClass: 'answer-sheet-pc'}],
  ])

  export default {
    props: {
      // 数据
      dataSource: {
        type: Array
      },
      // 题目部分最大高度,默认536
      maxHeight: {
        type: String
      },
      //屏幕状态  vertical 竖  across 横 必选
      // rotate: {
      //   type: String,
      //   default: 'vertical'
      // },
      //组件状态  0 答题卡  1 解析 必选
      status: {
        type: Number,
        default: 0,
        require: true
      },
      controlCurrentTopicIndex: {
        type: Number,
        default: -1
      },
      // 外部控制屏幕角度，直接覆盖内部自动判断
      controlOrientation:{
        type: String
      },
      //是否显示查看解析
      showExtra: {
        type: Boolean,
        default: false
      },
      tipData: {
        type: Array,
        default: () => []
      },
      //是否显示名字
      isShowModule: {
        type: Boolean,
        default: true
      },
      //是否显示头部
      isShowHeader: {
        type: Boolean,
        default: true
      },
      //是否显示正确率  pc端有用
      isShowAccuracy: {
        type: Boolean,
        default: false
      },
      // //是否显示tip
      // isShowTip:{
      //   type: Boolean,
      //   default: false
      // }
    },
    name: 'answer-sheet',
    components: {CircleTip},
    data() {
      return {
        CONTROL_TYPE,
        selectId: 0,//选中项
      }
    },
    computed: {
      //屏幕角度  0 or 90 or pc
      orientation() {
        if (OS.isPc) {
          return this.controlOrientation || 'pc'
        } else {
          return this.controlOrientation || String(window.orientation)
        }

      },
      _options() {
        // const a = this.dataSource
        // console.log(MOCK.data.exam_paper_topic_group)
        // const a =MOCK.data.exam_paper_topic_group
        // if (!a) return
        // a.forEach(v => {
        //   v.exam_paper_topic.forEach((val, index) => {
        //
        //     val.index = index + 1
        //     // val.answer_right_student_rate = '99%'
        //   })
        // })
        return this.isShowModule ? this.dataSource : [{exam_paper_topic: flatTopic(this.dataSource)}]
      },
      // 是否显示tip
      // _showTip() {
      //   // 竖屏答题卡or横屏  不显示tip
      //   if(this.isShowTip !== 'undefined'){
      //     return  this.isShowTip
      //   }else {
      //     // return (this.orientation === 0 && this.status === 0) || this.orientation === 90
      //   }
      //
      //   // return false
      // },
      // tip数据
      _tipData() {
        return this.tipData.map(v => CONTROL_TYPE.get(v))
      },
      _wrapClass() {
        return SCREEN_STATUS.get(this.orientation).wrapClass
      },

    },
    methods: {
      onClick(v) {
        this.$emit('onClick', v)
        this.$emit('changeTopic',v.index)
      },
      // handleSubmit() {
      //   this.$emit('submit')
      // }
    }
  }
</script>


<style lang="scss">
  @import '@/assets/scss/var.scss';

  /*公共部分*/
  .answer-sheet {
    /*pc选中项样式*/

    .selected-circle {
      border: 1px solid #2B2F36;
    }

    .accuracy {
      &-top {
        text-align: center;
      }

      &-bottom {
        font-size: 12px;
        color: #303133;
        /*margin-top: 4px;*/
        text-align: center;
      }
    }
  }

  /*横屏*/
  .answer-sheet-across {
    /*padding: 0 32px;*/
    /*min-width: 211px;*/
    /*border: 1px solid red;*/
    /*position: relative;*/
    display: flex;
    flex-direction: column;
    justify-content: center;

    .header {
      overflow: hidden;


      &-title {
        margin: 32px 0;
        font-weight: 500;
        height: 40px;
        font-size: 28px;
        line-height: 40px;
        color: $--wapcolor-answer-main;

        display: flex;
        /*暂无extra*/
        /*.extra {}*/
      }

      /*暂无tip*/
      /*&-tip {}*/
    }

    .main {
      /*max-height: 492px;*/
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;

      .topic {
        /*padding: 18px 0;*/

        &-name {
          color: $--wapcolor-answer-main;
          height: 40px;
          font-size: 28px;
          line-height: 40px;
        }

        &-content {
          /*padding-top: ;*/
          padding: 32px 16px 0;
          margin-right: -48px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          flex-wrap: wrap;

          &--item {

            .big-circle-tip {
              width: 72px;
              height: 72px;
            }
          }

          &--item {
            margin-right: 48px;
            margin-bottom: 32px;
            font-size: 24px;
          }
        }

      }
    }


  }


  /*竖屏*/
  .answer-sheet-vertical {
    /*padding: 0 32px;*/

    .header {
      overflow: hidden;
      margin: 0 32px;

      &-title {
        font-size: 36px;
        font-weight: bold;
        color: $--wapcolor-answer-main;
        margin: 40px auto;
        line-height: 50px;
        text-align: center;
        position: relative;

        .extra {
          position: absolute;
          top: 0;
          right: 0;
          font-size: 28px;
          font-weight: 400;
          color: #9FA3AA;
          display: flex;
          align-items: center;

          &-icon {
            margin-left: 16px;
            width: 12px;
            height: 20px;
            background: url("../../../../assets/img/answer-sheet/more.png") no-repeat;
          }
        }
      }

      &-tip {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        margin-bottom: 32px;
        line-height: 34px;

        &--item {
          font-size: 24px;
          font-weight: 400;
          color: #9FA3AA;
          display: flex;
          align-items: center;
          margin-right: 64px;

          > span {
            margin-left: 16px;
          }

          .CircleTip {
            width: 24px;
            height: 24px;
          }
        }

      }
    }

    .main {
      max-height: 536px;
      overflow-y: auto;
      overflow-x: hidden;
      margin: 0 32px 0 32px;
    }

    .topic {
      /*padding: 32px 0;*/
      margin-top: 32px;

      &-name {
        height: 40px;
        font-size: 28px;
        font-weight: 500;
        color: $--wapcolor-answer-main;
        line-height: 40px;
      }

      &-content {
        overflow: hidden;
        padding: 32px 0 0 0;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
        /*margin-bottom: ;*/
        &--item {
          font-size: 32px;
          margin: 0 32px 48px 32px;
        }

      }

    }
  }


  /*pc*/
  .answer-sheet-pc {
    /*width: 226px;*/
    padding: 24px 0 24px 27px;

    .header {
      &-title {


        height: 25px;
        font-size: 18px;
        font-weight: bold;
        line-height: 25px;
        color: #000000;

        display: flex;
      }

      &-tip {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;

        margin-top: 12px;

        &--item:first-child {
          margin: 0;
        }

        &--item {

          height: 17px;
          line-height: 17px;
          display: flex;
          align-items: center;
          margin-left: 24px;

          > span {
            margin-left: 2px;


            font-size: 12px;

            color: #909399;
          }

          .CircleTip {
            width: 8px;
            height: 8px;
          }
        }
      }
    }

    .main {
      /*margin-top: 20px;*/
      overflow-y: auto;
      overflow-x: hidden;
    }

    .topic {
      margin-top: 20px;

      &-name {
        height: 20px;
        font-size: 14px;
        font-weight: bold;
        line-height: 20px;
        color: #303133;
      }

      &-content {
        margin-top: 16px;
        margin-right: -32px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;

        &--item {
          margin-right: 32px;
          margin-bottom: 16px;

          > .big-circle-tip {
            width: 38px;
            height: 38px;
            font-size: 16px;
            font-weight: 500;
            cursor: default;

          }
        }

      }
    }
  }

</style>
