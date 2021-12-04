<template>
  <div class="bg-white post-details">
    <!-- 帖子详情  -->
    <!-- 导航栏 -->
    <van-row type="flex" align="center" class="nav-bar">
      <van-icon name="arrow-left" size="18" @click="onClickLeft" />
      <div class="nav-bar-title">帖子详情</div>
      <van-icon name="ellipsis" size="24" />
    </van-row>

    <!-- 帖子展示图 -->
    <swipe :banner="banner" time="" imgHeight="342" imgFit="cover" />

    <!-- 帖子内容 -->
    <post-content :postDetails="postDetails" :isLikeUser="isLikeUser" />

    <!-- 评论 -->
    <div>
      <!-- 标题 -->
      <van-cell title="评论互动" :border="false" />
      <!-- 动态内容 -->
      <reply-content :postComment="postComment" v-if="postComment.total > 0" />
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
            v-show="!isLike.isLikePost"
            @click="likePost"
          />
          <!-- 已关注 -->
          <van-icon
            name="like"
            size="18"
            color="#ff0000"
            class="icon-mr"
            v-show="isLike.isLikePost"
            @click="likePost"
          />
          {{ postDetails.like_count }}
        </van-row>
        <!-- 收藏 -->
        <van-row type="flex" align="center">
          <!-- 未收藏 -->
          <van-icon
            name="star-o"
            size="18"
            class="icon-mr"
            v-show="!isCollection.isCollectionPost"
            @click="collectionPost"
          />
          <!-- 以收藏 -->
          <van-icon
            name="star"
            size="18"
            color="#ffdc00"
            class="icon-mr"
            v-show="isCollection.isCollectionPost"
            @click="collectionPost"
          />
          收藏
        </van-row>
        <!-- 评论数 -->
        <van-row type="flex" align="center">
          <van-icon name="more-o" size="18" class="icon-mr" />
          {{ postDetails.comment_count }}
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
          @click="addPostComment"
        >
          {{ content ? '发送' : '取消' }}
        </van-button>
      </van-row>
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
  deleteUserFollow
} from '@/network/api/member'
import {
  getPostDetails,
  getPostComment,
  isLikePost,
  isCollectionPost,
  addPostFollowLists,
  deletePostFollowLists,
  addPostCollectionLists,
  deletePostCollectionLists,
  addPostComment
} from '@/network/api/post'

export default {
  name: 'PostDetails',
  components: {
    Swipe,
    PostContent,
    ReplyContent
  },
  data() {
    return {
      // 帖子id
      id: this.$route.query.id,
      // 帖子详情
      postDetails: {},
      // 是否关注帖子
      isLike: {
        isLikePost: false
      },
      // 是否收藏帖子
      isCollection: {
        isCollectionPost: false
      },
      // 是否关注用户
      isLikeUser: {
        isLikeMember: false
      },
      // 一级评论请求页数
      page: 1,
      // 帖子评论列表（一级评论）
      postComment: {},
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
      if (this.postDetails.images) {
        return this.postDetails.images.split(',')
      } else {
        return []
      }
    }
  },
  created() {
    this.getPostDetails()
    this.getPostComment()
    window.scrollTo(0, 0)
    if (this.token) {
      this.isLikePost()
      this.isCollectionPost()
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back()
    },
    onClickRight() {},
    // 获取贴子详情
    getPostDetails() {
      getPostDetails(this.id).then(result => {
        this.postDetails = result.data.data
        console.log(result)
        if (this.token) {
          // 查询用户是否关注
          this.isLikeMember()
        }
      })
    },
    // 查询帖子是否已关注
    isLikePost() {
      isLikePost(this.id).then(result => {
        console.log(result)
        this.isLike = result.data
      })
    },
    // 查询帖子是否已收藏
    isCollectionPost() {
      isCollectionPost(this.id).then(result => {
        console.log(result)
        this.isCollection = result.data
      })
    },
    // 查询用户是否已关注
    isLikeMember() {
      console.log(this.postDetails.user_id)
      isLikeMember(this.postDetails.user_id).then(result => {
        console.log(result)
        this.isLikeUser = result.data
      })
    },
    // 获取帖子评论列表（一级评论）
    getPostComment() {
      if (this.page === 1) {
        getPostComment(this.id, this.page).then(result => {
          console.log(result)
          this.postComment = result.data
          this.page++
        })
      } else if (this.page <= this.postComment.last) {
        getPostComment(this.id, this.page).then(result => {
          console.log(result)
          this.postComment.list.push(...result.data.list)
          this.page++
        })
      }
    },
    // 关注/取关 帖子
    likePost() {
      // 是否登录
      if (this.token) {
        // 帖子id
        const postId = this.id
        // 帖子发布者id
        const postUserId = this.postDetails.user_id
        if (this.isLike.isLikePost) {
          // 取关
          const id = this.isLike.follow_user_info.id
          deletePostFollowLists(id, postId, postUserId).then(() => {
            this.isLikePost()
            this.postDetails.like_count--
            this.$toast.success('取消关注成功')
          })
        } else {
          // 关注
          addPostFollowLists(postId, postUserId).then(() => {
            this.isLikePost()
            this.postDetails.like_count++
            this.$toast.success('关注成功')
          })
        }
      } else {
        this.$toast('请先登录')
      }
    },
    // 收藏/取消收藏 帖子
    collectionPost() {
      // 是否登录
      if (this.token) {
        // 帖子id
        const postId = this.id
        // 帖子发布者id
        const postUserId = this.postDetails.user_id
        if (this.isCollection.isCollectionPost) {
          // 取消收藏
          const id = this.isCollection.follow_user_id.id
          deletePostCollectionLists(id, postId, postUserId).then(() => {
            this.isCollectionPost()
            this.$toast.success('取消收藏成功')
          })
        } else {
          // 收藏
          addPostCollectionLists(postId, postUserId).then(() => {
            this.isCollectionPost()
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
          followUserId: this.postDetails.user_id
        }
        deleteUserFollow(queryInfo).then(() => {
          this.isLikeMember()
        })
      } else {
        // 关注用户
        adduserFollow(this.postDetails.user_id).then(() => {
          this.isLikeMember()
        })
      }
    },
    // 发布评论
    addPostComment() {
      if (this.token) {
        if (this.content) {
          addPostComment(this.id, this.content).then(() => {
            this.content = ''
            this.showCommentInput = false
            this.page = 1
            this.getPostComment()
            window.scrollTo(0, 0)
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
