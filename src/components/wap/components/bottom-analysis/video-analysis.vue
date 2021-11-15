<!-- 视频解析组件 -->
<template>
  <div class="wap-video-analysis">
    <div v-if="videoTitle"  class="wap-analysis-title">
      <div class="title">
        <span class="label"></span>
        <span>视频解析</span>
        <span class="tip">一目了然，文题剖析，理清思路，搞定难题</span>
      </div>
    </div>
    <xt-video class="video" v-if="showVideo" :dataSrc="videoSrc" :dataPoster="videoPoster"></xt-video>
  </div>
</template>

<script>
  import XtVideo from '@/components/wap/components/xt-video/xt-video'
  import videoPoster from '@/assets/img/basics/video-poster.png'

  export default {
    components: {XtVideo},
    data() {
      return {
        videoPoster,
        showVideo: true
      }
    },
    props: {
      videoSrc: {
        type: String,
        default: ''
      },
      videoTitle:{
        type:Boolean,
        default:true
      }
    },
    watch:{
      videoSrc:{
        handler(c,o){
          this.showVideo = false
          if(c){
            this.$nextTick(()=>{
              this.showVideo = true
            })
          }
        },
        immediate: true
      }
    }
  }
</script>
<style lang='scss'>
  .wap-video-analysis {
    .video {
      width: 100%;
      margin-top: 32px;
      /*border-radius: 16px;*/
    }
  }
</style>
