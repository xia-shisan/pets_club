<template>
  <!-- 个人信息 -->
  <van-cell-group class="baseInfo" :border="false">
    <!-- 背景图片 -->
    <van-image
      fit="cover"
      :src="userInfo.avatar ? userInfo.avatar : defaultPhoto"
      class="user-bg"
    />
    <!-- 用户基本信息 -->
    <van-cell center :border="false" class="bg-transparent">
      <!-- 头像 -->
      <template #icon>
        <van-image
          width="80"
          height="80"
          round
          class="img-mr"
          :src="userInfo.avatar ? userInfo.avatar : defaultPhoto"
        />
      </template>
      <!-- 用户名 -->
      <template #title>
        <h3 class="title">
          {{ userInfo.nickname ? userInfo.nickname : '未知' }}
        </h3>
      </template>
      <!-- 粉丝等级 -->
      <template #label>
        <van-row type="flex" align="center">
          <van-icon
            class-prefix="icon"
            class="iconfont icon-mr"
            name="dengji"
            size="20"
            color="#FFD700"
          />
          <span class="fans-level">初级粉丝</span>
        </van-row>
      </template>
    </van-cell>
    <!-- 个性签名 -->
    <van-cell
      :title="userInfo.summary ? userInfo.summary : summary"
      :border="false"
      class="bg-transparent"
    />
    <!-- 关注、粉丝、赞 -->
    <van-cell center :border="false" class="bg-transparent">
      <template #title>
        <h3>
          {{ userInfo.total_like }}关注 {{ userInfo.fans }}粉丝
          {{ userInfo.get_like }}赞
        </h3>
      </template>
      <template #default>
        <van-button
          type="danger"
          size="small"
          round
          class="btn-follow"
          @click="btnFollow"
        >
          {{ isLike.isLikeMember ? '已关注' : '关注' }}
        </van-button>
      </template>
    </van-cell>
  </van-cell-group>
</template>

<script>
import { adduserFollow, deleteUserFollow } from '@/network/api/member'

export default {
  name: 'UserInfo',
  props: {
    // 用户信息
    userInfo: {
      type: Object,
      default: null
    },
    // 是否关注
    isLike: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      // 默认头像
      defaultPhoto: 'http://qny.kingxyfh.cn/qt_header2.jpeg',
      // 默认个性签名
      summary: '这个人很懒，什么都没有留下！'
    }
  },
  methods: {
    // 关注/取关 用户
    async btnFollow() {
      if (this.$parent.token) {
        if (this.isLike.isLikeMember) {
          // 取关
          const queryInfo = {
            id: this.isLike.follow_user_info.id,
            followUserId: this.$parent.userId
          }
          await deleteUserFollow(queryInfo)
          this.$parent.isLikeMember()
        } else {
          // 关注
          await adduserFollow(this.$parent.userId)
          this.$parent.isLikeMember()
        }
      } else {
        this.$dialog
          .confirm({
            title: '提示',
            message: '请先登录',
            width: '70%'
          })
          .then(() => {
            this.$router.push('/login')
          })
          .catch(() => {
            return false
          })
      }
    }
  }
}
</script>

<style lang="less" scoped>
// 用户信息样式
.baseInfo {
  padding-bottom: 25px;
  position: relative;
  margin-top: 46px;

  .user-bg {
    width: 100%;
    height: calc(100% + 46px);
    position: absolute;
    top: -46px;
    left: 0;
    right: 0;
    -webkit-filter: brightness(70%);
    filter: brightness(70%);
  }

  .title {
    padding-bottom: 10px;
  }
  .fans-level {
    font-size: 14px;
    color: #fff;
  }

  .bg-transparent {
    color: #fff;
    background: transparent;
  }

  .btn-follow {
    width: auto;
    height: auto;
    padding: 6px 15px;
  }
}
</style>
