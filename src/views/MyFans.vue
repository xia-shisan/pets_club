<template>
  <div class="bg-white">
    <!-- 我的粉丝 -->
    <van-nav-bar
      title="我的粉丝"
      left-arrow
      fixed
      placeholder
      @click-left="onClickLeft"
    />

    <van-list
      v-model="loading"
      :finished="finished"
      @load="onLoad"
      v-if="memberFans.total !== 0"
    >
      <van-cell
        :title="item.nickname"
        :label="item.summary"
        title-class="nickname"
        label-class="summary"
        center
        class="fans-card"
        v-for="(item, index) in memberFans.list"
        :key="item.user_id"
      >
        <!-- 用户头像 -->
        <template #icon>
          <van-image
            width="60"
            height="60"
            round
            class="img-mr"
            :src="item.avatar ? item.avatar : defaultPhoto"
            @click="lookUserHomePage(item.user_id)"
          />
        </template>

        <!-- 是否关注 -->
        <template #right-icon>
          <!-- 关注按钮 -->
          <van-button
            type="danger"
            size="mini"
            v-if="!item.is_like"
            @click="adduserFollow(item.user_id, index)"
          >
            关注
          </van-button>
          <!-- 取消关注按钮 -->
          <van-button
            size="mini"
            class="btn-shallow"
            v-else
            @click="deleteUserFollow(item.user_id, index)"
          >
            已关注
          </van-button>
        </template>
      </van-cell>
    </van-list>

    <!-- 无数据时显示 -->
    <van-empty image-size="70%" description="暂无数据" v-else />
  </div>
</template>

<script>
import { getMemberFans } from '@/network/api/message'
import {
  adduserFollow,
  deleteUserFollow,
  isLikeMember
} from '@/network/api/member'

export default {
  name: 'MyFans',
  data() {
    return {
      // 请求页数
      page: 1,
      loading: false,
      finished: false,
      // 粉丝
      memberFans: {},
      // 默认头像
      defaultPhoto: 'http://qny.kingxyfh.cn/qt_header2.jpeg'
    }
  },
  methods: {
    // 导航栏返回按钮
    onClickLeft() {
      this.$router.back()
    },
    // list 加载事件
    onLoad() {
      // 首次加载
      if (this.page === 1) {
        // 获取粉丝列表信息
        this.getMemberFans(this.page).then(result => {
          console.log(result)
          // 保存信息
          this.memberFans = result.data
          this.page++
          this.loading = false
        })

        // 后续到底加载事件
      } else if (this.page <= this.memberFans.last) {
        // 开启加载提示
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true,
          duration: 0
        })

        // 获取粉丝列表信息
        this.getMemberFans(this.page).then(result => {
          console.log(result)
          // 保存信息
          this.memberFans.list.push(...result.data.list)
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
    // 获取会员粉丝列表信息
    getMemberFans(page) {
      return getMemberFans(page)
    },
    // 添加关注用户
    adduserFollow(userId, index) {
      adduserFollow(userId)
      isLikeMember(userId).then(result => {
        console.log(result.data)
        this.memberFans.list[index].like_id = result.data.follow_user_info.id
        this.memberFans.list[index].is_like = true
        this.$toast.success('关注成功')
      })
    },
    // 取消关注用户
    deleteUserFollow(followUserId, index) {
      // 关注列表 id
      const id = this.memberFans.list[index].like_id
      deleteUserFollow({ id, followUserId }).then(() => {
        this.$toast.success('取消关注成功')
      })
      this.memberFans.list[index].is_like = false
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
.fans-card {
  border-top: 1px solid #efefef;
  padding: 20px !important;

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
