<template>
  <div class="bg-white">
    <!-- 隐私条款 -->
    <van-nav-bar
      :title="title"
      left-arrow
      fixed
      placeholder
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <template #right>
        <van-icon name="ellipsis" size="24" />
      </template>
    </van-nav-bar>

    <div class="privacy-content" v-html="content"></div>
  </div>
</template>

<script>
import { getTextSettings } from '@/network/api/common'

export default {
  name: 'Privacy',
  data() {
    return {
      title: '',
      content: ''
    }
  },
  created() {
    this.getTextSettings()
  },
  methods: {
    async getTextSettings() {
      const {
        data: { data }
      } = await getTextSettings('privacy_clause')
      this.title = data[0].remarks
      this.content = data[0].settings
    },
    onClickLeft() {
      this.$router.back()
    },
    onClickRight() {}
  }
}
</script>

<style lang="less" scoped>
.privacy-content {
  padding: 0 15px 10px;
}
</style>
