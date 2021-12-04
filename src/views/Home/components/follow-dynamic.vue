<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <van-cell-group
      inset
      style="margin-bottom:8px"
      v-for="item in recommendDynamicLists"
      :key="item.id"
      @click="jumpAnimalDetails(item.id)"
    >
      <!-- 发帖人信息 -->
      <van-cell
        :title="item.nickname"
        :value="item.create_time | dateFormat"
        label="步步的铲屎官"
        :border="false"
        center
      >
        <!-- 头像 -->
        <template #icon>
          <van-image
            width="28"
            height="28"
            round
            class="img-mr"
            :src="item.avatar"
          />
        </template>
      </van-cell>

      <!-- 内容 -->
      <van-cell :border="false" style="padding:0 16px">{{
        item.content
      }}</van-cell>

      <!-- 图片 -->
      <van-cell :border="false" class="dynamic-img">
        <van-row type="flex" gutter="10">
          <van-col
            v-for="(image, index) in item.images.split(',')"
            :key="index"
          >
            <van-image width="100" height="100" radius="5" :src="image" />
          </van-col>
        </van-row>
      </van-cell>

      <!-- 分享、评论、收藏 -->
      <van-cell :border="false">
        <van-row type="flex" justify="space-between">
          <!-- 分享 -->
          <van-col>
            <van-row type="flex" align="center">
              <van-icon name="share-o" size="20" class="icon-mr" />
              <span>分享</span>
            </van-row>
          </van-col>
          <!-- 评论 -->
          <van-col>
            <van-row type="flex" align="center">
              <van-icon name="more-o" size="20" class="icon-mr" />
              <span>{{ item.comment_count }}</span>
            </van-row>
          </van-col>
          <!-- 收藏 -->
          <van-col>
            <van-row type="flex" align="center">
              <van-icon name="like-o" size="20" class="icon-mr" />
              <span>{{ item.like_count }}</span>
            </van-row>
          </van-col>
        </van-row>
      </van-cell>
    </van-cell-group>
  </van-list>
</template>

<script>
export default {
  name: 'FollowDynamic',
  props: {
    recommendDynamicLists: {
      type: Array
    }
  },
  data() {
    return {
      loading: false,
      finished: false
    }
  },
  methods: {
    onLoad() {
      this.loading = false
      this.finished = true
    },
    // 跳转到动态页面
    jumpAnimalDetails(id) {
      this.$router.push({
        path: '/animal-details',
        query: {
          id
        }
      })
    }
  },
  filters: {
    // 过滤时间
    dateFormat(originVal) {
      const dt = new Date(originVal)

      const m = (dt.getMonth() + 1 + '').padStart(2, '0')
      const d = (dt.getDate() + '').padStart(2, '0')

      return `${m}-${d}`
    }
  }
}
</script>

<style lang="less" scoped>
.dynamic-img {
  padding: 10px 16px 0;
}
</style>
