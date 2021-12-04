<template>
  <van-grid :border="false">
    <van-grid-item
      v-for="menuItem in menuList"
      :key="menuItem.title"
      @click="menuItem.jumpTo"
    >
      <!-- 菜单图标 -->
      <img class="menu-icon" :src="menuItem.icon" alt="" />
      <!-- 菜单标题 -->
      <span class="menu-text">{{ menuItem.title }}</span>
    </van-grid-item>
  </van-grid>
</template>

<script>
export default {
  name: 'HomeMenu',
  data() {
    return {
      menuList: [
        {
          icon: require('@/assets/img/home-menu/menu_1.png'),
          title: '领养',
          jumpTo: () => {
            this.$router.push('/adopt')
          }
        },
        {
          icon: require('@/assets/img/home-menu/menu_2.png'),
          title: '求助',
          jumpTo: () => {
            this.$toast('该功能暂未开放')
          }
        },
        {
          icon: require('@/assets/img/home-menu/menu_3.png'),
          title: '积分商城',
          jumpTo: () => {
            this.$toast('该功能暂未开放')
          }
        },
        {
          icon: require('@/assets/img/home-menu/menu_4.png'),
          title: '排行榜',
          jumpTo: () => {
            this.$router.push('/ranking-list')
          }
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.menu-icon {
  width: 50px;
  height: 50px;
}
.menu-text {
  font-weight: 200px;
}
</style>
