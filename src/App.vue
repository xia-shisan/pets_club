<template>
  <div id="app">
    <!-- 要缓存的页面 -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>

    <!-- 正常的页面 -->
    <router-view v-if="!$route.meta.keepAlive" />

    <!-- 是否显示标签栏 -->
    <tabbar v-if="$route.meta.ifShowTabbar" :messageTotal="messageTotal" />
  </div>
</template>

<script>
import Tabbar from '@/components/Tabbar'

import { mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    Tabbar
  },
  computed: {
    // 推送的消息总数
    ...mapGetters(['messageTotal'])
  },
  created() {
    // 在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem('store')) {
      // 保存到vuex
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem('store'))
        )
      )
      // 移除 sessionStorage 里的数据
      sessionStorage.removeItem('store')
    }

    // 在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state))
    })
  }
}
</script>

<style lang="less">
@import 'assets/css/base.css';
</style>
