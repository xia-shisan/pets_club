<template>
  <van-tab title="动态" v-if="allList.list" style="margin-top:10px">
    <van-list
      v-model="loading"
      :finished="finished"
      :immediate-check="false"
      finished-text="没有更多了"
      @load="onLoad"
      v-if="allList.total > 0"
    >
      <van-grid :center="false" :border="false" :column-num="2">
        <van-grid-item
          v-for="item in allList.list"
          :key="item.id"
          @click="lookAnimalDetails(item.id)"
        >
          <!-- 动态图片 -->
          <van-image
            :src="item.images | filterImgPath"
            width="100%"
            height="45vw"
            radius="20"
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

    <van-empty v-else description="暂无数据" />
  </van-tab>
</template>

<script>
import { fuzzyQuery } from '@/network/api/search'

export default {
  name: 'TabDynamic',
  props: {
    allList: {
      type: Object,
      default: null
    },
    // 用户搜索值
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // 请求信息
      queryInfo: {
        type: 'all',
        page: 2
      },
      loading: false,
      finished: false
    }
  },
  methods: {
    onLoad() {
      this.queryInfo.value = this.value
      if (this.queryInfo.page <= this.allList.last) {
        // 显示加载提示
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true,
          duration: 0
        })
        fuzzyQuery(this.queryInfo).then(result => {
          this.$emit('pushData', {
            dataList: 'allList',
            data: result.data.list
          })
          // 隐藏加载提示
          this.$toast.loading({
            message: '加载中...',
            forbidClick: true,
            duration: 1
          })
          this.queryInfo.page++
          this.loading = false
        })
      } else {
        this.$toast.success('没有更多了...')
        this.finished = true
      }
    },
    // 查看动态详情
    lookAnimalDetails(id) {
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
.dynamic-content {
  text-align: center;
  padding: 5px 0 0 0;
}
</style>
