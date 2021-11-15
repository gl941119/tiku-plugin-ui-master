<template>
  <div class="question-common" :class="styleSetClass">
    <div v-if="isLoald">
      <img class="offline-isloaling" src='./../../../assets/img/offline/offline_screen.png' alt="">
    </div>
    <div>
      <div :class="footIsShowClass">
        <!-- 题目内容 题干 -->
        <!-- 提示信息 -->
        <div v-if="isOffline">
          <tries-limit v-if="controlLimit && !errorAnswer && !rightAnswerPart" @chooseIndex="chooseIndex" :dataSubmitLenth="dataSubject.details.submit.length"> </tries-limit>
          <!-- 只有待批阅5状态才会显示重新修改导航条 -->
          <slot name="status">
            <!-- v-if="controlShowStatus" -->
            <div v-if="ToRead && isSchool" class="status">
              <span>请仔细检查答题结果</span>
              <div @click="rePublish" class="status-right">
                <span>重新修改</span>
              </div>
            </div>
            <!-- // 2或者3  转跳下的0状态才展示 -->
            <div v-if="beforeAnswer && showWrongStatus " class="error-status">
              <div class="error-status-left">
                <span>待改错</span>
              </div>
              <span>请认真答题，修正后重新提交</span>
            </div>
          </slot>
          <!-- 状态栏下面作答信息，用于 待改错批阅中和批阅完成 -->
          <div class="my-status">
            <div class="line"> </div>
            <div>
              <span>{{myStatustext}}</span>
            </div>
          </div>
        </div>
        <!-- 是否显示题目标题 -->
        <!-- <subject-title v-if="controlShowTitle" :dataRankSting="dataRankSting" :controlShowStyle="controlShowStyle" :controlShowScore="controlShowScore" :dataSubInnerIndexRight="dataSubInnerIndexRight" :controlIsGroup="controlIsGroup" :controlAutoPlay="controlAutoPlay" :dataSubject="dataSubject">
        </subject-title> -->
        <div class="wapoffline-top">
          <div ref="control" v-if="!isShowMore" class="wapoffline-topic__shade">
            <div @click="moreTopic" class="wapoffline-topic__control">
              <span>展开</span>
              <div class="wapoffline-topic__more"></div>
            </div>
          </div>
          <div ref="content" class="wapoffline-body">
            <div v-html="dataSubject.content">
            </div>
            <!-- 题干音频 -->
            <div v-if="dataSubject.body_audio">
              <audio-analysis :audioSrc="dataSubject.body_audio" :audioTitle="false" />
            </div>
            <!-- 题干视频 -->
            <div v-if="dataSubject.body_video" style="margin-top: 32px;">
              <video-analysis :videoSrc="dataSubject.body_video" :videoTitle="false" />
            </div>
             <!-- 线下做答 顶部状态，非作答状态显示 -->
            <div v-if="isOffline">
              <!-- 题目内容 答题部分 -->
              <div v-if="!beforeAnswer" class="wapoffline-center wapoffline-center_top">
                <div class="wapoffline-answer_top">
                  <!-- 文字 -->
                  <textarea v-model="contentText" class="text" maxlength="800" :disabled="!this.beforeAnswer" placeholder="请认真完成课后练习哦～">
                    </textarea>
                  <!-- 语音 -->
                  <div v-for="(item) in isAddAudioUrl" style="width:100%;display: flex;position: relative;" :key="item">
                    <top-audio style="flex: 1; backgrand:#ffffff"  :audio-src="item" @clickAudio="clickAudio" :autoPlay="false" />
                  </div>
                  <!-- 图片 -->
                  <div class="studentAnswer_audio">
                    <div class="img-item" v-for="(item,index) in isAddImgUrl" :key="item">
                      <img :src="item" @click="showPhotos(isAddImgUrl,index,false)" />
                    </div>
                  </div>
                  <!-- 视频 -->
                  <div class="studentAnswer_audio " v-for="(item) in isAddVideoUrl" :key="item.url" style="margin-top: 0px;padding: 0px; backgrand:#ffffff">
                    <div class="img-item" v-if="!isSchool">
                      <img src='./../../../assets/img/offline/play.png' class="answer_paly" @click="showAddVideo()">
                      <img :src="item.coverUrl" @click="showAddVideo()" />
                      <xtVideo   style="margin-top:0px" v-show="isShowVideo"   ref="answerVideo" @fullscreenchange="fullscreenchange" :dataSrc="item.url" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
      </div>
          <!-- <div v-if="isShowMore" ref="controlup" class="wapoffline-topic__shadeup"> -->
          <!-- <div @click="upTopic" class="wapoffline-topic__controlup">
              <span>收起</span>
              <div class="wapoffline-topic__moreup"></div> -->
          <!-- </div> -->
          <!-- </div> -->
        </div>
        <!-- 线下做答 作答状态显示 -->
        <div v-if="isOffline">
          <!-- 题目内容 答题部分 -->
          <div v-if="beforeAnswer" class="wapoffline-center">
            <div class="wapoffline-answer">
              <!-- 文字 -->
              <textarea v-model="contentText" class="text" maxlength="800" :disabled="!this.beforeAnswer" placeholder="请认真完成课后练习哦～">
                </textarea>
              <!-- 语音 -->
              <div v-for="(item,index) in isAddAudioUrl" style="width:100%;display: flex;position: relative;" :key="item">
                <top-audio style="flex: 1"  :audio-src="item" @clickAudio="clickAudio" :autoPlay="false" />
                <div v-if="beforeAnswer" @click="delAnswerAudio(index)" style="margin:0" class="close_icon"></div>
              </div>
              <!-- 图片 -->
              <div class="studentAnswer_audio">
                <div class="img-item" v-for="(item,index) in isAddImgUrl" :key="item">
                  <img :src="item" @click="showPhotos(isAddImgUrl,index,false)" />
                  <div v-if="beforeAnswer" @click="delAnswerImg(index)" class="close_icon"></div>
                </div>
              </div>
              <!-- 视频 -->
              <div class="studentAnswer_audio " v-for="(item) in isAddVideoUrl" :key="item.url" style="margin-top: 0px;padding: 0px;">
                <div class="img-item" v-if="!isSchool">
                  <img src='./../../../assets/img/offline/play.png' class="answer_paly" @click="showAddVideo()">
                  <img :src="item.coverUrl" @click="showAddVideo()" />
                  <xtVideo   style="margin-top:0px" v-show="isShowVideo"   ref="answerVideo" @fullscreenchange="fullscreenchange" :dataSrc="item.url" />
                  <div v-if="beforeAnswer" @click="delAnswerVideo(item.url)" class="close_icon"></div>
                </div>
              </div>
              <div class="foot">
                <!-- 面授课/学校作答不存在上传视频按钮 -->
                <div v-if="!isSchool" @click="pickVideo" class="foot-button">
                  <img src="./../../../assets/img/offline/video.png">
                  <span> 上传视频</span>
                </div>
                <div @click="recordAudio" class="foot-button">

                  <img src="./../../../assets/img/offline/voice .png">
                  <span> 上传语音</span>
                </div>
                <div @click="pickPhotos" class="foot-button" style=" border-right:0px solid #ffffff;">
                  <img src="./../../../assets/img/offline/picture.png">
                  <span> 上传图片</span>
                </div>
              </div>
            </div>
          </div>
          <!-- 学生分数及老师评语栏 -->
          <div v-if="controlShowTeacherAnswer && !ToRead && !beforeAnswer" class="wapoffline-teacheranswer">
            <div v-if="studentSubmitHistory.score|| studentSubmitHistory.rank" class="wapoffline-teacheranswer-score">
              <span v-if="studentSubmitHistory.score">{{studentSubmitHistory.score}}
                <a class="wapoffline-teacheranswer-score__text">分</a>
              </span>
              <span v-if="studentSubmitHistory.rank">{{studentSubmitHistory.rank}}</span>
            </div>
            <div   class="wapoffline-teacheranswer-top">
              <div>
                <div class="wapoffline-teacheranswer-top__symbol"></div>
                <div class="wapoffline-teacheranswer-top__title">老师寄语</div>
              </div>
              <div class="wapoffline-teacheranswer-top__answer">{{studentSubmitHistory.analysis_content}}</div>
            </div>
            <div v-for="(item) in studentSubmitHistory.analysis_voice_urls" :key=item.voice_url>
              <div style="width:100%;" >
                <!-- <audio-analysis style="flex: 1" :audioSrc="item.voice_url" :audioTitle="false" /> -->
                  <top-audio style="flex: 1;margin-top:10px;"  :audio-src="item.voice_url" @clickAudio="clickAudio" :autoPlay="false" />
              </div>
            </div>
            <div class="wapoffline-teacheranswer-answerimg">
              <div v-for="(item, index) in studentSubmitHistory.marks" :key="item.image_url" class="wapoffline-teacheranswer-answerimg__item">
                <img class="wapoffline-teacheranswer-answerimg__imgsize" :src="item.image_url">
                <div @click="showPhotos(studentSubmitHistory.marks,index,true)" class="wapoffline-teacheranswer-previewcomments">
                  <div class="text-backgrand">
                    <p class="pctext">已批阅</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 自主作答 -->
        <!-- 自主做答按钮 -->
        <div v-if="isComplete && !isOffline" class="wapoffline-choose">
          <div :class="correctClass" @click="selfAnswerCorrect" v-if="isAnswerCorrect">
            <img :src="correctUrl">
            <span>我答对了</span>
          </div>

          <div :class="errorClass" @click="selfAnswerError" v-if="isAnswerError">
            <img :src="errorUrl">
            <span>我答错了</span>
          </div>

        </div>
        <!-- 底部解析 -->
        <template v-if="showBottom">
          <slot name="analysis">
            <bottom-analysis :dataSubject="dataSubject" />
          </slot>
        </template>
      </div>
      <!-- 底部按钮 -->
      <div v-if='isOffline'>
        <div v-if="footIsShow && hideshow" class="wapoffline-foot">
          <div @click="answerSubmit" class="complete">
            <span>{{footText}}</span>
          </div>
        </div>
      </div>
      <div v-else style="position: relative;">
        <div class="wapoffline-foot" v-if="!isComplete">
          <div @click='()=>{this.isComplete=true}' class="complete">
            <span>我已完成</span>
          </div>
        </div>
      </div>
      <bigImg :imgList="imgList" :currIndex="currIndex" v-if="isShowBigImg" :isAnnotation="isAnnotation" @changeCurrIndex="changeCurrIndex" :show.sync="isShowBigImg"></bigImg>
    </div>
  </div>
