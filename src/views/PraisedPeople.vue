<template>
  <div>
    <!-- 查看赞过对应动态的人 -->
    <!-- 导航栏 -->
    <van-nav-bar
      title="赞过的人"
      left-arrow
      fixed
      placeholder
      class="nav-bar"
      @click-left="onClickLeft"
    />

    <!-- 点过赞的用户区域 -->
    <van-list
      v-model="loading"
      :finished="finished"
      :immediate-check="false"
      @load="onLoad"
      v-if="likeByUserList.total > 0"
    >
      <van-cell
        :title="item.nickname ? item.nickname : '未知'"
        title-style="font-size:16px"
        center
        class="user-card"
        v-for="item in likeByUserList.list"
        :key="item.user_id"
      >
        <!-- 头像 -->
        <template #icon>
          <van-image
            width="50"
            height="50"
            round
            class="img-mr"
            :src="item.avatar ? item.avatar : defaultPhoto"
          />
        </template>
        <!-- 查看TA主页按钮 -->
        <template #right-icon>
          <van-button
            type="danger"
            size="small"
            class="btn-look"
            @click="lookUserHomePage(item.user_id)"
          >
            看TA主页
          </van-button>
        </template>
      </van-cell>
    </van-list>

    <!-- 无数据时显示 -->
    <van-empty image-size="70%" description="暂无数据" v-else />
  </div>
</template>

<script>
import { getMemberGetLikeByUser } from '@/network/api/message'

export default {
  name: 'PraisedPeople',
  data() {
    return {
      // 请求页数
      page: 1,
      // 动态id
      dynamic_id: this.$route.query.id,
      // 默认头像
      defaultPhoto: 'http://qny.kingxyfh.cn/qt_header2.jpeg',
      // 点赞用户列表信息
      likeByUserList: {},
      loading: false,
      finished: false
    }
  },
  created() {
    this.getMemberGetLikeByUser()
  },
  methods: {
    // 导航栏返回按钮
    onClickLeft() {
      this.$router.back()
    },
    // 获取会员宠物动态点赞的用户列表信息
    getMemberGetLikeByUser() {
      getMemberGetLikeByUser(this.dynamic_id, this.page).then(result => {
        if (this.page === 1) {
          this.likeByUserList = result.data
        } else {
          this.likeByUserList.list.push(...result.data.list)
        }
        this.page++
      })
    },
    onLoad() {
      // 显示加载提示
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      if (this.page <= this.likeByUserList.last) {
        // 获取新数据
        this.getMemberGetLikeByUser().then(() => {
          // 关闭加载提示
          this.$toast.loading({
            message: '加载中...',
            forbidClick: true,
            duration: 1
          })
        })
        this.page++
        // 加载状态结束
        this.loading = false
      } else {
        this.$toast('没有更多了...')
        this.finished = true
      }
    },
    // 查看TA主页按钮事件
    lookUserHomePage(userId) {
      this.$router.push({
        path: '/ownPage',
        query: {
          id: userId
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.nav-bar {
  border-bottom: 1px solid #e5e5e5;
}
.user-card {
  height: 90px;
  border-top: 1px solid #e5e5e5;

  &:first-child {
    border-top: none;
  }

  .btn-look {
    padding: 5px 8px !important;
    border-radius: 8px;
  }
}
</style>
