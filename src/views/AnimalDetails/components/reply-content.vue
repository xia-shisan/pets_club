<template>
  <van-list
    v-model="loading"
    :finished="finished"
    :immediate-check="false"
    @load="onLoad"
  >
    <div v-for="item in dynamicComment.list" :key="item.id">
      <!-- 评论用户信息 -->
      <van-cell
        :title="item.nickname"
        label="初级粉丝"
        title-class="title-weight"
        center
        :border="false"
      >
        <template #icon>
          <van-image
            width="35"
            height="35"
            round
            class="img-mr"
            :src="item.avatar ? item.avatar : defaultPhoto"
          />
        </template>
      </van-cell>
      <!-- 内容 -->
      <div class="reply-content">
        <van-cell :title="item.content" :border="false" class="content" />
        <!-- 评论时间 -->
        <van-cell
          :title="item.create_time | formatDate('yyyy-MM-dd hh:mm:ss')"
          :border="false"
          title-class="reply-time"
        >
          <template #right-icon>
            <van-tag
              color="#eeeeee"
              class="reply-tag"
              @click="lookReply(item.dynamic_id, item.id)"
            >
              {{ item.child_count }}回复
            </van-tag>
          </template>
        </van-cell>
      </div>
    </div>
  </van-list>
</template>

<script>
export default {
  name: 'ReplyContent',
  props: {
    // 帖子评论列表（一级评论）
    dynamicComment: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      // 默认用户头像
      defaultPhoto: 'http://qny.kingxyfh.cn/qt_header2.jpeg',
      loading: false,
      finished: false
    }
  },
  computed: {
    // 判断是否新增数据
    isAddCommentList() {
      if (this.dynamicComment) {
        return this.dynamicComment.list
      } else {
        return false
      }
    }
  },
  watch: {
    isAddCommentList(newValue) {
      if (newValue) {
        // 隐藏加载提示
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true,
          duration: 1
        })
        // 加载状态结束
        this.loading = false
      }
    }
  },
  methods: {
    // list 加载事件
    onLoad() {
      console.log(this.$parent.page)

      if (this.$parent.page <= this.dynamicComment.last) {
        // 显示加载提示
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true,
          duration: 0
        })
        this.$parent.getComment()
      } else {
        this.$toast.success('没有更多了...')
        this.finished = true
      }
    },
    // 查看一级评论的回复
    lookReply(dynamicId, id) {
      this.$router.push({
        path: '/reply',
        query: {
          id,
          dynamic_id: dynamicId,
          flag: 'dynamic'
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.title-weight {
  font-weight: 600;
}
// 评论回复内容
.reply-content {
  padding-left: 10px;
  border-bottom: 2px solid #eee;

  .content {
    padding: 0 16px;
  }

  .reply-time {
    color: grey;
  }

  .reply-tag {
    color: grey;
    padding: 3px 8px;
    border-radius: 3px;
  }
}
</style>
