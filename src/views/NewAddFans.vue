<template>
  <div>
    <!-- 新增粉丝页面 -->
    <!-- 导航栏 -->
    <van-nav-bar
      title="新增粉丝"
      left-arrow
      class="nav-bar"
      fixed
      placeholder
      @click-left="onClickLeft"
    />

    <!-- 新增粉丝区域 -->
    <van-list
      v-model="loading"
      :finished="finished"
      :immediate-check="false"
      @load="onLoad"
      v-if="fansList.total !== 0"
    >
      <!-- 粉丝信息 -->
      <van-cell
        :title="item.nickname"
        label-class="label"
        center
        class="fans-card"
        v-for="item in fansList.list"
        :key="item.create_time"
        @click="lookUserHomePage(item.user_id)"
      >
        <template #icon>
          <van-image
            width="50"
            height="50"
            round
            class="img-mr"
            :src="item.avatar"
          />
        </template>
        <template #label>
          <span>关注了你 · </span>
          <span>{{ item.create_time | formatDate('MM-dd') }}</span>
        </template>
      </van-cell>
    </van-list>

    <!-- 无数据时显示 -->
    <van-empty image-size="70%" description="暂无数据" v-else />
  </div>
</template>

<script>
import { lookMemberMessagesPush } from '@/network/api/common'
import { getMemberFans } from '@/network/api/message'

export default {
  name: 'NewAddFans',
  data() {
    return {
      page: 1,
      // 粉丝列表信息
      fansList: {},
      loading: false,
      finished: false
    }
  },
  created() {
    // 查看推送消息
    lookMemberMessagesPush('fans')
    this.getMemberFans()
  },

  methods: {
    // 导航栏返回按钮
    onClickLeft() {
      this.$router.back()
    },
    // 获取粉丝列表信息
    getMemberFans() {
      getMemberFans(this.page).then(result => {
        console.log(result)
        this.fansList = result.data
        this.page++
      })
    },
    // 列表加载事件
    onLoad() {
      if (this.page <= this.fansList.last) {
        // 显示加载提示
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true,
          duration: 0
        })
        getMemberFans(this.page).then(result => {
          this.fansList.list.push(...result.data.list)
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
        this.finished = true
      }
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
.nav-bar {
  border-bottom: 1px solid #e5e5e5;
}
.fans-card {
  height: 100px;
  font-size: 16px;
  font-weight: 600;
  padding-left: 30px;

  .label {
    font-size: 14px;
    color: #b1b1b1;
    margin-top: 10px;
  }
}
</style>
