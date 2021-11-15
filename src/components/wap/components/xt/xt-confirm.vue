<script>
  import xtDialog from '@/components/dialog'

  export default {
    name: 'xt-confirm',
    components:{
      xtDialog
    },
    props: {
      visible: {
        type: Boolean,
        default: true
      },
      // 取消按钮文字
      cancelText: {
        type: String,
        default: '取消'
      },
      // 确认按钮文字
      okText: {
        type: String,
        default: '确认'
      },
      // 内容   string |vNode |function(h)
      content: {
        default: ''
      },
      //  标题 string |vNode |function(h)
      title: {
        default: ''
      },
      onOk: {
        type: Function
      },
      onCancel: {
        type: Function
      },
      //  底部 string |vNode |function(h)
      footer: {
        default: ''
      },
      // 额外的
      extra: {
        default: ''
      }
    },
    mounted() {
    },
    data() {
      return {
        animatedVisible: true
      }
    },
    methods: {
      onClose() {
        this.animatedVisible = false
        setTimeout(() => {
          this.visible = false
        }, 500)
      },
      _onCancel() {
        this.onClose()
        this.onCancel && this.onCancel()
      },
      _onOk() {
        this.onClose()
        this.onOk && this.onOk()
      }
    },
    render(createElement, context) {
      // console.log(arguments[0], this.$props)
      // 底部
      const footer = (
        <div class="footer">
          <div class="footer-cancel" on-click={this._onCancel}>
            {this.cancelText}
          </div>
          <div class="footer-okText" on-click={this._onOk}>
            {this.okText}
          </div>
        </div>
      )

      const vnode = (
        <xt-dialog value={true}>
          <div class={[this.animatedVisible ? 'bounceIn' : 'bounceOut', 'xt-confirm-warp', 'animated']}>
            {this.title && <div class='title'>{this.title}</div>}
            {this.content && <div class="content">{this.content}</div>}
            {this.footer ? this.footer : footer}
            {this.extra}
          </div>
        </xt-dialog>
      )
      return this.visible ? vnode : ''
    }
  }
</script>

<style lang="scss">

  .animated {
    //-webkit-animation-duration: 1s;
    //animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both
  }

  .animated.bounceIn, .animated.bounceOut, .animated.flipOutX, .animated.flipOutY {
    -webkit-animation-duration: .5s;
    animation-duration: .5s
  }

  .bounceIn {
    -webkit-animation-name: bounceIn;
    animation-name: bounceIn
  }

  @-webkit-keyframes bounceIn {
    0%, 20%, 40%, 60%, 80%, to {
      -webkit-animation-timing-function: cubic-bezier(.215, .61, .355, 1);
      animation-timing-function: cubic-bezier(.215, .61, .355, 1)
    }
    0% {
      opacity: 0;
      -webkit-transform: scale3d(.3, .3, .3);
      transform: scale3d(.3, .3, .3)
    }
    20% {
      -webkit-transform: scale3d(1.1, 1.1, 1.1);
      transform: scale3d(1.1, 1.1, 1.1)
    }
    40% {
      -webkit-transform: scale3d(.9, .9, .9);
      transform: scale3d(.9, .9, .9)
    }
    60% {
      opacity: 1;
      -webkit-transform: scale3d(1.03, 1.03, 1.03);
      transform: scale3d(1.03, 1.03, 1.03)
    }
    80% {
      -webkit-transform: scale3d(.97, .97, .97);
      transform: scale3d(.97, .97, .97)
    }
    to {
      opacity: 1;
      -webkit-transform: scaleX(1);
      transform: scaleX(1)
    }
  }

  @keyframes bounceIn {
    0%, 20%, 40%, 60%, 80%, to {
      -webkit-animation-timing-function: cubic-bezier(.215, .61, .355, 1);
      animation-timing-function: cubic-bezier(.215, .61, .355, 1)
    }
    0% {
      opacity: 0;
      -webkit-transform: scale3d(.3, .3, .3);
      transform: scale3d(.3, .3, .3)
    }
    20% {
      -webkit-transform: scale3d(1.1, 1.1, 1.1);
      transform: scale3d(1.1, 1.1, 1.1)
    }
    40% {
      -webkit-transform: scale3d(.9, .9, .9);
      transform: scale3d(.9, .9, .9)
    }
    60% {
      opacity: 1;
      -webkit-transform: scale3d(1.03, 1.03, 1.03);
      transform: scale3d(1.03, 1.03, 1.03)
    }
    80% {
      -webkit-transform: scale3d(.97, .97, .97);
      transform: scale3d(.97, .97, .97)
    }
    to {
      opacity: 1;
      -webkit-transform: scaleX(1);
      transform: scaleX(1)
    }
  }


  .bounceOut {
    -webkit-animation-name: bounceOut;
    animation-name: bounceOut
  }


  @-webkit-keyframes bounceOut {
    20% {
      -webkit-transform: scale3d(.9, .9, .9);
      transform: scale3d(.9, .9, .9)
    }
    50%, 55% {
      opacity: 1;
      -webkit-transform: scale3d(1.1, 1.1, 1.1);
      transform: scale3d(1.1, 1.1, 1.1)
    }
    to {
      opacity: 0;
      -webkit-transform: scale3d(.3, .3, .3);
      transform: scale3d(.3, .3, .3)
    }
  }

  @keyframes bounceOut {
    20% {
      -webkit-transform: scale3d(.9, .9, .9);
      transform: scale3d(.9, .9, .9)
    }
    50%, 55% {
      opacity: 1;
      -webkit-transform: scale3d(1.1, 1.1, 1.1);
      transform: scale3d(1.1, 1.1, 1.1)
    }
    to {
      opacity: 0;
      -webkit-transform: scale3d(.3, .3, .3);
      transform: scale3d(.3, .3, .3)
    }
  }


  .xt-confirm-warp {
    /*width: 610px;*/
    /*height: 280px;*/
    background: #FFFFFF;
    border-radius: 24px;
    padding: 56px 40px;
    /*z-index: 2021;*/
    position: relative;

    .title {
      height: 50px;
      font-size: 36px;
      font-weight: 600;
      color: #2B2F36;
      line-height: 50px;
      text-align: center;
      margin-bottom: 16px;
    }

    .content {
      height: 48px;
      font-size: 32px;
      color: #2B2F36;
      line-height: 48px;
      text-align: center;
    }

    .footer {
      height: 80px;

      margin-top: 40px;

      display: flex;
      justify-content: space-between;

      /*padding: 0 40px;*/

      > div {
        width: 248px;
        height: 80px;
        line-height: 80px;
        border-radius: 40px;
        text-align: center;
        font-size: 32px;
        font-weight: 600;
      }

      &-cancel {
        background: #F4F5F8;
        color: #6A707C;
      }

      &-okText {
        background: #FFD700;
        color: #2B2F36;
        margin-left: 34px;
      }
    }

  }

</style>
