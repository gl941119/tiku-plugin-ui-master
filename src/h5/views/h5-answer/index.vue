<!-- h5答题 -->
<template>
  <div>
    <across v-if="isAcross" v-bind="$attrs" v-on="$listeners" :showSheet="false"></across>
    <vertical v-else v-bind="$attrs" v-on="$listeners"></vertical>
  </div>
</template>
<script>
import Vertical from '@/components/wap/vertical'
import Across from '@/components/wap/across'
/**
 * 事件
 *submit 答题卡提交
 *
 * props
 * topicData 数据
 *  答题状态 （线下题） 分为0 1 2 3 4 5   6种状态
 controlStatus:'5',
 是否属于线下非自主作答
 isOffline:true
 *
 * **/
export default {
  components: {
    Across,
    Vertical
  },
  props:{
    isAcross:{
      type:Boolean,
      default:false
    }
  },
  data () {
    return {}
  },
  computed: {
    /** 禁止横竖屏自动切换！！！！ */
  },
  created () {
  },
  beforeDestroy () {

  },
  methods: {
  },
}
</script>
<style lang='scss'>
</style>
