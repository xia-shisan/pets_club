<template>
  <div class="bg-white post-details">
    <!-- 动态详情  -->
    <div v-if="isData > 0">
      <!-- 导航栏 -->
      <van-row type="flex" align="center" class="nav-bar">
        <van-icon name="arrow-left" size="18" @click="onClickLeft" />
        <div class="nav-bar-title">动态</div>
        <van-icon name="ellipsis" size="24" />
      </van-row>

      <!-- 动态展示图 -->
      <swipe :banner="banner" time="" imgHeight="342" imgFit="cover" />

      <!-- 动态内容 -->
      <post-content :dynamicDetails="dynamicDetails" :isLikeUser="isLikeUser" />

      <!-- 评论 -->
      <div>
        <!-- 标题 -->
        <van-cell title="评论互动" :border="false" />
        <!-- 动态内容 -->
        <reply-content
          :dynamicComment="dynamicComment"
          v-if="dynamicComment.total > 0"
        />
      </div>

      <!-- 底部发表评论 -->
      <div class="footer-reply" v-show="!showCommentInput">
        <!-- 发言框 -->
        <van-row>
          <!-- 评论框 -->
          <van-tag round class="btn-reply" @click="showCommentInput = true">
            我来评论~
          </van-tag>
        </van-row>
        <!-- 关注、收藏、评论数 -->
        <van-row
          type="flex"
          justify="space-around"
          align="center"
          class="interactive-menu"
        >
          <!-- 关注 -->
          <van-row type="flex" align="center">
            <!-- 未关注 -->
            <van-icon
              name="like-o"
              size="18"
              class="icon-mr"
              v-show="!isLike.isLikeDynamic"
              @click="likePost"
            />
            <!-- 已关注 -->
            <van-icon
              name="like"
              size="18"
              color="#ff0000"
              class="icon-mr"
              v-show="isLike.isLikeDynamic"
              @click="likePost"
            />
            {{ dynamicDetails.like_count }}
          </van-row>
          <!-- 收藏 -->
          <van-row type="flex" align="center">
            <!-- 未收藏 -->
            <van-icon
              name="star-o"
              size="18"
              class="icon-mr"
              v-show="!isCollection.isCollectionDynamic"
              @click="collectionPost"
            />
            <!-- 以收藏 -->
            <van-icon
              name="star"
              size="18"
              color="#ffdc00"
              class="icon-mr"
              v-show="isCollection.isCollectionDynamic"
              @click="collectionPost"
            />
            收藏
          </van-row>
          <!-- 评论数 -->
          <van-row type="flex" align="center">
            <van-icon name="more-o" size="18" class="icon-mr" />
            {{ dynamicDetails.comment_count }}
          </van-row>
        </van-row>
      </div>

      <!-- 底部发表评论输入框 -->
      <div class="footer-reply" v-show="showCommentInput">
        <van-row
          type="flex"
          align="center"
          justify="space-between"
          class="reply-box"
        >
          <input
            type="text"
            maxlength="140"
            placeholder="我来评论~"
            v-model="content"
            class="reply-input"
          />
          <van-button
            round
            color="#84b8df"
            class="btn-send"
            @click="addComment"
          >
            {{ content ? '发送' : '取消' }}
          </van-button>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
import Swipe from '@/components/Swipe'
import PostContent from './components/post-content'
import ReplyContent from './components/reply-content'

import { mapGetters } from 'vuex'

import {
  isLikeMember,
  adduserFollow,
  deleteUserFollow,
  AddAttention,
  deletAttention,
  AddCollection,
  deletCollection
} from '@/network/api/member'

import {
  getPetsDetails,
  isLikeDynamic,
  isCollectionDynamic
} from '@/network/api/pets'

import { getComment, addComment } from '@/network/api/comment'
import { addFootprint } from '@/network/api/footprint'

