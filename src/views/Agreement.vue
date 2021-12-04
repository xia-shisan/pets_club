<template>
  <div class="bg-white">
    <!-- 用户协议 -->
    <!-- 导航栏 -->
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

    <div class="agreement-content" v-html="content"></div>
  </div>
</template>

<script>
import { getTextSettings } from '@/network/api/common'

export default {
  name: 'Agreement',
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
    // 获取用户协议
    async getTextSettings() {
      const {
        data: { data }
      } = await getTextSettings('user_agreement')
      console.log(data)
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
.agreement-content {
  padding: 0 15px 10px;
}
</style>
