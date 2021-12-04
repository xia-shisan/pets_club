<template>
  <div class="bg-white MyPost">
    <!-- 我的帖子 -->
    <van-nav-bar
      title="我的帖子"
      left-arrow
      fixed
      placeholder
      class="nav-bar"
      @click-left="onClickLeft"
    />

    <div v-if="isPetsPost > 0">
      <div class="post-box" v-for="(value, key) in petsPost" :key="key">
        <!-- 日期 -->
        <span class="date">{{ key }}</span>
        <div v-for="item in value" :key="item.id">
          <!-- 帖子内容区域 -->
          <van-cell
            :border="false"
            :title="item.content"
            @click="seeAnimalDetails(item.id)"
          >
            <!-- 帖子图 -->
            <template #icon>
              <van-image
                width="75"
                height="75"
                radius="10"
                class="img-mr"
                :src="item.images.split(',')[0]"
              />
            </template>
          </van-cell>
          <!-- 留言、点赞、浏览、删除按钮 -->
          <van-cell :border="false" title-class="prompt" center>
            <template #title>
              <span class="img-mr">留言：{{ item.comment_count }}</span>
              <span class="img-mr">点赞：{{ item.like_count }}</span>
              <span>浏览：{{ item.visit_count }}</span>
            </template>
            <template #right-icon>
              <van-tag
                plain
                round
                color="#c7c7c7"
                class="btn-del"
                @click="deleteMemberPost(item.id)"
              >
                删除
              </van-tag>
            </template>
          </van-cell>
        </div>
      </div>
    </div>

    <!-- 无数据显示 -->
    <van-empty image-size="70%" description="暂无数据" v-else />
  </div>
</template>

<script>
import { getMemberPetsPost, deleteMemberPost } from '@/network/api/member'

export default {
  name: 'MyWork',
  data() {
    return {
      // 发布的宠物帖子
      petsPost: {}
    }
  },
  computed: {
    // 是否有发布帖子
    isPetsPost() {
      return Object.keys(this.petsPost).length
    }
  },
  created() {
    this.getMemberPetsPost()
  },
  methods: {
    onClickLeft() {
      this.$router.back()
    },
    // 获取会员发布的宠物帖子列表信息
    getMemberPetsPost() {
      getMemberPetsPost().then(result => {
        this.petsPost = result.data.data
        console.log(result)
      })
    },
    // 查看宠物帖子详情
    seeAnimalDetails(id) {
      this.$router.push({
        path: '/postDetails',
        query: {
          id
        }
      })
    },
    // 删除发布的宠物帖子
    deleteMemberPost(id) {
      // 是否删除提示
      this.$dialog
        .confirm({
          title: '提示',
          message: '是否删除',
          width: '70%'
        })
        .then(() => {
          // 删除帖子
          deleteMemberPost(id).then(() => {
            // 重新渲染页面
            this.getMemberPetsPost()
            this.$toast.success('删除成功')
          })
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="less" scoped>
.MyPost {
  padding: 0 20px 20px;
  box-sizing: border-box;

  .post-box {
    border-bottom: 1px solid #e5e5e5;
    margin-top: 20px;

    .date {
      font-size: 16px;
      font-weight: 600;
    }

    .prompt {
      color: #c7c7c7;
    }
    .btn-del {
      font-size: 14px;
      padding: 5px 12px;
    }
  }
}
.nav-bar {
  border-bottom: 1px solid #e5e5e5 !important;
}
</style>
