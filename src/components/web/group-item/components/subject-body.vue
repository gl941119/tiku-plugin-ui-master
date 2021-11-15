   <!-- 组合题题干 -->
 <template>
    <div class="web-itemtitle question-common">
      <div class="web-itemtitle-content scorll-bar question-common-body-web"
        v-html="dataSubject.topic_body"></div>
    </div>
</template>
<script>
export default {
  props: {
    /** 题目对象 */
    dataSubject: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}
</script>
<style lang="scss">
.gruop{
  background:$--background;
}
.web-itemtitle {
  position: relative;
  padding-bottom: 36px;
  &-content {
    overflow-y: auto;
    line-height: 48px;
    color: #303133;
    padding: 20px;
    img {
      max-width: 100%;
    }
  }
  &-control {
    position: absolute;
    width: 108px;
    height: 36px;
    background: url("~_img/group-item/move.png") no-repeat;
    background-size: cover;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
}
  // 滚动条美化
.scorll-bar::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
  background-color: rgb(221, 228, 244);
}

.scorll-bar::-webkit-scrollbar {
  width: 6px;
  background-color: rgb(221, 228, 244);
}

.scorll-bar::-webkit-scrollbar-thumb {
  background-color: #c1c1c1;
  border-radius: 4px;
}
</style>