</template>

<script>
import jsBridge from '@/libs/utils/app-call-back.js'
import { callAPP } from '@/libs/utils/index.js'
import SubjectTitle from './../components/subject-title'
import xtVideo from './../components/xt-video/xt-video'
import triesLimit from './../components/tries-limit'
import AnalysisMixin from '@/components/mixins/analysis-mixins'
import BottomAnalysis from '../components/bottom-analysis'
import VideoAnalysis from '././../components/bottom-analysis/video-analysis'
import AudioAnalysis from '././../components/bottom-analysis/audio-analysis'
import TopAudio from '././../components/top-audio'
import BasicsMixins from '@/components/mixins/subject-basics-mixins'
import GroupMixins from '@/components/mixins/group-mixins'
import BigImg from './../components/imgView'
const startCorrect = require('_img/offline/start-right.png')
const startError = require('_img/offline/start-error.png')
const endCorrect = require('_img/offline/end-right.png')
const endError = require('_img/offline/end-error.png')
export default {
  name: 'offline-item',
  components: {
    VideoAnalysis,
    AudioAnalysis,
    BottomAnalysis,
    triesLimit,
    BigImg,
    xtVideo,
    TopAudio
  },
  mixins: [BasicsMixins, GroupMixins, AnalysisMixin],

  data () {
    return {
      // 是否展开
      isShowMore: false,
      isShowBigImg: false,
      // 资源是否在加载中
      isLoald: false,
      imgList: [],
      // 当前图片序号
      bodyImgList:[], //题干图片列表 资源加载完毕之后需要记录
      currIndex: 1,
      // 答案内容
      contentText: '',
      // 上传的视频对象
      isAddVideoUrl: [],
      isAddVideoUrlVid:'',// 上传的视频对象的vid
      isAddVideoCoverUrl:'',// 上传视频的封面图片
      // 上传的语音对象
      isAddAudioUrl: [],
      // 上传的图片对象
      isAddImgUrl: [],
      // 是否显示预览图当中的批注按钮
      isAnnotation: false,
      // 自主作答是否点击 答对或者答错
      isAnswer: false,
      // 是否显示作答错误图片
      isAnswerError: true,
      // 是否显示作答正确图片
      isAnswerCorrect: true,
      // 自主作答下是否完成
      isComplete: false,
      // 当前历史提交选中学生作答数据
      studentSubmitHistory: [],
      lastStatus: '0',  // 当前作答数据状态备份
      // 是否显示待改错导航条
      showWrongStatus: false,
      showContent: true,
      isShowVideo:false,
       // 上一次播放音频组件对象
      objAudio: null,

      // 兼容安卓 ios  软键盘弹起影响布局的bug
      docmHeight: document.documentElement.clientHeight ||document.body.clientHeight,
      showHeight: document.documentElement.clientHeight ||document.body.clientHeight,
      hideshow:true  //显示或者隐藏footer
    }
  },
  props: {
    /** 是否显示拍照作答按键 */
    controlShowPictureAnswer: {
      type: Boolean,
      default: false
    },
    /** 控制类props */
    /** 学生作答上传图片之后轮询传入图片数组 */
    dataStudentAnswer: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  computed: {
    // 是否是自主作答
    isOffline () {
      return this.dataSubject.need_finish == 1
    },
    // 是否是学校做答
    isSchool () {
      return this.dataSubject.business == 1
    },
    // 作答正确(已作答)/作答错误(待改错)或者批阅中才显示
    myStatustext () {
      // 待改错 批阅中，部分正确 显示---我的作答
      return this.beforeAnswer ? '练习题目' : '习题&作答'
    },
    // 未作答状态下显示提交，其余待改错状态显示去修正
    footText () {
      return this.beforeAnswer ? '提交' : '去修正'
    },
    // 待批阅5，批阅中1,已完成4  状态下不显示 底部按钮
    footIsShow () {
      return this.beforeAnswer || this.rightAnswerPart || this.errorAnswer
    },
    // 待批阅5，批阅中1,已完成4  状态下不显示 底部按钮
    footIsShowClass () {
      return this.beforeAnswer || this.rightAnswerPart || this.errorAnswer ? 'wapoffline' : 'wapoffline  offline-bootom'
    },
    /** 答对图片 作答之前、作答之后 */
    correctUrl () {
      return this.isAnswer ? endCorrect : startCorrect
    },
    /** 答错图片 作答之前、作答之后 */
    errorUrl () {
      return this.isAnswer ? endError : startError
    },
    /** 答对class 作答之前、作答之后 */
    correctClass () {
      return this.isAnswer ? 'end-right right' : 'right'
    },
    /** 答错class 作答之前、作答之后 */
    errorClass () {
      return this.isAnswer ? 'end-error error' : 'error'
    },
    //底部解析显示
    showBottom () {
      if (this.isOffline) {
        return this.controlShowBottom
      } else {// 自组做答情况下需要点击答题之后才会显示解析
        return this.controlShowBottom && this.isAnswer
      }
    },

  },
  watch: {
    //监听显示高度
    showHeight:function() {
      if(this.docmHeight > this.showHeight){
        //隐藏
        this.hideshow=false
      }else{
        //显示
        this.hideshow=true
      }
    }
  },
  created () {
    this.lastStatus = this.controlStatus //保存最后一次作答的请求状态

    if (!this.dataSubject.hasOwnProperty('details')) {
      this.dataSubject.details = {
        content: '',
        student_video_url: [],
        image_urls: [],
        voice_urls: [],
        details: '',
        submit: []
      }
    }
    this.contentText = this.dataSubject.details.content
    //学生作答视频
    this.isAddVideoUrl = this.dataSubject.details.student_video_url || []
    // 学生作答图片
    this.isAddImgUrl = this.dataSubject.details.image_urls || []
    // 学生作答语音
    this.isAddAudioUrl = this.dataSubject.details.voice_urls || []

    if (!this.dataSubject.details.analysis_voice_urls) {
      this.dataSubject.details.analysis_voice_urls = []
    }
    // 学生作答信息
    this.studentSubmitHistory = this.dataSubject.details

  },
  mounted () {
    jsBridge.addVideo.on((val) => {
      // 获取视频地址
      this.getaddVideo(val)
    }),
    jsBridge.addPhotos.on((val) => {
      // 获取图片列表
      this.getaddPhotos(val)
    }),
    jsBridge.addAudio.on((val) => {
      // 获取音频地址
      this.getaddAudio(val)
    })
    let i = 0
    let _this = this
    this.isLoald = true
    this.$nextTick(() => {
      let img = _this.$refs.content.querySelectorAll('img')
      if (img.length === 0) {
        // 当题干高度小于默认高度，不展示展开按钮
        if (_this.$refs.content.offsetHeight < 176) {
          _this.moreTopic()
        } else {
          _this.upTopic()
        }
        _this.isLoald = false
      }
      img.forEach((v) => {
        v.onload = function () {
          i++
          if (i === img.length) {   // 等待图片资源加载完毕在执行的方法
            console.log('资源加载完毕')
            // 当题干高度小于默认高度，不展示展开按钮
            if (_this.$refs.content.offsetHeight < 176) {
              _this.moreTopic()
            } else {
              _this.upTopic()
            }
            _this.isLoald = false
            img.forEach(v => {
              _this.bodyImgList.push(v.currentSrc)
            })
            for (let i = 0; i < img.length; i++) { // 图片预览

              img[i].onclick = function () {
                _this.showPhotos(_this.bodyImgList, i, false)
              }
            }
          }
        }
      })
    })
     if(this.dataSubject.is_right==0){
      this.isComplete = false
    } else if ( this.dataSubject.is_right==1){
      this.isComplete = true
      this.selfAnswerError()
    }else if ( this.dataSubject.is_right==2){
      this.isComplete = true
      this.selfAnswerCorrect()
    }
    setTimeout(() => { // 5秒之后关闭骨架屏（兼容老题库 图片资源加载出错的问题）
      this.isLoald = false
    }, 5000)
    //监听事件
    window.onresize = ()=>{
      return(()=>{
        this.showHeight = document.documentElement.clientHeight || document.body.clientHeight
      })()
    }
  },
  methods: {
    moreTopic () {
      this.$refs.content.setAttribute('class', 'wapoffline-body wapoffline-topic wapoffline-topic-more')
      this.isShowMore = true
    },
    upTopic () {
      this.$refs.content.setAttribute('class', 'wapoffline-body wapoffline-topic wapoffline-topic-up')
      this.isShowMore = false
    },
    selfAnswerCorrect () {
      this.isAnswer = true
      this.isAnswerError = false
      this.isAnswerCorrect = true
      if(this.dataSubject.is_right==0){
        this.$emit('selfAnswer','2') //2表示答对了
      }
    },
    selfAnswerError () {
      this.isAnswer = true
      this.isAnswerCorrect = false
      this.isAnswerError = true
       if(this.dataSubject.is_right==0) {
        this.$emit('selfAnswer','1') // 1表示回答错误
      }
    },
    showPhotos (imgList, index, isAnnotation) {
      this.currIndex = index + 1
      this.isShowBigImg = true
      this.imgList = imgList
      this.isAnnotation = isAnnotation
    },
    // 改变当前图片的index
    changeCurrIndex (changeIndex) {
      this.currIndex = changeIndex
    },
    // 上传视频
    pickVideo () {
      if (this.beforeAnswer) {
        let obj = {
          name: 'pickVideo'
        }
        if (this.isAddVideoUrl.length) {
          this.$message('最多上传1个视频')
        } else {
          callAPP('callAPP', obj)
        }
      }
    },
    //上传语音
    recordAudio () {
      if (this.beforeAnswer) {
        let obj = {
          name: 'recordAudio'
        }
        if (this.isAddAudioUrl.length >= 5) {
          this.$message('最多上传5条语音')
        } else {
          callAPP('callAPP', obj)
        }
      }
    },
    //上传图片,最大9张
    pickPhotos () {
      if (this.beforeAnswer) {
        let obj = {
          name: 'pickPhotos',
          param: { maxNum: 9 - this.isAddImgUrl.length }
        }
        if (this.isAddImgUrl.length >= 9) {
          this.$message('最多上传9张图片')
        } else {
          callAPP('callAPP', obj)
        }
      }
    },
    getaddVideo (videoObj) {
      console.log('接收视频')
      console.log(videoObj)
      this.isAddVideoUrl =[{ duration :'3', url:videoObj.url,coverUrl:videoObj.coverUrl}],
      this.isAddVideoUrlVid=videoObj.vid
      this.isAddVideoCoverUrl=videoObj.coverUrl
    },
    showAddVideo () {
      console.log(this.isAddVideoUrl)
      this.isShowVideo=true
      this.$nextTick(()=>{
        this.$refs['answerVideo'][0].player.requestFullscreen()
      })

    },
     fullscreenchange (fullscreen) {
      this.isShowVideo = fullscreen
    },
    getaddPhotos (imgObj) {
      console.log('接收图片:'+ imgObj)
      for (let i = 0; i < imgObj.urls.length; i++) {
        console.log('单个图片'+imgObj.urls[i])
        console.log('图片对象'+this.isAddImgUrl)
        this.isAddImgUrl.push(imgObj.urls[i])
      }
      //  this.isAddImgUrl=[...new Set(this.isAddImgUrl )]
    },
    getaddAudio (audioRrl) {
      console.log('接收语音')
      console.log(audioRrl.url)
      this.isAddAudioUrl.push(audioRrl.url)
      // this.isAddAudioUrl=[...new Set(this.isAddAudioUrl )]
      console.log(this.isAddAudioUrl)
    },
    // 提交按钮
    answerSubmit () {
      let answerList = {
        lesson_work_id: this.dataSubject.lesson_work_id,//课次作业id
        lesson_id: this.dataSubject.lesson_work_id,//课次id
        content: this.contentText,//学生提交内容
        image_urls: this.isAddImgUrl,//学生提交图片
        voice_urls: this.isAddAudioUrl,	//学生提交语音
        student_video_url:this.isAddVideoUrlVid !=='' ? [{ duration :'3', url:this.isAddVideoUrlVid ,coverUrl:this.isAddVideoCoverUrl}] : [], 
         //学生提交视频的vod
      }
      console.log('answerList:'+answerList)
      // 0未作答状态 提交
      if (this.beforeAnswer) {
        this.$emit('answerSubmit', answerList)
      } else { // 修正状态下 显示带改错导航条，并且转跳至0状态
        this.$emit('changeStatus', { Status: '0', isNotRead: false })
        this.showWrongStatus = true
      }
    },
    // 删除作答视频
    delAnswerVideo () {
      this.isAddVideoUrl = []
      this.isAddVideoUrlVid=''
      this.isAddVideoCoverUrl=''
    },
    // 删除作答图片
    delAnswerImg (index) {
      this.isAddImgUrl.splice(index, 1)
    },
    // 删除作答语音
    delAnswerAudio (index) {
      this.isAddAudioUrl.splice(index, 1)
    },
    chooseIndex (index) {
      let submitLenth = this.dataSubject.details.submit.length
      // 历史作答数据
      if (index !== 0) {
        this.contentText = this.dataSubject.details.submit[submitLenth - index - 1].content
        //学生作答视频
        this.isAddVideoUrl = this.dataSubject.details.submit[submitLenth - index - 1].student_video_url
        // 学生作答图片
        this.isAddImgUrl = this.dataSubject.details.submit[submitLenth - index - 1].image_urls
        // 学生作答语音
        this.isAddAudioUrl = this.dataSubject.details.submit[submitLenth - index - 1].voice_urls
        // 学生作答信息
        this.studentSubmitHistory = this.dataSubject.details.submit[submitLenth - index - 1]
        this.$emit('changeStatus', { Status: '4', isNotRead: false })
      } else {
        this.contentText = this.dataSubject.details.content
        //学生作答视频
        this.isAddVideoUrl = this.dataSubject.details.student_video_url
        // 学生作答图片
        this.isAddImgUrl = this.dataSubject.details.image_urls
        // 学生作答语音
        this.isAddAudioUrl = this.dataSubject.details.voice_urls
        // 学生作答信息
        this.studentSubmitHistory = this.dataSubject.details
        // 选中最后一次传出当前备份状态
        this.$emit('changeStatus', { Status: this.lastStatus, isNotRead: false })
      }

    },
    clickAudio(objAudio) {
    // 当前点击对象不为上次点击记录的音频对象，则关闭上次音频播放效果
      if (this.objAudio !== objAudio && this.objAudio !== null) {
        this.objAudio.subjectAudio.pause()
        this.objAudio.playFlag=false //音频按钮样式改变
        // this.objAudio.controlDiv.setAttribute('class', 'job-control')
      }
      // objAudio记录上一次播放的语音组件对象
      this.objAudio = objAudio
    },
  }
}
</script>

<style lang="scss">
.wapoffline {
  background: #f8f9fb;
  position: relative;
  margin-bottom: 168px ;
  .status {
    // width: 750px;
    height: 80px;
    background: #f8ece0;
    padding: 0 32px 0 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      font-size: 28px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #2b2f36;
      line-height: 80px;
    }
    &-right {
      width: 160px;
      height: 48px;
      border-radius: 32px;
      border: 1px solid #ff8600;
      text-align: center;
      span {
        font-size: 24px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ff8600;
        line-height: 48px;
      }
    }
  }
  .error-status {
    // width: 750px;
    height: 80px;
    background: #f8ece0;
    padding: 0 32px 0 32px;
    display: flex;
    align-items: center;
    span {
      margin-left: 16px;
      font-size: 28px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #2b2f36;
      line-height: 80px;
    }
    &-left {
      height: 32px;
      border-radius: 8px;
      opacity: 0.8;
      border: 1px solid #ff4d07;
      padding: 0 8px;
      text-align: center;
      span {
        margin-left: 0px;
        font-size: 20px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #ff4d07;
        line-height: 32px !important;
      }
    }
  }
  &-choose {
    background: #ffffff;
    display: flex;
    padding-bottom: 20px;
    .right {
      margin-left: 32px;
      width: 228px;
      height: 64px;
      border-radius: 40px;
      border: 1px solid #18cb7f;
      display: flex;
      align-items: center;
      img {
        margin-left: 32px;
        width: 36px;
        height: 36px;
        margin-right: 10px;
      }
      span {
        font-size: 28px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #18cb7f;
        line-height: 64px;
      }
    }
    .end-right {
      background: #18cb7f !important;
      span {
        color: #ffffff !important;
      }
    }
    .error {
      margin-left: 56px;
      width: 228px;
      height: 64px;
      border-radius: 40px;
      border: 1px solid #ff4d07;
      display: flex;
      align-items: center;
      img {
        margin-left: 32px;
        width: 36px;
        height: 36px;
        margin-right: 10px;
      }
      span {
        font-size: 28px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ff4d07;
        line-height: 64px;
      }
    }
    .end-error {
      background: #ff4d07 !important;
      span {
        color: #ffffff !important;
      }
    }
  }
  .my-status {
    background: #ffffff;
    padding: 26px 32px;
    .line{
      width: 8px;
      height: 32px;
      background: #ff8000;
      border-radius: 4px;
      float: left;
      margin-top: -4px;
      margin-right: 10px;
    }
    > div:not(:first-child) {
      width: 192px;
      height: 32px;
      // border-left: 8px solid #fcb909;
      text-align: center;
      span {
        font-size: 32px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #2b2f36;
        line-height: 32px;
      }
    }
  }
  &-topic {
    font-family: PingFang SC;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    span {
      font-size: 28px;
      font-weight: 400;
      line-height: 48px;
      color: #0f1b33;
    }
    &__shade {
      position: absolute;
      width: 94%;
      height: 386px;
      margin-top: -60px;
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.1) 0%,
        #ffffff 100%
      );
      span {
        width: 70px;
        height: 40px;
        font-size: 28px;
        font-family: PingFang SC;
        font-weight: 400;
        line-height: 64px;
        color: #303133;
        // margin-left: -10px;
      }
    }
    &__shadeisiosx {
      position: absolute;
      height: 310px;
      width: 690px;
      float: left;
      margin-top: 102px;
      background: linear-gradient(
        0deg,
        #ffffff 0%,
        rgba(255, 255, 255, 0.1) 100%
      );
      span {
        width: 56px;
        height: 40px;
        font-size: 28px;
        font-family: PingFang SC;
        font-weight: 400;
        line-height: 82px;
        color: #303133;
      }
    }
    &__control {
      width: 148px;
      height: 64px;
      border-radius: 32px;
      border: 1px solid #c2c7d1;
      position: absolute;
      background-size: cover;
      bottom: 20px;
      left: 50%;
      z-index: 999;
      background: #fff;
      transform: translateX(-50%);
      display: flex;
      justify-content: center;
    }
    &__more {
      // position: absolute;
      width: 32px;
      height: 32px;
      background: url('~@/assets/img/offline/more.png') no-repeat;
      background-size: 32px 32px;
      margin-top: 15px;
      // margin-left:70px;
    }
    &__shadeup {
      width: 690px;
      background: #ffffff;
      height: 80px;
      span {
        width: 56px;
        height: 40px;
        font-size: 28px;
        font-family: PingFang SC;
        font-weight: 400;
        line-height: 65px;
        color: #303133;
      }
    }
    &__controlup {
      display: flex;
      justify-content: center;
    }
    &__moreup {
      // position: absolute;
      width: 32px;
      height: 32px;
      background: url('~@/assets/img/offline/more.png') no-repeat;
      background-size: 32px 32px;
      margin-top: 15px;
      transform: rotate(180deg);
    }
  }
  &-teacheranswer {
    background: #ffffff;
    padding: 30px;
    margin-top: 24px;
    position: relative;
    border-radius: 24px;
    &-score {
      margin-top: 30px;
      display: flex;
      justify-content: center;
      text-align: center;
      margin-bottom: 50px;
      span {
        width: 84px;
        height: 100px;
        font-size: 72px;
        font-family: DIN;
        font-weight: bold;
        line-height: 118px;
        color: #ff8600;
        flex: 1;
      }
      &__text {
        width: 36px;
        height: 50px;
        font-size: 36px;
        font-family: PingFang SC;
        font-weight: 400;
        line-height: 50px;
        color: #303133;
      }
    }
    &-score > :nth-child(2) {
      //第二个子元素
      border-left: 2px solid #f3f3f3;
    }
    &-top {
      font-family: PingFang SC;
      &__symbol {
        width: 8px;
        height: 32px;
        background: #ff8000;
        border-radius: 4px;
        float: left;
        margin-top: 4px;
      }
      &__title {
        width: 160px;
        height: 44px;
        font-size: 32px;
        margin-left: 20px;
        font-weight: bold;
        line-height: 44px;
        color: #303133;
      }
      &__answer {
        margin-top: 20px;
        font-size: 28px;
        font-weight: 400;
        line-height: 42px;
        color: #0f1b33;
      }
    }
    &-answerimg {
      margin-top: 16px;
      display: flex;
      flex-wrap: wrap;
      justify-self: start;
      &__item {
        display: flex;
        font-size: 12px;
        flex: 0 0 31%;
        position: relative;
        padding-bottom: 31%;
        margin-top: 30px;
        margin-right: 2%;
      }
      &__imgsize {
        width: 100%;
        position: absolute;
        height: 100%;
        border-radius: 8px;
      }
    }
    &-previewcomments {
      position: absolute;
      display: flex;
      width: 100%;
      height: 100%;
      justify-content: center;
      align-items: center;
      .text-backgrand {
        width: 120px;
        height: 46px;
        background: #303133;
        border-radius: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
      }
      .pctext {
        height: 40px;
        font-size: 24px;
        font-weight: 500;
        line-height: 40px;
        color: #ffffff;
      }
    }
  }
  &-topic-more {
    height: 100%;
  }
  &-topic-up {
    height: 336px;
  }
  &-body {
    overflow: hidden;
    margin-top: -32px;
    font-size: 18px;
    line-height: 26px;
    color: $--color-body;
    // height: 366px;
     * {
      font-size: 32px !important;
      font-weight: 600 !important;
      line-height: 48px !important;
    }
    img {
      // 设置图片最大宽度和居中对齐
      max-width: 100% !important;
      vertical-align: middle !important;
    }
  }
  &-body > div {
    margin-top: 10px;
  }
  &-top {
    position: relative;
    background: #ffffff;
    padding: 32px;
  }
  &-center {
    // width: 750px;
    background: #ffffff;
    border-radius: 24px;
    margin-top: 24px;
    padding: 32px;
  }
  &-center_top{
    padding: 0px !important;
  }
   &-answer_top {
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .text {
      margin-top: 0.24rem;
      width:94%;
      font-size: 32px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #9fa3aa;
      line-height: 44px;
      background: #ffffff;
      border:none
    }
    .close_icon {
      margin-left: -24px;
      margin-top: -12px;
      right: -24px;
      position: absolute;
      width: 48px;
      height: 48px;
      background: url('~@/assets/img/offline/close.png') no-repeat;
      background-size: 48px 48px;
    }
    .foot {
      width: 100%;
      margin: 32px;
      display: flex;
      justify-content: center;
      .foot-button {
        flex: 1;
        width: 228px;
        text-align: center;
        border-right: 1px solid #ebedf2;
        img {
          width: 40px;
          height: 40px;
        }
        span {
          font-size: 28px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #2b2f36;
          line-height: 40px;
        }
      }
    }
    .studentAnswer_audio {
      margin-top: 24px;
      // padding: 24px;
      margin-left: 24px;
      display: flex;
      justify-content: flex-start;
      width: 100%;
      flex-wrap: wrap;
      .img-item {
        margin-left: 31px;
        display: flex;
        margin-top: 24px;
        position: relative;
      }
      img {
        width: 176px;
        height: 176px;
      }
      /*video {*/
      /*  width: 176px;*/
      /*  height: 176px;*/
      /*}*/
    }
  }
  &-answer {
    background: #f8f9fb;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .text {
      margin-top: 0.24rem;
      padding: 24px;
      min-height: 282px;
      width:94%;
      background: #f8f9fb;
      border-radius: 16px;
      font-size: 32px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #9fa3aa;
      line-height: 44px;
    }
    .text:focus {
    outline: none !important;
    border-color: red;
     border-radius: 16px;
    }
    .close_icon {
      margin-left: -24px;
      margin-top: -12px;
      right: -24px;
      position: absolute;
      width: 48px;
      height: 48px;
      background: url('~@/assets/img/offline/close.png') no-repeat;
      background-size: 48px 48px;
    }
    .foot {
      width: 100%;
      margin: 32px;
      display: flex;
      justify-content: center;
      .foot-button {
        flex: 1;
        width: 228px;
        text-align: center;
        border-right: 1px solid #ebedf2;
        img {
          width: 40px;
          height: 40px;
        }
        span {
          font-size: 28px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #2b2f36;
          line-height: 40px;
        }
      }
    }
    .studentAnswer_audio {
      margin-top: 24px;
      // padding: 24px;
      margin-left: 24px;
      display: flex;
      justify-content: flex-start;
      width: 100%;
      flex-wrap: wrap;
      .img-item {
        margin-left: 31px;
        display: flex;
        margin-top: 24px;
        position: relative;
      }
      img {
        width: 176px;
        height: 176px;
      }
      /*video {*/
      /*  width: 176px;*/
      /*  height: 176px;*/
      /*}*/
    }
  }
  &-teacher {
    background: #f7f8fa;
    border-radius: 16px;
    p {
      font-size: 28px;
      font-weight: 400;
      line-height: 48px;
    }
  }
  &-foot {
    width: 100%;
    height: 144px;
    display: flex;
    position: absolute;
    bottom: 0;
    justify-content: center;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0) 0%,
      #ffffff 100%
    );
    .complete {
      display: flex;
      justify-content: center;
      width: 94%;
      height: 96px;
      background: #ffd700;
      border-radius: 52px;
      span {
        font-size: 32px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #2b2f36;
        line-height: 96px;
      }
    }
  }
}
 .answer_paly{
  position: absolute;
  width: 90px !important;
  height: 90px !important;
  margin: 43px;
}
.offline-bootom {
  margin-bottom: 0px !important;
}
.offline-isloaling {
  width: 100%;
  position: fixed;
  z-index: 1001;
  height: 100%;
}
</style>
