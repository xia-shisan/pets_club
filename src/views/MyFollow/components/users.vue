<template>
  <div>
    <!-- 关注的用户 -->
    <van-list
      v-model="loading"
      :finished="finished"
      @load="onLoad"
      v-if="userList.total !== 0"
    >
      <van-cell
        :title="item.nickname ? item.nickname : defaultNickname"
        :label="item.summary ? item.summary : defaultSummary"
        title-class="nickname"
        label-class="summary"
        center
        class="user-card"
        v-for="(item, index) in userList.list"
        :key="item.id"
      >
        <template #icon>
          <van-image
            width="60"
            height="60"
            round
            class="img-mr"
            :src="item.avatar ? item.avatar : defaultPhoto"
            @click="lookUserHomePage(item.follow_user_id)"
          />
        </template>

        <template #right-icon>
          <van-button
            size="mini"
            class="btn-shallow"
            @click="deleteUserFollow(item.id, item.follow_user_id, index)"
            >已关注</van-button
          >
        </template>
      </van-cell>
    </van-list>

    <!-- 无数据时显示 -->
    <van-empty image-size="70%" description="暂无数据" v-else />
  </div>
</template>

<script>
import { getUserFollow, deleteUserFollow } from '@/network/api/member'

export default {
  name: 'Users',
  data() {
    return {
      // 请求信息
      queryInfo: {
        page: 1,
        per_count: 10
      },
      loading: false,
      finished: false,
      // 关注用户列表信息
      userList: {},
      // 默认头像
      defaultPhoto: 'http://qny.kingxyfh.cn/qt_header2.jpeg',
      // 默认昵称
      defaultNickname: '未知',
      // 默认签名
      defaultSummary: '这个人很懒,什么都没有留下~'
    }
  },
  methods: {
    // list 加载事件
    onLoad() {
      // 首次加载事件
      if (this.queryInfo.page === 1) {
        //  获取会员关注用户列表
        getUserFollow(this.queryInfo).then(result => {
          this.userList = result.data
          this.queryInfo.page++
          this.loading = false
        })
      } else if (this.queryInfo.page <= this.userList.last) {
        // 显示加载提示
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true,
          duration: 0
        })
        getUserFollow(this.queryInfo).then(result => {
          this.userList.list.push(...result.data.list)
          this.queryInfo.page++
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
    // 取消关注用户
    deleteUserFollow(id, followUserId, index) {
      deleteUserFollow({ id, followUserId }).then(() => {
        this.$toast.success('取消关注成功')
        this.userList.list.splice(index, 1)
        this.userList.total--
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
.user-card {
  border-top: 1px solid #efefef;
  padding: 20px !important;

  &:first-child {
    border-top: none;
  }

  .nickname {
    font-size: 16px;
    font-weight: 600;
  }

  .summary {
    color: #c0c0c0;
    font-size: 14px;
  }

  button {
    font-size: 14px;
    border-radius: 5px;
    padding: 3px 8px;
  }
  .btn-shallow {
    background-color: #f8f8f8;
    border: 1px solid #f8f8f8;
  }
}
</style>
