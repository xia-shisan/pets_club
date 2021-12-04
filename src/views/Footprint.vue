<template>
  <div class="bg-white footprint">
    <!-- 我的足迹 -->
    <!-- 导航栏 -->
    <van-nav-bar
      title="我的足迹"
      left-arrow
      fixed
      placeholder
      style="border-bottom: 1px solid #dfdfdf;"
      @click-left="onClickLeft"
    />

    <!-- 足迹 -->
    <div class="footprint-box">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :immediate-check="false"
        @load="onLoad"
        v-if="footprintLists.total !== 0"
      >
        <van-cell-group
          :border="false"
          class="footprint-item-box"
          v-for="item in footprintLists.list"
          :key="item.id"
        >
          <!-- 足迹内容 -->
          <van-cell
            :title="item.pets_dynamic_content"
            title-class="footprint-content van-multi-ellipsis--l2"
            :border="false"
            @click="lookFootprintDetails(item.dynamic_id)"
          >
            <template #icon>
              <van-image
                width="75"
                height="75"
                radius="10"
                class="footprint-img"
                :src="item.pets_dynamic_images | filterImgPath"
              />
            </template>
          </van-cell>
          <!-- 删除按钮 -->
          <van-cell
            :title="'浏览：' + item.visit_count"
            title-style="color:#c7c7c7"
            center
            :border="false"
          >
            <template #default>
              <van-button
                plain
                round
                color="#c0c0c0"
                class="btn-del"
                @click="delFootprint(item.id)"
              >
                删除
              </van-button>
            </template>
          </van-cell>
        </van-cell-group>
      </van-list>

      <!-- 无数据时显示 -->
      <van-empty image-size="70%" description="暂无数据" v-else />
    </div>
  </div>
</template>

<script>
import { getFootprintLists, deleteFootprint } from '@/network/api/footprint'

export default {
  name: 'Footprint',
  data() {
    return {
      // 请求信息
      queryInfo: {
        page: 1,
        per_count: 10
      },
      // 足迹列表
      footprintLists: {},
      loading: false,
      finished: false
    }
  },
  created() {
    this.getFootprintLists()
  },

  methods: {
    // 获取会员足迹列表
    async getFootprintLists() {
      const { data } = await getFootprintLists(this.queryInfo)
      console.log(data)
      this.footprintLists = data
    },
    // 导航栏返回
    onClickLeft() {
      this.$router.back()
    },
    // 列表加载事件
    async onLoad() {
      this.queryInfo.page++
      const page = this.queryInfo.page
      const last = this.footprintLists.last
      if (page <= last) {
        // 加载轻提示
        this.$toast.loading({
          message: '加载中...',
          duration: 1000,
          forbidClick: true
        })
        // 获取足迹列表
        const {
          data: { list }
        } = await getFootprintLists(this.queryInfo)
        console.log(list)
        this.footprintLists.list.push(...list)
        // 加载状态结束
        this.loading = false
      } else {
        // 数据全部加载完成
        this.finished = true
      }
    },
    // 删除足迹
    delFootprint(id) {
      this.$dialog
        .confirm({
          title: '提示',
          message: '是否删除'
        })
        .then(async () => {
          await deleteFootprint(id)
          this.$toast({
            message: '删除成功',
            duration: 800
          })
          // 重新获取足迹列表
          this.queryInfo.page = 1
          this.getFootprintLists()
        })
    },
    // 查看足迹详情
    lookFootprintDetails(id) {
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
.footprint {
  height: 100%;
}

.btn-del {
  width: 50px;
  height: 25px;
  padding: 3px 10px;
}

.footprint-box {
  padding: 20px;

  .footprint-item-box {
    padding: 0 10px;
    border: none;
    border-bottom: 1px solid #e5e5e5;

    .footprint-content {
      height: 60px;
      line-height: 30px;
      font-size: 12px;
    }

    .footprint-img {
      margin-right: 20px;
    }
  }
}
</style>
