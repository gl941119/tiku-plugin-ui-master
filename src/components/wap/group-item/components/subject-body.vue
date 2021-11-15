   <!-- 组合题题干 -->
 <template>
    <div class="wap-itemtitle" :style="contentStyle" >
      <div ref="content"  class="wap-itemtitle-content scorll-bar"
           v-html="dataSubject.topic_body"></div>
      <div ref="control" class="wap-itemtitle-control"></div>
    </div>
</template>
<script>
import GroupbodyMixins from '@/components/mixins/groupbody-mixins'
export default {
  mixins: [GroupbodyMixins]
}
</script>
<style lang="scss">
.gruop{
  background:$--background;
}
.wap-itemtitle {
  position: relative;
  padding-bottom: 36px;
  padding-top: 24px;
   height: 220px;
  &-content {
    overflow-y: auto;
    height: 100%;
    font-weight: bold;
    line-height: 48px;
    color: #303133;
    padding: 20px;
    img {
      // 设置图片最大宽度和居中对齐
      max-width: 100% !important;
      vertical-align: middle !important;
    }
  }
  &-control {
    position: absolute;
    width: 100%;
    height: 70px;
    background: url("~_img/group-item/move5.png") no-repeat;
    background-size:100% 70px;
    bottom: 0;
  }
}
  // 滚动条美化
.scorll-bar::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
  background-color: #ffffff;
}

.scorll-bar::-webkit-scrollbar {
  width: 6px;
  background-color: #ffffff;
}

.scorll-bar::-webkit-scrollbar-thumb {
  background-color: #c1c1c1;
  border-radius: 4px;
}
</style>