export default {
  name: 'AnimalDetails',
  components: {
    Swipe,
    PostContent,
    ReplyContent
  },
  data() {
    return {
      // 动态是否已删除
      isData: false,
      // 动态id
      id: this.$route.query.id,
      // 动态详情
      dynamicDetails: {},
      // 是否关注动态
      isLike: {
        isLikeDynamic: false
      },
      // 是否收藏动态
      isCollection: {
        isCollectionDynamic: false
      },
      // 是否关注用户
      isLikeUser: {
        isLikeMember: false
      },
      // 一级评论请求页数
      page: 1,
      // 动态评论列表（一级评论）
      dynamicComment: {},
      // 是否发布评论
      showCommentInput: false,
      // 发布的评论内容
      content: ''
    }
  },
  computed: {
    ...mapGetters(['token']),
    // 展示图
    banner() {
      if (this.dynamicDetails.images) {
        return this.dynamicDetails.images.split(',')
      } else {
        return []
      }
    }
  },
  created() {
    this.getPetsDetails()
  },
  methods: {
    onClickLeft() {
      this.$router.back()
    },
    onClickRight() {},
    // 获取贴子详情
    getPetsDetails() {
      getPetsDetails(this.id).then(result => {
        this.dynamicDetails = result.data.data

        // 判断动态是否已被删除
        this.isData = Object.keys(this.dynamicDetails).length
        console.log(this.isData)
        const _this = this
        // 已删除
        if (this.isData === 0) {
          // 显示动态已删除提示
          this.$toast.success({
            message: '该动态已被删除',
            duration: 1000,
            forbidClick: true,
            onOpened() {
              setTimeout(() => {
                // 返回
                _this.$router.back()
              }, 1000)
            }
          })
          return false
        } else {
          // 未删除
          // 获取一级评论
          this.getComment()
          window.scrollTo(0, 0)
          if (this.token) {
            // 查询是否关注动态
            this.isLikeDynamic()
            // 查询是否收藏动态
            this.isCollectionDynamic()
            // 查询用户是否关注
            this.isLikeMember()
            // 添加会员足迹
            this.addFootprint()
          }
        }
        console.log(result)
      })
    },
    // 添加会员足迹
    addFootprint() {
      addFootprint(this.id)
    },
    // 查询动态是否已关注
    isLikeDynamic() {
      isLikeDynamic(this.id).then(result => {
        console.log(result)
        this.isLike = result.data
      })
    },
    // 查询动态是否已收藏
    isCollectionDynamic() {
      isCollectionDynamic(this.id).then(result => {
        console.log(result)
        this.isCollection = result.data
      })
    },
    // 查询用户是否已关注
    isLikeMember() {
      console.log(this.dynamicDetails.user_id)
      isLikeMember(this.dynamicDetails.user_id).then(result => {
        console.log(result)
        this.isLikeUser = result.data
      })
    },
    // 获取动态评论列表（一级评论）
    getComment() {
      const queryInfo = {
        dynamicId: this.id,
        page: this.page
      }
      if (this.page === 1) {
        getComment(queryInfo).then(result => {
          console.log(result)
          this.dynamicComment = result.data
          this.page++
        })
      } else if (this.page <= this.dynamicComment.last) {
        getComment(queryInfo).then(result => {
          console.log(result)
          this.dynamicComment.list.push(...result.data.list)
          this.page++
        })
      }
    },
    // 关注/取关 动态
    likePost() {
      // 是否登录
      if (this.token) {
        // 动态id
        const dynamicId = this.id
        // 动态发布者id
        const dynamicUserId = this.dynamicDetails.user_id
        if (this.isLike.isLikeDynamic) {
          // 取关
          const queryInfo = {
            id: this.isLike.follow_user_info.id,
            dynamicId,
            dynamicUserId
          }
          deletAttention(queryInfo).then(() => {
            this.isLikeDynamic()
            this.dynamicDetails.like_count--
            this.$toast.success('取消关注成功')
          })
        } else {
          // 关注
          AddAttention(dynamicId, dynamicUserId).then(() => {
            this.isLikeDynamic()
            this.dynamicDetails.like_count++
            this.$toast.success('关注成功')
          })
        }
      } else {
        this.$toast('请先登录')
      }
    },
    // 收藏/取消收藏 动态
    collectionPost() {
      // 是否登录
      if (this.token) {
        // 动态id
        const dynamicId = this.id
        // 动态发布者id
        const dynamicUserId = this.dynamicDetails.user_id
        if (this.isCollection.isCollectionDynamic) {
          // 取消收藏
          const id = this.isCollection.follow_user_info.id
          deletCollection(id, dynamicId, dynamicUserId).then(() => {
            this.isCollectionDynamic()
            this.$toast.success('取消收藏成功')
          })
        } else {
          // 收藏
          AddCollection(dynamicId, dynamicUserId).then(() => {
            this.isCollectionDynamic()
            this.$toast.success('收藏成功')
          })
        }
      } else {
        this.$toast('请先登录')
      }
    },
    // 关注/取关用户
    btnFollow() {
      if (this.isLikeUser.isLikeMember) {
        // 取关用户
        const queryInfo = {
          id: this.isLikeUser.follow_user_info.id,
          followUserId: this.dynamicDetails.user_id
        }
        deleteUserFollow(queryInfo).then(() => {
          this.isLikeMember()
        })
      } else {
        // 关注用户
        adduserFollow(this.dynamicDetails.user_id).then(() => {
          this.isLikeMember()
        })
      }
    },
    // 发布评论
    addComment() {
      if (this.token) {
        if (this.content) {
          const queryInfo = {
            dynamic_id: this.id,
            content: this.content
          }
          addComment(queryInfo).then(() => {
            this.content = ''
            this.showCommentInput = false
            window.scrollTo(0, 0)
            this.page = 1
            this.getComment()
            this.$toast.success('发布评论成功')
          })
        } else {
          this.content = ''
          this.showCommentInput = false
        }
      } else {
        this.content = ''
        this.showCommentInput = false
        this.$toast('请先登录在评论')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.post-details {
  padding-bottom: 50px;

  // 导航栏
  .nav-bar {
    height: 46px;
    padding: 0 15px;
    border-bottom: 1px solid #e5e5e5;
    background-color: lightblue;
    position: sticky;
    top: 0;
    z-index: 999;

    .nav-bar-title {
      flex: 1;
      font-size: 16px;
      text-align: center;
    }
  }

  .footer-reply {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 10px;
    border-top: 1px solid #eee;
    display: flex;
    align-items: center;
    background-color: #fff;
    box-sizing: border-box;

    .btn-reply {
      width: 50vw;
      font-size: 14px;
      color: #909399;
      padding: 6px 10px;
      margin-right: 10px;
      background-color: #f2f2f2;
    }

    .interactive-menu {
      flex: 1;

      .icon-mr {
        font-weight: 600;
      }
    }

    .reply-box {
      width: 100%;

      .reply-input {
        flex: 1;
        border: 1px solid silver;
        border-radius: 20px;
        padding: 8px 8px;
        margin: 0 10px 0;
      }
      .btn-send {
        width: 60px;
        height: auto;
        padding: 5px 10px;
        margin-right: 10px;
      }
    }
  }
}
</style>
