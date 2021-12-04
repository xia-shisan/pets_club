<template>
  <div>
    <!-- 关注的王国 -->
    <van-list
      v-model="loading"
      :finished="finished"
      @load="onLoad"
      v-if="kingdomList.total !== 0"
    >
      <van-cell
        :title="item.category_name"
        :label="item.label"
        title-class="nickname"
        label-class="summary"
        center
        class="kingdom-card"
        v-for="(item, index) in kingdomList.list"
        :key="item.id"
      >
        <template #icon>
          <van-image
            width="60"
            height="60"
            round
            class="img-mr"
            :src="item.image"
            @click="lookKingdomDetails(item.category_id)"
          />
        </template>

        <template #right-icon>
          <van-button
            size="mini"
            class="btn-shallow"
            @click="deleteCategoryFollow(item.id, item.category_id, index)"
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
import { getCategoryFollow, deleteCategoryFollow } from '@/network/api/member'

export default {
  name: 'Kingdoms',
  data() {
    return {
      // 请求页数
      page: 1,
      loading: false,
      finished: false,
      // 关注王国列表信息
      kingdomList: {}
    }
  },
  methods: {
    // list 加载事件
    onLoad() {
      if (this.page === 1) {
        // 获取关注王国列表信息
        getCategoryFollow(this.page).then(result => {
          console.log(result)
          this.kingdomList = result.data
          this.page++
          this.loading = false
        })
      } else if (this.page <= this.kingdomList.last) {
        // 显示加载提示
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true,
          duration: 0
        })
        // 获取关注王国列表信息
        getCategoryFollow(this.page).then(result => {
          console.log(result)
          this.kingdomList.list.push(...result.data.list)
          this.page++
          // 关闭加载提示
          this.$toast.loading({
            message: '加载中...',
            forbidClick: true,
            duration: 1
          })
          this.loading = false
        })
      }
      this.loading = false
      this.finished = true
    },
    // 取消关注王国
    deleteCategoryFollow(followListId, categoryId, index) {
      deleteCategoryFollow({ followListId, categoryId }).then(() => {
        this.$toast.success('取消关注成功')
        this.kingdomList.list.splice(index, 1)
        this.kingdomList.total--
      })
    },
    // 查看王国详情
    lookKingdomDetails(id) {
      this.$router.push({
        path: '/level_details',
        query: {
          id
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.kingdom-card {
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
