<template>
  <div class="reply bg-white">
    <!-- 宠物动态一级评论的回复页面 -->
    <!-- 导航栏 -->
    <van-nav-bar
      title="回复"
      left-arrow
      fixed
      placeholder
      @click-left="onClickLeft"
    />

    <!-- 一级评论 -->
    <van-cell-group>
      <van-cell
        :title="comment.nickname"
        title-style="font-weight:600"
        :border="false"
      >
        <!-- 用户头像 -->
        <template #icon>
          <van-image
            width="50"
            height="50"
            round
            class="img-mr"
            :src="comment.avatar ? comment.avatar : defaultPhoto"
          />
        </template>
        <template #label>
          <!-- 发布时间 -->
          <div style="color:#c0c0c0">
            {{ comment.create_time | formatDate('yyyy-MM-dd hh:mm:ss') }}
          </div>
          <!-- 内容 -->
          <div class="comment-content">{{ comment.content }}</div>
        </template>
      </van-cell>
    </van-cell-group>

    <!-- 回复评论 -->
    <div class="reply-box">
      <!-- 回复条数 -->
      <div class="reply-label">{{ replyList.total }}条回复</div>

      <!-- 回复评论内容 -->
      <van-list
        v-model="loading"
        :finished="finished"
        :immediate-check="false"
        @load="onLoad"
        v-if="replyList.total > 0"
      >
        <van-cell
          v-for="item in replyList.list"
          :key="item.id"
          :title="item.nickname"
          title-class="reply-user-name"
          class="reply-content-box"
          :border="false"
        >
          <!-- 回复用户头像 -->
          <template #icon>
            <van-image
              width="50"
              height="50"
              round
              class="img-mr"
              :src="item.avatar | filterPhoto"
            />
          </template>
          <template #label>
            <!-- 回复时间 -->
            <div style="color:#c0c0c0">
              {{ item.create_time | formatDate('yyyy-MM-dd hh:mm:ss') }}
            </div>
            <!-- 回复内容 -->
            <div class="comment-content">{{ item.content }}</div>
          </template>
        </van-cell>
      </van-list>
    </div>

    <!-- 发送评论输入框 -->
    <van-field center class="reply-input">
      <!-- 输入框 -->
      <template #input>
        <input type="text" v-model="value" placeholder="我来评论~" />
      </template>
      <!-- 发送按钮 -->
      <template #button>
        <van-button
          :disabled="isDisabled"
          size="small"
          round
          color="#84b8df"
          style="padding:5px 15px"
          @click="replyComment"
        >
          发送
        </van-button>
      </template>
    </van-field>
  </div>
</template>

<script>
import { getCommentChild, addComment } from '@/network/api/comment'
import { getPostCommentChild, addPostComment } from '@/network/api/post'

import { mapGetters } from 'vuex'

export default {
  name: 'Reply',
  data() {
    return {
      loading: false,
      finished: false,
      // 动态/帖子一级评论回复信息
      queryInfo: {
        // 动态 id
        dynamic_id: this.$route.query.dynamic_id,
        // 帖子 id
        postId: this.$route.query.post_id,
        // 一级评论 id
        id: this.$route.query.id,
        page: 1
      },
      // 默认用户头像
      defaultPhoto:
        'http://qny.kingxyfh.cn/8533dbbbcdf254a2f3e735a2511b9d85.jpeg',
      // 判断是动态页面进入还是帖子页面进入
      flag: this.$route.query.flag,
      // 一级评论
      comment: [],
      // 一级评论回复列表
      replyList: {},
      // 评论输入框
      value: '',
      // 是否禁用发布评论按钮
      isDisabled: true
    }
  },
  computed: {
    ...mapGetters(['token'])
  },
  watch: {
    // 监听输入框，输入框有内容解禁发送按钮
    value(val) {
      if (val) {
        this.isDisabled = false
      } else {
        this.isDisabled = true
      }
    }
  },
  created() {
    if (this.flag === 'post') {
      this.getPostCommentChild()
    } else if (this.flag === 'dynamic') {
      this.getCommentChild()
    }
    window.scrollTo(0, 0)
  },
  methods: {
    onClickLeft() {
      this.$router.back()
    },
    // 获取宠物动态评论列表（一级评论和回复）
    getCommentChild() {
      getCommentChild(this.queryInfo).then(result => {
        this.replyList = result.data
        this.comment = result.data.parent[0]
        this.queryInfo.page++
        console.log(result)
        console.log(this.comment)
      })
    },
    // 获取帖子评论列表（一级评论和回复）
    getPostCommentChild() {
      getPostCommentChild(this.queryInfo).then(result => {
        this.replyList = result.data
        this.comment = result.data.parent[0]
        this.queryInfo.page++
        console.log(result)
        console.log(this.comment)
      })
    },

    // list 加载事件
    onLoad() {
      if (this.queryInfo.page <= this.replyList.last) {
        // 显示加载提示
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true,
          duration: 0
        })
        if (this.flag === 'post') {
          // 获取帖子评论
          getPostCommentChild(this.queryInfo).then(result => {
            this.replyList.list.push(...result.data.list)
            this.page++
            // 隐藏加载提示
            this.$toast.loading({
              message: '加载中...',
              forbidClick: true,
              duration: 1
            })
            // 加载状态结束
            this.loading = false
          })
        } else if (this.flag === 'dynamic') {
          // 获取动态评论
          getCommentChild(this.queryInfo).then(result => {
            this.replyList.list.push(...result.data.list)
            this.page++
            // 隐藏加载提示
            this.$toast.loading({
              message: '加载中...',
              forbidClick: true,
              duration: 1
            })
            // 加载状态结束
            this.loading = false
          })
        }
      } else {
        this.finished = true
      }
    },

    // 发布评论
    async replyComment() {
      // 判断是否登录
      if (this.token) {
        // 判断是帖子评论还是动态评论
        if (this.flag === 'post') {
          const postId = this.queryInfo.postId
          const content = this.value
          const parentId = this.comment.id
          // 发布评论
          addPostComment(postId, content, parentId).then(() => {
            // 重新获取评论
            this.getPostCommentChild()
            // 清空输入框
            this.value = ''
            window.scrollTo(0, 0)
            this.$toast.success('发布评论成功')
          })
        } else if (this.flag === 'dynamic') {
          const queryInfo = {
            dynamic_id: this.queryInfo.dynamic_id,
            content: this.value,
            parent_id: this.comment.id
          }
          addComment(queryInfo).then(() => {
            // 重新获取评论
            this.getCommentChild()
            // 清空输入框
            this.value = ''
            window.scrollTo(0, 0)
            this.$toast.success('发布评论成功')
          })
        }
      } else {
        this.$toast('请先登录')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.reply {
  padding-bottom: 60px;
}
.comment-content {
  font-size: 14px !important;
  color: #333 !important;
  margin-top: 8px;
}

.reply-box {
  padding: 20px;
}

.reply-user-name {
  font-weight: 600;
}
.reply-content-box {
  padding: 20px;
}

.reply-label {
  position: relative;
  font-size: 16px;
  font-weight: 600;
  color: #c0c0c0;
  padding-left: 25px;

  &::before {
    position: absolute;
    left: 0;
    content: '';
    width: 7px;
    height: 20px;
    background-color: #fa3534;
  }
}
.reply-input {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  border-top: 1px solid #e3e3e3;

  input {
    width: 85%;
    height: 30px;
    background-color: #f0f0f0;
    padding: 0 13px;
    border: 0;
    border-radius: 15px;
  }
}
</style>
