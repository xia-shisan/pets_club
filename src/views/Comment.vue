<template>
  <div class="bg-white comment">
    <!-- 评论互动 -->
    <!-- 导航栏 -->
    <van-nav-bar
      title="评论互动"
      left-arrow
      fixed
      placeholder
      class="nav-bar"
      @click-left="onClickLeft"
    />

    <!-- 评论互动区域 -->
    <van-list
      v-model="loading"
      :finished="finished"
      :immediate-check="false"
      @load="onLoad"
      v-if="replyCommentList.total !== 0"
    >
      <van-cell
        center
        v-for="item in replyCommentList.list"
        :key="item.reply_time"
      >
        <!-- 评论用户头像 -->
        <template #icon>
          <van-image
            width="50"
            height="50"
            round
            class="img-mr"
            :src="item.avatar ? item.avatar : defaultPhoto"
            @click="lookUserHomePage(item.reply_user_id)"
          />
        </template>

        <!-- 回复内容 -->
        <template #title>
          <!-- 评论用户名 -->
          <span class="title">
            {{ item.nickname ? item.nickname : '未知' }}
          </span>
          <span class="title"> 回复：</span>
          <!-- 回复内容 -->
          <span class="content van-multi-ellipsis--l2">
            {{ item.reply_content }}
          </span>
        </template>

        <!-- 动态内容 -->
        <template #label>
          <span class="label">{{ item.dynamic_content }}</span>
          <span class="date">{{ item.reply_time | formatDate('MM-dd') }}</span>
        </template>

        <!-- 动态首图 -->
        <template #right-icon>
          <van-image
            width="80"
            height="80"
            radius="10px"
            :src="item.dynamic_images | filterImgPath"
            @click="jumpAnimalDetails(item.dynamic_id)"
          />
        </template>
      </van-cell>
    </van-list>

    <!-- 无数据时显示 -->
    <van-empty image-size="70%" description="暂无数据" v-else />
  </div>
</template>

<script>
import { lookMemberMessagesPush } from '@/network/api/common'
import { getMemberDynamicGetComment } from '@/network/api/message'

export default {
  name: 'Comment',
  data() {
    return {
      // 请求页
      page: 1,
      // 回复评论列表信息
      replyCommentList: {},
      loading: false,
      finished: false,
      // 默认头像
      defaultPhoto: 'http://qny.kingxyfh.cn/qt_header2.jpeg'
    }
  },
  created() {
    // 查看推送消息
    lookMemberMessagesPush('comment')
    this.getMemberDynamicGetComment()
  },

  methods: {
    // 导航栏返回按钮
    onClickLeft() {
      this.$router.back()
    },
    // 获取会员宠物动态帖获得的评论列表信息
    getMemberDynamicGetComment() {
      getMemberDynamicGetComment(this.page).then(result => {
        console.log(result)
        this.replyCommentList = result.data
        this.page++
      })
    },
    onLoad() {
      if (this.page <= this.replyCommentList.last) {
        // 显示加载提示
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true,
          duration: 0
        })
        // 加载数据
        getMemberDynamicGetComment(this.page).then(result => {
          this.replyCommentList.list.push(result.data.list)
          this.page++
          // 关闭加载提示
          this.$toast.loading({
            message: '加载中...',
            forbidClick: true,
            duration: 1
          })
          this.loading = false
        })
      } else {
        // 加载完毕提示
        this.$toast.success('没有更多了')
        this.finished = true
      }
    },
    // 跳转到对应动态页面
    jumpAnimalDetails(id) {
      this.$router.push({
        path: '/animal-details',
        query: {
          id
        }
      })
    },
    // 查看用户个人主页
    lookUserHomePage(id) {
      this.$router.push({
        path: '/ownPage',
        query: {
          id
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.comment {
  padding-bottom: 10px;

  .nav-bar {
    border-bottom: 1px solid #e5e5e5;
  }

  .title {
    font-size: 16px;

    &:first-child {
      font-weight: 600;
    }
  }
  .content {
    padding-left: 10px;
    margin-bottom: 10px;
  }

  .label,
  .date {
    font-size: 14px;
  }
  .date {
    margin-left: 10px;
  }
}
</style>
