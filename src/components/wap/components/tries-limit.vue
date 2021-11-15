  <!-- 状态提示信息 -->
<template>
  <div class="waptries">
    <div v-for="(item,index) in dataSubmitLenth" @click="chooseItem(index)" :key= "index"  :class="index===chooseIndex? 'text choose':'text'" >
      <span  v-if="index===dataSubmitLenth-1">首次</span>
      <span  v-else>第{{dataSubmitLenth-index}}次</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    // 作答历史次数
    dataSubmitLenth:{
      type: Number,
      default:0
    }
  },
  data(){
    return{
      chooseIndex:0  // 当前选中次数
     }
  },
  methods:{
    chooseItem(index){
      this.chooseIndex=index
      this.$emit('chooseIndex',index)
    }
  },
}
</script>
<style lang="scss">
.waptries {
    // width: 750px;
    // height: 96px;
    background: #FFFFFF;
    display: flex;
    flex-wrap: wrap;
    .text{   
        font-size: 28px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #6A707C;
        line-height: 96px;
        margin-left: 56px;
    }
    .choose{ 
        font-size: 36px;
        font-weight: 500;
        color: #2B2F36;
        line-height: 96px;
    }
 }
</style>
