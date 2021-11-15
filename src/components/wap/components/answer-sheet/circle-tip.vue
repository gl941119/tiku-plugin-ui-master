<template>
    <div class="circle-wrap" :class="_wrapClass" >
<!--      右上角徽标slot-->
      <slot  name="badge">
        <div  class="circle-badge" :class="_badgeClass"></div>
      </slot>
<!--      默认slot-->
      <slot class="slot"></slot>
    </div>
</template>

<script>
import { CONTROL_TYPE, REVIEW_NO_ANSWER } from '@/config/answer-config'
export default {
  name: 'CircleTip',
  props: {
    // 外层容器类名
    wrapClass: {
      type: String
    },
    type:{
      type: [String, Number],
      default: REVIEW_NO_ANSWER
    }
  },
  computed: {
    //组件默认数据
    defaultObj(){
      const type = String(this.type)
      return CONTROL_TYPE.get(type) ? CONTROL_TYPE.get(type) :{}
    },
    //外层容器类名
    _wrapClass () {
      return [this.wrapClass ? this.wrapClass : this.defaultObj.wrapClass]
    },
    //右上角徽标类名
    _badgeClass (){
      return this.defaultObj.badgeClass
    }
  },
  data () {
    return {
      CONTROL_TYPE
    }
  },
  mounted () {

  }

}
</script>

<style lang="scss">
  @import '@/assets/scss/var.scss';
.circle-wrap{
  width: 72px;
  height: 72px;
  border-radius: 250px;


  display: flex;
  justify-content: center;
  align-items: center;


  position: relative;

  > .slot{
    color: $--wapcolor-answer-main;
    font-size: 32px;
    font-weight: 600;

  }

}
  /*未作答*/
  .circle-notAnswer{
    background: #ffffff;
    border: 1px solid #C2C7D1;
  }
  /*已作答*/
  .circle-hasAnswer{
    background: #FFD700;
  }
  /*未全部作答*/
  .circle-notAllAnswer{
    background: linear-gradient(to bottom, #FFD700 50%, #ffffff 50%);
    border: 1px solid #C2C7D1;
  }
  /*正确*/
  .circle-correct{
    background: #18CB7F;
    color: #FFFFFF;
  }
  /*错误*/
  .circle-wrong{
    background: #FF4D07;
    color: #FFFFFF;
  }
  /*待改错*/
  .circle-readyWrong{
    background: #FF4D07;
    color: #FFFFFF;
  }
  /*部分正确*/
  .circle-portionCorrect{
    background-image: linear-gradient(to bottom, #18CB7F 50%, #FF4D07 50%);
    color: #FFFFFF;
  }
  /*部分正确待改错*/
  .circle-portionCorrect-readyWrong{
    background-image: linear-gradient(to bottom, #18CB7F 50%, #FF4D07 50%);
    color: #FFFFFF;
  }
  /*待批改*/
  .circle-readyCorrect{
    background: #FFD700;
    /*color: #FFFFFF;*/
  }

  /*右上角徽标*/
  .circle-badge{
    position: absolute;
    width: 76px;
    height: 32px;
    top:-16px;
    left: 40px;

  }
  @mixin circle-badge-mixin {
    background-repeat:no-repeat;
    background-size: 100% 100%;
    border-left: 1px solid white;
    border-bottom: 1px solid white;
  }

  .circle-badge-readyCorrect{
    background-image: url("../../../../assets/img/answer-sheet/readyCorrect.png")  ;
    @include circle-badge-mixin;

  }
  .circle-badge-portionCorrect-readyWrong{
    background-image: url("../../../../assets/img/answer-sheet/portionCorrect-readyWrong.png") ;
    @include circle-badge-mixin;

  }
  .circle-badge-readyWrong{
    background-image: url("../../../../assets/img/answer-sheet/portionCorrect-readyWrong.png") ;
    @include circle-badge-mixin;
  }



</style>
