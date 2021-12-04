<template>
  <div class="bg-white">
    <!-- 我关注的 -->
    <van-nav-bar
      title="我关注的"
      left-arrow
      fixed
      placeholder
      @click-left="onClickLeft"
    />

    <van-tabs v-model="active" sticky offset-top="46">
      <!-- 用户 -->
      <van-tab title="用户">
        <users />
      </van-tab>

      <!-- 王国 -->
      <van-tab title="王国">
        <kingdoms />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Users from './components/users'
import Kingdoms from './components/kingdoms'

export default {
  name: 'MyFollow',
  components: {
    Users,
    Kingdoms
  },
  data() {
    return {
      active: 0
    }
  },
  methods: {
    // 导航栏返回按钮
    onClickLeft() {
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped></style>
