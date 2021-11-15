<template>
    <div class="xt-message-warp" v-if="isShow">
        {{propsData}}
    </div>
</template>

<script>
export default {
  name: 'xt-message',
  props: {
    propsData: {
      type: String,
      default: ''
    },
    duration: {
      type: Number,
      default: 2000
    }
  },
  data () {
    return {
      isShow: false
    }
  },
  mounted () {
    console.log(this.propsData)
    this.isShow = true
    setTimeout(() => {
      this.isShow = false
    }, this.duration)
  }
}
</script>

<style scoped>
  .xt-message-warp{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%);

    padding: 24px 32px;
    background: #000000;
    border-radius: 16px;

    font-size: 28px;
    color: #FFFFFF;

    z-index: 2021;

  }

</style>
