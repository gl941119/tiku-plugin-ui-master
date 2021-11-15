<template>
<div style="display: flex;align-items: center;justify-content: center;position: absolute;top: 100px">
  <xtVideo class="test"  ref="answerVideo" @fullscreenchange="fullscreenchange" dataSrc="http://sp.jzsc.net/upload/video/2020-08-24/f84be427-bd7d-4f60-9b4b-e3f7e362685d.mp4" />
</div>
</template>

<script>
  import xtVideo from '../../../components/wap/components/xt-video/xt-video'
  export default {
    name: 'gl',
    components:{xtVideo},
    methods:{
      fullscreenchange(v){
        this.isShowVideo = v
      }
    }
  }
</script>

<style scoped>
  .test{
    width: 400px;
    height: 400px;
  }

</style>
