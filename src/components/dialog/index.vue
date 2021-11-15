<!-- 弹窗组件 -->
<template>
  <div v-if="value" class="c-dialog" @click.stop.prevent="clickMask" @dblclick.stop @touchstart.stop>
    <div class="c-dialog__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dialog',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    /** 是否可以通过点击遮罩关闭弹窗 */
    maskClosable: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    clickMask () {
      if (this.maskClosable) {
        this.$emit('input', false)
      }
    }
  }
}
</script>

<style lang="scss">
.c-dialog {
  position: fixed;
  z-index: 2020;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  &__content {
    z-index: 2021;
    position: fixed;
    /*background-color: #fff;*/
    bottom: 50%;
    left: 50%;
    transform: translate3d(-50%, 50%, 0);
    transition: transform 0.3s;
  }
}
</style>
