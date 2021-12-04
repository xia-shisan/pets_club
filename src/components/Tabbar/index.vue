<template>
  <van-tabbar v-model="active" route active-color="red">
    <van-tabbar-item replace to="/home">
      <span>首页</span>
      <template #icon>
        <van-icon class="iconfont" class-prefix="icon" name="home" size="23" />
      </template>
    </van-tabbar-item>

    <van-tabbar-item replace to="/kingdom">
      <span>王国</span>
      <template #icon>
        <van-icon
          class="iconfont"
          class-prefix="icon"
          name="huangguan"
          size="23"
        />
      </template>
    </van-tabbar-item>

    <!-- 中间添加按钮 -->
    <img
      src="~@/assets/img/common/menu_active.png"
      alt=""
      class="add-img"
      @click="$router.push('/mid_tabbar')"
    />

    <van-tabbar-item replace to="/message" :badge="messageTotal">
      <span>消息</span>
      <template #icon>
        <van-icon
          class="iconfont"
          class-prefix="icon"
          name="xiaoxi1"
          size="23"
        />
      </template>
    </van-tabbar-item>

    <van-tabbar-item replace to="/profile">
      <span>我的</span>
      <template #icon>
        <van-icon
          class="iconfont"
          class-prefix="icon"
          name="ziyuan"
          size="23"
        />
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  name: 'Tabbar',
  props: {
    messageTotal: {
      type: [Number, String],
      default: ''
    }
  },
  data() {
    return {
      active: 0
    }
  }
}
</script>

<style lang="less" scoped>
.add-img {
  width: 50px;
  height: 50px;
  transform: translateY(-40%);
  z-index: 333;
}
</style>
