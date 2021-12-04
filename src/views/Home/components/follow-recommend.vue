<template>
  <div>
    <!-- 推荐关注 -->
    <van-row type="flex" align="center" class="rec-style">
      <van-col>
        <img src="~@/assets/img/common/crown.png" class="min-crown" />
      </van-col>
      <van-col><span>推荐关注</span></van-col>
    </van-row>

    <!-- 关注列表（用户） -->
    <div class="rec-width">
      <div class="rec-users">
        <div
          v-for="(item, index) in recommendLikeLists"
          :key="item.id"
          class="item"
        >
          <div class="item-main">
            <div class="user-info" @click="jumpOwnPage(item.id)">
              <!-- 头像 -->
              <van-image width="40" height="40" round :src="item.avatar" />
              <!-- 用户名 -->
              <span>{{ item.nickname }}</span>
            </div>
            <!-- 未关注按钮 -->
            <van-button
              color="#fa3534"
              size="mini"
              round
              class="btn-follow"
              v-show="!isLikeList[index].isLikeMember"
              @click="adduserFollow(item.id, index)"
            >
              关注
            </van-button>
            <!-- 已关注按钮 -->
            <van-button
              color="#fa3534"
              size="mini"
              round
              class="btn-follow"
              v-show="isLikeList[index].isLikeMember"
              @click="deleteUserFollow(item.id, index)"
            >
              取消关注
            </van-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  isLikeMember,
  adduserFollow,
  deleteUserFollow
} from '@/network/api/member'

import { mapGetters } from 'vuex'

export default {
  name: 'FollowRecommend',
  props: {
    recommendLikeLists: {
      type: Array,
      default: null
    },
    isLikeList: {
      type: Array,
      default: null
    }
  },
  computed: {
    ...mapGetters(['token'])
  },
  methods: {
    // 查询会员是否已关注
    async isLikeMember(followUserId) {
      return await isLikeMember(followUserId)
    },
    // 添加会员关注
    async adduserFollow(followUserId, index) {
      // 判断是否登录
      if (this.token) {
        // 添加会员关注
        await adduserFollow(followUserId)
        // 查询会员是否关注
        this.isLikeMember(followUserId).then(result => {
          console.log(result.data)
          this.$emit('reviseIsLike', result.data, index)
        })
      } else {
        this.$dialog
          .confirm({
            title: '请先登录',
            width: '70%'
          })
          .then(() => {
            this.$router.push('/login')
          })
          .catch(() => {})
      }
    },
    // 取消会员关注
    async deleteUserFollow(followUserId, index) {
      const followListId = this.isLikeList[index].follow_user_info.id
      console.log(followListId)
      const queryInfo = {
        //  关注列表 id
        id: followListId,
        //  关注用户 id
        followUserId
      }
      // 取消会员关注
      await deleteUserFollow(queryInfo)
      // 修改按钮
      this.isLikeMember(followUserId).then(result => {
        this.$emit('reviseIsLike', result.data, index)
      })
    },
    // 跳转到选中用户的个人主页
    jumpOwnPage(id) {
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
.rec-style {
  height: 30px;
  padding: 0 0 10px 15px;
  background-color: #fff;

  span {
    font-size: 14px;
    font-weight: 600;
    padding-left: 5px;
  }
}
.rec-width {
  overflow: auto hidden;

  &::-webkit-scrollbar {
    display: none;
  }

  .rec-users {
    width: 100%;
    white-space: nowrap;

    .item {
      display: inline-block;
      width: 30%;
      height: 130px;
      margin: 10px 6px;
      border-radius: 5px;
      background-color: #fff;

      .item-main {
        width: 100%;
        height: 100%;
        padding: 10px 0;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;

        .user-info {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;

          span {
            font-size: 15px;
            font-weight: 600;
            margin-top: 5px;
          }
        }

        .btn-follow {
          min-width: 40px;
          padding: 0 3px;
          box-sizing: content-box;
        }
      }
    }
  }
}
</style>
