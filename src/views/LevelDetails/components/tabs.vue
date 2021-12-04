<template>
  <!-- tab标签栏区域 -->
  <van-tabs v-model="active" sticky offset-top="48">
    <!-- 动态 -->
    <van-tab title="动态" class="tab-content">
      <van-list
        v-model="loading"
        :finished="finished"
        :immediate-check="false"
        @load="onLoad"
        v-if="postLists.total !== 0"
      >
        <van-cell-group
          inset
          class="post-box"
          v-for="postItem in postLists.list"
          :key="postItem.id"
          @click="jumpPostDetails(postItem.id)"
        >
          <van-cell :title="postItem.nickname" label="初级粉丝" :border="false">
            <template #icon>
              <van-image
                width="50"
                height="50"
                round
                class="img-mr"
                :src="postItem.avatar"
              />
            </template>
          </van-cell>
          <!-- 内容 -->
          <van-cell
            :title="postItem.title"
            :border="false"
            style="padding:0 16px 10px"
          />
          <!-- 图片 -->
          <van-row type="flex" justify="space-between" style="padding:0 16px">
            <van-image
              width="28vw"
              height="28vw"
              radius="10px"
              :src="imgItem"
              v-for="imgItem in postItem.images.split(',').slice(0, 3)"
              :key="imgItem"
            />
          </van-row>
          <!-- 宠物种类 -->
          <van-row class="pets-label-box">
            <van-tag round color="#f4f8fe" class="pets-tag">
              <van-icon
                name="stop-circle"
                size="15"
                color="#93bdf9"
                class="icon-mr"
              />
              {{ postItem.label }}
            </van-tag>
          </van-row>
          <!-- 分享等 -->
          <van-cell :border="false" style="padding:0 16px 10px">
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
                  <span>{{ postItem.comment_count }}</span>
                </van-row>
              </van-col>
              <!-- 收藏 -->
              <van-col>
                <van-row type="flex" align="center">
                  <van-icon name="like-o" size="20" class="icon-mr" />
                  <span>{{ postItem.like_count }}</span>
                </van-row>
              </van-col>
            </van-row>
          </van-cell>
        </van-cell-group>
      </van-list>
      <!-- 无数据展示 -->
      <van-empty image-size="68%" v-else style="background-color:#fff" />
    </van-tab>

    <!-- 科喂 -->
    <van-tab title="科喂" class="tab-content">
      <van-empty image-size="68%" style="background-color:#fff" />
    </van-tab>
  </van-tabs>
</template>

<script>
export default {
  name: 'Tabs',
  props: {
    postLists: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      // 当前激活的tab栏
      active: 0,
      loading: false,
      finished: false,
      // 请求页数
      page: 1
    }
  },
  methods: {
    // list 列表加载事件
    async onLoad() {
      // 加载状态结束
      const last = this.postLists.last
      this.page++
      if (this.page <= last) {
        // 加载请求
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true,
          duration: 0
        })
        await this.$parent.getPostListsByCategory(this.page)
        this.$toast.loading = false
        this.loading = false
      } else {
        // 全部加载完毕
        this.finished = true
      }
    },
    // 跳转到帖子详情
    jumpPostDetails(id) {
      this.$router.push({
        path: '/postDetails',
        query: {
          id
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.post-box {
  margin-bottom: 10px !important;
}

.pets-label-box {
  padding: 5px 16px;

  .pets-tag {
    color: #acc3fa;
    padding: 2px 3px;
    margin: 5px 0;
  }
}

.tab-content {
  padding: 10px 0 0 0;
}
</style>
