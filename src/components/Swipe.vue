<template>
  <van-swipe :autoplay="time" :loop="isLoop">
    <van-swipe-item v-for="image in banner" :key="image.id">
      <van-image width="100%" :height="imgHeight" :fit="imgFit" :src="image" />
    </van-swipe-item>
  </van-swipe>
</template>

<script>
export default {
  name: 'Swipe',
  props: {
    // 自动轮播间隔
    time: {
      type: [Number, String],
      default: '3000'
    },
    // 是否循环播放
    isLoop: {
      type: Boolean,
      default: true
    },
    // 轮播图
    banner: {
      type: Array
    },
    // 图片高度
    imgHeight: {
      type: [Number, String],
      default: 'auto'
    },
    // 图片填充模式
    imgFit: {
      type: String,
      default: 'fill'
    }
  }
}
</script>

<style lang="less" scoped></style>
