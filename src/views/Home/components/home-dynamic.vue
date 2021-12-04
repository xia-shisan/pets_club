<template>
  <div>
    <!-- 王国动态 -->
    <van-cell :border="false" center class="dynamic-title">
      <template #icon>
        <img src="~@/assets/img/common/crown.png" class="icon-mr" />
      </template>
      <template #title>
        <div>王国动态</div>
      </template>
    </van-cell>

    <!-- 动态列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      offset="500"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-grid :center="false" :border="false" :column-num="2">
        <van-grid-item
          v-for="item in petsDynamicList.list"
          :key="item.id"
          @click="goAnimalDetails(item.id)"
        >
          <!-- 动态图片 -->
          <van-image
            :src="item.images | filterImgPath"
            width="100%"
            height="53vw"
            radius="10"
          />
          <!-- 动态内容 -->
          <span class="van-multi-ellipsis--l2 dynamic-content">{{
            item.content
          }}</span>
          <!-- 用户昵称等 -->
          <van-cell center style="padding:8px 0 0;height:36px">
            <!-- 头像 -->
            <template #icon>
              <van-image
                :src="item.avatar | filterPhoto"
                width="28"
                height="28"
                class="icon-mr"
                round
              />
            </template>

            <!-- 昵称 -->
            <template #title>
              <span style="font-size:12px">{{
                item.nickname | filterNickname
              }}</span>
            </template>

            <!-- 评论图标 -->
            <template #right-icon>
              <van-icon name="like-o" class="icon-mr" />
            </template>

            <!-- 评论数 -->
            <template #extra>
              <span>
                {{ item.comment_count }}
              </span>
            </template>
          </van-cell>
        </van-grid-item>
      </van-grid>
    </van-list>
  </div>
</template>

<script>
// 获取宠物动态列表(全部)
import { getPetsDynamicList } from '@/network/api/pets'

export default {
  name: 'HomeDynamic',
  data() {
    return {
      // 页码
      page: 1,
      petsDynamicList: {},
      loading: false,
      finished: false
    }
  },
  methods: {
    async onLoad() {
      // 首次渲染页面
      if (this.page === 1) {
        const { data } = await getPetsDynamicList({ page: this.page })
        this.petsDynamicList = data
        this.page++
        this.loading = false
        // 下拉刷新获取新动态数据
      } else if (this.page <= this.petsDynamicList.last) {
        // 显示加载提示
        this.$toast.loading({
          message: '加载中...',
          duration: 0,
          forbidClick: true
        })
        // 获取新动态数据
        getPetsDynamicList({ page: this.page }).then(result => {
          this.petsDynamicList.list.push(...result.data.list)
          this.page++
          // 关闭加载提示
          this.$toast.loading({
            message: '加载中...',
            duration: 1,
            forbidClick: true
          })
          this.loading = false
        })
      } else {
        // 全部数据加载完成关闭
        this.finished = true
      }
      console.log(this.petsDynamicList)
    },
    // 跳转到动态页面
    goAnimalDetails(id) {
      // console.log(item)
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
.dynamic-title {
  padding-left: 10px;

  img {
    width: 30px;
    height: 30px;
  }

  div {
    height: 30px;
    line-height: 40px;
    font-size: 16px;
    font-weight: 600;
  }
}

.dynamic-content {
  text-align: center;
  padding: 5px 0 0 0;
}
</style>
