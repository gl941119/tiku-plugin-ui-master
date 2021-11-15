<template>
<div>
  <div @click="onClose" class="big-img stop-swiping" :class="{hideo:!show,fadeIn:show}">
    <div class="page"><span>{{currIndex}}/{{imgList.length||0}}</span></div>
    <div class="big-img-content">
      <swiper :options="swiperOption" ref="MyImgSwiper">
        <swiper-slide v-for="(item,index) in imgList" :key="index">
          <div class="swiper-zoom-container">
            <img class="slide-img" v-if='isAnnotation' :src=item.image_url>
            <img class="slide-img" v-else :src=item>
            <!-- <img class="slide-img" src='./../../../assets/img/offline/test.jpg'> -->
          </div>
        </swiper-slide>
      </swiper>
    </div>
    <div v-if="isAnnotation" class="foot">
      <div v-if="!showAnnotation && imgListCotent[currIndex-1].length" @click.prevent="chooseAnnotation" class="btn">
        <span>批注({{imgListCotent[currIndex-1].length}})</span>
      </div>
      <div v-if="showAnnotation" class="annotation">
        <div class="top">
          <span>批注{{imgListCotent[currIndex-1].length}}</span>
          <img @click.prevent="chooseAnnotation" src='./../../../assets/img/offline/annotation_close.png'>
        </div>
        <div class="center">
          <div v-for="(itemList,index) in imgListCotent[currIndex-1]" :key="index" class="text">
            <div class="text-left"><span>{{itemList.serial_number}}</span></div>
            <div class="text-right"><span>{{itemList.content}}</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
   <!-- 新手指引图片 -->
  <div v-if='!isShowNovice' class="novice">
    <img src='./../../../assets/img/offline/guide.png' alt="">
    <div class="text">
      <span>左右滑动可以切换图片</span>
    </div>
    <div class="foot" @click="novice">
    <span>我知道了</span>
    </div>
  </div>
</div>
</template>
<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/swiper.min.css'
import 'swiper/swiper-bundle.min.css'
import store from '@/store'
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    // 是否显示底部解析按钮
    isAnnotation: {
      type: Boolean,
      default: true,
    },
    // 图片信息列表
    imgList: {
      type: Array,
      default: () => [],
    },
    //  当前图片在列表中的位置
    currIndex: {
      type: Number,
      default: 1,
    },
  },
  data () {
    return {
      swiperOption: {
        zoom: true,
        initialSlide: this.currIndex - 1,
        on: {
          slideChange: (e) => {
            this.changeCurrIndex(e)
          },
        },
      },
      timeout: null,
      now: 0, //当前时间，
      delta: 0,// 两次触发事件时间差
      showAnnotation: false,
      imgListCotent:[],// 批注数据对象
      isShowNovice:false // 是否已经显示新手指引
    }
  },
  created () {
    this.imgListCotent=this.imgList.map(v=>{
      return v.list
    })
  },
  mounted(){
    this.isShowNovice=store.getters.getShowNovice
  },
  methods: {
    onClose () {
      this.delta = Date.now() - this.now//计算两次点击时间差
      this.now = Date.now()
      if (this.delta > 0 && this.delta <= 250) {
        clearTimeout(this.timeout)//停止单击定时事件  //双击事件
      } else {
        this.timeout = setTimeout(() => {
          // //延迟单击事件触发内容 
          this.$emit('update:show', false)  
          this.showAnnotation=false                               
        }, 300)
      }
    },
    novice() {
      this.$store.commit('setShowNovice', true)
      this.isShowNovice=true
    },
    // 切换图片
    changeCurrIndex (e) {
      this.$emit('changeCurrIndex', e.activeIndex + 1)
    },
    chooseAnnotation (e) {
      e.stopPropagation()
      this.showAnnotation = !this.showAnnotation
    },
  },
}
</script>
<style lang="scss">
.big-img {
  z-index: 1000;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  position: fixed;
  //   left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .swiper-container {
    height: 100% !important;
  }
  .icon-close {
    position: fixed;
    left: 15px;
    top: 30px;
    padding: 10px;
    width: 42px;
    height: 42px;
    img {
      width: 22px;
      height: 22px;
    }
  }
  .big-img-content {
    width: 100%;
    overflow: hidden;
    height: 100%;
    position: relative;
  }
  .swiper-zoom-container {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .slide-img {
      width: 100%;
    }
  }
  .page {
    width: 100%;
    font-size: 28px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    line-height: 40px;
    text-align: right;
    position: absolute;
    right: 60px;
    top: 40px;
    z-index: 999;
    span{
      border-radius: 20px;
      padding: 0 20px;
      background: rgba(0, 0, 0, 0.3);
    }
  }
  .foot {
    position: absolute;
    display: flex;
    justify-content: center;
    width: 100%;
    z-index: 999;
    bottom: 108px;
    .btn {
      text-align: center;
      width: 244px;
      height: 80px;
      background: #ffd700;
      border-radius: 40px;
      span {
        font-size: 32px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #2b2f36;
        line-height: 80px;
      }
    }
  }
  .annotation {
    width: 750px;
    height: 1014px;
    background: #ffffff;
    border-radius: 24px 24px 0px 0px;
    position: absolute;
    top: -900px;
    .top {
      height: 108px;
      background: #ffffff;
      border-radius: 24px 24px 4px 4px;
      padding: 32px;
      span {
        font-size: 32px;
        font-family: PingFang-SC-Bold, PingFang-SC;
        font-weight: bold;
        color: #303133;
        line-height: 44px;
        position: relative;
      }
      img {
        position: absolute;
        width: 48px;
        height: 48px;
        margin-top: -4px;
        right: 32px;
      }
    }
    .center {
      overflow: auto;
      flex-direction: column;
      display: flex;
      align-items: center;
      height: 850px;
      touch-action: auto !important;
      .text {
        padding: 32px;
        width: 686px;
        background: #fff9f2;
        border-radius: 16px;
        display: flex;
        margin-top: 24px;
      }
      .text-left {
        border-radius: 50%;
        background: #ff8600;
        border: 2px solid #ffffff;
        padding-left: 15px;
        padding-right: 15px;
        height: 50px;
        span {
          font-size: 28px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #ffffff;
          line-height: 40px;
        }
      }
      .text-right {
        margin-left: 24px;
        height: 100%;
        span {
          font-size: 32px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #2b2f36;
          line-height: 48px;
        }
      }
    }
  }
}
 .novice {
    z-index: 10001;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: #000000;
    opacity: 0.7;
    align-items: center;
    img {
      width: 600px;
      height: 80px;
    }
    .text{
      margin-top: 60px;
      width: 320px;
      height: 44px;
      font-size: 32px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #FFFFFF;
      line-height: 44px;
    }
    .foot{
      margin-top: 80px;
      width: 248px;
      height: 80px;
      background: #FFD700;
      border-radius: 40px;
      text-align: center;
      span{
        width: 128px;
        font-size: 32px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #2B2F36;
        line-height: 80px;
      }
    }
  }
.hideo {
  display: none !important;
}
.fadeIn {
  -webkit-animation: fadeInDown 0.2s forwards;
  animation: fadeInDown 0.2s forwards;
}

@keyframes fadeInDown {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-webkit-keyframes fadeInDown {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>