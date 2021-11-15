  <!-- 状态提示信息 -->
<template>
  <div v-if="isShowTooltip">
    <div v-if="beforeAnswer" class="analysis-tooltip">
        <div id="qrcode" ref="qrcode">
          <div class="analysis-qrcode"><img :src="qrcode" alt="" ></div>
          <div class="analysis-text"><span v-if="beforeAnswer">本题请打开心田花开网校app
            <img class="analysis-img" src="_img/analysis-item/icon_arrow.png">【个人中心】
            <img class="analysis-img" src="_img/analysis-item/icon_arrow.png">【扫码答题】，扫二维码并拍照上传</span>
          </div>
        </div>
    </div>
  </div>
</template>
<script>
import { REVIEW_NO_ANSWER, REVIEW_RIGHT_ANSWER, REVIEW_RIGHT_PART_ANSWER, REVIEW_ERROR_ANSWER, REVIEW_NO_REVIEW } from '@/config/answer-config'
import QRCode from 'qrcode'
export default {
  data () {
    return {
      // 二维码图片地址
      qrcode: ''
    }
  },
  props: {
    controlStatus: {
      type: String,
      default: '0'
    },
    /** 二维码信息来源 */
    dataAppName: {
      type: String,
      default: 'online_edu_user_web'
    },
    dataSubject: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      const text = this.dataSubject.qr_code_params || {}
      text.app_name = this.dataAppName
      QRCode.toDataURL(JSON.stringify(text))
        .then(url => {
          this.qrcode = url
        })
        .catch(err => {
          console.error(err)
        })
    }
  },
  computed: {
    beforeAnswer () {
      return this.controlStatus === REVIEW_NO_ANSWER
    },
    // 是否显示扫码提示栏，未作答状态才显示
    isShowTooltip () {
      return this.controlStatus === REVIEW_NO_ANSWER
    }
  }
}
</script>
<style lang="scss">
.analysis {
  &-tooltip{
    padding: 0px 32px;
    border: 1px solid #F3F4F5;
    border-radius: 8px;
  }
 &-qrcode {
    width: 80px;
    height: 80px;
    background: #FFFFFF;
    border: 1px solid #707070;
    float: left;
  }
 &-text {
    margin-left: 100px;
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: 500;
    line-height: 80px;
    color: #303133;
 }
 &-img {
    width:19px;
    height:19px;
 }
}
</style>
