<template>
  <div class="bg-white">
    <!-- 我的收藏 -->
    <van-nav-bar
      title="我的收藏"
      left-arrow
      fixed
      placeholder
      class="nav-bar"
      @click-left="onClickLeft"
    />

    <van-list
      v-model="loading"
      :finished="finished"
      :immediate-check="false"
      @load="onLoad"
      v-if="collection.total > 0"
    >
      <div
        class="collection-box"
        v-for="item in collection.list"
        :key="item.id"
      >
        <!-- 收藏内容 -->
        <van-cell
          :title="item.content"
          :border="false"
          @click="lookollectionDetails(item.dynamic_id)"
        >
          <!-- 展示图 -->
          <template #icon>
            <van-image
              width="75"
              height="75"
              radius="10"
              class="img-mr"
              :src="item.images | filterImgPath"
            />
          </template>
        </van-cell>
        <!-- 提示 -->
        <van-cell
          :title="'已有' + item.collection_count + '人收藏'"
          title-class="prompt"
        >
          <template #right-icon>
            <van-tag
              plain
              round
              color="#c7c7c7"
              class="btn-collection"
              @click="deletCollection(item.id, item.dynamic_id, item.user_id)"
            >
              已收藏
            </van-tag>
          </template>
        </van-cell>
      </div>
    </van-list>

    <!-- 无数据显示 -->
    <van-empty image-size="70%" description="暂无数据" v-else />
  </div>
</template>

<script>
import { getCollection, deletCollection } from '@/network/api/member'

export default {
  name: 'MyCollection',
  data() {
    return {
      // 请求页
      page: 1,
      loading: false,
      finished: false,
      // 收藏列表
      collection: {}
    }
  },
  created() {
    this.getCollection()
  },
  methods: {
    onClickLeft() {
      this.$router.back()
    },
    // 获取会员收藏列表（收藏的宠物动态）
    getCollection() {
      getCollection(this.page).then(result => {
        console.log(result)
        this.collection = result.data
        this.page++
      })
    },
    // list 加载事件
    onLoad() {
      if (this.page <= this.collection.last) {
        // 显示加载提示
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true,
          duration: 0
        })
        // 获取新数据
        getCollection(this.page).then(result => {
          this.collection.list.push(...result.data.list)
          this.page++
          // 隐藏加载提示
          this.$toast.loading({
            message: '加载中...',
            forbidClick: true,
            duration: 1
          })
          // 加载状态结束
          this.loading = false
        })
      } else {
        this.$toast.success('没有更多了...')
        this.finished = true
      }
    },
    // 取消会员收藏（收藏的宠物动态）
    deletCollection(id, dynamicId, dynamicUserId) {
      // 是否确认提示
      this.$dialog
        .confirm({
          title: '提示',
          message: '是否取消收藏',
          width: '70%'
        })
        .then(() => {
          deletCollection(id, dynamicId, dynamicUserId).then(() => {
            this.page = 1
            this.getCollection()
            this.$toast('取消收藏成功')
          })
        })
        .catch(() => {})
    },
    // 查看收藏详情
    lookollectionDetails(id) {
      this.$router.push({
        path: '/animal-details',
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
  border-bottom: 1px solid #e5e5e5 !important;
}
.collection-box {
  border-bottom: 1px solid #e5e5e5;
  margin-top: 15px;

  .prompt {
    color: #c1c1c1;
  }

  .btn-collection {
    font-size: 14px;
    padding: 5px 12px;
  }
}
</style>
