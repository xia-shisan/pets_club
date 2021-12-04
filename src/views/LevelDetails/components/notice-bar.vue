<template>
  <!-- 公告 -->
  <van-notice-bar :scrollable="false" color="#333" class="notice-bar">
    <!-- 左侧图标 -->
    <template #left-icon>
      <span class="left-icon">公告</span>
    </template>
    <!-- 垂直滚动公告 -->
    <van-swipe
      vertical
      :autoplay="3000"
      :show-indicators="false"
      :touchable="false"
      class="notice-swipe"
    >
      <van-swipe-item>尊重生命，不离不弃</van-swipe-item>
      <van-swipe-item>以宠为本</van-swipe-item>
      <van-swipe-item>心心相系，宠物情缘，快乐共享，宝贝家园</van-swipe-item>
    </van-swipe>
  </van-notice-bar>
</template>

<script>
export default {
  name: 'NoticeBar'
}
</script>

<style lang="less" scoped>
.notice-bar {
  padding-top: 10px;
  margin-top: -15px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: #fff;

  .left-icon {
    display: block;
    background-color: #ce966f;
    color: #fff;
    padding: 0 5px;
  }
}

.notice-swipe {
  height: 40px;
  line-height: 40px;
  padding-left: 20px;
}
</style>
