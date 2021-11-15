<!-- 视频解析组件 -->
<template>
  <div class="web-video-analysis">
    <div v-if="videoTitle" class="web-analysis-title">
      <div class="title">
        <span class="label"></span>
        <span>视频解析</span>
      </div>
      <div class="tip">一目了然，文题剖析，理清思路、搞定难题</div>
    </div>
    <xt-video class="video" v-if="showVideo" :controlOptions="controlOptions" :dataSrc="videoSrc" :dataPoster="videoPoster"></xt-video>
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
        showVideo: true,
        controlOptions:{
          native: true, // 是否原生模式
        },
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
    },
    methods: {
    }
  }
</script>
<style lang='scss'>
.web-video-analysis {
  .web-analysis-title{
    margin-top: 26px;
  }
  .video {
      width: 346px;
      margin-top: 32px;
      border-radius: 16px;
  }
}
</style>
