<template>
  <div>
    <router-view />

    <tabbar :messageTotal="messageTotal" />
  </div>
</template>

<script>
import Tabbar from '@/components/Tabbar'

export default {
  name: 'Layout',
  components: {
    Tabbar
  }
}
</script>

<style lang="less" scoped></style>
